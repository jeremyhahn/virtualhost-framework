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
qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.NewZone", {

  extend : vhf.Main,

  properties : {

  	    WireFrame   : { init : vhf.Main.getInstance() },
  	    NewZoneWin : { },
  	    ObjectDn    : { },
  	    Callback    : { }
  },

  construct : function( obj ) {

        this.setObjectDn( obj[0] );
        this.setCallback( obj[1] );

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

          // Set up the window
       this.setNewZoneWin( new qx.ui.window.Window( "New Zone", "icon/16/" + this.getWireFrame().getAppIcon() ) );
       this.getNewZoneWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
       });
	   this.getNewZoneWin().setSpace( 200, 400, 0, 450 );  // left // width // top // height
	   this.getWireFrame()._addToWorkspace( this.getNewZoneWin() );
	   this.getNewZoneWin().removeAll();

       // Window icon
       var ico1 = new qx.ui.basic.Atom( "Configure each of the zone SOA record properties below.", "icon/32/places/network-server.png");
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

       // -------------------------------------------------->
       // Text fields
       // -------------------------------------------------->
       // Zone Name
       var lblName = new qx.ui.basic.Atom( "Zone" );
           lblName.setHorizontalChildrenAlign( "right" );
           lblName.set({

             top: 30,
             left: 10
       });
       // Zone name text field
       var txtName = new qx.ui.form.TextField();
           txtName.set({

        	top: 30,
        	right: 30,
        	width: '60%'
       });

       // Zone name tool tip icon
       var txtTip1 = "This is the name of the zone.<br><b>Example: </b>vhf.local";
       var tipIcon1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
          tipIcon1.set({ top: 30, right: 10 });

       var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
       var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
           tipIcon1.setToolTip( tt1 );

	   // Serial label
       var lblSerial = new qx.ui.basic.Atom( "Serial" );
           lblSerial.setHorizontalChildrenAlign( "right" );
           lblSerial.set({

             top: 55,
             left: 10
       });
       // Serial text field
       var txtSerial = new qx.ui.form.Spinner( 0, 0, 1000000000000000 );
           txtSerial.set({

           	  top: 55,
           	  right: 30,
           	  width: '60%'          	  
       });

       // Serial tool tip icon
       var txtTip2 = "The serial number for this DNS zone.<br><b>Example: </b>200142101";
       var tipIcon2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
          tipIcon2.set({ top: 55, right: 10 });

       var tooltipBtn2 = new qx.ui.basic.Atom( txtTip2 );
       var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
           tipIcon2.setToolTip( tt2 );

       // Primary nameserver label
       var lblNameserver = new qx.ui.basic.Atom( "Primary Server" );
           lblNameserver.setHorizontalChildrenAlign( "right" );
           lblNameserver.set({

             top: 80,
             left: 10
       });
       // Primary nameserver text field
       var txtNameserver = new qx.ui.form.TextField();
           txtNameserver.set({

        	top: 80,
        	right: 30,
        	width: '60%'
       });

       // Primary nameserver tool tip icon
       var txtTip3 = "The primary name server for this zone.<br><b>Example: </b>ns.vhf.local";
       var tipIcon3 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
           tipIcon3.set({ top: 80, right: 10 });

       var tooltipBtn3 = new qx.ui.basic.Atom( txtTip3 );
       var tt3 = new qx.ui.popup.ToolTip( txtTip3 );
           tipIcon3.setToolTip( tt3 );
       
       // Responsible person label
       var lblResponsible = new qx.ui.basic.Atom( "Responsible Email" );
           lblResponsible.setHorizontalChildrenAlign( "right" );
           lblResponsible.set({

             top: 105,
             left: 10
       });
       // Responsible person text field
       var txtResponsible = new qx.ui.form.TextField();
           txtResponsible.set({

        	top: 105,
        	right: 30,
        	width: '60%'
       });

       // Responsbile person tool tip icon
       var txtTip4 = "The email address of the person responsible for this domain.<br><b>Example: </b>hostmaster@vhf.local";
       var tipIcon4 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
           tipIcon4.set({ top: 105, right: 10 });

       var tooltipBtn4 = new qx.ui.basic.Atom( txtTip4 );
       var tt4 = new qx.ui.popup.ToolTip( txtTip4 );
           tipIcon4.setToolTip( tt4 );

       // Refresh interval label
       var lblRefresh = new qx.ui.basic.Atom( "Refresh" );
           lblRefresh.setHorizontalChildrenAlign( "right" );
           lblRefresh.set({

             top: 130,
             left: 10
       });
       // Refresh interval text field
       var txtRefresh = new qx.ui.form.Spinner( 0, 0, 1000000000000000 );
           txtRefresh.set({

        	top: 130,
        	right: 30,
        	width: '60%'
       });

       // Refresh interval tool tip icon
       var txtTip5 = "The interval a slave server uses to update its zone data.<br><b>Example: </b>1800";
       var tipIcon5 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
           tipIcon5.set({ top: 130, right: 10 });

       var tooltipBtn5 = new qx.ui.basic.Atom( txtTip5 );
       var tt5 = new qx.ui.popup.ToolTip( txtTip5 );
           tipIcon5.setToolTip( tt5 );
       
       // Retry label
       var lblRetry = new qx.ui.basic.Atom( "Retry" );
           lblRetry.setHorizontalChildrenAlign( "right" );
           lblRetry.set({

             top: 155,
             left: 10
       });
       // Retry text field
       var txtRetry = new qx.ui.form.Spinner( 0, 0, 1000000000000000 );
           txtRetry.set({

        	top: 155,
        	right: 30,
        	width: '60%'
       });

       // Retry tool tip icon
       var txtTip6 = "The interval which the slave server will wait if a zone transfer fails before requesting another transfer.<br><b>Example: </b>3600";
       var tipIcon6 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
           tipIcon6.set({ top: 155, right: 10 });

       var tooltipBtn6 = new qx.ui.basic.Atom( txtTip6 );
       var tt6 = new qx.ui.popup.ToolTip( txtTip6 );
           tipIcon6.setToolTip( tt6 );
       
       // Expire label
       var lblExpire = new qx.ui.basic.Atom( "Expire" );
           lblExpire.setHorizontalChildrenAlign( "right" );
           lblExpire.set({

             top: 180,
             left: 10
       });
       // Expire text field
       var txtExpire = new qx.ui.form.Spinner( 0, 0, 1000000000000000 );
           txtExpire.set({

        	top: 180,
        	right: 30,
        	width: '60%'
       });

       // Expire tool tip icon
       var txtTip7 = "The amount of time before a name server considers its zone data stale.<br><b>Example: </b>86400";
       var tipIcon7 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
           tipIcon7.set({ top: 180, right: 10 });

       var tooltipBtn7 = new qx.ui.basic.Atom( txtTip7 );
       var tt7 = new qx.ui.popup.ToolTip( txtTip7 );
           tipIcon7.setToolTip( tt7 );

       // TTL label
       var lblTTL = new qx.ui.basic.Atom( "Time To Live" );
           lblTTL.setHorizontalChildrenAlign( "right" );
           lblTTL.set({

             top: 205,
             left: 10
       });

       // TTL text field
       var txtTTL = new qx.ui.form.Spinner( 0, 0, 1000000000000000 );
           txtTTL.set({

        	top: 205,
        	right: 30,
        	width: '60%'
       });

       // TTL tool tip icon
       var txtTip8 = "The interval which the record is cached on other name servers on the internet.<br><b>Example: </b>7200";
       var tipIcon8 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
           tipIcon8.set({ top: 205, right: 10 });

       var tooltipBtn8 = new qx.ui.basic.Atom( txtTip8 );
       var tt8 = new qx.ui.popup.ToolTip( txtTip8 );
           tipIcon8.setToolTip( tt8 );

       // BUTTONS
       var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
           btnOK.set({ bottom : 10, right : 10 });
           btnOK.addEventListener( "execute", function( e ) { 

                  // Update the status bar
                  this.getWireFrame()._setStatusText( "Adding new zone '" + txtName.getValue() + "'..." );

                  // Create distinguished name for new DNS object
                  var dn = "dc=" + txtName.getValue().split( "." )[0] + "," + this.getObjectDn(); 

                  // Format RPC request as JSON
                  var json = '[' +
                                    '{ "name" : "dn", "dn" : "' + dn + '" },' +
                                    '{ "name" : "associatedDomain", "associatedDomain" : "' + txtName.getValue() + '" },' +
                                    '{ "name" : "associatedName", "associatedName" : "' + this.getWireFrame().getUserAttribs().dn + '" },' +
                                    '{ "name" : "SOARecord", "SOARecord" : "' + txtNameserver.getValue() + ' ' + txtResponsible.getValue() + ' ' + txtSerial.getValue() + ' ' + txtRefresh.getValue() + ' ' + txtRetry.getValue() + ' ' + txtExpire.getValue() + ' ' + txtTTL.getValue() + '" }' +
                             ']';

     	          // Perform JSON RPC call to update the zone attribute
                  var callback = qx.lang.Function.bind( this.__addZoneHandler, this );
                  var newDn = "dc=" + txtName.getValue().split( "." )[0] + "," + this.getObjectDn();
                  this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "DNS", "addZone", json );

                  // Close the window
                  this.getNewZoneWin().close();
          }, this );

       // Add the UI elements/widgets to the layout
       cl1.add( lblName, txtName, tipIcon1 );
       cl1.add( lblSerial, txtSerial, tipIcon2 );
       cl1.add( lblNameserver, txtNameserver, tipIcon3 );
       cl1.add( lblResponsible, txtResponsible, tipIcon4 );
       cl1.add( lblRefresh, txtRefresh, tipIcon5 );
       cl1.add( lblRetry, txtRetry, tipIcon6 );
       cl1.add( lblExpire, txtExpire, tipIcon7 );
       cl1.add( lblTTL, txtTTL, tipIcon8 );

       // Add UI elements/widgets to the window
       this.getNewZoneWin().add( ico1, tv1, btnOK );

       // Display copyright
       var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
           lblCopyright.set({ bottom: 15, left: 10 });
       this.getNewZoneWin().add( lblCopyright );

       // Open the window
       this.getNewZoneWin().open();
    },

    __addZoneHandler : function( result, ex, id ) {

    	if( ex != null ) {

    		this.getWireFrame()._showAlertDialog( "error", ex, "RPC Error" );
    		this.getWireFrame()._setStatusText( "RPC Error!" );
    	}

    	if( result ) {

    		this.getNewZoneWin().close();
            this.getWireFrame()._setStatusText( "Ready" );
            this.getCallback()( this.getObjectDn() );
    	}
    },

    terminate : function() {
          this.base( arguments );
    }
  }
});