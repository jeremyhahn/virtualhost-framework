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
  * OSCommandFactory Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.operating.system
  */

require_once( "virtualHostFrameworkOSCommandException.php" );

abstract class OSCommandFactory {

	     var $namespace = "packages.core.rpc.class.operating.system";
	     var $class     = "CommandFactory";
	     var $version   = "1.0";

	     private static $OSCommand = null;
	     private function __construct() { }

	     /**
	      * The Operating System Command Factory constructor
	      * 
	      * @access publlic
	      * @return OSCommand A singleton instance to an operating system command object
	      */
		 public static function getInstance( $Classloader ) {

	            // Attempt to return an OSCommand instance
	            try {
	             	   if( self::$OSCommand == null ) {

                           // Create OSCommandDTO object to pass into constructor of appropriate operating system command class
                           $OSCommandDTO = $Classloader->load( "packages.core.rpc.class.dto.OSCommandDTO" );
                           $Registry =& Registry::getInstance();
                           $OSCommandDTO->setEncryption( $Registry->get( "Encryption" ) );
                           $OSCommandDTO->setLDAPServer( $Registry->get( "LDAPServer" ) );
                           $OSCommandDTO->setConfig( $Registry->get( "Config" ) );
                           $SSHClient = $Classloader->load( "packages.core.rpc.class.net.ssh.SSHClient" );
                           $OSCommandDTO->setSSHClient( $SSHClient );

	                       // Load the appropriate operating system class
	                       if( is_numeric( strpos( strtolower($_SERVER["SERVER_SOFTWARE"] ), "windows" ) ) )
	                           self::$OSCommand = $Classloader->load( "packages.core.rpc.class.operating.system.windows.OSCommand", $OSCommandDTO );
	
	                       else if (is_numeric( strpos( strtolower($_SERVER["SERVER_SOFTWARE"] ), "mac" ) ) )
	                           self::$OSCommand = $Classloader->load( "packages.core.rpc.class.operating.system.mac.OSCommand", $OSCommandDTO );
	
	                       else
	                           self::$OSCommand = $Classloader->load( "packages.core.rpc.class.operating.system.linux.OSCommand", $OSCommandDTO );
	            	    }
	                    return self::$OSCommand;
	             }
	             catch( virtualHostFrameworkOSCommandException $OSEx ) {
	
	                    // Display a friendly error message rather than an exception window
	                    Registry::getInstance()->get( "ExceptionHandler" )->HandleException( $OSEx );	
	             }
	             catch( Exception $ex ) {
	
	                     // Since the virtualHostFrameworkSQLException was already caught, this one will
	                     // continue to ride up the stack until its caught by a parent exception handler
	                     throw new virtualHostFrameworkOSCommandException( $ex->getMessage() );
	             }
	
	             // Return a singleton instance of OSCommand
	             return self::$OSCommand;
	      }
}
?>