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
  * Configuration Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.util
  */

require_once( 'ConfigException.php' );

class Config {

	  var $namespace = "packages.core.rpc.class.util";
	  var $class     = "Config";
	  var $version   = "1.0";

	  var $SQLServer;

      /**
       * The Configuration constructor
       * 
       * @access public
       * @param SQLFactory $objSQL The virtual host framework SQLFactory object 
       */
	  function Config( SQLFactory $SQLServer ) {

               $this->SQLServer = $SQLServer;
               $this->init();
	  }
	  /**
	   * Initalizes the configuration object by getting all of the configuraiton variables and their coresponding values from the database
	   * 
	   * @access public
	   */
	  function init() {

	  	       try {
                   $result = $this->SQLServer->query( "SELECT * FROM configs;" );
                   $this->arrConfigs = $result->fetchAll();
               }
               catch( PDOException $e ) {
                     
                      throw new ConfigException( 420, "Could not connection to SQL server to get configuration variables." );
               }
	  }
	  /**
	   * Returns a configuration value
	   * 
	   * @access public
	   * @param string $name The configuration variable name
	   * @return The configuration variable value
	   */
	  function get( $name ) {

               foreach( $this->arrConfigs as $key => $row )
                        if( $row['name'] == $name )
                            return $row['value'];

               throw new ConfigException( 420, "Configuration variable '" . $name . "' not found." );
	  }
}
?>