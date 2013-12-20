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

qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.NewAttribute", {

  extend : vhf.Main,

  properties : {

  	    WireFrame    : { init : vhf.Main.getInstance() },
  	    NewAttribWin : {  },
  	    ObjectDn     : { },
  	    Table        : { },
  	    TableRowData : { }
  },

  construct : function( obj ) {

      this.setObjectDn( obj[0] );
      this.setTable( obj[1] )
      this.setTableRowData( obj[2] );

           this.setNewAttribWin( new qx.ui.window.Window( "New Attribute", "icon/16/" + this.getAppIcon() ) );
           this.getNewAttribWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
           });
    	   this.getNewAttribWin().setSpace( 200, 400, 150, 200 );  // left spacing // width // top spacing // height
	       this.getWireFrame()._addToWorkspace( this.getNewAttribWin() );

 		   var at1 = new qx.ui.basic.Atom( "Enter the attribute name and value.", "icon/32/mimetypes/text-x-generic.png" );
		       at1.set({ top: 5, left: 5 });

           // Name
           var lblName = new qx.ui.basic.Atom( 'Name' );
               lblName.setHorizontalChildrenAlign( 'right' );
               lblName.set({
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

           var txtTip1 = "The name of the attribute.<br><b>Example:</b> description";
           var tipIcon1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon1.set({ top: 60, right: 10 });

           var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
           var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
           tipIcon1.setToolTip( tt1 );

           // Value
           var lblValue = new qx.ui.basic.Atom( 'Value' );
               lblValue.setHorizontalChildrenAlign( 'right' );
               lblValue.set({
              	  top: 85,
            	  left: 30,
            	  width: '10%'
                });

           var txtValue = new qx.ui.form.TextField();
               txtValue.set({
              	  top: 85,
            	  right: 30,
            	  width: '70%'
                });

           var txtTip2 = "The value of the attribute.<br><b>Example:</b> VP, Enterprise Development";
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

                 if( !txtName.getValue().length || !txtValue.getValue().length )
                     this.getWireFrame()._showAlertDialog( "error", "Please enter both an attribute name and value.", "Error", null );
                 else
                 	 this.__addAttrib( txtName.getValue(), txtValue.getValue() );
           }, this );

           btnCancel.addEventListener( "execute", function( e ) { this.getNewAttribWin().close() }, this );

   	       this.getNewAttribWin().add( at1, lblName, txtName, lblValue, txtValue, tipIcon1, tipIcon2, btnOK, btnCancel );
		   this.getNewAttribWin().open();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

     __addAttrib : function( name, value ) {

          // Update the status bar
          this.getWireFrame()._setStatusText( "Creating new attribute..." );

          // Call the RPC method on the server to install the repository
          var callback = qx.lang.Function.bind( this.__addAttribHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "LDAP", "addAttrib", this.getObjectDn(), name, value );
      },

     __addAttribHandler : function( result, ex, id ) {

     	// An exception occurred
       	if( ex != null ) {

       		this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error", null );
       		this.getWireFrame()._setStatusText( "RPC Error!" );
       		return false;
       	}

        if( result ) {

            // Add the new attribute to the table
            this.getTableRowData().push( [ result.attribute, result.value ] );
            this.getTable().getTableModel().setData( this.getTableRowData() );

            // Close the add repository window
            this.getNewAttribWin().close();

            // Update the status bar
            this.getWireFrame()._setStatusText( "RPC Error!" );
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