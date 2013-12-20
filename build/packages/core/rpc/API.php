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
  * Virtual Host Framework API Listener Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc
  */

require_once( "class/api/virtualHostFrameworkAPIException.php" );

class API {

      var $namespace = "packages.core.rpc";
	  var $class     = "API";
	  var $version   = "1.0";

	  var $Registry;

      /**
       * The API Listener Constructor
       * 
       * @access public
       */
	  public function API() {

             $this->Registry =& Registry::getInstance();
	  }
      /**
       * Invokes the requested API method
       * 
       * @access public
       * @param array $params The API type, the method to invoke, followed by two javascript arrays which specify the
       *                      property names and values for the data type API object like so:
       *                      Array( propertyName1, propertyName2, etc... )
       *                      Array( propertyValue1, propertyValue2, etc... )
       * @param object $objError The JSON-RPC exception handling object
       */
	  function invoke( $params, $objError ) {

               try {
	                 // Create an API request data type object to pass to APIFactory
	           	     $objAPIRequestDTO = $this->Registry->get( "Classloader" )->load( "packages.core.rpc.class.dto.APIRequestDTO" );
			         $objAPIRequestDTO->setLDAPServer( $this->Registry->get( "LDAPServer" ) );
			         $objAPIRequestDTO->setClassloader( $this->Registry->get( "Classloader" ) );
			         $objAPIRequestDTO->setApiType( $params[0] );
	
	                 // JSON encoded arguments mean the requested API has a type hinted constructor
	                 // which requires a data type object to be passed when instantiating
	                 $json = json_decode( $params[2] );
	
	                 // Determine whether this API request needs a dynamic DTO mappting
	                 if( is_array( $json ) && is_object( $json[0] ) ) { 
	 
	                     // Define the API request arguments
	                     $objAPIRequestDTO->setArgs( $json );
	
	                     // Load the requested API
	                     $api = $this->Registry->get( "Classloader" )->load( "packages.core.rpc.class.api.APIFactory" ,$objAPIRequestDTO );
	                     if( $api ==null )
	                         throw new virtualHostFrameworkAPIException( "APIFactory returned null object for '" . $params[0] . "'" );
	
	                     // Invoke the requested method and return the result
	                     return $api->$params[1]();
	                 }
	                 else {
	
	                     // Create a new argument array to pass to requested API method
	                     // NOTE: The first and second arguments specify API type and method to invoke, so we start at index 2 here 
	                     $args = array();
	                     $count=0;
	                     for( $i=2; $i<count( $params ); $i++ ) {
	                 	      $args[$count] = $params[$i];
	                 	      $count++;
	                     }
	
	                     // Define APIFactory arguments property
	                     $objAPIRequestDTO->setArgs( null );
	
	                     // Load the requested API
	                     $api = $this->Registry->get( "Classloader" )->load( "packages.core.rpc.class.api.APIFactory" ,$objAPIRequestDTO );
	                     if( $api == null )
	                         throw new virtualHostFrameworkAPIException( "APIFactory returned null object for '" . $params[0] . "'" );
	
	                     // Invoke the requested API method, proxying through arguments and error handling object
	                     return $api->$params[1]( $args, $objError );
	                 }
			  }
			  catch( Exception $Ex ) {

				     throw new virtualHostFrameworkAPIException( $Ex->getMessage(), $Ex->getCode() );	
		      }
	  }
}
?>