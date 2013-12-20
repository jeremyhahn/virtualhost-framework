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
qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.contextmenu.Attributes", {

  extend : vhf.Main,

  properties : {

  	  WireFrame    : { init : vhf.Main.getInstance() },
  	  Menu         : { init : new qx.ui.menu.Menu },
  	  MenuType     : { }, 
  	  ObjTable     : { },
  	  TableRowData : { },
  	  Callback     : { },
  	  MiscObj      : { }
  },

  construct : function( obj ) {

     this.setObjTable( obj[0] );
     this.setCallback( obj[1] );
     this.setMiscObj( obj[2] );
     this.setTableRowData( obj[3] );

     this.getMenu().addToDocument();
     var tbl = this.getObjTable();

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

   /**
    * Handles a properties click event by opening a custom properties window based on its 'type'. The type is then used to load
    * the custom properties window located at packages.com.makeabyte.vhf.ldapbrowser.ui.properties.<type>.js 
    * 
    * @type member
    * @param string type The type of object properties being requested.
    * @param object obj The object
    */
    loadProperties : function( type, args ) {

        this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties." + type, args );
    },
    
    __deleteAttrib : function( args ) {

        // Update the status bar
    	this.getWireFrame()._setStatusText( "Deleting " + args[0] + " attribute..." );
    	
    	// Perform JSON RPC call to delete the object
        var callback = qx.lang.Function.bind( this.__deleteAttribHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "deleteAttrib", this.getMiscObj().dn, args[0], args[1] );
    },

   /**
    * Handles the delete JSON RPC server response
    */
    __deleteAttribHandler : function( result, ex, id ) {

         if( ex != null ) {
         	
         	 this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
         	 this.getWireFrame()._setStatusText( "RPC Error!" );
         }
         
         if( result ) {

	          var attribute = result.attribute;
	          var value = result.value;

              if( attribute.length && value.length ) {
	
			      // Remove the entry from the table
		          var rowCount = this.getObjTable().getTableModel().getRowCount();
			      for( var j=0; j<rowCount; j++ ) {

                       try {
			                 if( (this.getObjTable().getTableModel().getValue( 0, j ) == attribute) && (this.getObjTable().getTableModel().getValue( 1, j ) == value) )
			                     this.getObjTable().getTableModel().removeRows( j, 1 );
                       }
                       catch( e ) { }
		          }

		          this.getWireFrame()._setStatusText( "Ready" );
              }
         }
    },

    // -------------------------------------------------------------------------------------->
    // CONTEXT MENU'S
    // -------------------------------------------------------------------------------------->
    showContextMenu : function( ev ) {

		    // Delete command
			var del = new qx.client.Command;
			del.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                for( var i=0; i<selectedObjects.length; i++ ) {

                     // Get confirmation before the delete operation is performed
                     var confirmCallback = qx.lang.Function.bind( this.__deleteAttrib, this );
                	 this.getWireFrame()._showConfirmDialog( "Are you sure you want to delete " + table.getTableModel().getValue( 0, selectedObjects[i].minIndex ) + " with value " + table.getTableModel().getValue( 1, selectedObjects[i].minIndex ) + "?", "LDAP Object Deletion", confirmCallback, Array( table.getTableModel().getValue( 0, selectedObjects[i].minIndex ), table.getTableModel().getValue( 1, selectedObjects[i].minIndex ) ) );
                }
			}, this );

			// Add command
			var add = new qx.client.Command;
			add.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.NewAttribute", Array( this.getMiscObj().dn, this.getObjTable(), this.getTableRowData() ) );
			}, this );

			// The button and add the command
			this.getMenu().add( new qx.ui.menu.Button( "New", "icon/16/actions/edit-add.png", add ) );
		    this.getMenu().add( new qx.ui.menu.Button( "Delete", "icon/16/actions/edit-delete.png", del ) );

			this.getObjTable().getContextMenu().setLeft( ev.getClientX() );
			this.getObjTable().getContextMenu().setTop( ev.getClientY() );
			this.getObjTable().getContextMenu().setOpener( this.getObjTable() );
			this.getObjTable().getContextMenu().show();
    },

    terminate : function() {

          this.base( arguments );
    }
  }
});