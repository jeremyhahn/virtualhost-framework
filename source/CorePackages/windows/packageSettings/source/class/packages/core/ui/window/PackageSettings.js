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

#require(qx.ui.groupbox.GroupBox)
#require(qx.ui.form.ComboBox)
#require(qx.io.remote.Rpc);
************************************************************************ */

qx.Class.define( "packages.core.ui.window.PackageSettings", {

  extend : vhf.Main,

  properties : {

  	    Parent             : { init : vhf.Main.getInstance() },
  	    PkgSettingsWin     : { init : new qx.ui.window.Window( "Package Settings", "icon/16/mimetypes/package-x-generic.png" ) },
  	    PkgDefaultMemberDn : { init : new qx.ui.form.TextField() },
  	    PkgOuDn            : { init : new qx.ui.form.TextField() },
  	    UpdateBtn          : { init : new qx.ui.form.Button( "Apply", "icon/16/actions/dialog-apply.png" ) }
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

           this.getPkgSettingsWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
          	  });
    	      this.getPkgSettingsWin().setSpace( 300, 400, 100, 250 );
    	      this.getPkgSettingsWin().setShowStatusbar( true );

	      this.getParent()._addToWorkspace( this.getPkgSettingsWin() );
 		  var at1 = new qx.ui.basic.Atom( "Enter the distinguished names of the users or groups which<br>will be granted rights by default on all new package<br> installations. Then enter the organizational unit where you<br>would >like to store package objects.", "icon/22/mimetypes/package-x-generic.png" );
		      at1.setLocation( 6, 4 );
	      
          // Default member DN label
          var lblMemberDn = new qx.ui.basic.Atom( "Default Member DN's" );
              lblMemberDn.setHorizontalChildrenAlign( "right" );
              lblMemberDn.set({

                 top: 100,
                 left: 10
              });

          // Default members textfield
          this.getPkgDefaultMemberDn().set({     	

             	 top: 100,
            	 right: 30,
            	 width: '50%'
              });
              this.getPkgDefaultMemberDn().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Default members tooltip icon
          var txtTip1 = "The distinguished name of each of the groups which are to be added by default to all new packages<br><b>Example: </b>cn=Admins,ou=Groups,ou=Administration,dc=vhf,dc=local";
          var tipIco1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco1.set({ top: 100, right: 10 });
          var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
          var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
              tipIco1.setToolTip( tt1 );

          // Packages OU label
          var lblOuDn = new qx.ui.basic.Atom( "Packages OU DN" );
              lblOuDn.setHorizontalChildrenAlign( "right" );
              lblOuDn.set({

                 top: 125,
                 left: 10
              });

          // Packages OU textfield
          this.getPkgOuDn().set({

             	 top: 125,
            	 right: 30,
            	 width: '50%'
              });
              this.getPkgOuDn().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Packages OU tooltip icon
          var txtTip2 = "The distinguished name of each of the groups which are to be added by default to all new packages<br><b>Example: </b>cn=Admins,ou=Groups,ou=Administration,dc=vhf,dc=local";
          var tipIco2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco2.set({ top: 125, right: 10 });
          var tooltipBtn2 = new qx.ui.basic.Atom( txtTip2 );
          var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
              tipIco2.setToolTip( tt2 );

          // Add an update button
          this.getUpdateBtn().set({ bottom : 10, right : 10 });
          this.getUpdateBtn().addEventListener( "execute", function( e ) {

                    this.__updateConfigs( this.getPkgDefaultMemberDn().getValue(), this.getPkgOuDn().getValue() );
          }, this );

          // Add each of the elements to the 
   	      this.getPkgSettingsWin().add( at1 );
   	      this.getPkgSettingsWin().add( lblMemberDn, this.getPkgDefaultMemberDn(), tipIco1 );
   	      this.getPkgSettingsWin().add( lblOuDn, this.getPkgOuDn(), tipIco2 );
   	      this.getPkgSettingsWin().add( this.getUpdateBtn() );

		  this.getPkgSettingsWin().open();

		  this.__getConfigs()
     },

     /**
      * Updates the selected configuration variable
      * 
      * @type member
      * @param memberDn {String} The distibgushed name of the default members OU
      * @param ouDn {String} The distinguished name of the organizational unit to store package objects
      */
	 __updateConfigs : function( memberDn, ouDn ) {

           // Let the user know the configuration value is being updated.
           this.getPkgSettingsWin().setStatus( "Updating configuration " + name + "..." );

           // Perform the async RPC call to update the configuration value
           var callback = qx.lang.Function.bind( this.__updateConfigsHandler, this );
           this.getParent()._callAsyncRpc( callback, "core.rpc.ui.Settings", "updatePackageConfigs", memberDn, ouDn );
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

             this.getPkgSettingsWin().setStatus( "Ready" );
             this.getParent()._showAlertDialog( "error", ex.toString(), "RPC Failure", null );
             return;
          }

          if( result ) {
              this.getPkgSettingsWin().setStatus( "Ready" );
              this.getUpdateBtn().setEnabled( false );
              this.getPkgSettingsWin().close();
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
          this.getParent()._callAsyncRpc( callback, "core.rpc.ui.Settings", "getPackageConfigs", null );
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
 
                	 	     case "PACKAGE_DEFAULT_MEMBER_DN":
                                  this.getPkgDefaultMemberDn().setValue( result[i].value );
                	     	      break;

                	         case "PACKAGE_OU_DN":
                                  this.getPkgOuDn().setValue( result[i].value );
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