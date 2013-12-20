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

#require(qx.ui.groupbox.GroupBox)
#require(qx.ui.form.ComboBox)
#require(qx.io.remote.Rpc);
************************************************************************ */

qx.Class.define( "packages.core.ui.window.LdapSettings", {

  extend : vhf.Main,

  properties : {

  	    Parent          : { init : vhf.Main.getInstance() },
  	    LdapSettingsWin : { init : new qx.ui.window.Window( "LDAP Settings", "icon/16/apps/system-users.png" ) },
  	    LdapType        : { init : new qx.ui.form.ComboBox() },
  	    LdapAddress     : { init : new qx.ui.form.TextField() },
  	    LdapPort        : { init : new qx.ui.form.TextField() },
  	    LdapBase        : { init : new qx.ui.form.TextField() },
  	    LdapUser        : { init : new qx.ui.form.TextField() },
  	    LdapPass        : { init : new qx.ui.form.TextField() },
  	    LdapSsl         : { init : new qx.ui.form.CheckBox() },
  	    LdapVersion     : { init : new qx.ui.form.TextField() },
  	    LdapHostingRdn  : { init : new qx.ui.form.TextField() },
  	    UpdateBtn       : { init : new qx.ui.form.Button( "Apply", "icon/16/actions/dialog-apply.png" ) }
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
     * Displays a window which allows administrators to manage the LDAP server configurations
     *
     * @type member
     */

    main : function() {

           this.getLdapSettingsWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
          	  });
    	      this.getLdapSettingsWin().setSpace( 225, 400, 40, 400 );
    	      this.getLdapSettingsWin().setShowStatusbar( true );

	      this.getParent()._addToWorkspace( this.getLdapSettingsWin() );

 		  var at1 = new qx.ui.basic.Atom( "LDAP Settings", "icon/22/apps/system-users.png" );
		      at1.setLocation( 4, 4 );

          // Type label
          var lblType = new qx.ui.basic.Atom( "Type" );
              lblType.setHorizontalChildrenAlign( "right" );
              lblType.set({

                 top: 60,
                 left: 10
              });

          // Type combobox
          this.getLdapType().set({

              	 top: 60,
              	 right: 30,
              	 width: '60%'
              });
          // Supported LDAP servers
          this.getLdapType().addEventListener( "changeValue", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );
          this.__populateSupportedLdapServers();

          // Type tooltip icon
          var txtTip1 = "The type of LDAP server being used on the backend<br><b>Example: </b>OpenLDAP";
          var tipIco1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco1.set({ top: 60, right: 10 });
          var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
          var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
              tipIco1.setToolTip( tt1 );

          // Address label
          var lblAddress = new qx.ui.basic.Atom( "Address" );
              lblAddress.setHorizontalChildrenAlign( "right" );
              lblAddress.set({

                 top: 85,
                 left: 10
              });

          // Address Textbox
          this.getLdapAddress().set({     	

             	 top: 85,
            	 right: 30,
            	 width: '60%'
              });
              this.getLdapAddress().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Address tooltip icon
          var txtTip2 = "The IP or hostname of the LDAP server<br><b>Example: </b>localhost";
          var tipIco2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco2.set({ top: 85, right: 10 });
          var tooltipBtn2 = new qx.ui.basic.Atom( txtTip2 );
          var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
              tipIco2.setToolTip( tt2 );

          // Port label
          var lblPort = new qx.ui.basic.Atom( "Port" );
              lblPort.setHorizontalChildrenAlign( "right" );
              lblPort.set({

                 top: 110,
                 left: 10
              });

          // Port Textbox
          this.getLdapPort().set({     	

             	 top: 110,
            	 right: 30,
            	 width: '60%'
              });
              this.getLdapPort().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Port tooltip icon
          var txtTip3 = "The port number to use when talking to the LDAP server<br><b>Example: </b>389";
          var tipIco3 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco3.set({ top: 110, right: 10 });
          var tooltipBtn3 = new qx.ui.basic.Atom( txtTip3 );
          var tt3 = new qx.ui.popup.ToolTip( txtTip3 );
              tipIco3.setToolTip( tt3 );

          // Base label
          var lblBase = new qx.ui.basic.Atom( "Base DN" );
              lblBase.setHorizontalChildrenAlign( "right" );
              lblBase.set({

                 top: 135,
                 left: 10
              });

          // Base Textbox
          this.getLdapBase().set({     	

             	 top: 135,
            	 right: 30,
            	 width: '60%'
              });
              this.getLdapBase().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Base tooltip icon
          var txtTip4 = "The distinguished name of the base domain<br><b>Example: </b>dc=vhf,dc=local";
          var tipIco4 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco4.set({ top: 135, right: 10 });
          var tooltipBtn4 = new qx.ui.basic.Atom( txtTip4 );
          var tt4 = new qx.ui.popup.ToolTip( txtTip4 );
              tipIco4.setToolTip( tt4 );

          // Admin User label
          var lblUser = new qx.ui.basic.Atom( "Admin User" );
              lblUser.setHorizontalChildrenAlign( "right" );
              lblUser.set({

                 top: 160,
                 left: 10
              });

          // Admin User Textbox
          this.getLdapUser().set({     	

             	 top: 160,
            	 right: 30,
            	 width: '60%'
              });
              this.getLdapUser().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Admin User tooltip icon
          var txtTip5 = "The distinguished name of the LDAP administrative account<br><b>Example: </b>cn=siteadmin,ou=Users,ou=Administration,dc=example,dc=com";
          var tipIco5 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco5.set({ top: 160, right: 10 });
          var tooltipBtn5 = new qx.ui.basic.Atom( txtTip5 );
          var tt5 = new qx.ui.popup.ToolTip( txtTip5 );
              tipIco5.setToolTip( tt5 );

          // Admin password label
          var lblPass = new qx.ui.basic.Atom( "Admin Password" );
              lblPass.setHorizontalChildrenAlign( "right" );
              lblPass.set({

                 top: 185,
                 left: 10
              });

          // Admin password Textbox
          this.getLdapPass().set({

             	 top: 185,
            	 right: 30,
            	 width: '60%'
              });
              this.getLdapPass().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Admin password tooltip icon
          var txtTip6 = "The password to the LDAP administrative account<br><b>Example: </b>secret";
          var tipIco6 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco6.set({ top: 185, right: 10 });
          var tooltipBtn6 = new qx.ui.basic.Atom( txtTip6 );
          var tt6 = new qx.ui.popup.ToolTip( txtTip6 );
              tipIco6.setToolTip( tt6 );

          // SSL label
          var lblSSL = new qx.ui.basic.Atom( "SSL" );
              lblSSL.setHorizontalChildrenAlign( "right" );
              lblSSL.set({

                 top: 210,
                 left: 10
              });
          this.getLdapSsl().setLocation( '32%', 210 );
          this.getLdapSsl().setChecked( true );
          this.getLdapSsl().addEventListener( "changeChecked", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          var txtTip7 = "Check to use Secure Sockets Layer";
          var tipIco7 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco7.set({ top: 210, right: 10 });

          var toolTipBtn7 = new qx.ui.basic.Atom( txtTip7 );
          var tt7 = new qx.ui.popup.ToolTip( txtTip7 );
              tipIco7.setToolTip( tt7 );

          // Version label
          var lblVersion = new qx.ui.basic.Atom( "Protocol Version" );
              lblVersion.setHorizontalChildrenAlign( "right" );
              lblVersion.set({

                 top: 235,
                 left: 10
              });

          // Version password Textbox
          this.getLdapVersion().set({     	

             	 top: 235,
            	 right: 30,
            	 width: '60%'
              });
              this.getLdapVersion().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Version password tooltip icon
          var txtTip8 = "The LDAP protocol version<br><b>Example: </b>3";
          var tipIco8 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco8.set({ top: 235, right: 10 });
          var tooltipBtn8 = new qx.ui.basic.Atom( txtTip8 );
          var tt8 = new qx.ui.popup.ToolTip( txtTip8 );
              tipIco8.setToolTip( tt8 );

          // Hosting RDN label
          var lblHosting = new qx.ui.basic.Atom( "Hosting RDN" );
              lblHosting.setHorizontalChildrenAlign( "right" );
              lblHosting.set({

                 top: 260,
                 left: 10
              });

          // Version password Textbox
          this.getLdapHostingRdn().set({

             	 top: 260,
            	 right: 30,
            	 width: '60%'
              });
              this.getLdapHostingRdn().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Version password tooltip icon
          var txtTip9 = "The relative distinguished name of the organizational unit to store clients<br><b>Example: </b>ou=Hosting";
          var tipIco9 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco9.set({ top: 260, right: 10 });
          var tooltipBtn9 = new qx.ui.basic.Atom( txtTip9 );
          var tt9 = new qx.ui.popup.ToolTip( txtTip9 );
              tipIco9.setToolTip( tt9 );

          // Add an update button
          this.getUpdateBtn().set({ bottom : 10, right : 10 });
          this.getUpdateBtn().addEventListener( "execute", function( e ) {

                          this.__updateConfigs( this.getLdapType().getValue(), this.getLdapAddress().getValue(),
                                                this.getLdapPort().getValue(), this.getLdapBase().getValue(),
                                                this.getLdapUser().getValue(), this.getLdapPass().getValue(),
                                                this.getLdapSsl().isChecked(), this.getLdapVersion().getValue(),
                                                this.getLdapHostingRdn().getValue()
                                              );
              }, this );

          // Add each of the elements to the window
   	      this.getLdapSettingsWin().add( at1 );
   	      this.getLdapSettingsWin().add( lblType, this.getLdapType(), tipIco1 );
   	      this.getLdapSettingsWin().add( lblAddress, this.getLdapAddress(), tipIco2 );
   	      this.getLdapSettingsWin().add( lblPort, this.getLdapPort(), tipIco3 );
   	      this.getLdapSettingsWin().add( lblBase, this.getLdapBase(), tipIco4 );
   	      this.getLdapSettingsWin().add( lblUser, this.getLdapUser(), tipIco5 );
   	      this.getLdapSettingsWin().add( lblPass, this.getLdapPass(), tipIco6 );
   	      this.getLdapSettingsWin().add( lblSSL, this.getLdapSsl(), tipIco7 );
   	      this.getLdapSettingsWin().add( lblVersion, this.getLdapVersion(), tipIco8 );
   	      this.getLdapSettingsWin().add( lblHosting, this.getLdapHostingRdn(), tipIco9 );
   	      this.getLdapSettingsWin().add( this.getUpdateBtn() );
   	      
		  this.getLdapSettingsWin().open();

		  this.__getConfigs()
     },

    /**
      * RPC call to get a list of directory service classes / supported servers
      * 
      * @type member
      */
     __populateSupportedLdapServers : function() {

     	  var callback = qx.lang.Function.bind( this.__populateSupportedLdapServersHandler, this );
          this.getParent()._callAsyncRpc( callback, "core.rpc.api.Settings", "getSupportedLdapServers", null );
     },

    /**
      * Populates the drop down of available LDAP servers to communicate with
      * 
      * @type member
      */
     __populateSupportedLdapServersHandler : function() {

          if( ex != null ) {

             this.getLdapSettingsWin().setStatus( "Ready" );
             this.getParent()._showAlertDialog( "error", ex.toString(), "RPC Failure", null );
             return;
          }

          if( result ) {

              // Populate the LDAP servers drop down list with available ldap classes
	          if( !this.getLdapType().getManager().getItems().length ) {
	
	              for( var i=0; i<result.length; i++ ) {
	
	                   var itemLdap = new qx.ui.form.ListItem( result[i] );
	     	           this.getLdapType().add( itemLdap );
	              }
	          }
          }
     },

     /**
      * Updates the selected configuration variable
      * 
      * @type member
      * @param name {String} The name of the configuration variable
      * @param value {String} The value of the configuration variable
      */
	 __updateConfigs : function( type, address, port, base, user, pass, ssl, version, hosting ) {

           // Let the user know the configuration value is being updated.
           this.getLdapSettingsWin().setStatus( "Updating configuration " + name + "..." );

           // Perform the async RPC call to update the configuration value
           var callback = qx.lang.Function.bind( this.__updateConfigsHandler, this );
           this.getParent()._callAsyncRpc( callback, "core.rpc.api.Settings", "updateLdapConfigs",
                                           type, address, port, base, user, pass, ssl, version, hosting );
     },

     /**
      * Handles the JSON RPC response from the configuration service updateLdapConfigs() method
      * 
      * @type member
      * @param result {String} The JSON RPC result object
      * @param ex {String} The JSON RPC exception object
      * @param id {Integer} The id of the JSON RPC async request
      */
     __updateConfigsHandler : function( result, ex, id ) {

          if( ex != null ) {

             this.getLdapSettingsWin().setStatus( "Ready" );
             this.getParent()._showAlertDialog( "error", ex.toString(), "RPC Failure", null );
             return;
          }

          if( result ) {
              this.getLdapSettingsWin().setStatus( "Ready" );
              this.getUpdateBtn().setEnabled( false );
              this.getLdapSettingsWin().close();
          }

     },
     /**
      * Retrieves a configuration value from the database
      * 
      * @type member;
      * @param name {String} The name of the configuration variable
      */
      __getConfigs : function() {

      	  var callback = qx.lang.Function.bind( this.__getConfigsHandler, this );
          this.getParent()._callAsyncRpc( callback, "core.rpc.api.Settings", "getLdapConfigs", null );
      },
      /**
       * Handles the JSON RPC response from the configuration service getValue() method
       * @type member
       * @param result {String} The JSON RPC result object
       * @param ex {String} The JSON RPC exception object
       * @param id {Integer} The id of the JSON RPC async request
       */
       __getConfigsHandler : function( result, ex, id ) {

            if( ex != null ) {

                this.getParent()._showAlertDialog( "error", ex.toString(), "RPC Failure", null );   
                return;
            }
            if( result ) {

                for( var i=0; i<result.length; i++ ) {

                	 switch( result[i].name ) {
 
                	 	     case "LDAP_TYPE":
                                  this.getLdapType().setValue( result[i].value );
                	     	      break;

                	         case "LDAP_SERVER":
                                  this.getLdapAddress().setValue( result[i].value );
                	     	      break;

                	     	 case "LDAP_PORT":
                                  this.getLdapPort().setValue( result[i].value );
                	     	      break;

                	     	 case "LDAP_BASE":
                                  this.getLdapBase().setValue( result[i].value );
                	     	      break;

                	     	 case "LDAP_USER":
                                  this.getLdapUser().setValue( result[i].value );
                	     	      break;

                	     	 case "LDAP_PASS":
                                  this.getLdapPass().setValue( result[i].value );
                	     	      break;

                	     	 case "LDAP_VERSION":
                                  this.getLdapVersion().setValue( result[i].value );
                	     	      break;

                	     	 case "LDAP_SSL":
                                  if( result[i].value == "true" )
                                      this.getLdapSsl().setChecked( true );
                                  else
                                      this.getLdapSsl().setChecked( false );
                	     	      break;

                	     	 case "LDAP_HOSTING_OU_RDN":
                                  this.getLdapHostingRdn().setValue( result[i].value );
                	     	      break;
                	 }
                }
            }
            this.getUpdateBtn().setEnabled( false );
       },

    /**
     * TODOC
     *
     * @type member
     */
    close : function() {
      this.base(arguments);
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