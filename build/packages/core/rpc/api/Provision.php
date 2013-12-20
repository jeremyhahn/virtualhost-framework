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
  * Provisioning Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.api
  */

class Provision implements iVirtualHostFrameworkAPI {

      var $namespace = "packages.core.rpc.api";
      var $class     = "Provisioning";
      var $version   = "1.0";

      var $LDAPServer;
      var $PolicyDTO;

      /**
       * The Provisioning constructor
       * 
       * @access public
       */
      public function Provision( PolicyDTO $PolicyDTO ) {

             $this->PolicyDTO  = $PolicyDTO;
             $this->LDAPServer =& Registry::getInstance()->get( "LDAPServer" );
      }
      /**
       * Adds LDAP attributes to a virtualHostFrameworkAccount as defined by the specified policy
       * 
       * @access public
       * @param String $policyId The identifier of the policy to apply to the specified account
       * @param String $uid The username of the account to which the specified policy is to be applied 
       * @return 
       */
      public function account() {

             /**
              * DEVELOPER NOTES: 
              *                  - With Billing -
              *                  The policyId needs to be the same value as a serviceId/orderId if a billing system is being used.
              *                  The billing system should return the serviceId/orderId identifier when a new service/order is created
              *                  for the specified account. This identifier is used as the relational id to link the provisioning policy
              *                  to the new service/order. There can be multiple provisioning policies for a specified service/order.
              * 
              *                 - W/O Billing -
              *                 The policyId is the identifier of the policy which should be applied to the specified account. 
              */

             // Define the attribute array which will be applied to the specified account
             $attrs = array();

             // Retreive the requested user account
             try {
             	    // Connect to the LDAP server
	                $this->LDAPServer->connect();
		
		            // Bind using the LDAP administration account
		            $this->LDAPServer->adminBind();

                    // Retreive user account
                    $user = $this->LDAPServer->getEntries( "(&(objectClass=virtualHostFrameworkAccount)(uid=" . $this->PolicyDTO->getUid() . "))", array( "uid", "dn" ) );

                    // Throw exception if the user was not found
	                if( !count( $user ) )
		                throw new virtualHostFrameworkAPIException( "Provisioning could not locate account for '" . $this->PolicyDTO->getUid() . "'." );

		            // Retreive the policies
		            $policies = $this->LDAPServer->getEntries( "(&(objectClass=virtualHostFrameworkPolicy)(policyId=" . $this->PolicyDTO->getPolicyId() . "))", array() );

		            // Define virtualHostFrameworkPolicy attributes; dont want these
		            $policyAttributes = array( "cn", "policyid", "policytype", "policycommand", "policyhost", "policystatus", "description", "objectclass" ); 

		            // Iterate through each of the policies
		            for( $i=0; $i<$policies['count']; $i++ ) {

		                       // Iterate through each of the policy attribute values
		                       foreach( $policies[$i] as $attributeName => $attributeValue ) {

                                        // Skip over policy objectClass attributes
				                        if( array_search( strtolower( $attributeName ), $policyAttributes ) !== false )
				                             continue;

                                        for( $j=0; $j<$policies[$i][$attributeName]['count']; $j++ )                                        	
                                        	 $attrs[ $attributeName ] = $attributeValue[$j];
		                       }
		            }
		            
		            // Add the attributes to the specified account
		            $this->LDAPServer->addAttrib( $user[0]['dn'], $attrs );

		            // Unbind from the directory context
	                $this->LDAPServer->unbind();

		            // Close the LDAP connection
		            $this->LDAPServer->close();

		            // Return success
                    return true;
				            
             }
             catch( virtualHostFrameworkLDAPException $LDAPEx ) {

	                // Unbind from the directory context
		            $this->LDAPServer->unbind();

		            // Close the LDAP connection
		            $this->LDAPServer->close();

                    // Throw the exception
             	    throw new virtualHostFrameworkAPIException( $LDAPEx->getMessage(), $LDAPEx->getCode() );
             }
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
	  	     return $this->$method( $params, $objError );
	  }

}
?>