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

#require(qx.ui.form.TextField)
#require(qx.ui.form.PasswordField)
#require(qx.ui.form.CheckBox)
#require(qx.ui.popup.ToolTip)
#require(qx.io.remote.Rpc);
************************************************************************ */

qx.Class.define( "packages.core.ui.window.Login", {

  extend : vhf.Main,

  properties : {

  	    WireFrame : { init : vhf.Main.getInstance() }
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
     * Performs a login attempt to the LDAP server and retrieves all of the packages which the user has access
     * to manage upon successful login. If the user is an administrator, a list of repositories are also retrieved
     * and the Tools=>Settings button is enabled for the administrator to manage the application configurations.
     *
     * @type member
     */

    main : function() {

         // Set up the window
	     var doc = qx.ui.core.ClientDocument.getInstance();
     	 var connectWin = new qx.ui.window.Window( "Login", "icon/16/status/dialog-password.png" );

		     connectWin.set({
		          modal : false,
		          showMinimize: false,
		          showMaximize: true,
		          allowMaximize: true,
		          width: 350,
		          height: 250
		});

		var at1 = new qx.ui.basic.Atom( "Connect to Server", "icon/32/status/dialog-password.png" );
            at1.set({ top: 10, left: 10 });

        // Buttons
		var btnOK     = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
        var btnCancel = new qx.ui.form.Button( "Cancel", "icon/16/actions/dialog-cancel.png" );

        btnOK.set({ bottom : 10, right : 10 });
        btnCancel.set({ bottom : 10, right : 60 });

        // Server
        var txtServerLabel = new qx.ui.basic.Atom( "Server" );
            txtServerLabel.setHorizontalChildrenAlign( "right" );
            txtServerLabel.set({
            	top: 75,
            	left: 30,
            	width: '10%'
            });
        var txtServer = new qx.ui.form.TextField();
            txtServer.set({
            	top: 75,
            	right: 30,
            	width: '70%',
            	value: window.location.host
            });

        var txtTip = "The IP or domain to establish a connection<br><b>Example: </b>localhost";

        var tipIcon = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
            tipIcon.set({ top: 75, right: 10 });

        var tooltipBtn = new qx.ui.basic.Atom( txtTip );
        var tt1 = new qx.ui.popup.ToolTip( txtTip );
        tipIcon.setToolTip( tt1 );

        // Username
        var txtUsernameLabel = new qx.ui.basic.Atom( "Username" );
            txtUsernameLabel.setHorizontalChildrenAlign( "right" );
            txtUsernameLabel.set({

            	top: 100,
            	left: 30,
            	width: '10%'
            });
        var txtUsername = new qx.ui.form.TextField();
            txtUsername.set({     	

            	top: 100,
            	right: 30,
            	width: '70%',
            	value: 'vhfadmin'
            });
        var txtUsernameTip = "The username to authenticate<br><b>Example: </b>siteadmin";

        var usernameTipIcon = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
            usernameTipIcon.set({ top: 100, right: 10 });

        var usernameTipBtn = new qx.ui.basic.Atom( txtUsernameTip );
        var tt2 = new qx.ui.popup.ToolTip( txtUsernameTip );
            usernameTipIcon.setToolTip( tt2 );

        // Password
        var txtPasswordLabel = new qx.ui.basic.Atom( "Password" );
            txtPasswordLabel.setHorizontalChildrenAlign( "right" );
            txtPasswordLabel.set({

            	top: 125,
            	left: 30,
            	width: '10%'
            });
        var txtPassword = new qx.ui.form.PasswordField();
            txtPassword.set({

            	top: 125,
            	right: 30,
            	width: '70%',
            	value: 'secret'
            });
        var txtPasswordTip = "The password to authenticate<br><b>Example: </b>secret";

        var passwordTipIcon = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
            passwordTipIcon.set({ top: 125, right: 10 });

        var passwordTipBtn = new qx.ui.basic.Atom( txtPasswordTip );
        var tt3 = new qx.ui.popup.ToolTip( txtPasswordTip );
            passwordTipIcon.setToolTip( tt3 );

        // Use SSL
        var chk1 = new qx.ui.form.CheckBox( "Use SSL" );
            chk1.setLocation( '20.5%', 150 );
            chk1.setChecked( true );

        var txtSslTip = "Check to use Secure Sockets Layer";
        var sslTipIcon = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
            sslTipIcon.set({ top: 150, right: 10 });

        var sslTipBtn = new qx.ui.basic.Atom( txtSslTip );
        var tt4 = new qx.ui.popup.ToolTip( txtSslTip );
            sslTipIcon.setToolTip( tt4 );

        btnOK.addEventListener( "execute", function( e ) {

                 this.getWireFrame().setRpcServer( txtServer.getValue() + "/packages/jsonrpc.php" );
                 this.getWireFrame().setRpcUser( txtUsername.getValue() );
                 this.getWireFrame().setRpcPass( txtPassword.getValue() );
                 this.getWireFrame().setRpcSsl( chk1.isChecked() );
                 if( !txtUsername.getValue().length || !txtPassword.getValue.length ) {
                   	 this.getWireFrame()._showAlertDialog( "error", "You must enter a username and password.", "Authentication Error", null );
                    return( false );
                 }

                 (txtServer.indexOf( window.location.host ) == -1) ? this.getWireFrame().setRpcCrossDomain( true ) : this.getWireFrame().setRpcCrossDomain( false );

                 // Define the protocol to use for RPC connections
                 this.getWireFrame().setRpcProtocol( (this.getRpcSsl() == true) ? "https://" : "http://" );

                 // Set the RPC call to cross domain if the current browser domain does not match the RPC server domain;
      	         if( this.getRpcServer().indexOf( location.host ) != -1 && this.getRpcServer().indexOf( "." + location.host ) == -1 )
      	             this.getWireFrame().setRpcCrossDomain( true );

                 // Define application RPC variables
		         if( location.protocol.indexOf( "http" ) != -1 && this.getRpcSsl() == true ) 
		             this.getWireFrame().setRpcCrossDomain( true );
		         if( location.protocol.indexOf( "https" ) != -1 && this.getRpcSsl() == false )
		             this.getWireFrame().setRpcCrossDomain( true )

                 // Let the user know we are attempting to establish the connection with the server
                 this.getWireFrame()._setStatusText( "Attempting connection..." );                 

	                 // Send data to API encoded as JSON
	                 var json = '[' +
	                                  '{ "name" : "uid", "uid" : "' + txtUsername.getValue() + '"},' +
	                                  '{ "name" : "cn", "cn" :"' + txtUsername.getValue() + '"},' +
	                                  '{ "name" : "userPassword", "userPassword" :"' + txtPassword.getValue() + '"}' +
	                             ']';

                 // Perform the async call to authenticate the current user account
                 var callback = qx.lang.Function.bind( this.__authenticationHandler, this );
                 this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "ACCOUNT", "authenticate", json );

                 // Close the window
                 connectWin.close();
              }, this );

        btnCancel.addEventListener( "execute", function( e ) { connectWin.close() } );

        // Forgot password link
        var lblForgotPassword = new qx.ui.basic.Atom( "<a href='#'>Forgot Password</a>" );
            lblForgotPassword.set({
            	
            	bottom: 10,
            	left: 10
            });
            lblForgotPassword.addEventListener( "click", function( e ) { this.getWireFrame()._showAlertDialog( "info", "This feature has not been implemented yet...", "Forgot Password" ); }, this );

        // Add the elements to the window
		connectWin.add( at1, txtServerLabel, txtServer, btnOK, btnCancel, tipIcon );
		connectWin.add( txtUsernameLabel, txtUsername, usernameTipIcon );
		connectWin.add( txtPasswordLabel, txtPassword, passwordTipIcon );
		connectWin.add( chk1, sslTipIcon );
		connectWin.add( lblForgotPassword );

        // Show the window
		connectWin.addEventListener( "appear", connectWin.centerToBrowser, connectWin );
		connectWin.open();
		doc.add( connectWin );
     },     

     /**
      * Handles authentication reply
      * 
      * @type meber
      * @param result {Object} The JSON response from the server
      * @param ex {Object} The exception object from the server (if any)
      * @param id {Integer} The asyncronous id of the request
      */
	 __authenticationHandler : function( result, ex, id ) {

     	 // Catch exceptions
         if( ex != null ) {

         	 this.getWireFrame()._getLoadingWin().close();
             this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error", null );
             this.getWireFrame()._setStatusText( "Ready" );
             return false;
         }

         // Authentication failed
         if( !result ) {

           	 this.getWireFrame()._getLoadingWin().close();
           	 this.getWireFrame()._setStatusText( "Ready" );
             this.getWireFrame()._showAlertDialog( "error", "Invalid username or password.", "Authentication Failure", null );
         }

         // Process the completed RPC call - Successful authentication
         if( result ) {

             // Let the user know we authenticated successfully
             this.getWireFrame()._setStatusText( "Authentication successful..." );

             // Set the user LDAP attributes
             this.getWireFrame().setUserAttribs( result );

             // Toggle the login/logout buttons
             this.getWireFrame().getLoginBtn().setEnabled( false );
             this.getWireFrame().getLogoutBtn().setEnabled( true );
             // Enable the preferences button
             this.getWireFrame().getPreferencesBtn().setEnabled( true );

             // Get all of the custom external site toolbar buttons for this user
             this.__getExteralSites();

             // Get and load all of the packages which this user has access to manage
             this.__getPackages();

             // Perform administrative level routines
             if( result.accountrole[0] == "administrator" ) {

             	 this.getWireFrame().getSoftwareUpdatesBtn().setEnabled( true );
                 this.getWireFrame().getSettingsBtn().setEnabled( true );
                 this.__getPackageRepositories();
             }
             else
                 // Load the user desktop environment
                 this.getWireFrame()._loadPackage( "packages.core.ui.Desktop" );
         }
        },

        /**
         * Gets all of the configured external sites which this user has configured
         * 
         * @type member
         */
        __getExteralSites : function() {

        	// Let the user know we are getting all of the configured external sites
        	this.getWireFrame()._setStatusText( "Loading external site buttons..." );

        	// Perform the async call to load the users preferred external site toolbar buttons
            var rpc = new qx.io.remote.Rpc;

                rpc.setUrl( this.getWireFrame().getRpcProtocol() + this.getWireFrame().getRpcServer() );
                rpc.setServiceName( "core.rpc.api.Preferences" );
                rpc.setTimeout( this.getWireFrame().getRpcTimeout() );
                rpc.setCrossDomain( this.getWireFrame().getRpcCrossDomain() );

                var callback = new qx.lang.Function.bind( this.__getExternalSitesHandler, this );
                rpc.callAsync( callback, "getExternalSites", this.getWireFrame().getUserAttribs().dn );
        },

        /**
          * Handles the result of the JSON RPC call for the __getExternalSites function
          * 
          * @type meber
 	      * @param result {Object} The JSON response from the server
	      * @param ex {Object} The exception object from the server (if any)
          * @param id {Integer} The asyncronous id of the request
          */
        __getExternalSitesHandler : function( result, ex, id ) {

            if( ex != null ) {

            	this.getWireFrame()._setStatusText( "Ready" );
            	this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Failure" );
            	return;
            }
            if( result ) {

                // Set a property which defines all of the configured external sites for the current logged on user
                this.getWireFrame().setExternalSites( result );

                // Add each of the external sites to the toolbar
                for( var i=0; i<result.length; i++ )
                  	 this.getWireFrame()._setToolbarButton( result[i].name, result[i].url );

             	this.getWireFrame()._setStatusText( "Ready" );
            }
        },

        /**
	      * Retrieves a list of installed packages from the LDAP server
	      * 
	      * @type meber
	      */       
        __getPackages : function() {

             // Let the user know we are loading installed packages
             this.getWireFrame()._setStatusText( "Loading packages..." );

             // Perform the async call to authenticate the current user account
             var rpc = new qx.io.remote.Rpc;

                 rpc.setUrl( this.getWireFrame().getRpcProtocol() + this.getWireFrame().getRpcServer() );
                 rpc.setServiceName( "core.rpc.API" );
                 rpc.setTimeout( this.getWireFrame().getRpcTimeout() );
                 rpc.setCrossDomain( this.getWireFrame().getRpcCrossDomain() );

                 // Send data to API encoded as JSON
                 var json = '[{ "name" : "rpcRequestorDn", "rpcRequestorDn" : "' + this.getWireFrame().getUserAttribs().dn + '"}]';

                 var callback = qx.lang.Function.bind( this.__getPackagesHandler, this );
	             rpc.callAsync( callback, "invoke", "PACKAGE", "getPackages", json );
	    },
        /**
	      * Handles the result of the JSON-RPC request for installed packages
	      * 
	      * @type meber
	      * @param result {Object} The JSON response from the server
	      * @param ex {Object} The exception object from the server (if any)
	      * @param id {Integer} The asyncronous id of the request
	      */
	    __getPackagesHandler : function( result, ex, id ) {

                 // Catch exceptions
			   	 if( ex != null ) {

			   	  	   this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Connection Failure", null );
			      	   this.getWireFrame()._setStatusText( "Ready" );
			      	   return;
			 	  }

                  // Let the user know if there werent any packages retrieved from the LDAP server for their account
			 	  if( !result ) {

			 	  	  this.getWireFrame()._showAlertDialog( "error",
			 	  	                                        "You do not have any packages provisioned for your account. Please contact support for assistance.",
			 	  	                                        "Packages Load Error",
			 	  	                                         null
			 	  	                                      );
			 	  	  this.getWireFrame()._getLoadingWin().close();
			          return;
			 	  }

			 	  // Set all of the packages which this user has access to manage
			 	  this.getWireFrame().setUserPackages( result[0] );

                  // Loop through each of the installed packages which this user has access to manage
			 	  for( i=0; i<result.length; i++ ) {

			           // Do not attempt to process disaled packages
			           if( result[i].packagestatus[0] != "active" )
			               continue;

                       // Load and instantiate the package
				       this.getWireFrame()._loadPackage( result[i].packageclasspath[0], null );
			      }

			      // Adjust the related UI elements
			      this.getWireFrame()._getLoadingWin().close();
			 	  this.getWireFrame().getOpenBtn().setEnabled( true );
			  	  this.getWireFrame()._setStatusText( "Ready" );
	    },

	    /**
	      * Retrieves a list of configured repositories from the LDAP server (if the logged in user is an administrator)
	      * 
	      * @type meber
	      */
	   __getPackageRepositories : function() {

                // Let the user know we are loading the package repositories
	          	this.getWireFrame()._setStatusText( "Loading package repositories..." );

                // Perform the async call to authenticate the current user account
                var rpc = new qx.io.remote.Rpc;

                    rpc.setUrl( this.getWireFrame().getRpcProtocol() + this.getWireFrame().getRpcServer() );
                    rpc.setServiceName( "core.rpc.API" );
                    rpc.setTimeout( this.getWireFrame().getRpcTimeout() );
                    rpc.setCrossDomain( this.getWireFrame().getRpcCrossDomain() );

                    var callback = new qx.lang.Function.bind( this.__getPackagesRepositoriesHandler, this );
	                rpc.callAsync( callback, "invoke", "PACKAGE", "getRepositories", "[]" );
	    },
		/**
          * Handles repositories JSON-RPC query
	      * 
	      * @type meber
	      * @param result {Object} The JSON response from the server
	      * @param ex {Object} The exception object from the server (if any)
	      * @param id {Integer} The asyncronous id of the request
	      */
	    __getPackagesRepositoriesHandler : function( result, ex, id ) {

                 // Handle exceptions
                 if( ex != null ) {

                 	 this.getWireFrame()._showAlertDialog( "error", ex, "RPC Connection Failure", null );
			      	 this.getWireFrame()._setStatusText( "Ready" );
			      	 return;
                 }

                 // No repositories found
                 if( !result ) {

			 	  	  this.getWireFrame()._showAlertDialog( "error",
  			 	  	                                        "An error occurred while attempting to load repositories list. No repositories found.",
			 	  	                                        "Packages Error",
			 	  	                                         null
			 	  	                                       );
			 	  	  this.getWireFrame()._getLoadingWin().close();
			          return;
			 	 }

                 // Handle the result
                 if( result ) {

                     this.getWireFrame().setPackageRepositories( result );
     	             this.getWireFrame()._setStatusText( "Ready" );
                 }
	   },

    close : function()    {
      this.base(arguments);
    },

    terminate : function() {
      this.base(arguments);
    }
  }
});