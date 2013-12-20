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
#require(qx.ui.groupbox.GroupBox)
#require(qx.io.remote.Rpc);
************************************************************************ */

qx.Class.define( "packages.core.ui.window.Settings", {

  extend : vhf.Main,

  properties : {

  	    Parent      : { init : vhf.Main.getInstance() },
  	    SettingsWin : { init : new qx.ui.window.Window( "Application Settings", "icon/16/apps/preferences.png" ) }
  },

  construct : function() {

      this.main();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

    /**
     * Displays a settings window which allows administrators to manage server, package, and repository configurations.
     *
     * @type member
     */

    main : function() {

           this.getSettingsWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
          	  });
    	      this.getSettingsWin().setSpace( 200, 400, 5, 400 );  //left //width //top //height
    	      this.getSettingsWin().setShowStatusbar( true );

	      this.getParent()._addToWorkspace( this.getSettingsWin() );

 		  var at1 = new qx.ui.basic.Atom( "Choose a tab to configure settings.", "icon/22/apps/preferences.png" );
		      at1.setLocation( 4, 4 );

          // Set up the tab view
          var tv1 = new qx.ui.pageview.tabview.TabView;
	          tv1.set({ left: 4, top: 40, right: 4, bottom: 4 });
	      var t1 = new qx.ui.pageview.tabview.Button( "System", "icon/16/categories/preferences-system.png" );
     	      t1.setChecked( true );
	      var t2 = new qx.ui.pageview.tabview.Button( "Packages", "icon/16/categories/applications-development.png" );
	      var t3 = new qx.ui.pageview.tabview.Button( "Repositories", "icon/16/devices/drive-optical.png" );
          tv1.getBar().add( t1, t2, t3 );

	      // Set up each of the tab pages
	      var p1 = new qx.ui.pageview.tabview.Page( t1 );
	      var p2 = new qx.ui.pageview.tabview.Page( t2 );
	      var p3 = new qx.ui.pageview.tabview.Page( t3 );

          tv1.getPane().add( p1, p2, p3 );

          /*
           *  Set up the system settings group boxes
           */
           // LDAP Settings
           var gb1 = new qx.ui.groupbox.GroupBox( "LDAP Settings" );
               gb1.set({ width: '100%', height: 90 });

           var lblLdap = new qx.ui.basic.Label( "Manage LDAP configuration settings", null, "text" );
               lblLdap.setPadding(2, 4);

           var btnLdapSettings    = new qx.ui.form.Button( "Settings...", "icon/16/apps/system-users.png" );
               btnLdapSettings.addEventListener( "execute", function( e ) { this.getParent()._loadPackage( "packages.core.ui.window.LdapSettings" ) }, this );
               btnLdapSettings.set({ bottom : 2, right : 2 });

           gb1.add( lblLdap, btnLdapSettings );

           // Packages Settings
           var gb2 = new qx.ui.groupbox.GroupBox( "Package Settings" );
               gb2.set({ width: '100%', height: 90, top: 100 });

           var lblPackages = new qx.ui.basic.Label( "Manage package configuration settings", null, "text" );
               lblPackages.setPadding(2, 4);

           var btnPackageSettings    = new qx.ui.form.Button( "Settings...", "icon/16/mimetypes/package-x-generic.png" );
              btnPackageSettings.addEventListener( "execute", function( e ) { this.getParent()._loadPackage( "packages.core.ui.window.PackageSettings" ) }, this );
              btnPackageSettings.set({ bottom : 2, right : 2 });
           gb2.add( lblPackages, btnPackageSettings );

           // Repository Settings
           var gb3 = new qx.ui.groupbox.GroupBox( "Repository Settings" );
               gb3.set({ width: '100%', height: 90, top: 200 });

           var lblRepo = new qx.ui.basic.Label( "Manage repository configuration settings", null, "text" );
               lblRepo.setPadding(2, 4);

           var btnRepoSettings    = new qx.ui.form.Button( "Settings...", "icon/16/devices/drive-optical.png" );
               btnRepoSettings.addEventListener( "execute", function( e ) { this.getParent()._loadPackage( "packages.core.ui.window.RepositorySettings" ) }, this );
               btnRepoSettings.set({ bottom : 2, right : 2 });
           gb3.add( lblRepo, btnRepoSettings );           
           p1.add( gb1, gb2, gb3 );

          /*
           *  Set up the packages list view
           */
          var pkgLd = [];
		  var pkgLt = [ "Name", "Namespace", "Status", "Version" ];

	      var pkgLc = {

                Name      : { label : "Name",      width : 100, type : "text", sortable : true, sortProp : "text" },
		        Namespace : { label : "Namespace", width : 225, type : "text", sortable : true, sortProp : "text" },
		        Status    : { label : "Status",    width : 50,  type : "text", sortable : true, sortProp : "text" },
		        Version   : { label : "Version",   width : 50,  type : "text", sortable : true, sortProp : "text" }
		  };

		  var pkgLv = new qx.ui.listview.ListView( pkgLd, pkgLc );

   		      pkgLv.setBorder( "dark-shadow" );
		      pkgLv.setBackgroundColor( "white" );
	          pkgLv.setWidth( '100%' );
		      pkgLv.setBottom( 40 );
		      pkgLv.setLocation( 0, 0 );

          // Adds each of the packages which the current logged on administrator is able to view
          for( var i=0; i<this.getParent().getUserPackages().length; i++ ) {

               pkgLd.push({ Name      : { text : this.getParent().getUserPackages()[i].displayName },
               	            Namespace : { text : this.getParent().getUserPackages()[i].namespace },
		                    Status    : { text : this.getParent().getUserPackages()[i].status },
		                    Version   : { text : this.getParent().getUserPackages()[i].version }
		       });
          }
          pkgLv.updateSort();
          pkgLv.update();

          // Add packages delete button
          var pkgDeleteBtn = new qx.ui.form.Button( "Delete Package", "icon/16/actions/edit-delete.png" );
              pkgDeleteBtn.set({ bottom : 2, right : 112, enabled : false });
              pkgDeleteBtn.addEventListener( "execute", function( e ) { this.__removePackage( pkgLv, pkgLd, pkgDeleteBtn ) }, this );

          // Add packages add button
          var pkgAddBtn    = new qx.ui.form.Button( "New Package", "icon/16/actions/edit-add.png" );
              pkgAddBtn.addEventListener( "execute", function( e ) { this.__addPackage( pkgLv, pkgLd ) }, this );
              pkgAddBtn.set({ bottom : 2, right : 2 });
          p2.add( pkgLv, pkgDeleteBtn, pkgAddBtn );

          // Event handler to enable the delete button when a package has been selected
		  pkgLv.getPane().getManager().addEventListener( "changeSelection", function( e ) { pkgDeleteBtn.setEnabled( true ) } );




	      /*
	       *  Set up the repositories list view
	       */
          var repLd = [];
		  var repLt = [ "Name", "URL" ];
	      var repLc = {
	      	            Name : { label : "Name", width : 200, type : "text", sortable : true, sortProp : "text" },
	      	            URL  : { label : "URL",  width : 200, type : "text", sortable : true, sortProp : "text" }
	      	          };

		  var repLv = new qx.ui.listview.ListView( repLd, repLc );

   		      repLv.setBorder( "dark-shadow" );
		      repLv.setBackgroundColor( "white" );
	          repLv.setWidth( '100%' );
		      repLv.setBottom( 40 );
		      repLv.setLocation( 0, 0 );

          for( var i=0; i<this.getParent().getPackageRepositories().length; i++ ) {

               repLd.push({ Name : { text : this.getParent().getPackageRepositories()[i].name },
                            URL  : { text : this.getParent().getPackageRepositories()[i].URL }
                          });
          }
          repLv.updateSort();
          repLv.update();

          // Add/Delete buttons for repositories tab
          var repDeleteBtn = new qx.ui.form.Button( "Delete Repository", "icon/16/actions/edit-delete.png" );
              repDeleteBtn.set({ bottom : 2, right : 127, enabled : false });
              repDeleteBtn.addEventListener( "execute", function( e ) { this.__removeRepository( repLv, repLd, repDeleteBtn ) }, this );

          var repAddBtn    = new qx.ui.form.Button( "New Repository", "icon/16/actions/edit-add.png" );
              repAddBtn.addEventListener( "execute", function( e ) { this.__addRepository( repLv, repLd ) }, this );
              repAddBtn.set({ bottom : 2, right : 2 });

		  repLv.getPane().getManager().addEventListener( "changeSelection", function( e ) { repDeleteBtn.setEnabled( true ) } );
          p3.add( repLv, repDeleteBtn, repAddBtn );

   	      this.getSettingsWin().add( at1, tv1 );
		  this.getSettingsWin().open();
     },

     // Removes the selected package(s)
	 __removePackage : function( pkgLv, pkgLd, pkgDeleteBtn ) {

           var items = pkgLv.getPane().getManager().getItems();
           var selectedItems = pkgLv.getPane().getSelectedItems();

           // Loop through each of the list items
           for( var i=0; i<items.length; i++ ) {

                // Loop through each of the selected list items
                for( var j=0; j<selectedItems.length; j++ ) {

                    if( items[i].Namespace.text == selectedItems[j].Namespace.text ) {

                        // Let the user know which package is being deleted
                        this.getSettingsWin().setStatus( "Deleting package " + selectedItems[j].Name.text + "..." );

                        // Perform the async call to delete the package
		                var rpc = new qx.io.remote.Rpc;

		                    rpc.setUrl( this.getParent().getRpcProtocol() + this.getParent().getRpcServer() );
		                    rpc.setServiceName( "core.rpc.api.Packages" );
		                    rpc.setTimeout( this.getParent().getRpcTimeout() );
		                    rpc.setCrossDomain( this.getParent().getRpcCrossDomain() );

		                var callback = qx.lang.Function.bind( this.__removePackageHandler, this );
				            rpc.callAsync( callback, "deletePackage", items[i].Namespace.text );

                        // Remove the package from the listview element
   					    pkgLd.splice( i, 1 );
   					    pkgLv.updateSort();
                        pkgLv.update();

                        // Remove the package from the parent class UserPackages array
                        for( var k=0; k<this.getParent().getUserPackages().length; k++ ) {

                         	  if( this.getParent().getUserPackages()[k].namespace == selectedItems[j].Namespace.text )
                         	      this.getParent().getUserPackages().splice( k, 1 );
                        }

                        // Remove the File->Open menu item for this package
                        //for( var l=0; l<this.getParent().getOpenMenu().length; l++ ) {
                        //     if( this.getParent().getOpenMenu()[l].getLabel() == selectedItems[j].displayName.text )
                        //         this.getParent().getOpenMenu().splice
                        //}

                        // Disable the delete button
                        if( !pkgLv.getPane().getSelectedItem().length )
                            pkgDeleteBtn.setEnabled( false );
                    }
                }
		   }
     },

     __removePackageHandler : function( result, ex, id ) {

          if( ex != null ) {

             this.getSettingsWin().setStatus( "Ready" );
             this.getParent()._showAlertWin( "error", ex.toString(), "RPC Failure" );
             return false;
          }

          if( result )          
              this.getSettingsWin().setStatus( "Ready" );
     },

     __addPackage : function( pkgLv, pkgLd ) {

     	 var args = Array(2);
             args[0] = pkgLv;
             args[1] = pkgLd;

     	 this.getParent()._loadPackage( "packages.core.ui.window.NewPackage", args );
     },

	 __removeRepository : function( repLv, repLd, repDeleteBtn ) {

           var items = repLv.getPane().getManager().getItems();
           var selectedItems = repLv.getPane().getSelectedItems();

           // Loop through each of the list items
           for( var i=0; i<items.length; i++ ) {

                // Loop through each of the selected list items
                for( var j=0; j<selectedItems.length; j++ ) {

                    if( items[i].URL.text == selectedItems[j].URL.text ) {

                        // Let the user know which package is being deleted
                        this.getSettingsWin().setStatus( "Deleting repository " + selectedItems[j].URL.text + "..." );

		                var rpc = new qx.io.remote.Rpc;

		                    rpc.setUrl( this.getParent().getRpcProtocol() + this.getParent().getRpcServer() );
		                    rpc.setServiceName( "core.rpc.api.Packages" );
		                    rpc.setTimeout( this.getParent().getRpcTimeout() );
		                    rpc.setCrossDomain( this.getParent().getRpcCrossDomain() );

		                var callback = qx.lang.Function.bind( this.__removeRepositoryHandler, this );
				            rpc.callAsync( callback, "deleteRepository", items[i].URL.text );

   					    repLd.splice( i, 1 );

   					    repLv.updateSort();
                        repLv.update();

                        if( !repLv.getPane().getSelectedItem().length )
                            repDeleteBtn.setEnabled( false );
                    }
                }
		   }
     },

     __removeRepositoryHandler : function( result, ex, id ) {

          if( ex != null ) {

             this.getSettingsWin().setStatus( "Ready" );
             this.getParent()._showAlertDialog( "error", ex.toString(), "RPC Failure" );
             return false;
          }
          
          if( result )
              this.getSettingsWin().setStatus( "Ready" );
     },

     __addRepository : function( repLv, repLd ) {

         var args = Array(2);
             args[0] = repLv;
             args[1] = repLd;

     	 this.getParent()._loadPackage( "packages.core.ui.window.NewRepository", args );
     },

    /**
     * TODOC
     *
     * @type member
     */
    close : function()
    {
      this.base(arguments);

      // Prompt user
      // return "Do you really want to close the application?";
    },

    /**
     * TODOC
     *
     * @type member
     */
    terminate : function() {
      this.base(arguments);
    }
  }
});