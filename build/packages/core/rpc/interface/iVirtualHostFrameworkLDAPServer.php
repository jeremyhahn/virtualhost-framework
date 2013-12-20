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
  * Virtual Host Framework LDAP Server Interface
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.interface
  */

interface iVirtualHostFrameworkLDAPServer {

          public function connect();
	      public function setOption( $option, $value );
	      public function bind();
    	  public function authBind( $username, $password );
    	  public function adminBind();
    	  public function getEntries( $filter, $attrs );
    	  public function getDistinguishedName( $name );
    	  public function getAttribs( $dn );
	  	  public function readEntry( $dn, $filter, $attrs );
    	  public function addEntry( $dn, $attrs );
	      public function addAttrib( $dn, $entry );
	      public function updateEntry( $dn, $attrs );
	      public function renameEntry( $dn, $name, $parent );
    	  public function deleteEntry( $dn );
    	  public function deleteAttrib( $dn, $entry );
    	  public function moveSubtree( $old_dn, $new_dn, $hierarchyBase=false, $newHierarchyBase=false );
    	  public function deleteSubtree( $dn );
          public function encryptPassword( $password );
          public function getRandomPassword();
	   	  public function unbind();
    	  public function close();
    	  public function getError();
}
?>