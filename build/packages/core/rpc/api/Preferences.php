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
  * Preferences Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.api
  */

class Preferences {

      var $namespace = "packages.core.rpc.api";
      var $class     = "Preferences";
      var $version   = "1.0";

	  var $SQLServer;

	  /**
	   * The Configuration Constructor
	   */
	  public function Preferences() {

             $Registry          =& Registry::getInstance();
             $this->SQLServer   =& $Registry->get( "SQLServer" );
	  }
	  /**
	   * Inserts a configuration value
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name, value and DN
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function insert( $params, $objError ) {

             $this->SQLServer->query( "INSERT INTO prefs( dn, name, value, type ) VALUES( '" . $params[0] . "','" . $params[1] . "','" . $params[2] . "','" . $params[3] . "' );" );
             return true;
	  }
	  /**
	   * Updates a configuration value
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name, value and DN
	   * @param object $objError The JsonRpcError handler object
	   */
	  public function update( $params, $objError ) {

             $this->SQLServer->query( "UPDATE prefs SET value='" . $params[1] . "' WHERE name='" . $params[0] . "' AND dn='" . $params[2] . "';" );
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

             $this->SQLServer->query( "DELETE FROM prefs WHERE dn='" . $params[0] . "' AND value='" . $params[1] . "'" );
             return true;
	  }
	  /**
	   * Retrieves the list of external sites configured under this users preferences
	   * 
	   * @access public
	   * @param array $params The JSON RPC sent data containing the config variable name
	   * @param object $objError The JsonRpcError handler object
	   */
	   public function getExternalSites( $params, $objError ) {

             $retval = array();
             $result = $this->SQLServer->query( "SELECT * FROM prefs WHERE dn='" . $params[0] . "';" );
             $arrConfigs = $result->fetchAll();

             for( $i=0; $i<sizeof( $arrConfigs ); $i++ )
                  $retval[ $i ] = array( "name" => $arrConfigs[$i]['name'], "url" => $arrConfigs[$i]['value'] );

             return $retval;
	   }
	  /**
	   * Closes the database connection
	   * 
	   * @access public
	   * @return void
	   */
	  public function close() {

             $this->SQLServer = null;
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