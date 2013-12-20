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
  * SQLFactory PDO Abstraction Layer
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.classes.database.pdo
  */

// Include the SQL exception handler
require_once( "SQLException.php" );

class SQLFactory implements iVirtualHostFrameworkSQLServer {

	  var $namespace = "packages.core.rpc.class.database.pdo";
	  var $class     = "SQLFactory";
	  var $version   = "1.0";

	  var $SQLServer = null;
      var $SQLConnectionDTO = null;

      /**
       * The SQLFactory Constructor
       * 
       * @access public
       */
	  public function SQLFactory( SQLConnectionDTO $SQLConnectionDTO ) {

             try {
             	     $this->SQLConnectionDTO = $SQLConnectionDTO;
                     switch( $this->SQLConnectionDTO->getDatabaseType() ) {

               	      	     case "sqlite":
               	                  $this->SQLServer = new PDO( 'sqlite:' . $SQLConnectionDTO->getDatabaseHost() );
                 	              break;

               	             case "mysql":
               	                  $OPTIONS = ($SQLConnectionDTO->getDatabaseOptions() == null) ? "" : explode( ";", $SQLConnectionDTO->getDatabaseOptions() );
               	                  $this->SQLServer = new PDO( 'mysql:host=' . $SQLConnectionDTO->getDatabaseHost() . ';port=' . $SQLConnectionDTO->getDatabasePort() . ';dbname=' . $SQLConnectionDTO->getDatabaseName() . ';', $SQLConnectionDTO->getDatabaseUsername(), $SQLConnectionDTO->getDatabasePassword() . $OPTIONS );
               	                  break;

               	             // TODO: Add (and test!) other SQL servers supported by PHP PDO

               	             default:
               	                 throw new SQLException( "Unsupported SQL server type \"" . $SQLConnectionDTO->getDatabaseType() . "\" passed to SQLFactory." );
               	                 break;
               	     }
             }
             catch( PDOException $PDOEx ) {

                    throw new SQLException( "Could not connect to the \"" . $SQLConnectionDTO->getDatabaseType() . "\" database at \"" . $SQLConnectionDTO->getDatabaseHost() . ":" . $SQLConnectionDTO->getDatabasePort() . "\". " . $PDOEx->getMessage(), $PDOEx->getCode() );
             }

             // Return an instance of SQLServer
             return self;
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

             if( !$this->SQLServer instanceof PDO )
                 throw new SQLException( "Call to SQLFactory::query while PDO handle is null." );

             try {
	  	       	    return $this->SQLServer->query( $sql );
	  	     }
	  	     catch( PDOException $PDOEx ) {

        	        throw new SQLException( "Could not execute the requested SQL query \"" . $sql . "\". " . $PDOEx->getMessage(), $PDOEx->getCode() );
	  	     }
	  	     catch( Exception $Ex ) {

	             	throw new SQLException( "Unexpected SQLFactory exception: " . $Ex->getMessage(), $Ex->getCode() );
	         }
      }
      /**
       * Deletes a user account from a specific type of SQL server
       * 
       * @access public 
       * @param String $username The username to delete from the SQL server
       * @return bool True if the operation completed successfully
       *         Exception Throws virtualHostFrameworkSQLException on error
       */
      function deleteUser( $username ) {

      	       switch( $this->SQLConnectionDTO->getDatabaseType() ) {

      	       	       case "sqlite":
          	       	        return true;

      	       	       case "mysql":

                            // Connect to mysql master database and delete the requested user account
      	       	            $this->SQLConnectionDTO->setDatabaseName( "mysql" );
      	       	            $SQLServer = new SQLFactory( $this->SQLConnectionDTO );
                            $SQLServer->query( "DELETE FROM user WHERE User='" . $username . "';" );
      	       	            $SQLServer->close();
      	       	            return true;
      	       }
      }
      /**
       * Closes the PDO database connection
       * 
       * @access public 
       * @return void
       */
      function close() {

      	       $this->SQLServer = null;
      }
}
?>