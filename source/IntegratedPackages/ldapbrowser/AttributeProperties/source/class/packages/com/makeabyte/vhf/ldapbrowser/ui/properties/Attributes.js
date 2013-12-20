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
qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Attributes", {

  extend : vhf.Main,

  properties : {

  	    WireFrame   : { init : vhf.Main.getInstance() },
  	    MiscPropWin : { },
  	    Table       : { },
  	    MiscObj     : { },
  	    RowData     : { init : [ ] },
  	    Callback    : { init : "" }
  },

  construct : function( obj ) {

       // Initalize constructor variables / class properties
       this.setMiscObj( obj[0] );
       if( (obj.length > 1) && (obj[1] !== null) ) this.setCallback( obj[1] );

       // Set up the window
       this.setMiscPropWin( new qx.ui.window.Window( "Raw Attributes", "icon/16/" + this.getWireFrame().getAppIcon() ) );
       this.getMiscPropWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
       });
	   this.getMiscPropWin().setSpace( 200, 400, 0, 450 );  // left // width // top // height
	   this.getWireFrame()._addToWorkspace( this.getMiscPropWin() );
	   this.getMiscPropWin().removeAll();

       // Window icon
       var ico1 = new qx.ui.basic.Atom( "Edit the raw object attributes by double clicking the cell which<br>contains the value you wish to edit. Right click for a context menu.", "icon/32/mimetypes/text-x-generic.png");
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
           tableModel.setColumns( [ "Attribute", "Value" ] );

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
       resizeBehavior.setWidth( 0, 195 );
       resizeBehavior.setMinWidth( 0, 50 );
       resizeBehavior.setMaxWidth( 0, 200 );
       //  Value column dimensions
       resizeBehavior.setWidth( 1, 195 );
       resizeBehavior.setMinWidth( 1, 50 );
       resizeBehavior.setMaxWidth( 1, 200 );

       // Set one the values) two as editable
       tableModel.setColumnEditable( 1, true );

       // BUTTONS
       var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
           btnOK.set({ bottom : 10, right : 10 });
           btnOK.addEventListener( "execute", function( e ) { 

               // Invoke callback method to refresh browser table
	           var name = this.getMiscObj().dn.split( "," )[0]
	           var dn = this.getMiscObj().dn.replace( name + ",", "" );
               this.getCallback()( dn );

               this.getMiscPropWin().close();

          }, this );

       // Add UI elements/widgets to the window
       this.getMiscPropWin().add( ico1, tv1, btnOK );

       // Display copyright
       var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
           lblCopyright.set({ bottom: 15, left: 10 });
       this.getMiscPropWin().add( lblCopyright );

       // Open the window
       this.getMiscPropWin().open();

       // Load right click context menu
       this.__loadContextMenu( "Attributes", Array( this.getTable(), this.getCallback(), this.getMiscObj(), this.getRowData() ) );

       // Invoke the main method
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

	       // Clear the table if this widget has been opened already and still contains populated data
	       if( this.getRowData().length ) {

	           this.getRowData().splice( 0, this.getRowData().length );
	           this.getTable().getTableModel().setData( this.getRowData() );
	       }

	       // Add the values
	       for( var i=0; i<this.getMiscObj().count; i++ ) {

	       	    var attrib = eval( "this.getMiscObj()." + this.getMiscObj()[i] );
	       	    for( var j=0; j<attrib.count; j++ )
	       	         this.getRowData().push([ this.getMiscObj()[i], attrib[j], this.getMiscObj() ] );
	       }

       	   // Add the DN since it was included in the above loop, sort the list and add it to the widget
       	   this.getRowData().push( [ "dn", this.getMiscObj().dn, this.getMiscObj() ] );
       	   this.getRowData().sort();
	       this.getTable().getTableModel().setData( this.getRowData() );

	       // Add event listener
	       this.getTable().getTableModel().addEventListener( "dataChanged", function( e ) {

                // Let the user know the attribute is being updated
                this.getWireFrame()._setStatusText( "Updating attribute..." );

                // Get the attribute name/value from the selected table row(s)
	            var selectedObjects = this.getTable().getSelectionModel().getSelectedRanges();

                // Collect a list of the currently selected data
	            var values = [];
	            for( var i=0; i<selectedObjects.length; i++ ) {

                     // If we are updating a multi=valued attribute we need to send all of the values along
                     // with the request to keep the existing values
	                 for( var j=0; j<this.getTable().getTableModel().getRowCount(); j++ )
	                      if( this.getTable().getTableModel().getValue( 0, j ) == this.getTable().getTableModel().getValue( 0, selectedObjects[i].minIndex ) )
	                          values.push( this.getTable().getTableModel().getValue( 1, j ) );

                     this.__updateAttribute( this.getMiscObj().dn, this.getTable().getTableModel().getValue( 0, selectedObjects[i].minIndex ), values.join( "|" ) );
	            }	            	 
	       }, this );
    },

    __updateAttribute : function( dn, attrib, values ) {

    	  // Perform JSON RPC call to delete the object
          var callback = qx.lang.Function.bind( this.__updateAttributeHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "updateAttrib", dn, attrib, values );
    },

    __updateAttributeHandler : function( result, ex, id ) {

         if( ex != null ) {
         
          	 this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
          	 this.getWireFrame().setStatusText( "RPC Error!" );
         }

         if( result )
            this.getWireFrame()._setStatusText( "Ready" );	
    },
    
    /**
     * Loads the external javascript context menu file for the right click event
     * 
     * @type member
     * @param string type The name of the javascript file to load / type of context menu
     * @param array obj An array containing the arguments to pass to the class when its instantiated
     */
      __loadContextMenu : function( type, obj ) {

        this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.contextmenu." + type, obj );
      },
      

    terminate : function() {
          this.base( arguments );
    }
  }
});