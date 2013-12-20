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

qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Repository", {

  extend : vhf.Main,

  properties : {

  	    WireFrame   : { init : vhf.Main.getInstance() },
  	    RepoPropWin : { },
  	    RepoObj     : { },
  	    NewValues   : { init : [ ] },
  	    Callback    : { }
  },

  construct : function( obj ) {

      this.setRepoObj( obj[0] );
      this.setCallback( obj[1] );
      
           this.setRepoPropWin( new qx.ui.window.Window( "Repository Properties", "icon/16/" + this.getAppIcon() ) );
           this.getRepoPropWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
           });
    	   this.getRepoPropWin().setSpace( 200, 400, 0, 450 );  // left // width // top // height
    	   this.getRepoPropWin().removeAll();

           // Window icon
           var ico1 = new qx.ui.basic.Atom( "Repository Properties", "icon/32/apps/internet-download-manager.png");
		   with( ico1 ) {

		         setTop ( 5 );
		         setLeft( 5 );
		         setIconPosition( "left" );
		   };

           // Set up the tab view
           var tv1 = new qx.ui.pageview.tabview.TabView;
	           tv1.set({ left: 4, top: 40, right: 4, bottom: 50 });

	       var t1 = new qx.ui.pageview.tabview.Button( "General", "icon/16/mimetypes/text-ascii.png" );
     	       t1.setChecked( true );
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

 	       // Repository name label
           var lblRepo = new qx.ui.basic.Atom( "Repository Name" );
               lblRepo.setHorizontalChildrenAlign( "right" );
               lblRepo.set({

                 top: 30,
                 left: 10
          });
          // Repository name text field
          var txtRepo = new qx.ui.form.TextField();
              txtRepo.set({

            	top: 30,
            	right: 30,
            	width: '60%',
            	value: this.getRepoObj().cn[0]
          });
          txtRepo.setReadOnly( true );

          // Repository name tool tip icon
          var txtTip1 = "This is the friendly name which is displayed in reference to this repository.<br><b>Example: </b>P2P Hosting Network";
          var tipIcon1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon1.set({ top: 30, right: 10 });

          var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
          var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
              tipIcon1.setToolTip( tt1 );

          // Repository url label
           var lblURL = new qx.ui.basic.Atom( "Repository URL" );
               lblURL.setHorizontalChildrenAlign( "right" );
               lblURL.set({

                 top: 55,
                 left: 10
          });
          // Repository url text field
          var txtURL = new qx.ui.form.TextField();
              txtURL.set({

            	top: 55,
            	right: 30,
            	width: '60%',
            	value: this.getRepoObj().repositoryurl[0]
          });

          // Repository URL tool tip icon
          var txtTip2 = "The uniform resource locator (URL) where the repository if hosted.<br><b>Example: http://vhf.makeabyte.com/repo";
          var tipIcon2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon2.set({ top: 55, right: 10 });

          var tooltipBtn2 = new qx.ui.basic.Atom( txtTip2 );
          var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
              tipIcon2.setToolTip( tt2 );

          // BUTTONS
          var btnCancel = new qx.ui.form.Button( "Cancel", "icon/16/actions/dialog-cancel.png" );
              btnCancel.addEventListener( "execute", function( e ) { this.getRepoPropWin().close(); ico1.setLabel( "" ); }, this );
              btnCancel.set({ bottom : 10, right : 65 });

          var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
              btnOK.addEventListener( "execute", function( e ) { 

                // Close the window
                this.getRepoPropWin().close();

                // Update the repository if the url has been modified
                if( this.getRepoObj().repositoryurl[0] != txtURL.getValue() ) {
                 
                     // Perform JSON RPC call to delete the object
                    var callback = qx.lang.Function.bind( this.__saveDataHandler, this );
                    this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "REPOSITORY", "update", this.getRepoObj().dn, txtURL.getValue() );
                }

              }, this );
              btnOK.set({ bottom : 10, right : 10 });

          p1.add( cl1 );
          cl1.add( lblRepo, txtRepo, tipIcon1 );
          cl1.add( lblURL, txtURL, tipIcon2 );

          // Add the rest of the visual elements
          this.getRepoPropWin().add( btnOK, btnCancel );
          this.getRepoPropWin().add( ico1, tv1 );
          
          // Display copyright
          var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
              lblCopyright.set({ bottom: 15, left: 10 });
          this.getRepoPropWin().add( lblCopyright );
		  this.getRepoPropWin().open();

		  // Add the window to the wire frame workspace
		  this.getWireFrame()._addToWorkspace( this.getRepoPropWin() );      
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

     __saveDataHandler : function( result, ex, id ) {

     	  if( ex != null ) {

     	      this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC ERROR" );
     	      this.getWireFrame()._setStatusText( "RPC ERROR!" );
     	  }

     	  if( result ) {
     	  
     	      // Create parent dn
              var parentDn = this.getRepoObj().dn.replace( "cn=" + this.getRepoObj().cn[0] + ",", "" );

              // Invoke the callback method to refresh the browser table
              this.getCallback()( parentDn );

              // Update the status bar
     	  	  this.getWireFrame()._setStatusText( "Ready" );
     	  }
     },

    terminate : function() {
          this.base( arguments );
    }
  }
});