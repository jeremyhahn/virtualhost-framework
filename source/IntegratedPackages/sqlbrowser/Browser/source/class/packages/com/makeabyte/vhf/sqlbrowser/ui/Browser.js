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

qx.Class.define( "packages.com.makeabyte.vhf.sqlbrowser.ui.Browser", {

  extend: vhf.Main,

  properties : {

  	  WireFrame        : { init : vhf.Main.getInstance() },
  	  BrowserWin       : { init : new qx.ui.window.Window( "SQL Browser", "icon/16/mimetypes/x-office-spreadsheet.png" ) },
  	  DatabaseTree     : { init : new qx.ui.treevirtual.TreeVirtual([ "Databases" ] ) },
  	  TreeModal        : { },
  	  MainSplitPane    : { },
  	  RootNode         : { init : null },
  	  TableLayout      : { },
  	  SupportedServers : { },
  	  UserDatabases    : { init : null },
  	  SQLHostname      : { init : null },
  	  SQLUsername      : { init : null },
  	  SQLPassword      : { init : null },
  	  SQLPort          : { init : null },
  	  SQLTypes         : { init : null },
  	  SQLDBName        : { init : null },
  	  SQLOptions       : { init : null },
  	  BtnConnect       : { init : null },
  	  BtnDisconnect    : { init : null },
  	  BtnSave          : { init : null }
  },

  construct : function() {

            // Create module button with event handler
	        var modBtn = new qx.ui.menu.Button( "SQL Browser", "icon/16/mimetypes/x-office-spreadsheet.png" );
	            modBtn.addEventListener( "execute", function( e ) { this.main() }, this );

            // Add the module button to the GUI
	        this._setModuleButton( modBtn );

	        // Set up the window
	        this.getBrowserWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
            });
    	    this.getBrowserWin().setSpace( 0, "100%", 0, "100%" );

	        // ------------------------------------------------------------>
	        // TREE
	        // ------------------------------------------------------------>
	        this.getDatabaseTree().set({

	                width  : "100%",
	                height : this.getWireFrame().getWorkspace().getInnerHeight(),
	                border : "inset-thin",
	                backgroundColor : "white",
	                overflow: "hidden"
	              });

	        this.getDatabaseTree().setAlwaysShowOpenCloseSymbol( false );
	        this.setTreeModal( this.getDatabaseTree().getDataModel() );


	        // Load child entries in listview when a tree item is selected
	        this.getDatabaseTree().addEventListener( "changeSelection", function( e ) {

  	            var nodes = e.getData();
	        	if( !nodes[0] ) return;

                var node = this.getDatabaseTree().getHierarchy( nodes[0].nodeId ).reverse()[0];
                
                if( node == "Databases" )
                    return;

                var values = /<div style='display:none'>(.*)<\/div>(.*)/(node);

                var dbtype = values[1];
                var dbname = values[2];

                this.__setConnectionProperties( dbname, dbtype );

	        }, this );

	        // ----------------------------------------------->
	        // TABLE
	        // ----------------------------------------------->
	        this.setTableLayout( new qx.ui.layout.VerticalBoxLayout() );
            this.getTableLayout().set({ width: '100%', height: '100%', right: 1, bottom: 0, spacing: 3 });

            // ------------------------------------------------------------->
            // VIEWING PANE
			// ------------------------------------------------------------->
			var splitPane = new qx.ui.splitpane.HorizontalSplitPane( 300, "1*" );
			    splitPane.set({

			        height : "100%",
			        width  : "100%",
			        border : "line-left"
			});

	        // Add the tree and table tayout 
			splitPane.setLiveResize( true );
	        splitPane.addLeft( this.getDatabaseTree() );
	        splitPane.addRight( this.getTableLayout() );

            this.getBrowserWin().add( splitPane );
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

    main : function() {

            // Update status bar
            this.getWireFrame()._setStatusText( "Loading databases..." );

            // Clear the tree if its already been populated
	        if( this.getDatabaseTree().hasChildren() )
	            this.getDatabaseTree().getDataModel().prune( 0, true );

            // Format request arguments as JSON
            var json = '[{ "name" : "databaseOwner", "databaseOwner" : "' + this.getWireFrame().getUserAttribs().dn + '"}]';

            // Perform JSON RPC call to get a list SQL servers supported servers by this infrastructure
            var callback = qx.lang.Function.bind( this.__populateSupportedServersHandler, this );
            this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "SQLBROWSER", "getSupportedServers", '[]' );

	        // Perform JSON RPC call to populate the tree with users databases
            var callback = qx.lang.Function.bind( this.__populateTreeHandler, this );
		    this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "SQLBROWSER", "getDatabases", json );

            this.getTableLayout().removeAll();
            this.setSQLTypes( new qx.ui.form.ComboBox() );
            this.__showConnectionProperties();

            // Add the widget to the workspace and open the window
		    this.getWireFrame()._addToWorkspace( this.getBrowserWin() );
	        this.getBrowserWin().open();
    },


    /**
     * Handle the call to get a list of databases owned by the current logged on user
     * 
     * @type memeber
     */
    __populateSupportedServersHandler : function( result, ex, id ) {

           if( ex != null ) {

           	    // Update visual elements
               this.getWireFrame()._showAlertDialog( "error", ex, "RPC Error", null );
    	       this.getWireFrame()._setStatusText( "RPC Error!" );
           }

           // Set local supportedServers property 
           if( result ) {

                this.setSupportedServers( result );

                // Loop over each of the supported database types by this infrastructure
		        for( var i=0; i<this.getSupportedServers().count; i++ ) {

		             // Add each of the supported database servers to the available server types drop down
		             for( var j=0; j<this.getSupportedServers()[i].databasetype.count; j++ ) {

			              var item = new qx.ui.form.ListItem( this.getSupportedServers()[i].databasetype[j] );
			              this.getSQLTypes().add( item );
		             }
		        }    
           }
    },

    /**
     * Adds databases owned by the current logged on user to the UI 
     *
     * @type member
     * @param array result The SQL databases owned by the current logged in user
     * @param object ex JSON RPC exception handler
     * @param integer id The id of the JSON RPC transport call
     */
    __populateTreeHandler : function( result, ex, id ) {

           // Handle exception
    	   if( ex != null ) {

               // Update visual elements
               this.getWireFrame()._showAlertDialog( "error", ex, "RPC Error", null );
    	       this.getWireFrame()._setStatusText( "RPC Error!" );
    	   }

    	   // Regardless of result, display the root node
		   var rootNode = this.getTreeModal().addBranch( null, "Databases", true, false, "icon/16/mimetypes/x-office-spreadsheet.png", false );
		   this.getDatabaseTree().setNodeType( rootNode, "root" );
           this.getTreeModal().setData();

           // Hand off the ldap objects array
           if( result ) {

               this.setUserDatabases( result );

               // Loop through each of the returned database connection objects for the specified user
               for( var i=0; i<result.count; i++ ) {

               	    // Display the attribute value and hide the database type 
		            var node = this.getTreeModal().addBranch( rootNode, "<div style='display:none'>" + result[i].databasetype[0] + "</div>" + result[i].databasename[0], true, false, "icon/16/places/archive-folder.png", false );
		            this.getDatabaseTree().setNodeType( node, "db" );
			        this.getTreeModal().setData();
               }

               // Update status bar
               this.getWireFrame()._setStatusText( "Ready" );

               // Load the context menus for the tree widget
               var TreeCallback  = qx.lang.Function.bind( this.main, this );
               this.loadContextMenu( Array( this.getDatabaseTree(), TreeCallback, this.getUserDatabases() ) );
           }
    },

   /**
    * Gets a single level list of objects in an OU
    * 
    * @type member;
    * @param string rdn The RDN of the object to get a list of child objects from
    */
    __getDatabaseTables : function( node ) {

        // Let the user know whats going on
   	    this.getWireFrame()._setStatusText( "Retrieving databases..." );

        var dbname = node.split( "/" )[0];
        var json = '[' +
                         '{ "name" " "databaseHost", "databaseHost" : "' + this.getSQLHostname().getValue() + '"},' +
                         '{ "name" " "databasePort", "databasePort" : "' + this.getSQLPort().getValue() + '"},' +
                         '{ "name" " "databaseType", "databaseType" : "' + this.getSQLTypes().getValue() + '"},' +
                         '{ "name" : "databaseName", "databaseName" : "' +  this.getSQLDBName().getValue() + '"},' +
                         '{ "name" : "databaseOptions", "databaseOptions" : "' +  this.getSQLOptions().getValue() + '"},' +
                         '{ "name" : "databaseOwner", "databaseOwner" : "' + this.getWireFrame().getUserAttribs().dn + '"}' +
                   ']';

    	// Perform JSON RPC call to populate the relocate the object
        var callback = qx.lang.Function.bind( this.__getDatabaseTablesHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "SQLBROWSER", "getTables", json );
    },

    __getDatabaseTablesHandler : function( result, ex, id ) {

    	    // TODO: Implement cross platform / cross-database SQL browser with ability to fully manage database as well as copy databases between remote hosts :D 
	        this.getTableLayout().removeAll();
	        lblTODO = new qx.ui.basic.Label( "Browsing feature currently disabled. More to come!" );
	        lblTODO.set({ top: (this.getTableLayout().getInnerHeight() / 2),
	                      left: ((this.getTableLayout().getInnerWidth() / 2) - (lblTODO.getText().length / 2 ) ) });
	        this.getTableLayout().add( lblTODO );
	        //this.getTableLayout().add(  );
    },

    __showConnectionProperties : function() {

	        // Group box for database connection settings
	        var gb1 = new qx.ui.groupbox.GroupBox( "Database Connection Settings" );
	            gb1.set({ width: '100%', height: 325 });
	
	        // Label for database server hostname
	        var lblHostname = new qx.ui.basic.Atom( "Hostname" );
	            lblHostname.setHorizontalChildrenAlign( "right" );
	            lblHostname.set({
	
	                 top: 30,
	                 left: 10
	        });
	
	        // Hostname textfield
	        this.setSQLHostname( new qx.ui.form.TextField() );
	        this.getSQLHostname().set({
	
	            	  top: 30,
	            	  right: 30,
	            	  width: '80%'
	        });
	
	        // Hostname tooltip icon
	        var txtTip1 = "The IP or hostname of the SQL server.<br><b>Example: </b>sqlcluster01.vhf.local";
	        var tipIcon1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon1.set({ top: 30, right: 10 });
	        var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
	        var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
	            tipIcon1.setToolTip( tt1 );
	
	        // Label for database server port
	        var lblPort = new qx.ui.basic.Atom( "Port" );
	            lblPort.setHorizontalChildrenAlign( "right" );
	            lblPort.set({
	
	                 top: 55,
	                 left: 10
	        });
	
	        // Port spinner
	        this.setSQLPort( new qx.ui.form.Spinner( 0, 0, 65535 ) );
	        this.getSQLPort().set({
	
	            	  top: 55,
	            	  right: 30,
	            	  width: '80%'
	        });
	
	        // Port tooltip icon
	        var txtTip2 = "The port number which the database server listens for incoming connections.<br><b>Example: </b>3306";
	        var tipIcon2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon2.set({ top: 55, right: 10 });
	        var tooltipBtn2 = new qx.ui.basic.Atom( txtTip2 );
	        var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
	            tipIcon2.setToolTip( tt2 );
	
	        // Label for database server type
	        var lblType = new qx.ui.basic.Atom( "Type" );
	            lblType.setHorizontalChildrenAlign( "right" );
	            lblType.set({
	
	                 top: 80,
	                 left: 10
	        });
	
	        // Type dropdown
	        this.getSQLTypes().set({
	
	          	 top: 80,
	          	 right: 30,
	          	 width: '80%'
	        });
	        this.getSQLTypes().addEventListener( "changeSelected", function( e ) { this.__updateConnectionProperties() }, this );

	        // Type tooltip icon
	        var txtTip3 = "The type of database server where the connection is to be established.<br><b>Example: </b>mysql";
	        var tipIcon3 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon3.set({ top: 80, right: 10 });
	        var tooltipBtn3 = new qx.ui.basic.Atom( txtTip3 );
	        var tt3 = new qx.ui.popup.ToolTip( txtTip3 );
	            tipIcon3.setToolTip( tt3 );
	
	        // Label for database server name
	        var lblDBName = new qx.ui.basic.Atom( "Database" );
	            lblDBName.setHorizontalChildrenAlign( "right" );
	            lblDBName.set({
	
	                 top: 105,
	                 left: 10
	        });
	
	        // Name textfield
	        this.setSQLDBName( new qx.ui.form.TextField() );
	        this.getSQLDBName().set({
	
	            	  top: 105,
	            	  right: 30,
	            	  width: '80%'
	        });
	
	        // Name tooltip icon
	        var txtTip4 = "The name of the database to connect with.<br><b>Example: </b>mydb";
	        var tipIcon4 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon4.set({ top: 105, right: 10 });
	        var tooltipBtn4 = new qx.ui.basic.Atom( txtTip4 );
	        var tt4 = new qx.ui.popup.ToolTip( txtTip4 );
	            tipIcon4.setToolTip( tt4 );
	        
	        // Label for database server connection options
	        var lblOptions = new qx.ui.basic.Atom( "Options" );
	            lblOptions.setHorizontalChildrenAlign( "right" );
	            lblOptions.set({
	
	                 top: 130,
	                 left: 10
	        });
	
	        // Options textfield
	        this.setSQLOptions( new qx.ui.form.TextField() );
	        this.getSQLOptions().set({
	            	  top: 130,
	            	  right: 30,
	            	  width: '80%'
	        });
	        
	        // Options tooltip icon
	        var txtTip5 = "Connection options to pass to the database server during handshake.<br><b>Example: </b>persistant=false,somethingelse=avalue";
	        var tipIcon5 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon5.set({ top: 130, right: 10 });
	        var tooltipBtn5 = new qx.ui.basic.Atom( txtTip5 );
	        var tt5 = new qx.ui.popup.ToolTip( txtTip5 );
	            tipIcon5.setToolTip( tt5 );
	        
	        // Divider
            var sep1 = new qx.ui.basic.Label( "<hr>", null, "html" );
  		        sep1.set({

		            top: 155,
			  	 	left: '5%',
			  		width: '90%'
		    });

		    // Label for username
	        var lblUsername = new qx.ui.basic.Atom( "Username" );
	            lblUsername.setHorizontalChildrenAlign( "right" );
	            lblUsername.set({

	                 top: 180,
	                 left: 10
	        });

	        // Username textfield
	        this.setSQLUsername( new qx.ui.form.TextField() );
	        this.getSQLUsername().set({

	            	  top: 180,
	            	  right: 30,
	            	  width: '80%',
	            	  value: this.getWireFrame().getUserAttribs().uid[0]
	        });

	        // Username tooltip icon
	        var txtTip6 = "The username to use while connecting to the specified SQL server.<br><b>Example: </b>" + this.getWireFrame().getUserAttribs().uid[0];
	        var tipIcon6 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon6.set({ top: 180, right: 10 });
	        var tooltipBtn6 = new qx.ui.basic.Atom( txtTip6 );
	        var tt6 = new qx.ui.popup.ToolTip( txtTip6 );
	            tipIcon6.setToolTip( tt6 );

		    // Label for password
	        var lblPassword = new qx.ui.basic.Atom( "Password" );
	            lblPassword.setHorizontalChildrenAlign( "right" );
	            lblPassword.set({

	                 top: 205,
	                 left: 10
	        });

	        // Username textfield
	        this.setSQLPassword( new qx.ui.form.PasswordField() );
	        this.getSQLPassword().set({

	            	  top: 205,
	            	  right: 30,
	            	  width: '80%'
	        });

	        // Username tooltip icon
	        var txtTip7 = "The username to use while connecting to the specified SQL server.<br><b>Example: </b>" + this.getWireFrame().getUserAttribs().uid[0];
	        var tipIcon7 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon7.set({ top: 205, right: 10 });
	        var tooltipBtn7 = new qx.ui.basic.Atom( txtTip7 );
	        var tt7 = new qx.ui.popup.ToolTip( txtTip7 );
	            tipIcon7.setToolTip( tt7 );

	        this.setBtnConnect( new qx.ui.form.Button( "Connect", "icon/16/actions/start.png" ) );
	        this.getBtnConnect().addEventListener( "execute", function( e ) {/* this.__getDatabaseTables( this.getSQLDBName().getValue() ); */ this.getWireFrame()._showAlertDialog( "info", "Browsing is currently disabled. More to come!", "SQL Browser" ); }, this );
	        this.getBtnConnect().set({ bottom : 10, right : 110 });
	        this.getBtnConnect().setVisibility( false );

	        this.setBtnDisconnect( new qx.ui.form.Button( "Disconnect", "icon/16/actions/stop.png" ) );
	        this.getBtnDisconnect().set({ bottom : 10, right : 10 });
	        this.getBtnDisconnect().addEventListener( "execute", function( e ) { } );
	        this.getBtnDisconnect().setVisibility( false );

	        this.setBtnSave( new qx.ui.form.Button( "Save", "icon/16/actions/document-save.png" ) );
	        this.getBtnSave().addEventListener( "execute", function( e ) { this.__saveConnection(); }, this );
	        this.getBtnSave().set({ bottom : 10, right : 110 });
	        this.getBtnSave().setVisibility( true );

	        gb1.add( lblHostname, this.getSQLHostname(), tipIcon1 );
	        gb1.add( lblPort, this.getSQLPort(), tipIcon2 );
	        gb1.add( lblType, this.getSQLTypes(), tipIcon3 );
	        gb1.add( lblDBName, this.getSQLDBName(), tipIcon4 );
	        gb1.add( lblOptions, this.getSQLOptions(), tipIcon5 );
	        gb1.add( sep1 );
	        gb1.add( lblUsername, this.getSQLUsername(), tipIcon6 );
	        gb1.add( lblPassword, this.getSQLPassword(), tipIcon7 );
	        gb1.add( this.getBtnConnect(), this.getBtnDisconnect(), this.getBtnSave() );

	        this.getTableLayout().add( gb1 );
    },

    __setConnectionProperties : function( dbname, dbtype ) {

    	    // The root node has been selected
	        if( dbname == "Databases" ) {

                // Set the value of each of the connection property UI elements to empty values
         	    this.getSQLHostname().setValue( "" );
         	    this.getSQLPort().setValue( 0 );
         	    this.getSQLDBName().setValue( "" );
                this.getSQLOptions().setValue( "" );

                this.getBtnConnect().setVisibility( false );
                this.getBtnDisconnect().setVisibility( false );
                this.getBtnSave().setVisibility( true );                
            }
	        else {

	        	for( var i=0; i<this.getUserDatabases().count; i++ ) {

                     if( this.getUserDatabases()[i].databasename[0] == dbname && this.getUserDatabases()[i].databasetype[0] == dbtype  ) {

                     	 // Set the value of each of the connection property UI elements
                     	 var dbport = (this.getUserDatabases()[i].databaseport == undefined) ? "" : this.getUserDatabases()[i].databaseport[0];
                     	 var dboptions = (this.getUserDatabases()[i].databaseoptions == undefined) ? "" : this.getUserDatabases()[i].databaseoptions[0];
                     	 this.getSQLHostname().setValue( this.getUserDatabases()[i].databasehost[0] );
                     	 this.getSQLPort().setValue( dbport );
                     	 this.getSQLDBName().setValue( this.getUserDatabases()[i].databasename[0] );
                         this.getSQLOptions().setValue( dboptions );
                     	 this.getSQLTypes().setSelected( new qx.ui.form.ListItem( this.getUserDatabases()[i].databasetype[0] ) );
                     }
	        	}

	        	this.getBtnConnect().setVisibility( true );
                this.getBtnDisconnect().setVisibility( true );
                this.getBtnSave().setVisibility( false );
	        }
    },

    __saveConnection : function() {

            // Let the user know whats going on
	   	    this.getWireFrame()._setStatusText( "Saving database configuration..." );

            var dn = "databaseName=" + this.getSQLDBName().getValue() + this.getWireFrame().getUserAttribs().dn.replace( "cn=" + this.getWireFrame().getUserAttribs().uid[0], "" );

            if( this.getSQLTypes().getValue() == "sqlite" ) {

            	var json = '[' +
	                         '{ "name" : "databaseHost", "databaseHost" : "' + this.getWireFrame().getUserAttribs().ftproot[0] + '/' + this.getSQLDBName().getValue() + '"},' +
	                         '{ "name" : "databaseType", "databaseType" : "' + this.getSQLTypes().getValue() + '"},' +
	                         '{ "name" : "databaseName", "databaseName" : "' +  this.getSQLDBName().getValue() + '"},' +
	                         '{ "name" : "databaseOwner", "databaseOwner" : "' + this.getWireFrame().getUserAttribs().dn + '"},' +
	                         '{ "name" : "dn", "dn" : "' + dn + '"}' +
	                   ']';
            }
            else {

		        var json = '[' +
		                         '{ "name" : "databaseHost", "databaseHost" : "' + this.getSQLHostname().getValue() + '"},' +
		                         '{ "name" : "databasePort", "databasePort" : "' + this.getSQLPort().getValue() + '"},' +
		                         '{ "name" : "databaseType", "databaseType" : "' + this.getSQLTypes().getValue() + '"},' +
		                         '{ "name" : "databaseName", "databaseName" : "' +  this.getSQLDBName().getValue() + '"},' +
		                         '{ "name" : "databaseOptions", "databaseOptions" : "' +  this.getSQLOptions().getValue() + '"},' +
		                         '{ "name" : "databaseUsername", "databaseUsername" : "' + this.getSQLUsername().getValue() + '"},' +
		                         '{ "name" : "databasePassword", "databasePassword" : "' + this.getSQLPassword().getValue() + '"},' +
		                         '{ "name" : "databaseOwner", "databaseOwner" : "' + this.getWireFrame().getUserAttribs().dn + '"},' +
		                         '{ "name" : "dn", "dn" : "' + dn + '"}' +
		                   ']';
            }

	    	// Perform JSON RPC call to populate the relocate the object
	        var callback = qx.lang.Function.bind( this.__saveConnectionHandler, this );
	        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "SQLBROWSER", "create", json );
    },

    __saveConnectionHandler : function( result, ex, id ) {

           if( ex != null ) {

           	    // Update visual elements
               this.getWireFrame()._showAlertDialog( "error", ex, "RPC Error", null );
    	       this.getWireFrame()._setStatusText( "RPC Error!" );
           }

           if( result ) {

               // Update status bar
               this.getWireFrame()._setStatusText( "Refreshing database tree..." );

           	   // Clear the database tree
           	   this.getTreeModal().prune( 0, false );

          	   // Format request arguments as JSON
               var json = '[{ "name" : "databaseOwner", "databaseOwner" : "' + this.getWireFrame().getUserAttribs().dn + '"}]';

	           // Perform JSON RPC call to populate the tree with users databases
               var callback = qx.lang.Function.bind( this.__populateTreeHandler, this );
		       this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "SQLBROWSER", "getDatabases", json );
           }
               
    },

    __updateConnectionProperties : function() {

    	  for( var i=0; i<this.getSupportedServers().count; i++ ) {

    	       if( this.getSupportedServers()[i].databasetype[0] == this.getSQLTypes().getValue() ) {

    	           // Set the value of each of the connection property UI elements
    	           if( this.getSupportedServers()[i].databasetype[0] == "sqlite" ) {

                       this.getSQLHostname().setValue( "" );
                       this.getSQLPort().setValue( "" );
                       this.getSQLDBName().setValue( "<enter database name here>" );
                       this.getSQLOptions().setValue( "" );
                       this.getSQLUsername().setValue( "" );
                       this.getSQLPassword().setValue( "" );

                       this.getSQLHostname().setEnabled( false );
                       this.getSQLPort().setEnabled( false );
                       this.getSQLOptions().setEnabled( false );
                       this.getSQLUsername().setEnabled( false );
                       this.getSQLPassword().setEnabled( false );
    	           }
    	           else {

	             	   var dbport = (this.getSupportedServers()[i].databaseport == undefined) ? "" : this.getSupportedServers()[i].databaseport[0];
	             	   //var dboptions = (this.getSupportedServers()[i].databaseoptions == undefined) ? "" : this.getSupportedServers()[i].databaseoptions[0];
	             	   this.getSQLHostname().setValue( this.getSupportedServers()[i].databasehost[0] );
	             	   this.getSQLPort().setValue( dbport );
	             	   this.getSQLDBName().setValue( "<enter database name here>" );
	                   this.getSQLOptions().setValue( "" ); // Supported servers will always be SHARED_SQL_SERVER until re-write when server objects come into play
	                   this.getSQLUsername().setValue( this.getWireFrame().getUserAttribs().uid[0] );
                       this.getSQLPassword().setValue( "" );

	                   this.getSQLHostname().setEnabled( true );
	                   this.getSQLPort().setEnabled( true );
	                   this.getSQLOptions().setEnabled( true );
	                   this.getSQLUsername().setEnabled( true );
                       this.getSQLPassword().setEnabled( true );
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
    loadContextMenu : function( args ) {

        this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.sqlbrowser.ui.contextmenu.Tree", args );
    },

    terminate : function() {
      this.base(arguments);
    }
  }
});