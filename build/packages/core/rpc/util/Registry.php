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
  * Registry Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package p2phost.modules.rpc.core.util
  */

class Registry {

      var $namespace = "packages.core.rpc.util";
      var $class     = "Registry";
      var $version   = "1.0";

      var $_objects = array();  // An associative array to store objects

      /**
       * Retrieves the an instace of Registry or creates a new instance if it has not yet been instantiated
	   * @param string $name The key name of the object
	   * @param object The object to store
	   * @return bool True if the object has been stored; False if the object key name already exists
	   */
       public function &getInstance() {

               static $clsRegistry;

               if( is_object( $clsRegistry ) == true )
                   return $clsRegistry;

		       $clsRegistry = new Registry;
		       return $clsRegistry;
        }
        /**
		 * Adds an object to the registry
		 * @param string $name The key name of the object
		 * @param object The object to store
		 * @return bool True if the object has been stored; False if the object key name already exists
		 */
         public function set( $name, &$object ) {

               if( array_key_exists( $name, $this->_objects ) )
                   return false; 

               $this->_objects[ $name ] =& $object;
               return true;
        }
        /**
		 * Retrieves an object from the registry
		 * @param string $name The name of the object to retrieve
		 * @return object|bool Returns the object or false if the object name is not found
		 */
         public function &get( $name ) {

               if( array_key_exists( $name, $this->_objects ) )
                   return $this->_objects[ $name ];
               
               return false;
        }
}
?>