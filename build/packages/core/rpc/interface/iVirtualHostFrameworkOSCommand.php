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
  * Virtual Host Framework Operating System Command Interface
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.interface
  */

interface ivirtualHostFrameworkOSCommand {

          public function getUptime();
	      public function getHostname();
	      public function getIpAddresses();
	      public function createHomeDirectory( $username, $password );
	      public function deleteHomeDirectory( $uidNumber );
	      public function createMailDirectory( $uidNumber, $quota );
	      public function deleteMailDirectory( $uidNumber );
}
?>