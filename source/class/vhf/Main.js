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

// Require each of the QOOXDOO classes required by packages here

#require(qx.ui.form.TextField)
#require(qx.ui.form.PasswordField)
#require(qx.ui.form.CheckBox)
#require(qx.ui.popup.ToolTip)
#require(qx.ui.pageview.tabview.TabView)
#require(qx.ui.pageview.tabview.Button)
#require(qx.ui.pageview.tabview.Page)
#require(qx.ui.tree.Tree)
#require(qx.ui.tree.TreeFile)
#require(qx.ui.tree.TreeFolder)
#require(qx.ui.treevirtual.TreeVirtual)
#require(qx.ui.treevirtual.MNode)
#require(qx.ui.treevirtual.MDragAndDropSupport)
#require(qx.ui.table.model.Simple)
#require(qx.ui.table.Table)
#require(qx.ui.table.cellrenderer.Image)
#require(qx.ui.tree.AbstractTreeElement)
#require(qx.ui.splitpane.HorizontalSplitPane)
#require(qx.ui.splitpane.VerticalSplitPane)
#require(qx.ui.listview.ListView)
#require(qx.ui.groupbox.GroupBox)
#require(qx.ui.form.ComboBox)
#require(qx.ui.selection.RadioManager)
#require(qx.ui.form.RadioButton)
#require(qx.ui.form.Spinner)
#require(qx.html.Textile.textilize)
#require(qx.event.handler.DragAndDropHandler)
#require(qx.io.remote.Rpc);
#require(qx.util.ThemeList)
#require(qx.client.Command)
************************************************************************ */

/**
 * P2P Hosting Network Control Panel Framework Class
 */
