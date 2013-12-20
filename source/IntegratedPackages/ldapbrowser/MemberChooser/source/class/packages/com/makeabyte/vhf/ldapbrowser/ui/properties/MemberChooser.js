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
qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.MemberChooser", {

  extend : vhf.Main,

  properties : {

  	    WireFrame        : { init : vhf.Main.getInstance() },
  	    MemberChooserWin : { },
  	    Table            : { },
  	    TableModel       : { },
  	    RowData          : { init :  [] },
  	    ParentTable      : { },
  	    ParentRowData    : { init :  [] }
  },

  construct : function( arrData ) {

      this.setParentTable( arrData[0] );
      this.setParentRowData( arrData[1] );

           // Create the member chooser window
           this.setMemberChooserWin( new qx.ui.window.Window( "Member Chooser", "icon/16/" + this.getWireFrame().getAppIcon() ) );
           this.getMemberChooserWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
           });
    	   this.getMemberChooserWin().setSpace( 200, 400, 0, 450 );  // left // width // top // height
    	   this.getWireFrame()._addToWorkspace( this.getMemberChooserWin() );
    	   this.getMemberChooserWin().removeAll();

           // Window icon
           var ico1 = new qx.ui.basic.Atom( "Choose a member by double clicking its name in the list.", "icon/32/apps/system-users.png");
		   with( ico1 ) {

		         setTop ( 5 );
		         setLeft( 5 );
		         setIconPosition( "left" );
		   };

           // Set up the tab view
           var tv1 = new qx.ui.pageview.tabview.TabView;
	           tv1.set({ left: 4, top: 40, right: 4, bottom: 50 });

	       var t1 = new qx.ui.pageview.tabview.Button( "General", "icon/16/mimetypes/text-ascii.png.png" );
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
			    
			    cl1.removeAll();

 	       // Dynamically list each of the attribute name/value pairs
           this.setTableModel( new qx.ui.table.model.Simple() );
	       this.getTableModel().setColumns( [ "Member"] );

	       // Create a custom column model
		   var custom = { tableColumnModel : function( obj ) {
		                  return new qx.ui.table.columnmodel.Resize( obj );
		                }
		   };

	       // table
	       this.setTable( new qx.ui.table.Table( this.getTableModel(), custom ) );
	       with( this.getTable() ) {

	             set({ left: 0, top: 0, width: 400, height: 280, border: "inset-thin" });
	             setMetaColumnCounts( [1, -1] );
	             getSelectionModel().setSelectionMode( qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION  );
	       };
	       this.getTable().addEventListener( "dblclick", function( e ) {

              	var selectedObjects = this.getTable().getSelectionModel().getSelectedRanges();

		        for( var i=0; i<selectedObjects.length; i++ ) {
		             this.getTable().getTableModel().getValue( 0, selectedObjects[i].minIndex );

                     var bExists = false;
		             // Make sure the selected DN is not already a member of the parent table
		             for( var j=0; j<this.getParentTable().getTableModel().getRowCount(); j++ ) {

		             	  if( this.getParentTable().getTableModel().getValue( 0, j ) == this.getTable().getTableModel().getValue( 0, selectedObjects[i].minIndex ) ) {

		                      this.getWireFrame()._showAlertDialog( "error", "This object is already a member!", "Error Adding Member" );
		                      bExists = true;
		                      break;
		             	  }      
		             }
		             this.getParentRowData().push( [ this.getTable().getTableModel().getValue( 0, selectedObjects[i].minIndex )] );		                              
		        }
		        if( !bExists ) this.getParentTable().getTableModel().setData( this.getParentRowData() );
		        this.getMemberChooserWin().close();
           }, this );

	       // Clear the table if this widget has been opened already and still contains populated data
	       if( this.getRowData().length ) {

	           this.getRowData().splice( 0, this.getRowData().length );
	           this.getTableModel().setData( this.getRowData() );
	       }

	       // Configure table sizing and sizing beghaviors
		   var tcm = this.getTable().getTableColumnModel();

	       // Obtain the behavior object to manipulate
	       var resizeBehavior = tcm.getBehavior();

	       //  Attribute column dimensions
	       resizeBehavior.setWidth( 0, 380 );
	       resizeBehavior.setMinWidth( 0, 50 );
	       resizeBehavior.setMaxWidth( 0, 600 );

           p1.add( cl1 );
           cl1.add( this.getTable() );
           this.getMemberChooserWin().add( ico1, tv1 );
           
           // Display copyright
           var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
               lblCopyright.set({ bottom: 15, left: 10 });
           this.getMemberChooserWin().add( lblCopyright );
           this.getMemberChooserWin().open();

           // Populate the table
           this.__populateMemberTable();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

    __populateMemberTable : function() {

          // Update the status bar
          this.getWireFrame()._setStatusText( "Getting a list of possible members..." );

          // Perform JSON RPC call to delete the object
          var callback = qx.lang.Function.bind( this.__populateMemberTableHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "getMembers", null );
    },

    __populateMemberTableHandler : function( result, ex, id ) {

         // Catch exceptions
         if( ex != null ) {

         	 this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
         	 this.getWireFrame()._setStatusText( "RPC Error!" );
         }

         // Handle successful response
         if( result ) {

             // Add each of the possible members
             for( var i=0; i<result.count; i++ )
        		  this.getRowData().push( [result[i].dn] );

             this.getRowData().sort();
             this.getTableModel().setData( this.getRowData() );

             // Update the status bar
             this.getWireFrame()._setStatusText( "Ready" );   		  
         }
    },

    terminate : function() {
          this.base( arguments );
    }
  }
});