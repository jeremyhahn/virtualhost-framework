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
  * User Account Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.ui;
  */

class Group implements iVirtualHostFrameworkGroup {

      var $namespace = "packages.core.rpc.api";
      var $class     = "Group";
      var $version   = "1.0";

      var $LDAPServer;
      var $SQLServer;
      var $GroupDTO;

      /**
       * The Group constructor
       * 
       * @access public
       */
	  public function Group( GroupDTO $GroupDTO ) {

             $Registry         =& Registry::getInstance();
             $this->LDAPServer =& $Registry->get( "LDAPServer" );
             $this->SQLServer  =& $Registry->get( "SQLServer" );
             $this->GroupDTO   = $GroupDTO;
	  }
	  /**
	   * Adds a new group object to the ldap directory
	   * 
	   * @access public
	   * @param array $params The distinguished name of the group object, group type, cn, members, description, mail
	   */
	  public function add() {

             // Add attributes which apply to all group objects
             $attrs['cn']             = $this->GroupDTO->getCn();
             $attrs['objectClass'][0] = "top";

             // Handle each group a bit differenly
             if( $this->GroupDTO->getType() == "posixGroup" ) {

	             $attrs['objectClass'][1] = "posixGroup";

	      	     // Get the group id from the system table in the sqlite database table 
	             $result = $this->SQLServer->query( "SELECT * FROM system WHERE name='LDAP_NEXT_GID';" );
	             $row = $result->fetch();
	
	             // Add the uid and gid to the account object
	             $attrs['gidNumber'] = $row['value'];

	             // Increment the LDAP_NEXT_GID value
                 $this->SQLServer->query( "UPDATE system SET value='" . (($row['value'])+1) . "' WHERE name='LDAP_NEXT_GID';" );

                 // Sets the random password
         	     $attrs['userPassword'] = $this->LDAPServer->getRandomPassword();
             }

             else if( $this->GroupDTO->getType() == "mailingList" ) {

	             $attrs['cn'] = $this->GroupDTO->getCn();

	             // Add members
	             $members = $this->GroupDTO->getMembers();
	             for( $i=0; $i<count( $members ); $i++ )
	                  $attrs['member'][$i] = $members[$i];

	             //$attrs['objectClass'][1] = "inetOrgPerson";
	             $attrs['objectClass'][1] = "virtualHostFrameworkMailingList";
	             $attrs['description']    = $this->GroupDTO->getDescription();
	             $attrs['mail']           = $this->GroupDTO->getMail();
             }
             else { // groupOfNames

                 // Add members
	             $members = $this->GroupDTO->getMembers();
	             for( $i=0; $i<count( $members ); $i++ )
	                  $attrs['member'][$i] = $members[$i];

                 // Add mailing list specific attributes
	             $attrs['objectClass'][1] = "groupOfNames";
	             $attrs['description']    = $this->GroupDTO->getDescription();
             }

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Add the new group
             $this->LDAPServer->addEntry( $this->GroupDTO->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return successful response
             return true;
      }
      /**
       * Retrieves a list of group members associated with the specified distingushed name
       * 
       * @access public
       * @param array $params The distinguished name of the group to get the list of members for
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns an array of group member 'cn' attributes
       */
	  public function getMembers() {
	  
             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Filter for the user account name and return all of the attributes for this account             	
             $filter = "objectClass=*";
             $attrs = array( "member" );

             // Perform the search
             $arrResult = $this->LDAPServer->readEntry( $this->GroupDTO->getDn(), $filter, $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the array of account attributes
             return $arrResult[0];
	  }
      function update() {

               $attrs['description'] = $this->GroupDTO->getDescription();

               // Add mail attribute for mailing lists
               if( $this->GroupDTO->getType() == "mailingList" )
	               $attrs['mail'] = $this->GroupDTO->getMail();

               // Add members
               $members = $this->GroupDTO->getMembers();
	           for( $i=0; $i<count( $members ); $i++ )
	                $attrs['member'][$i] = $members[$i];

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Perform the rename opretaion
               $this->LDAPServer->updateEntry( $this->GroupDTO->getDn(), $attrs );

               // Unbind from the directory context
               $this->LDAPServer->unbind();
 
               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return the array of account attributes
               return true;
	  }
	  /**
       * Renames a group object
       * 
       * @access public
       * @param array $params The distinguished name of the group to rename, the new name, and the parent
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns an array of group member 'cn' attributes
       */
	  function rename() {

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Perform the rename opretaion
               $this->LDAPServer->renameEntry( $this->GroupDTO->getDn(), "cn=" . $this->GroupDTO->getCn(), $this->GroupDTO->getParentDn() );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return the array of account attributes
               return true;
	  }
}
?>