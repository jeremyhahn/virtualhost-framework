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

qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Package", {

  extend : vhf.Main,

  properties : {

  	    WireFrame      : { init : vhf.Main.getInstance() },
  	    PackagePropWin : { },
  	    PackageObj     : { },
  	    Table          : { },
  	    TableModel     : { },
  	    RowData        : { init : [ ] },
  	    Callback       : { }
  },

  construct : function( obj ) {

      this.setPackageObj( obj[0] );
      this.setCallback( obj[1] );
      
           this.setPackagePropWin( new qx.ui.window.Window( "Package Properties", "icon/16/" + this.getAppIcon() ) );
           this.getPackagePropWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
           });
    	   this.getPackagePropWin().setSpace( 200, 400, 0, 450 );  // left spacing // width // top spacing // height
    	   this.getPackagePropWin().removeAll();

           // Window icon
           var ico1 = new qx.ui.basic.Atom( "Package Properties", "icon/32/apps/accessories-archiver.png");
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
	       var t2 = new qx.ui.pageview.tabview.Button( "Members", "icon/16/apps/system-users.png" );

           tv1.getBar().add( t1, t2 );

	       // Set up each of the tab pages
	       var p1 = new qx.ui.pageview.tabview.Page( t1 );
	       var p2 = new qx.ui.pageview.tabview.Page( t2 );

           tv1.getPane().add( p1, p2 );

           // Set up the layout         
           var cl1 = new qx.ui.layout.CanvasLayout;

			    cl1.setTop( 0);
			    cl1.setLeft( 0 );
			    cl1.setWidth( "100%" );
			    cl1.setHeight( "100%" );
			    cl1.setBackgroundColor( "white" );
			    cl1.setPaddingLeft( 0 );

 	       // Package name label
           var lblName = new qx.ui.basic.Atom( "Package Name" );
               lblName.setHorizontalChildrenAlign( "right" );
               lblName.set({

                 top: 30,
                 left: 10
          });
          // Package name text field
          var txtName = new qx.ui.form.TextField();
              txtName.set({

            	top: 30,
            	right: 30,
            	width: '60%',
            	value: this.getPackageObj().cn[0]
          });
          // Package name tool tip icon
          var txtTip1 = "This is the friendly name which is displayed in reference to this package.<br><b>Example: </b>my_custom_package";
          var tipIcon1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon1.set({ top: 30, right: 10 });

          var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
          var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
              tipIcon1.setToolTip( tt1 );

          // Package status label
           var lblStatus = new qx.ui.basic.Atom( "Status" );
               lblStatus.setHorizontalChildrenAlign( "right" );
               lblStatus.set({

                 top: 55,
                 left: 10
          });
          // Package status text field
          var chkStatus = new qx.ui.form.CheckBox( "Enabled" );
              chkStatus.set({ top: 55, right: 185 });
              chkStatus.setChecked( (this.getPackageObj().packagestatus[0] == "active" ) );

          // Package status tool tip icon
          var txtTip2 = "Check to enable the package or uncheck to disable this package.";
          var tipIcon2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon2.set({ top: 55, right: 10 });

          var tooltipBtn2 = new qx.ui.basic.Atom( txtTip2 );
          var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
              tipIcon2.setToolTip( tt2 );

          // Package classpath label
           var lblClasspath = new qx.ui.basic.Atom( "Classpath" );
               lblClasspath.setHorizontalChildrenAlign( "right" );
               lblClasspath.set({

                 top: 80,
                 left: 10
          });
          // Package classpath text field
          var txtClasspath = new qx.ui.form.TextField();
              txtClasspath.set({

            	top: 80,
            	right: 30,
            	width: '60%',
            	value: this.getPackageObj().packageclasspath[0]
          });
          // Package classpath tool tip icon
          var txtTip3 = "The classpath of the main class in this package.<br><b>Example: </b>packages.my.custom.Package";
          var tipIcon3 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon3.set({ top: 80, right: 10 });

          var tooltipBtn3 = new qx.ui.basic.Atom( txtTip3 );
          var tt3 = new qx.ui.popup.ToolTip( txtTip3 );
              tipIcon3.setToolTip( tt3 );

          // Package version label
           var lblVersion = new qx.ui.basic.Atom( "Version" );
               lblVersion.setHorizontalChildrenAlign( "right" );
               lblVersion.set({

                 top: 105,
                 left: 10
          });
          // Package version text field
          var txtVersion = new qx.ui.form.TextField();
              txtVersion.set({

            	top: 105,
            	right: 30,
            	width: '60%',
            	value: this.getPackageObj().packageversion[0]
          });
          // Package version tool tip icon
          var txtTip4 = "The version number for this package (recommended major.minor[.revision[.build]].<br><b>Example: </b>1.0";
          var tipIcon4 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon4.set({ top: 105, right: 10 });

          var tooltipBtn4 = new qx.ui.basic.Atom( txtTip4 );
          var tt4 = new qx.ui.popup.ToolTip( txtTip4 );
              tipIcon4.setToolTip( tt4 );


         /**
          * Members tab
          */
        // table model
        this.setTableModel( new qx.ui.table.model.Simple() );
        this.getTableModel().setColumns( [ "Distinguished Name" ] );

        // Create a custom column model
	    var custom = { tableColumnModel : function( obj ) {
	                   return new qx.ui.table.columnmodel.Resize( obj );
	                   }
	    };

        // table
        this.setTable( new qx.ui.table.Table( this.getTableModel(), custom ) );
        with( this.getTable() ) {

              set({ left: 0, top: 0, width: '99%', height: 280, border: "inset-thin" });
          setMetaColumnCounts( [1, -1] );
          getSelectionModel().setSelectionMode( qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION );
        };
        p2.add( this.getTable() );

        // Configure table sizing and sizing beghaviors
		var tcm = this.getTable().getTableColumnModel();

        // Obtain the behavior object to manipulate
        var resizeBehavior = tcm.getBehavior();

        // SN column dimensions
        resizeBehavior.setWidth( 0, 340 );
        resizeBehavior.setMinWidth( 0, 50 );
        resizeBehavior.setMaxWidth( 0, 600 );

        // Clear the table if this widget has been opened already and still contains populated data
        this.getRowData().splice( 0, this.getRowData().length );
        this.getTableModel().setData( this.getRowData() );

          // BUTTONS
          var btnCancel = new qx.ui.form.Button( "Cancel", "icon/16/actions/dialog-cancel.png" );
              btnCancel.addEventListener( "execute", function( e ) { this.getPackagePropWin().close(); ico1.setLabel( "" ); }, this );
              btnCancel.set({ bottom : 10, right : 65 });

          var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
              btnOK.addEventListener( "execute", function( e ) {

                    var members = [];
                    for( var i=0; i<this.getRowData().length; i++ )
                    	 members.push( this.getRowData()[i][0])

                    var status;
                    (chkStatus.isChecked() == true) ? status = "active" : status = "disabled";
              	    this.__modifyPackage( status, txtClasspath.getValue(), txtVersion.getValue(), members );
              	    this.__renamePackage( txtName.getValue() );
              	    
              	     ico1.setLabel( "" );
              },this );
              btnOK.set({ bottom : 10, right : 10 });

          p1.add( cl1 );
          cl1.add( lblName, txtName, tipIcon1 );
          cl1.add( lblStatus, chkStatus, tipIcon2 );
          cl1.add( lblVersion, txtVersion, tipIcon3 );
          cl1.add( lblClasspath, txtClasspath, tipIcon4 );

          this.getPackagePropWin().add( btnOK, btnCancel );
          this.getPackagePropWin().add( ico1, tv1 );

          // Display copyright
          var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
              lblCopyright.set({ bottom: 15, left: 10 });
          this.getPackagePropWin().add( lblCopyright );
		  this.getPackagePropWin().open();
		  this.getWireFrame()._addToWorkspace( this.getPackagePropWin() );

          // Display the members as well as its type
	  	  for( var i=0; i<this.getPackageObj().member.count; i++ )
	            this.getRowData().push([ this.getPackageObj().member[i] ]);

		  this.getTableModel().setData( this.getRowData() );

		  // Bind a context menu to the table
          this.__loadContextMenu( "AddRemoveMember", Array( this.getTable(), this.getRowData(), this.getPackageObj().dn ) );
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {
  	
     __modifyPackage : function( status, classpath, version, members ) {

          this.getWireFrame()._setStatusText( "Updating package attributes..."  );

          // Set the JSON encoded values
          var json = '[' +
	                       // General properties
	                      '{ "name" : "dn", "dn" : "' + this.getPackageObj().dn + '"},' +
	                      '{ "name" : "packageStatus", "packageStatus" : "' + status + '"},' +
	                      '{ "name" : "packageClasspath", "packageClasspath" : "' + classpath + '"},' +
	                      '{ "name" : "packageVersion", "packageVersion" : "' + version + '"},' +
	                      '{ "name" : "members", "members" :' + this.getWireFrame().arrayToJson( members ) + '}' +
                     ']'; 

     	  // Perform JSON RPC call to delete the object
          var callback = qx.lang.Function.bind( this.__modifyPackageHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "PACKAGE", "update", json );
     },
     
     __renamePackage : function( name ) {

          // Update the status bar     	
     	  this.getWireFrame()._setStatusText( "Renaming package..." );

          // Extract the parent dn
     	  var newParent = this.getPackageObj().dn.replace( "cn=" + this.getPackageObj().cn[0] + ",", "" );
     	  
     	   // Set the JSON encoded values
          var json = '[' +
	                       // General properties
	                      '{ "name" : "dn", "dn" : "' + this.getPackageObj().dn + '"},' +
	                      '{ "name" : "cn", "cn" : "' + name + '"},' +
	                      '{ "name" : "parentDn", "parentDn" : "' + newParent + '"}' +
                     ']'; 

          // Perform JSON RPC call to delete the object
          var callback = qx.lang.Function.bind( this.__renamePackageHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.api", "invoke", "PACKAGE", "rename", this.getPackageObj().dn, name, newParent );
     },
     
     __renamePackageHandler : function( result, ex, id ) {
     	
     	  // Close the properties window
      	  this.getPackagePropWin().close();

          // Update the UI
     	  this.getWireFrame()._setStatusText( "Ready" );
     },

    /**
     * Handles the JSON RPC reply to from the server
     * 
     * @type member
     * @param array result Boolean true if the update was successful
     * @param object ex JSON RPC exception handler
     * @param integer id The id of the JSON RPC transport call
     */
     __modifyPackageHandler: function( result, ex, id ) {

     	  if( ex != null ) {

     	     this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error"  );
     	     this.getWireFrame()._setStatusText( "RPC Error!"  );
     	  }

          if( result ) {

              // Extract the parent ou dn
	          var parentDn = this.getPackageObj().dn.replace( "cn=" + this.getPackageObj().cn[0] + ",", "" );

	          // Invoke the callback method to refresh the browser table
	          this.getCallback()( parentDn );

              // Update the status bar
          	  this.getWireFrame()._setStatusText( "Ready"  );
          }
      },

    /**
     * Loads the external javascript context menu file for the package members right click event
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