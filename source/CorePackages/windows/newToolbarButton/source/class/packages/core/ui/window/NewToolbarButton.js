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
#require(qx.io.remote.Rpc)
#require(qx.util.ThemeList)
************************************************************************ */

qx.Class.define( "packages.core.ui.window.NewToolbarButton", {

  extend : vhf.Main,

  properties : {

  	    WireFrame    : { init : vhf.Main.getInstance() },
  	    NewButtonWin : { init : new qx.ui.window.Window( "New Toolbar Button", "icon/16/actions/edit-add.png" ) },
  	    BtnName      : { init : null },
  	    BtnUrl       : { init : null },
  	    Lv           : { init : null },
  	    Ld           : { init : null }
  },

  construct : function( args ) {

      this.setLv( args[0] );
      this.setLd( args[1] );

      this.main();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

    /**
     * Displays a settings window which allows administrators to manage server, package, and repository configurations.
     *
     * @type member
     */

    main : function() {

           this.getNewButtonWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
          	    });
    	   this.getNewButtonWin().setSpace( 200, 400, 150, 200 );  // left spacing // width // top spacing // height
	       this.getWireFrame()._addToWorkspace( this.getNewButtonWin() );

 		   var at1 = new qx.ui.basic.Atom( "Add New Toolbar Button", "icon/22/actions/edit-add.png" );
		       at1.setLocation( 4, 4 );

           // Name
           var txtNameLabel = new qx.ui.basic.Atom( 'Name' );
               txtNameLabel.setHorizontalChildrenAlign( 'right' );
               txtNameLabel.set({
              	  top: 60,
            	  left: 30,
            	  width: '10%'
                });

           var txtName = new qx.ui.form.TextField();
               txtName.set({
              	  top: 60,
            	  right: 30,
            	  width: '70%'
                });

           var txtTip = "The name to display on the toolbar button.";
           var tipIcon = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon.set({ top: 60, right: 10 });

           var tooltipBtn = new qx.ui.basic.Atom( txtTip );
           var tt1 = new qx.ui.popup.ToolTip( txtTip );
           tipIcon.setToolTip( tt1 );

           // URL 
           var txtUrlLabel = new qx.ui.basic.Atom( 'URL' );
               txtUrlLabel.setHorizontalChildrenAlign( 'right' );
               txtUrlLabel.set({
              	  top: 85,
            	  left: 30,
            	  width: '10%'
                });

           var txtURL = new qx.ui.form.TextField();
               txtURL.set({
              	  top: 85,
            	  right: 30,
            	  width: '70%',
            	  value: 'http://'
                });

           var txtTip2 = "The URL to launch when the button is clicked.";
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

           	     this.setBtnName( txtName.getValue() );
           	     this.setBtnUrl( txtURL.getValue() );

                 if( !txtName.getValue().length || !txtURL.getValue().length )
                     this.getWireFrame()._showAlertDialog( "error", "Please enter both a name and URL for the new toolbar button.", "Toolbar Error", null );
                 else
                     this.__installButton( txtName.getValue(), txtURL.getValue() );

           }, this );

           btnCancel.addEventListener( "execute", function( e ) { this.getNewButtonWin().close() }, this );

   	       this.getNewButtonWin().add( at1, txtUrlLabel, txtURL, tipIcon, txtNameLabel, txtName, tipIcon2, btnOK, btnCancel );
		   this.getNewButtonWin().open();
     },

     __installButton : function( name, url ) {

          // Call the RPC method on the server to install the new toolbar button preference
          var callback = new qx.lang.Function.bind( this.__installButtonHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.api.Preferences", "insert", this.getWireFrame().getUserAttribs()['dn'], name, url, "toolbarButton" );
      },

     __installButtonHandler : function( result, ex, id ) {

     	// An exception occurred
       	if( ex != null ) {

       		this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error", null );
       		return false;
       	}

        if( result ) {

            // Populate the parent toolbar buttons listview with the new external site
            this.getLd().push({ Name : { text : this.getBtnName() },
               	                Url  : { text : this.getBtnUrl() }
            });
   			this.getLv().updateSort();
            this.getLv().update();

            // Add the button to the toolbar
            this.getWireFrame()._setToolbarButton( this.getBtnName(), this.getBtnUrl() );

            // Close the add repository window
            this.getNewButtonWin().close();
        }
     },

    /**
     * TODOC
     *
     * @type member
     */
    close : function()
    {
      this.base(arguments);

      // Prompt user
      // return "Do you really want to close the application?";
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