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
  * LDAPFactory Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.directory.service
  */

// Require LDAPFactory exception handler
require_once( 'virtualHostFrameworkLDAPException.php' );

abstract class LDAPFactory {

	     var $namespace = "packages.core.rpc.class.directory.service";
	     var $class     = "LDAPFactory";
	     var $version   = "1.0";

         private static $LDAPServer = null;
         private function __construct() { }

         /**
          * Returns a singleton LDAPServer object
          * 
          * @access public
          * @param LDAPConnectionDTO $objConnection The LDAP connection data type object which stores the neccessary connection details
          * @return Singleton LDAPServer instance
         */
	     public static function getInstance( LDAPConnectionDTO $objConnection ) {

                // Attempt to return an LDAPServer instance
                try {
             	      if( self::$LDAPServer == null )
                          self::$LDAPServer = $objConnection->getClassloader()->load( "packages.core.rpc.class.directory.service." . $objConnection->getType() . "." . "LDAPServer", $objConnection );

                      return self::$LDAPServer;
                }
                catch( virtualHostFrameworkLDAPException $LDAPEx ) {

           	           // Display a friendly error message rather than an exception window
                       Registry::getInstance()->get( "ExceptionHandler" )->HandleException( $LDAPEx );
                }
                catch( Exception $ex ) {

                       // Since the virtualHostFrameworkLDAPException was already caught, this one will
                       // continue to ride up the stack until its caught by a parent exception handler
                       throw new virtualHostFrameworkLDAPException( "Invalid LDAP type '". $objConnection->getType() . "' passed to LDAPFactory constructor. " . $ex->getMessage(), $ex->getCode() );
                }

                // Return a singleton instance of LDAPServer
                return self::$LDAPServer;
	  }
}
?>