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
  * LDAP Policy Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */
  
class PolicyDTO {

      var $namespace = "packages.core.rpc.class.dto";
      var $class     = "PolicyDTO";
      var $version   = "1.0";

      var $policyId;
      var $uid;

      /**
       * The constructor for the PolicyDTO object
       * 
       * @access public
       */
      public function PolicyDTO() {
      }
      /**
       * Sets the policyId
       * 
       * @access public
       * @param String $id The identifier associated with the policy object 
       * @return void
       */
      public function setPolicyId( $id ) {

      	     $this->policyId = $id;
      }
      /**
       * Sets the uid property
       * 
       * @access public
       * @param String $uid The uid value of the account to be provisioned
       * @return void
       */
      public function setUid( $uid ) {
      	
      	     $this->uid = $uid;
      }
      /**
       * Gets the policyId
       * 
       * @access public
       * @return The identifier associated with the policy object
       */
      public function getPolicyId() {
      	
      	     return $this->policyId;
      }
      /**
       * Gets the uid property
       * 
       * @access public
       * @return String The uid value of the account to be provisioned
       */
      public function getUid() {

             return $this->uid;
      }
}
?>