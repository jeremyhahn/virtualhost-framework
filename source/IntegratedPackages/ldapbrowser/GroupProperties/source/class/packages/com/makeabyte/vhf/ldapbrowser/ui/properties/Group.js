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

qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Group", {

  extend : vhf.Main,

  properties : {

  	    WireFrame    : { init : vhf.Main.getInstance() },
  	    GroupPropWin : { },
  	    GroupObj     : { },
  	    Table        : { },
  	    TableModel   : { },
  	    RowData      : { init : [ ] },
  	    Callback     : { },
  	    GroupType    : { }
  },

  construct : function( obj ) {

      this.setGroupObj( obj[0] );
      this.setCallback( obj[1] );

           // Determine what type of group is being worked with
           if( this.getWireFrame().propertiesToArray( this.getGroupObj().objectclass ).indexOf( "virtualHostFrameworkMailingList" ) >= 0 )
               this.setGroupType( "mailingList" );
           else
               this.setGroupType( "groupOfNames" );

           // Create the window
           this.setGroupPropWin( new qx.ui.window.Window( "Group Properties", "icon/16/" + this.getWireFrame().getAppIcon() ) );
           this.getGroupPropWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
           });

    	   this.getGroupPropWin().setSpace( 200, 400, 0, 450 );  // left spacing // width // top spacing // height
    	   this.getGroupPropWin().removeAll();

           // Window icon
           var ico1 = (this.getGroupType() == "mailingList") ? new qx.ui.basic.Atom( "Mailing List Properties", "icon/32/actions/mail.png" ) : new qx.ui.basic.Atom( "Group Properties", "icon/32/apps/system-users.png" );
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

			    cl1.removeAll();

 	       // -------------------------------------------------->
 	       // Text fields
 	       // -------------------------------------------------->
 	       // Group name label
           var lblGroupName = new qx.ui.basic.Atom( "Group Name" );
               lblGroupName.setHorizontalChildrenAlign( "right" );
               lblGroupName.set({

                 top: 30,
                 left: 10
           });
           // Group name text field
           var txtGroupName = new qx.ui.form.TextField();
               txtGroupName.set({

             	 top: 30,
            	 right: 30,
            	 width: '60%',
            	 value: this.getGroupObj().cn[0]
           });
           txtGroupName.setReadOnly( true );

           // Group name tool tip icon
           var txtTip1 = "The name used to represent this group.<br><b>Example: </b>Partners";
           var tipIcon1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon1.set({ top: 30, right: 10 });

           var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
           var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
               tipIcon1.setToolTip( tt1 );

		   // Description name label
           var lblDescription = new qx.ui.basic.Atom( "Description" );
               lblDescription.setHorizontalChildrenAlign( "right" );
               lblDescription.set({

                 top: 55,
                 left: 10
           });
           // Description text field
           var txtDescription = new qx.ui.form.TextField();
               txtDescription.set({

             	 top: 55,
            	 right: 30,
            	 width: '60%',
            	 value: (this.getGroupObj().description == undefined) ? "" : this.getGroupObj().description[0]
           });

           // Description tool tip icon
           var txtTip2 = "The short sentence about this group.<br><b>Example: </b>Trusted partner affiliates";
           var tipIcon2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon2.set({ top: 55, right: 10 });

           var tooltipBtn2 = new qx.ui.basic.Atom( txtTip2 );
           var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
               tipIcon2.setToolTip( tt2 );

           if( this.getGroupType() == "mailingList" ) {

	           // DIVIDER
	           var sep1 = new qx.ui.basic.Label( "<hr>", null, "html" );
	  		       sep1.set({
	 
			           top: 85,
				  	   left: '5%',
				  	   width: '90%'
			   });
			   sep1.setWrap( true );
	
	           // Mail label
	           var lblMail = new qx.ui.basic.Atom( "Mail" );
	               lblMail.setHorizontalChildrenAlign( "right" );
	               lblMail.set({
	
	                  top: 115,
	                  left: 10
	           });
	           
	           // Mail text field
	           var txtMail = new qx.ui.form.TextField();
	              txtMail.set({
	
	            	top: 115,
	            	right: 30,
	            	width: '60%',
	            	value: (this.getGroupObj().mail == undefined) ? "" : this.getGroupObj().mail[0]
	          });
	          // Description tool tip icon
	          var txtTip3 = "The email address for this mailing list.<br><b>Example: </b>partners@vhf.local";
	          var tipIcon3 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	              tipIcon3.set({ top: 115, right: 10 });
	
	          var tooltipBtn3 = new qx.ui.basic.Atom( txtTip3 );
	          var tt3 = new qx.ui.popup.ToolTip( txtTip3 );
	              tipIcon3.setToolTip( tt3 );
          }

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
	            btnCancel.addEventListener( "execute", function( e ) { this.getGroupPropWin().close(); ico1.setLabel( "" ); }, this );
	            btnCancel.set({ bottom : 10, right : 65 });

	        var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
	            btnOK.addEventListener( "execute", function( e ) {

	                    // Close the window and let the process continue in the background
	                    this.getGroupPropWin().close();

	                    // Create a pipe delimited string (javascript arrays translate to comma delimited which interferes with ldap syntax)
	                    // Create a pipe delimited string (javascript arrays translate to comma delimited which interferes with ldap syntax)
	                    var members = [];
	                    for( var i=0; i<this.getRowData().length; i++ )
	                    	 members.push( this.getRowData()[i][0])
	
	                    // Add the new group
	                    if( this.getGroupType() == "mailingList" )
	              	        this.__modifyGroup( "mailingList", txtGroupName.getValue(), members, txtDescription.getValue(), txtMail.getValue() );
	              	    else
	              	        this.__modifyGroup( "groupOfNames", txtGroupName.getValue(), members, txtDescription.getValue() ); 

	              	    // Rename the group if the name has been changed
	              	    if( this.getGroupObj().cn[0] !== txtGroupName.getValue() )
	              	        this.__renameGroup( txtGroupName.getValue() );

	              },this );
	              btnOK.set({ bottom : 10, right : 10 });

	        p1.add( cl1 );
	        cl1.add( lblGroupName, txtGroupName, tipIcon1 );
	        cl1.add( lblDescription, txtDescription, tipIcon2 );

            // Add additional form elements if this is a mailing list
	        if( this.getGroupType() == "mailingList" )
	            cl1.add( sep1, lblMail, txtMail, tipIcon3 );
	
	        this.getGroupPropWin().add( btnOK, btnCancel );
	        this.getGroupPropWin().add( ico1, tv1 );
		    this.getWireFrame()._addToWorkspace( this.getGroupPropWin() );

		    // Display copyright
            var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
                lblCopyright.set({ bottom: 15, left: 10 });
            this.getGroupPropWin().add( lblCopyright );
		    this.getGroupPropWin().open();

	        // Display the members if this group has member attributes
	        if( this.getGroupType() !== "posixGroup" ) {

		  	    for( var i=0; i<this.getGroupObj().member.count; i++ )
		             this.getRowData().push([ this.getGroupObj().member[i] ]);

			    this.getTableModel().setData( this.getRowData() );

			    // Bind a context menu to the table
	            this.__loadContextMenu( "AddRemoveMember", Array( this.getTable(), this.getRowData(), this.getGroupObj().dn ) );
	        }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

    __modifyGroup : function( type, name, members, description, mail ) {

          this.getWireFrame()._setStatusText( "Updating group attributes..."  );

     	  // Perform JSON RPC call to delete the object
          var callback = qx.lang.Function.bind( this.__refreshTableHandler, this );

          if( type == "mailingList" ) {
           
              // Send data to API encoded as JSON array of objects
              var json = '[' +
                              '{ "name" : "dn", "dn" : "' + this.getGroupObj().dn + '"},' +
                              '{ "name" : "type", "type" :"' + type + '"},' +
                              '{ "name" : "cn", "cn" :"' + name + '"},' +
                              '{ "name" : "members", "members" :' + this.getWireFrame().arrayToJson( members ) + '},' +
                              '{ "name" : "description", "description" :"' + description + '"},' +
                              '{ "name" : "mail", "mail" :"' + mail + '"}' +
                        ']';
			                           
              this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "GROUP", "update", json );
          }
          else {

              // Send data to API encoded as JSON array of objects
              var json = '[' +
                              '{ "name" : "dn", "dn" : "' + this.getGroupObj().dn + '"},' +
                              '{ "name" : "type", "type" :"' + type + '"},' +
                              '{ "name" : "cn", "cn" :"' + name + '"},' +
                              '{ "name" : "members", "members" :' + this.getWireFrame().arrayToJson( members ) + '},' +
                              '{ "name" : "description", "description" :"' + description + '"}' +
                        ']';
              this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "GROUP", "update", json );
          }
    },

    __renameGroup : function( name ) {

     	  this.getWireFrame()._setStatusText( "Renaming group..." );

     	  var newParent = this.getGroupObj().dn.replace( "cn=" + this.getGroupObj().cn[0] + ",", "" );
     	  
     	  // Send data to API encoded as JSON array of objects
          var json = '[' +
                           '{ "name" : "dn", "dn" : "' + this.getGroupObj().dn + '"},' +
                           '{ "name" : "cn", "cn" :"' + name + '"},' +
                           '{ "name" : "parentDn", "parentDn" :"' + newParent + '"}' +
                     ']';

          // Perform JSON RPC call to delete the object
          var callback = qx.lang.Function.bind( this.__refreshTableHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "GROUP", "rename", json );
   },

   __refreshTableHandler : function( result, ex, id ) {

     	  if( ex != null ) {

     	      this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC ERROR" );
     	      this.getWireFrame()._setStatusText( "RPC ERROR!" );
     	  }

     	  if( result ) {

              // Create the parent dn string to send to the callback method
              var pieces = this.getGroupObj().dn.split( "," )[0].split( "=" );
              var parentRdn = this.getGroupObj().dn.replace( pieces[0] + "=" + pieces[1] + ",", "" );

              // Invoke callback method to refresh the browser table
              this.getCallback()( parentRdn );

              // Update the status bar
     	  	  this.getWireFrame()._setStatusText( "Ready" );
     	  }
     },

    /**
     * Loads the external javascript context menu file for the group members right click event
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