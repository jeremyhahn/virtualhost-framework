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
  * SQL Browser Manager
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.com.makeabyte.vhf.mysql.rpc
  */

class Manager {

      var $namespace = "packages.com.makeabyte.vhf.sqlbrowser.rpc";
      var $class     = "Manager";
      var $version   = "1.0";

      var $LDAPServer;
      var $Classloader;
      var $SQLServer;
      var $Encryption;
      var $SQLConnectionDTO;

      /**
       * The SQL Browser Manager constructor
       * 
       * @access public
       */
	  public function Manager( SQLConnectionDTO $SQLConnectionDTO ) {

             $Registry              =& Registry::getInstance();
             $this->Classloader     =& $Registry->get( "Classloader" );
             $this->LDAPServer      =& $Registry->get( "LDAPServer" );
             $this->Encryption      =& $Registry->get( "Encryption" );
             $this->SQLConnectionDTO = $SQLConnectionDTO;
	  }
	  /**
	   * Returns an array of database server types provisioned for the specified databaseOwner 
       * 
       * @access public
       * @return array An array of database server types which have been provisioned for the specified account
       */
      public function getProvisionedServers() {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             $filter = "(&(dn=" . $this->SQLConnectionDTO->getDatabaseOwner() . ")(databasetype=*))";
             $data = $this->LDAPServer->getEntries( $filter, array() );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the database servers which have been provisioned for the specified account
      	     return $data;
      }
      /**
	   * Returns an array of database servers supported by the hosting infrastructure 
       * 
       * @access public
       * @return array An array of database server types supported by the hosting infrastructure
       */
      public function getSupportedServers() {

             $supportedServers = array();

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             $filter = "(&(objectclass=virtualHostFrameworkSQLConnection)(databaseoptions=SHARED_SQL_SERVER))";
             $result = $this->LDAPServer->getEntries( $filter, array() );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the database servers which have been provisioned for the specified account
      	     return $result;
      }
	  /**
	   * Returns an array of database names owned by the specified distinguished name 
       * 
       * @access public
       * @return array An array of database names owned by the specified distinguished name
       */
      public function getDatabases() {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             $filter = "(&(objectClass=virtualHostFrameworkSQLConnection)(databaseowner=" . $this->SQLConnectionDTO->getDatabaseOwner() . "))";
             $result = $this->LDAPServer->getEntries( $filter, array() );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the tree branch
      	     return $result;
      }
      /**
	   * Returns an array of database table names for the specified database 
       * 
       * @access public
       * @return array An array of database table names for the specified database
       */      
      public function getTables() {

              $SQLServer = $this->Classloader->load( "packages.core.rpc.class.database.pdo.SQLFactory", $this->SQLConnectionDTO );

              if( $result = $SQLServer->query( "SHOW TABLES FROM " . $this->SQLConnectionDTO->getDatabaseName() . ";" ) )
      	          return $result->fetchAll();

      	      return false;
      }
      /**
	   * Creates a database on the specified server
	   * NOTE: The SQL browser will display an SQL type for each SQL connection object in the directory with a 'databaseOptions' value
	   *       of SHARED_SQL_SERVER. This routine looks up the SHARED_SQL_SERVER with a databaseType which matches the databaseType which
	   *       was submitted in the request.
	   * TODO: Add a server objectClass in VHF LDAP schema to support server objects. Then instead of storing shared infrastructure servers
	   *       as an SQL connection object, they will be stored as an SQL server type. 
       * 
       * @access public
       * @return bool True if the operation completes successfully
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
      public function create() {

             $attrs['databasehost']     = $this->SQLConnectionDTO->getDatabaseHost();
             $attrs['databasetype'][0]  = $this->SQLConnectionDTO->getDatabaseType();
             $attrs['databaseowner'][0] = $this->SQLConnectionDTO->getDatabaseOwner();
             $attrs['databasename'][0]  = $this->SQLConnectionDTO->getDatabaseName();
             $attrs['objectclass'][0]   = "virtualHostFrameworkSQLConnection";

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             $filter = "(&(&(objectClass=virtualHostFrameworkSQLConnection)(databasename=" . $this->SQLConnectionDTO->getDatabaseName() . "))(databasetype=" . $this->SQLConnectionDTO->getDatabaseType() . "))";
             $dbResult = $this->LDAPServer->getEntries( $filter, array( "databasename" ) );

             if( $dbResult['count'] )
                 throw new virtualHostFrameworkAPIException( "The requested database name \"" . $this->SQLConnectionDTO->getDatabaseName() . "\" is already in use." );

             $filter = "(&(&(objectClass=virtualHostFrameworkSQLConnection)(databaseoptions=SHARED_SQL_SERVER))(databasetype=" . $this->SQLConnectionDTO->getDatabaseType() . "))";
             $sqlAdmin = $this->LDAPServer->getEntries( $filter, array( "databaseusername", "databasepassword" ) );

             if( !$sqlAdmin['count'] )
                 throw new virtualHostFrameworkAPIException( "Could not locate shared hosting SQL server LDAP object" );

             // Create the database and assign permissions
             if( $this->SQLConnectionDTO->getDatabaseType() !== "sqlite" ) {

                 $attrs['databaseusername'] = $this->SQLConnectionDTO->getDatabaseUsername();
                 $attrs['databasepassword'] = $this->SQLConnectionDTO->getDatabasePassword();

                 if( $this->SQLConnectionDTO->getDatabasePort() )
                     $attrs['databaseport'] = $this->SQLConnectionDTO->getDatabasePort();

                 // Connect using SQL server admin credentials
                 $AdminConnectionDTO = $this->Classloader->load( "packages.core.rpc.class.dto.SQLConnectionDTO" );
                 $AdminConnectionDTO->setDatabaseHost( $this->SQLConnectionDTO->getDatabaseHost() );
                 $AdminConnectionDTO->setDatabasePort( $this->SQLConnectionDTO->getDatabasePort() );
                 $AdminConnectionDTO->setDatabaseUsername( $sqlAdmin[0]['databaseusername'][0] );
                 $AdminConnectionDTO->setDatabasePassword( $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $sqlAdmin[0]['databasepassword'][0] ) ) );
                 $AdminConnectionDTO->setDatabaseType( $this->SQLConnectionDTO->getDatabaseType() );
                 $AdminConnectionDTO->setDatabaseOptions( ($this->SQLConnectionDTO->getDatabaseOptions()) ? null : $this->SQLConnectionDTO->getDatabaseOptions() );

                 $SQLServer = $this->Classloader->load( "packages.core.rpc.class.database.pdo.SQLFactory", $AdminConnectionDTO );

                 // Create the database
	             $SQLServer->query( "CREATE DATABASE " . $this->SQLConnectionDTO->getDatabaseName() . ";" );

	             // Set permissions            
                 $SQLServer->query( "GRANT ALL PRIVILEGES ON  " . $this->SQLConnectionDTO->getDatabaseName() . ".* TO '" . $this->SQLConnectionDTO->getDatabaseUsername() . "'@'%' IDENTIFIED BY '" . $this->SQLConnectionDTO->getDatabasePassword() . "';" );
             }
             else {

                 // SQLite database is created on initial connection
                 $SQLServer = $this->Classloader->load( "packages.core.rpc.class.database.pdo.SQLFactory", $this->SQLConnectionDTO );
             }

             // Delete the SQLConnection object from the directory server
             $this->LDAPServer->addEntry( $this->SQLConnectionDTO->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the tree branch
      	     return true;
      }
      /**
       * Saves an SQL connection LDAP object 
       * 
       * @access public
       * @return bool True if the operation completes successfully
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
      public function save() {

             // Define the databasehost attribute value
             $attrs['databasehost'][0] = $this->SQLConnectionDTO->getDatabaseHost();
             $attrs['databasetype'][0] = $this->SQLConnectionDTO->getDatabaseType();
             $attrs['databaseowner'][0] = $this->SQLConnectionDTO->getDatabaseOwner();
             $attrs['databasename'][0] = $this->SQLConnectionDTO->getDatabaseName();
             $attrs['objectclass'][0] = "virtualHostFrameworkSQLConnection";

             if( $this->SQLConnectionDTO->getDatabasePort() )
                 $attrs['databaseoptions'][0] = $this->SQLConnectionDTO->getDatabaseOptions();

             if( $this->SQLConnectionDTO->getDatabaseUsername() )
                 $attrs['databaseusername'][0] = $this->SQLConnectionDTO->getDatabaseUsername();

             if( $this->SQLConnectionDTO->getDatabasePassword() )
                 $attrs['databasepassword'][0] = $this->SQLConnectionDTO->getDatabasePassword();

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             $dbfilter = "(&(&(objectClass=virtualHostFrameworkSQLConnection)(databasename=" . $this->SQLConnectionDTO->getDatabaseName() . "))(databasetype=" . $this->SQLConnectionDTO->getDatabaseType() . "))";
             $dbResult = $this->LDAPServer->getEntries( $dbfilter, array() );

             if( $dbResult['count'] )
                 throw new virtualHostFrameworkAPIException( "The requested database name \"" . $this->SQLConnectionDTO->getDatabaseName() . "\" is already in use." );

             // Delete the SQLConnection object from the directory server
             $this->LDAPServer->addEntry( $this->SQLConnectionDTO->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the tree branch
      	     return true;
      }
      /**
	   * Drops a database 
       * 
       * @access public
       * @return bool Returns true if the operations completes succesfully
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
      public function drop() {

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             $filter = "(&(&(objectClass=virtualHostFrameworkSQLConnection)(databasename=" . $this->SQLConnectionDTO->getDatabaseName() . "))(databasetype=" . $this->SQLConnectionDTO->getDatabaseType() . "))";
             $database = $this->LDAPServer->getEntries( $filter, array() );

             // Throw exception if the requested database name does not exist
             if( !count( $database ) ) throw new virtualHostFrameworkAPIException( "The requested database \"" + $this->SQLConnectionDTO->getDatabaseName() + "\" does not exist." );

             $filter = "(&(&(objectClass=virtualHostFrameworkSQLConnection)(databaseoptions=SHARED_SQL_SERVER))(databasetype=" . $this->SQLConnectionDTO->getDatabaseType() . "))";
             $sqlAdmin = $this->LDAPServer->getEntries( $filter, array( "databaseusername", "databasepassword", "databaseport" ) );

             if( !$sqlAdmin['count'] )
                 throw new virtualHostFrameworkAPIException( "Could not locate shared hosting SQL server LDAP object." );

             // Create the database and assign permissions
             if( $this->SQLConnectionDTO->getDatabaseType() !== "sqlite" ) {

                 if( $this->SQLConnectionDTO->getDatabasePort() )
                     $attrs['databaseport'] = $this->SQLConnectionDTO->getDatabasePort();

                 // Connect using SQL server admin credentials
                 $AdminConnectionDTO = $this->Classloader->load( "packages.core.rpc.class.dto.SQLConnectionDTO" );
                 $AdminConnectionDTO->setDatabaseHost( $this->SQLConnectionDTO->getDatabaseHost() );
                 $AdminConnectionDTO->setDatabasePort( $sqlAdmin[0]['databaseport'][0] );
                 $AdminConnectionDTO->setDatabaseUsername( $sqlAdmin[0]['databaseusername'][0] );
                 $AdminConnectionDTO->setDatabasePassword( $this->Encryption->decrypt_aes_256( $this->Encryption->decode( $sqlAdmin[0]['databasepassword'][0] ) ) );
                 $AdminConnectionDTO->setDatabaseType( $this->SQLConnectionDTO->getDatabaseType() );
                 $AdminConnectionDTO->setDatabaseOptions( ($this->SQLConnectionDTO->getDatabaseOptions()) ? null : $this->SQLConnectionDTO->getDatabaseOptions() );

                 $SQLServer = $this->Classloader->load( "packages.core.rpc.class.database.pdo.SQLFactory", $AdminConnectionDTO );

                 // Drop the database and close the connection
	             $SQLServer->query( "DROP DATABASE " . $this->SQLConnectionDTO->getDatabaseName() . ";" );

	             // Delete the SQL user accounts associated with this database
	             for( $i=0; $i<$database['count']; $i++ )
	             	 for( $j=0; $j<$database[$i]['databaseusername']['count']; $j++ )              	
	                      $SQLServer->deleteUser( $database[$i]['databaseusername'][0] );
             }
             else {

                 // NOTE: Could not find a way to issue 'DROP DATABASE' query for sqlite databases. Will do file system delete instead
                 //$SQLServer = $this->Classloader->load( "packages.core.rpc.class.database.pdo.SQLFactory", $this->SQLConnectionDTO );
                 //$SQLServer->query( "DROP DATABASE '" . $this->SQLConnectionDTO->getDatabaseName() . "';" );

                 // Delete the sqlite database from the file system
                 if( !unlink( $this->SQLConnectionDTO->getDatabaseHost() ) )
                     throw new virtualHostFrameworkAPIException( "Could not delete the requested SQLite database: " . $this->SQLConnectionDTO->getDatabaseHost() );
             }

             // Delete the SQLConnection object from the directory server
             $this->LDAPServer->deleteEntry( $database[0]['dn'] );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return success
      	     return true;
      }
}
?>