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
  * LDAP Package Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */
  
class PackageDTO {

      var $namespace = "packages.core.rpc.class.dto";
      var $class     = "PackageDTO";
      var $version   = "1.0";

      var $cn;                      // The canonical name (cn) attribute for the LDAP package object
      var $displayName;             // The displayName attribute of the package
      var $packageIcon;             // A path to an icon file which represents the package
      var $packageClasspath;        // The dot syntax namespace of the package (packages.com.mydomain.mypackage)
      var $packageType;             // A type identifer used by the Virtual Host Framework API
      var $packageDTO;              // A classpath to a data type object to associate with a package
      var $packageStatus;           // The status of this package (active|disabled)
      var $packageVersion;          // The version number of the package
      var $members;                 // An array of (strings) member distinguished names
      var $location;                // Specifies the location relative to a repository, where a new package file can be downloaded
      var $parentDn;                // The distinguished name of the package's LDAP parent object
      var $dn;                      // The distinguished name of the package
      var $rpcRequestorDn;          // The distinguished name of the rpc user requesting the package 

      /**
       * The constructor for the PackageDTO object
       * 
       * @access public
       */
      public function PackageDTO() {
      }
      /**
       * Sets the cn property of the PackageDTO object
       * 
       * @access public
       * @param String $name The name of the package
       * @return void
       */
      public function setCn( $cn ) {

      	     $this->cn = $cn;
      }
      /**
       * Sets the name property of the PackageDTO object
       * 
       * @access public
       * @param String $name The name of the package
       * @return void
       */
      public function setDisplayName( $name ) {

      	     $this->displayName = $name;
      }
      /**
       * Sets the icon property of the PackageDTO object
       * 
       * @access public
       * @param String $icon The path to the icon file which is used to represent this package
       * @return void
       */
      public function setPackageIcon( $icon ) {

      	     $this->packageIcon = $icon;
      }
      /**
       * Sets the packageClasspath property of the PackageDTO object
       * 
       * @access public
       * @param String $classpath The classpath to the package source (packages.com.mydomain.mypackage)
       * @return void
       */
      public function setPackageClasspath( $classpath ) {
      	
      	     $this->packageClasspath = $classpath;
      }
      /**
       * Sets the packageType property of the PackageDTO object
       * 
       * @access public
       * @param String $type The type of package (Used as an identifier within the API)
       * @return void
       */
      public function setPackageType( $type ) {

      	     $this->packageType = $type;
      }
      /**
       * Sets the packageDTO property of the PackageDTO object
       * 
       * @access public
       * @param String $classpath The classpath to a data type object to associate with this package
       * @return void
       */
      public function setPackageDTO( $classpath ) {

      	     $this->packageDTO  = $classpath;
      }
      /**
       * Sets the packageStatus property of the PackageDTO object
       * 
       * @access public
       * @param String $status The status of this package (active|disabled)
       * @return void
       */
      public function setPackageStatus( $status ) {
      	
      	     $this->packageStatus = $status;
      }
      /**
       * Sets the version property of the PackageDTO object
       * 
       * @access public
       * @param String $version The version of this package object
       * @return void
       */
      public function setPackageVersion( $version ) {
      	
      	     $this->packageVersion = $version;
      }
      /**
       * Sets the members property of the PackageDTO object
       * 
       * @access public
       * @param String[] $members An array of (user or group) distinguished names who are members (and therefore allowed to see/use) this package object
       * @return void
       */
      public function setMembers( $members ) {
      
             $this->members = $members;
      }
      /**
       * Sets the location property of the PackageDTO object
       * 
       * @access public
       * @param String $location The location of a package file relative to its repository where the package can be downloaded
       * @return void
       */
      public function setLocation( $location ) {
      
             $this->location = $location;
      }
      /**
       * Sets the parentDn property of the PackageDTO object
       * 
       * @access public
       * @param String $paretDn The distinguished name of the package's LDAP parent object       * 
       * @return void
       */
      public function setParentDn( $parentDn ) {
      
             $this->parentDn = $parentDn;
      }
      /**
       * Sets the dn property of the PackageDTO object
       * 
       * @access public
       * @param String $dn The distinguished name of the package's LDAP parent object       * 
       * @return void
       */
      public function setDn( $dn ) {
      
             $this->dn = $dn;
      }
      /**
       * Sets the rpcRequestorDn property of the PackageDTO object
       * 
       * @access public
       * @param String $dn The distinguished name of the rpc user requesting the package 
       * @return void
       */
      public function setRpcRequestorDn( $dn ) {
      
             $this->rpcRequestorDn = $dn;
      }
      /**
       * Gets the cn property of the PackageDTO object
       * 
       * @access public
       * @return String The canonical name (cn) atrribute for this package
       */
      public function getCn() {

      	     return $this->cn;
      }
      /**
       * Gets the name property of the PackageDTO object
       * 
       * @access public
       * @return The name of the package
       */
      public function getDisplayName() {

      	     return $this->displayName;
      }
      /**
       * Gets the icon property of the PackageDTO object
       * 
       * @access public
       * @return The path to the icon file which is used to represent this package
       */
      public function getPackageIcon() {
      	
      	     return $this->packageIcon;
      }
      /**
       * Gets the classpath property of the PackageDTO object
       * 
       * @access public
       * @return The classpath dot syntax for this package object
       */
      public function getPackageClasspath() {
      	
      	     return $this->packageClasspath;
      }
      /**
       * Gets the packageType property of the PackageDTO object
       * 
       * @access public
       * @return The type of package (Used as an identifier within the API)
       */
      public function getPackageType() {

      	     return $this->packageType;
      }
      /**
       * Gets the packageDTO property of the PackageDTO object
       * 
       * @access public
       * @return The classpath to a data type object to associate with this package
       */
      public function getPackageDTO() {

      	     return $this->packageDTO;
      }
      /**
       * Gets the status property of the PackageDTO object
       * 
       * @access public
       * @param String $status The status of this package (active|disabled)
       */
      public function getPackageStatus() {
      	
      	     return $this->packageStatus;
      }
      /**
       * Gets the version property of the PackageDTO object
       * 
       * @access public
       * @param The version of this package object
       */
      public function getPackageVersion() {
      	
      	     return $this->packageVersion;
      }
      /**
       * Gets the members property of the PackageDTO object
       * 
       * @access public
       * @return An array of (user or group) distinguished names who are members (and therefore allowed to see/use) this package object
       */
      public function getMembers() {
      
             return $this->members;
      }
      /**
       * Gets the location property of the PackageDTO object
       * 
       * @access public
       * @return String The location of the package object relative to its repository
       */
      public function getLocation() {
      
             return $this->location;
      }
      /**
       * Gets the parentDn property of the PackageDTO object
       * 
       * @access public
       * @return String The distinguished name of the package's LDAP parent object
       */
      public function getParentDn() {
      
             return $this->parentDn;
      }
      /**
       * Gets the dn property of the PackageDTO object
       * 
       * @access public
       * @return String The distinguished name of the package
       */
      public function getDn() {
      
             return $this->dn;
      
      }
      /**
       * Gets the rpcRequestorDn property of the PackageDTO object
       * 
       * @access public
       * @return String The distinguished name of the rpc user requesting the package 
       */
      public function getRpcRequestorDn( $dn ) {
      
             return $this->rpcRequestorDn;
      }
}
?>