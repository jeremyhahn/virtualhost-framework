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
  * Interfaceloader Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.util
  */
class Interfaceloader {

	  var $namespace = "packages.core.rpc.util";
	  var $class     = "Interfaceloader";
	  var $version   = "1.0";

      /**
	    * The InterfaceLoader constructor
	   */
      function Interfaceloader() {
      }
      /**
	   * Loads and instantiates all of the interfaces in the /packages/core/rpc/interface directory
	   * @return boolean True on success or false on failure
	   */
      function loadInterfaces() {
 
               // Create path to the interface directory
      	       $fPath = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . "packages" . DIRECTORY_SEPARATOR . "core" . DIRECTORY_SEPARATOR .
      	                "rpc" . DIRECTORY_SEPARATOR . "interface";

               // Exit if not a directory
               if( !is_dir( $fPath ) ) return false;

               // Exit if a directory handle cant be created
      	       if( !$handle = opendir( $fPath . "/" ) ) return false;

               // Loop through each of the files in the interface directory
			   while( false !== ($file = readdir( $handle ) ) ) {

                      // Skip over hidden files and directories
  				      if( substr( $file, 0, 1 ) == "." || is_dir( $file ) ) 
				          continue;

                      // Require the interface
			          require_once( $fPath . DIRECTORY_SEPARATOR . $file );
			   }

               // Close the directory handle
		       closedir( $handle );

		       // Return success
		       return true;
      }
}
?>