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
  * Framework API Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.ui
  */

class Framework implements iVirtualHostFrameworkAPI {

      var $namespace = "packages.core.rpc.api";
      var $class     = "Framework";
      var $version   = "1.0";

      var $SQLServer;
      var $Config;
      var $Classloader;
      var $OSCommand;

      /**
       * The Framework constructor
       * 
       * @access public
       */
      public function Framework() {

      	     $Registry          =& Registry::getInstance();
      	     $this->LDAPServer  = $Registry->get( "LDAPServer" );
      	     $this->Classloader = $Registry->get( "Classloader" );
      	     $this->Config      = $Registry->get( "Config" );
      	     $this->OSCommand   = $Registry->get( "OSCommand" );
      }
      /**
       * Returns a multi-dimensional array of billable services and supported credit
       * card types which have been configured within an external billing system
       * 
       * @access public
       * @param array $params No arguments needed for this operation
       * @param object $objError The JSON-RPC exception handling object
       * @return Boolean True if a billing API is configured or false if a billing API has not been configured
       */
	  public function getBillableServices( $params, $objError ) {

             $billingAPI = null;

      	     try {

	   	            // Connect to the LDAP server and search for the requested package type
                   $this->LDAPServer->connect();
                   $this->LDAPServer->adminBind();
                   $filter = "(&(&(objectClass=virtualHostFrameworkPackage)(packagetype=billing))(packagestatus=active))";
                   $attrs = array();
                   $result = $this->LDAPServer->getEntries( $filter, $attrs );

                   if( !$result['count'] ) return false;

	               // Found a billing API
	               if( $result[0]['packageclasspath'] ) {

                       /**
                        *  Use the Virtual Host Framework APIFactory to load an instance of the Billing API
                        */

                       // Define the BillingDTO object to pass to Jbilling
                       $BillingDTO = $this->Classloader->load( "packages.core.rpc.class.dto.BillingDTO" );

                       // Create an API request data type object to pass to the APIFactory             
               	       $objAPIRequestDTO = $this->Classloader->load( "packages.core.rpc.class.dto.APIRequestDTO" );
		               $objAPIRequestDTO->setLDAPServer( $this->LDAPServer );
		               $objAPIRequestDTO->setClassloader( $this->Classloader );
		               $objAPIRequestDTO->setApiType( "BILLING" );
		               $objAPIRequestDTO->setArgs( null );

		               // Instantiate the billing API
		               $billingAPI = $this->Classloader->load( "packages.core.rpc.class.api.APIFactory", $objAPIRequestDTO );

		               // Authenticate the billing API user to start a session with the web service
		               if( !$billingAPI->authenticateAPIUser( $this->Config->get( "BILLING_USER" ), $this->Config->get( "BILLING_PASS" ) ) )
		                   throw new virtualHostFrameworkAPIException( "Failed to authenticate billing API account." );

                       // Get a list of all billable services
		               if( !$services = $billingAPI->getBillableServices() )
				           return false;

                       // Unbind from the directory context
                       $this->LDAPServer->unbind();

                       // Close the LDAP connection
                       $this->LDAPServer->close();
                       
                       // Get a list of supported credit card types
		               $cctypes = $billingAPI->getSupportedCreditCards();
	
		               // Return the services back to the client
				       return array( "services" => $services, "cctypes" => $cctypes );
	               }
	      	   }
	      	   catch( JbillingAPIException $JBEx ) {
	      	        
	      	          $this->LDAPServer->unbind();
	      	          $this->LDAPServer->close();
	      	          throw new virtualHostFrameworkAPIException( $JBEx->getMessage() );	
	      	   }
	      	   catch( Exception $ex ) {
	      	   	
	      	   	      $this->LDAPServer->unbind();
	      	   	      $this->LDAPServer->close();
	      	   	      throw new virtualHostFrameworkAPIException( $ex->getMessage() );
	      	   }

	      	   // Billing not installed or not properly configured
	      	   return false;
	  }
	  
	  /**
       * Returns boolean response for inquiry concerning installation status of a provisioning API
       * 
       * @access public
       * @param array $params No arguments needed for this operation
       * @param object $objError The JSON-RPC exception handling object
       * @return Boolean True if a provisioning API is configured or false if a provisioning API has not been configured
       */
	  public function getProvisionedServices( $params, $objError ) {

             try {
                   // Connect to the LDAP server and search for the requested package type
                   $this->LDAPServer->connect();
                   $this->LDAPServer->adminBind();

                   // Check to see if a provisioning API has been installed
                   $filter = "(&(&(objectClass=virtualHostFrameworkPackage)(packagetype=provisioning))(packagestatus=active))";
                   $provPackages = $this->LDAPServer->getEntries( $filter, array( "dn" ) );
                   if( !$provPackages['count'] ) return false;

                   // Get a list of configured provisioning policies
                   $attrs        = array( "policyid", "cn" );
                   $filter = "(&(&(objectClass=virtualHostFrameworkPolicy)(policytype=provisioning))(policystatus=active))";
                   $provPolicies = $this->LDAPServer->getEntries( $filter, $attrs );

                   if( !$provPolicies['count'] ) return false;

                   // Clean up                   
                   $this->LDAPServer->unbind();
                   $this->LDAPServer->close();

                   // Return the result
                   return $provPolicies;
             }
      	     catch( Exception $ex ) {

      	   	        $this->LDAPServer->unbind();
      	   	        $this->LDAPServer->close();
      	   	        throw new virtualHostFrameworkAPIException( $ex->getMessage() );
      	     }

      	     return false;
	  }
	  /**
	   * Returns boolean response regarding username availability
	   * 
	   * @access public
	   * @param String $username The username to check the availability of
	   * @return Boolean True if the username does NOT exist, or false if the user DOES exist
	   */
	  public function getUsernameAvailability( $username ) {

	  	     // Check LDAP server
             $this->LDAPServer->connect();
             $this->LDAPServer->adminBind();
             $filter = "(&(objectClass=virtualHostFrameworkAccount)(uid=))";
             $attrs = array( "dn" );
             $accts = $this->LDAPServer->getEntries( $filter, $attrs );

             // Found an account
             if( count( $accts ) ) return false;

             // Username does not exist in LDAP
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
	  	     return $this->$method( $params, $objError );
	  }
}
?>