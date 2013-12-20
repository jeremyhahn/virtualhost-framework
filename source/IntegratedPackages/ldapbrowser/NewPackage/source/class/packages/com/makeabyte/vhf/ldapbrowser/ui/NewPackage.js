/* ************************************************************************
#
#  P2P Hosting Network Control Panel UI
#
#  http://www.p2phost.org
#
#  Copyright:
#    2007 Make A Byte, inc, http://www.makeabyte.com
#
#  Author:
#    * Jeremy Hahn
#
#  Version: 0.1b
#
# P2P Hosting Network Control Panel
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

qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewPackage", {

  extend : vhf.Main,

  properties : {

  	    WireFrame       : { init : vhf.Main.getInstance() },
  	    NewPackageWin   : { },
  	    Table           : { },
  	    ObjPackages     : { init : [] },
  	    ParentOuDn      : { },
  	    Callback        : { }
  },

  construct : function( args ) {

      this.setParentOuDn( args[0] );
      this.setCallback( args[1] );

	  // Initalize the package installation widget
      this.__init();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {
  	
  	main : function() {
  		
  		
  		// Create the window
          this.setNewPackageWin( new qx.ui.window.Window( "Install New Package(s)", "icon/16/" + this.getWireFrame().getAppIcon() ) );
          this.getNewPackageWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
          });
    	  this.getNewPackageWin().setSpace( 225, 400, 12, 400 );
    	  this.getNewPackageWin().setShowStatusbar( false );
    	  this.getNewPackageWin().removeAll();

          var tableModel = new qx.ui.table.model.Simple();
	          tableModel.setColumns([ "Name", "Classpath", "Version" ]);

	      // Create a custom column model
	      var custom = { tableColumnModel : function( obj ) {
	                return new qx.ui.table.columnmodel.Resize( obj );
	          }
	      };
	      this.setTable( new qx.ui.table.Table( tableModel, custom ) );

	      // Configure the table
		  with ( this.getTable() ) {
	
			     set({ width: '100%', height: '100%', border: "inset-thin" });
			     setMetaColumnCounts( [ 1, -1 ] );
			     getSelectionModel().setSelectionMode( qx.ui.table.selection.Model.SINGLE_SELECTION );
		  };

	      // Configure table sizing and sizing beghaviors
	      var tcm = this.getTable().getTableColumnModel();
	
	      // Obtain the behavior object to manipulate
	      var resizeBehavior = tcm.getBehavior();
	
	      // Name column dimensions
	      resizeBehavior.setWidth( 0, 100 );
	      resizeBehavior.setMinWidth( 0, 50 );
	      resizeBehavior.setMaxWidth( 0, 300 );
	      // Description column dimensions
	      resizeBehavior.setWidth( 1, 350 );
	      resizeBehavior.setMinWidth( 1, 50);
	      resizeBehavior.setMaxWidth( 1, 500);
	      // Type column dimensions
	      resizeBehavior.setWidth( 2, 100 );
	      resizeBehavior.setMinWidth( 2, 25 );
	      resizeBehavior.setMaxWidth( 2, 200 );

          // Add the icon and tale elements and open the window
   	      this.getNewPackageWin().add( this.getTable() );
		  this.getNewPackageWin().open();
		  this.getWireFrame()._addToWorkspace( this.getNewPackageWin() );

		  // Add event listener to install the package
          this.getTable().addEventListener( "dblclick", function( e ) { this.installPackage() }, this );
          
          // Remove any packages from the table if its already been populated
          //this.getTable().removeAll();

  		  var rowData = [];
          // Populate the rowData arrayy with the packages available for installation
          for( var i=0; i<this.getObjPackages().length; i++ )
               rowData.push( [ this.getObjPackages()[i].displayName, this.getObjPackages()[i].classpath, this.getObjPackages()[i].version, this.getObjPackages()[i].location ] );

          // Display the data in the table
          this.getTable().getTableModel().setData( rowData );
  	},

	/**
	 * Initalizes the required data for the main method by initalizing a list of unique packages
	 */
  	__init : function() {

             // Perform JSON RPC call to get a list of repositories
             var callback = qx.lang.Function.bind( this.__getRepositoriesHandler, this );
             this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "PACKAGE", "getRepositories", '[]' );
  	},

  	__getRepositoriesHandler : function( result, ex, id ) {

  	       	if( ex!= null )
  	       	    this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC ERROR" );

  	       	if( !result.length )
	                this.getWireFrame()._showAlertDialog( "error",
	                                                      "You must have at least one repository configured before you can install a new package.",
	                                                      "New Package",
	                                                       null
	                                                    );

  	       	if( result ) {

	  	       	var arrPackageNames = Array(0);
	  	       	this.setObjPackages( Array(0) );

	  		    // Iterate through each of the repositories
	            for( var i=0; i<result.length; i++ ) {

	                  // Grab the repo.config file
	                  var repo = result[i].URL;
	                  var req  = new qx.io.remote.Request( repo + "/repo.config", "GET", qx.util.Mime.JAVASCRIPT );
	
	                   req.setTimeout( this.getWireFrame().getRpcTimeout() );
	                   req.setCrossDomain( false );
	
		               // Handle successful request
				  	   req.addEventListener( "completed", function( e ) {
	
			               try {
	                            var objSitePackages = e.getContent();
	
	                            // Loop through each of the packages
	                            for( var j=0; j<objSitePackages.length; j++ ) {
	
	                                 // Skip this package if its already been retrieved from a previous repository
	                                 if( arrPackageNames.indexOf( objSitePackages[j].classpath ) != -1 )
	                                     continue;
	
	                                 // Skip this package if its already installed
	                                 for( var k=0; k<this.getWireFrame().getUserPackages().length; k++ ) {
	
	                                      bContinue = false;
	
	                                      if( this.getWireFrame().getUserPackages()[k].packageClasspath[0] == objSitePackages[j].classpath ) {
	                                          var bContinue = true;
	                                          break;
	                                      }
	                                 }
	                                 if( bContinue ) continue;
	
	                                 // Store the class name of the package
	                                 arrPackageNames.push( objSitePackages[j].classpath );
	
	                                 // Set the location object to a fully qualified path
	                                 var FQpath = repo + "/" + objSitePackages[j].location;
	                                 objSitePackages[j].location = FQpath;
	
	                                 // Store the package object
	                                 this.getObjPackages().push( objSitePackages[j] );
	                            }

	                            // Run the main method after all of the data has been retrieved
		                        if( this.getWireFrame().getPackageRepositories().length == i && objSitePackages.length == j  )
		                            this.main();
				                
			              }
			              catch( e ) {
	
	                         // Display the exception
			              	 this.getWireFrame()._showAlertDialog( "error", "Error getting packages: " + e , "Package Display", null );
			              }
					   }, this );
	
		               // Handle failed request
					   req.addEventListener( "failed", function( e ) {
	
					       this.getWireFrame()._showAlertDialog( "error", "Error loading source file: " + e, "Package Source Loading Error", null );
					   });
	
		               // Handle timed out request
					   req.addEventListener( "timeout", function( e ) {
					       this.getWireFrame()._showAlertDialog( "error",
					                                          "Could not load the requested source file. Request timed out.",
					                                          "Package Source Loading Error",
					                                           null
					                                        );
					   });
					   req.send();
	          }
  	       	}
  	},

    installPackage : function( table ) {

          var callback = qx.lang.Function.bind( this.__installPackageHandler, this );

          var selectedObjects = this.getTable().getSelectionModel().getSelectedRanges();
	      for( var i=0; i<selectedObjects.length; i++ ) {

               var json = '[' +
	                           // General properties
	                          '{ "name" : "displayName", "displayName" : "' + this.getTable().getTableModel().getValue( 0, i ) + '"},' +
	                          '{ "name" : "cn", "cn" : "' + this.getTable().getTableModel().getValue( 0, i ) + '"},' +
	                          '{ "name" : "packageClasspath", "packageClasspath" : "' + this.getTable().getTableModel().getValue( 1, i ) + '"},' +
		                      '{ "name" : "packageVersion", "packageVersion" : "' + this.getTable().getTableModel().getValue( 2, i ) + '"},' +
		                      '{ "name" : "location", "location" : "' + this.getTable().getTableModel().getValue( 3, i ) + '"},' +
		                      '{ "name" : "parentDn", "parentDn" : "' + this.getParentOuDn() + '"}' +
	                      ']'; 

		      this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "PACKAGE", "install", json  );
	      }
     },

     __installPackageHandler : function( result, ex, id ) {

     	// An exception occurred
       	if( ex != null ) {

       		this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error", null );

            // Let the user know the UI is ready for action
            this.getNewPackageWin().setStatus( "Ready" );
      		return false;
       	}

        if( result ) {

            // Let the user know the UI is ready for action
            this.getNewPackageWin().setStatus( "Ready" );
            
            // Close the new packages window
            this.getNewPackageWin().close();

            // Refresh the browser table
            this.getCallback()( this.getParentOuDn() );
        }
     },

    close : function() {
      this.base(arguments);
    },

    terminate : function() {
      this.base(arguments);
    }
  }
});