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

qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties.Account", {

  extend : vhf.Main,

  properties : {

  	    WireFrame      : { init : vhf.Main.getInstance() },
  	    AccountPropWin : { },
  	    AccountObj     : { },
  	    Callback       : { }
  },

  construct : function( obj ) {

      this.setAccountObj( obj[0] );
      this.setCallback( obj[1] );

           this.setAccountPropWin( new qx.ui.window.Window( "Account Properties", "icon/16/" + this.getWireFrame().getAppIcon() ) );
           this.getAccountPropWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
           });
    	   this.getAccountPropWin().setSpace( 200, 400, 0, 450 );  // left spacing // width // top spacing // height
    	   this.getAccountPropWin().removeAll();

          // Window icon
           var ico1 = new qx.ui.basic.Atom;
		   with( ico1 ) {

		         setTop ( 0 );
		         setLeft( 5 );
		         setIconPosition( "left" );
		         setLabel( "User Account Properties" );
		         setIcon( "icon/32/actions/identity.png" );
		   };
 
           // Set up the tab view
           var tv1 = new qx.ui.pageview.tabview.TabView;
	           tv1.set({ left: 4, top: 40, right: 4, bottom: 50 });

	       var t1 = new qx.ui.pageview.tabview.Button( "General", "icon/16/mimetypes/text-ascii.png" );
     	       t1.setChecked( true );

	       var t2 = new qx.ui.pageview.tabview.Button( "Address", "icon/16/places/user-home.png" );
	       var t3 = new qx.ui.pageview.tabview.Button( "Account", "icon/16/apps/applications-office.png" );
	       var t4 = new qx.ui.pageview.tabview.Button( "Quotas",  "icon/16/devices/drive-harddisk.png" );

	       tv1.getBar().add( t1, t2, t3, t4 );

	       var p1 = new qx.ui.pageview.tabview.Page( t1 );
	       var p2 = new qx.ui.pageview.tabview.Page( t2 );
	       var p3 = new qx.ui.pageview.tabview.Page( t3 );
	       var p4 = new qx.ui.pageview.tabview.Page( t4 );

	       tv1.getPane().add( p1, p2, p3, p4 );

           // Set up the layout for the General tab       
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
 	       // First name label
           var lblFirstName = new qx.ui.basic.Atom( "First Name" );
               lblFirstName.setHorizontalChildrenAlign( "right" );
               lblFirstName.set({

                 top: 30,
                 left: 10
          });
          // First name text field
          var txtFirstName = new qx.ui.form.TextField();
              txtFirstName.set({

            	top: 30,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().givenname == undefined) ? "" : this.getAccountObj().givenname[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtFirstName.addEventListener( "changeValue", function( e ) { this.__updateAccount( "givenName", txtFirstName.getValue() ); }, this );

          // First name tool tip icon
          var txtTip1 = "The first name of this user.<br><b>Example: </b>John";
          var tipIcon1 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon1.set({ top: 30, right: 10 });

          var tooltipBtn1 = new qx.ui.basic.Atom( txtTip1 );
          var tt1 = new qx.ui.popup.ToolTip( txtTip1 );
              tipIcon1.setToolTip( tt1 );

           //
	       // Last name label
	       //
           var lblLastName = new qx.ui.basic.Atom( "Last Name" );
               lblLastName.setHorizontalChildrenAlign( "right" );
               lblLastName.set({

                 top: 55,
                 left: 10
          });
          // Last name text field
          var txtLastName = new qx.ui.form.TextField();
              txtLastName.set({

            	top: 55,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().sn == undefined) ? "" : this.getAccountObj().sn[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtLastName.addEventListener( "changeValue", function( e ) { this.__updateAccount( "sn", txtLastName.getValue() ); }, this );

          // Last name tool tip icon
          var txtTip2 = "The last name of this user.<br><b>Example: </b>Doe";
          var tipIcon2 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon2.set({ top: 55, right: 10 });

          var tooltipBtn2 = new qx.ui.basic.Atom( txtTip2 );
          var tt2 = new qx.ui.popup.ToolTip( txtTip2 );
              tipIcon2.setToolTip( tt2 );

          //
	      // Display name text field
	      //
          var lblDisplayName = new qx.ui.basic.Atom( "Display Name" );
              lblDisplayName.setHorizontalChildrenAlign( "right" );
              lblDisplayName.set({

                 top: 80,
                 left: 10
          });

          // Display Name text field
          var txtDisplayName = new qx.ui.form.TextField();
              txtDisplayName.set({

            	top: 80,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().displayname == undefined) ? "" : this.getAccountObj().displayname[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtDisplayName.addEventListener( "changeValue", function( e ) { this.__updateAccount( "displayName", txtDisplayName.getValue() ); }, this );

          // Display name text field
          var txtTip3 = "The display name for this user.<br><b>Example: </b>J-Rock";
          var tipIcon3 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon3.set({ top: 80, right: 10 });

          var tooltipBtn3 = new qx.ui.basic.Atom( txtTip3 );
          var tt3 = new qx.ui.popup.ToolTip( txtTip3 );
              tipIcon3.setToolTip( tt3 );

           //
	       // Description label
	       //
           var lblDescription = new qx.ui.basic.Atom( "Description" );
               lblDescription.setHorizontalChildrenAlign( "right" );
               lblDescription.set({

                 top: 105,
                 left: 10
          });
          // Description field
          var txtDescription = new qx.ui.form.TextField();
              txtDescription.set({

            	top: 105,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().description == undefined) ? "" : this.getAccountObj().description[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtDescription.addEventListener( "changeValue", function( e ) { this.__updateAccount( "description", txtDescription.getValue() ); }, this );

          // Description tool tip icon
          var txtTip4 = "The description of this user.<br><b>Example: </b>Virtual Host Framework User";
          var tipIcon4 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon4.set({ top: 105, right: 10 });

          var tooltipBtn4 = new qx.ui.basic.Atom( txtTip4 );
          var tt4 = new qx.ui.popup.ToolTip( txtTip4 );
              tipIcon4.setToolTip( tt4 );
          
           //
	       // Title label
	       //
           var lblTitle = new qx.ui.basic.Atom( "Title" );
               lblTitle.setHorizontalChildrenAlign( "right" );
               lblTitle.set({

                 top: 130,
                 left: 10
          });
          // Title field
          var txtTitle = new qx.ui.form.TextField();
              txtTitle.set({

            	top: 130,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().title == undefined) ? "" : this.getAccountObj().title[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtTitle.addEventListener( "changeValue", function( e ) { this.__updateAccount( "title", txtTitle.getValue() ); }, this );

          // Title tool tip icon
          var txtTip5 = "The title of this user.<br><b>Example: </b>VP, Enterprise Development";
          var tipIcon5 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon5.set({ top: 130, right: 10 });

          var tooltipBtn5 = new qx.ui.basic.Atom( txtTip5 );
          var tt5 = new qx.ui.popup.ToolTip( txtTip5 );
              tipIcon5.setToolTip( tt5 );

           //
	       // Office label
	       //
           var lblOffice = new qx.ui.basic.Atom( "Office" );
               lblOffice.setHorizontalChildrenAlign( "right" );
               lblOffice.set({

                 top: 155,
                 left: 10
          });
          // Office field
          var txtOffice = new qx.ui.form.TextField();
              txtOffice.set({

            	top: 155,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().physicaldeliveryofficename == undefined) ? "" : this.getAccountObj().physicaldeliveryofficename[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtOffice.addEventListener( "changeValue", function( e ) { this.__updateAccount( "physicalDeliveryOfficeName", txtOffice.getValue() ); }, this );

          // Office tool tip icon
          var txtTip6 = "The office this user is located within the organization.<br><b>Example: </b>Miami";
          var tipIcon6 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon6.set({ top: 155, right: 10 });

          var tooltipBtn6 = new qx.ui.basic.Atom( txtTip6 );
          var tt6 = new qx.ui.popup.ToolTip( txtTip6 );
              tipIcon6.setToolTip( tt6 );

          //
          // DIVIDER
          //
          var sep1 = new qx.ui.basic.Label( "<hr>", null, "html" );
  		      sep1.set({

		      top: 185,
			  left: '5%',
			  width: '90%'
		  });
		  sep1.setWrap( true );
		  
		   //
	       // Telephone label
	       //
           var lblPhone = new qx.ui.basic.Atom( "Telephone" );
               lblPhone.setHorizontalChildrenAlign( "right" );
               lblPhone.set({

                 top: 210,
                 left: 10
          });
          // Telephone field
          var txtPhone = new qx.ui.form.TextField();
              txtPhone.set({

            	top: 210,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().telephonenumber == undefined) ? "" : this.getAccountObj().telephonenumber[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtPhone.addEventListener( "changeValue", function( e ) { this.__updateAccount( "telephonenumber", txtPhone.getValue() ); }, this );

          // Telephone tool tip icon
          var txtTip7 = "The telephone number of the user.<br><b>Example: </b>1+ 123-456-7890";
          var tipIcon7 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon7.set({ top: 210, right: 10 });

          var tooltipBtn7 = new qx.ui.basic.Atom( txtTip7 );
          var tt7 = new qx.ui.popup.ToolTip( txtTip7 );
              tipIcon7.setToolTip( tt7 );


           //
	       // Email label
	       //
           var lblEmail = new qx.ui.basic.Atom( "Email" );
               lblEmail.setHorizontalChildrenAlign( "right" );
               lblEmail.set({

                 top: 235,
                 left: 10
          });
          // Email field
          var txtEmail = new qx.ui.form.TextField();
              txtEmail.set({

            	top: 235,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().mail == undefined) ? "" : this.getAccountObj().mail[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtEmail.addEventListener( "changeValue", function( e ) { this.__updateAccount( "mail", txtEmail.getValue() ); }, this );

          // Email tool tip icon
          var txtTip8 = "The email address for this user.<br><b>Example: </b>john.doe@vhf.local";
          var tipIcon8 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon8.set({ top: 235, right: 10 });

          var tooltipBtn8 = new qx.ui.basic.Atom( txtTip8 );
          var tt8 = new qx.ui.popup.ToolTip( txtTip8 );
              tipIcon8.setToolTip( tt8 );


         /*
          * ADDRESS TAB
          */
          // Set up the layout for the General tab       
           var cl2 = new qx.ui.layout.CanvasLayout;

			    cl2.setTop( 0 );
			    cl2.setLeft( 0 );
			    cl2.setWidth( "100%" );
			    cl2.setHeight( "100%" );
			    cl2.setBackgroundColor( "white" );
			    cl2.setPaddingLeft( 0 );

 	      p2.add( cl2 );

          // Street address label
           var lblStreetAddress = new qx.ui.basic.Atom( "Street" );
               lblStreetAddress.setHorizontalChildrenAlign( "right" );
               lblStreetAddress.set({

                 top: 30,
                 left: 10
          });
          // Street address text field
          var txtStreetAddress = new qx.ui.form.TextField();
              txtStreetAddress.set({

            	top: 30,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().street == undefined) ? "" : this.getAccountObj().street[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtStreetAddress.addEventListener( "changeValue", function( e ) { this.__updateAccount( "street", txtStreetAddress.getValue() ); }, this );

          // Street address tool tip icon
          var txtTip9 = "The street address of this user.<br><b>Example: </b>123 Anywhere Street - Suite 100";
          var tipIcon9 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon9.set({ top: 30, right: 10 });

          var tooltipBtn9 = new qx.ui.basic.Atom( txtTip9 );
          var tt9 = new qx.ui.popup.ToolTip( txtTip9 );
              tipIcon9.setToolTip( tt9 );

          // PO BOX
          var lblPoBox = new qx.ui.basic.Atom( "PO Box" );
              lblPoBox.setHorizontalChildrenAlign( "right" );
              lblPoBox.set({

                 top: 55,
                 left: 10
          });
          // PO Box text field
          var txtPoBox = new qx.ui.form.TextField();
              txtPoBox.set({

            	top: 55,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().postofficebox == undefined) ? "" : this.getAccountObj().postofficebox[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtPoBox.addEventListener( "changeValue", function( e ) { this.__updateAccount( "postOfficeBox", txtPoBox.getValue() ); }, this );

          // PO Boxtool tip icon
          var txtTip10 = "The PO Box of this user.<br><b>Example: </b>12345";
          var tipIcon10 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon10.set({ top: 55, right: 10 });

          var tooltipBtn10 = new qx.ui.basic.Atom( txtTip10 );
          var tt10 = new qx.ui.popup.ToolTip( txtTip10 );
              tipIcon10.setToolTip( tt10 );
              
          // City label
          var lblCity = new qx.ui.basic.Atom( "City" );
              lblCity.setHorizontalChildrenAlign( "right" );
              lblCity.set({

                 top: 80,
                 left: 10
          });

          // City text field
          var txtCity = new qx.ui.form.TextField();
              txtCity.set({

            	top: 80,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().l == undefined) ? "" : this.getAccountObj().l[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtCity.addEventListener( "changeValue", function( e ) { this.__updateAccount( "l", txtCity.getValue() ); }, this );

          // City text field
          var txtTip11 = "The city where this user is located.<br><b>Example: </b>Fort Lauderdale";
          var tipIcon11 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon11.set({ top: 80, right: 10 });

          var tooltipBtn11 = new qx.ui.basic.Atom( txtTip11 );
          var tt11 = new qx.ui.popup.ToolTip( txtTip11 );
              tipIcon11.setToolTip( tt11 );

          // State/Province label
          var lblProvince = new qx.ui.basic.Atom( "State/Province" );
              lblProvince.setHorizontalChildrenAlign( "right" );
              lblProvince.set({

                 top: 105,
                 left: 10
          });
          // State/Province text field
          var txtProvince = new qx.ui.form.TextField();
              txtProvince.set({

            	top: 105,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().st == undefined) ? "" : this.getAccountObj().st[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtProvince.addEventListener( "changeValue", function( e ) { this.__updateAccount( "st", txtProvince.getValue() ); }, this );

          // State/Province tool tip icon
          var txtTip12 = "The state/province where this user is located.<br><b>Example: </b>Florida";
          var tipIcon12 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon12.set({ top: 105, right: 10 });

          var tooltipBtn12 = new qx.ui.basic.Atom( txtTip12 );
          var tt12 = new qx.ui.popup.ToolTip( txtTip12 );
              tipIcon12.setToolTip( tt12 );

          // Zip/Postal code label
          var lblZip = new qx.ui.basic.Atom( "Zip/Postal Code" );
               lblZip.setHorizontalChildrenAlign( "right" );
               lblZip.set({

                 top: 130,
                 left: 10
          });
          // Zip/Postal code text field
          var txtZip = new qx.ui.form.TextField();
              txtZip.set({

            	top: 130,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().postalcode == undefined) ? "" : this.getAccountObj().postalcode[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtZip.addEventListener( "changeValue", function( e ) { this.__updateAccount( "postalcode", txtZip.getValue() ); }, this );

          // Zip/Postal code tool tip icon
          var txtTip13 = "The zip/postal code where this user is located.<br><b>Example: </b>33309";
          var tipIcon13 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon13.set({ top: 130, right: 10 });

          var tooltipBtn13 = new qx.ui.basic.Atom( txtTip13 );
          var tt13 = new qx.ui.popup.ToolTip( txtTip13 );
              tipIcon13.setToolTip( tt13 );

          // Country/Region label
          var lblCountry = new qx.ui.basic.Atom( "Country/Region" );
              lblCountry.setHorizontalChildrenAlign( "right" );
              lblCountry.set({

                 top: 155,
                 left: 10
          });
          // Country/Region text field
          var txtCountry = new qx.ui.form.TextField();
              txtCountry.set({

            	top: 155,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().c == undefined) ? "" : this.getAccountObj().c[0]
          });// Add event listener to update the attribute when the cell is updated
          txtCountry.addEventListener( "changeValue", function( e ) { this.__updateAccount( "countryName", txtCountry.getValue() ); }, this );

          // Country/Region code tool tip icon
          var txtTip14 = "The two character abbreviation for the country/region where this user is located.<br><b>Example: </b>US";
          var tipIcon14 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon14.set({ top: 155, right: 10 });

          var tooltipBtn14 = new qx.ui.basic.Atom( txtTip14 );
          var tt14 = new qx.ui.popup.ToolTip( txtTip14 );
              tipIcon14.setToolTip( tt14 );

          /*
           * Account TAB
           */
           // Set up the layout for the Account tab       
           var cl3 = new qx.ui.layout.CanvasLayout;

			   cl3.setTop( 0 );
			   cl3.setLeft( 0 );
			   cl3.setWidth( "100%" );
			   cl3.setHeight( "100%" );
			   cl3.setBackgroundColor( "white" );
			   cl3.setPaddingLeft( 0 );

 	      p3.add( cl3 );

          // Logon name label
          var lblLogonName = new qx.ui.basic.Atom( "Logon Name" );
              lblLogonName.setHorizontalChildrenAlign( "right" );
              lblLogonName.set({

                 top: 30,
                 left: 10
          });

          // Logon name text field
          var txtLogonName = new qx.ui.form.TextField();
              txtLogonName.set({

            	top: 30,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().uid == undefined) ? "" : this.getAccountObj().uid[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtLogonName.addEventListener( "changeValue", function( e ) { this.__updateAccount( "uid", txtLogonName.getValue() ); }, this );

          // Logon name tool tip icon
          var txtTip15 = "The logon/username for this user.<br><b>Example: </b>testuser01";
          var tipIcon15 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon15.set({ top: 30, right: 10 });

          var tooltipBtn15 = new qx.ui.basic.Atom( txtTip15 );
          var tt15 = new qx.ui.popup.ToolTip( txtTip15 );
              tipIcon15.setToolTip( tt15 );

          // Home directory label
          var lblHomeDir = new qx.ui.basic.Atom( "Home Directory" );
              lblHomeDir.setHorizontalChildrenAlign( "right" );
              lblHomeDir.set({

                 top: 55,
                 left: 10
          });

          // Home directory text field
          var txtHomeDir = new qx.ui.form.TextField();
              txtHomeDir.set({

            	top: 55,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().homedirectory == undefined) ? "" : this.getAccountObj().homedirectory[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtHomeDir.addEventListener( "changeValue", function( e ) { this.__updateAccount( "homeDirectory", txtHomeDir.getValue() ); }, this );

          // Home directory tool tip icon
          var txtTip16 = "The full system path to the home directory for this user.<br><b>Example: </b>/home/testuser01";
          var tipIcon16 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon16.set({ top: 55, right: 10 });

          var tooltipBtn16 = new qx.ui.basic.Atom( txtTip16 );
          var tt16 = new qx.ui.popup.ToolTip( txtTip16 );
              tipIcon16.setToolTip( tt16 );
          
          // Account enabled label
          var lblEnabled = new qx.ui.basic.Atom( "Active" );
              lblEnabled.setHorizontalChildrenAlign( "right" );
              lblEnabled.set({

                 top: 80,
                 left: 10
          });

          // Account enabled checkbox
          var chkEnabled = new qx.ui.form.CheckBox();
              chkEnabled.set({

            	top: 80,
            	right: '63%'
          });
          if( this.getAccountObj().accountstatus == undefined || this.getAccountObj().accountstatus[0] != "active" )
              chkEnabled.setChecked( false );
          else
              chkEnabled.setChecked( true );
          // Add event listener to update the attribute when the cell is updated
          chkEnabled.addEventListener( "changeChecked", function( e ) {
          	
          	  (chkEnabled.isChecked()) ? this.__updateAccount( "accountStatus", "active" ) : this.__updateAccount( "accountStatus", "disabled" );
          	  
           }, this );

          // Account enabled tool tip icon
          var txtTip17 = "Check to put the account in an active state and uncheck to disable the account.";
          var tipIcon17 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon17.set({ top: 80, right: 10 });

          var tooltipBtn17 = new qx.ui.basic.Atom( txtTip17 );
          var tt17 = new qx.ui.popup.ToolTip( txtTip17 );
              tipIcon17.setToolTip( tt17 );

          // Account role
          var lblRole = new qx.ui.basic.Atom( "Account  Role" );
              lblRole.setHorizontalChildrenAlign( "right" );
              lblRole.set({

                 top: 105,
                 left: 10
          });

          // Account role text field
          var txtRole = new qx.ui.form.TextField();
              txtRole.set({

            	top: 105,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().accountrole == undefined) ? "" : this.getAccountObj().accountrole[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtRole.addEventListener( "changeValue", function( e ) { this.__updateAccount( "accountRole", txtRole.getValue() ); }, this );

          // Account role tool tip icon
          var txtTip18 = "This users role within the virtual host framework application.<br><b>Example: </b>user";
          var tipIcon18 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon18.set({ top: 105, right: 10 });

          var tooltipBtn18 = new qx.ui.basic.Atom( txtTip18 );
          var tt18 = new qx.ui.popup.ToolTip( txtTip18 );
              tipIcon18.setToolTip( tt18 );

          // Login shell label
          var lblShell = new qx.ui.basic.Atom( "Login Shell" );
              lblShell.setHorizontalChildrenAlign( "right" );
              lblShell.set({

                 top: 130,
                 left: 10
          });

          // Login shell text field
          var txtShell = new qx.ui.form.TextField();
              txtShell.set({

            	top: 130,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().loginshell == undefined) ? "" : this.getAccountObj().loginshell[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtShell.addEventListener( "changeValue", function( e ) { this.__updateAccount( "loginshell", txtShell.getValue() ); }, this );

          // Login shell tool tip icon
          var txtTip19 = "The shell assigned to this user (required for maildir access).<br><b>Example: </b>/bin/bash";
          var tipIcon19 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon19.set({ top: 130, right: 10 });

          var tooltipBtn19 = new qx.ui.basic.Atom( txtTip19 );
          var tt19 = new qx.ui.popup.ToolTip( txtTip19 );
              tipIcon19.setToolTip( tt19 );

          /*
           * QUOTA TAB
           */
           // Set up the layout for the Quota tab       
           var cl4 = new qx.ui.layout.CanvasLayout;

			   cl4.setTop( 0 );
			   cl4.setLeft( 0 );
			   cl4.setWidth( "100%" );
			   cl4.setHeight( "100%" );
			   cl4.setBackgroundColor( "white" );
			   cl4.setPaddingLeft( 0 );

 	      p4.add( cl4 );

          // Web quota label
          var lblWebQuota = new qx.ui.basic.Atom( "Website(s)" );
              lblWebQuota.setHorizontalChildrenAlign( "right" );
              lblWebQuota.set({

                 top: 30,
                 left: 10
          });

          // Web quota spinner
          var spnr1 = new qx.ui.form.Spinner( 0, 0, 1000000 );
              spnr1.set({
              	  
              	  top: 30,
              	  right: 30,
              	  width: '60%',
              	  value:(this.getAccountObj().webquota == undefined) ? "" : this.getAccountObj().webquota[0]              	  
          });

          // Web quota spinner tool tip icon
          var txtTip20 = "The maximum number of websites/domains this user is allowed to host.<br><b>Example: </b>10";
          var tipIcon20 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon20.set({ top: 30, right: 10 });

          var tooltipBtn20 = new qx.ui.basic.Atom( txtTip20 );
          var tt20 = new qx.ui.popup.ToolTip( txtTip20 );
              tipIcon20.setToolTip( tt20 );

          // FTP quota label
          var lblFtpQuota = new qx.ui.basic.Atom( "FTP Quota" );
              lblFtpQuota.setHorizontalChildrenAlign( "right" );
              lblFtpQuota.set({

                 top: 55,
                 left: 10
          });

          // FTP quota text field
          var txtFtpQuota = new qx.ui.form.TextField();
              txtFtpQuota.set({

            	top: 55,
            	right: 30,
            	width: '60%',
            	value: (this.getAccountObj().ftpquota == undefined) ? "" : this.getAccountObj().ftpquota[0]
          });
          // Add event listener to update the attribute when the cell is updated
          txtFtpQuota.addEventListener( "changeValue", function( e ) { this.__updateAccount( "ftpQuota", txtFtpQuota.getValue() ); }, this );

          // FTP quota spinner tool tip icon
          var txtTip21 = "The FTP quota policy for this user in the following format:<br>per_session,limit_type,bytes_in_avail,bytes_out_avail,bytes_xfer_avail,files_in_avail,files_out_avail,files_xfer_avail<br><b>Example: </b>false,hard,100,100,100,100,100,100";
          var tipIcon21 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon21.set({ top: 55, right: 10 });

          var tooltipBtn21 = new qx.ui.basic.Atom( txtTip21 );
          var tt21 = new qx.ui.popup.ToolTip( txtTip21 );
              tipIcon21.setToolTip( tt21 );
          
          // DNS quota label
          var lblDnsQuota = new qx.ui.basic.Atom( "DNS Domains" );
              lblDnsQuota.setHorizontalChildrenAlign( "right" );
              lblDnsQuota.set({

                 top: 80,
                 left: 10
          });

          // DNS quota spinner
          var spnr2 = new qx.ui.form.Spinner( 0, 0, 1000000 );
              spnr2.set({
              	  
              	  top: 80,
              	  right: 30,
              	  width: '60%',
              	  value:(this.getAccountObj().dnsquota == undefined) ? "" : this.getAccountObj().dnsquota[0]              	  
          });
          
          // DNS quota spinner tool tip icon
          var txtTip22 = "The maximum number of DNS domains this user is allowed to host.<br><b>Example: </b>10";
          var tipIcon22 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon22.set({ top: 80, right: 10 });

          var tooltipBtn22 = new qx.ui.basic.Atom( txtTip22 );
          var tt22 = new qx.ui.popup.ToolTip( txtTip22 );
              tipIcon22.setToolTip( tt22 );
          
          // Dynamic dns enabled label
          var lblDDNS = new qx.ui.basic.Atom( "Dynamic DNS" );
              lblDDNS.setHorizontalChildrenAlign( "right" );
              lblDDNS.set({

                 top: 105,
                 left: 10
          });

          // Dynamic dns enabled checkbox
          var chkDDNS = new qx.ui.form.CheckBox( "Enabled" );
              chkDDNS.set({

            	top: 105,
            	right: '50%'
          });
          if( this.getAccountObj().dnsdynamicupdates == undefined || this.getAccountObj().dnsdynamicupdates[0] != "active" )
              chkDDNS.setChecked( false );
          else
              chkDDNS.setChecked( true );
          // Add event listener to update the attribute when the cell is updated
          chkDDNS.addEventListener( "changeChecked", function( e ) {
          	
          	  (chkDDNS.isChecked()) ? this.__updateAccount( "dnsdynamicupdates", "active" ) : this.__updateAccount( "dnsdynamicupdates", "disabled" );
          	  
           }, this );

          // Dyanmic dns enabled tool tip icon
          var txtTip23 = "Check to enable dynamic dns updates via virtual host framework API and uncheck to disable dynamic dns ability.";
          var tipIcon23 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon23.set({ top: 105, right: 10 });

          var tooltipBtn23 = new qx.ui.basic.Atom( txtTip23 );
          var tt23 = new qx.ui.popup.ToolTip( txtTip23 );
              tipIcon23.setToolTip( tt23 );
          
          
          // Database quota label
          var lblDatabaseQuota = new qx.ui.basic.Atom( "Database(s)" );
              lblDatabaseQuota.setHorizontalChildrenAlign( "right" );
              lblDatabaseQuota.set({

                 top: 130,
                 left: 10
          });

          // Database quota spinner
          var spnr3 = new qx.ui.form.Spinner( 0, 0, 1000000 );
              spnr3.set({
              	  
              	  top: 130,
              	  right: 30,
              	  width: '60%',
              	  value:(this.getAccountObj().databasequota == undefined) ? "" : this.getAccountObj().databasequota[0]              	  
          });

          // Database quota spinner tool tip icon
          var txtTip24 = "The maximum number of databases this user is allowed to create.<br><b>Example: </b>10";
          var tipIcon24 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon24.set({ top: 130, right: 10 });

          var tooltipBtn24 = new qx.ui.basic.Atom( txtTip24 );
          var tt24 = new qx.ui.popup.ToolTip( txtTip24 );
              tipIcon24.setToolTip( tt24 );

          // Mailboxes per domain quota label
          var lblMailboxQuota = new qx.ui.basic.Atom( "Mailboxes" );
              lblMailboxQuota.setHorizontalChildrenAlign( "right" );
              lblMailboxQuota.set({

                 top: 155,
                 left: 10
          });

          // Mailboxes per domain quota spinner
          var spnr4 = new qx.ui.form.Spinner( 0, 0, 1000000 );
              spnr4.set({

              	  top: 155,
              	  right: 30,
              	  width: '60%',
              	  value:(this.getAccountObj().mailboxquota == undefined) ? "" : this.getAccountObj().mailboxquota[0]              	  
          });

          // Mailboxes per domain quota spinner tool tip icon
          var txtTip25 = "The maximum number of mailboxes per domain this user is allowed to create.<br><b>Example: </b>10";
          var tipIcon25 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon25.set({ top: 155, right: 10 });

          var tooltipBtn25 = new qx.ui.basic.Atom( txtTip25 );
          var tt25 = new qx.ui.popup.ToolTip( txtTip25 );
              tipIcon25.setToolTip( tt25 );

          // Mailbox size quota label
          var lblMailboxSize = new qx.ui.basic.Atom( "Mailbox size" );
              lblMailboxSize.setHorizontalChildrenAlign( "right" );
              lblMailboxSize.set({

                 top: 180,
                 left: 10
          });

          // Mailbox size quota spinner
          var spnr5 = new qx.ui.form.Spinner( 0, 0, 107374182400 ); // 100 GB
              spnr5.set({
              	  
              	  top: 180,
              	  right: 30,
              	  width: '60%',
              	  value:(this.getAccountObj().mailquota == undefined) ? "" : this.getAccountObj().mailquota[0].replace( "S", "" )              	  
          });

          // Mailbox size quota pinner tool tip icon
          var txtTip26 = "The maximum amount of disk space each mailbox is allowed to use (in bytes).<br><b>Example: </b>20000000 (20mb)";
          var tipIcon26 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon26.set({ top: 180, right: 10 });

          var tooltipBtn26 = new qx.ui.basic.Atom( txtTip26 );
          var tt26 = new qx.ui.popup.ToolTip( txtTip26 );
              tipIcon26.setToolTip( tt26 );
          
           // Mailing list quota label
          var lblMailingList = new qx.ui.basic.Atom( "Mailing List(s)" );
              lblMailingList.setHorizontalChildrenAlign( "right" );
              lblMailingList.set({

                 top: 205,
                 left: 10
          });

          // Mailing list size quota spinner
          var spnr6 = new qx.ui.form.Spinner( 0, 0, 1000000 );
              spnr6.set({
              	  
              	  top: 205,
              	  right: 30,
              	  width: '60%',
              	  value:(this.getAccountObj().mailinglistquota == undefined) ? "" : this.getAccountObj().mailinglistquota[0]              	  
          });

          // Mailing list quota spinner tool tip icon
          var txtTip27 = "The maximum amount of mailing lists this user is allowed to create.<br><b>Example: </b>5";
          var tipIcon27 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
              tipIcon27.set({ top: 205, right: 10 });

          var tooltipBtn27 = new qx.ui.basic.Atom( txtTip27 );
          var tt27 = new qx.ui.popup.ToolTip( txtTip27 );
              tipIcon27.setToolTip( tt27 );


          // BUTTONS
          var btnCancel = new qx.ui.form.Button( "Cancel", "icon/16/actions/dialog-cancel.png" );
              btnCancel.addEventListener( "execute", function( e ) { this.getAccountPropWin().close(); ico1.setLabel( "" ); }, this );
              btnCancel.set({ bottom : 10, right : 65 });

          var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
              btnOK.addEventListener( "execute", function( e ) { 

                 // Manually set spinner values to prevent a user initiated DoS on the web server
                 this.__updateAccount( "webQuota", spnr1.getValue() );
                 this.__updateAccount( "dnsQuota", spnr2.getValue() );
                 this.__updateAccount( "databaseQuota", spnr3.getValue() );
                 this.__updateAccount( "mailboxQuota", spnr4.getValue() );
                 this.__updateAccount( "mailQuota", spnr5.getValue() + "S" );
                 this.__updateAccount( "mailingListQuota", spnr6.getValue() );

              	// Invoke callback method to refresh the table
              	var parentContainer = this.getAccountObj().dn.replace( "cn=" + this.getAccountObj().cn[0] + ",", "" );
              	this.getCallback()( parentContainer );
              	this.getAccountPropWin().close();
          }, this );
          btnOK.set({ bottom : 10, right : 10 });

		  cl1.add( sep1 );

          cl1.add( lblFirstName, txtFirstName,tipIcon1 );
          cl1.add( lblLastName, txtLastName, tipIcon2 );
          cl1.add( lblDisplayName, txtDisplayName, tipIcon3 );
          cl1.add( lblDescription, txtDescription, tipIcon4 );
          cl1.add( lblTitle, txtTitle, tipIcon5 );
          cl1.add( lblOffice, txtOffice, tipIcon6 );
          cl1.add( lblPhone, txtPhone, tipIcon7 );
          cl1.add( lblEmail, txtEmail, tipIcon8 );

          p2.add( cl2 );
          cl2.add( lblStreetAddress, txtStreetAddress, tipIcon9 );
          cl2.add( lblPoBox, txtPoBox, tipIcon10 );
          cl2.add( lblCity, txtCity, tipIcon11 );
          cl2.add( lblProvince, txtProvince, tipIcon12 );
          cl2.add( lblZip, txtZip, tipIcon13 );
          cl2.add( lblCountry, txtCountry, tipIcon14 );
          
          p3.add( cl3 );
          cl3.add( lblLogonName, txtLogonName, tipIcon15 );
          cl3.add( lblHomeDir, txtHomeDir, tipIcon16 );
          cl3.add( lblEnabled, chkEnabled, tipIcon17 );
          cl3.add( lblRole, txtRole, tipIcon18 );
          cl3.add( lblShell, txtShell, tipIcon19 );

          p4.add( cl4 );
          cl4.add( lblWebQuota, spnr1, tipIcon20 );
          cl4.add( lblFtpQuota, txtFtpQuota, tipIcon21 );
          cl4.add( lblDnsQuota, spnr2, tipIcon22 );
          cl4.add( lblDDNS, chkDDNS, tipIcon23 );
          cl4.add( lblDatabaseQuota, spnr3, tipIcon24 );
          cl4.add( lblMailboxQuota, spnr4, tipIcon25 );
          cl4.add( lblMailboxSize, spnr5, tipIcon26 );
          cl4.add( lblMailingList, spnr6, tipIcon27 );

          // Display copyright
          var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
              lblCopyright.set({ bottom: 15, left: 10 });
          this.getAccountPropWin().add( lblCopyright );

          // Add the rest of the window elements and open the window
          this.getAccountPropWin().add( ico1, tv1, btnOK, btnCancel );
	      this.getWireFrame()._addToWorkspace( this.getAccountPropWin() );
		  this.getAccountPropWin().open();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

    /**
     * Updates an account object's attributes according to the form values
     * 
     * @type member
     * @param name {String} The name of the attribute to update (ex: displayName)
     * @param value {String} The value of the attribute (ex: New Name)
     */
     __updateAccount : function( name, value ) {

          this.getWireFrame()._setStatusText( "Updating account attribute " + name + "..."  );

     	  // Perform JSON RPC call to delete the object
          var callback = qx.lang.Function.bind( this.__updateAccountHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API",  "invoke", "LDAP", "updateAttrib", this.getAccountObj().dn, name, value );
     },

    /**
     * Handles the JSON RPC reply to from the server
     * 
     * @type member
     * @param array result Boolean true if the update was successful
     * @param object ex JSON RPC exception handler
     * @param integer id The id of the JSON RPC transport call
     */
     __updateAccountHandler: function( result, ex, id ) {

     	  if( ex != null ) {

     	     this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error"  );
     	     this.getWireFrame()._setStatusText( "RPC Error!"  );
     	  }

          if( result )         	
          	  this.getWireFrame()._setStatusText( "Ready"  );
    },
     

    terminate : function() {
      this.base(arguments);
    }
  }
});