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
  * Account API Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.ui;
  */

class Account implements iVirtualHostFrameworkAccount {

      var $namespace = "packages.core.rpc.ui";
      var $class     = "Account";
      var $version   = "1.0";

      var $LDAPServer;
      var $AccountDTO;

      /**
       * The Account constructor
       * 
       * @access private
       * @param AccountDTO $Account A Virtual Host Framework Account Data Type Object populated with the data necessary to fultill this request
       * @return void
       */
	  public function Account( AccountDTO $Account ) {

             $this->LDAPServer =& Registry::getInstance()->get( "LDAPServer" );
             $this->AccountDTO = $Account;
	  }
	  /**
	   * Authenticates a login attempt to the backend LDAP server
       * 
       * @access public
       * @param array $params The login and password to authenticate
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns an array of user attributes as given from ldap_get_entries
       */
	  public function authenticate() {

             // Establish a connection with the ldap server
             $this->LDAPServer->connect();

             // Bind using the virtual host framework ldap administrative account
             $this->LDAPServer->adminBind();

             // Filter for the user account name and return all of the attributes for this account             	
             $filter = "cn=" . $this->AccountDTO->getCn();
             $attrs = array();

             // Perform the search
             $arrResult = $this->LDAPServer->getEntries( $filter, $attrs );

             // Throw an error if more than one user account was located
             if( $arrResult[ 'count' ] > 1 )
                 throw new virtualHostFrameworkLDAPException( "More than one account was located with the specified username. Please contact contact your support team concerning this error." );

             // Bind using the retrieved distinguished name and authenticate the username with the provided password
             $this->LDAPServer->authBind( $arrResult[0]['dn'], $this->AccountDTO->getUserPassword() );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the connection to the LDAP server
             $this->LDAPServer->close();

             // Throw an application error if the user account is disabled
             if( $arrResult[0]['accountstatus'][0] == "disabled" )
                 throw new virtualHostFrameworkException( "Your account is currently disabled. Please contact support for more information." );

             // Return the array of account attributes
             return $arrResult[0];
      }
      /**
	   * Creates a user account in the specified directory location
       * 
       * @access public
       * @param array $params The required user attributes (see source code for addAccount method for exact details on arguments)
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns true on success or throws an exception on failure
       */
      public function addAccount() {

             // Check LDAP server to make sure user does not already exist
             $this->LDAPServer->connect();
             $this->LDAPServer->adminBind();
             $filter = "(&(objectClass=virtualHostFrameworkAccount)(uid=" . $this->AccountDTO->getUid() . "))";
             $attrs = array();
             $vhfusers = $this->LDAPServer->getEntries( $filter, $attrs );
             // The user already exists
             if( $vhfusers['count'] ) Registry::getInstance()->get( "ExceptionHandler" )->HandleException( new Exception( "Username already exists. Please choose a different username.", 0 ) );

             // Define variable to store the users LDAP attributes
             $attrs = array();

             // Initalize needed objects stored in the framework registry
             $Registry  =& Registry::getInstance();
             $SQLServer =& $Registry->get( "SQLServer" );
             $Config    =& $Registry->get( "Config" );
             $OSCommand =& $Registry->get( "OSCommand" );

             // Add each of the AccountDTO properties 
             foreach( get_object_vars( $this->AccountDTO ) as $property => $value ) {

                      if( $property == "dn" ) // LDAP no likey :(
                          continue;

                      if( $value )
                          $attrs[ $property ] = $value;
             }

             // Assign default attribute values
             $attrs['accountStatus'] = "disabled";
             $attrs['accountRole']   = "User";
             $attrs['loginShell']    = $Config->get( "VHF_SHELL" );

             // Define the required object classes for the account
             $attrs['objectClass'][0] = "top";
      	     $attrs['objectClass'][1] = "virtualHostFrameworkAccount";
      	     $attrs['objectClass'][2] = "posixAccount";
      	     $attrs['objectClass'][3] = "inetOrgPerson";

             // Generate a random password
             if( !$password = $this->LDAPServer->getRandomPassword() )
                 throw new virtualHostFrameworkLDAPException( "Could not obtain a password from random password generator." );

             // Encrypt the password and add it to the users attributes
      	     if( !$attrs['userPassword'] = $this->LDAPServer->encryptPassword( $password ) )
      	         throw new virtualHostFrameworkLDAPException( "Could not encrypt password for new user account." );

      	     // Get the next assignable user id from the system table in the sqlite database table 
             if( !$result = $SQLServer->query( "SELECT * FROM system WHERE name='LDAP_NEXT_UID';" ) )
                 throw new virtualHostFrameworkSQLException( "Could not obtain a new user ID for the new user." );

             // Get the SQL result
             $row = $result->fetch();

             // Add the posix user id number
             $attrs['uidNumber'] = $row['value']; 

             // Increment the LDAP_NEXT_UID value so its ready for the next user
             $SQLServer->query( "UPDATE system SET value='" . (($row['value'])+1) . "' WHERE name='LDAP_NEXT_UID';" );

             // Get the virtual host framework 'virtual user' gid to assign to the account
             $attrs['gidNumber'] = $Config->get( "VHF_GID" );

             // Assign the home directory
             if( !$attrs['homeDirectory'] )
                  $attrs['homeDirectory'] = $Config->get( "VHF_HOME" ) . $attrs['uidNumber'];

             // Assign the courier mail message store attribute
             $attrs['mailMessageStore'] = $Config->get( "VHF_HOME" ) . $attrs['uidNumber'] . DIRECTORY_SEPARATOR . "Maildir";

             // Assign the ftp root
             $attrs['ftpRoot'] = $Config->get( "VHF_HOME" ) . $attrs['uidNumber'] . DIRECTORY_SEPARATOR . "www";

             // Create user account based on the location in the directory where the requested action took place (system|hosting|ftp)
             $hostingBase = $Config->get( "LDAP_HOSTING_BASE" );
             $contextBase = str_replace( "cn=" . $attrs['cn'] . ",", "", $this->AccountDTO->getDn() ); 
             if( $contextBase == $hostingBase || !$this->AccountDTO->getDn() ) {

                 // Create a new organizational usit for this user under the hosting subtree	               
	             $OuBase                    = "ou=" . $attrs['uidNumber'] . "," . $Config->get( "LDAP_HOSTING_BASE" );
	             $OuAttrs['ou']             = $attrs['uidNumber'];
	             $OuAttrs['objectclass'][0] = "top";
	             $OuAttrs['objectclass'][1] = "organizationalUnit";

                 // Create base organizational unit for the new hosting account
                 try {
                        $this->LDAPServer->addEntry( $OuBase, $OuAttrs );
                 }
                 catch( virtualHostFrameworkLDAPException $LDAPEx ) { 

                        throw new virtualHostFrameworkAPIException( "Could not create bsae ou object: $OuBase" . " for new user account.<hr>Details:<br>" . $this->LDAPServer->getError() );
                 }
                 // Create the new distinguished name for the new account
                 $dn = "cn=" . $attrs['cn'] . "," . $OuBase;
             }
             // The context of the request took place outside of the hosting container
             else if( strpos( $this->AccountDTO->getDn(), $Config->get( "LDAP_HOSTING_BASE" ) ) === false ) {

                  // Create the account in the context of the directory where the request took place
                  $dn = $this->AccountDTO->getDn();
             }
             // The context of the request took place within the hosting container
             else {

                  // Set up FTP user here
                  $dn = $this->AccountDTO->getDn();
             }

             // Create the user account
             try {
             	   $this->LDAPServer->addEntry( $dn, $attrs );
             }
             catch( virtualHostFrameworkLDAPException $LDAPEx ) {
                                 	
                    throw new virtualHostFrameworkAPIException( "Could not create new user account.<hr>Details:<br>" . $LDAPEx->getMessage() . "<br>" . $this->LDAPServer->getError() . "<br>" . $dn, $LDAPEx->getCode() );
             }
             /**
               * Create home directory and Maildir for new user (home directory should be auto-created by ldap profile upon login)
               */

             // Get the administrative user distinguished name
             if( !$admin_dn = $this->LDAPServer->getDistinguishedName( $Config->get( "VHF_ADMIN" ) ) )
                 throw new virtualHostFrameworkException( "Could not get the virtual administrative account distinguished name.<hr>Details:<br>" . $this->LDAPServer->getError() );

             // Unbind from the directory context - all done with ldap
             $this->LDAPServer->unbind();

             // Close LDAP connection
             $this->LDAPServer->close();

             // Create the home directory and maildir
             $OSCommand->createMailDirectory( $attrs['uidNumber'], $attrs['mailboxQuota'] . "S" );

             /**
              * Send welcome email to the users email address
              */
              if( !imap_mail( $attrs['mail'], "Virtual Host Framework Registration", "Username: " . $attrs['cn'] . "\nPassword: " . $password ) )
                  throw new virtualHostFrameworkException( "Could not send welome email to the new user's email address." ); 

             // Return result
             if( $attrs['serviceId'] )
                 return array( "serviceId" => $attrs['serviceId'] );

             return true;
      }
      /**
       * Sets a users password in the directory 
	   * 
	   * @type member
	   * @param method $method The method to invoke
	   * @param array $params An array of arguments to pass into the method
	   * @param object $objError The JSON RPC error handling object
	   */
      public function setPassword() {

      	     // Let the LDAP server encrypt and return the attribute array
      	     // NOTE: Makes this class directory server independant and allows the dynamics to take place in the LDAP object
      	     if( !$attrs['userPassword'] = $this->LDAPServer->encryptPassword( $this->AccountDTO->getUserPassword() ) )
      	         throw new virtualHostFrameworkLDAPException( "Could not encrypt the requested password." );

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Update the password attribute
             $this->LDAPServer->updateEntry( $this->AccountDTO->getDn(), $attrs );

             // Unbind from the directory server
             $this->LDAPServer->unbind();

             // Close the ldap connection
             $this->LDAPServer->close();

             // Return success to the client
             return true;
      }
      /**
	   * Deletes a user account from the system
       * 
       * @access public
       * @param array $params The required user attributes (see source code for addAccount method for exact details on arguments)
       * @param object $objError The JSON-RPC exception handling object
       * @return array Returns true on success or throws an exception on failure
       */
	  /**
       * Destroys the current session and cleans up the connection
       * 
       * @access public
       * @return string $username The username to register the current session to
       */
	  public function logout() {

             /**
              * TODO: Close database connection, ldap connection, etc.
              */

	  	     session_unset( session_id() );
	  	     session_destroy();

	  	     if( $this->LDAPServer->isBound )
	  	         $this->LDAPServer->unbind();

	  	      // Close the handle to the ldap connection
	  	     $this->LDAPServer->close();
	  }
}
?>