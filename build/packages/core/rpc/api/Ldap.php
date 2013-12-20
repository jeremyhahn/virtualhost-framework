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
  * LDAP API Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.api
  */

class Ldap implements iVirtualHostFrameworkAPI {

      var $namespace = "packages.core.api";
      var $class     = "Ldap";
      var $version   = "1.0";

      var $Registry;
      var $LDAPServer;

      /**
       * The group properties constructor
       * 
       * @access public
       */
	  public function Ldap() {

             $this->Registry   =& Registry::getInstance();
             $this->LDAPServer =& $this->Registry->get( "LDAPServer" );
	  }
	  /**
	   * Retrieves a list of attributes associated with the specified distingushed name
       * 
       * @access public
       * @param array $params The distinguished name of the ldap object
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns an array of group member 'cn' attributes
       */
	  public function getAttributes( $params, $objError ) {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Perform the request
             $response = $this->LDAPServer->getEntries( "objectClass=*", array() );

             // Unbind from the directory context
             $this->LDAPServer->unbind();
             
             // Close the connection to the LDAP server
             $this->LDAPServer->close();

             // Search for the requested dn
             for( $i=0; $i<count( $response ); $i++ )
             	  if( $response[$i]['dn'] == $params[0] )
             	      return $response[$i];

             // Return successful response to the client
             return false;
    
	  }
	  /**
	   * Returns the distinguished name for a given canonical name (cn) or posixAccount user id (uid) attribute
       * 
       * @access public
       * @param array $params The cn or uid attribute to return the distinguished name for
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns the distinguished name on success or false on error
       */
	  public function getDistinguishedName( $params, $objError ) {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Perform the request
             $response = $this->LDAPServer->getEntries( "objectClass=*", array( "dn" ) );

             // Unbind from the directory context
             $this->LDAPServer->unbind();
             
             // Close the LDAP connection
             $this->LDAPServer->close();

             // Search for the requested dn
             for( $i=0; $i<count( $response ); $i++ )
             	  if( $response[$i]['cn'] == $params[0] || $response[$i]['uid'] == $params[0] )
             	      return $response[$i]['dn'];

             // Return successful response to the client
             return false;
	  }
	  /**
       * Renames an organizational unit by recursively copying its subtree to an alternate istinguished name in the directory.
       * @todo: This operation will rename child entry 'member' attributes, however, the rest of the tree needs to be searched
       *        for the distinguished name of the parent container which is being renamed, and update any attributes which point
       *        to the distinguished names within the directory which are being renamed.
       * 
       * @access public
       * @param array $params The distinguished name of the current OU DN, the new OU DN
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns an array of group member 'cn' attributes
       */
	  public function moveSubtree( $params, $objError ) {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Move the subtree
             $response = $this->LDAPServer->moveSubtree( $params[0], $params[1] );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Returns successful response to the client
             return true;
	  }
	  /**
       * Deletes a given container object and its siblings
       * 
       * @access public
       * @param array $params The distinguished name of the object to delete
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns an array of group member 'cn' attributes
       */
	  public function deleteSubtree( $params, $objError ) {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Delete the subtree
             $this->LDAPServer->deleteSubtree( $params[0] );

             // Unbind from the directory context
             $this->LDAPServer->unbind();
             
             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return successful responose to the client
             return true;
	  }
	  /**
       * Adds a new organizational unit
       * 
       * @access public
       * @param array $params The distinguished name of the new organizational unit 
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns an array of group member 'cn' attributes
       */
       public function addOrganizationalUnit( $params, $objError ) {

             // Extract the OU name from the dn
             $pieces = explode( ",", $params[0] );
             $name = explode( "=", $pieces[0] );

             // Define necessary LDAP object attributes
      	     $attrs['ou'][0] = $name[1];
      	     $attrs['objectclass'][0] = "top";
      	     $attrs['objectclass'][1] = "organizationalUnit";

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Update the entry
             $this->LDAPServer->addEntry( $params[0], $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return successful response to the  client
             return true;
      }
      /**
       * Renames an object
       * 
       * @access public
       * @param array $params The distinguished name of the entry, the new name (attrib=name), and the new dn
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns an array of group member 'cn' attributes
       */
	  public function rename( $params, $objError ) {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Rename the entry
             $response = $this->LDAPServer->renameEntry( $params[0], $params[1], $params[2] );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->connect();

             // Return successful response to the client
             return true;
	  }
      /**
       * Deletes a leaf entry from the LDAP tree
       * 
       * @access public;
       * @param array $params The distinguished name of the LDAP leaf object to delete
       * @param object $objError The JSON RPC error handling object
       */
      public function delete( $params, $objError ) {

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Delete the requested entry
             $this->LDAPServer->deleteEntry( $params[0] );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the deleted attribute name back to the client
             return $params[0];
      }
      /**
       * Deletes a given attribute value
       * 
       * @access public
       * @param array $params The distinguished name of the object to perform the operation, the attribute name, the attribute value
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns true on success or throws an exception on failure
       */
	  public function deleteAttrib( $params, $objError ) {

             // Create name/value pair to delete
      	     $data = array();
      	     $data[ $params[1] ] = $params[2];

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Delete the attribute
             $this->LDAPServer->deleteAttrib( $params[0], $data );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the deleted attribute name and value back to the client for processing within the UI 
             return array( "attribute" => $params[1], "value" => $params[2] );
      }
      /**
       * Adds an attribute name/value pair to an object
       * 
       * @access public
       * @param array $params The distinguished name of the object to perform the operation, the attribute name, the attribute value
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns true on success or throws an exception on failure
       */
	  public function addAttrib( $params, $objError ) {

             // Define the new attribute
      	     $data = array();
      	     $data[ $params[1] ] = array( $params[2] );

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Update the requested attribute
             $this->LDAPServer->addAttrib( $params[0], $data );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the new attribute name/value pair to the client
             return array( "attribute" => $params[1], "value" => $params[2] );
      }
      /**
       * Updates an attribute value for the given object distinguished name
       * 
       * @access public
       * @param array $params The distinguished name of the object to update, the attribute name, the attribute value
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns true on success or throws an exception on failure
       */
      function updateAttrib( $params, $objError ) {

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Add each of the values to the attribute array
               $data = explode( "|", $params[2] );
               for( $i=0; $i<count( $data ); $i++ )
               	    $attr[$params[1]][$i] = $data[$i];

               // Perform the rename opretaion
               $this->LDAPServer->updateEntry( $params[0], $attr );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the connection to the LDAP server
               $this->LDAPServer->close();

               // Return the array of account attributes
               return true;
	  }
	  /**
       * Returns an array of child entries for a given object in the directory 
       * 
       * @access public
       * @param array $params The distinguished name of the parent object to get the list of entries from
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns a multi-dimensional array which represents the LDAP tree hierarchy
       */
      public function getEntries( $params, $objError ) {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Perform the requested search
             $sr   = ldap_list( $this->LDAPServer->handle, $params[0], "(!(objectClass=organizationalUnit))" );
      	     $data = ldap_get_entries( $this->LDAPServer->handle, $sr );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the connection to the LDAP server
             $this->LDAPServer->close();

             // Return the requested entries
             return $data;
      }
      /**
       * Returns a multi-dimensional array which represents the LDAP tree hierarchy 
       * 
       * @access public
       * @return array Returns a multi-dimensional array which represents the LDAP tree hierarchy
       */
      public function getTreeSource() {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Extract the base object name (usually a domain name)
             $pieces = ldap_explode_dn( $this->LDAPServer->base, 1 );
             array_splice( $pieces, 0, 1 );
             $domain = implode( ".", $pieces );

             // Return the LDAP tree source and base dn
			 return array( "treeSource" => $this->buildTreeArray( $this->LDAPServer->base ), "base" => $this->LDAPServer->base );
      }
      /**
       * Helper Method :: Recursively builds an array, adding each child branch or leaf object. 
       * 
       * @access public
       * @param String $dn The distingusihed name of the container object to build the tree from
       * @return array Returns a multi-dimensional array which represents the LDAP tree hierarchy
       */
      private function buildTreeArray( $dn ) {

              $arrTree = array();
               
              $filter = "(|(|(objectClass=organizationalUnit)(objectClass=dcObject))(objectClass=organization))";

      	      $sr   = ldap_list( $this->LDAPServer->handle, $dn, $filter );
      	      $data = ldap_get_entries( $this->LDAPServer->handle, $sr );

              // Loop through each of the container type objects
     	      for( $i=0; $i<$data["count"]; $i++ ) {

                   // Send objects with child entries through to be processed
      	      	   $arrChildren = $this->buildTreeArray( $data[$i]["dn"] );
      	      	   $dn = explode( ",", $data[$i]['dn'] );
      	       	   $name = explode( "=", $dn );
      	       	   if( count( $arrChildren ) )
      	       	       array_push( $arrTree, $data[$i], $arrChildren );
      	       	   else
      	       	       array_push( $arrTree, $data[$i] );
      	      }

              // Return the tree branch
      	      return $arrTree;
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
             $filter = "(|(objectClass=groupOfNames)(objectClass=virtualHostFrameworkAccount))";
             $attrs = array( "dn" );

             // Perform the search
             $arrResult = $this->LDAPServer->getEntries( $filter, $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the array of account attributes
             return $arrResult;
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