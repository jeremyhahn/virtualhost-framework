/* ************************************************************************
#
#  P2P Hosting Network Control Panel UI
#
#  http://www.p2phost.org
#
#  Copyright:
#    2007 Make A Byte, inc, http://www.makeabyte.com
#
#  Author:
#    * Jeremy Hahn
#
#  Version: 0.1b
#
# P2P Hosting Network Control Panel
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

#require(qx.ui.form.TextField)
#require(qx.ui.form.PasswordField)
#require(qx.ui.form.CheckBox)
#require(qx.ui.popup.ToolTip)
#require(qx.io.remote.Rpc);
************************************************************************ */

qx.Class.define( "packages.core.ui.Desktop", {

  extend : vhf.Main,

  properties : {

  	    WireFrame : { init : vhf.Main.getInstance() }
  },

  construct : function() {

      this.main();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : {

    /**
     * Performs a login attempt to the LDAP server and retrieves all of the packages which the user has access
     * to manage upon successful login. If the user is an administrator, a list of repositories are also retrieved
     * and the Tools=>Settings button is enabled for the administrator to manage the application configurations.
     *
     * @type member
     */

    main : function() {

             
             // Icon and username
             var at1 = new qx.ui.basic.Atom( "<b>" + (this.getWireFrame().getUserAttribs().displayname == undefined) ? this.getWireFrame().getUserAttribs().cn[0] : this.getWireFrame().getUserAttribs().displayname[0] + "</b>", "icon/64/apps/system-users.png" );
                 at1.set({ top: 5, left: 5 });
                 
             var gb1 = new qx.ui.groupbox.GroupBox( "Account Quotas" );
  
		     with(gb1)
		        {
		          setWidth( 200 );
		          setHeight( 175 );
		          setTop( 100 );
		          setLeft( 40 );
		        };
     
              
             // Web quota
             var lblWebQuota = new qx.ui.basic.Label( "Websites:" );
                 lblWebQuota.set({ top: 5, left: 15 } );
             var lblWebQuotaValue = new qx.ui.basic.Label( (this.getWireFrame().getUserAttribs().webquota == undefined) ? "n/a" : this.getWireFrame().getUserAttribs().webquota[0] );
                 lblWebQuotaValue.set({ top: 5, left: 125 });
             
             // DNS
             var lblDnsQuota = new qx.ui.basic.Label( "DNS Domains:" );
                 lblDnsQuota.set({ top: 25, left: 15 } );
             var lblDnsQuotaValue = new qx.ui.basic.Label( (this.getWireFrame().getUserAttribs().dnsquota == undefined) ? "n/a" : this.getWireFrame().getUserAttribs().dnsquota[0] );
                 lblDnsQuotaValue.set({ top: 25, left: 125 });
             
             // DDNS
             var lblDDNS = new qx.ui.basic.Label( "Dynamic DNS:" );
                 lblDDNS.set({ top: 45, left: 15 } );
             var lblDDNSValue = new qx.ui.basic.Label( (this.getWireFrame().getUserAttribs().dnsdynamicupdates == undefined) ? "n/a" : this.getWireFrame().getUserAttribs().dnsdynamicupdates[0] );
                 lblDDNSValue.set({ top: 45, left: 125 });
             
             // Database
             var lblDatabaseQuota = new qx.ui.basic.Label( "Databases:" );
                 lblDatabaseQuota.set({ top: 65, left: 15 } );
             var lblDatabaseQuotaValue = new qx.ui.basic.Label( (this.getWireFrame().getUserAttribs().databasequota == undefined) ? "n/a" : this.getWireFrame().getUserAttribs().databasequota[0] );
                 lblDatabaseQuotaValue.set({ top: 65, left: 125 });
             
             // Mailbox
             var lblMailboxQuota = new qx.ui.basic.Label( "Mailboxes:" );
                 lblMailboxQuota.set({ top: 85, left: 15 } );
             var lblMailboxQuotaValue = new qx.ui.basic.Label( (this.getWireFrame().getUserAttribs().mailboxquota == undefined) ? "n/a" : this.getWireFrame().getUserAttribs().mailboxquota[0] );
                 lblMailboxQuotaValue.set({ top: 85, left: 125 });
                 
             // Mailing lists
             var lblMailListQuota = new qx.ui.basic.Label( "Mailing Lists:" );
                 lblMailListQuota.set({ top: 105, left: 15 } );
             var lblMailListQuotaValue = new qx.ui.basic.Label( (this.getWireFrame().getUserAttribs().mailinglistquota == undefined) ? "n/a" : this.getWireFrame().getUserAttribs().mailinglistquota[0] );
                 lblMailListQuotaValue.set({ top: 105, left: 125 });

             
             
             this.getWireFrame()._addToWorkspace( at1 );
             gb1.add( lblWebQuota );
             gb1.add( lblWebQuotaValue );
             gb1.add( lblDnsQuota );
             gb1.add( lblDnsQuotaValue );
             gb1.add( lblDDNS );
             gb1.add( lblDDNSValue );
             gb1.add( lblDatabaseQuota );
             gb1.add( lblDatabaseQuotaValue );
             gb1.add( lblMailboxQuota );
             gb1.add( lblMailboxQuotaValue );
             gb1.add( lblMailListQuota );
             gb1.add( lblMailListQuotaValue );

             this.getWireFrame()._addToWorkspace( gb1 );
     },     

	
    close : function() {
      this.base(arguments);
    },

    terminate : function() {
      this.base(arguments);
    }
  }
});