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

qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.Browser", {

  extend: vhf.Main,

  properties : {

  	  WireFrame    : { init : vhf.Main.getInstance() },
  	  BrowserWin   : { init : new qx.ui.window.Window( "LDAP Browser", "icon/16/apps/system-users.png" ) },
  	  TreeSource   : { init : new qx.ui.treevirtual.TreeVirtual([ "LDAP Server" ]) },   // TODO: USE LDAP SERVER NAME HERE
  	  TreeModal    : {  },
  	  TableModel   : { init : new qx.ui.table.model.Simple() },
  	  Table        : { },
  	  TableRowData : { init : [ ] },
  	  SelectedRdn  : { },
  	  BaseDn       : { }
  },

  construct : function() {

      // Create module button with event handler
	  var modBtn = new qx.ui.menu.Button( "LDAP Browser", "icon/16/apps/system-users.png" );
	      modBtn.addEventListener( "execute", function( e ) { this.main() }, this );

      // Add the module button to the GUI
	  this._setModuleButton( modBtn );

	    // Set up the window
	    this.getBrowserWin().set({
	          showMinimize: true,
	          allowMinimize: false,
	          allowMaximize: true
	    });
	    this.getBrowserWin().setSpace( 0, '100%', 0, '100%' );
	
	    var tblLayout = new qx.ui.layout.VerticalBoxLayout();
	        tblLayout.set({ left: 0, top: 0, right: 1, bottom: 0, spacing: 3 });
	
	    // ------------------------------------------------------------>
	    // TREE
	    // ------------------------------------------------------------>
	    this.getTreeSource().set({
	
	            width  : "100%",
	            height: this.getWireFrame().getWorkspace().getInnerHeight() - 20,
	            border : "inset-thin",
	            backgroundColor : "white",
	            overflow: "hidden"
	          });
	
	    this.getTreeSource().setAlwaysShowOpenCloseSymbol(  false  );
	    this.setTreeModal( this.getTreeSource().getDataModel() );
	
	    // Load child entries in listview when a tree item is selected
	    this.getTreeSource().addEventListener( "changeSelection", function( e ) {
	
	        var nodes = e.getData();
	    	if( !nodes[0] ) return;
	
	        // Remove HTML markup which is used to hide the attribute name of the tree node
	    	var rdn = this.getTreeSource().getHierarchy( nodes[0].nodeId ).reverse().join( "," );
	    	    rdn = rdn.replace( /<div style='display:none'>/ig, "" );
	    	    rdn = rdn.replace( /<\/div>/ig, "=" );
	
	    	this.setSelectedRdn( rdn );
	
	        this.getEntries( this.getSelectedRdn() );
	
	    }, this );
	
	    // ----------------------------------------------->
	    // TABLE
	    // ----------------------------------------------->
	    this.getTableModel().setColumns([ "Name", "Description", "Type" ]);
	
	    // Create a custom column model
	    var custom = { tableColumnModel : function( obj ) {
	            return new qx.ui.table.columnmodel.Resize( obj );
	          }
	    };
	    this.setTable( new qx.ui.table.Table( this.getTableModel(), custom ) );
	
	    // Configure the table
	    with ( this.getTable() ) {
	
		       set({ width: '99%', height: '100%', border: "inset-thin" });
		       setMetaColumnCounts( [ 1, -1 ] );
			   getSelectionModel().setSelectionMode( qx.ui.table.selection.Model.SINGLE_SELECTION );
	    };
		tblLayout.add( this.getTable() );
	
	    // Configure table sizing and sizing beghaviors
		var tcm = this.getTable().getTableColumnModel();
	
	    // Obtain the behavior object to manipulate
	    var resizeBehavior = tcm.getBehavior();
	
	    // Name column dimensions
	    resizeBehavior.setWidth( 0, 200 );
	    resizeBehavior.setMinWidth( 0, 50 );
	    resizeBehavior.setMaxWidth( 0, 300 );
	    // Description column dimensions
	    resizeBehavior.setWidth( 1, 300 );
	    resizeBehavior.setMinWidth( 1, 50);
	    resizeBehavior.setMaxWidth( 1, 300);
	    // Type column dimensions
	    resizeBehavior.setWidth( 2, 100 );
	    resizeBehavior.setMinWidth( 2, 25 );
	    resizeBehavior.setMaxWidth( 2, 150 );
	
	    // ------------------------------------------------------------->
	    // VIEWING PANE
		// ------------------------------------------------------------->
		var mainSplitPane = new qx.ui.splitpane.HorizontalSplitPane( 300, "1*" );
		    mainSplitPane.set({
			        height : "100%",
			        width  : "100%",
			        border : "line-left"
		});
	
	    // Add the tree and the 
		mainSplitPane.setLiveResize( true );
	    mainSplitPane.addLeft( this.getTreeSource() );
	    mainSplitPane.addRight( tblLayout );
	
	    this.getBrowserWin().add( mainSplitPane );    
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {


    main : function() {
            
            // Clear the tree if its already been populated
	        if( this.getTreeSource().hasChildren() )
	            this.getTreeSource().getDataModel().prune( 0, true );

	        // Perform JSON RPC call to populate the tree with LDAP objects
            var callback = qx.lang.Function.bind( this.__populateTreeHandler, this );
		    this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "getTreeSource", null );

		    this.getWireFrame()._addToWorkspace( this.getBrowserWin() );
		    this.getBrowserWin().open();
		    this.getBrowserWin().maximize();
    },
 
 /**
     * Handles the JSON RPC reply containing the LDAP objects to be added to the tree 
     *
     * @type member
     * @param array result The LDAP objects formatted in a multi-dimensional array
     * @param object ex JSON RPC exception handler
     * @param integer id The id of the JSON RPC transport call
     */
    __populateTreeHandler : function( result, ex, id ) {

           // Handle exception 
    	   if( ex != null ) {

               // Update graphical elements
               this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error", null );
    	       this.getWireFrame()._setStatusText( "RPC Error!" );
    	   }

           // Hand off the ldap objects array
           if( result ) {

               // Set the base dn and build the LDAP tree hierarchy
               this.setBaseDn( result.base );
               this.buildTree( result.treeSource );

               // Load the context menus for the tree widget
               var TreeCallback  = qx.lang.Function.bind( this.main, this );
               var TableCallback = qx.lang.Function.bind( this.getEntries, this );
	           this.loadContextMenu( "Tree", Array( this.getTreeSource(), TreeCallback, TableCallback, this.getBaseDn() ) );

	           // Load the context menu for the table widget objects
               var callback = qx.lang.Function.bind( this.getEntries, this );
               this.loadContextMenu( "Object", Array( this.getTable(), callback, this.getBaseDn() ) );
           }
    },

   /**
    * Builds an LDAP tree based from multi-dimensional array of LDAP objects
    * 
    * @type member;
    * @param array treeArray The tree array
    */
    buildTree : function( treeArray ) {

           // Break the node apart into attribute name/value
           var pieces = this.getBaseDn().split( "=" );

           // Display the attribute value and hide the attribute name
           var rootNode = this.getTreeModal().addBranch( null, "<div style='display:none'>" + pieces[0] + "</div>" + pieces[1], true );
           this.getTreeSource().setNodeType( rootNode, "DN" );
    	   this.getTreeModal().setData();

           // Recursively adds each of the child nodes to the tree
    	   this.addChildNodes( rootNode, treeArray );
    },

   /**
    * Recursively adds child nodes to a parent
    * 
    * @type member;
    * @param parentNode {Object} The tree node object who is the parent of these siblings
    * @param branchArray {Array} An array of LDAP objects to add to the parent nodes
    */
    addChildNodes : function( parentNode, branchArray ) {

          // Loop through each of the branches
          for( var i=0; i<branchArray.length; i++ ) {

               // No siblings to process
	           if( !this.getWireFrame().isArray( branchArray[i] ) ) {

                   // Extract the object name components from the object dn
                   var pieces = branchArray[i].dn.split( "," )[0].split( "=" );

                   // Set special icon's based on object type
                   var specialTypes = [ "dcobject", "dcObject" ];
                   var ico;

                       // Examine each of the objectclasses to determine which icon to display
                       var bFound = false;
                       for( var j=0; j<branchArray[i].objectclass.count; j++ ) {

                            // Show all DNS related objects with a network-server icon
                            if( (branchArray[i].objectclass !== undefined) && (branchArray[i].objectclass[j] == "dNSDomain") ) {

                                 bFound = true;
                                 var node = this.getTreeModal().addBranch( parentNode, "<div style='display:none'>" + pieces[0] + "</div>" + pieces[1], true, null, "icon/16/places/network-server.png", "icon/16/places/network-server.png" );
                                 this.getTreeSource().setNodeType( node, "OU" );
                                 break;
                            }
                       }
                       // Show default folder/OU icon
                       if( !bFound ) {

                       	   var node = this.getTreeModal().addBranch( parentNode, "<div style='display:none'>" + pieces[0] + "</div>" + pieces[1], true );
                           this.getTreeSource().setNodeType( node, "OU" );
                       }
	           }
	           else // Process siblings
		           this.addChildNodes( node, branchArray[i] );
          }

          // Add the data to the tree
          this.getTreeModal().setData();
    },

   /**
    * Moves an object from one location to another in the LDAP tree
    * 
    * @type member;
    * @param string from The RDN of the location where the object is being moved from
    * @param string to The RDN of the location where the object is being moved to
    */
    moveObject : function( from, to ) {
    	
     	// Perform JSON RPC call to populate the relocate the object
        var callback = qx.lang.Function.bind( this.__moveObjectHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "moveObject", from, to );
    },
    /**
     * Handles the move response from the JSON RPC server
     * 
     * @type member
     * @param array result The LDAP move reply
     * @param object ex JSON RPC exception handler
     * @param integer id The id of the JSON RPC transport call
     */
    __moveObjectHandler : function( result, ex, id ) {

    	// TODO: Implement object move functionality
    },

   /**
    * Gets a single level list of objects in an OU
    * 
    * @type member;
    * @param string rdn The RDN of the object to get a list of child objects from
    */
    getEntries : function( dn ) {

        // Let the user know whats going on
   	    this.getWireFrame()._setStatusText( "Retrieving a list of entries for " + dn + "..." );

    	 // Perform JSON RPC call to populate the relocate the object
        var callback = qx.lang.Function.bind( this.__getEntriesHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "getEntries", dn );
    },

    /**
     * Handles the JSON RPC reply to display child object entries
     * 
     * @type member
     * @param array result The LDAP objects formatted in a multi-dimensional array
     * @param object ex JSON RPC exception handler
     * @param integer id The id of the JSON RPC transport call
     */
    __getEntriesHandler : function( result, ex, id ) {

        // Handle exceptions
    	if( ex != null ) {

    	    this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error", null );
    	    this.getWireFrame()._setStatusText( "RPC Error!" );
    	    return;
    	}

        // Process the entries
    	if( result ) {

           // Clear the table before populating
           this.getTableRowData().splice( 0, this.getTableRowData().length );

           // Loop over the returned array of objects
	       for( var i=0; i<result.count; i++ ) {

                // Extract display data from object
	            var type = "";
	            var desc = "";
	            var disp = "";

                if( this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "virtualHostFrameworkAccount" ) >= 0 ) {
  
                    desc = (result[i].description == undefined) ? "" : result[i].description[0];
		            type = "Account";
		            disp = (result[i].displayname == undefined) ? result[i].cn[0] : result[i].displayname[0];
                }
                if( this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "virtualHostFrameworkPackage" ) >= 0 ) {
  
		       	   	desc = result[i].packageclasspath[0];
                    type = "Package";
                    disp = result[i].cn[0];
                }
                if( this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "virtualHostFrameworkRepository" ) >= 0 ) {

                    desc = result[i].repositoryurl[0];
		       	   	type = "Repository";
		       	   	disp = result[i].cn[0];
                }
                if( (this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "virtualHostFrameworkMailingList" ) >= 0) && !type.length ) {
  
                    desc = (result[i].description == undefined) ? "" : result[i].description[0];
		            type = "Group";
		            disp = result[i].cn[0];
                }
                if( this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "virtualHostFrameworkPolicy" ) >= 0 ) {
  
                    desc = (result[i].description == undefined) ? "" : result[i].description[0];
		            type = "Policy";
		            disp = result[i].cn[0];
                }
                if( this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "virtualHostFrameworkSQLConnection" ) >= 0 ) {
  
                    desc = (result[i].description == undefined) ? "" : result[i].description[0];
		            type = "SQLConnection";
		            disp = result[i].databasename[0];
                }
                if( (this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "posixGroup" ) >= 0) && !type.length ) {
  
                    desc = "Security Group";
		            type = "posixGroup";
		            disp = result[i].cn[0];
                }
                if( (this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "groupOfNames" ) >= 0) && !type.length ) {
  
                    desc = (result[i].description == undefined) ? "" : result[i].description[0];
		            type = "groupOfNames";
		            disp = result[i].cn[0];
                }
                if( (this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "dcObject" ) >= 0) && !type.length ) {

                    desc = "DNS Zone";
		            type = "Zone";
		            disp = (result[i].associateddomain == undefined) ? "" : result[i].associateddomain[0];
                }
                if( (this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "dNSDomain" ) >= 0) && !type.length ) {

                    desc = "DNS Domain";
		            type = "Domain";
		            disp = result[i].dc[0];
                }
                if( (this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "apacheConfig" ) >= 0) ) {

                    desc = "Apache Virtual Host Configuration";
		            type = "ApacheConfig";
		            disp = result[i].apacheservername[0];
                }
                if( (this.getWireFrame().propertiesToArray( result[i].objectclass ).indexOf( "sudoRole" ) >= 0) && !type.length ) {

                    desc = (result[i].description == undefined) ? "Sudo Role" : result[i].description[0];
		            type = "SudoRole";
		            disp = result[i].cn[0];
                }
                if( !type.length ) {

                     // Get the type
                     var attr = result[i].dn.split( "," )[0].split( "=" )[0];

		       	   	     desc = (result[i].description == undefined) ? "Miscellaneous LDAP Object" : result[i].description[0];
		       	   	     type = "Misc";
	               	     disp = eval( "result[i]." + attr[0] );
		        }
			    this.getTableRowData().push([ disp, desc, type, result[i] ]);
			    this.getTableRowData().sort();
	       }

           // Load the data array into the table
	       this.getTableModel().setData( this.getTableRowData() );

           // Let the user know we are ready to process the next command
   	       this.getWireFrame()._setStatusText( "Ready" );
    	}
    },
    /**
     * Handles the decision to delete an object after a user has clicked OK to the confirm dialog box
     * 
     * @type memeber
     * @param String dn The distinguished name of the LDAP object to delete
     * @return void
     */
    __confirmDeleteHandler : function( dn ) {

    	// Perform JSON RPC call to delete the object
        var callback = qx.lang.Function.bind( this.__doDeleteHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "deleteEntry", dn );
    },
    /**
     * Handles an RPC delete operation response
     * 
     * @type memeber
     * @param Object result The result from the JSON RPC server
     * @param Object ex An exception object if one was encountered
     * @param Integer The script transport id associated with the RPC request
     * @return void
     */
    __doDeleteHandler : function( result, ex, id ) {

          // Handle RPC exception
    	  if( ex != null ) {
    	  	
    	  	  this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
    	  	  this.getWireFrame()._setStatusText( "RPC Error!" );
    	  }

          // Handle successult result
          if( result ) {

	          // Remove the entry from the table
	          var selectedObjects = this.getTable().getSelectionModel().getSelectedRanges();
	          for( var i=0; i<selectedObjects.length; i++ ) {

	               var rowCount = this.getTableModel().getRowCount();
	               for( var j=0; j<rowCount; j++ ) {

		                if( this.getTableModel().getValue( 3, j ).dn == this.getTable().getTableModel().getValue( 3, selectedObjects[i].minIndex ).dn )
		                    this.getTableModel().removeRows( j, 1 );
	               }
	           }
         }
    },
    /**
     * Dynamically loads a right click context menu based on the type of object which has focus within the browser
     * 
     * @type member
     * @param String type The type of object which has focus (This name is used to load the context menu javascript file)
     * @param Array args An array of arguments to pass into the context menu
     * @return void 
     */
    loadContextMenu : function( type, args ) {

        this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.contextmenu." + type, args );
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