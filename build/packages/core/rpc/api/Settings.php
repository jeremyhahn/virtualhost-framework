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
  * Settings Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.rpc.core.api
  */

class Settings implements iVirtualHostFrameworkAPI {

	  var $SQLServer;

	  /**
	   * The Configuration Constructor
	   */
	  public function Settings() {

             $Registry        =& Registry::getInstance();
             $this->SQLServer =& $Registry->get( "SQLServer" );
	  }
	  /**
	   * Inserts a configuration value
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name and value
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function insert( $params, $objError ) {

             $this->SQLServer->query( "INSERT INTO configs( " . $params[0] . " ) VALUES( '" . $params[1] . "' );" );
             return true;
	  }
	  /**
	   * Updates a configuration value
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name and value
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function update( $params, $objError ) {

             $this->SQLServer->query( "UPDATE configs SET value='" . $params[1] . "' WHERE name='" . $params[0] . "';" );
             return true;
	  }
	  /**
	   * Deletes a configuration value
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function delete( $params, $objError ) {

             $this->SQLServer->query( "DELETE FROM configs WHERE name='" . $params[0] . "';" );
             return true;
	  }
	  /**
	   * Updates all of the LDAP configuration variables
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function updateLdapConfigs( $params, $objError ) {

             $sql  = "UPDATE configs SET value='" . $params[0] . "' WHERE name='LDAP_TYPE';";
             $sql .= "UPDATE configs SET value='" . $params[1] . "' WHERE name='LDAP_SERVER';";
             $sql .= "UPDATE configs SET value='" . $params[2] . "' WHERE name='LDAP_PORT';";
             $sql .= "UPDATE configs SET value='" . $params[3] . "' WHERE name='LDAP_BASE';";
             $sql .= "UPDATE configs SET value='" . $params[4] . "' WHERE name='LDAP_USER';";
             $sql .= "UPDATE configs SET value='" . $params[5] . "' WHERE name='LDAP_PASS';";
             $sql .= "UPDATE configs SET value='" . $params[6] . "' WHERE name='LDAP_SSL';";
             $sql .= "UPDATE configs SET value='" . $params[7] . "' WHERE name='LDAP_VERSION';";
             $sql .= "UPDATE configs SET value='" . $params[8] . "' WHERE name='LDAP_HOSTING_OU_RDN';";

             $this->SQLServer->query( $sql );
             return true;
	  }
	  /**
	   * Updates all of the package configuration variables
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function updatePackageConfigs( $params, $objError ) {

             $sql = "UPDATE configs SET value='" . $params[0] . "' WHERE name='PACKAGE_DEFAULT_MEMBER_DN';";
             $sql .= "UPDATE configs SET value='" . $params[1] . "' WHERE name='PACKAGE_OU_DN';";

             $this->SQLServer->query( $sql );
             return true;
	  }
	  /**
	   * Updates all of the repository configuration variables
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function updateRepositoryConfigs( $params, $objError ) {

             $sql = "UPDATE configs SET value='" . $params[0] . "' WHERE name='REPOSITORY_OU_DN';";

             $this->objConfig->objSqlite->exec( $sql );
             return true;
	  }
	  /**
	   * Retrieves all of the LDAP configuration variable values
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function getLdapConfigs( $params, $objError ) {

             $retval = array();
             $result = $this->SQLServer->query( "SELECT * FROM configs WHERE name LIKE 'LDAP_%';" );
             $arrConfigs = $result->fetchAll();

             for( $i=0; $i<sizeof( $arrConfigs ); $i++ )
                  $retval[ $i ] = array( "name" => $arrConfigs[$i]['name'], "value" => $arrConfigs[$i]['value'] );

             return $retval;
	  }
	  /**
	   * Retrieves all of the package configuration variable values
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function getPackageConfigs( $params, $objError ) {

             $retval = array();
             $result = $this->SQLServer->query( "SELECT * FROM configs WHERE name LIKE 'PACKAGE_%';" );
             $arrConfigs = $result->fetchAll();

             for( $i=0; $i<sizeof( $arrConfigs ); $i++ )
                  $retval[ $i ] = array( "name" => $arrConfigs[$i]['name'], "value" => $arrConfigs[$i]['value'] );

             return $retval;
	  }
	  /**
	   * Retrieves all of the repository configuration variable values
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function getRepositoryConfigs( $params, $objError ) {

             $retval = array();
             $result = $this->SQLServer->query( "SELECT * FROM configs WHERE name LIKE 'REPOSITORY_%';" );
             $arrConfigs = $result->fetchAll();

             for( $i=0; $i<sizeof( $arrConfigs ); $i++ )
                  $retval[ $i ] = array( "name" => $arrConfigs[$i]['name'], "value" => $arrConfigs[$i]['value'] );

             return $retval;
	  }
	  /**
	   * Retrieves all of the directory service classes
	   * 
	   * @access public
	   * @param array $params Placeholder to accept data from RPC server
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function getSupportedLdapServers( $params, $objError ) {

             $retval = array();
             $i=0;
             if( $handle = opendir( $_SERVER[ 'DOCUMENT_ROOT' ] . "/" . "packages/core/rpc/classes/directory/services/" )  ) {
                 while(false !== ($file = readdir( $handle ) ) ) {
                 	
                   if( $file == "." || $file == ".." )
                       continue;

                   $retval[ $i ] = str_replace( ".php", "", $file );
                  sort( $retval );
                   $i++;
                 }
             }
             return $retval;
	  }
	  /**
	   * Supports the Virtual Host Framwork API 
	   * 
	   * @type member
	   * @param method $method The method to invoke
	   * @param array $params An array of arguments to pass into the method
	   * @param object $objError The JSON RPC error handling object
	   */
	  public function invoke( $method, $params, $objError ) {

             // Execute the requested method, passing the RPC params and error handling object
	  	     if( !$result = $this->$method( $params, $objError ) )
	  	         return false;

	  	     return $result;
	  }
}
?>