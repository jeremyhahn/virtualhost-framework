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

# ----------------------------------------------------------------------------------------------->
# CONFIGURATION VARIABLES
# ----------------------------------------------------------------------------------------------->
define( 'SQL_TYPE', "sqlite" );
define( 'SQL_HOST', "/sqlite/p2phost.sqlite" );
define( 'SQL_USER', "" );
define( 'SQL_PASS', "" );
define( 'SQL_NAME', "" );

define( 'DEBUG', false );
# ----------------------------------------------------------------------------------------------->
# NO NEED TO MODIFY ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING!
# ----------------------------------------------------------------------------------------------->

// Instantiate the Classloader object
require( "core/rpc/util/Classloader.php" );
$Classloader = new Classloader();

// Load required object interfaces
$Classloader->load( "packages.core.rpc.util.InterfaceLoader" )->loadInterfaces();

// Create SQL connection Data Type Object
$objSQLConnection = $Classloader->load( "packages.core.rpc.class.dto.SQLConnectionDTO" );
$objSQLConnection->setDatabaseType(     SQL_TYPE );
$objSQLConnection->setDatabaseHost(     SQL_HOST );
$objSQLConnection->setDatabaseName(     SQL_NAME );
$objSQLConnection->setDatabaseUsername( SQL_USER );
$objSQLConnection->setDatabasePassword( SQL_PASS );
$objSQLConnection->setClassloader(      $Classloader );

// Instantiate SQLFactory object
require( "core/rpc/class/database/pdo/SQLFactory.php" );
$SQLServer = $Classloader->load( "packages.core.rpc.class.database.pdo.SQLFactory", $objSQLConnection );

// Instantiate the application Configuration object
$Config = $Classloader->load( "packages.core.rpc.class.util.Config", $SQLServer );

// Create encryption key Data Type Object
$objEncryptionKeyDTO = $Classloader->load(  "packages.core.rpc.class.dto.EncryptionKeyDTO" );
$objEncryptionKeyDTO->setKey( $Config->get( "CBC_SECRET" ) );
$objEncryptionKeyDTO->setIv(  $Config->get( "CBC_IV" ) );

// Instantiate the encryption object
$Encryption = $Classloader->load( "packages.core.rpc.class.security.Encryption", $objEncryptionKeyDTO );

// Create LDAP connection Data Type Object
$objLDAPConnection = $Classloader->load( "packages.core.rpc.class.dto.LDAPConnectionDTO" );
$objLDAPConnection->setType(        $Config->get( "LDAP_TYPE" ) );
$objLDAPConnection->setHost(        $Config->get( "LDAP_SERVER" ) );
$objLDAPConnection->setUsername(    $Config->get( "LDAP_USER" ) );
$objLDAPConnection->setPassword(    $Config->get( "LDAP_PASS" ) );
$objLDAPConnection->setBase(        $Config->get( "LDAP_BASE" ) );
$objLDAPConnection->setSsl(         $Config->get( "LDAP_SSL" ) );
$objLDAPConnection->setProtocol(    $Config->get( "LDAP_VERSION" ) );
$objLDAPConnection->setEncryption(  $Encryption );
$objLDAPConnection->setClassloader( $Classloader );

// Instantiate LDAPServer singleton instance
require_once( "core/rpc/class/directory/service/LDAPFactory.php" );
$LDAPServer =& LDAPFactory::getInstance( $objLDAPConnection );

// Initalize a global registry singleton instance to store objects for use within the JSON-RPC framework
require_once( "core/rpc/util/Registry.php" );
$Registry =& Registry::getInstance();
$Registry->set( "Classloader", $Classloader );
$Registry->set( "SQLServer",   $SQLServer );
$Registry->set( "Config",      $Config );
$Registry->set( "Encryption",  $Encryption );
$Registry->set( "LDAPServer",  $LDAPServer );
$Registry->set( "ExceptionHandler", $error ); // Defined in the JSON RPC server - TODO: re-write jsonrpc server :D fun!

// Instantiate OSCommand singleton instance
require_once( "core/rpc/class/operating/system/OSCommandFactory.php" );
$OSCommand =& OSCommandFactory::getInstance( $Classloader );

// Store the OSCommand instance in the registry
$Registry->set( "OSCommand", $OSCommand );
?>