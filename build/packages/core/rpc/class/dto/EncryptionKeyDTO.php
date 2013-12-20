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
  * Encryption Key Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */
  
class EncryptionKeyDTO {

      var $namespace = "packages.core.rpc.class.dto";
      var $class     = "EncryptionKeyDTO";
      var $version   = "1.0";

      var $key;
      var $iv;

      /**
       * The constructor for the EncryptionKeyDTO object
       * 
       * @access public
       */
      public function EncryptionKeyDTO() {
      }
      /**
       * Sets the key property of the EncryptionKeyDTO object
       * 
       * @access public
       * @param String $key The CBC cipher encryption secret/key
       * @return void
       */
      public function setKey( $key ) {

      	     $this->key = $key;
      }
      /**
       * Sets the iv property of the EncryptionKeyDTO object
       * 
       * @access public
       * @param String $iv The CBC cipher iv/salt
       * @return void
       */
      public function setIv( $iv ) {
      	
      	     $this->iv = $iv;
      }
      /**
       * Gets the key property of the EncryptionKeyDTO object
       * 
       * @access public
       * @return The secret/key for the encryption object
       */
      public function getKey() {
      	
      	     return $this->key;
      }
      /**
       * Gets the iv property of the EncryptionKeyDTO object
       * 
       * @access public
       * @return The iv/salt for the encryption object
       */
      public function getIv() {
      
             return $this->iv;
      }
}
?>