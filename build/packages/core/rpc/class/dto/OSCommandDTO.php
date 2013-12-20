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
  * OSCommand Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */
  
class OSCommandDTO {

      var $namespace = "packages.core.rpc.class.dto";
      var $class     = "OSCommandDTO";
      var $version   = "1.0";

      var $Encryption;         // Virtual Host Framework Encryption instance
      var $LDAPServer;         // Virtual Host Framework LDAPServer instance
      var $Config;             // Virtual Host Framework Config instance
      var $SSHClient;          // Virtual Host Framework SSH instance

      /**
       * The constructor for the OSCommandDTO object
       * 
       * @access public
       */
      public function OSCommandDTO() {
      }
      /**
       * Sets the Encryption property
       * 
       * @access public
       * @param Encryption $obj An instance of the Virtual Host Framework Encryption object
       * @return void
       */
      public function setEncryption( Encryption $obj ) {

      	     $this->Encryption = $obj;
      }
      /**
       * Sets the LDAPServer property
       * 
       * @access public
       * @param LDAPServer $obj An instance of the Virtual Host Framework LDAPServer object
       * @return void
       */
      public function setLDAPServer( LDAPServer $obj ) {

      	     $this->LDAPServer = $obj;
      }
      /**
       * Sets the Config property
       * 
       * @access public
       * @param Config $obj An instance of the Virtual Host Framework Config object
       * @return void
       */
      public function setConfig( Config $obj ) {

      	     $this->Config = $obj;
      }
      /**
       * Sets the SSHClient property
       * 
       * @access public
       * @param SSHClient $obj An instance of the Virtual Host Framework SSHClient object
       * @return void
       */
      public function setSSHClient( SSHClient $obj ) {

      	     $this->SSHClient = $obj;
      }
      /**
       * Gets the Encryption property
       * 
       * @access public
       * @return Encryption An instance of the Virtual Host Framework Encryption object
       */
      public function getEncryption() {

      	     return $this->Encryption;
      }
      /**
       * Gets the LDAPServer property
       * 
       * @access public
       * @return LDAPServer An instance of the Virtual Host Framework LDAPServer object
       */
      public function getLDAPServer() {

      	     return $this->LDAPServer;
      }
      /**
       * Gets the Config property
       * 
       * @access public
       * @return Config An instance of the Virtual Host Framework Config object
       */
      public function getConfig() {

      	     return $this->Config;
      }
      /**
       * Gets the SSHClient property
       * 
       * @access public
       * @return SSHClient An instance of the Virtual Host Framework SSHClient object
       */
      public function getSSHClient() {

      	     return $this->SSHClient;
      }
}
?>