/* ************************************************************************
#
#  Virtual Host Framework Control Panel UI
#
#  http://vhf.makeabyte.com
#
#  Copyright:
#    2007 Make A Byte, inc, http://www.makeabyte.com
#
#  Author:
#    * Jeremy Hahn
#
#  Version: 0.1b
#
# Virtual Host Framework Control Panel
# Copyright (C) 2007  Make A Byte, inc
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
************************************************************************ */

/* ************************************************************************

// Required QOOXDOO framework classes

#require(qx.ui.pageview.tabview.TabView)
#require(qx.ui.pageview.tabview.Button)
#require(qx.ui.pageview.tabview.Page)
#require(qx.ui.listview.ListView)
#require(qx.io.remote.Rpc);
************************************************************************ */
qx.Class.define( "packages.com.makeabyte.vhf.powerdns.ui.contextmenu.RecordManager", {

  extend : vhf.Main,

  properties : {

  	  WireFrame : { init : vhf.Main.getInstance() },
  	  Menu      : { init : new qx.ui.menu.Menu },
  	  Table     : { },
  	  RowData   : { init : [ ] },
  	  Callback  : { },
  	  ZoneDn    : { }
  },

  construct : function( obj ) {

     this.setTable( obj[0] );
     this.setRowData( obj[1] );
     this.setCallback( obj[2] );
     this.setZoneDn( obj[3] );

     this.getMenu().addToDocument();
     var tbl = this.getTable();

	 // show the context-menu
	 tbl.setContextMenu( this.getMenu() );
	 tbl.addEventListener( "contextmenu", function( e ) {

         // Clear the menu if its already been populated
         this.flushMenu();

         // Launch the context menu
         this.showContextMenu( e );
	}, this );

  },

  members : {

    flushMenu : function() {

    	this.getMenu().removeAll();
    },

    __deleteRecord : function( obj ) {

        // Update the status bar
    	this.getWireFrame()._setStatusText( "Deleting requested " + obj[1] + "..." );

        // Send arguments encoded as JSON
        var json = '[' + 
                          '{ "name" : "dn", "dn" : "' + obj[0] + '"},' +
                          '{ "name" : "' +  obj[1] + '", "' + obj[1] + '" : "' + obj[2] + '"}' +
                   ']';
                          

    	// Perform JSON RPC call to delete the object
        var callback = qx.lang.Function.bind( this.__deleteRecordHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "DNS", "deleteRecord", json );
    },

   /**
    * Handles the delete JSON RPC server response
    */
    __deleteRecordHandler : function( result, ex, id ) {

         if( ex != null ) {
         	
         	 this.getWireFrame()._showAlertDialog( "error", ex, "RPC Error" );
         	 this.getWireFrame()._setStatusText( "RPC Error!" );
         }

         if( result ) {

		      this.getCallback()();
		      this.getWireFrame()._setStatusText( "Ready" );
         }
    },

    // -------------------------------------------------------------------------------------->
    // CONTEXT MENU
    // -------------------------------------------------------------------------------------->
    showContextMenu : function( ev ) {

		    // Delete command
			var del = new qx.client.Command;
			del.addEventListener("execute", function( e ) {

			       var table = e.getData().getParentMenu().getOpener();
                   var selectedObjects = table.getSelectionModel().getSelectedRanges();

                   for( var i=0; i<selectedObjects.length; i++ ) {

                     // Get confirmation before the delete operation is performed
                     var confirmCallback = qx.lang.Function.bind( this.__deleteRecord, this );
                	 this.getWireFrame()._showConfirmDialog( "Are you sure you want to delete this " + table.getTableModel().getValue( 0, selectedObjects[i].minIndex ) + "?", "Delete Record", confirmCallback, Array( table.getTableModel().getValue( 2, selectedObjects[i].minIndex ).dn, table.getTableModel().getValue( 0, selectedObjects[i].minIndex ), table.getTableModel().getValue( 1, selectedObjects[i].minIndex ) ) );

                }
			}, this );

			// Add command
			var add = new qx.client.Command;
			add.addEventListener("execute", function( e ) {

			       var table = e.getData().getParentMenu().getOpener();

                   // Launch the new record chooser window, passing in the table object
                   this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.powerdns.ui.RecordChooser", Array( this.getZoneDn(), this.getCallback() ) );

			}, this );

			// The button and add the command
			this.getMenu().add( new qx.ui.menu.Button( "New", "icon/16/actions/edit-add.png", add ) );
		    this.getMenu().add( new qx.ui.menu.Button( "Delete", "icon/16/actions/edit-delete.png", del ) );

			this.getTable().getContextMenu().setLeft( ev.getClientX() );
			this.getTable().getContextMenu().setTop( ev.getClientY() );
			this.getTable().getContextMenu().setOpener( this.getTable() );
			this.getTable().getContextMenu().show();
    },

    terminate : function() {

        this.base( arguments );
    }
  }
});