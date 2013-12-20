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
qx.Class.define( "packages.com.makeabyte.vhf.sqlbrowser.ui.contextmenu.Tree", {

  extend : vhf.Main,

  properties : {

  	  WireFrame     : { init : vhf.Main.getInstance() },
  	  Menu          : { init : new qx.ui.menu.Menu },
  	  Tree          : { },
  	  RowData       : { init : [ ] },
  	  Callback      : { },
  	  UserDatabases : { }
  },

  construct : function( obj ) {

     // Set up object properties
     this.setTree( obj[0] );
     this.setCallback( obj[1] );
     this.setUserDatabases( obj[2] );

     this.getMenu().addToDocument();

	 // show the context-menu
	 this.getTree().setContextMenu( this.getMenu() );
	 this.getTree().addEventListener( "contextmenu", function( e ) {

         // Clear the menu if its already been populated
         this.getMenu().removeAll();

         // Launch the context menu
         this.showContextMenu( e );
	}, this );
  },

  members : {

    __drop : function( selectedDB ) {

        // Update the status bar
    	this.getWireFrame()._setStatusText( "Dropping database " + selectedDB + "..." );

    	var node = this.getTree().getHierarchy( this.getTree().getDataModel().getSelectedNodes()[0].nodeId ).reverse()[0];
        var values = /<div style='display:none'>(.*)<\/div>(.*)/(node);

        var dbtype = values[1];
        var dbname = values[2];

        for( var i=0; i<this.getUserDatabases().count; i++ ) {

             if( this.getUserDatabases()[i].databasetype[0] == dbtype && this.getUserDatabases()[i].databasename[0] == dbname ) {

             	 // Send delete request as JSON formatted data
		         var dn = "databaseName=" + dbname + this.getWireFrame().getUserAttribs().dn.replace( "cn=" + this.getWireFrame().getUserAttribs().uid[0], "" );
		    	 var json = '[' +
		    	                  '{ "name" : "dn", "dn" : "' + dn + '" },' +
		    	                  '{ "name" : "databaseType", "databaseType" : "' + dbtype + '" },' +
		    	                  '{ "name" : "databaseHost", "databaseHost" : "' + this.getUserDatabases()[i].databasehost[0] + '" },' +
		    	                  '{ "name" : "databaseName", "databaseName" : "' + dbname + '" }' +
		    	            ']';
alert( json );
		    	// Perform JSON RPC call to delete the object
		        var callback = qx.lang.Function.bind( this.__dropHandler, this );
		        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "SQLBROWSER", "drop", json );
             } 
        }
    },

   /**
    * Handles the delete JSON RPC server response
    */
    __dropHandler : function( result, ex, id ) {

         if( ex != null ) {

         	 this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
         	 this.getWireFrame()._setStatusText( "RPC Error!" );
         }

         if( result ) {

		      this.getCallback()();
		      this.getWireFrame()._setStatusText( "Ready" );
         }
    },

    // -------------------------------------------------------------------------------------->
    // CONTEXT MENU'S
    // -------------------------------------------------------------------------------------->
    showContextMenu : function( ev ) {

		    // Delete command
			var drop = new qx.client.Command;
			drop.addEventListener("execute", function( e ) {

                 var tree = e.getData().getParentMenu().getOpener();
                 var selectedDB = tree.getHierarchy( tree.getDataModel().getSelectedNodes()[0].nodeId ).reverse()[0];

                 // Get confirmation before the delete operation is performed
                 var confirmCallback = qx.lang.Function.bind( this.__drop, this );
                 this.getWireFrame()._showConfirmDialog( "Are you sure you want to drop the database " + selectedDB + "?", "Delete Database", confirmCallback, selectedDB );
			}, this );

		    var createConnection = new qx.ui.menu.Button( "Create Connection", "icon/16/actions/edit-delete.png" )
		        createConnection.setEnabled( false );

            var copyTo = new qx.ui.menu.Button( "Copy To", "icon/16/actions/edit-delete.png" )
		        copyTo.setEnabled( false );

			// The button and add the command
		    this.getMenu().add( createConnection );
		    this.getMenu().add( new qx.ui.menu.Button( "Drop", "icon/16/actions/edit-delete.png", drop ) );
		    this.getMenu().add( new qx.ui.menu.Separator() );
		    this.getMenu().add( copyTo );

			this.getTree().getContextMenu().setLeft( ev.getClientX() );
			this.getTree().getContextMenu().setTop( ev.getClientY() );
			this.getTree().getContextMenu().setOpener( this.getTree() );
			this.getTree().getContextMenu().show();
    },

    terminate : function() {

        this.base( arguments );
    }
  }
});