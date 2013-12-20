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

qx.Class.define( "packages.core.ui.window.RepositorySettings", {

  extend : vhf.Main,

  properties : {

  	    Parent          : { init : vhf.Main.getInstance() },
  	    RepoSettingsWin : { init : new qx.ui.window.Window( "Repository Settings", "icon/16/devices/drive-optical.png" ) },
  	    RepoOuDn        : { init : new qx.ui.form.TextField() },
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

           this.getRepoSettingsWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
          	  });
    	      this.getRepoSettingsWin().setSpace( 225, 400, 100, 200 );
    	      this.getRepoSettingsWin().setShowStatusbar( true );

	      this.getParent()._addToWorkspace( this.getRepoSettingsWin() );
 		  var at1 = new qx.ui.basic.Atom( "Enter the distinguished name of the organizational unit<br>where you would like to store the repository objects.", "icon/22/devices/drive-optical.png" );
		      at1.setLocation( 4, 4 );

          // Repository OU DN label
          var lblRepoDn = new qx.ui.basic.Atom( "Repository OU DN" );
              lblRepoDn.setHorizontalChildrenAlign( "right" );
              lblRepoDn.set({

                 top: 60,
                 left: 10
              });

          // Repository OU DN textfield
          this.getRepoOuDn().set({

             	 top: 60,
            	 right: 30,
            	 width: '50%'
              });
              this.getRepoOuDn().addEventListener( "input", function( e ) { this.getUpdateBtn().setEnabled( true ); }, this );

          // Repository OU DN tooltip icon
          var txtTip1 = "The distinguished name of the organizational unit to store repository objects<br><b>Example: </b>cn=Admins,ou=Groups,ou=Administration,dc=vhf,dc=local";
          var tipIco1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIco1.set({ top: 60, right: 10 });
          var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
          var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
              tipIco1.setToolTip( tt1 );

          // Add an update button
          this.getUpdateBtn().set({ bottom : 10, right : 10 });
          this.getUpdateBtn().addEventListener( "execute", function( e ) {

                    this.__updateConfigs( this.getRepoOuDn().getValue() );
          }, this );

          // Add each of the elements to the group box (legend)
   	      this.getRepoSettingsWin().add( at1 );
   	      this.getRepoSettingsWin().add( lblRepoDn, this.getRepoOuDn(), tipIco1 );
   	      this.getRepoSettingsWin().add( this.getUpdateBtn() );
		  this.getRepoSettingsWin().open();

		  this.__getConfigs()
     },

     /**
      * Updates the selected configuration variable
      * 
      * @type member
      * @param memberDn {String} The distibgushed name of the default members OU
      * @param ouDn {String} The distinguished name of the organizational unit to store package objects
      */
	 __updateConfigs : function( ouDn ) {

           // Let the user know the configuration value is being updated.
           this.getRepoSettingsWin().setStatus( "Updating configuration " + name + "..." );

           // Perform the async RPC call to update the configuration value
           var callback = qx.lang.Function.bind( this.__updateConfigsHandler, this );
           this.getParent()._callAsyncRpc( callback, "core.rpc.ui.Settings", "updateRepositoryConfigs", ouDn );
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

             this.getRepoSettingsWin().setStatus( "Ready" );
             this.getParent()._showAlertDialog( "error", ex.toString(), "RPC Failure", null );
             return;
          }

          if( result ) {
              this.getRepoSettingsWin().setStatus( "Ready" );
              this.getUpdateBtn().setEnabled( false );
              this.getRepoSettingsWin().close();
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
          this.getParent()._callAsyncRpc( callback, "core.rpc.ui.Settings", "getRepositoryConfigs", null );
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
 
                	         case "REPOSITORY_OU_DN":
                                  this.getRepoOuDn().setValue( result[i].value );
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