qx.Class.define("vhf.Main", {

   extend : qx.application.Gui,
   type   : "singleton",

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  properties : {

      // Core application properties
      Version             : { init : "0.1.0.1a" }, // major.minor[.revision[.build]]
      AppIcon             : { init : "categories/applications-internet.png" },
      Copyright           : { init : "<div style=\"font-size: 8px;\">Copyright (c) 2007 Make A Byte, inc.</div>" },
      Doc                 : { init : null },
      Layout              : { init : null },
      Workspace           : { init : new qx.ui.layout.CanvasLayout },
      Toolbar             : { init : new qx.ui.toolbar.ToolBar },
      Menubar             : { init : new qx.ui.menubar.MenuBar },
      OpenMenu            : { init : new qx.ui.menu.Menu },
      OpenBtn             : { init : new qx.ui.menu.Button },
      PreferencesBtn      : { init : new qx.ui.menu.Button },
      SettingsBtn         : { init : new qx.ui.menu.Button },
      SoftwareUpdatesBtn  : { init : new qx.ui.menu.Button }, 
      LoginBtn            : { init : new qx.ui.menu.Button },
      LogoutBtn           : { init : new qx.ui.menu.Button },
      Statusbar           : { init : new qx.ui.basic.Atom },
      _LoadingWin         : { init : new qx.ui.window.Window( "Loading", "icon/16/categories/applications-system.png" ) },

      // RPC properties
      RpcTimeout          : { init : 15000 },  // 15 seconds
      RpcProtocol         : { init : "http://" },
      RpcServer           : { init : "localhost" },
      RpcUseHttpAuth      : { init : false },
      RpcCrossDomain      : { init : false },
      RpcUser             : { init : null },
      RpcPass             : { init : null },
      RpcSsl              : { init : false },

      // User properties
      UserAttribs         : { init : [] },
      UserPackages        : { init : [] },

      // Package properties
      PackageRepositories : { init : [] },
      LoadedPackages      : { init : [] },

      // External sites properties
      ExternalSites       : { init : null }
  },

  members : {

    /**
     * TODOC
     *
     * @type member
     */
    main : function() {

		this.base( arguments );

	    qx.io.Alias.getInstance().add( "vhf", qx.core.Setting.get( "vhf.resourceUri" ) );
	    qx.Class.include( qx.ui.core.Widget, qx.ui.animation.MAnimation );
	    qx.Class.patch(qx.ui.treevirtual.TreeVirtual, qx.ui.treevirtual.MDragAndDropSupport);
        qx.Class.include( qx.ui.treevirtual.TreeVirtual,  qx.ui.treevirtual.MNode );

	    // Include CSS file
	    qx.html.StyleSheet.includeFile( qx.io.Alias.getInstance().resolve( "vhf/css/style.css" ) );

	    // Set initial theme
	    qx.theme.manager.Meta.getInstance().setTheme( qx.theme.Ext ); // qx.theme.ClassicRoyale
	    var iconTheme = qx.theme.manager.Icon.getInstance();
	       // iconTheme.setIconTheme( qx.theme.icon.CrystalClear );

  	    // Define the Doc propertytrue
	    this.setDoc( qx.ui.core.ClientDocument.getInstance() );

	    // Define the Layour property
	    this.setLayout( new qx.ui.layout.DockLayout );

	    // Set up the layout and add it to the document
	    this.getLayout().setLocation( 0, 0 );
	    this.getLayout().setRight( 0 );
	    this.getLayout().setBottom( 0 );
	    this.getLayout().set({
 	           height : "100%",
	           width  : "100%"
	    });
	    this.getDoc().add( this.getLayout() );

	    // Create application header
	    var header = new qx.ui.embed.HtmlEmbed( "<h1>Virtual Host Framework :: Control Panel</h1>" );
	        header.setHtmlProperty( "className", "header" );
	        header.setHeight( 50 );
	    this.getLayout().addTop( header );

	    // Initalize and place the status bar on the document
        this.getStatusbar().setLabel( "Status" );
	    this.getStatusbar().setIcon( "icon/16/" + this.getAppIcon() );
	    this.getStatusbar().setWidth( null );
	    this.getStatusbar().setBorder( "inset-thin" );
	    this.getStatusbar().setHorizontalChildrenAlign( "left" );
	    this.getStatusbar().setPadding( 2, 4 );
	    this.getStatusbar().setBackgroundColor( "background" );

	    this.getLayout().addBottom( this.getStatusbar() );

        // Set up the surface are for the packages/modules
	    this.getWorkspace().set({
	    	    left: 0,
	    	    top: 98,
	    	    right: 0,
	    	    bottom: 23,
	    	    border:"inset"
	    });
        this.getWorkspace().setOverflow( "hidden" );
        this.getDoc().add( this.getWorkspace() );

	    // Populate the menubar
	    this.__initMenubar();

	    // Populate the toolbar
	    this._initToolbar();
     },

     /**
      * Initalizes the toolbar
      */
     _initToolbar : function() {

     	this.getLayout().addTop( this.getToolbar() );
     	this.getToolbar().add( new qx.ui.toolbar.Part );
     	this._setToolbarButton( "Home", "http://vhf.makeabyte.com" );
     },

     /**
      * Adds a toolbar button
      */
     _setToolbarButton : function( name, URL, icon ) {

         var ico;
         (icon == null) ? ico = "icon/16/categories/applications-internet.png" : ico = icon;
      	 var btn = new qx.ui.toolbar.Button( name, ico );
             btn.addEventListener("execute", function(e) {
                 this._loadExternalSite( name, URL );
              }, this );
         this.getToolbar().add( btn );
     },

     /**
      * Initalizes the menubar
      * 
      */
      __initMenubar : function() {

          this.getLayout().addTop( this.getMenubar() );

	      // Menubar button objects
	      var filemnu = new qx.ui.menu.Menu;
	      var toolmnu = new qx.ui.menu.Menu;
	      var helpmnu = new qx.ui.menu.Menu;

	      // File menu items
	      this.getLoginBtn().setLabel( "Login" );
	      this.getLoginBtn().setIcon( "icon/16/status/dialog-password.png" );
	      this.getLoginBtn().addEventListener( "execute", function( e ) { this._loadPackage( "packages.core.ui.window.Login" ) }, this );

	          // Open button for modules sub-menu items
	          this.getOpenBtn().setLabel( "Open" );
	          this.getOpenBtn().setIcon("icon/16/actions/document-open.png" );
	          this.getOpenBtn().setMenu( this.getOpenMenu() );
	          this.getOpenBtn().setEnabled( false );

	      var prntBtn = new qx.ui.menu.Button( "Print", "icon/16/actions/document-print.png" )
	          prntBtn.addEventListener( "execute", function( e ) { window.print(); } );

	      this.getLogoutBtn().setLabel( "Logout" );
	      this.getLogoutBtn().setIcon( "icon/16/actions/application-exit.png" );
          this.getLogoutBtn().addEventListener( "execute", function( e ) { this.__logout() }, this );
          this.getLogoutBtn().setEnabled( false );

	      filemnu.add( this.getLoginBtn() );
	      filemnu.add( new qx.ui.menu.Separator );
	      filemnu.add( this.getOpenBtn() );
	      filemnu.add( new qx.ui.menu.Separator );
	      filemnu.add( prntBtn );
	      filemnu.add( new qx.ui.menu.Separator );
	      filemnu.add( this.getLogoutBtn() );

	      // Tools menu items
	      this.getPreferencesBtn().setLabel( "Preferences" );
	      this.getPreferencesBtn().setIcon( "icon/16/categories/preferences.png" );
	      this.getPreferencesBtn().setEnabled( false );
	      this.getPreferencesBtn().addEventListener( "execute", function( e ) { this._loadPackage( "packages.core.ui.window.Preferences" ) }, this);

	      this.getSettingsBtn().setLabel( "Settings" );
	      this.getSettingsBtn().setIcon( "icon/16/categories/applications-utilities.png" );
	      this.getSettingsBtn().addEventListener( "execute", function( e ) { this._loadPackage( "packages.core.ui.window.Settings" ) }, this);
	      this.getSettingsBtn().setEnabled( false );

	      toolmnu.add( this.getPreferencesBtn() );
	      toolmnu.add( new qx.ui.menu.Separator );
	      toolmnu.add( this.getSettingsBtn() );

	      // Help menu items
	      var helpBtn  = new qx.ui.menu.Button( "Help", "icon/16/actions/help-contents.png" );
              helpBtn.addEventListener( "execute", function( e ) {
                 this._loadPackage( "packages.core.ui.window.NewAccount" )
              }, this);
	      
	      this.getSoftwareUpdatesBtn().setLabel( "Software Updates" );
	      this.getSoftwareUpdatesBtn().setIcon( "icon/16/apps/system-software-update.png" );
	      this.getSoftwareUpdatesBtn().setEnabled( false );
	      this.getSoftwareUpdatesBtn().addEventListener( "execute", function( e ) { 
	      	   this._loadPackage( "packages.core.ui.window.SoftwareUpdates" ) },
	      this );
	      
	      var aboutBtn = new qx.ui.menu.Button( "About", "icon/16/actions/help-about.png" );
	          aboutBtn.addEventListener( "execute", function( e ) { this.__showAboutWin() }, this );
          helpmnu.add( helpBtn );
      	  helpmnu.add( new qx.ui.menu.Separator );
          helpmnu.add( this.getSoftwareUpdatesBtn() );
      	  helpmnu.add( new qx.ui.menu.Separator );
          helpmnu.add( aboutBtn );

	      // Menu objects
	      var fileMenu = new qx.ui.menubar.Button( "File", filemnu );
	      var toolMenu = new qx.ui.menubar.Button( "Tools", toolmnu );
	      var helpMenu = new qx.ui.menubar.Button( "Help", helpmnu );

	      // Add each of the menu objects to the menubar
	      this.getMenubar().add( fileMenu, toolMenu, helpMenu );

	      // Add menu items to the menu objects
	      this.getDoc().add( filemnu, toolmnu, helpmnu );

	      // Add modules sub-menu
	      this.getDoc().add( this.getOpenMenu() );     
      },

     /**
      * Retrieves the source code from an external javascript package file and calls its main method
      * 
      * @type member
      * @param namespace {String} The namespace of the file to retrieve (base.name.space.file)
      * @param args {Array} An array of arguments to pass into the constructor
      */
     _loadPackage : function( classpath, args ) {

          var arrLoadedPackages = this.getLoadedPackages();

          // If the class source has already been loaded, instantiate a new instance
          if( arrLoadedPackages.length ) {

              if( arrLoadedPackages.indexOf( classpath ) != -1 ) {

	              // Instantiate the loaded class
	              var cls = eval( classpath );
  	              if( args != null )
                      var obj = new cls( args );
                  else
                      var obj = new cls();
                  
                  return true;
              }
          }

          // Transform the classpath string into a file path
          var packagePath = classpath.replace( /\./g, "/" ) + ".js";

          // Load the file source code
          var req = new qx.io.remote.Request( packagePath, "GET", qx.util.Mime.JAVASCRIPT );

              // Handle successful request
		  	  req.addEventListener( "completed", function( e ) {

	              // Instantiate the loaded source code and store the classpath in the loadedPackages() property
	              try {

                        // Store the loaded class for future reference
                        arrLoadedPackages.push( classpath );

                        // Instantiate the loaded class
                        var cls = eval( classpath );
                        if( args != null )
                            var obj = new cls( args );
                        else
                            var obj = new cls();
	              }
	              catch( e ) {

	              	 this._showAlertDialog( "error", "Error instantiating package: " + packagePath + "\r\n" + e.toString(), "Object Instantiation Error", null );
	              }
			   }, this );

               // Handle failed request
			   req.addEventListener( "failed", function( e ) {

			       this._showAlertDialog( "error", "Error loading source file: " + packagePath, "Package Source Loading Error", null );
			   }, this );

               // Handle timed out request
			   req.addEventListener( "timeout", function( e ) {
			       this._showAlertDialog( "error", "Could not load the requested source file: " + packagePath + ". Request timed out.", "Package Source Loading Error", null );
			   }, this );
			   req.send();
     },

    /**
     * Performs an asynchronous RPC request to a remote JSON RPC server
     * 
     * @type member
     * @param callback {Object} The callback function to execute upon completion of the request
     * @param service {String} The namespace of the RPC service
     * @param method {String} The name of the method to invoke
     * @param args {Mixed} The arguments to pass with the remote method separated by commas (as standard javascript arguments to a function)
     */
     _callAsyncRpc : function( callback, service, method ) {

         	var rpc = new qx.io.remote.Rpc;
 
                // Set up the RPC properties for the connection
	            rpc.setUrl( this.getRpcProtocol() + this.getRpcServer() );
	         	rpc.setServiceName( service );
	            rpc.setTimeout( this.getRpcTimeout() );
	            rpc.setCrossDomain( this.getRpcCrossDomain() );

                // Use HTTP authentication
	            if( this.getRpcUseHttpAuth() ) {

	                rpc.setUseBasicHttpAuth( true );
	                rpc.setUsername( this.getRpcUser() );
	                rpc.setPassword( this.getRpcPass() );
	            }

                // Build the async javascript function, being sure to pass the added method arguments as defined by the qx.io.remote.Rpc callAsync method API
	            var rpcCall = "rpc.callAsync( callback, method, ";
	            for( var i=0; i<arguments.length; i++ ) {
	
	                 if( i > 2 ) {
	                     rpcCall += "'" + arguments[i] + "'";
	
	                     if( i< arguments.length - 1 )
	                         rpcCall += ",";
	                 }
	            }
	            rpcCall += ")";

	            // Invoke the callAsync method
                eval( rpcCall );
     },

     /**
      * Displays the passed text in the status bar of the application
      * 
      * @type member
      * @param text {String} The string to display in the status bar
      */
     _setStatusText : function( text ) {

     	this.getStatusbar().setLabel( text );
     },

     /**
      * Adds a button object to the File -> Open menu
      *
      * @type member
      * @param objButton {Object} The button object to add to the File->Open sub-menu
      */
     _setModuleButton : function( objButton ) {

     	this.getOpenMenu().add( objButton );
     },

     /**
      * Adds an object to the workspace. This should be the layout object containing the GUI element.
      * 
      * @type member
      * @param obj {Object} The GUI object to add to the workspace
      */
     _addToWorkspace : function( obj ) {

     	this.getWorkspace().add( obj );
     },

     /**
      *  Destroys an RPC session on the server which the application is currently managing
      * 
      * @type member
      */
     __logout : function() {

     	  this.getWorkspace().removeAll();
     	  this._showAlertDialog( "security", "You have been successfully logged out.", "Logout Successful", null );
     },

     /**
      *  Reloads the application once the user clicks OK to the alert window
      * 
      * @type member
      */
     __logoutHandler : function() {

          window.location.reload();
     },

     /**
      * Creates a window with an embedded IFrame and loads the specified URL
      * 
      * @type member
      * @param name {String} The title to place on the window border
      * @param URL {String} The uniform resource locator to load in the IFrame
      */
     _loadExternalSite : function( name, URL ) {

		var siteWin = new qx.ui.window.Window( name, "icon/16/categories/applications-internet.png" );

		    siteWin.set({
		          showMinimize: false,
		          showMaximize: true,
		          allowMaximize: true,
		          width: '100%',
		          height: '100%'
		});
	    this._addToWorkspace( siteWin );

        var w1 = new qx.ui.layout.CanvasLayout;
            w1.setWidth( "100%" );
		    w1.setHeight( "100%" );
		    w1.setBackgroundColor( "white" );

        var iframe = new qx.ui.embed.Iframe( URL );
            iframe.set({ width: '100%', height: '100%' });

		w1.add( iframe );
		siteWin.add( w1 );
		siteWin.addEventListener( "appear", siteWin.centerToBrowser, siteWin );
		siteWin.open();
    },

    /**
     * Displays the about window
     * 
     * @type member
     */
    __showAboutWin : function() {

		var aboutWin = new qx.ui.window.Window( "About", "icon/16/actions/help-about.png" );
		    aboutWin.set({
		          modal : true,
		          showMinimize: false,
		          showMaximize: false,
		          allowMaximize: false,
		          width: 350,
		          height: 270
		});

        var w1 = new qx.ui.layout.CanvasLayout;

            w1.setWidth( 329 );
		    w1.setHeight( 223 );
		    w1.setLeft( 10 );
		    w1.setTop( 10 );
		    w1.setBackgroundColor( "white" );

		var aboutHTML = "<div style=\"padding-left: 5px;\"><h3>Virtual Host Framework :: Control Panel</h3></div>";
		    aboutHTML += "<div style=\"padding-left: 5px;\"><h5>Version " + this.getVersion() + "</h5></div>";
		    aboutHTML += "<div style=\"padding: 0 5px 0 5px;\"><hr></div>";

            aboutHTML += "<div style=\"float: right;\"><a href=\"http://www.makeabyte.com\" target=\"_blank\"><img border=\"0\" src=\"resource/vhf/icon/mab.jpg\" width=\"150\" height=\"50\"></a> &nbsp; &nbsp; </div>";

		    aboutHTML += "<div style=\"padding: 15px 0 0 5px;\">Copyright &copy; 2007<br>All rights reserved</div>";

		    aboutHTML += "<div style=\"padding: 18px 0 0 5px;\">This program comes with ABSOLUTELY NO WARRANTY; This is free software, and you are welcome to ";
		    aboutHTML += "redistribute it under certain conditions; Please see the <a href=\"http://www.gnu.org/licenses\" target=\"_blank\">GNU Public License</a> for more details.</div>";

		var at1 = new qx.ui.basic.Label( aboutHTML , null, "html" );
  		    at1.set({
			    width: 330
		    });
		    at1.setWrap( true );

		w1.add( at1 );
		aboutWin.add( w1 );
		aboutWin.addEventListener( "appear", aboutWin.centerToBrowser, aboutWin );
		aboutWin.open();
		aboutWin.addToDocument();
    },

    /**
     * Displays the loading window used to lock the UI during AJAX calls
     * 
     * @type member
     */
    _showLoadingWin : function() {

		 this._getLoadingWin().set({
		          modal : true,
		          showMinimize: false,
		          showMaximize: false,
		          showClose: false,
		          width: 200,
		          height: 100
		});
	    this._getLoadingWin().addToDocument();

		var at1 = new qx.ui.basic.Label( "<em><b>Processing Request...</b></em>", null, "html" );
  		    at1.set({
  		    	top: 30,
  		    	left: 30,
			    width: "auto"
		    });
		    at1.setWrap( true );

		this._getLoadingWin().add( at1 );
		this._getLoadingWin().addEventListener( "appear", this._getLoadingWin().centerToBrowser, this._getLoadingWin() );
		this._getLoadingWin().open();
    },

    /**
     * Substitute for classic alert dialog
     * 
     * @type member
     * @param type {String} The type of alert to display. info | warning | error | security
     * @param msg {String} The message to display in the window
     * @param title {String} The window title
     * @param callback {Object} An optional callback method to call when the user clicks 'OK'
     */
    _showAlertDialog : function( type, msg, title, callback ) {

    	var ICON;
    	var TYPE;
    	var infoIcon = "status/dialog-information.png";
    	var warnIcon = "status/dialog-warning.png";
    	var errIcon  = "status/dialog-error.png";
    	var secIcon  = "status/dialog-password.png";

        switch( type ) {

            case "info":
        	   ICON = infoIcon;
        	   TYPE = "Information";
        	   break;

        	case "warn":
        	   ICON = warnIcon;
        	   TYPE = "Warning";
        	   break;

        	case "error":
        	   ICON = errIcon;
        	   TYPE = "Error";
        	   break;

            case "security":
        	   ICON = secIcon;
        	   TYPE = "Security";
        	   break;

        	default:
        	   ICON = infoIcon;
        	   break;
        }

    	// Set up the window
     	 var alertWin = new qx.ui.window.Window( title, "icon/16/" + this.getAppIcon() );
		     alertWin.set({
		          modal : true,
		          showMinimize: false,
		          showMaximize: false,
		          allowMaximize: false,
		          width: "auto",
		          height: "auto"
		});

		var at1 = new qx.ui.basic.Atom( TYPE, "icon/32/" + ICON );
            at1.set({ top: 10, left: 10 });

        var lblMsg = new qx.ui.basic.Label( "" + msg, null, null );
            lblMsg.set({
            	wrap: true,
            	left: 30,
            	top: 50,
            	width: "auto"
            });
            lblMsg.setPadding( 0, 20, 50, 0 );

        var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
            btnOK.addEventListener( "execute", function( e ) { alertWin.close(); if( callback != null ) callback(); } );
            btnOK.set({ bottom : 10, right : 10 });

        alertWin.add( at1, lblMsg, btnOK );
        alertWin.addEventListener( "appear", alertWin.centerToBrowser, alertWin );
		alertWin.open();
		alertWin.addToDocument();
    },

    /**
     * Substitute for classic confirm dialog
     * 
     * @type member
     * @param type {String} The type of alert to display. info | warning | error | security
     * @param msg {String} The message to display in the window
     * @param title {String} The window title
     * @param callback {Object} An optional callback method to call when the user clicks 'OK'
     */
    _showConfirmDialog : function( msg, title, callback, args ) {

    	// Set up the window
     	 var confirmWin = new qx.ui.window.Window( "Confirm", "icon/16/status/dialog-information.png" );

		     confirmWin.set({
		          modal : true,
		          showMinimize: false,
		          showMaximize: false,
		          allowMaximize: false,
		          width: "auto",
		          height: "auto"
		});

		var at1 = new qx.ui.basic.Atom( "Confirm", "icon/32/status/dialog-information.png" );
            at1.set({ top: 10, left: 10 });

        var lblMsg = new qx.ui.basic.Label( msg, null, null );
            lblMsg.set({
            	wrap: true,
            	left: 30,
            	top: 50,
            	width: "auto"
            });
            lblMsg.setPadding( 0, 20, 50, 0 );

        var btnCancel = new qx.ui.form.Button( "Cancel", "icon/16/actions/dialog-cancel.png" );
            btnCancel.addEventListener( "execute", function( e ) { confirmWin.close(); } );
            btnCancel.set({ bottom : 10, right : 65 });

        var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );

            if( args == null )
                btnOK.addEventListener( "execute", function( e ) { confirmWin.close(); if( callback != null ) callback(); } );
            else
                btnOK.addEventListener( "execute", function( e ) { confirmWin.close(); if( callback != null ) callback( args ); } );
            btnOK.set({ bottom : 10, right : 10 });

        confirmWin.add( at1, lblMsg, btnOK, btnCancel );
        confirmWin.addEventListener( "appear", confirmWin.centerToBrowser, confirmWin );
		confirmWin.open();
	    confirmWin.addToDocument();
    },
    
    /**
     * Substitute for classic prompt dialog
     * 
     * @type member
     * @param msg {String} The message/instructions to display in the header of the window
     * @param title {String} The window title
     * @param callback {Object} An optional callback method to call when the user clicks 'OK'
     * @param icon {String} The icon to use in the title bar
     */
    _showPromptDialog : function( msg, title, callback, icon ) {

        var ico;
        (icon != null && icon != undefined) ? ico = icon : ico = "icon/16/" + this.getAppIcon();

    	// Set up the window
     	 var promptWin = new qx.ui.window.Window( title, ico );
		     promptWin.set({
		          modal : true,
		          showMinimize: false,
		          showMaximize: false,
		          allowMaximize: false,
		          width: "auto",
		          height: "auto"
		});

        var lblMsg = new qx.ui.basic.Label( msg, null, null );
            lblMsg.set({
            	wrap: true,
            	left: 20,
            	top: 20,
            	width: "auto"
            });
            lblMsg.setPadding( 0, 20, 50, 0 );

        var txtValue = new qx.ui.form.TextField();
            txtValue.set({ top: 40, left: 20, right: 20, bottom: 50, width: '80%' });

        var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
            btnOK.addEventListener( "execute", function( e ) { 
            	
            	   promptWin.close();
            	  if( callback != null ) callback( txtValue.getValue() ); else return txtValue.getValue(); } );
            btnOK.set({ bottom : 10, right : 10 });

        promptWin.add( lblMsg, txtValue, btnOK );
        promptWin.addEventListener( "appear", promptWin.centerToBrowser, promptWin );
		promptWin.open();
		promptWin.addToDocument();
    },

    /**
     * Converts an object to a javascript array
     * 
     * @type member
     * @param Object obj The LDAP object to convert to an array
     * @return Array Returns a javascript array representing the LDAP object
     */
    propertiesToArray : function( obj ) {

     	      var objArray = [ ];
     	      for( var i=0; i<obj.count; i++ )		       	     	      	
     	      	   objArray.push( obj[i] );

     	      return objArray;
   },
    
   /**
    * Tests a javascript object to see if it is an array or not
    * 
    * @type member
    * @param object obj The object to be evaluated
    */
    isArray : function( obj ) {   

              if( obj.constructor.toString().indexOf( "Array" ) == -1 )
                  return false;
              else
                  return true;
    },
    /**
     * Transforms a javascript array into a json string equivilent
     * 
     * @type member
     * @param Array array The array to transform to a JSON array string
     */
    arrayToJson : function( array ) {

  	        var json = "[";
  	        for( var i=0; i<array.length; i++ ) {

   	        	 json += '"' + array[i] + '"';
  	        	 if( i < array.length -1 )
  	        	     json += ",";
  	        }
  	        json += ']';
  	        return json;
  	 },

    /**
     * TODOC
     *
     * @type member
     */
    close : function() {

      this.base( arguments );
    },

    /**
     * TODOC
     *
     * @type member
     */
     terminate : function() {
     
         this.base( arguments );
     }
   },

  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings : {
    "vhf.resourceUri" : "./resource"
  },
  
  
  destruct : function() {
    
      //this._disposeObjects("_blogEntry", "_table", "_tableModel", "_header" );
  }
  
});
