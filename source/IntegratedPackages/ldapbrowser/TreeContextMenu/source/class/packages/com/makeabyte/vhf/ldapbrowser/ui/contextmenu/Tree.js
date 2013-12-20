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
qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.contextmenu.Tree", {

  extend : vhf.Main,

  properties : {

  	  WireFrame        : { init : vhf.Main.getInstance() }, 
  	  Tree          : { },
  	  BaseDn        : { init : "" },
  	  Menu          : { init : new qx.ui.menu.Menu },
  	  MenuType      : { init : "" },
  	  ObjectDn      : { },
  	  TreeCallback  : { },
  	  TableCallback : { },
  	  BtnCut        : { init : new qx.ui.menu.Button( "Copy", "icon/16/actions/edit-copy.png" ) },
  	  BtnPaste      : { init : new qx.ui.menu.Button( "Paste", "icon/16/actions/edit-paste.png" ) },
  	  CutDn         : { init : "" }
  },

  construct : function( obj ) {

     this.setTree( obj[0] );
     this.setTreeCallback( obj[1] );
     this.setTableCallback( obj[2] );
     this.setBaseDn( obj[3] );
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
            var tbl = this.getTree();

            // Default the paste button to disabled
            this.getBtnPaste().setEnabled( false );

			// Capture the context menu event listener
			tbl.setContextMenu( this.getMenu() );
			tbl.addEventListener( "contextmenu", function( e ) {

	            // Flush the menu items (will still be populated if the object has already been instantiated)
	            this.flushMenu();

	            // Extract the RDN from the tree 
	           	var dn = this.getTree().getHierarchy( this.getTree().getSelectedNodes()[0] ).reverse().join( "," );
	        	    dn = dn.replace( /<div style='display:none'>/ig, "" );
	        	    dn = dn.replace( /<\/div>/ig, "=" );

	            // Store the dn of the object which was clicked
	            this.setObjectDn( dn );

                // Display appropriate context menu based on the node type clicked (root|main)
	            if( dn == this.getBaseDn() )
	                this.showRootContextMenu( e );
	            else
	                this.showObjectContextMenu( e );

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

        this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties." + type, obj );
    },

   
    // -------------------------------------------------------------------------------------->
    // CONTEXT MENU'S
    // -------------------------------------------------------------------------------------->
   /**
    * Displays a context menu specific to the root ldap server node 
    * 
    * @type member
    * @param ev {Event} The event from the table content menu click
    */
    showRootContextMenu : function( ev ) {
 
            // Pase command
			var paste = new qx.client.Command;
			paste.addEventListener("execute", function( e ) {

                // Append the name of the object being moved onto the destination object
                var pieces = this.getCutDn().split( "," );
                var newDn = pieces[0] + "," + this.getObjectDn();

                // Copy the selected object and its siblings to the selected location
                var callback = qx.lang.Function.bind( this.__refreshTreeHandler, this );
                this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "moveSubtree", this.getCutDn(), newDn );                  

                // Reset the copy/paste button relationship
                this.getBtnPaste().setEnabled( false );
                this.getBtnCut().setEnabled( true );

			}, this );
			
			// The button and add the command
			this.setBtnPaste( new qx.ui.menu.Button( "Paste", "icon/16/actions/edit-copy.png", paste ) );
			this.getBtnPaste().setEnabled( (this.getBtnCut().getEnabled() == false) );
			this.getMenu().add( this.getBtnPaste() );

    	    /*
    	     * TODO: Add ability to configure LDAP replication partners, etc
			this.getMenu().add( new qx.ui.menu.Button( "Configure...", "icon/16/actions/edit-copy.png" ) );
			this.getMenu().add( new qx.ui.menu.Separator() );
			this.getMenu().add( new qx.ui.menu.Button( "Add Server", "icon/16/actions/edit-delete.png" ) )
			this.getMenu().add( new qx.ui.menu.Separator() );
			this.getMenu().add( new qx.ui.menu.Button( "Replication...", "icon/16/actions/edit-delete.png" ) );
			*/

			this.getTree().getContextMenu().setLeft( ev.getClientX() );
			this.getTree().getContextMenu().setTop( ev.getClientY() );
			this.getTree().getContextMenu().setOpener( this.getTree() );
			this.getTree().getContextMenu().show();
    },

   /**
    * Displays a context menu specific to the child objects of the root tree node 
    * 
    * @type member
    * @param ev {Event} The event from the table content menu click
    */
    showObjectContextMenu : function( ev ) {

            // Cut command
			var cut = new qx.client.Command;
			cut.addEventListener("execute", function( e ) {

                 // A little button trickery to make it look like the copy command is doing something important
                 this.setCutDn( this.getObjectDn() );
                 this.getBtnPaste().setEnabled( true );
                 this.getBtnCut().setEnabled( false );

			}, this );
			
			// Refresh Command
			var refresh = new qx.client.Command;
			refresh.addEventListener( "execute", function( e ) {

				  this.getWireFrame()._callAsyncRpc( this.getTreeCallback(), "core.rpc.API", "invoke", "LDAP", "getTreeSource", null );
			}, this );

		    // Paste command
			var paste = new qx.client.Command;
			paste.addEventListener("execute", function( e ) {

                // Append the name of the object being moved onto the destination object
                var pieces = this.getCutDn().split( "," );
                var newDn = pieces[0] + "," + this.getObjectDn();

                // Copy the selected object and its siblings to the selected location
                var callback = qx.lang.Function.bind( this.__refreshTreeHandler, this );
                this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "moveSubtree", this.getCutDn(), newDn );                  

                // Reset the copy/paste button relationship
                this.getBtnPaste().setEnabled( false );
                this.getBtnCut().setEnabled( true );

			}, this );

            // Delete command
			var del = new qx.client.Command;
			del.addEventListener("execute", function( e ) {

                 var callback = qx.lang.Function.bind( this.__deleteConfirmationHandler, this );
     		     this.getWireFrame()._showConfirmDialog( "Are you sure you want to delete this object and all its children?", "Delete Confirmation", callback, this.getObjectDn() );

			}, this );

            // Rename command
			var rename = new qx.client.Command;
			rename.addEventListener("execute", function( e ) {

                 var callback = qx.lang.Function.bind( this.__renameHandler, this );
     		     this.getWireFrame()._showPromptDialog( "Enter the new name for this directory object.", "Rename", callback );

			}, this );

			// Attributes command
			var attr = new qx.client.Command;
			attr.addEventListener("execute", function( e ) {

     		    // Perform JSON RPC call to open attributes window
                var callback = qx.lang.Function.bind( this.__getAttribsHandler, this );
                this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "getAttributes", this.getObjectDn() );

			}, this );
			
			// New zone
			var newZone = new qx.client.Command;
			newZone.addEventListener("execute", function( e ) {

                this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewZone", Array( this.getObjectDn(), this.getTableCallback() ) );

			}, this );
			
			// New sudo role
			var newSudo = new qx.client.Command;
			newSudo.addEventListener("execute", function( e ) {

                this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewSudoRole", Array( this.getObjectDn(), this.getTableCallback() ) );

			}, this );

			// New Organizational Unit command
			var newOU = new qx.client.Command;
			newOU.addEventListener("execute", function( e ) {

                var callback = new qx.lang.Function.bind( this.__newOrganizationalUnit, this );
                this.getWireFrame()._showPromptDialog( "Type the name of the new organizational unit.", "New Organizational Unit", callback, "icon/16/places/folder.png" );

			}, this );

			// New Repository command
			var newRepo = new qx.client.Command;
			newRepo.addEventListener("execute", function( e ) {

                this.__newRepository();

			}, this );

			// New User Account command
			var newUser = new qx.client.Command;
			newUser.addEventListener("execute", function( e ) {

                this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewAccount", Array( this.getObjectDn(), this.getTableCallback(), this.getTreeCallback() ) )

			}, this );
			
			// New Group command
			var newGrp = new qx.client.Command;
			newGrp.addEventListener("execute", function( e ) {

                this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewGroup", Array( this.getObjectDn(), this.getTableCallback(), "posixGroup" ) )

			}, this );
			
			// New Mailing List command
			var newMl = new qx.client.Command;
			newMl.addEventListener("execute", function( e ) {

                this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewGroup", Array( this.getObjectDn(), this.getTableCallback(), "mailingList" ) )

			}, this );

			// New Generic Group command
			var newGg = new qx.client.Command;
			newGg.addEventListener("execute", function( e ) {

                this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewGroup", Array( this.getObjectDn(), this.getTableCallback(), "groupOfNames" ) )

			}, this );

			// New Package command
			var newPkg = new qx.client.Command;
			newPkg.addEventListener("execute", function( e ) {

                var args = Array( this.getObjectDn(), this.getTableCallback() );
                this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewPackage", args );

			}, this );

			// New Apache Virtual Host command
			var newApacheVHost = new qx.client.Command;
			newApacheVHost.addEventListener("execute", function( e ) {

                this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewApacheConfig", Array( this.getObjectDn(), this.getTableCallback() ) );
			}, this );

			// The button and add the command
			this.setBtnPaste( new qx.ui.menu.Button( "Paste", "icon/16/actions/edit-copy.png", paste ) );
			this.getBtnPaste().setEnabled( (this.getBtnCut().getEnabled() == false) );
			this.getMenu().add( this.getBtnPaste() );
			
			this.setBtnCut( new qx.ui.menu.Button( "Cut", "icon/16/actions/edit-cut.png", cut ) );
			this.getBtnCut().setEnabled( (this.getBtnPaste().getEnabled() == false) );
			this.getMenu().add( this.getBtnCut() );

			this.getMenu().add( new qx.ui.menu.Button( "Rename", "icon/16/actions/edit.png", rename ) );
			this.getMenu().add( new qx.ui.menu.Button( "Delete", "icon/16/actions/edit-delete.png", del ) );
			this.getMenu().add( new qx.ui.menu.Button( "Refresh", "icon/16/actions/view-refresh.png", refresh ) );

			this.getMenu().add( new qx.ui.menu.Separator() );

			var m2 = new qx.ui.menu.Menu;
			var m2_1 = new qx.ui.menu.Button( "User Account", "icon/16/actions/identity.png", newUser );
			var m2_2 = new qx.ui.menu.Button( "Security Group", "icon/16/apps/system-users.png", newGrp );
			var m2_3 = new qx.ui.menu.Button( "Generic Group", "icon/16/apps/accessories-notes.png", newGg );
			var m2_4 = new qx.ui.menu.Button( "Mailing List", "icon/16/actions/mail.png", newMl );
			var m2_5 = new qx.ui.menu.Button( "Apache Virtual Host", "resource/vhf/icon/apache.png", newApacheVHost );
			var m2_6 = new qx.ui.menu.Button( "Sudo Role", "icon/16/categories/applications.png", newSudo );
			var m2_sep1 = new qx.ui.menu.Separator();
			var m2_7 = new qx.ui.menu.Button( "Package", "icon/16/apps/accessories-archiver.png", newPkg );
			var m2_8 = new qx.ui.menu.Button( "Respository", "icon/16/apps/internet-download-manager.png", newRepo );
			var m2_sep2 = new qx.ui.menu.Separator();
			var m2_9 = new qx.ui.menu.Button( "Organizational Unit", "icon/16/actions/folder-new.png", newOU );
			var m2_10 = new qx.ui.menu.Button( "DNS Zone", "icon/16/places/network-server.png", newZone );

			m2.add( m2_1, m2_2, m2_3, m2_4, m2_5, m2_6, m2_sep1, m2_7, m2_8, m2_sep2, m2_9, m2_10 );
			m2.addToDocument();

			this.getMenu().add( new qx.ui.menu.Button( "New", "icon/16/actions/edit-copy.png", null, m2 ) );
			this.getMenu().add( new qx.ui.menu.Separator() );

            this.getMenu().add( new qx.ui.menu.Button( "Attributes","icon/16/actions/system-run.png", attr ) );

			this.getTree().getContextMenu().setLeft( ev.getClientX() );
			this.getTree().getContextMenu().setTop( ev.getClientY() );
			this.getTree().getContextMenu().setOpener( this.getTree() );
			this.getTree().getContextMenu().show();
    },

   /**
    * Handles a confirmation callback for a delete command 
    * 
    * @type member
    */
    __deleteConfirmationHandler : function() {
    	
    	// Perform JSON RPC call to populate the relocate the object
        var callback = qx.lang.Function.bind( this.__refreshTreeHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "deleteSubtree", this.getObjectDn() );
    },

   /**
    * Renames an object in the tree (and updates its children dn's and member's) 
    * 
    * @type member
    * @param ev {Event} The event from the table content menu click
    */
    __renameHandler : function( input ) {

    	// Create the new distinguished name for the object
    	var pieces  = this.getObjectDn().split( "," );
        var namePieces = pieces[0].split( "=" );  
        var newName = namePieces[0] + "=" + input;

    	var newDn = this.getObjectDn().replace( this.getObjectDn().split( "," )[0], newName );

  	    // Perform JSON RPC call to populate the relocate the object
        var callback = qx.lang.Function.bind( this.__refreshTreeHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "moveSubtree", this.getObjectDn(), newDn );
    },

   /**
    * Refreshes the ldap browser tree after an RPC task has been performed 
    * 
    * @type member
    * @param result {Object} The JSON RPC server response object
    * @param ex {Object} The JSON RPC exception handling object
    * @param id {Integer} The id of the JSON RPC request
    */
    __refreshTreeHandler : function( result, ex, id ) {

           // Handle exception
           if( ex != null ) {

               this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
               this.getWireFrame()._setStatusText( "RPC Error!" );  
           }

           // Update the tree to reflect the move  
           if( result )
               this.getWireFrame()._callAsyncRpc( this.getTreeCallback(), "core.rpc.API", "invoke", "LDAP", "getTreeSource", null );
    },

   /**
    * Handles the click request for an objects attributes by opening the attributes properties window and loading the requested objects attributes 
    * 
    * @type member
    * @param result {Object} The JSON RPC server response object
    * @param ex {Object} The JSON RPC exception handling object
    * @param id {Integer} The id of the JSON RPC request
    */
    __getAttribsHandler : function( result, ex, id ) {

           // Handle exception
           if( ex != null ) {
            
               this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
               this.getWireFrame()._setStatusText( "RPC Error" );
           }

           // Load the requested object's attributes
           if( result )
    	      this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Attributes", Array( result, this.getTreeCallback() ) );
    },

   /**
    * Handles the response fromt he new organizational unit prompt box 
    * 
    * @type member
    * @param input {String} The value the user entered into the prompt box
    */
    __newOrganizationalUnit : function( input ) {

         // Define the new dn for the new domain component 
         var dn = "ou=" + input + "," + this.getObjectDn();

         // Perform JSON RPC call to add the new domain component
         var callback = qx.lang.Function.bind( this.__refreshTreeHandler, this );
         this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "addOrganizationalUnit", dn );
    },

   /**
    * Handles the click event to create a new repository by loading the new repository window 
    * 
    * @type member
    */
    __newRepository : function() {
    	
    	this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewRepository", Array( this.getObjectDn(), this.getTableCallback() ) );
    },
    
   /**
    * Handles the click event to install a new package by loading the install new package window 
    * 
    * @type member
    */
    __newPackage : function() {
    	
    	this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewPackage", Array( this.getObjectDn(), this.getTableCallback() ) );
    },

    terminate : function() {

          this.base( arguments );
    }
  }
});