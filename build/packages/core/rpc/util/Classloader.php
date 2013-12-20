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
  * Classloader Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.util
  */
class Classloader {

	  var $namespace = "packages.core.rpc.util";
	  var $class     = "Classloader";
	  var $version   = "1.0";

      /**
	    * The Classloader constructor
	  */
      function Classloader() {
      }
      /**
	   * Loads and instantiates the requested module using its namespace dot syntax
	   * @param string $class The class to load using its namespace dot syntax
	   * @param array The arguments to pass to the class while instantiating
	   * @return object The requested instantiated object
	   */
      function load( $class, $obj ) {

      	       $arrPath = explode( ".", $class );
      	       $fPath   = $_SERVER[ 'DOCUMENT_ROOT' ] . DIRECTORY_SEPARATOR . implode( DIRECTORY_SEPARATOR, $arrPath ) . ".php";
      	       $name    = $arrPath[ sizeof( $arrPath )-1 ];
      	       require_once( $fPath );

               // Use reflection to load the class based on its type (singleton|stdclass)
               $cls = new ReflectionClass( $name );
               try {
               	     // Check for supported Virtual Host Framework singleton object constructor
		             if( $cls->getMethod( "getInstance" ) && $cls->getMethod( "getInstance" )->isPublic() ) {

                         // Invoke the getInstance() singleton method
                         return ($obj==null) ? $cls->getMethod( "getInstance" )->invoke( null ) : $cls->getMethod( "getInstance" )->invoke( null, $obj );
		             }
               }
               catch( ReflectionException $REx ) {

                      // Use new keyword to create a new instance - not a singleton
		      	      return (count( $obj )) ? new $name( $obj ) : new $name();
               }

               // The requested class could not be instantiated
               throw new virtualHostFrameworkException( "Classloader error trying to load requested class '" . $class . "' using argument '" . $obj . "'." );
      }
}
?>