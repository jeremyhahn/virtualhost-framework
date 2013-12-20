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
qx.Class.define( "packages.com.makeabyte.vhf.ldapbrowser.ui.contextmenu.AddRemoveMember", {

  extend : vhf.Main,

  properties : {

  	  WireFrame       : { init : vhf.Main.getInstance() }, 
  	  Table        : { },
  	  TableRowData : { }
  },

  construct : function( arrData ) {

     this.setTable( arrData[0] );
     this.setTableRowData( arrData[1] );
  	 
  	 
  	        // New command
			var add = new qx.client.Command;
			add.addEventListener("execute", function( e ) {

			    this.loadProperties( "MemberChooser", Array( this.getTable(), this.getTableRowData() ) );;
			}, this );

		    // Delete command
			var del = new qx.client.Command;
			del.addEventListener("execute", function( e ) {

			    var table = e.getData().getParentMenu().getOpener();
                var selectedObjects = table.getSelectionModel().getSelectedRanges();

                for( var i=0; i<selectedObjects.length; i++ ) {

                     // Get confirmation before the delete operation is performed
                     var confirmCallback = qx.lang.Function.bind( this.__removeMember, this );
                	 this.getWireFrame()._showConfirmDialog( "Are you sure you want to delete " + table.getTableModel().getValue( 0, selectedObjects[i].minIndex ) + "?", "LDAP Object Deletion", confirmCallback, null )
                }
			}, this );

            // Context menu buttons
			var cmenu = new qx.ui.menu.Menu;

			// The button and add the command
			var m_0 = new qx.ui.menu.Button( "New", "icon/16/actions/edit-add.png", add );
			var m_1 = new qx.ui.menu.Button( "Delete", "icon/16/actions/edit-delete.png", del );

            // Add each of the menu objects to the document
			cmenu.add( m_0, m_1 );
			cmenu.addToDocument();

            var tbl = this.getTable();

			// show the context-menu
			tbl.setContextMenu( cmenu );
			tbl.addEventListener( "contextmenu", function( e ) {

			            this.getContextMenu().setLeft( e.getClientX() );
			            this.getContextMenu().setTop( e.getClientY() );
			            this.getContextMenu().setOpener( tbl );
			            this.getContextMenu().show();
			}, tbl );
  },

  members : {

   /**
    * Handles a properties click event by opening a custom properties window based on its 'type'. The type is then used to load
    * the custom properties window located at packages.com.makeabyte.vhf.ldapbrowser.ui.properties.<type>.js 
    * 
    * @type member
    * @param string type The type of object properties being requested.
    * @param object obj The object
    */
    loadProperties : function( type, obj ) {

        this.getWireFrame()._loadPackage( "packages.com.makeabyte.vhf.ldapbrowser.ui.properties." + type, obj );
    },

   /**
    * Removes the selected dn from the members list
    */
    __removeMember : function() {

          // Remove the entry from the table
          var selectedObjects = this.getTable().getSelectionModel().getSelectedRanges();
          for( var i=0; i<selectedObjects.length; i++ )
               this.getTable().getTableModel().removeRows( selectedObjects[i].minIndex, 1 );
    },

    terminate : function() {

          this.base( arguments );
    }
  }
});