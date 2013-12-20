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
  * LDAP Connection Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */
  
class LDAPConnectionDTO {

      var $namespace = "packages.core.rpc.class.dto";
      var $class     = "LDAPConnectionDTO";
      var $version   = "1.0";

      var $type;        // The type of LDAP server
      var $host;        // The hostname, ip address, url, or file path to the connect
      var $port;        // The port number to establish the LDAP connection on
      var $username;    // The username used to establish the LDAP server connection
      var $password;    // The password used to authenticate the LDAP username
      var $base;        // The LDAP directory base distinguished name
      var $ssl;         // Specifies whether or not to use SSL for the connection
      var $protocol;    // Which LDAP protocol version to use when speaking with the LDAP server
      var $encryption;  // The encryption object to use for encrypt/decrypt routines
      var $Classloader; // The virtual host framework classloader object

      /**
       * The constructor for the LDAPConnectionDTO object
       * 
       * @access public
       */
      public function LDAPConnectionDTO() {
      }
      /**
       * Sets the type property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param String $type The type of SQL server to connect with (openldap|activedirectory|fedoradirectoryserver|other)
       * @return void
       */
      public function setType( $type ) {

      	     $this->type = $type;
      }
      /**
       * Sets the host property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param String $host The hostname or IP address to establish the LDAP connection
       * @return void
       */
      public function setHost( $host ) {

      	     $this->host = $host;
      }
      /**
       * Sets the port property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param String $port The port number to establish the LDAP connection
       * @return void
       */
      public function setPort( $port ) {

      	     $this->port = $port;
      }
      /**
       * Sets the username property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param String $user The administrative username which will be used to bind to the directory server
       * @return void
       */
      public function setUsername( $username ) {

      	     $this->username = $username;
      }
      /**
       * Sets the password property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param String $user The password which will be used to authenticate the bind to the directory server
       * @return void
       */
      public function setPassword( $password ) {

      	     $this->password = $password;
      }
      /**
       * Sets the base property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param String $base The distinguished name of the base context of which to bind
       * @return void
       */
      public function setBase( $base ) {

      	     $this->base = $base;
      }
      /**
       * Sets the ssl property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param Boolean $ssl Whether or not to use SSL/TLS for the connection
       * @return void
       */
      public function setSsl( $ssl ) {

      	     $this->ssl = $ssl;
      }
      /**
       * Sets the protocol property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param Integer $protocol The protocol version to use when speaking to the LDAP server
       * @return void
       */
      public function setProtocol( $version ) {

      	     $this->protocol = $version;
      }
      /**
       * Sets the encryption property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param Encryption $obj The encryption object to use for encrypt/decrypt routines
       * @return void
       */
      public function setEncryption( $obj ) {

      	     $this->encryption = $obj;
      }
      /**
       * Sets the Classloader property of the LDAPConnectionDTO object
       * 
       * @access public
       * @param Classloader $obj The virtual host framework classloader object
       * @return void
       */
      public function setClassloader( $obj ) {

      	     $this->Classloader = $obj;
      }
      /**
       * Gets the type property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return The type of SQL server to connect with (openldap|activedirectory|fedoradirectoryserver|other)
       */
      public function getType() {

      	     return $this->type;
      }
      /**
       * Gets the host property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return The hostname or IP address to establish the LDAP connection
       */
      public function getHost() {

      	     return $this->host;
      }
      /**
       * Gets the port property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return The port number to establish the LDAP connection
       */
      public function getPort() {

      	     return $this->port;
      }
      /**
       * Gets the username property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return The administrative username which will be used to bind to the directory server
       */
      public function getUsername() {

      	     return $this->username;
      }
      /**
       * Gets the password property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return The password which will be used to authenticate the bind to the directory server
       */
      public function getPassword() {

      	     return $this->password;
      }
      /**
       * Gets the base property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return The distinguished name of the base context of which to bind
       */
      public function getBase() {

      	     return $this->base;
      }
      /**
       * Gets the ssl property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return Whether or not to use SSL/TLS for the connection
       */
      public function getSsl() {

      	     return $this->ssl;
      }
      /**
       * Gets the protocol property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return The protocol version to use when speaking to the LDAP server
       */
      public function getProtocol() {

      	     return $this->protocol;
      }
      /**
       * Gets the encryption property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return The encryption object to use for encrypt/decrypt routines
       */
      public function getEncryption() {

      	     return $this->encryption;
      }
      /**
       * Gets the Classloader property of the LDAPConnectionDTO object
       * 
       * @access public
       * @return The virtual host framework classloader object
       */
      public function getClassloader() {

      	     return $this->Classloader;
      }
}
?>