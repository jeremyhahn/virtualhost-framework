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
  * OpenLDAP Management Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.rpc.core.directory.service.openldap
  */

// Include openldap exception handler
require_once( 'OpenLDAPException.php' );

class LDAPServer implements ivirtualHostFrameworkLDAPServer {

	  var $namespace = "packages.rpc.core.directory.service.openldap";
	  var $class     = "Manager";
	  var $version   = "1.0";

      var $handle;
      var $isBound;
      var $server;
      var $port;
      var $admin;
      var $pass;
      var $base;
      var $ssl;
      var $protocol;
      var $err_num;
      var $err_msg;

      var $objCrypt;

	  /**
       * The OpenLDAP Management constructor
       * 
       * @access public
       * @param LDAPConnectionDTO $objConnection The LDAP connection data type object which contains the connection parameters
       */
      public function LDAPServer( LDAPConnectionDTO $objConnection ) {

	         $this->server   = $objConnection->getHost();
	         $this->port     = $objConnection->getPort();
	         $this->admin    = $objConnection->getUsername();
	         $this->pass     = $objConnection->getPassword();
	         $this->base     = $objConnection->getBase();
	         $this->ssl      = $objConnection->getSsl();
	         $this->protocol = $objConnection->getProtocol();
	         $this->objCrypt = $objConnection->getEncryption();

	         // Initalize the configured LDAP protocol version
	         $this->setOption( LDAP_OPT_PROTOCOL_VERSION, $objConnection->getProtocol() );
	  }
	  /**
       * Connect to the LDAP server
       * 
       * @access public
       * @return void
       */
	  public function connect() {

             if( !$this->handle = ldap_connect( $this->server, $this->port ) )
			     throw new OpenLDAPException( "Could not connect to OpenLDAP server. " . $this->getError() );
	  }
	  /**
       * Sets a PHP LDAP library option
       * 
       * @access public
       * @param string $option The option to set
       * @param mixed $value The value to set the option to
       * @return void
       */
	  public function setOption( $option, $value ) {

	         if( !ldap_set_option( $this->handle, $option, $value ) )
	             throw new OpenLDAPException( "Could not set requested LDAP protocol version. " . $this->getError );
	  }
	  /**
       * Performs an anonymous bind to the LDAP server
       * 
       * @access public
       * @return bool Returns true if the bind was successful, false if the bind was not successful
       * @return void
       */
	  public function bind() {

	         if( !ldap_bind( $this->handle ) )
 			     throw new OpenLDAPException( "Could not bind to the OpenLDAP server. " . $this->getError() );

             $this->isBound = true;
	  }
	  /**
       * Performs an authenticated bind to the LDAP server with user credentials
       * 
       * @access public
       * @param string $username The username DN to use while binding
       * @param string $password The password to use while binding
       * @return void
       */
	  public function authBind( $username, $password ) {

	         if( !ldap_bind( $this->handle, $username, $password  ) )
	             throw new OpenLDAPException( "Could not authenticate the requested account. Please try again."  );

             $this->isBound = true;
	  }
	  /**
       * Performs an authenticated bind to the LDAP server using administrative credentials
       * 
       * @access public
       * @return void
       */
	  public function adminBind() {

	         if( !ldap_bind( $this->handle, $this->admin, $this->objCrypt->decrypt_aes_256( $this->objCrypt->decode( $this->pass ) ) ) )
	             throw new OpenLDAPException( "Could not bind to the OpenLDAP server using the specified administrative credentials. " . $this->getError() );

             $this->isBound = true;
	  }
	  /**
       * Retrieves entries based on an LDAP Filter and optional attribute limit
       * 
       * @access public
       * @param string $filter The LDAP filter to apply to the search criteria
       * @param array $attrs An array of attributes which should be returned from the search
       * @return Returns multi-dimensional array of ldap objects with their associated attribute values
       */
	  public function getEntries( $filter, $attrs ) {

	  	     if( !$result = ldap_search( $this->handle, $this->base, $filter, $attrs ) )
             	 throw new OpenLDAPException( "Could not perform the requested search. " . $this->getError() );

             if( !$info = ldap_get_entries( $this->handle, $result ) )
             	 throw new OpenLDAPException( "Could not retrieve the requested entries. " . $this->getError() );

             return $info;
	  }
	  /**
	   * Returns a distinguished name for a given postixAccount user id (uid) or canonical name (cn)
       * 
       * @access public
       * @param string $name The value of the posixAccount uid or cn attribute
       * @return Returns the distinguished name of the account
       */
	  public function getDistinguishedName( $name ) {
 
             if( !$sr = ldap_search( $this->handle, $this->base, "(|(uid=$name)(cn=$name))", array() ) )
                 throw new OpenLDAPException( "Could not retrieve the requested distinguished name '" . $name . "'. " . $this->getError() );

             if( !$info = ldap_get_entries( $this->handle, $sr ) )
                 throw new OpenLDAPException( "Could not retrieve entries for the requested distinguished name" ); 

             return $info[0]['dn'];
	  }
	  /**
	   * Returns an array of attributes for the requested distinguished name
       * 
       * @access public
       * @param string $name The distinguished name of the LDAP object to retrieve the list of attributes for
       * @return An array of attributes for the requested distinguished name
       */
	  public function getAttribs( $dn ) {
	  	
	  	     // List all child entries of the DN
	         if( !$sr = ldap_list( $this->handle, $dn, "objectClass=*", array() ) )
	             throw new OpenLDAPException( "Could not perform the requested search. " . $this->getError() );

	         if( !$data = ldap_get_entries( $this->handle, $sr ) )
	             throw new OpenLDAPException( "Could not retrieve a list of entries for the requested LDAP object. " . $this->getError() );

	         return $data;
	  }
	  /**
       * Retrieves an LDAP object given its distinguished name. Note the filter parameter must be set to something for the search to work!
       * 
       * @access public
       * @param string $dn The distinguished name to search for
       * @param string $filter The LDAP filter to apply to the search criteria
       * @param array $attrs An array of attributes which should be returned from the search
       * @return Returns a multi-dimensional array containing each ldap object and its associated attributes
       */
	  public function readEntry( $dn, $filter, $attrs ) {

			 if( !$result =ldap_read( $this->handle, $dn, $filter, $attrs ) )
			     throw new OpenLDAPException( "Could not retrieve the requested object. " . $this->getError() );

			 if( !$info = ldap_get_entries( $this->handle, $result ) )
			     throw new OpenLDAPException( "Could not retrieve child entries for the requested distinguished name. " . $this->getError() );

			 return $info;
	  }
	  /**
       * Adds an LDAP object given its distinguished name and an array of attributes
       * 
       * @access public
       * @param string $dn The distinguished name of the new object
       * @param array $attrs An array of attribute name/values for the new object
       */
	  public function addEntry( $dn, $attrs ) {

			 if( !ldap_add( $this->handle, $dn, $attrs ) )
			     throw new OpenLDAPException( "Could not add the requested directory object '" . $dn . "'. " . $this->getError() );
	  }
	  /**
       * Adds an LDAP object attribute name/value pair
       * 
       * @access public
       * @param string $dn The distinguished name to of the object to add the attribute, the attribute name, the attribute value
       * @param string $entry An array containing the attribute and value to delete
       */
	  public function addAttrib( $dn, $entry ) {

			 if( !ldap_mod_add( $this->handle, $dn, $entry ) )
			     throw new OpenLDAPException( "Could not add the requested attribute name/value pair. " . $this->getError() );
	  }
	  /**
       * Updates an LDAP object given its distinguished name.
       * 
       * @access public
       * @param string $dn The distinguished name to update
       * @param array $attrs The array of attribute['name'] = value pairs to update
       */
	  public function updateEntry( $dn, $attrs ) {

			 if( !ldap_modify( $this->handle, $dn, $attrs ) )
			     throw new OpenLDAPException( "Could not update the requested object. " . $this->getError() );
	  }
	  /**
       * Renames an LDAP object given its distinguished name.
       * 
       * @access public
       * @param string $dn The distinguished name to update
       * @param string $name The relative distinhuished name of the leaf object
       * @param string $parent The distunguished name of the new parent object
       */
	  public function renameEntry( $dn, $name, $parent ) {

			 if( !ldap_rename( $this->handle, $dn, $name, $parent, true ) )
			     throw new OpenLDAPException( "Could not rename the requested object. " . $this->getError() );
	  }
	  /**
       * Deletes an LDAP object given its distinguished name.
       * 
       * @access public
       * @param string $dn The distinguished name to delete
       */
	  public function deleteEntry( $dn ) {

			 if( !ldap_delete( $this->handle, $dn ) )
			     throw new OpenLDAPException( "Could not delete the requested object. " . $this->getError() );
	  }
 	  /**
       * Deletes an LDAP object attribute given its distinguished name. attribute name and the value to be deleted
       * 
       * @access public
       * @param string $dn The distinguished name to delete
       * @param string $entry An array containing the attribute and value to delete
       */
	  public function deleteAttrib( $dn, $entry ) {

			 if( !ldap_mod_del( $this->handle, $dn, $entry ) )
			     throw new OpenLDAPException( "Could not delete the requested attribute. " . $this->getError() );
	  }
	  /**
	   * Moves an organizational unit and its siblings from one location to another in the directory
	   * 
	   * @access public
	   * @param string $old_dn The current distinguished name of the organizational unit to move
	   * @param string $new_dn The distinguished name of the object after its been moved
	   * @param string $hierarchyBase (Optional) The base string searched for in attributes which are hard linked to the dn (default $old_dn)
	   * @param string $newHierarchyBase (Optional) The new base string to replace attributes which are hard linked to the dn with (default $new_dn)
	   */
	  public function moveSubtree( $old_dn, $new_dn, $hierarchyBase=false, $newHierarchyBase=false ) {

             // Flag to perform a rename operation while moving
             $bRename = false;
             
             // Make sure the hierarchy base is defined, if not default it to the current dn
             if( !$hierarchyBase )
                  $hierarchyBase = $old_dn;

             // Make sure the hierarchy base is defined, if not default it to the new dn
             if( !$newHierarchyBase )
                 $newHierarchyBase = $new_dn;

             $filter = "(|(|(objectClass=organization)(objectClass=dcObject))(objectClass=organizationalUnit))";

             // Perform a search for all organizational units
	  	     if( !$result = ldap_search( $this->handle, $this->base, $filter, array() ) )
             	 return false;
             if( !$attrs = ldap_get_entries( $this->handle, $result ) ) {
             	 return false;
	         }

	         //  Rename the OU attribute if the name is going to change
             $pieces = explode( ",", $old_dn );
           	 $name = str_replace( "ou=", "", $pieces[0] );
           	 $newPieces = explode( ",", $new_dn );
           	 $newName = str_replace( "ou=", "", $newPieces[0] );
           	 if( $name != $newName )
           	     $bRename = true;

             // Look for the specified organizational unit to move
             $obj = array();

             // Rename the OU if the name is going to change
             for( $i=0; $i<$attrs['count']; $i++ ) {

             	  if( $bRename && $attrs[$i]['ou']['count'] )
             	      if( $attrs[$i]['ou'][0] == $name ) $attrs[$i]['ou'][0] = $newName;

                  // Store the object if this is the OU we are looking for
                  if( $attrs[$i]['dn'] == $old_dn || $attrs[$i]['dn'] == $new_dn )
                      $obj = $this->cleanObject( $attrs[$i] );
           	 }

             // Remove the DN from the object when submitting it to the add function, otherwise it will break the add with an invalid attribute type
             $objDn = array_pop( $obj );

             // Return if the OU couldnt be found
             if( !count( $obj ) ) return false;
 
	         // Add the OU to the new location
	         if( !$this->addEntry( $new_dn, $obj ) ) {
	             return false;
	         }

	         // List all child entries
	         if( !$sr = ldap_list( $this->handle, $objDn, "objectClass=*", array() ) ) return false;
	         if( !$data = ldap_get_entries( $this->handle, $sr ) ) return false;

	         // Move and delete all child entries
	         for( $i=0; $i<$data['count']; $i++ ) {

                  // Create new parent DN
   	              $pieces = explode( ",", $data[$i]['dn'] );
   	              $ouName = $pieces[0];
   	              $newParent = $ouName . "," . $new_dn;

                  // Perform recursive call to function if this child object is one of the container type objects
                  if( array_search( "organizationalUnit", $data[$i]['objectclass'] ) ) {
			          if( !$this->moveSubtree( $data[$i]['dn'], $newParent, $hierarchyBase, $newHierarchyBase ) ) return false;
                      continue;
                  }
                  if( array_search( "organization", $data[$i]['objectclass'] ) ) {
			          if( !$this->moveSubtree( $data[$i]['dn'], $newParent, $hierarchyBase, $newHierarchyBase ) ) return false;
                      continue;
                  }
                  if( array_search( "dcObject", $data[$i]['objectclass'] ) ) {
			          if( !$this->moveSubtree( $data[$i]['dn'], $newParent, $hierarchyBase, $newHierarchyBase ) ) return false;
                      continue;
                  }

                  // Replace attributes which depend strictly on the DN
                  for( $j=0; $j<$data[$i]['member']['count']; $j++ )
                       $data[$i]['member'][$j] = str_replace( $hierarchyBase, $newHierarchyBase, $data[$i]['member'][$j] );

                  // Clean the object attributes up for OpenLDAP
                  $obj = $this->cleanObject( $data[$i] );

             	  // Lose the DN attribute -- OpenLDAP no likey :(
             	  $objDn = array_pop( $obj );

	         	  // Add the leaf node to the new location
	         	  if( !$this->addEntry( $newParent, $obj  ) ) return false;

	         	  // Delete the leaf node
	         	  if( !ldap_delete( $this->handle, $objDn ) ) return false;
	         }

             // Delete the initial parent OU	         
	         if( !ldap_delete( $this->handle, $old_dn ) ) return false;

             // Return success to the requestee
             return true;
	  }
	  /**
	   * Deletes an organizational unit and its siblings
	   * 
	   * @access public
	   * @param string $dn The current distinguished name of the organizational unit to move
	   * @return Returns true if the entire subtree move was successful or false if any part of the move operation failed
	   */
	  public function deleteSubtree( $dn ) {

             // Flag to perform a rename operation while moving
             $bRename = false;
             
             $filter = "(|(|(objectClass=organization)(objectClass=dcObject))(objectClass=organizationalUnit))";

             // Perform a search for all organizational units
	  	     if( !$result = ldap_search( $this->handle, $this->base, $filter, array() ) )
             	 throw new OpenLDAPException( "Could not get a list of directory container objects." );

             if( !$attrs = ldap_get_entries( $this->handle, $result ) ) {
             	 throw new OpenLDAException( "Could not get a list of child objects for the base directory." );
	         }

             // Look for the specified organizational unit to move
             $obj = array();

             // Store the object being searched for
             for( $i=0; $i<$attrs['count']; $i++ )
                  if( $attrs[$i]['dn'] == $dn )
                      $obj = $this->cleanObject( $attrs[$i] );

             $objDn = array_pop( $obj );

             // Return if the OU couldnt be found
             if( !count( $obj ) ) throw new OpenLDAPException( "The requested distinguished name '" . $objDn . "' could not be located." );
 
	         // List all child entries
	         if( !$sr = ldap_list( $this->handle, $objDn, "objectClass=*", array() ) )
	             throw new OpenLDAPException( "Could not get a list of child objects for the requested distinguished name '" . $objDn . "'." );

	         if( !$data = ldap_get_entries( $this->handle, $sr ) )
	             throw new OpenLDAPException( "Could not get child entries for the requested distinguished name '" . $objDn . "'." ); 

	         // Eelete all child entries
	         for( $i=0; $i<$data['count']; $i++ ) {

                  // Perform recursive call to function if this child object is one of the container type objects
                  if( array_search( "organizationalUnit", $data[$i]['objectclass'] ) ) {

			          $this->deleteSubtree( $data[$i]['dn'] );
                      continue;
                  }
                  if( array_search( "organization", $data[$i]['objectclass'] ) ) {
			          $this->deleteSubtree( $data[$i]['dn'] );
                      continue;
                  }
                  if( array_search( "dcObject", $data[$i]['objectclass'] ) ) {
			          $this->deleteSubtree( $data[$i]['dn'] );
                      continue;
                  }

                  // Delete the sibling
	              if( !ldap_delete( $this->handle, $data[$i]['dn'] ) )
	                  throw new OpenLDAPException( "Could not delete child leaf object '" . $data[$i]['dn'] . "'." );
	         }

             // Delete the initial parent OU
	         if( !ldap_delete( $this->handle, $objDn ) )
	             throw new OpenLDAPException( "Could not delete the requested container object '" . $objDn . "'." );

             // Return success to the requestee
             return true;
	  }
	  /**
	   * Helper Function :: Cleans an LDAP object's attribute list after getting a result from ldap_get_entries. This
	   *                    method makes the array compatible for passing into an ldap_add call
	   * 
	   * @access private
	   * @param string $array The LDAP object array as received from ldap_get_entries
	   * @return An array containing the cleaned up attributes suitable for passing into ldap_add
	   */
	  public function cleanObject( $array ) {

             $obj = array();

	         // Loop through each of the attributes
             foreach( $array as $key => $value ) {

                      // Skip over the 'count' column and numbered columns - OpenLDAP no likey :(
                      if( $key == "count" || is_numeric( $key ) )
                           continue;

                      // Add the attribute name and value to the return array
                      if( !is_array( $value ) )
                          $obj[ $key ] = $value;

                      // Loop through multi-valued attributes
                      if( is_array( $value ) ) {

			  	 	      $a = array();
						  $z = 0;

                          foreach( $value as $key2 => $value2 ) {

                                   if( !is_numeric( $key2 ) ) continue;  // OpenLDAP no likey :(

                                       $obj[ $key ][$z] = $value2;
                                       $z++;
                                   }
                          } 
              }
              return $obj;
	  }
	  /**
	   * Helper Function :: Encrypts a password using the slappasswd MD5 hashing option
	   * 
	   * @access public
	   * @param string $password The password to encrypt
	   * @return An MD5 hash of the requested string
	   * 
	   * @todo Remove shell command and replace with OperatingSystem command so PHP can be run in safe mode
	   */
	  public function encryptPassword( $password ) {

             $pwd = shell_exec( "/usr/sbin/slappasswd -h {MD5} -s " . $password );
             if( !$pwd || $pwd == "" )
                 throw new OpenLDAPException( "Could not encrypt the requested password." );

             return $pwd;
      }
	  /**
	   * Helper Function :: Generates a random string (10-15 characters)
	   * 
	   * @access public
	   * @param string $password The password to encrypt
	   * @return 10-15 character random password
	   */
      public function getRandomPassword() {

      	     // Generate random character sets
             $pwd = "";
             $uchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
             $lchars = "abcdefghijklmnopqrstuvwxyz";
             $nums   = "0123456789";
             $schars = "!@#%^&*()-_+=?<>.~";
             $possibilities = array( $lchars, $uchars, $nums, /*$schars*/ );  // slappasswd no likey :(

             // Randomly pick out values from each of the character classes until a random length between 8 and 12 characters is reached
             for( $i=0; $i<rand( 10, 15 ); $i++ ) {

             	  $charclass = $possibilities[ rand( 0, 3 ) ];
             	  $pwd .= $charclass[ rand( 0, strlen( $charclass ) ) ];
             }

             return $pwd;
      }
      /**
       * Checks to see if a user exists
       * 
       * @access public
       * @param String $uid The uid LDAP attribute of the user to test
       * @return Boolean True if the user exists, false if they user does not
       */	
       public function userExists( $uid ) {

       	      if( !$user = $this->LDAPServer->getEntries( "(&(objectClass=virtualHostFrameworkAccount)(uid=" . $uid . ")", array( "dn" ) ) )
       	         return false;
       	      
       	      return true;
       }
	  /**
       * Unbinds from the LDAP context
       * 
       * @access public
       */
	  public function unbind() {

	         ldap_unbind( $this->handle );
	         $this->isBound = false;
	  }
	  /**
       * Closes the connection on the LDAP server
       * 
       * @access public
       */
	  public function close() {

	  	     ldap_close( $this->handle );
	  }
	  /**
       * Retrieves the last error number and message which the LDAP PHP library encountered
       * 
       * @access public
       * @return array Returns an associative array containing the 'code' and 'error' portions of the exception
       */
	  public function getError() {

	  	     return ldap_error( $this->handle );
	  }
}
?>