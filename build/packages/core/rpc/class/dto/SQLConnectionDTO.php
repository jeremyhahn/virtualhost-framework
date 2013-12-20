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
  * LDAP Repository Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */
  
class SQLConnectionDTO {

      var $namespace = "packages.core.rpc.class.dto";
      var $class     = "SQLConnectionDTO";
      var $version   = "1.0";

      var $databaseType;     // The type of SQL server
      var $databaseHost;     // The hostname, ip address, url, or file path to the connect
      var $databasePort;     // The port number which the sql server listens
      var $databaseUsername; // The username to connect to the database
      var $databasePassword; // The password to authenticate the connection
      var $databaseName;     // The name of the database to connect to
      var $databaseOwner;    // The distinguished name of the person who owns this database connection object
      var $databaseOptions;  // SQL connection string options
      var $Classloader;      // The Classloader object
      var $dn;               // The distinguished name of the SQLConnection object

      /**
       * The constructor for the SQLConnectionDTO object
       * 
       * @access public
       */
      public function SQLConnectionDTO() {
      }
      /**
       * Sets the databaseType property
       * 
       * @access public
       * @param String $databaseType The type of SQL server to establish a connection
       * @return void
       */
      public function setDatabaseType( $type ) {

      	     $this->databaseType = $type;
      }
      /**
       * Sets the databaseHost property
       * 
       * @access public
       * @param String $databaseHost The hostname, IP address, URL, or file path, etc to use while establishing a connection with the database.
       * @return void
       */
      public function setDatabaseHost( $host ) {

      	     $this->databaseHost = $host;
      }
      /**
       * Sets the databasePort property
       * 
       * @access public
       * @param Integer $databasePort The port number which the sql server listens
       * @return void
       */
      public function setDatabasePort( $port ) {

      	     $this->databasePort = $port;
      }
      /**
       * Sets the databaseUsername property
       * 
       * @access public
       * @param String $username The username to use while authenticating to the database server
       * @return void
       */
      public function setDatabaseUsername( $username ) {

      	     $this->databaseUsername = $username;
      }
      /**
       * Sets the databasePassword property
       * 
       * @access public
       * @param String $password The password used to authenticate the user
       * @return void
       */
      public function setDatabasePassword( $password ) {

      	     $this->databasePassword = $password;
      }
      /**
       * Sets the databaseName property
       * 
       * @access public
       * @param String $name The name of the database to establish a connection with
       * @return void
       */
      public function setDatabaseName( $name ) {

      	     $this->databaseName = $name;
      }
      /**
       * Sets the databaseOwner property
       * 
       * @access public
       * @param String $dn The distinguished name of the person who owns this database connection object
       * @return void
       */
      public function setDatabaseOwner( $dn ) {

      	     $this->databaseOwner = $dn;
      }
      /**
       * Sets the databaseOptions property
       * 
       * @access public
       * @param String $value SQL connection string options
       * @return void
       */
      public function setDatabaseOptions( $value ) {

      	     $this->databaseOptions = $value;
      }
      /**
       * Sets the Classloader property
       * 
       * @access public
       * @param Classloader $obj The Classloader object
       * @return void
       */
      public function setClassloader( $obj ) {

      	     $this->Classloader = $obj;
      }
      /**
       * Sets the dn property
       * 
       * @access public
       * @param String $dn The distinguished name of the SQLConnection object
       * @return void
       */
      public function setDn( $dn ) {

      	     $this->dn = $dn;
      }
      /**
       * Gets the databaseType property
       * 
       * @access public
       * @return String The type of SQL server to connect with (sqlite|mysql|mssql|postgresql|oracle)
       */
      public function getDatabaseType() {

      	     return $this->databaseType;
      }
      /**
       * Gets the databaseHost property
       * 
       * @access public
       * @return String The hostname, IP address, URL, or file path to use to establish a connection with the database
       */
      public function getDatabaseHost() {

      	     return $this->databaseHost;
      }
      /**
       * Gets the databasePort property
       * 
       * @access public
       * @return String The port number which the sql server listens
       */
      public function getDatabasePort() {

      	     return $this->databasePort;
      }
      /**
       * Gets the databaseUsername property
       * 
       * @access public
       * @return String The username to use while authenticating to the database server
       */
      public function getDatabaseUsername() {

      	     return $this->databaseUsername;
      }
      /**
       * Gets the databasePassword property
       * 
       * @access public
       * @return String The password used to authenticate the user
       */
      public function getDatabasePassword() {

      	     return $this->databasePassword;
      }
      /**
       * Gets the databaseName property
       * 
       * @access public
       * @return String The name of the database to establish a connection with
       */
      public function getDatabaseName() {

      	     return $this->databaseName;
      }
      /**
       * Gets the databaseOwner property
       * 
       * @access public
       * @return String The distinguished name of the person who owns this connection object
       */
      public function getDatabaseOwner() {

      	     return $this->databaseOwner;
      }
      /**
       * Gets the databaseOptions property
       * 
       * @access public
       * @return String SQL connection string options
       */
      public function getDatabaseOptions() {

      	     return $this->databaseOptions;
      }
      /**
       * Gets the Classloader property
       * 
       * @access public
       * @return Classloader $obj The Classloader object
       */
      public function getClassloader() {

      	     return $this->Classloader;
      }
      /**
       * Gets the dn property
       * 
       * @access public
       * @return String The distinguished name of the SQLConnection object
       */
      public function getDn() {

      	     return $this->dn;
      }
}
?>