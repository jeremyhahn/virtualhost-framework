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
  * Sudo API Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.api
  */

class Sudo implements iVirtualHostFrameworkAPI {

      var $namespace = "packages.core.api";
      var $class     = "Sudo";
      var $version   = "1.0";

      var $LDAPServer;

      /**
       * The group properties constructor
       * 
       * @access public
       */
	  public function Sudo() {

             $Registry         =& Registry::getInstance();
             $this->LDAPServer =& $Registry->get( "LDAPServer" );
	  }
      public function addRole( $params, $objError ) {

      	     $attrs = array();

             $attrs['cn'] = $params[1];

             if( strlen( $params[2] ) )
                $attrs['description'] = $params[2];

             $attrs['objectclass'][0] = "top";
             $attrs['objectclass'][1] = "sudoRole";

             // Add hosts
             if( strlen( $params[3] ) ) {

	             $pieces = explode( "|", $params[3] );
	             for( $i=0; $i<count( $pieces ); $i++ )
	                  $attrs['sudoHost'][$i] = $pieces[$i];
             }

             // Add users
             if( strlen( $params[4] ) ) {

	             $pieces = explode( "|", $params[4] );
	             for( $i=0; $i<count( $pieces ); $i++ )
	                  $attrs['sudoUser'][$i] = $pieces[$i];
             }

             // Add commands
             if( strlen( $params[5] ) ) {

	             $pieces = explode( "|", $params[5] );
	             for( $i=0; $i<count( $pieces ); $i++ )
	                  $attrs['sudoCommand'][$i] = $pieces[$i];
             }             

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Create the user account
             $this->LDAPServer->addEntry( $params[0], $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return success back to the client
             return true;
      }
      public function updateRole( $params, $objError ) {

      	     $attrs = array();

             // Description
             (strlen( $params[2] )) ? $attrs['description'] = $params[2] : $attrs['description'] = array();            

             // Add hosts
             $pieces = explode( "|", $params[3] );
             for( $i=0; $i<count( $pieces ); $i++ )
                  $attrs['sudoHost'][$i] = $pieces[$i];

             // Add users
             $pieces = explode( "|", $params[4] );
             for( $i=0; $i<count( $pieces ); $i++ )
                  $attrs['sudoUser'][$i] = $pieces[$i];

             // Add commands
             $pieces = explode( "|", $params[5] );
             for( $i=0; $i<count( $pieces ); $i++ )
                  $attrs['sudoCommand'][$i] = $pieces[$i];             

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Create the user account
             $this->LDAPServer->updateEntry( $params[0], $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return success back to the client
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