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
qx.Class.define( "packages.com.makeabyte.vhf.apache2.ui.LDAPVHostManager", {

  extend : vhf.Main,

  properties : {

  	    WireFrame : { init : vhf.Main.getInstance() },
  	    VHostWin  : { },
  	    Table     : { },
  	    RowData   : { init : [ ] },
  	    Callback  : { }
  },

  construct : function() {

       // Create module button with event handler
       var modBtn = new qx.ui.menu.Button( "Website Manager", "icon/16/places/html-folder.png" );
	       modBtn.addEventListener( "execute", function( e ) { this.main() }, this );

       // Add the module button to the GUI
 	   this._setModuleButton( modBtn );

	   // Set up the window
       this.setVHostWin( new qx.ui.window.Window( "Website Manager", "icon/16/" + this.getWireFrame().getAppIcon() ) );
       this.getVHostWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
       });
	   this.getVHostWin().setSpace( 200, 400, 0, 450 );  // left // width // top // height
	   this.getVHostWin().removeAll();

       // Window icon
       var ico1 = new qx.ui.basic.Atom( "Add or delete a website by right clicking within the table.<br>", "icon/32/places/html-folder.png");
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

       p1.add( cl1 );           

       // Dynamically list each of the attribute name/value pairs
       var tableModel = new qx.ui.table.model.Simple();
           tableModel.setColumns( [ "Website" ] );

       // Create a custom column model
	   var custom = { tableColumnModel : function( obj ) {
	                  return new qx.ui.table.columnmodel.Resize( obj );
	                }
	   };

       // table
       this.setTable( new qx.ui.table.Table( tableModel, custom ) );
       with( this.getTable() ) {

             set({ left: 0, top: 0, width: '100%', height: 280, border: "inset-thin" });
             setMetaColumnCounts( [1, -1] );
             getSelectionModel().setSelectionMode( qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION );
       };
       cl1.add( this.getTable() );

       // Configure table sizing and sizing beghaviors
	   var tcm = this.getTable().getTableColumnModel();

       // Obtain the behavior object to manipulate
       var resizeBehavior = tcm.getBehavior();

       //  Attribute column dimensions
       resizeBehavior.setWidth( 0, 390 );
       resizeBehavior.setMinWidth( 0, 50 );
       resizeBehavior.setMaxWidth( 0, 500 );

       // Set one the values) two as editable
       tableModel.setColumnEditable( 1, true );

       // BUTTONS
       var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
           btnOK.set({ bottom : 10, right : 10 });
           btnOK.addEventListener( "execute", function( e ) { 

                  this.getVHostWin().close();
          }, this );

       // Add UI elements/widgets to the window
       this.getVHostWin().add( ico1, tv1, btnOK );

       // Display copyright
       var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
           lblCopyright.set({ bottom: 15, left: 10 });
       this.getVHostWin().add( lblCopyright );

       // Load right click context menu
       this.__loadContextMenu();
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

       // Add the window to the document
       this.getWireFrame()._addToWorkspace( this.getVHostWin() );

       // Pooulates the window with the users websites
       this.__populate();

       // Open the window
       this.getVHostWin().open();
    },

    __populate : function() {

       var json = '[{ "name" : "uidNumber", "uidNumber" : "' + this.getWireFrame().getUserAttribs().uidnumber[0] + '" }]';

       // Get a list of websites which this user owns
       var callback = qx.lang.Function.bind( this.__getWebsitesHandler, this );
       this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "HTTP", "getWebsites", json );
    },

    __getWebsitesHandler : function( result, ex, id ) {

    	if( ex != null ) {

    		this.getWireFrame()._showAlertDialog( "error", ex, "RPC Error" );
    		this.getWireFrame()._setStatusText( "RPC Error!" );
    	}

    	if( result ) {

    		// Clear the table if this widget has been opened already and still contains populated data
	       if( this.getRowData().length ) {

	           this.getRowData().splice( 0, this.getRowData().length );
	           this.getTable().getTableModel().setData( this.getRowData() );
	       }

	       // Add the values
	       for( var i=0; i<result.count; i++ )
      	    	this.getRowData().push([ result[i].apacheservername[0], result[i] ] );

       	   this.getTable().getTableModel().setData( this.getRowData() );
    	}
    },

    /**
     * Loads the external javascript context menu file for the right click event
     * 
     * @type member
     * @param string type The name of the javascript file to load / type of context menu
     * @param array obj An array containing the arguments to pass to the class when its instantiated
     */
    __loadContextMenu : function( type ) {

        var callback = new qx.lang.Function.bind( this.__populate, this );
        this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.apache2.ui.contextmenu.LDAPVHostManager", Array( this.getTable(), this.getRowData(), callback ) );
    },

    terminate : function() {
          this.base( arguments );
    }
  }
});