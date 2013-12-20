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
  * LDAP HTTP Account Extension Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.com.makeabyte.vhf.apache2.rpc
  */


// Load the parent AccountDTO class
Registry::getInstance()->get( "Classloader" )->load( "packages.core.rpc.class.dto.AccountDTO" );

class LDAPVHostDTOEx extends AccountDTO {

      var $serverName;              // The apache ServerName directive value
      var $serverAlias;             // Space delimited list of alias names for the website
      var $documentRoot;            // The apache DocumentRoot directive value      
      var $serverAdmin;             // The apache ServerAdmin directive value
      var $associatedName;          // The distinguished name of the account which owns this website
      var $dn;                      // The distinguished name of this LDAP HTTP object (NOTE: This overloads the Account dn property)
      var $parentDn;                // The distinguished name of this HTTP object's parent 

      /**
       * The constructor for the LDAPVhostDTOEx Object
       * 
       * @access public
       */
      public function LDAPVHostDTOEx() {
      }
      /**
       * Sets the serverName property
       * 
       * @access public
       * @param String $domain The domain name of the website
       * @return void
       */
      public function setServerName( $name ) {
      
             $this->serverName = $name;
      }
      /**
       * Sets the serverAlias property
       * 
       * @access public
       * @param String $alias A space delimited list of alias names for this website
       * @return void
       */
      public function setServerAlias( $alias ) {
      
             $this->serverAlias = $alias;
      }
      /**
       * Sets the documentRoot property
       * 
       * @access public
       * @param String $path The full filesystem path to the location of this website
       * @return void
       */
       public function setDocumentRoot( $path ) {
       	
       	      $this->documentRoot = $path;
       }
      /**
       * Sets the aliases property
       * 
       * @access public
       * @param String $email The email address of the person responsible for this website
       * @return void
       */
      public function setServerAdmin( $email ) {
      	 
      	     $this->serverAdmin = $email;
      }
      /**
       * Sets the associatedName property
       * 
       * @access public
       * @param String The distinguished name of this LDAP HTTP object
       * @return void
       */
       public function setAssociatedName( $name ) {

       	      $this->associatedName = $name;
       }
      /**
       * Sets the dn property
       * 
       * @access public
       * @param String The distinguished name of this LDAP HTTP object
       * @return void
       */
      
      public function setDn( $dn ) {
      	 
      	     $this->dn = $dn;
      }
      /**
       * Sets the parentDn proeprty
       * 
       * @access public
       * @param String $dn The distinguished name of this HTTP object's parent
       * @return void
       */
      public function setParentDn( $dn ) {
      	
      	     $this->parentDn = $dn;
      }
      /**
       * Gets the serverName property
       * 
       * @access public
       * @return String The domain name of the website
       */
      public function getServerName() {
      
             return $this->serverName;
      }
      /**
       * Gets the serverAlias property
       * 
       * @access public
       * @return String A space delimited list of alias names for this website
       */
      public function getServerAlias() {
      
             return $this->serverAlias;
      }
      /**
       * Gets the documentRoot property
       * 
       * @access public
       * @param String The full filesystem path to the location of this website
       */
       public function getDocumentRoot() {
       	
       	      return $this->documentRoot;
       }
      /**
       * Gets the aliases property
       * 
       * @access public
       * @return String The email address of the person responsible for this website
       */
      public function getServerAdmin() {
      	 
      	     return $this->serverAdmin;
      }
      /**
       * Gets the associatedName property
       * 
       * @access public
       * @return String The distinguished name of this LDAP HTTP object
       */
       public function getAssociatedName() {

       	      return $this->associatedName;
       }
      /**
       * Gets the dn property
       * 
       * @access public
       * @param String The distinguished name of this LDAP HTTP object
       * @return void
       */
      
      public function getDn() {
      	 
      	     return $this->dn;
      }
      /**
       * Gets the parentDn proeprty
       * 
       * @access public
       * @return String The distinguished name of this HTTP object's parent
       * @return void
       */
      public function getParentDn() {
      	
      	     return $this->parentDn;
      }
}
?>