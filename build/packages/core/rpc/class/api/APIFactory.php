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
  * APIFactory Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.api
  */

require_once( "virtualHostFrameworkAPIException.php" );

abstract class APIFactory {

         var $namespace = "packages.core.rpc.classes.api";
         var $class     = "APIFactory";
         var $version   = "1.0";

         var $classpath;
         var $dto;

		  /**
		   * Returns an API object given its type
		   * NOTE: The API factory will automagically instantiate and map passed API
		   *       arguments formatted as JSON to a data type object for the requested API
		   *       if such a data type object has been configured :D
		   *       (the data type classpath needs to be present in the database)
		   * 
		   * @access public
		   * @param APIRequestDTO $APIRequestDTO The APIRequest data type object associated with the API request
		   * @return Object An instance of the requested API object (VHF supported singleton or stdclass).
		   */
	      public static function getInstance( APIRequestDTO $APIRequestDTO ) {

                 try {
	                   // The return value for the requested API
	                   $objAPI = null;

	                   // Connect to the LDAP server and search for the requested package type
	                   $APIRequestDTO->getLDAPServer()->connect();
	                   $APIRequestDTO->getLDAPServer()->adminBind();
	                   $filter = "(&(objectClass=virtualHostFrameworkPackage)(packagetype=" . $APIRequestDTO->getApiType() . "))";
	                   $attrs = array();
	                   $packages = $APIRequestDTO->getLDAPServer()->getEntries( $filter, $attrs );

                       if( !count( $packages ) ) throw new virtualHostFrameworkAPIException( "The requested API \"" . $APIRequestDTO->getApiType() . "\" could not be located." );

                       // Iterate through each of the located packages
	                   for( $i=0; $i<count( $packages); $i++ ) {

                            /*
                             *  TODO: Check member attribute of package for access control to requested API package
                             */

                            // Verify the requested API is configured to be active
                            if( strtolower( $packages[$i]['packagestatus'][0] ) !== "active"  )
                                throw new virtualHostFrameworkException( "The requested API \"" . $APIRequestDTO->getApiType() . "\" is disabled." );

			                // If the DTO path is defined, then we instantiate a new instance of the API's type hinted
			                // data type object and set its properties according to the defined JSON arguments
			                if( $packages[$i]['packagedto'][0] ) { 

                                // Passed arguments are formatted as JSON
                                $json = $APIRequestDTO->getArgs();

                                //if( !is_array( $json ) )
                                  //  throw new virtualHostFrameworkAPIException( "Invalid API request. Expected JSON encoded Data Type Object definition array. " );

                                // Load the DTO
			                    $DTO = $APIRequestDTO->getClassloader()->load( $packages[$i]['packagedto'][0] );

                                // Parse out the name of the Object
                                $pieces  = explode( ".", $packages[$i]['packagedto'][0] );
  	                            $fPath   = $_SERVER[ 'DOCUMENT_ROOT' ] . DIRECTORY_SEPARATOR . implode( DIRECTORY_SEPARATOR, $pieces ) . ".php";
  	                            $clsName = $pieces[ sizeof( $pieces )-1 ];
  	                            require_once( $fPath );
  	                            $cls = new ReflectionClass( $clsName );

		     			        // Define DTO property values according to JSON arguments
							    for( $j=0; $j<count( $json ); $j++ ) {

                                     // JSON format is 'name':'%propertyName%', '%propertyName%':'%value%'
                                     // Process the array element only once
                                     foreach( $json[$j] as $name => $value ) {

                                              // Set property value
                                              $setter = "set" . ucfirst( $json[$j]->$name );
                                              if( !$cls->hasMethod( $setter ) ) {	                                              	

                                          	      throw new virtualHostFrameworkAPIException( "APIFactory could not locate accessor method \"" . $setter . "\" for specified property \"" . $value . "\" in Data Type Object \"" . $clsName . "\"." );
                                          	      break;
                                              }
                                              $DTO->$setter( $json[$j]->$value );
     					          	          break;
                                     }
							    }
							    return $APIRequestDTO->Classloader->load( $packages[$i]['packageclasspath'][0], $DTO );
			                 }
			                 else {
 					                  // No DTO configured; Instantiate the requested API without passing any constructor arguments
			                          return $APIRequestDTO->Classloader->load( $packages[$i]['packageclasspath'][0] );
			                 }
	                   }
	               }
   				   catch( ReflectionException $REx ) {

                          throw new virtualHostFrameworkAPIException( "APIFactory Reflection Exception: " . $REx->getMessage() );
                   }
                   catch( Exception $ex ) {

         	              // The requested API was not found in the directory
	                      throw new virtualHostFrameworkAPIException( "APIFactory Unexpected Exception: " . $ex->getMessage() );
	               }
	      }
          /**
           * Singleton accessor method
           * NOTE: This method is required for API objects which are instantiated as a singleton instance. Please
           *       read the comments above regarding API classes which need to be instantiated as a singleton.
           * 
           * @access public
           *
           * public static abstract function getInstance();
           */
}
?>