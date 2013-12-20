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
  * OpenLDAP Exception Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.directory.service
  */

class OpenLDAPException extends virtualHostFrameworkLDAPException {

	  var $namespace = "packages.core.rpc.class.directory.service.openldap";
	  var $class     = "OpenLDAPException";
	  var $version   = "1.0";

      var $code;
      var $message;

      public function __construct( $message, $code=0 ) { 

      	     parent::__construct( $message, $code );
      }

      /**
       * The OpenLDAPException constructor
       * 
       * @access public
       * @param Integer $code The exception code
       * @param String Smessage The exception message
       */
      public function OpenLDAPException( $message, $code ) {

             $this->code    = $code;
             $this->message = "OpenLDAPException: " . $message;
      }
}
?>