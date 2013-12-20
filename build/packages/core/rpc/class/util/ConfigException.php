<?php

# P2P Hosting Network Control Panel
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
  * Configuration Exception Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.util
  */

class ConfigException extends Exception {

	  var $namespace = "packages.core.rpc.util";
	  var $class     = "ConfigException";
	  var $version   = "1.0";

      var $code;
      var $message;

      /**
       * The ConfigException constructor
       * 
       * @access public
       * @param Integer $code The exception code
       * @param String Smessage The exception message
       */
      public function ConfigException( $code, $message ) {

             $this->code    = $code;
             $this->message = $message;
      }
}
?>