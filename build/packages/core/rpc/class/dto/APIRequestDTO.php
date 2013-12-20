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
  * API Request Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */
  
class APIRequestDTO {

      var $namespace = "packages.core.rpc.class.dto";
      var $class     = "APIRequestDTO";
      var $version   = "1.0";

      var $LDAPServer;                 // An instance of LDAPServer
      var $Classloader;                // An instance of Classloader
      var $Classpath;                  // The classpath to the requested API
      var $apiType;                    // The API 'type' to load
      var $args;                       // Any data type which will be passed as an argument to the requested API object method

      /**
       * The constructor for the APIRequestDTO object
       * 
       * @access public
       */
      public function APIRequestDTO() {
      }
      /**
       * Sets the LDAPServer property
       * 
       * @access public
       * @param LDAPServer $LDAPServer An instance of LDAPServer to perform queries against
       * @return void
       */
      public function setLDAPServer( $LDAPServer ) {

      	     $this->LDAPServer = $LDAPServer;
      }
      /**
       * Sets the Classloader property
       * 
       * @access public
       * @param Classloader $Classloader The Classloader object to use to load API classes
       * @return void
       */
      public function setClassloader( $Classloader ) {
      	
      	     $this->Classloader = $Classloader;
      }
      /**
       * Sets the Classpath property
       * 
       * @access public
       * @param String $classpath The path to the requested API package relative of the JSON-RPC server
       * @return void
       */
      public function setClasspath( $Classpath ) {

      	     $this->Classpath = $Classpath;
      }
      /**
       * Sets the apiType property
       * 
       * @access public
       * @param String $apiType The API 'type' to load
       * @return void
       */
      public function setApiType( $type ) {

      	     $this->apiType = $type;
      }
      /**
       * Sets the args property
       * 
       * @access public
       * @param mixed $args Any data type which will be passed as an argument to the requested API object method
       * @return void
       */
      public function setArgs( $args ) {

      	     $this->args = $args;
      }
      /**
       * Gets the LDAPServer property of the APIRequestDTO object
       * 
       * @access public
       * @return An instance of LDAPServer
       */
      public function getLDAPServer() {
      	
      	     return $this->LDAPServer;
      }
      /**
       * Gets the Classloader property of the APIRequestDTO object
       * 
       * @access public
       * @return The classloader to use to load API objects
       */
      public function getClassloader() {

             return $this->Classloader;
      }
      /**
       * Gets the Classpath property of the APIRequestDTO object
       * 
       * @access public
       * @return The classpath to use to instantiate the requested API object
       */
      public function getClasspath() {

             return $this->Classpath;
      }
      /**
       * Gets the method property
       * 
       * @access public
       * @return String The method within the requested API object to invoke
       */
      public function getApiType() {

      	     return $this->apiType;
      }
      /**
       * Sets the args property
       * 
       * @access public
       * @return mixed Any data type which will be passed as an argument to the requested API object method
       */
      public function getArgs() {

      	     return $this->args;
      }
}
?>