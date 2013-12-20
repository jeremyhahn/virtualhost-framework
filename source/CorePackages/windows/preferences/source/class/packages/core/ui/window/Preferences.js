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
#require(qx.ui.groupbox.GroupBox)
#require(qx.io.remote.Rpc)
#require(qx.ui.selection.RadioManager)
#require(qx.ui.menu.RadioButton)
************************************************************************ */

qx.Class.define( "packages.core.ui.window.Preferences", {

  extend : vhf.Main,

  properties : {

  	    WireFrame      : { init : vhf.Main.getInstance() },
  	    PreferencesWin : { init : new qx.ui.window.Window( "Application Preferences", "icon/16/apps/preferences.png" ) }
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
     * Displays a settings window which allows administrators to manage server, package, and repository configurations.
     *
     * @type member
     */

    main : function() {

           this.getPreferencesWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
          	  });
    	      this.getPreferencesWin().setSpace( 200, 400, 20, 400 );
    	      this.getPreferencesWin().setShowStatusbar( true );

	      this.getWireFrame()._addToWorkspace( this.getPreferencesWin() );

 		  var at1 = new qx.ui.basic.Atom( "Application Preferences", "icon/22/apps/preferences.png" );
		      at1.setLocation( 4, 4 );

          // Set up the tab view
          var tv1 = new qx.ui.pageview.tabview.TabView;
	          tv1.set({ left: 4, top: 40, right: 4, bottom: 4 });
	      var t1 = new qx.ui.pageview.tabview.Button( "Themes", "icon/16/categories/preferences-system.png" );
     	      t1.setChecked( true );
	      var t2 = new qx.ui.pageview.tabview.Button( "Toolbar", "icon/16/categories/applications-development.png" );
          tv1.getBar().add( t1, t2 );

	      // Set up each of the tab pages
	      var p1 = new qx.ui.pageview.tabview.Page( t1 );
	      var p2 = new qx.ui.pageview.tabview.Page( t2 );
          tv1.getPane().add( p1, p2 );

          /*
           * Set up the themes tab
           */
          var l1 = new qx.ui.layout.CanvasLayout;
               l1.setWidth( '100%' );
	     	   l1.setHeight( '100%' );
          p1.add( l1 );

          // Icon Themes
          qx.util.ThemeList.createIconButtons( l1, 5, 48 );

          // Color Themes
          qx.util.ThemeList.createMetaButtons( l1, 200, 48 );

/*          
           var mgr = qx.theme.manager.Meta.getInstance();
           var themes = mgr.getMetaThemes();
           var spaceCounter = 0;
		   for( var i=0; i<themes.length; i++ ) {
		        theme = themes[i];

		        if( theme.type === "abstract" )
		            continue;

	            var checked = (theme == mgr.getTheme());
		        var item    = new qx.ui.menu.RadioButton( theme.title, null, checked );
		        item.set({ left: 10, top: spaceCounter, height: 10, width: 10 });
		        item.setUserData( "theme", theme );
		        item.addEventListener( "execute", function(e) {
		             mgr.setTheme( e.getTarget().getUserData( "theme" ) );
		        })
		        p1.add( item );
		        spaceCounter = spaceCounter + 25;
  	       }
*/
          /*
           *  Set up the external sites list view
           */
          var ld = [];
		  var lt = [ "Name", "URL" ];

	      var lc = {

                Name : { label : "Name", width : 190, type : "text", sortable : true, sortProp : "text" },
		        Url  : { label : "URL",  width : 190, type : "text", sortable : true, sortProp : "text" }
		  };

		  var lv = new qx.ui.listview.ListView( ld, lc );

   		      lv.setBorder( "dark-shadow" );
		      lv.setBackgroundColor( "white" );
	          lv.setWidth( '100%' );
		      lv.setBottom( 40 );
		      lv.setLocation( 0, 0 );

          // Adds each of the toolbar buttons / external sites which the current logged on user has configured
          for( var i=0; i<this.getWireFrame().getExternalSites().length; i++ ) {

               ld.push({ Name : { text : this.getWireFrame().getExternalSites()[i].name },
               	         Url  : { text : this.getWireFrame().getExternalSites()[i].url }
		       });
          }
          lv.updateSort();
          lv.update();

          // Delete button
          var deleteBtn = new qx.ui.form.Button( "Delete Site", "icon/16/actions/edit-delete.png" );
              deleteBtn.set({ bottom : 2, right : 90, enabled : false });
              deleteBtn.addEventListener( "execute", function( e ) { this.__removeSite( lv, ld, deleteBtn ) }, this );

          // Add button
          var addBtn    = new qx.ui.form.Button( "New Site", "icon/16/actions/edit-add.png" );
              addBtn.addEventListener( "execute", function( e ) { this.__addSite( lv, ld ) }, this );
              addBtn.set({ bottom : 2, right : 2 });
          p2.add( lv, deleteBtn, addBtn );

          // Event handler to enable the delete button when a package has been selected
		  lv.getPane().getManager().addEventListener( "changeSelection", function( e ) { deleteBtn.setEnabled( true ) } );

   	      this.getPreferencesWin().add( at1, tv1 );
		  this.getPreferencesWin().open();
     },

     // Removes the selected package(s)
	 __removeSite : function( lv, ld, deleteBtn ) {

           var items         = lv.getPane().getManager().getItems();
           var selectedItems = lv.getPane().getSelectedItems();

           // Loop through each of the list items
           for( var i=0; i<items.length; i++ ) {

                // Loop through each of the selected list items
                for( var j=0; j<selectedItems.length; j++ ) {

                    if( items[i].Name.text == selectedItems[j].Name.text ) {

                        // Let the user know which package is being deleted
                        this.getPreferencesWin().setStatus( "Deleting site " + selectedItems[j].Name.text + "..." );

                        // Perform the async RPC call to delete the package
                        var callback = qx.lang.Function.bind( this.__removeSiteHandler, this );
		                this.getWireFrame()._callAsyncRpc( callback, "core.rpc.ui.Preferences", "delete",
     	                                                this.getWireFrame().getUserAttribs()['dn'], items[i].Url.text );

                        // Remove the selected item from the listview pane
   					    ld.splice( i, 1 );
   					    lv.updateSort();
                        lv.update();

                        // Disable the delete button again until a new item is selected from the listview pane
                        if( !lv.getPane().getSelectedItem().length )
                            deleteBtn.setEnabled( false );
                    }
                }
		   }
     },

     __removeSiteHandler : function( result, ex, id ) {

          if( ex != null ) {

             this.getPreferencesWin().setStatus( "Ready" );
             this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Failure", null );
             return;
          }

          if( result )
              this.getPreferencesWin().setStatus( "Ready" );
     },

     __addSite : function( lv, ld ) {

         var args = Array(2);
             args[0] = lv;
             args[1] = ld;

     	 this.getWireFrame()._loadPackage( "packages.core.ui.window.NewToolbarButton", args );
     },

     __addSiteHandler : function( result, ex, id ) {

         if( ex != null ) {

         	 this.getPreferencesWin().setStatus( "Ready" );
         	 this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Failure", null );
         	 return;
         }

         if( result ) {

         	this.getPreferencesWin().close();
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