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
  * LDAP Group Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */

class GroupDTO {

      var $namespace = "packages.core.rpc.class.dto";
      var $class     = "GroupDTO";
      var $version   = "1.0";

      var $dn;
      var $type;
      var $cn;
      var $members;
      var $descriptin;
      var $mail;
      var $parentDn;

      /**
       * The constructor for the GroupDTO object
       * 
       * @access public
       */
      public function GroupDTO() {
      }

      /**
       * Sets the dn property on the GroupDTO object
       * 
       * @access public
       * @param String $dn The distinguished name for this LDAP group object
       * @return void
       */
      public function setDn( $dn ) {

      	     $this->dn = $dn;
      }
      /**
       * Sets the objectClass property on the GroupDTO object
       * 
       * @access public
       * @param String $cls The object class for this group (groupOfNames|virtualHostFrameworkMailingList|posixAccount)
       * @return void
       */
      public function setType( $type ) {

      	     $this->type = $type;
      }
      /**
       * Sets the cn property on the GroupDTO object
       * 
       * @access public
       * @param String $name The canonical name (cn) associated with this group
       * @return void
       */
      public function setCn( $name ) {

      	     $this->cn = $name;
      }
      /**
       * Sets the members property on the GroupDTO object
       * 
       * @access public
       * @param String[] $members An array of distinguished names who are members of this group
       * @return void
       */
      public function setMembers( $members ) {

      	     $this->members = $members;
      }
      /**
       * Sets the type property on the GroupDTO object
       * 
       * @access public
       * @param String $dn The distinguished name for this LDAP group object
       * @return void
       */
      public function setDescription( $description ) {

      	     $this->description = $description;
      }
      /**
       * Sets the email property on the GroupDTO object
       * 
       * @access public
       * @param String $email The email address associated with this group (if its a mailing list)
       * @return void
       */
      public function setMail( $mail ) {

      	     $this->mail = $mail;
      }
      /**
       * Sets the parentDn property on the GroupDTO object
       * 
       * @access public
       * @param String $dn The parent distinguished name of this group object
       */
      public function setParentDn( $dn ) {

      	     $this->parentDn = $dn;
      }
      /**
       * Gets the dn property on the GroupDTO object
       * 
       * @access public
       * @return The distinguished name for this LDAP group object
       */
      public function getDn() {

      	     return $this->dn;
      }
      /**
       * Gets the objectClass property on the GroupDTO object
       * 
       * @access public
       * @return String The type of group being manipulated (posix|groupOfNames|virtualHostFrameworkMailingList)
       */
      public function getType() {

      	     return $this->type;
      }
      /**
       * Gets the cn property on the GroupDTO object
       * 
       * @access public
       * @return String The canonical name (cn) associated with this group
       */
      public function getCn() {

      	     return $this->cn;
      }
      /**
       * Gets the members property on the GroupDTO object
       * 
       * @access public
       * @return Array An array of distinguished names who are members of this group
       */
      public function getMembers() {

      	     return $this->members;
      }
      /**
       * Gets the description property on the GroupDTO object
       * 
       * @access public
       * @return String The distinguished name for this LDAP group object
       */
      public function getDescription() {

      	     return $this->description;
      }
      /**
       * Gets the mail property on the GroupDTO object
       * 
       * @access public
       * @return Sring The email address associated with this group (if its a mailing list)
       */
      public function getMail() {

      	     return $this->mail;
      }
      /**
       * Gets the parentDn property on the GroupDTO object
       * 
       * @access public
       * @return Sring The parent distinguished name of this group object
       */
      public function getParentDn() {

      	     return $this->parentDn;
      }
}
?>