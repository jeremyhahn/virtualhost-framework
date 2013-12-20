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
  * SSHClient Network Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.net
  */

// Include exception handling class
require_once( "virtualHostFrameworkSSHException.php" );

class SSHClient {

      var $namespace = "packages.core.rpc.class.net.ssh";
      var $class     = "SSH";
      var $version   = "1.0";

      var $handle;
      var $stream;

      /**
       * The SSH constructor
       * 
       * @access public
       */
	  public function SSHClient() {

      }
	  /**
       * Establishes a connection with the specified ssh server
       * 
       * @access public
       * @param string $host The hostname of the ssh server to establish the connection with
       * @param object $port The port number of the ssh server
       * @return array Returns true on success and false on fail
       */
	  public function connect( $host, $port ) {

             // SSH2 is kinda a PITA to install - assume its not here
             if( !function_exists( "ssh2_connect" ) )
                 throw new virtualHostFrameworkSSHException( "PHP ssh2 library not found. Please ensure that the version of PHP<br>installed on the web server is running the lastest version of the ssh2 libraries." );

             // Attempt to establish a connection
             if( !$this->handle = ssh2_connect( $host, $port ) )
                 throw new virtualHostFrameworkSSHException( "Failed to establish an SSH connection with '" . $host . ":" . $port . "'," );
	  }
	  /**
       * Authenticates a username and password against the remote ssh server's local authentication mechanism
       * 
       * @access public
       * @param string $username The username to log into the ssh server with
       * @param object $password The password to authenticate the user with
       * @return array Returns true on success and false on fail
       */
	  public function authenticate( $username, $password ) {
	  	
	  	     if( !ssh2_auth_password( $this->handle, $username, $password ) )
	  	         throw new virtualHostFrameworkSSHException( "Authentication failure" );
	  }
	  /**
       * Executes a command on the ssh server
       * 
       * @access public
       * @param string $cmd The command to execute on the remote server
       * @return array Returns true on success and false on failure
       */
	  public function execute( $cmd ) {
	  	
	  	     if( !$this->stream = ssh2_exec( $this->handle, $cmd ) )
	  	         throw new virtualHostFrameworkSSHException( "Failed to execute command '" . $cmd . "'." ); 
	  }
	  /**
       * Reads a response from the ssh server after a command has been executed
       * 
       * @access public
       * @return array Returns the response from the ssh server
       */
	  public function read() {

             // Wait for response from the server
	  	     stream_set_blocking( $this->stream, true );

             // Read the data from the tcp stream
	  	     $data = "";
	  	     while( $buffer = fread( $this->stream, 4096 ) )
	  	            $data .= $buffer;

             // Return the data
	  	     return $data;
	  }
	  /**
       * Closes the connection to the tcp stream
       * 
       * @access public
       */
	  public function close() {

	  	     fclose( $this->stream );
	  }
}
?>