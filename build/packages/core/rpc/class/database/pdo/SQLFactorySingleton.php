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
  * SQLServer PDO Abstraction Layer
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.classes.database.pdo
  */

// Include the SQL exception handler
require_once( "SQLException.php" );

class SQLFactory {

	  var $namespace = "packages.core.rpc.class.database.pdo";
	  var $class     = "Manager";
	  var $version   = "1.0";

      private static $instance = null;
	  private static $SQLServer = null;
      private static $SQLConnectionDTO = null;

      private function __construct() {
      }

      /**
       * The SQLServer Constructor
       * 
       * @access public
       */
	  public static function getInstance( SQLConnectionDTO $SQLConnectionDTO ) {

             // Initalize PHP PDO connection to configured SQL server
             if( self::$instance == null ) {

	             try {
	             	     self::$SQLConnectionDTO = $SQLConnectionDTO;

	                     switch( $SQLConnectionDTO->getDatabaseType() ) {

	               	      	     case "sqlite":
	               	                  self::$SQLServer = new PDO( 'sqlite:' . $SQLConnectionDTO->getDatabaseHost() );
	               	                  break;	

	               	             case "mysql":
	               	                  self::$SQLServer = new PDO( 'mysql:' . $SQLConnectionDTO->getDatabaseHost() . ';' . $SQLConnectionDTO->getDatabasePort() . ';' . $SQLConnectionDTO->getName(), $SQLConnectionDTO->getDatabaseOptions(), array( PDO::ATTR_PERSISTENT => false ) );
	               	                  break;

	               	             // TODO: Add other SQL servers supported by PHP PDO

	               	             default:
	               	                 throw new SQLException( "Unsupported SQL server type \"" . $SQLConnectionDTO->getDatabaseType() . "\" passed to SQLFactory." );
	               	                 break;
	               	     }

	               	     self::$instance = new self;
	               	     return self::$instance;
	             }
	             catch( PDOException $PDOEx ) {

	                    throw new SQLException( "Could not connect to the \"" . $SQLConnectionDTO->getType() . "\" database at \"" . $SQLConnectionDTO->getHost() . "\". " . $PDOEx->getMessage() );
	             }
	             catch( Exception $Ex ) {
	             	
	             	    throw new SQLException( "Unexpected SQLFactory exception: " . $Ex->getMessage() );
	             }
             }

             // Return an instance of SQLServer
             return self::$instance;
	  }
	  /**
	   * Executes the passesd SQL statement against the initalized SQL server
	   * TODO: Add SQL sanitation code to query method
	   * 
	   * @access public
	   * @param string $sql A valid SQL statement to execute against the SQL server
	   * @return PDOStatement A PDOStatement result set as returned from PHP PDO query method
	   */
      public function query( $sql ) {

             if( !self::$SQLServer instanceof PDO )
                 throw new SQLException( "Call to query without SQLFactory::SQLServer handle to PDO instance." );

             try {
	  	       	    return self::$SQLServer->query( $sql );
	  	     }
	  	     catch( PDOException $PDOEx ) {

        	        throw new SQLException( "Could not execute the requested SQL query. " . $PDOEx->getMessage() );
	  	     }
	  	     catch( Exception $Ex ) {
	             	
	             	throw new SQLException( "Unexpected SQLFactory exception: " . $Ex->getMessage() );
	         }
      }
      public function getSupportedSQLServers() {
      }
}
?>