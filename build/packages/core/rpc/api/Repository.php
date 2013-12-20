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
  * Repository Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.ui
  */

class Repository implements iVirtualHostFrameworkAPI {

      var $namespace = "packages.core.rpc.ui";
      var $class     = "Repository";
      var $version   = "1.0";

      var $Registry;
      var $LDAPServer;

      /**
       * The Repository constructor
       * 
       * @access public
       */
      public function Repository() {

      	     $this->Registry   =& Registry::getInstance();
             $this->LDAPServer =& $this->Registry->get( "LDAPServer" );
      }
      /**
       * Gets a list of all the repositories stored in the LDAP server
       * 
       * @access public
       * @param array $params The uid and gid of the user account
       * @param object $objError The JSON-RPC exception handling object
       */
	  function getRepositories( $params, $objError ) {

               // Return array
               $arrRepositories = array();

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account and search for the user which is to be authenticated
               $this->LDAPServer->adminBind();

               // Search for all of the packages installed on this server
               $reposFilter = "objectClass=virtualHostFrameworkRepository";
               $reposAttrs  = array( "cn", "repositoryUrl" );
               $arrRepos    = $this->LDAPServer->getEntries( $reposFilter, $reposAttrs );

               // Let the UI know if there arent any packages installed
	           if( !$arrRepos['count'] )
	               return false;

               // Create return array
	           for( $i=0; $i<$arrRepos['count']; $i++ )
                    $arrRepositories[ $i ] = array( "name" => $arrRepos[$i]['cn'][0], "URL" => $arrRepos[$i]['repositoryurl'][0] );

               // Unbind from the LDAP server
   	           $this->LDAPServer->unbind();

   	           // Close the LDAP connection
   	           $this->LDAPServer->close();

               // Return the response
   	           return $arrRepositories;
	  }
      /**
       * Downloads and installs the desired package from a repository
       * 
       * @access public
       * @param array $params The JSON RPC sent data containing the URL, namespace, displayName, and version of the package to be installed
       * @param object $objError The JSON-RPC exception handling object
       */
       function install( $params, $objError ) {

			    // Connect to the LDAP server
                $this->LDAPServer->connect();

                // Bind using the LDAP administration account and search for the user which is to be authenticated
                $this->LDAPServer->adminBind();

                // Define the attributes for the new repository object
      	        $attrs['cn'][0]          = $params[1];
      	        $attrs['repositoryUrl']  = $params[2];
      	        $attrs['objectClass'][0] = "top";
      	        $attrs['objectClass'][1] = "virtualHostFrameworkRepository";

                // Create the new package object
                $this->LDAPServer->addEntry( $params[0], $attrs );

                // Unbind from the directory server
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
	  public function update( $params, $objError ) {

             // Define the new url value
             $attrs['repositoryUrl'] = $params[1];

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Update the entry
             $this->LDAPServer->updateEntry( $params[0], $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the array of account attributes
             return true;
	  }
	  /**
       * Renames a repository object
       * 
       * @access public
       * @param array $params The distinguished name of the repository to rename, the new name, and the parent
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns an array of group member 'cn' attributes
       */
	  function rename( $params, $objError ) {

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Perform the rename opretaion
               $this->LDAPServer->renameEntry( $params[0], "cn=".$params[1], $params[2] );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return the array of account attributes
               return true;
	  }
       /**
	   * Supports the Virtual Host Framwork API 
	   * 
	   * @type member
	   * @param method $method The method to invoke
	   * @param array $params An array of arguments to pass into the method
	   * @param object $objError The JSON RPC error handling object
	   */
	  public function invoke( $method, $params, $objError ) {

             // Execute the requested method, passing the RPC params and error handling object
	  	     if( !$result = $this->$method( $params, $objError ) )
	  	         return false;

	  	     return $result;
	  }
}
?>