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

qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.ApacheConfig", {

  extend : vhf.Main,

  properties : {

  	    WireFrame       : { init : vhf.Main.getInstance() },
  	    ApacheConfigWin : { },
  	    ObjConfig       : { },
  	    Callback        : { }
  },

  construct : function( args ) {

      this.setObjConfig( args[0] );
      this.setCallback( args[1] );

           this.setApacheConfigWin( new qx.ui.window.Window( "New Apache Virtual Host", "icon/16/" + this.getWireFrame().getAppIcon() ) );
           this.getApacheConfigWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
           });
    	   this.getApacheConfigWin().setSpace( 200, 400, 0, 450 );  // left spacing // width // top spacing // height
    	   this.getApacheConfigWin().removeAll();
	       this.getWireFrame()._addToWorkspace( this.getApacheConfigWin() );

 		   var at1 = new qx.ui.basic.Atom( "Enter the required Apache virtual host information.", "resource/vhf/icon/apache.png" );
		       at1.set({ top: 5, left: 5 });

           // Set up the tab view
           var tv1 = new qx.ui.pageview.tabview.TabView;
	           tv1.set({ left: 4, top: 40, right: 4, bottom: 50 });

	       var t1 = new qx.ui.pageview.tabview.Button( "General", "icon/16/mimetypes/text-ascii.png" );
     	       t1.setChecked( true );
	       var t2 = new qx.ui.pageview.tabview.Button( "Members", "icon/16/apps/system-users.png" );

           tv1.getBar().add( t1 );
 
	       // Set up each of the tab pages
	       var p1 = new qx.ui.pageview.tabview.Page( t1 );

           tv1.getPane().add( p1 );

           // Set up the layout         
           var cl1 = new qx.ui.layout.CanvasLayout;

			    cl1.setTop( 0);
			    cl1.setLeft( 0 );
			    cl1.setWidth( "100%" );
			    cl1.setHeight( "100%" );
			    cl1.setBackgroundColor( "white" );
			    cl1.setPaddingLeft( 0 );

			    cl1.removeAll();

           // Name
           var lblServerName = new qx.ui.basic.Atom( 'Server Name' );
               lblServerName.setHorizontalChildrenAlign( 'right' );
               lblServerName.set({
              	  
              	  top: 30,
            	  left: 10
                });

           var txtServerName = new qx.ui.form.TextField();
               txtServerName.set({
              	  
              	  top: 30,
            	  right: 30,
            	  width: '60%',
            	  value: (this.getObjConfig().apacheservername == undefined) ? "" : this.getObjConfig().apacheservername[0]
                });
                txtServerName.setReadOnly( true );

           var txtTip1 = "The domain name for the virtual host.<br><b>Example:</b> vhf.local";
           var tipIcon1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon1.set({ top: 30, right: 10 });

           var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
           var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
           tipIcon1.setToolTip( tt1 );

           // Server Alias 
           var lblServerAlias = new qx.ui.basic.Atom( 'Server Alias' );
               lblServerAlias.setHorizontalChildrenAlign( 'right' );
               lblServerAlias.set({
              	  
              	  top: 55,
            	  left: 10
                });

           var txtServerAlias = new qx.ui.form.TextField();
               txtServerAlias.set({

              	  top: 55,
            	  right: 30,
            	  width: '60%',
            	  value: (this.getObjConfig().apacheserveralias == undefined) ? "" : this.getObjConfig().apacheserveralias[0]
                });

           var txtTip2 = "An alias name for the domain.<br><b>Example:</b> www.vhf.local";
           var tipIcon2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon2.set({ top: 55, right: 10 });

           var tooltipBtn2 = new qx.ui.basic.Atom( txtTip2 );
           var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
           tipIcon2.setToolTip( tt2 );
           
           // Document root 
           var lblDocRoot = new qx.ui.basic.Atom( 'Document Root' );
               lblDocRoot.setHorizontalChildrenAlign( 'right' );
               lblDocRoot.set({

              	  top: 80,
            	  left: 10
                });

           var txtDocRoot = new qx.ui.form.TextField();
               txtDocRoot.set({
              	  
              	  top: 80,
            	  right: 30,
            	  width: '60%',
            	  value: (this.getObjConfig().apachedocumentroot == undefined) ? "" : this.getObjConfig().apachedocumentroot[0]
                });

           var txtTip3 = "The full file system path to the location where this website is served.<br><b>Example:</b> /home/jdoe/www";
           var tipIcon3 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon3.set({ top: 80, right: 10 });

           var tooltipBtn3 = new qx.ui.basic.Atom( txtTip3 );
           var tt3 = new qx.ui.popup.ToolTip( txtTip3 );
           tipIcon3.setToolTip( tt3 );
           
           // Server Admin 
           var lblServerAdmin = new qx.ui.basic.Atom( 'Server Admin' );
               lblServerAdmin.setHorizontalChildrenAlign( 'right' );
               lblServerAdmin.set({
              	  
              	  top: 105,
            	  left: 10
                });

           var txtServerAdmin = new qx.ui.form.TextField();
               txtServerAdmin.set({

              	  top: 105,
            	  right: 30,
            	  width: '60%',
            	  value: (this.getObjConfig().apacheserveradmin == undefined) ? "" : this.getObjConfig().apacheserveradmin[0]
                });

           var txtTip4 = "The email address of the administrator responsible for this virtual host website.<br><b>Example:</b> webmaster@vhf.local";
           var tipIcon4 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon4.set({ top: 105, right: 10 });

           var tooltipBtn4 = new qx.ui.basic.Atom( txtTip4 );
           var tt4 = new qx.ui.popup.ToolTip( txtTip4 );
           tipIcon4.setToolTip( tt4 );
           

           // Buttons
           var btnCancel = new qx.ui.form.Button( "Cancel", "icon/16/actions/dialog-cancel.png" );
               btnCancel.set({ bottom : 10, right : 60 });
               btnCancel.addEventListener( "execute", function( e ) { this.getApacheConfigWin().close() }, this );

           var btnOK     = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
               btnOK.set({ bottom : 10, right : 10 });
               btnOK.addEventListener( "execute", function( e ) {

               var json = '[' +
           	                 '{ "name" : "dn", "dn" : "' + this.getObjConfig().dn + '" },' +
           	                 '{ "name" : "associatedName", "associatedName" : "' + this.getWireFrame().getUserAttribs().dn + '" },' +
           	                 '{ "name" : "serverName", "serverName" : "' + txtServerName.getValue() + '" },' +
           	                 '{ "name" : "serverAlias", "serverAlias" : "' + txtServerAlias.getValue() + '" },' +
           	                 '{ "name" : "documentRoot", "documentRoot" : "' + txtDocRoot.getValue() + '" },' +
           	                 '{ "name" : "serverAdmin", "serverAdmin" : "' + txtServerAdmin.getValue() + '" },' +
           	                 '{ "name" : "mail", "mail" : "' + this.getWireFrame().getUserAttribs.mail + '" }' +
                          ']';

	            var callback = new qx.lang.Function.bind( this.__updateApacheConfigHandler, this );
	            this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "HTTP", "update", json );

           }, this );

   	       this.getApacheConfigWin().add( at1, tv1, btnOK, btnCancel );
   	       cl1.add( lblServerName, txtServerName, tipIcon1 );
   	       cl1.add( lblServerAlias, txtServerAlias, tipIcon2 );
   	       cl1.add( lblDocRoot, txtDocRoot, tipIcon3 );
   	       cl1.add( lblServerAdmin, txtServerAdmin, tipIcon4 );
           p1.add( cl1 );

           // Display copyright
           var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
               lblCopyright.set({ bottom: 15, left: 10 });
           this.getApacheConfigWin().add( lblCopyright );

           // Open the window
		   this.getApacheConfigWin().open();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

     __updateApacheConfigHandler : function( result, ex, id ) {

     	// An exception occurred
       	if( ex != null ) {

       		this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error", null );
       		return false;
       	}

        // Process the response from the JSON RPC server
        if( result ) {

            // Create new parent rdn for the callback method
            var pieces = this.getObjConfig().dn.split( "," )[0].split( "=" );
            var parentRdn = this.getObjConfig().dn.replace( pieces[0] + "=" + pieces[1] + ",", "" );

            // Invoke the callback method to refresh the browser tree
            this.getCallback()( parentRdn );

            // Close the add repository window
            this.getApacheConfigWin().close();
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