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
qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.contextmenu.Object", {

  extend : vhf.Main,

  properties : {

  	  WireFrame   : { init : vhf.Main.getInstance() },
  	  BaseDn   : { },
  	  Menu     : { init : new qx.ui.menu.Menu },
  	  MenuType : { },
  	  ObjTable : { },
  	  ObjectDn : { },
  	  Callback : { }
  },

  construct : function( obj ) {

     this.setObjTable( obj[0] );
     this.setCallback( obj[1] );
     this.setBaseDn( obj[2] );
  	 this.main();
  },

  members : {

    /**
     * Displays the right click context menu when a user clicks on an LDAP object on the right hand pane
     *
     * @type member
     * @type param object obj The table object to bind the context menu listener to
     */
    main : function() {

            this.getMenu().addToDocument();
            var tbl = this.getObjTable();

			// show the context-menu
			tbl.setContextMenu( this.getMenu() );
			tbl.addEventListener( "contextmenu", function( e ) {

                    this.flushMenu();

                    // Determine what type of menu to show
		            var selectedObjects = this.getObjTable().getSelectionModel().getSelectedRanges();
		            for( var i=0; i<selectedObjects.length; i++ ) {
		                
		                 this.setMenuType( this.getObjTable().getTableModel().getValue( 2, selectedObjects[i].minIndex ) );

	                     // Set the DN of the object which was right clicked
	                     this.setObjectDn( this.getObjTable().getTableModel().getValue( 3, this.getObjTable().getSelectionModel().getSelectedRanges()[0].minIndex ).dn );

	                     // Launch the context menu based on the object type
                         (this.getMenuType() == "Account" ) ? this.showAccountContextMenu( e ) : this.showGenericContextMenu( e );
                    }
			}, this );
    },

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
    loadProperties : function( type, obj ) {

        /*
    	if( type == "posixGroup" || type == "Domain" )
    	   this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Attributes", obj );
    	
    	else if( type == "groupOfNames" )
    	   this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Group", obj );
    	
    	else
            this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties." + type, obj );
        */
        switch( type ) {
        	
        	    case "posixGroup":
        	    
        	          this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Attributes", obj );
        	          break;

        	    case "groupOfNames":

        	         this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Group", obj );
        	         break;

        	    case "sudoRole":
        	    
        	         this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Sudo", obj );
        	         break;

        	    default:
        	         this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties." + type, obj );
        	         break;        	         
        }
    },

  /**
    * Handles a delete button click event by performing JSON RPC call to backend
    * 
    * @type member
    * @param string type The type of object properties being requested.
    * @param object obj The object
    */
    __confirmDeleteHandler : function( obj ) {

        // Package objects need to have the file system cleaned up so
        // they need to be treated differently
        if( this.getWireFrame().isArray( obj ) ) {

            var json = '[' +
	                      
	                      '{ "name" : "dn", "dn" : "' + this.getObjectDn() + '"},' +
	                      '{ "name" : "packageClasspath", "packageClasspath" : "' + obj[1] + '"}' +
                     ']';
                     
                     alert( json );
                     
            var callback = qx.lang.Function.bind( this.__deletePackageHandler, this );
	        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "PACKAGE", "delete", json );
        }
        else {

        	var callback = qx.lang.Function.bind( this.__doDeleteHandler, this );
            this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "delete", obj );
        }
    },

   /**
    * Handles the delete JSON RPC server response
    */
    __doDeleteHandler : function( result, ex, id ) {

    	  if( ex != null ) {

    	  	  this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
    	  	  this.getWireFrame()._setStatusText( "RPC Error!" );
    	  }

          if( result ) {

	          // Remove the entry from the table
	          var selectedObjects = this.getObjTable().getSelectionModel().getSelectedRanges();
	          for( var i=0; i<selectedObjects.length; i++ ) {

	               var rowCount = this.getObjTable().getTableModel().getRowCount();
	               for( var j=0; j<rowCount; j++ ) {

		                if( this.getObjTable().getTableModel().getValue( 3, j ).dn == this.getObjTable().getTableModel().getValue( 3, selectedObjects[i].minIndex ).dn )
		                    this.getObjTable().getTableModel().removeRows( j, 1 );
	               }
	          }
	          this.getWireFrame()._setStatusText( "Ready" );
         }
    },

    // -------------------------------------------------------------------------------------->
    // CONTEXT MENU'S
    // -------------------------------------------------------------------------------------->

    showGenericContextMenu : function( ev ) {

		    // Rename command
			var rename = new qx.client.Command;
			rename.addEventListener("execute", function( e ) {

                 var callback = qx.lang.Function.bind( this.__renameObject, this );
  		         this.getWireFrame()._showPromptDialog( "Enter the new name for this directory object.", "Rename", callback );
			}, this );

		    // Delete command
			var del = new qx.client.Command;
			del.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                for( var i=0; i<selectedObjects.length; i++ ) {

                     // Get confirmation before the delete operation is performed
                     var confirmCallback = qx.lang.Function.bind( this.__confirmDeleteHandler, this );
                     
                     if( this.getWireFrame().propertiesToArray( table.getTableModel().getValue( 3, selectedObjects[i].minIndex ).objectclass ).indexOf( "virtualHostFrameworkPackage" ) >= 0 )
                	     this.getWireFrame()._showConfirmDialog( "Are you sure you want to delete " + table.getTableModel().getValue( 0, selectedObjects[i].minIndex ) + "?", "LDAP Object Delete", confirmCallback, Array( table.getTableModel().getValue( 3, selectedObjects[i].minIndex ).dn, table.getTableModel().getValue( 3, selectedObjects[i].minIndex ).packageclasspath[0] ) )
                	 else
                	     this.getWireFrame()._showConfirmDialog( "Are you sure you want to delete " + table.getTableModel().getValue( 0, selectedObjects[i].minIndex ) + "?", "LDAP Object Delete", confirmCallback, table.getTableModel().getValue( 3, selectedObjects[i].minIndex ).dn )
                }
			}, this );

			// Properties command
			var prop = new qx.client.Command;
			prop.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                for( var i=0; i<selectedObjects.length; i++ ) {

                	var type = "";
                	(table.getTableModel().getValue( 2, selectedObjects[i].minIndex ) == "Misc") ? type = "Attributes" : type = table.getTableModel().getValue( 2, selectedObjects[i].minIndex );
                	this.loadProperties( type, Array( table.getTableModel().getValue( 3, selectedObjects[i].minIndex ), this.getCallback() ) ); 
                }
			}, this );

			// Attributes command
			var attr = new qx.client.Command;
			attr.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                for( var i=0; i<selectedObjects.length; i++ )
                	 this.loadProperties( "Attributes", Array( table.getTableModel().getValue( 3, selectedObjects[i].minIndex ), this.getCallback() ) );
			}, this );

			// The button and add the command
		    this.getMenu().add( new qx.ui.menu.Button( "Rename", "icon/16/actions/edit.png", rename ) );
		    this.getMenu().add( new qx.ui.menu.Button( "Delete", "icon/16/actions/edit-delete.png", del ) );

		    this.getMenu().add( new qx.ui.menu.Separator() );

			this.getMenu().add( new qx.ui.menu.Button( "Properties","icon/16/actions/edit-find.png", prop ) );
			this.getMenu().add( new qx.ui.menu.Button( "Attributes","icon/16/actions/system-run.png", attr ) );

			this.getObjTable().getContextMenu().setLeft( ev.getClientX() );
			this.getObjTable().getContextMenu().setTop( ev.getClientY() );
			this.getObjTable().getContextMenu().setOpener( this.getObjTable() );
			this.getObjTable().getContextMenu().show();
    },

    showAccountContextMenu : function( ev ) {

		    // Delete command
			var del = new qx.client.Command;
			del.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                for( var i=0; i<selectedObjects.length; i++ ) {

                     // Get confirmation before the delete operation is performed
                     var confirmCallback = qx.lang.Function.bind( this.__confirmDeleteHandler, this );
                	 this.getWireFrame()._showConfirmDialog( "Are you sure you want to delete " + table.getTableModel().getValue( 0, selectedObjects[i].minIndex ) + "?", "LDAP Object Delete", confirmCallback, table.getTableModel().getValue( 3, selectedObjects[i].minIndex ).dn )
                }
			}, this );

			// Properties command
			var prop = new qx.client.Command;
			prop.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                for( var i=0; i<selectedObjects.length; i++ ) {

                	var type = "";
                	(table.getTableModel().getValue( 2, selectedObjects[i].minIndex ) == "Misc") ? type = "Attributes" : type = table.getTableModel().getValue( 2, selectedObjects[i].minIndex );
                	this.loadProperties( type, Array( table.getTableModel().getValue( 3, selectedObjects[i].minIndex ), this.getCallback() ) ); 
                }
			}, this );

			// Attributes command
			var attr = new qx.client.Command;
			attr.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                for( var i=0; i<selectedObjects.length; i++ )
                	 this.loadProperties( "Attributes", Array( table.getTableModel().getValue( 3, selectedObjects[i].minIndex ), this.getCallback() ) );
			}, this );

			// Reset password command
			var rpw = new qx.client.Command;
			rpw.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                for( var i=0; i<selectedObjects.length; i++ )
                	 this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.SetPassword", Array( table.getTableModel().getValue( 3, selectedObjects[i].minIndex ).dn, this.getCallback() ) );
                
			}, this );

			// The button and add the command
			this.getMenu().add( new qx.ui.menu.Button( "Delete", "icon/16/actions/edit-delete.png", del ) )
			
			this.getMenu().add( new qx.ui.menu.Separator() );

			this.getMenu().add( new qx.ui.menu.Button( "Set Password", "icon/16/status/dialog-password.png", rpw ) );

			var m2   = new qx.ui.menu.Menu;
			var m2_1 = new qx.ui.menu.Button( "Website", "icon/16/actions/edit-add.png" );
			   m2_1.addEventListener( "execute", function( e ) { alert( "i work!" ); }, this );
			m2.add( m2_1 );

            this.getMenu().add( new qx.ui.menu.Button( "New", "icon/16/actions/edit-add.png",  null, m2 ) );

			this.getMenu().add( new qx.ui.menu.Separator() );

            this.getMenu().add( new qx.ui.menu.Button( "Properties","icon/16/actions/edit-find.png", prop ) );
            this.getMenu().add( new qx.ui.menu.Button( "Attributes","icon/16/actions/system-run.png", attr ) );

			m2.addToDocument();

			this.getObjTable().getContextMenu().setLeft( ev.getClientX() );
			this.getObjTable().getContextMenu().setTop( ev.getClientY() );
			this.getObjTable().getContextMenu().setOpener( this.getObjTable() );
			this.getObjTable().getContextMenu().show();
    },

    __renameObject : function( input ) {

          // Create the new name
          var dnPieces = this.getObjTable().getTableModel().getValue( 3, this.getObjTable().getSelectionModel().getSelectedRanges()[0].minIndex ).dn.split( "," );
          var namePieces = dnPieces[0].split( "=" );  
          var newName = namePieces[0] + "=" + input;

    	  // Create the new distinguished name for the object
    	  var newDn  = this.getObjectDn().replace( this.getObjectDn().split( "," )[0] + ",", "" );

  	      // Perform JSON RPC call to populate the relocate the object
          var callback = qx.lang.Function.bind( this.__renameObjectHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "rename", this.getObjectDn(), newName, newDn );
    },

    __renameObjectHandler : function( result, ex, id ) {

          if( ex != null ) {

              // Alert the user of the exception          	
          	  this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
          	  this.getWireFrame()._setStatusText( "RPC Error!" );
          }

          if( result ) {

              // Create parent dn
              var pieces = this.getObjectDn().split( "," )[0].split( "=" );
              var dn = this.getObjectDn().replace( pieces[0] + "=" + pieces[1] + ",", "" ); 

              // Invoke callback method to refresh the browser table
              this.getCallback()( dn );

              // Update the status bar
              this.getWireFrame()._setStatusText( "Ready" );
          }
    },
    
    __deletePackageHandler : function( result, ex, id ) {

    	  if( ex != null ) {

              // Alert the user of the exception
          	  this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
          	  this.getWireFrame()._setStatusText( "RPC Error!" );
          }

          if( result ) {
          	
          	  // Create an RDN for the tree object (this object's parent) for the callback method
          	  var pieces = this.getObjectDn().split( "," )[0].split( "=" );
          	  var parentDn = this.getObjectDn().replace( pieces[0] + "=" + pieces[1] + ",", "" );

              // Invoke callback method
              this.getCallback()( parentDn );

              // Update the status bar
              this.getWireFrame()._setStatusText( "Ready" );
          }
    },

    terminate : function() {

          this.base( arguments );
    }
  }
});