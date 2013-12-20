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
qx.Class.define( "packages.com.makeabyte.vhf.powerdns.ui.RecordManager", {

  extend : vhf.Main,

  properties : {

  	    WireFrame     : { init : vhf.Main.getInstance() },
  	    RecManagerWin : { },
  	    ZoneObj       : { },
  	    Table         : { },
  	    RowData       : { init : [ ] },
  	    Callback      : { }
  },

  construct : function( obj ) {

  	   this.setZoneObj( obj[0] );
  	   this.setCallback( obj[1] );

	   // Set up the window
       this.setRecManagerWin( new qx.ui.window.Window( "DNS Recorda Manager", "icon/16/" + this.getWireFrame().getAppIcon() ) );
       this.getRecManagerWin().set({
		          showMinimize: true,
		          allowMinimize: false,
		          allowMaximize: true
       });
	   this.getRecManagerWin().setSpace( 225, 400, 5, 425 );  // left // width // top // height
	   this.getWireFrame()._addToWorkspace( this.getRecManagerWin() );
	   this.getRecManagerWin().removeAll();

       // Window icon
       var ico1 = new qx.ui.basic.Atom( "Add or remove records by using the right click context menu.", "icon/32/mimetypes/text-ascii.png" );
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

		    cl1.setTop( 0 );
		    cl1.setLeft( 0 );
		    cl1.setWidth( "100%" );
		    cl1.setHeight( "100%" );
		    cl1.setBackgroundColor( "white" );
		    cl1.setPaddingLeft( 0 );

       p1.add( cl1 );

       // Create the table columns
       var tableModel = new qx.ui.table.model.Simple();
           tableModel.setColumns( [ "Name", "Value" ] );

       // Create a custom column model
	   var custom = { tableColumnModel : function( obj ) {
	                  return new qx.ui.table.columnmodel.Resize( obj );
	                }
	   };

       // Table
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
       resizeBehavior.setWidth( 0, 150 );
       resizeBehavior.setMinWidth( 0, 50 );
       resizeBehavior.setMaxWidth( 0, 500 );
       //  Attribute column dimensions
       resizeBehavior.setWidth( 1, 250 );
       resizeBehavior.setMinWidth( 1, 50 );
       resizeBehavior.setMaxWidth( 1, 500 );


       // Set one the values) two as editable
       tableModel.setColumnEditable( 1, true );

       // BUTTONS
       var btnOK = new qx.ui.form.Button( "OK", "icon/16/actions/dialog-ok.png" );
           btnOK.set({ bottom : 10, right : 10 });
           btnOK.addEventListener( "execute", function( e ) { 

                  this.getRecManagerWin().close();
          }, this );
       
       // Add the UI elements/widgets to the layout
       cl1.add( this.getTable() );

       // Add UI elements/widgets to the window
       this.getRecManagerWin().add( ico1, tv1, btnOK );

       // Display copyright
       var lblCopyright = new qx.ui.basic.Label( this.getWireFrame().getCopyright() );
           lblCopyright.set({ bottom: 15, left: 10 });
       this.getRecManagerWin().add( lblCopyright );

       // Call method to populate window with zone records
       this.__populate();

       // Load right click context menu
       this.__loadContextMenu();

       // Open the window
       this.getRecManagerWin().open();
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
   
    __populate : function() { 

        // Send request argument formatted as JSON
        var json = '[{ "name" : "dn", "dn" : "' + this.getZoneObj().dn + '"}]';

        // Get a list of dns zones this user owns
        var callback = qx.lang.Function.bind( this.__getRecordsHandler, this );
        this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "DNS", "getRecords", json );
    },


    __getRecordsHandler : function( result, ex, id ) {

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
	       for( var i=0; i<result.count; i++ ) {
	       
	            if( result[i].indexOf( "record" ) !== -1 ) {

	                var attrib = eval( "result." + result[i] );
	                for( var j=0; j<attrib.count; j++ )	             
	                     this.getRowData().push([ result[i], attrib[j], result ] );
	            }
           }

       	   this.getTable().getTableModel().setData( this.getRowData() );
       	   this.getTable().getTableModel().addEventListener( "dataChanged", function( e ) {

       	   	    // Let the user know the attribute is being updated
                this.getWireFrame()._setStatusText( "Updating record..." );

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

                          // Case sensitivity needs to be preserved. Attribute names are returned as lowercase from PHP. This is a kiudgy fix
                          RecType     = [];
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

                          var record = "";
                          for( var k=0; k<RecType.length; k++ ) {

                               if( RecType[k].toLowerCase().indexOf( this.getTable().getTableModel().getValue( 0, selectedObjects[i].minIndex ).toLowerCase() ) !== -1 ) {

                                   record = RecType[k];
                                   break;
                               }
                          }

                          // Send request arguments formatted as JSON
                          var json = '[' + 
                                           '{ "name" : "dn", "dn" : "' + this.getTable().getTableModel().getValue( 2, selectedObjects[i].minIndex ).dn + '"},' +
                                           '{ "name" : "' + record + '", "' + record + '" : ' + this.getWireFrame().arrayToJson( values ) + '}' +
                                     ']';

                          var callback = new qx.lang.Function.bind( this.__updateRecordHandler, this );
                          this.getWireFrame()._callAsyncRpc( callback, "core.rpc.API", "invoke", "DNS", "updateRecord", json );
	            }
       	   }, this );
    	}
    },
    
    __updateRecordHandler : function( result, ex, id ) {
    	
    	  if( ex != null ) {
    	  	
    	  	  this.getWireFrame()._setStatusText( "RPC Error!" );
    	  	  this.getWireFrame()._showAlertDialog( "error", ex, "RPC Error" );
    	  }

    	  if( result ) {

              //this.__populate();
              this.getWireFrame()._setStatusText( "Ready" );
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
        this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.powerdns.ui.contextmenu.RecordManager", Array( this.getTable(), this.getRowData(), callback, this.getZoneObj().dn ) );
      },
      

    terminate : function() {
          this.base( arguments );
    }
  }
});