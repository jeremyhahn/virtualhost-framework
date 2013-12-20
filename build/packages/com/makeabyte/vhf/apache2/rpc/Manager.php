<?php

# Virtual Host Framework Control Panel
# Copyright (C) 2007  Make A Byte, inc

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
  * Apache Virtual Host Manager Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.com.makeabyte.vhf.apache.rpc
  */

class Manager implements ivirtualHostFrameworkHTTPServer {

      var $namespace = "packages.com.makeabyte.vhf.apache2.rpc";
      var $class     = "Manager";
      var $version   = "1.0";

      var $LDAPServer;
      var $Config;
      var $LDAPVHostDTOEx;

      /**
       * The group properties constructor
       * 
       * @access public
       */
	  public function Manager( LDAPVHostDTOEx $LDAPVHostDTOEx ) {

             $Registry              =& Registry::getInstance();
             $this->LDAPServer      =& $Registry->get( "LDAPServer" );
             $this->Config          =& $Registry->get( "Config" );
             $this->LDAPVHostDTOEx  =  $LDAPVHostDTOEx;
	  }
	  /**
       * Retrieves alist of websites for the current logged on user
       * 
       * @access public
       * @return array Returns an array of websites on success
       *         Exception Throw virtualHostFrameworkAPIException on failure
       */
      function getWebsites() {

               // Define the users base home directory
               $homebase = $this->Config->get( "VHF_HOME" ) . $this->LDAPVHostDTOEx->getUidNumber();

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Create LDAP search filter and attribute return array
               $filter = "(&(apacheServerName=*)(apachedocumentroot=" . $homebase . "*))";
               $attrs = array( );

               // Perform the search opretaion
               $result = $this->LDAPServer->getEntries( $filter, $attrs );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return the array
               return $result;
	  }
	  /**
       * Creates a new website, DNS zone w/ shared hosting records, OU website, user, & group hierarchy, and performs graceful apache restart
       * 
       * @access public
       * @return String Returns the domain name which was created on success
       *         Exception Throws virtualHostFrameworkAPIException on failure
       */
      function addWith() {

               // Retreive the OSCommand object
               $OSCommand =& Registry::getInstance()->get( "OSCommand" );

               /*
                * Website configs
                */
               if( !$this->LDAPVHostDTOEx->getDocumentRoot() )
                   $this->LDAPVHostDTOEx->setDocumentRoot( $this->Config->get( "VHF_HOME" ) . $this->LDAPVHostDTOEx->getUidNumber() . DIRECTORY_SEPARATOR . "www" . DIRECTORY_SEPARATOR . 
                                                           $this->LDAPVHostDTOEx->getServerName() . DIRECTORY_SEPARATOR . "htdocs" );

               if( !$this->LDAPVHostDTOEx->getServerAdmin() )
                   $this->LDAPVHostDTOEx->setServerAdmin( $this->LDAPVHostDTOEx->getMail() );

               if( !$this->LDAPVHostDTOEx->getServerAlias() )
                   $this->LDAPVHostDTOEx->setServerAlias( "www." . $this->LDAPVHostDTOEx->getServerName() );

               // Define the users base home directory
               $apacheAttrs['objectclass'][0]     = "top";
               $apacheAttrs['objectclass'][1]     = "apacheConfig";
               $apacheAttrs['apacheservername']   = $this->LDAPVHostDTOEx->getServerName();
               $apacheAttrs['apacheserveralias']  = $this->LDAPVHostDTOEx->getServerAlias();
               $apacheAttrs['apachedocumentroot'] = $this->LDAPVHostDTOEx->getDocumentRoot();
               $apacheAttrs['apacheserveradmin']  = $this->LDAPVHostDTOEx->getMail();

               /*
                * DNS CONFIGS
                *

               $pieces = explode( ".", $this->LDAPVHostDTOEx->getServerName() );
               $dc = $pieces[0];

               // Create dns components 
               $dnsAttrs['dc'] = $dc;
               $dnsAttrs['objectclass'][0] = "top";
               $dnsAttrs['objectclass'][1] = "dcObject";
               $dnsAttrs['objectclass'][2] = "dNSDomain";
               $dnsAttrs['objectclass'][3] = "domainRelatedObject";
               $dnsAttrs['objectclass'][4] = "virtualHostFrameworkDomain";

               // Get SOA record to configure the domain
               $dnsAttrs['soarecord'] = $this->Config->get( "DNS_SOA" );

               // Get NS records to configure the domain
               $ARecs = $this->Config->get( "DNS_NS" );
               $pieces = explode( "|", $ARecs );
               for( $i=0; $i<count( $pieces ); $i++ )
                   $dnsAttrs['nsrecord'][$i] = $pieces[$i];

               // Get A records to configure the domain
               $ARecs = $this->Config->get( "DNS_A" );
               $pieces = explode( "|", $ARecs );
               for( $i=0; $i<count( $pieces ); $i++ )
                   $dnsAttrs['arecord'][$i] = $pieces[$i];

               // Get MX records to configure the domain
               $ARecs = $this->Config->get( "DNS_MX" );
               $pieces = explode( "|", $ARecs );
               for( $i=0; $i<count( $pieces ); $i++ )
                   $dnsAttrs['mxrecord'][$i] = $pieces[$i];

               // Configure the domain name = this is what the attribute the dns server searches on to resolve a request
               $dnsAttrs['associatedDomain'] = $this->LDAPVHostDTOEx->getServerName();

               // Configure the owner of the domain
               $dnsAttrs['associatedName']   = $this->LDAPVHostDTOEx->getAssociatedName();

               // Configure the status attribute  - default to active
               $dnsAttrs['accountStatus'] = "active";
               */

               /*
                * Organizational Unit Configs
                */
               // New Base OU
               $OuBase                    = "ou=" . $this->LDAPVHostDTOEx->getServerName() . ",ou=" . $this->LDAPVHostDTOEx->getUidNumber() . "," . $this->Config->get( "LDAP_HOSTING_BASE" );
               $OuAttrs['ou']             = $this->LDAPVHostDTOEx->getServerName();
               $OuAttrs['objectclass'][0] = "top";
               $OuAttrs['objectclass'][1] = "organizationalUnit";

               // Users OU
               $UsersBase                      = "ou=Users,ou=" . $this->LDAPVHostDTOEx->getServerName() . ",ou=" . $this->LDAPVHostDTOEx->getUidNumber() . "," . $this->Config->get( "LDAP_HOSTING_BASE" );
               $UsersOuAttrs['ou']             = "Users";
               $UsersOuAttrs['objectclass'][0] = "top";
               $UsersOuAttrs['objectclass'][1] = "organizationalUnit";

               // Groups OU
               $GroupBase                      = "ou=Groups,ou=" . $this->LDAPVHostDTOEx->getServerName() . ",ou=" . $this->LDAPVHostDTOEx->getUidNumber() . "," . $this->Config->get( "LDAP_HOSTING_BASE" );
               $GroupOuAttrs['ou']             = "Groups";
               $GroupOuAttrs['objectclass'][0] = "top";
               $GroupOuAttrs['objectclass'][1] = "organizationalUnit";

               /*
                * Operating System provisioning
                */

               // Create the new website directory
			   $OSCommand->createWebDirectory( $this->LDAPVHostDTOEx->getUidNumber(), $this->LDAPVHostDTOEx->getServerName() );

               /*
                * LDAP Configs
                */

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Create an organizational unit for this domain in the hosting base
               $this->LDAPServer->addEntry( $OuBase, $OuAttrs ); 

               // Create an organizational unit for this domain's user accounts
               $this->LDAPServer->addEntry( $UsersBase, $UsersOuAttrs ); 

               // Create an organizational unit for this domain's groups
               $this->LDAPServer->addEntry( $GroupBase, $GroupOuAttrs ); 

               // Add apache object
               $this->LDAPServer->addEntry( "apacheServerName=" . $this->LDAPVHostDTOEx->getServerName() . "," . $OuBase, $apacheAttrs );

               // Add dns object
               //$this->LDAPServer->addEntry( "dc=" . $dc . "," . $OuBase, $dnsAttrs );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Reload apache
               $this->reload();

               // Return the domain name back to the application
               return $this->LDAPVHostDTOEx->getServerName();
	  }
	  /**
       * Deletes a website subtree from the LDAP server and performs a graceful apache restart
       * 
       * @access public
       * @param array $params The distinguished name of the apache website to delete
       * @param object $objError The JSON-RPC exception handling object
       * @return bool Returns true if the operation completed successfully
       *              Exception Throws virtualHostFrameworkAPIException on error
       */
      function deleteSubtree() {

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Perform the delete operation
               $this->LDAPServer->deleteSubtree( $this->LDAPVHostDTOEx->getParentDn() );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Grab an instance of the OSCommand factory amd delete the web directory
               $OSCommand =& Registry::getInstance()->get( "OSCommand" );
               $OSCommand->deleteWebDirectory( $this->LDAPVHostDTOEx->getUidNumber(), $this->LDAPVHostDTOEx->getServerName() );

               // Reload apache
               $this->reload();

               // Return success
               return true;
	  }
	  /**
       * Adds a new apache LDAP virtual host configuration object to the directory
       * 
       * @access public
       * @return bool Returns true on success
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
	  public function add() {

             // Add apacheConfig attributes
             $attrs['apacheServerName']   = $this->LDAPVHostDTOEx->getServerName();
             $attrs['apacheServerAlias']  = $this->LDAPVHostDTOEx->getServerAlias();
             $attrs['apacheDocumentRoot'] = $this->LDAPVHostDTOEx->getDocumentRoot();
             $attrs['apacheServerAdmin']  = ($this->LDAPVHostDTOEx->getServerAdmin()) ? $this->LDAPVHostDTOEx->getServerAdmin() : $this->LDAPVHostDTOEx->getMail();
             $attrs['objectclass'][0]     = "top";
             $attrs['objectclass'][1]     = "apacheConfig";

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Add the new group
             $this->LDAPServer->addEntry( $this->LDAPVHostDTOEx->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Reload apache
             $this->reload();

             // Return the response
             return true;
      }
	  /**
       * Updates the specified LDAP apache virtual host configuraiton
       * 
       * @access public
       * @return bool Returns true of the operation succeeded
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
	  public function update() {

             // Add apacheConfig attributes
             $attrs['apacheServerName']   = $this->LDAPVHostDTOEx->getServerName();
             $attrs['apacheServerAlias']  = $this->LDAPVHostDTOEx->getServerAlias();
             $attrs['apacheDocumentRoot'] = $this->LDAPVHostDTOEx->getDocumentRoot();
             $attrs['apacheServerAdmin']  = ($this->LDAPVHostDTOEx->getServerAdmin()) ? $this->LDAPVHostDTOEx->getServerAdmin() : $this->LDAPVHostDTOEx->getMail();

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Add the new group
             $this->LDAPServer->updateEntry( $this->LDAPVHostDTOEx->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Reload apache
             $this->reload();

             // Return successful response
             return true;
      }
      /**
       * Deletes an apacheConfig virtual host configuration from the LDAP server
       * 
       * @access public
       * @return String Returns the name of the deleted website on success
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
      function delete() {

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Perform the delete operation
               $this->LDAPServer->deleteEntry( $this->LDAPVHostDTOEx->getDn() );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Grab an instance of the OSCommand factory and delete the web directory
               $OSCommand =& Registry::getInstance()->get( "OSCommand" );
               $OSCommand->deleteWebDirectory( $this->LDAPVHostDTOEx->getUidNumber(), $this->LDAPVHostDTOEx->getServerName() );

               // Reload apache
               $this->reload();

               // Return success back to JSON RPC client
               return $this->LDAPVHostDTOEx->getServerName();
	  }
      /**
       * Reloads the apache web server after a configuration change has been made
       * 
       * @access public
       * @return void
       */
      public function reload() {

             // Load the operating system command class and reload apache
      	     $OSCommand =& Registry::getInstance()->get( "OSCommand" );
      	     $OSCommand->apache2Graceful();
      }
}
?>