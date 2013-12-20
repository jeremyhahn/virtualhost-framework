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

qx.Class.define( "packages.core.ui.window.SoftwareUpdates", {

  extend : vhf.Main,

  properties : {

  	    Parent        : { init : vhf.Main.getInstance() },
  	    NewPackageWin : { init : new qx.ui.window.Window( "Software Updates", "icon/16/mimetypes/package-x-generic.png" ) },
  	    ObjPackages   : { init : Array(0) },
  	    PkgName       : { init : null },
  	    PkgNamespace  : { init : null },
  	    PkgVersion    : { init : null },
  	    ParentPkgLv   : { init : null },
  	    ParentPkgLd   : { init : null }
  },

  construct : function() {

      // Initalize the object
      this.__init();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

	/**
	 * Initalizes the required data for the main method by initalizing a list of unique packages
	 */
  	__init : function() {

           var arrPackageNames = Array(0);
           this.setObjPackages( Array(0) );

           if( !this.getParent().getPackageRepositories().length )
                this.getParent()._showAlertDialog( "error",
                                                   "You must have at least one repository configured before you can install a new package.",
                                                   "New Package",
                                                   null
                                                 );

  		   // Retrieve all of the repositories
           for( var i=0; i<this.getParent().getPackageRepositories().length; i++ ) {

               // Grab the repo.config file
               var repo = this.getParent().getPackageRepositories()[i].URL;
               var req  = new qx.io.remote.Request( repo + "/repo.config", "GET", qx.util.Mime.JAVASCRIPT );

                   req.setTimeout( this.getParent().getRpcTimeout() );
                   req.setCrossDomain( false );

	              // Handle successful request
			  	  req.addEventListener( "completed", function( e ) {

		              try {
                            var objSitePackages = e.getContent();

                            // Loop through each of the packages in the repository
                            for( var j=0; j<objSitePackages.length; j++ ) {

                                 // Loop through each of the packages this user is allowed to see
                                 for( var k=0; k<this.getParent().getUserPackages().length; k++ ) {

                                      bContinue = false;

                                      // Compare versions
                                      if( this.getParent().getUserPackages()[k].namespace == objSitePackages[j].namespace && 
                                          this.getParent().getUserPackages()[k].version >= objSitePackages[j].version ) {
                                              bContinue = true;
                                              break;
                                      }
                                      if( this.getParent().getUserPackages()[k].namespace != objSitePackages[j].namespace )
                                          bContinue = true;
                                 }
                                 if( bContinue ) continue;

                                 // Skip this package if its already been retrieved from a previous repository
                                 if( arrPackageNames.indexOf( objSitePackages[i].namespace ) != -1 )
                                     continue;

                                 // Store the class name of the package
                                 arrPackageNames.push( objSitePackages[j].namespace );

                                 // Set the location object to a fully qualified path
                                 var FQpath = repo + "/" + objSitePackages[j].location;
                                 objSitePackages[j].location = FQpath;

                                 // Store the package object
                                 this.getObjPackages().push( objSitePackages[j] );
                            }

                            // Run the main method after all of the data has been retrieved
                            if( this.getParent().getPackageRepositories().length == i && objSitePackages.length == j  )
                                this.main();
		              }
		              catch( e ) {

                         // Display the exception
		              	 this.getParent()._showAlertDialog( "error", "Error getting packages: " + e , "Package Display", null );
		              }
				   }, this );

	               // Handle failed request
				   req.addEventListener( "failed", function( e ) {

				       this.getParent()._showAlertDialog( "error", "Error loading source file: " + e, "Package Source Loading Error", null );
				   });

	               // Handle timed out request
				   req.addEventListener( "timeout", function( e ) {
				       this.getParent()._showAlertDialog( "error",
				                                          "Could not load the requested source file. Request timed out.",
				                                          "Package Source Loading Error",
				                                           null
				                                        );
				   });
				   req.send();
          }
  	},
  	

    /**
     * Displays a settings window which allows administrators to manage server, package, and repository configurations.
     *
     * @type member
     */

    main : function() {

           this.getNewPackageWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
          	  });
    	      this.getNewPackageWin().setSpace( 225, 400, 12, 400 );
    	      this.getNewPackageWin().setShowStatusbar( true );

	      this.getParent()._addToWorkspace( this.getNewPackageWin() );

 		  var at1 = new qx.ui.basic.Atom( "Install New Packages", "icon/22/mimetypes/package-x-generic.png" );
		      at1.setLocation( 4, 4 );

          // Create the list view element
          var pkgLd = [];
		  var pkgLt = [ "Name", "Namespace", "Version" ];

	      var pkgLc = {

                displayName : { label : "Name",      width : 100, type : "text", sortable : true, sortProp : "text" },
		        namespace   : { label : "Namespace", width : 225, type : "text", sortable : true, sortProp : "text" },
		        version     : { label : "Version",   width : 75, type : "text", sortable : true, sortProp : "text" }
		  };

		  var pkgLv = new qx.ui.listview.ListView( pkgLd, pkgLc );

   		      pkgLv.setBorder( "dark-shadow" );
		      pkgLv.setBackgroundColor( "white" );
		      pkgLv.setWidth( 400 );
		      pkgLv.setBottom( 55 );
		      pkgLv.setLocation( 3, 40 );

          // Populate the list view with the packages available for installation
          for( var i=0; i<this.getObjPackages().length; i++ ) {

               pkgLd.push({ displayName : { text : this.getObjPackages()[i].displayName },
	                        namespace   : { text : this.getObjPackages()[i].namespace },
	                        version     : { text : this.getObjPackages()[i].version }
		       });
          }
          pkgLv.updateSort();
	      pkgLv.update();

          // Add install package button
          var installBtn = new qx.ui.form.Button( "Install Updates", "icon/16/apps/internet-download-manager.png" );
              installBtn.set({ bottom : 15, right : 10, enabled : false });
              installBtn.addEventListener( "execute", function( e ) {
              	    this.installPackage( pkgLv, pkgLd, installBtn );
              	    this.getParent._showLoadingWin();
              }, this );

          // Event handler to enable the install button when a package has been selected
		  pkgLv.getPane().getManager().addEventListener( "changeSelection", function( e ) { installBtn.setEnabled( true ) } );

   	      this.getNewPackageWin().add( at1, pkgLv, installBtn );
		  this.getNewPackageWin().open();
     },

     installPackage : function( pkgLv, pkgLd, installBtn ) {

          var items = pkgLv.getPane().getManager().getItems();
          var selectedItems = pkgLv.getPane().getSelectedItems();

          // Loop through each of the list items
          for( var i=0; i<items.length; i++ ) {

               // Loop through each of the selected list items
               for( var j=0; j<selectedItems.length; j++ ) {

                   if( items[i].namespace.text == selectedItems[j].namespace.text ) {

                       // Let the user know which package is being updating
                       this.getNewPackageWin().setStatus( "Updating package " + selectedItems[j].displayName.text + "..." );

                       // Disable the install button while update is taking place
                       if( !pkgLv.getPane().getSelectedItem().length )
                           installBtn.setEnabled( false );

                       // Get the stored package object for the selected item
                       for( var k=0; k<this.getObjPackages().length; k++ ) {

                            // Search the package objects for the desired installation package
                            if( this.getObjPackages()[k].namespace == items[i].namespace.text ) {

                               this.setPkgName( this.getObjPackages()[k].displayName );
                               this.setPkgNamespace( this.getObjPackages()[k].namespace );
                               this.setPkgVersion( this.getObjPackages()[k].version );

                               // Invoke the RPC method on the server which updates the package
				               var callback = qx.lang.Function.bind( this.__updatePackageHandler, this );
                               this.getParent()._callAsyncRpc( callback, "core.rpc.ui.Packages", "updatePackage",
                                                               this.getObjPackages()[k].location, this.getObjPackages()[k].namespace,
						                                       this.getObjPackages()[k].displayName, this.getObjPackages()[k].version
						                                     );

					           // Add the new package to the parent class UserPackages array
					           this.getParent().getUserPackages().push({ namespace   : this.getObjPackages()[k].namespace,
					                                                     status      : "disabled",
					                                                     version     : this.getObjPackages()[k].version,
					                                                     displayName : this.getObjPackages()[k].displayName
					                                                   });
                            }
                       }
                    }
                }
		   }
		this.getParent()._getLoadingWin().close();
     	installBtn.setEnabled( false );
     },

     __updatePackageHandler : function( result, ex, id ) {

     	// An exception occurred
       	if( ex != null ) {

       		this.getParent()._showAlertDialog( "error", ex.toString(), "RPC Error", null );

            // Let the user know the UI is ready for action
            this.getNewPackageWin().setStatus( "Ready" );
      		return false;
       	}

        if( result ) {

            // Let the user know the UI is ready for action
            this.getNewPackageWin().setStatus( "Ready" );
            
            // Close the new packages window
            this.getNewPackageWin().close();
        }
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