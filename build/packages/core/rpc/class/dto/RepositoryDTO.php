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
  
class RepositoryDTO {

      var $namespace = "packages.core.rpc.class.dto";
      var $class     = "RepositoryDTO";
      var $version   = "1.0";

      var $name;
      var $url;

      /**
       * The constructor for the RepositoryDTO object
       * 
       * @access public
       */
      public function RepositoryDTO() {
      }
      /**
       * Sets the name property of the RepositoryDTO object
       * 
       * @access public
       * @param String $name The name of the repository
       * @return void
       */
      public function setName( $name ) {

      	     $this->name = $name;
      }
      /**
       * Sets the url property of the RepositoryDTO object
       * 
       * @access public
       * @param String $url The uniform resource locator (URL) which this repository represents
       * @return void
       */
      public function setUrl( $url ) {
      	
      	     $this->url = $url;
      }
      /**
       * Gets the name property of the RepositoryDTO object
       * 
       * @access public
       * @return The name of the repository object
       */
      public function getName() {
      	
      	     return $this->version;
      }
      /**
       * Gets the url property of the RepositoryDTO object
       * 
       * @access public
       * @return The uniform resource locator (URL) which this repository represents
       */
      public function getUrl() {
      
             return $this->url;
      }
}
?>