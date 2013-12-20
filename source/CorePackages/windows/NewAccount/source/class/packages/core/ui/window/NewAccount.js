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

qx.Class.define( "packages.core.ui.window.NewAccount", {

  extend : vhf.Main,

  properties : {

  	    WireFrame               : { init : vhf.Main.getInstance() },
  	    NewAccountWin           : { },
  	    isBillingInstalled      : { init : false },
  	    isProvisioningInstalled : { init : false },
  	    TabView                 : { },
  	    AccountLayout           : { },
  	    FirstName               : { },
  	    LastName                : { },
  	    DisplayName             : { },
  	    Description             : { },
  	    Title                   : { },
  	    Office                  : { },
  	    TelephoneNumber         : { },
  	    Mail                    : { },
  	    Street                  : { },
  	    PoBox                   : { },
  	    City                    : { },
  	    State                   : { },
  	    Zip                     : { },
  	    Country                 : { },
  	    LogonName               : { },
  	    Services                : { init : new qx.ui.form.ComboBox() },
  	    CCName                  : { },
  	    CCNumber                : { },
  	    CCExpiryMonth           : { },
  	    CCExpiryYear            : { },
  	    CCType                  : { },
  	    CCV						: { },
  	    CCTypes                 : { },
  	    JSON                    : { }
  },

  construct : function() {

           // Set up the window
           this.setNewAccountWin( new qx.ui.window.Window( "New User Account", "icon/16/" + this.getWireFrame().getAppIcon() ) );
           this.getNewAccountWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
           });
    	   this.getNewAccountWin().setSpace( 200, 400, 0, 450 );  // left spacing // width // top spacing // height
    	   this.getNewAccountWin().removeAll();

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
           this.setTabView( new qx.ui.pageview.tabview.TabView );
           this.getTabView().set({ left: 4, top: 40, right: 4, bottom: 50 });

	       var t1 = new qx.ui.pageview.tabview.Button( "General", "icon/16/mimetypes/text-ascii.png" );
     	       t1.setChecked( true );

	       var t2 = new qx.ui.pageview.tabview.Button( "Address", "icon/16/places/user-home.png" );
	       this.getTabView().getBar().add( t1, t2 );

	       var p1 = new qx.ui.pageview.tabview.Page( t1 );
	       var p2 = new qx.ui.pageview.tabview.Page( t2 );

	       this.getTabView().getPane().add( p1, p2 );

           // Set up the layout for the General tab
           var cl1 = new qx.ui.layout.CanvasLayout;

			   cl1.setTop( 0);
			   cl1.setLeft( 0 );
			   cl1.setWidth( "100%" );
			   cl1.setHeight( "100%" );
			   cl1.setBackgroundColor( "white" );
			   cl1.setPaddingLeft( 0 );

			   cl1.removeAll();

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
          this.setFirstName( new qx.ui.form.TextField() );
          this.getFirstName().set({

            	top: 30,
            	right: 30,
            	width: '60%'
          });

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
          this.setLastName( new qx.ui.form.TextField() );
          this.getLastName().set({

            	top: 55,
            	right: 30,
            	width: '60%'
          });

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
          this.setDisplayName( new qx.ui.form.TextField() );
          this.getDisplayName().set({

            	top: 80,
            	right: 30,
            	width: '60%'
          });

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
          this.setDescription( new qx.ui.form.TextField() );
          this.getDescription().set({

            	top: 105,
            	right: 30,
            	width: '60%'
          });

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
          this.setTitle( new qx.ui.form.TextField() );
          this.getTitle().set({

            	top: 130,
            	right: 30,
            	width: '60%'
          });

          // Title tool tip icon
          var txtTip5 = "The title of this user.<br><b>Example: </b>Dr. or Mr.";
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
          this.setOffice( new qx.ui.form.TextField() );
          this.getOffice().set({

            	top: 155,
            	right: 30,
            	width: '60%'
          });

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
          this.setTelephoneNumber( new qx.ui.form.TextField() );
          this.getTelephoneNumber().set({

            	top: 210,
            	right: 30,
            	width: '60%'
          });

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
          this.setMail( new qx.ui.form.TextField() );
          this.getMail().set({

            	top: 235,
            	right: 30,
            	width: '60%'
          });

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
          this.setStreet( new qx.ui.form.TextField() );
          this.getStreet().set({

            	top: 30,
            	right: 30,
            	width: '60%'
          });

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
          this.setPoBox( new qx.ui.form.TextField() );
          this.getPoBox().set({

            	top: 55,
            	right: 30,
            	width: '60%'
          });

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
          this.setCity( new qx.ui.form.TextField() );
          this.getCity().set({

            	top: 80,
            	right: 30,
            	width: '60%'
          });

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
          this.setState( new qx.ui.form.TextField() );
          this.getState().set({

            	top: 105,
            	right: 30,
            	width: '60%'
          });

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
          this.setZip( new qx.ui.form.TextField() );
          this.getZip().set({

            	top: 130,
            	right: 30,
            	width: '60%'
          });

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
          this.setCountry( new qx.ui.form.TextField() );
          this.getCountry().set({

            	top: 155,
            	right: 30,
            	width: '60%'

          });

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
           this.setAccountLayout( new qx.ui.layout.CanvasLayout );
		   this.getAccountLayout().setTop( 0 );
		   this.getAccountLayout().setLeft( 0 );
		   this.getAccountLayout().setWidth( "100%" );
		   this.getAccountLayout().setHeight( "100%" );
		   this.getAccountLayout().setBackgroundColor( "white" );
		   this.getAccountLayout().setPaddingLeft( 0 );

          // BUTTONS
          var btnCancel = new qx.ui.form.Button( "Cancel", "icon/16/actions/dialog-cancel.png" );
              btnCancel.addEventListener( "execute", function( e ) { this.getNewAccountWin().close(); ico1.setLabel( "" ); }, this );
              btnCancel.set({ bottom : 10, right : 65 });

          var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
              btnOK.addEventListener( "execute", function( e ) { 

                // Handles JSON-RPC request if no billing and no provisioning is installed
                if( !this.getIsProvisioningInstalled() && !this.getIsBillingInstalled() ) {

                    this.__createBasicAccount();
                    return;
                }

                // Handles the JSON-RPC request if billing is installed
                if( this.getIsBillingInstalled() ) {

                    this.__createBillingAccount();
                    return;
                }

                // Handles the JSON-RPC request if no billing but provisioining is installed
                if( this.getIsProvisioningInstalled() ) {
                	
                    this.__createVHFAccount( 0, this.getServices().getList().getSelectedItem().getValue() );
                    return;
                }

          }, this );
          btnOK.set({ bottom : 10, right : 10 });

		  cl1.add( sep1 );

          cl1.add( lblFirstName, this.getFirstName(),tipIcon1 );
          cl1.add( lblLastName, this.getLastName(), tipIcon2 );
          cl1.add( lblDisplayName, this.getDisplayName(), tipIcon3 );
          cl1.add( lblDescription, this.getDescription(), tipIcon4 );
          cl1.add( lblTitle, this.getTitle(), tipIcon5 );
          cl1.add( lblOffice, this.getOffice(), tipIcon6 );
          cl1.add( lblPhone, this.getTelephoneNumber(), tipIcon7 );
          cl1.add( lblEmail, this.getMail(), tipIcon8 );

          p2.add( cl2 );
          cl2.add( lblStreetAddress, this.getStreet(), tipIcon9 );
          cl2.add( lblPoBox, this.getPoBox(), tipIcon10 );
          cl2.add( lblCity, this.getCity(), tipIcon11 );
          cl2.add( lblProvince, this.getState(), tipIcon12 );
          cl2.add( lblZip, this.getZip(), tipIcon13 );
          cl2.add( lblCountry, this.getCountry(), tipIcon14 );

          this.getNewAccountWin().add( btnOK, btnCancel );
          this.getNewAccountWin().add( ico1, this.getTabView() );

          // Display copyright
          var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
              lblCopyright.set({ bottom: 15, left: 10 });
          this.getNewAccountWin().add( lblCopyright );

          // Add the window to the framework workspace
	      this.getWireFrame()._addToWorkspace( this.getNewAccountWin() );

	      // Add UI elements if a billing sytem is installed
          var callback = qx.lang.Function.bind( this.__BillingInstalledHandler, this );
          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "FRAMEWORK", "getBillableServices", null );
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

    __createBillingAccount : function() {

    	// Update the statusbar
    	this.getWireFrame()._setStatusText( "Creating new billing account..." );

    	// Show processing window to lock the browser
    	this.getWireFrame()._getLoadingWin().open();

    	// Pass the credit card expiration as a date data type
		var expireDate = new Date();
		    expireDate.setMonth( this.getCCExpiryMonth().getValue() -1 );
		    expireDate.setDate( "01" );
		    expireDate.setYear( this.getCCExpiryYear().getValue() );

        // Make sure required fields have a value
        if( !this.getFirstName().getValue().length ) {

            this.getWireFrame()._showAlertDialog( "error", "Please enter your first name.", "New Account Error" );
            return;
        }
        if( !this.getLastName().getValue().length ) {

            this.getWireFrame()._showAlertDialog( "error", "Please enter your last name.", "New Account Error" );
            return;
        }
        var displayName = (this.getDisplayName().getValue().length) ? this.getDisplayName().getValue() : null;
        var description = (this.getDescription().getValue().length) ? this.getDescription().getValue() : null;
        if( !this.getMail().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please enter your email address.", "New Account Error" );
           return;
        }
        if( !this.getStreet().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please enter your billing address.", "New Account Error" );
           return;
        }
        var pobox = (this.getPoBox().getValue().length) ? this.getPoBox().getValue() : "";
        if( !this.getCity().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please enter the city where your address can be found.", "New Account Error" );
           return;
        }
        if( !this.getState().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please enter the state where your address can be found.", "New Account Error" );
           return;
        }
        if( !this.getZip().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please enter the zip code where your address can be found.", "New Account Error" );
           return;
        }
        if( !this.getLogonName().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please enter the logon name you wish to use for access to your account.", "New Account Error" );
           return;
        }
        if( !this.getServices().getList().getSelectedItem().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please select the service you wish to purchase from the drop down.", "New Account Error" );
           return;
        }
        if( !this.getCCName().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please enter your credit card name as it appears on your card.", "New Account Error" );
           return;
        }
        if( !this.getCCNumber().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please your credit card number as it appears on your card.", "New Account Error" );
           return;
        }
        if( !this.getCCV().getValue().length ) {

           this.getWireFrame()._showAlertDialog( "error", "Please enter the credit card authorization number typically found on the back of your card.", "New Account Error" );
           return;
        }
        if( !this.getCCTypes().getList().getSelectedItems().length ) {
        
           this.getWireFrame()._showAlertDialog( "error", "Please select your credit card type from the drop down.", "New Account Error" );
           return;
        }

        // Set the JSON encoded values
        var json = '[' +
                       // General properties
                      '{ "name" : "firstName", "firstName" : "' + this.getFirstName().getValue() + '"},' +
                      '{ "name" : "lastName", "lastName" : "' + this.getLastName().getValue() + '"},' +
                      '{ "name" : "displayName", "displayName" :"' + displayName + '"},' +
                      '{ "name" : "description", "description" :"' + description + '"},' +
                      '{ "name" : "telephoneNumber", "telephoneNumber" :"' + this.getTelephoneNumber().getValue() + '"},' +
                      '{ "name" : "mail", "mail" :"' + this.getMail().getValue() + '"},' +
                       //  Address properties
                      '{ "name" : "street", "street" :"' + this.getStreet().getValue() + '"},' +
                      '{ "name" : "poBox", "poBox" :"' + pobox + '"},' +
                      '{ "name" : "city", "city" :"' + this.getCity().getValue() + '"},' +
                      '{ "name" : "state", "state" :"' + this.getState().getValue() + '"},' +
                      '{ "name" : "zip", "zip" :"' + this.getZip().getValue() + '"},' +
                       //  Account properties
                      '{ "name" : "uid", "uid" :"' + this.getLogonName().getValue() + '"},' +
                      '{ "name" : "password", "password" :"' + this.getLogonName().getValue() + '"},' +
                      '{ "name" : "serviceId", "serviceId" :' + this.getServices().getList().getSelectedItem().getValue() + '},' +
                      '{ "name" : "ccname", "ccname" :"' + this.getCCName().getValue() + '"},' +
                      '{ "name" : "ccnumber", "ccnumber" :"' + this.getCCNumber().getValue() + '"},' +
                      '{ "name" : "ccexpiry", "ccexpiry" :"' + expireDate + '"},' +
                      '{ "name" : "ccv", "ccv" :' + this.getCCV().getValue() + '},' +
                      '{ "name" : "cctypeId", "cctypeId" :' + this.getCCTypes().getList().getSelectedItem().getValue() + '}' +
                ']'; 

        // Define the callback handler to username check handler
        var callback = qx.lang.Function.bind( this.__createBillingAccountHandler, this );

        // Perform JSON-RPC API call to billing system
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "BILLING", "createCustomer", json );
    },

    /**
     * Handles the response from the base framework API query to see if a billing API is installed
     * 
     * @type member
     */
    __BillingInstalledHandler : function( result, ex, id ) {

        // Unlock the browser
        this.getWireFrame()._getLoadingWin().close();

        // Handle exception    	
    	if( ex != null ) {

    	    this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
    	    this.getWireFrame()._setStatusText( "RPC Error!" );
    	}

    	// Billing system installed
    	if( result ) {

            // Set property to let UI know billing API is installed
            this.setIsBillingInstalled( true );

            // Add billing fields to the form
            var t3 = new qx.ui.pageview.tabview.Button( "Account", "icon/16/categories/applications-office.png" );
	        this.getTabView().getBar().add( t3 );

	        var p3 = new qx.ui.pageview.tabview.Page( t3 );
	        this.getTabView().getPane().add( p3 );

            // Logon name label
	        var lblLogonName = new qx.ui.basic.Atom( "Logon Name" );
	            lblLogonName.setHorizontalChildrenAlign( "right" );
	            lblLogonName.set({
	
	               top: 30,
	               left: 10
	        });

	        // Logon name text field
	        this.setLogonName( new qx.ui.form.TextField() );
	        this.getLogonName().set({

	             	top: 30,
	             	right: 30,
	            	width: '60%'
	        });

	        // Logon name tool tip icon
	        var txtTip15 = "Enter the username you want to use to access your account.<br><b>Example: </b>jdoe01";
	        var tipIcon15 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon15.set({ top: 30, right: 10 });

	        var tooltipBtn15 = new qx.ui.basic.Atom( txtTip15 );
	        var tt15 = new qx.ui.popup.ToolTip( txtTip15 );
	            tipIcon15.setToolTip( tt15 );

            // Services label
	        var lblServices = new qx.ui.basic.Atom( "Services" );
	            lblServices.setHorizontalChildrenAlign( "right" );
	            lblServices.set({

	               top: 55,
	               left: 10
	        });

	        // Services Dropdown
	        this.setServices( new qx.ui.form.ComboBox() );
	        this.getServices().set({

              	 top: 55,
              	 right: 30,
              	 width: '60%'
            });

            // Add each of the services to the drop down if it hasnt already been populated
            if( !this.getServices().getManager().getItems().length ) {

	            for( var i=0; i<result.services.length; i++ ) {
	
	                 var item = new qx.ui.form.ListItem( result.services[i].description, null, result.services[i].id.toString() );
		     	     this.getServices().add( item );
	            }
            }

            // Define example as variable in case administrator has not defined any services :/
            var example = (result.services.length == 0 || result.services[0].description == undefined) ? "" : "<br><b>Example: </b>" + result.services[0].description;

            // Services tool tip icon
	        var txtTip16 = "Select the service you wish to purchase." + example;
	        var tipIcon16 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon16.set({ top: 55, right: 10 });

	        var tooltipBtn16 = new qx.ui.basic.Atom( txtTip16 );
	        var tt16 = new qx.ui.popup.ToolTip( txtTip16 );
	            tipIcon16.setToolTip( tt16 );

            // Credit Card Name Label
	        var lblCCName = new qx.ui.basic.Atom( "CC Name" );
	            lblCCName.setHorizontalChildrenAlign( "right" );
	            lblCCName.set({

	               top: 80,
	               left: 10
	        });

	        // Credit card text field
	        this.setCCName( new qx.ui.form.TextField() );
	        this.getCCName().set({

	             	top: 80,
	             	right: 30,
	            	width: '60%'
	        });

	        // Credit card name tool tip icon
	        var txtTip17 = "Enter your debit/credit card name as it appears on your card.";
	        var tipIcon17 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon17.set({ top: 80, right: 10 });

	        var tooltipBtn17 = new qx.ui.basic.Atom( txtTip17 );
	        var tt17 = new qx.ui.popup.ToolTip( txtTip17 );
	            tipIcon17.setToolTip( tt17 );

	        // Credit card type number label
	        var lblCCNumber = new qx.ui.basic.Atom( "CC Number" );
	            lblCCNumber.setHorizontalChildrenAlign( "right" );
	            lblCCNumber.set({

	               top: 105,
	               left: 10
	        });

	        // Credit card number text field
	        this.setCCNumber( new qx.ui.form.TextField() );
	        this.getCCNumber().set({

	             	top: 105,
	             	right: 30,
	            	width: '60%'
	        });

	        // Credit card tool tip icon
	        var txtTip18 = "Enter your debit/credit card number as it appears on your card.";
	        var tipIcon18 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon18.set({ top: 105, right: 10 });

	        var tooltipBtn18 = new qx.ui.basic.Atom( txtTip18 );
	        var tt18 = new qx.ui.popup.ToolTip( txtTip18 );
	            tipIcon18.setToolTip( tt18 );

            // Credit card expiry label
	        var lblCCExpiry = new qx.ui.basic.Atom( "CC Expiration" );
	            lblCCExpiry.setHorizontalChildrenAlign( "right" );
	            lblCCExpiry.set({

	               top: 130,
	               left: 10
	        });

	        // Credit card expiry month drop down
	        this.setCCExpiryMonth( new qx.ui.form.ComboBox() );
	        this.getCCExpiryMonth().set({

              	 top: 130,
              	 right: 147,
              	 width: '28%'
            });

            // Credit card expiry year drop down
	        this.setCCExpiryYear( new qx.ui.form.ComboBox() );
	        this.getCCExpiryYear().set({

              	 top: 130,
              	 right: 30,
              	 width: '28%'
            });

            // Add 12 months to the month drop down
            for( var month=1; month<13; month++ ) {

                 var Month = (month.length == 1) ? "0" + month : month; 
                 var item = new qx.ui.form.ListItem( "" + Month );
	     	     this.getCCExpiryMonth().add( item );
            }

            // Add this year to the next 10 years to the drop down
            var now = new Date();
	        var thisYear = now.getFullYear();
	        var tenYearsFromNow = thisYear+10;
            for( var year=thisYear; year<tenYearsFromNow; year++ ) {

                 var item = new qx.ui.form.ListItem( "" + year );
	     	     this.getCCExpiryYear().add( item );
            }

            // Credit card expiry date drop down
	        var txtTip19 = "Enter the expiration date of your credit card.";
	        var tipIcon19 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon19.set({ top: 130, right: 10 });

	        var tooltipBtn19 = new qx.ui.basic.Atom( txtTip19 );
	        var tt19 = new qx.ui.popup.ToolTip( txtTip19 );
	            tipIcon19.setToolTip( tt19 );

	        // Credit card verification number
	        var lblCCV = new qx.ui.basic.Atom( "CC Verification" );
	            lblCCV.setHorizontalChildrenAlign( "right" );
	            lblCCV.set({

	               top: 155,
	               left: 10
	        });

	        // Credit card number text field
	        this.setCCV( new qx.ui.form.TextField() );
	        this.getCCV().set({

	             	top: 155,
	             	right: 30,
	            	width: '60%'
	        });

	        // Credit card number tool tip icon
	        var txtTip20 = "<img src=\"resource/vhf/icon/ccverification.gif\">";
	        var tipIcon20 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon20.set({ top: 155, right: 10 });

	        var tooltipBtn20 = new qx.ui.basic.Atom( txtTip20 );
	        var tt20 = new qx.ui.popup.ToolTip( txtTip20 );
	            tipIcon20.setToolTip( tt20 );


            // Credit card  type label
	        var lblCCType = new qx.ui.basic.Atom( "CC Type" );
	            lblCCType.setHorizontalChildrenAlign( "right" );
	            lblCCType.set({

	               top: 180,
	               left: 10
	        });

            // Credit card type drop down
	        this.setCCTypes( new qx.ui.form.ComboBox() );
	        this.getCCTypes().set({

              	 top: 180,
              	 right: 30,
              	 width: '60%'
            });

            // Add each of the credit card types to the drop down
            if( !this.getCCTypes().getManager().getItems().length ) {

	            for( var i=0; i<result.cctypes.length; i++ ) {

	                 var item = new qx.ui.form.ListItem( result.cctypes[i].type, null, result.cctypes[i].id.toString() );
		     	     this.getCCTypes().add( item );
	            }
            }

            // Store example in variable in case administrator hasnt configured any services :/
            var example = (result.cctypes.length == 0 || result.cctypes[0].description == undefined) ? "" : "<br><b>Example: </b>" + result.cctypes[0].description;

            // Services tool tip icon
	        var txtTip21 = "Select the service you wish to purchase." + example;
	        var tipIcon21 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon21.set({ top: 180, right: 10 });

	        var tooltipBtn21 = new qx.ui.basic.Atom( txtTip21 );
	        var tt21 = new qx.ui.popup.ToolTip( txtTip21 );
	            tipIcon21.setToolTip( tt21 );

            // Set up the account tab layout
            this.getAccountLayout().setTop( 0);
		    this.getAccountLayout().setLeft( 0 );
	        this.getAccountLayout().setWidth( "100%" );
	        this.getAccountLayout().setHeight( "100%" );
		    this.getAccountLayout().setBackgroundColor( "white" );
		    this.getAccountLayout().setPaddingLeft( 0 );

		    // Credit card logos
            var cclogos = new qx.ui.basic.Atom;
		    with( cclogos ) {

                  setLeft( 10 );
		          setBottom( 10 );		         
		          setIcon( "resource/vhf/icon/cclogos.gif" );
		    };

            // Add form elements to the window
	        this.getAccountLayout().add( lblLogonName, this.getLogonName(), tipIcon15 );
	        this.getAccountLayout().add( lblServices, this.getServices(), tipIcon16 );
	        this.getAccountLayout().add( lblCCName, this.getCCName(), tipIcon17 );
	        this.getAccountLayout().add( lblCCNumber, this.getCCNumber(), tipIcon18 );
	        this.getAccountLayout().add( lblCCExpiry, this.getCCExpiryMonth(), this.getCCExpiryYear(), tipIcon19 );
	        this.getAccountLayout().add( lblCCV, this.getCCV(), tipIcon20 );
	        this.getAccountLayout().add( lblCCType, this.getCCTypes(), tipIcon21 );
	        this.getAccountLayout().add( cclogos );
	        p3.add( this.getAccountLayout() );

            // Open the window
            this.getNewAccountWin().open();
        }

    	// No billing system installed
    	if( !result ) {

    		// Perform JSON RPC call to see if a provisioning system is installed
            var callback = qx.lang.Function.bind( this.__getProvisionedServicesHandler, this );
            this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "FRAMEWORK", "getProvisionedServices", null );
    	}
    },

    /**
     * Handles the response from the base framework API query to see if a provisioning API is installed
     * 
     * @type member
     */
    __getProvisionedServicesHandler : function( result, ex, id ) {

        // Handle exception    	
    	if( ex != null ) {

    	    this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error" );
    	    this.getWireFrame()._setStatusText( "RPC Error!" );
    	}
    	// Provisioning system is installed
    	if( result ) {

    		// Set property to let UI know provisioning API is installed
            this.setIsProvisioningInstalled( true );

            // Add billing fields to the form
            var t3 = new qx.ui.pageview.tabview.Button( "Account", "icon/16/categories/applications-office.png" );
	        this.getTabView().getBar().add( t3 );

	        var p3 = new qx.ui.pageview.tabview.Page( t3 );
	        this.getTabView().getPane().add( p3 );

            // Logon name label
	        var lblLogonName = new qx.ui.basic.Atom( "Logon Name" );
	            lblLogonName.setHorizontalChildrenAlign( "right" );
	            lblLogonName.set({
	
	               top: 30,
	               left: 10
	        });

	        // Logon name text field
	        this.setLogonName( new qx.ui.form.TextField() );
	        this.getLogonName().set({

	             	top: 30,
	             	right: 30,
	            	width: '60%'
	        });

	        // Logon name tool tip icon
	        var txtTip15 = "Enter the username you want to use to access your account.<br><b>Example: </b>jdoe01";
	        var tipIcon15 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon15.set({ top: 30, right: 10 });

	        var tooltipBtn15 = new qx.ui.basic.Atom( txtTip15 );
	        var tt15 = new qx.ui.popup.ToolTip( txtTip15 );
	            tipIcon15.setToolTip( tt15 );

            // Services label
	        var lblServices = new qx.ui.basic.Atom( "Services" );
	            lblServices.setHorizontalChildrenAlign( "right" );
	            lblServices.set({

	               top: 55,
	               left: 10
	        });

	        // Services Dropdown
	        this.setServices( new qx.ui.form.ComboBox() );
	        this.getServices().set({

              	 top: 55,
              	 right: 30,
              	 width: '60%'
            });

            // Add each of the services to the drop down if it hasnt already been populated
            if( !this.getServices().getManager().getItems().length ) {

	            for( var i=0; i<result.count; i++ ) {

	                 var item = new qx.ui.form.ListItem( result[i].cn[0], null, result[i].policyid[0].toString() );
		     	     this.getServices().add( item );
	            }
            }

            // Services tool tip icon
	        var txtTip16 = "Select the service you wish to purchase.<br><b>Example: </b>" + result[0].description;
	        var tipIcon16 = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
	            tipIcon16.set({ top: 55, right: 10 });

	        var tooltipBtn16 = new qx.ui.basic.Atom( txtTip16 );
	        var tt16 = new qx.ui.popup.ToolTip( txtTip16 );
	            tipIcon16.setToolTip( tt16 );	        

	        // Add form elements to the window
	        this.getAccountLayout().add( lblLogonName, this.getLogonName(), tipIcon15 );
	        this.getAccountLayout().add( lblServices, this.getServices(), tipIcon16 );

	        p3.add( this.getAccountLayout() );
    	}

    	// Open the window
        this.getNewAccountWin().open();
    },
    
    __createBasicAccount : function() {

    	 // Update the status bar
         this.getWireFrame()._setStatusText( "Creating new hosting account..."  );
    	
    	 // Send data to account API encoded as JSON array of objects
         var json = '[' +
                         '{ "name" : "givenName", "givenName" : "' + this.getFirstName().getValue() + '"},' +
                         '{ "name" : "cn", "cn" :"' + this.getFirstName().getValue() + '.' + this.getLastName().getValue() + '"},' +
                         '{ "name" : "sn", "sn" :"' + this.getLastName().getValue() + '"},' +
                         '{ "name" : "displayName", "displayName" :"' + this.getDisplayName().getValue() + '"},' +
                         '{ "name" : "description", "description" :"' + this.getDescription().getValue() + '"},' +
                         '{ "name" : "title", "title" :"' + this.getTitle().getValue() + '"},' +
                         '{ "name" : "telephoneNumber", "telephoneNumber" :"' + this.getTelephoneNumber().getValue() + '"},' +
                         '{ "name" : "mail", "mail" :"' + this.getMail().getValue() + '"},' +
                         '{ "name" : "street", "street" :"' + this.getStreet().getValue() + '"},' +
                         '{ "name" : "postOfficeBox", "postOfficeBox" :"' + this.getPoBox().getValue() + '"},' +
                         '{ "name" : "l", "l" :"' + this.getCity().getValue() + '"},' +
                         '{ "name" : "st", "st" :"' + this.getState().getValue() + '"},' +
                         '{ "name" : "uid", "uid" :"' + this.getFirstName().getValue() + '.' + this.getLastName().getValue() + '"},' +
                         '{ "name" : "postalCode", "postalCode" :"' + this.getZip().getValue() + '"}' +
                   ']';
        
         // Define the callback handler
         var callback = qx.lang.Function.bind( this.__createBasicAccountHandler, this );

         // Perform JSON-RPC API call
	     this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "ACCOUNT", "addAccount", json );
    },

    __createBasicAccountHandler : function( result, ex, id ) {

          // Handle exceptions
     	  if( ex != null ) {

     	     this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error"  );
     	     this.getWireFrame()._setStatusText( "RPC Error!"  );
     	  }

          // Successful result
          if( result ) {

              // No provisioning to perform
              this.getWireFrame()._setStatusText( "Ready" );
              this.getNewAccountWin().close();
          }
    },

    __createVHFAccount : function( billingId, serviceId ) {

    	 // Update the status bar
         this.getWireFrame()._setStatusText( "Creating new hosting account..."  );

         // Send data to account API encoded as JSON array of objects
         var json = '[' +
                           '{ "name" : "givenName", "givenName" : "' + this.getFirstName().getValue() + '"},' +
                           '{ "name" : "cn", "cn" :"' + this.getLogonName().getValue() + '"},' +
                           '{ "name" : "sn", "sn" :"' + this.getLastName().getValue() + '"},' +
                           '{ "name" : "displayName", "displayName" :"' + this.getDisplayName().getValue() + '"},' +
                           '{ "name" : "description", "description" :"' + this.getDescription().getValue() + '"},' +
                           '{ "name" : "title", "title" :"' + this.getTitle().getValue() + '"},' +
                           '{ "name" : "telephoneNumber", "telephoneNumber" :"' + this.getTelephoneNumber().getValue() + '"},' +
                           '{ "name" : "mail", "mail" :"' + this.getMail().getValue() + '"},' +
                           '{ "name" : "street", "street" :"' + this.getStreet().getValue() + '"},' +
                           '{ "name" : "postOfficeBox", "postOfficeBox" :"' + this.getPoBox().getValue() + '"},' +
                           '{ "name" : "l", "l" :"' + this.getCity().getValue() + '"},' +
                           '{ "name" : "st", "st" :"' + this.getState().getValue() + '"},' +
                           '{ "name" : "postalCode", "postalCode" :"' + this.getZip().getValue() + '"},' +
                           '{ "name" : "uid", "uid" :"' + this.getLogonName().getValue() + '"},' +
                           '{ "name" : "billingId", "billingId" :"' + billingId + '"},' +
                           '{ "name" : "serviceId", "serviceId" :"' + serviceId + '"}' +
                    ']';	

         // Define the callback handler
         var callback = qx.lang.Function.bind( this.__createVHFAccountHandler, this );

         // Perform JSON-RPC API call
	     this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "ACCOUNT", "addAccount", json );
    },
    
    __createVHFAccountHandler : function( result, ex, id ) {
    	
    	
     	  if( ex != null ) {

     	     this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error"  );
     	     this.getWireFrame()._setStatusText( "RPC Error!"  );
     	  }

          // Successful result
          if( result ) {

              // If a serviceId has been defined, a provisioning request needs to made
              if( result.serviceId !== undefined )
                  this.__provisionAccount( result.serviceId );

              else { 

                  // No provisioning to perform
	              this.getWireFrame()._setStatusText( "Ready" );
	              this.getNewAccountWin().close();
              }
          }
    },

    /**
     * Handles the JSON RPC reply to from the server
     * 
     * @type member
     * @param array result Boolean true if the update was successful
     * @param object ex JSON RPC exception handler
     * @param integer id The id of the JSON RPC transport call
     */
     __createBillingAccountHandler: function( result, ex, id ) {

     	  if( ex != null ) {

     	     this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error"  );
     	     this.getWireFrame()._setStatusText( "RPC Error!"  );
     	  }

          if( result ) {

              // Valid response properties
              //
          	  // result.paymentResult
          	  // result.userId
          	  // result.serviceId

              // Check for valid response from billing API
              if( result.paymentResult == undefined ) {

                  this.getWireFrame()._showAlertDialog( "error", "Received an unknown response from the payment processor. Please contact support for further assistance.", "Payment Error" );
          	      return;
              }

              // Check for failed payment transaction
          	  //if( result.paymentResult.indexOf( "failed" ) !==  -1 ) {

          	  //    this.getWireFrame()._showAlertDialog( "error", "Your payment transaction has failed. Please contact customer service for assistance.", "Payment Error" );
          	  //    return;
          	  //}

          	  // Payment successful; Create user account
              this.__createVHFAccount( result.userId, result.serviceId );
          }
    },

    __provisionAccount : function( policyId ) {

        // Send data to account API encoded as JSON array of objects
         var json = '[' +
                          '{ "name" : "uid", "uid" :"' + this.getLogonName().getValue() + '"},' +
                          '{ "name" : "policyId", "policyId" :"' + policyId + '"}' +
                    ']';

    	// Perform JSON RPC call to provision account
    	var callback = qx.lang.Function.bind( this.__provisionAccountHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "PROVISIONING", "account", json );
    },

    __provisionAccountHandler : function( result, ex, id ) {

        // Handle exceptions
    	if( ex != null ) {

     	     this.getWireFrame()._showAlertDialog( "error", ex.toString(), "RPC Error"  );
     	     this.getWireFrame()._setStatusText( "RPC Error!"  );
   	    }

        // Successful result
        if( result ) {

    	    // No provisioning to perform
            this.getWireFrame()._setStatusText( "Ready" );
            this.getNewAccountWin().close();
        }
    },

    terminate : function() {
      this.base(arguments);
    }
  }
});