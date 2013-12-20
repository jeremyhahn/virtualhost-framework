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
  * Linux Operating System Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.operating.system
  */

// Include the Linux command exception class
require_once( "LinuxCommandException.php" );

class OSCommand implements ivirtualHostFrameworkOSCommand {

      var $namespace = "packages.core.rpc.class.operating.system";
      var $class     = "OSCommand";
      var $version   = "1.0";

      var $Encryption;
      var $LDAPServer;
      var $Config;
      var $SSHClient;

      /**
       * The Linux operating system constructor
       * 
       * @access public
       */
	  public function OSCommand( OSCommandDTO $OSCommandDTO ) {

             // Initalize required framework objects
             $this->Encryption = $OSCommandDTO->getEncryption();
             $this->LDAPServer = $OSCommandDTO->getLDAPServer();
             $this->Config     = $OSCommandDTO->getConfig();             
             $this->SSHClient  = $OSCommandDTO->getSSHClient();
      }
      /**
       * Returns the uptime of the local server
       * 
       * @access public
       * @return Returns the uptime of the local server on success, false on error
       */
      public function getUptime() {

      	     // Connect to the ssh server
      	     $this->SSHClient->connect( "localhost", 22 );      	         

             // Authenticate to the ssh server
	         $this->SSHClient->authenticate( $this->Config->get( "VHF_ADMIN" ), $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $this->Config->get( "VHF_PASS" ) ) )  );

	         // Execute the uptime command and store the output buffer
	         $this->SSHClient->execute( "uptime" );
             $uptime = $this->SSHClient->read();

             // Log out of the session
             $this->SSHClient->execute( "exit" );

			 // Close the connection
			 $this->SSHClient->close();

             // Return the uptime
	         return $uptime;
      }
      /**
	   * Returns the hostname of the local server
	   * 
	   * @access public
	   * @return Returns the hostname string on success or false on error
	   */
	  public function getHostname() {

      	     // Connect to the ssh server
      	     $this->SSHClient->connect( "localhost", 22 );

             // Authenticate to the ssh server
	         $this->SSHClient->authenticate( $this->Config->get( "VHF_ADMIN" ), $password = $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $this->Config->get( "VHF_PASS" ) ) )  );

	         // Execute the hostname command
	         $this->SSHClient->execute( "hostname" );

             // Read the response from the ssh socket
             $hostname = $this->SSHClient->read();

             // Log out of the session
             $this->SSHClient->execute( "exit" );

			 // Close the connection
			 $this->SSHClient->close();

             // Return the hostname
	         return $hostname; 	
	  }
	  /**
	   * Returns a list of IP addresses which have been configured on the local machine
	   * 
	   * @access public
	   * @return Returns an array of IP addresses configured on the local machine or false on error
	   */
	  public function getIpAddresses() {

	    	 // Connect to the ssh server
      	     $this->SSHClient->connect( "localhost", 22 );

             // Authenticate to the ssh server
	         $this->SSHClient->authenticate( $this->Config->get( "VHF_ADMIN" ), $password = $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $this->Config->get( "VHF_PASS" ) ) )  );

	         // Execute the ifconfig command
	         $this->SSHClient->execute( "ifconfig" );

             // Read the response from the ssh socket
             $ifconfig = $this->SSHClient->read();
             
             // Log out of the session
             $this->SSHClient->execute( "exit" );

			 // Close the connection
			 $this->SSHClient->close();

             // Extract the IP address from each of the local network interfaces
             preg_match_all( "/inet\saddr:([0-9]{1,3}[\.][0-9]{1,3}[\.][0-9]{1,3}[\.][0-9]{1,3})/im", $ifconfig, $ips );

             // Return the ip address array
	         if( count( $ips[1] ) )
	             return $ips[1];

             // Couldnt find the requested information
             throw new LinuxCommandException( "Could not retreive a locally configured IP addresses" );
	  }
	  /**
	   * Creates a new home directory. NOTE: This procedure simply logs into an SSH shell assuming that LDAP
	   * has been configured to automagically create the users home directory upon first successful login.
	   * 
	   * @access public
	   * @param string $username The username of the account who will own the home directory
	   * @param string $password The password used to authenticate the specified username
	   * @return void
	   */
	  public function createHomeDirectory( $username, $password ) {

	         // Establish an ssh connection to the local machine
	         $this->SSHClient->connect( "localhost", 22 );

	         // Log in as the user who will be owning the home directory
			 $this->SSHClient->authenticate( $username, $password );
			 $this->SSHClient->read();

			 // NOTE: Home directory should be created upon successful login by LDAP profile

             // Log out of the session
             $this->SSHClient->execute( "exit" );

			 // Close the connection
			 $this->SSHClient->close();
	  }
	  /**
	   * Blows away a users home directory
	   * 
	   * @access public
	   * @param integer $uid The posixAccount uidNumber of the account to blow away the home directory
	   * @return void
	   */
	  public function deleteHomeDirectory( $uidNumber ) {

             // Make sure the requested directory is a virtual host framework account directory
             // NOTE: This is a primitive check and will not work in existing environments
             //       where administrators have assigned postix id's as home directory names
             if( !is_numeric( $uidNumber ) )
                 throw new LinuxCommandException( "Invalid uidNumber specified for OSCommand task." );

	         // Establish an ssh connection to the local machine
	         $this->SSHClient->connect( "localhost", 22 );

	         // Log in as the virtual host framework admin account and delete the directory
	         $this->SSHClient->authenticate( $this->objConfig->get( "VHF_ADMIN" ), $objCrypt->decrypt_aes_256( $objCrypt->decode( $this->objConfig->get( "VHF_PASS" ) ) ) );

             // Define the command
             $command = "sudo /bin/rm -rf " . $this->objConfig->get( "VHF_HOME" ) . $uidNumber;
             
             // Define the sudo command attribute
             $attr['sudoCommand'] = $command;

             // Connect to the LDAP server
             $this->LDAPServer->connect();
             
             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Get the administrative user distinguished name
             $admin_dn = $this->LDAPServer->getDistinguishedName( $this->Config->get( "VHF_ADMIN" ) );

             // Add the new sudo command to the virtual admin account
             $this->LDAPServer->addAttrib( $admin_dn, $attr );

	         // Delete the home directory as the virutal host framework LDAP administrative account
	         $this->SSHClient->execute( $command );
	         $this->SSHClient->read();

             // Log out of the session
             $this->SSHClient->execute( "exit" );

	         // Close the SSH connection
	         $this->SSHClient->close();
	         
	         // Delete the sudo attribute from the virtual admin account
	         $this->LDAPServer->deleteAttrib( $admin_dn, $attr );

	         // Unbind from the LDAP directory context
	         $this->LDAPServer->unbind();
	         
	         // Close the LDAP connection
	         $this->LDAPServer->close();
	  }
	  /**
	   * Creates a maildir directory, assigns quota, and sets the $uid as the owner the mail directory
	   * 
	   * @access public
	   * @param integer $uid The posix uidNumber of the account which the maildir is being created
	   * @param string $quota The quota for the new directory (must be formatted as postfix/courier like -- 20000S
	   * @return void
	   */
	  public function createMailDirectory( $uidNumber, $quota ) {

             // Make sure the requested directory is a virtual host framework account directory
             // NOTE: This is a primitive check and will not work in existing environments
             //       where administrators have assigned  postix id's as home directory names
             if( !is_numeric( $uidNumber ) )
                 throw new LinuxCommandException( "Invalid uidNumber specified for OSCommand task." );

             // Define the home and mail directories
             $homeDir = $this->Config->get( "VHF_HOME" ) . $uidNumber;
             $mailDir = $homeDir . DIRECTORY_SEPARATOR . "Maildir";

             // Define the commands which need to be run to create the directories
             $attr['sudoCommand'][0] = "/bin/mkdir -p " . $homeDir;
             $attr['sudoCommand'][1] = "/bin/chown -R " . $uidNumber . ":" . $this->Config->get( "VHF_GID" ) . " " . $homeDir;
             $attr['sudoCommand'][2] = "/bin/mkdir -p " . $homeDir . DIRECTORY_SEPARATOR . "www";
             $attr['sudoCommand'][3] = "/usr/bin/maildirmake " . $mailDir;
             $attr['sudoCommand'][4] = "/usr/bin/maildirmake -q " . $quota . " " . $mailDir;
             $attr['sudoCommand'][5] = "/usr/bin/maildirmake -f Trash " . $mailDir;
             $attr['sudoCommand'][6] = "/usr/bin/maildirmake -f Sent " . $mailDir;
             $attr['sudoCommand'][7] = "/usr/bin/maildirmake -f Drafts " . $mailDir;
             $attr['sudoCommand'][8] = "/bin/chmod -R 760 " . $mailDir;

             // Define the virtual host framework administrative account and password
             $admin = $this->Config->get( "VHF_ADMIN" );
             $pass  = $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $this->Config->get( "VHF_PASS" ) ) );

             // Connect to the LDAP server
             $this->LDAPServer->connect();
             
             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Get the administrative user distinguished name
             $admin_dn = $this->LDAPServer->getDistinguishedName( $this->Config->get( "VHF_ADMIN" ) );

             // Add the new sudo commands to the virtual admin account
             $this->LDAPServer->addAttrib( $admin_dn, $attr );

             // Establish the ssh connection to the local machine
	         $this->SSHClient->connect( "localhost", 22 );

	         // Authenticate as the virtual host framework admin account
	         $this->SSHClient->authenticate( $admin, $pass );

             // Execute each of the required privileged commands
             $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][0] );
             $this->SSHClient->read();
             $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][1] );
             $this->SSHClient->read();
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][2] );
	         $this->SSHClient->read();
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][3] );
	         $this->SSHClient->read();
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][4] );
	         $this->SSHClient->read();
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][5] );
	         $this->SSHClient->read();
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][6] );
	         $this->SSHClient->read();
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][7] );
	         $this->SSHClient->read();
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][8] );
	         $this->SSHClient->read();

             // Log out of the session
	         $this->SSHClient->execute( "exit" );

             // Close the SSH connection
	         $this->SSHClient->close();

	         // Delete the sudo attributes from the virtual admin account
	         $this->LDAPServer->deleteAttrib( $admin_dn, $attr );

             // Unbind from the directory context
	         $this->LDAPServer->unbind();

	         // Close the LDAP connection
	         $this->LDAPServer->close();
	  }	  
	  /**
	   * Blow away a user account Maildir
	   * 
	   * @access public
	   * @param integer $admin_dn The distinguished name of the administrative account to perform the operation
	   * @return void
	   */
	  public function deleteMailDirectory( $uidNumber ) {

             // Make sure the requested directory is a virtual host framework account directory
             // NOTE: This is a primitive check and will not work in existing environments
             //       where administrators have assigned postix id's as home directory names
             if( !is_numeric( $uidNumber ) )
                 throw new LinuxCommandException( "Invalid uidNumber specified for OSCommand task." );

             // Define the sudo command
             $attr['sudoCommand'][0] = "/bin/rm -rf " . $this->Config->get( "VHF_HOME" ) . $uidNumber;

             // Connect to the LDAP server
             $this->LDAPServer->connect();
             
             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Get the administrative user distinguished name
             $admin_dn = $this->LDAPServer->getDistinguishedName( $this->Config->get( "VHF_ADMIN" ) );

             // Add the new sudo command to the virtual admin account
             $this->LDAPServer->addAttrib( $admin_dn, $attr );

	         // Establish an ssh connection to the local machine
	         $this->SSHClient->connect( "localhost", 22 );

	         // Log in as the virtual host framework admin account and delete the directory
	         $this->SSHClient->authenticate( $this->Config->get( "VHF_ADMIN" ), $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $this->Config->get( "VHF_PASS" ) ) ) );

	         // Delete the home directory as the virutal host frameowrk LDAP administrative account
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][0] );

	         // Log out from the session
	         $this->SSHClient->execute( "exit" );

	         // Close the connection
	         $this->SSHClient->close();

	         // Delete the sudo attribute from the virtual admin account
	         $this->LDAPServer->deleteAttrib( $admin_dn, $attr );

	         // Unbind from the directory context
	         $this->LDAPServer->unbind();

	         // Close the LDAP connection
	         $this->LDAPServer->close();
	  }
	  /**
	   * Creates a website directory and makes the specified user the owner of the directory
	   * 
	   * @access public
	   * @param integer $uid The posix uidNumber of the account which the maildir is being created
	   * @param string $domain The domain nmae of the website directory to be created
	   * @return void
	   */
	  public function createWebDirectory( $uidNumber, $domain ) {

             // Make sure the requested directory is a virtual host framework account directory
             // NOTE: This is a primitive check and will not work in existing environments
             //       where administrators have assigned  postix id's as home directory names
             if( !is_numeric( $uidNumber ) )
                 throw new LinuxCommandException( "Invalid uidNumber specified for OSCommand task." );
              
             // Define the home and mail directories
             $docroot = $this->Config->get( "VHF_HOME" ) . $uidNumber . DIRECTORY_SEPARATOR . "www" . DIRECTORY_SEPARATOR . $domain . DIRECTORY_SEPARATOR . "htdocs";

             // Define the commands which need to be run to create the directories
             $attr['sudoCommand'][0] = "/bin/mkdir -p " . $docroot;
             $attr['sudoCommand'][1] = "/bin/chown -R " . $uidNumber . ":" . $this->Config->get( "VHF_GID" ) . " " . $this->Config->get( "VHF_HOME" ) . $uidNumber . DIRECTORY_SEPARATOR . "www" . DIRECTORY_SEPARATOR . $domain;
             $attr['sudoCommand'][2] = "/bin/chmod -R 755 " . $docroot;

             // Define the virtual host framework administrative account and password
             $admin = $this->Config->get( "VHF_ADMIN" );
             $pass  = $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $this->Config->get( "VHF_PASS" ) ) );

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Get the administrative user distinguished name
             $admin_dn = $this->LDAPServer->getDistinguishedName( $this->Config->get( "VHF_ADMIN" ) );

             // Add the new sudo commands to the virtual admin account
             $this->LDAPServer->addAttrib( $admin_dn, $attr );

             // Establish the ssh connection to the local machine
	         $this->SSHClient->connect( "localhost", 22 );

	         // Authenticate as the virtual host framework admin account
	         $this->SSHClient->authenticate( $admin, $pass );

             // Execute each of the required privileged commands
             $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][0] );
             $this->SSHClient->read();
             $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][1] );
             $this->SSHClient->read();
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][2] );
	         $this->SSHClient->read();

             // Log out of each of the sessions
	         $this->SSHClient->execute( "exit" );

             // Close the SSH connection
	         $this->SSHClient->close();

	         // Delete the sudo attributes from the virtual admin account
	         $this->LDAPServer->deleteAttrib( $admin_dn, $attr );

	         // Unbind from the directory context
	         $this->LDAPServer->unbind();

	         // Close the LDAP connection
	         $this->LDAPServer->close();
	  }
	  /**
	   * Deletes a website directory and all of its contents 
	   * 
	   * @access public
	   * @param integer $uid The posix uidNumber of the account which the maildir is being created
	   * @param string $domain The domain nmae of the website directory to be created
	   * @return void
	   */
	  public function deleteWebDirectory( $uidNumber, $domain ) {

             // Make sure the requested directory is a virtual host framework account directory
             // NOTE: This is a primitive check and will not work in existing environments
             //       where administrators have assigned postix id's as home directory names
             if( !is_numeric( $uidNumber ) )
                 throw new LinuxCommandException( "Invalid uidNumber specified for OSCommand task." );

             // Define the sudo command
             $attr['sudoCommand'][0] = "/bin/rm -rf " . $this->Config->get( "VHF_HOME" ) . $uidNumber . DIRECTORY_SEPARATOR . "www" . DIRECTORY_SEPARATOR . $domain;

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Get the administrative user distinguished name
             $admin_dn = $this->LDAPServer->getDistinguishedName( $this->Config->get( "VHF_ADMIN" ) );

             // Add the new sudo commands to the virtual admin account
             $this->LDAPServer->addAttrib( $admin_dn, $attr );

	         // Establish an ssh connection to the local machine
	         $this->SSHClient->connect( "localhost", 22 );

	         // Log in as the virtual host framework admin account and delete the directory
	         $this->SSHClient->authenticate( $this->Config->get( "VHF_ADMIN" ), $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $this->Config->get( "VHF_PASS" ) ) ) );

	         // Delete the home directory as the virutal host frameowrk LDAP administrative account
	         $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][0] );
	         $this->SSHClient->read();

	         // Log out from the session
	         $this->SSHClient->execute( "exit" );

	         // Close the connection
	         $this->SSHClient->close();

	         // Delete the sudo attribute from the virtual admin account
	         $this->LDAPServer->deleteAttrib( $admin_dn, $attr );

	         // Unbind from the directory context
	         $this->LDAPServer->unbind();

	         // Close the LDAP connection
	         $this->LDAPServer->close();
	  }
	  /**
	   * Issues an Apache2 graceful command using the apache2ctl script locates at /usr/sbin/apache2ctl
	   * 
	   * @access public
	   * @return void
	   */
	  public function apache2Graceful() {

	  	     // Define the commands which need to be run to create the directories
             $attr['sudoCommand'][0] = "/usr/sbin/apache2ctl graceful";

             // Define the virtual host framework administrative account and password
             $admin = $this->Config->get( "VHF_ADMIN" );
             $pass  = $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $this->Config->get( "VHF_PASS" ) ) );

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Get the administrative user distinguished name
             $admin_dn = $this->LDAPServer->getDistinguishedName( $this->Config->get( "VHF_ADMIN" ) );

             // Add the new sudo commands to the virtual admin account
             $this->LDAPServer->addAttrib( $admin_dn, $attr );

             // Establish the ssh connection to the local machine
	         $this->SSHClient->connect( "localhost", 22 );

	         // Authenticate as the virtual host framework admin account
	         $this->SSHClient->authenticate( $admin, $pass );

             // Execute each of the required privileged commands
             $this->SSHClient->execute( "sudo " . $attr['sudoCommand'][0] );
             $this->SSHClient->read();

             // Log out of each of the session
             $this->SSHClient->execute( "exit" );

             // Close the SSH connection
	         $this->SSHClient->close();

	         // Delete the sudo attributes from the virtual admin account
	         $this->LDAPServer->deleteAttrib( $admin_dn, $attr );

	         // Unbind from the directory context
	         $this->LDAPServer->unbind();

	         // Close the LDAP connection
	         $this->LDAPServer->close();
	  }
}
?>