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

qx.Class.define( "packages.com.makeabyte.vhf.powerdns.ui.RecordChooser", {

  extend : vhf.Main,

  properties : {

  	    WireFrame     : { init : vhf.Main.getInstance() },
  	    RecChooserWin : { },
  	    ObjectDn      : { },
  	    Callback      : { }
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

    main : function() {

           // Create the window
           this.setRecChooserWin( new qx.ui.window.Window( "Record Chooser", "icon/16/" + this.getWireFrame().getAppIcon() ) );
           this.getRecChooserWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
           });
    	   this.getRecChooserWin().setSpace( 200, 400, 150, 200 );  // left spacing // width // top spacing // height
    	   this.getRecChooserWin().removeAll();

 		   var at1 = new qx.ui.basic.Atom( "Please enter and confirm the new password.", "icon/32/mimetypes/text-ascii.png" );
		       at1.setLocation( 4, 4 );

           // Record type label
           var lblType = new qx.ui.basic.Atom( 'Type' );
               lblType.setHorizontalChildrenAlign( 'right' );
               lblType.set({

              	  top: 60,
            	  left: 30,
            	  width: '10%'
           });

           // Record type combo box
           var txtType = new qx.ui.form.ComboBox();
               txtType.set({

              	  top: 60,
            	  right: 30,
            	  width: '70%'
           });

           RecType = [];
           RecType[0]  = "ARecord";
           RecType[1]  = "MXRecord";
           RecType[2]  = "CNAMERecord";
           RecType[3]  = "WKSRecord";
           RecType[4]  = "PTRRecord";
           RecType[5]  = "HINFORecord";
           RecType[6]  = "MINFORecord";
           RecType[7]  = "TXTRecord";
           RecType[8]  = "RPRecord";
           RecType[9]  = "AFSDBRecord";
           RecType[10] = "SIGRecord";
           RecType[11] = "KEYRecord";
           RecType[12] = "GPOSRecord";
           RecType[13] = "AAAARecord";
           RecType[14] = "LOCRecord";
           RecType[15] = "NXTRecord";
           RecType[16] = "SRVRecord";
           RecType[17] = "NAPTRRecord";
           RecType[18] = "KXRecord";
           RecType[19] = "CERTRecord";
           RecType[20] = "A6Record";
           RecType[21] = "DNAMERecord";
           RecType[22] = "APLRecord";
           RecType[23] = "DSRecord";
           RecType[24] = "SSHFPRecord";
           RecType[25] = "IPSECKEYRecord";
           RecType[26] = "RRSIGRecord";
           RecType[27] = "NSECRecord";
           RecType[28] = "DNSKEYRecord";
           RecType[29] = "DHCIDRecord";
           RecType[30] = "SPFRecord";

           RecType.sort();

           for( var i=0; i<RecType.length; i++ ) {
                
                var item = new qx.ui.form.ListItem( RecType[i] );
	     	    txtType.add( item );
           }
 
           // Password tool tip icon
           var txtTip = "Select the type of record you wish to add from the drop down.<br><b>Example:</b> aRecord";
           var tipIcon = new qx.ui.basic.Atom( "", "icon/16/apps/accessories-tip.png" );
               tipIcon.set({ top: 60, right: 10 });

           var tooltipBtn = new qx.ui.basic.Atom( txtTip );
           var tt1 = new qx.ui.popup.ToolTip( txtTip );
           tipIcon.setToolTip( tt1 );

           // Value label 
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

           var txtTip2 = "Enter the value for this record per RFC for the particular record you are adding.<br><b>Example:</b> 1.2.3.4";
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

                 if( !txtValue.getValue().length ) {
                     
                     this.getWireFrame()._showAlertDialog( "error", "You must enter a value.", "New DNS Record", null );
                     return;
                 }
                 
                 
                 // Send request formatted as JSON
                 var json = '[' +
                                   '{ "name" : "dn", "dn" : "' + this.getObjectDn() + '"},' +
                                   '{ "name" : "' + txtType.getValue() + '", "' + txtType.getValue() + '" : "' + txtValue.getValue() + '"}' +
                            ']';

                 var callback = new qx.lang.Function.bind( this.__newRecordHandler, this );
                 this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "DNS", "addRecord", json );
                 
           }, this );


           btnCancel.addEventListener( "execute", function( e ) { this.getRecChooserWin().close() }, this );
   	       this.getRecChooserWin().add( at1, lblType, txtType, lblValue, txtValue, tipIcon, tipIcon2, btnOK, btnCancel );

   	       // Display copyright
           var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
               lblCopyright.set({ bottom: 15, left: 10 });
           this.getRecChooserWin().add( lblCopyright );
  	     
    	 this.getRecChooserWin().open();
		 this.getWireFrame()._addToWorkspace( this.getRecChooserWin() );
    },
    
    __newRecordHandler : function( result, ex, id ) {
    
        if( ex != null ) {
        	
           this.getWireFrame()._showAlertDialog( "error", ex, "RPC Error" );
           this.getWireFrame()._setStatusText( "RPC Error!" );
        }
        
        if( result ) {

        	// Execute the callback method
        	this.getCallback()();

        	// Close the window
        	this.getRecChooserWin().close();
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