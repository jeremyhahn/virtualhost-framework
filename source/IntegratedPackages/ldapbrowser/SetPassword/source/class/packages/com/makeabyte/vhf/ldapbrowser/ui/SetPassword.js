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

qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.SetPassword", {

  extend : vhf.Main,

  properties : {

  	    WireFrame   : { init : vhf.Main.getInstance() },
  	    PasswordWin : { },
  	    ObjectDn    : { },
  	    Callback    : { }
  },

  construct : function( obj ) {

      this.setObjectDn( obj[0] );
      this.setCallback( obj[1] );

           // Create the window
           this.setPasswordWin( new qx.ui.window.Window( "Set Password", "icon/16/" + this.getWireFrame().getAppIcon() ) );
           this.getPasswordWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
          	    });
    	   this.getPasswordWin().setSpace( 200, 400, 150, 200 );  // left spacing // width // top spacing // height
    	   this.getPasswordWin().removeAll();

 		   var at1 = new qx.ui.basic.Atom( "Please enter and confirm the new password.", "icon/32/status/dialog-password.png" );
		       at1.setLocation( 4, 4 );

           // Password label
           var lblPassword = new qx.ui.basic.Atom( 'Password' );
               lblPassword.setHorizontalChildrenAlign( 'right' );
               lblPassword.set({
              	  top: 60,
            	  left: 30,
            	  width: '10%'
                });

           // Password text field
           var txtPassword = new qx.ui.form.PasswordField();
               txtPassword.set({
              	  top: 60,
            	  right: 30,
            	  width: '70%'
                });

           // Password tool tip icon
           var txtTip = "Enter the new password.<br><b>Example:</b>$ecr3tP@55w0rd";
           var tipIcon = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon.set({ top: 60, right: 10 });

           var tooltipBtn = new qx.ui.basic.Atom( txtTip );
           var tt1 = new qx.ui.popup.ToolTip( txtTip );
           tipIcon.setToolTip( tt1 );

           // Confirm Password label 
           var lblConfirm = new qx.ui.basic.Atom( 'Confirm' );
               lblConfirm.setHorizontalChildrenAlign( 'right' );
               lblConfirm.set({
              	  top: 85,
            	  left: 30,
            	  width: '10%'
                });

           var txtConfirm = new qx.ui.form.PasswordField();
               txtConfirm.set({
              	  top: 85,
            	  right: 30,
            	  width: '70%'
                });

           var txtTip2 = "Enter the new password again.<br><b>Example:</b>$ecr3tP@55w0rd";
           var tipIcon2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon2.set({ top: 85, right: 10 });

           var tooltipBtn = new qx.ui.basic.Atom( txtTip2 );
           var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
           tipIcon2.setToolTip( tt2 );

           // Buttons
		   var btnOK     = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
           var btnCancel = new qx.ui.form.Button( "Cancel", "icon/16/actions/dialog-cancel.png" );

           btnOK.set({ bottom : 10, right : 10 });
           btnCancel.set({ bottom : 10, right : 60 });

           btnOK.addEventListener( "execute", function( e ) {

                 if( !txtPassword.getValue().length || !txtConfirm.getValue().length ) {
                     
                     this.getWireFrame()._showAlertDialog( "error", "Password must not be blank.", "Set Password", null );
                     return;
                 }
                 if( txtPassword.getValue() != txtConfirm.getValue() ) {

                 	 this.getWireFrame()._showAlertDialog( "error", "Passwords must match.", "Set Password" );
                 	 return;
                 }
                 
                 this.__setPassword( txtPassword.getValue() );

           }, this );

           btnCancel.addEventListener( "execute", function( e ) { this.getPasswordWin().close() }, this );

   	       this.getPasswordWin().add( at1, lblPassword, txtPassword, lblConfirm, txtConfirm, tipIcon, tipIcon2, btnOK, btnCancel );
   	       // Display copyright
           var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
               lblCopyright.set({ bottom: 15, left: 10 });
           this.getPasswordWin().add( lblCopyright );
		   this.getPasswordWin().open();
		   this.getWireFrame()._addToWorkspace( this.getPasswordWin() );
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

     __setPassword : function( password ) {

          var json = '[' +
                           '{ "name" : "dn", "dn" : "' + this.getObjectDn() + '" },' +
                           '{ "name" : "userPassword", "userPassword" : "' + password + '" }' +
                     ']';

          // Call the RPC method on the server to install the repository
          var callback = qx.lang.Function.bind( this.__setPasswordHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "ACCOUNT", "setPassword", json );
      },

     __setPasswordHandler : function( result, ex, id ) {

     	// An exception occurred
       	if( ex != null ) {

       		this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error", null );
       		return false;
       	}

        // Process the response from the JSON RPC server
        if( result ) {

            // Create the parent rd for the callback method
            var pieces = this.getObjectDn().split( "," )[0].split( "=" );
            var parentRdn = this.getObjectDn().replace( pieces[0] + "=" + pieces[1] + ",", "" );

            // Invoke the callback method to refresh the browser table
            this.getCallback()( parentRdn );

            // Update the status bar
            this.getWireFrame()._setStatusText( "Ready" );

            // Close the add repository window
            this.getPasswordWin().close();
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