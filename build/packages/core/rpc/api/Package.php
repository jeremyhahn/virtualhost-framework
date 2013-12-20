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
  * Packages API Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.api
  */

class Package implements iVirtualHostFrameworkPackage, iVirtualHostFrameworkAPI {

      var $namespace = "packages.core.rpc.api";
      var $class     = "Packages";
      var $version   = "1.0";

      var $PackageDTO;
      var $Registry;
      var $LDAPServer;

      /**
       * The Packages constructor
       * 
       * @access public
       * @param PackageDTO A package data type object
       */
      public function Package( PackageDTO $PackageDTO ) {

      	     $this->Registry   =& Registry::getInstance();
             $this->LDAPServer =& $this->Registry->get( "LDAPServer" );
             $this->PackageDTO = $PackageDTO;
      }
      /**
       * Gets a list of all the packages which this user has permission to view
       * 
       * @access public
       * @param String $dn The distinguished name of the user account to get a list of packages for
       * @return Array The array of LDAP package objects which the specified distinguished name is a member
       */
      function getPackages() {

               // Return value
               $arrAllowedPackages = array();

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account and search for the user which is to be authenticated
         	   $this->LDAPServer->adminBind();

               // Perform search for basic UI packages (no packagetype attribute)
               $filter = "(&(objectClass=virtualHostFrameworkPackage)(!(packagetype=*)))";
               $packageAttrs = array();
               $arrPackages = $this->LDAPServer->getEntries( $filter, $packageAttrs );

               // Let the UI know if there arent any packages installed
	           if( !$arrPackages['count'] )
	               return false;

               // Iterate through each of the packages
               for( $i=0; $i<$arrPackages['count' ]; $i++ ) {

                    // Check each of the member attributes to see if this user is allowed access to the object
                    for( $j=0; $j<$arrPackages[$i]['member']['count']; $j++ ) {

	                    // Check to see if the user is a direct member of this package group and that the package is active
	           	        if( $arrPackages[$i]['member'][$j] == $this->PackageDTO->getRpcRequestorDn() && $arrPackages[$i]['packagestatus'][0] == "active" ) {

	           	            array_push( $arrAllowedPackages, $arrPackages[$i] );
	           	            break;
	           	         }
	           	         else {

	                        // The user is not a direct member of the package group. Assume the member DN belongs to a group(s) and
	                        // begin recursion in an effort to find the user DN in a child group.
	           	            if( !$this->recursiveGroupMembershipSearch( $arrPackages[$i]['member'][$j], $this->PackageDTO->getRpcRequestorDn() ) )
	          	                continue;
	           	            else {

                                array_push( $arrAllowedPackages, $arrPackages[$i] );
	           	                break;
	           	            } 
           	             }
                    }
               }

               // Unbind from the directory context
  	           $this->LDAPServer->unbind();

  	           // Close the LDAP connection
  	           $this->LDAPServer->close();

               // Return the array of packages the user is allowed to access
               if( sizeof( $arrAllowedPackages ) )
                   return $arrAllowedPackages;

  	           // Return failed
               return false;
	  }
	  /**
       * Performs a recursive search on groups starting with a specific group dn for a user distinguished name
       * 
       * @access private
       * @param string $group_dn The group DN to start searching on
       * @param string $user_dn The user DN to attempt to locate
       * @return mixed Returns an array of package attributes or false if the dn could not be found
       */
	  private function recursiveGroupMembershipSearch( $group_dn, $user_dn ) {

              // Search for the alleged group DN
              $searchFilter = "(objectClass=groupOfNames)";

              // We're looking for one of two things:
              // 1) The user's DN in a member attribute
              // 2) Child groups to further recurse
              $returnAttribs = array( "member" );

	  	      // Perform the search
	  	      try {
                    $arrObjects = $this->LDAPServer->readEntry( $group_dn, $searchFilter, $returnAttribs );
	                if( !$arrObjects[ 'count' ] )
			            return false;
		
		            // Start looking for the desired user's DN in a member attribute
		            for( $i=0; $i<$arrObjects['count']; $i++ ) {
		
		                 // Make sure we have a member attribute
		                 if( !$arrObjects[$i]['member']['count'] )
		                     return false;
		
		                 // Loop through each of the members
		                 for( $j=0; $j<$arrObjects[$i]['member']['count']; $j++ ) {
		
		                      // Check to see if the user is a member of this child group
		                      if( $arrObjects[$i]['member'][$j] == $user_dn )
		               	          return true;
		                  	  else
		               	          // Assume this is another group DN and continue recursion
		               	          $this->recursiveGroupMembershipSearch( $arrObjects[$i]['member'][$j], $user_dn );
		                 }    
		             }
	  	      }
	  	      catch( virtualHostFrameworkLDAPException $LDAPEx ) {

                     throw new virtualHostFrameworkAPIException( "Error while performing recursive package member search. " . $this->LDAPServer->getError() );
	  	      }
	  }
	  /**
       * Gets a list of all the repositories stored in the LDAP server
       * 
       * @access public
       * @return mixed An array of LDAP repository objects or false if there werent any repositories located
       */
	  public function getRepositories() {

             $arrRepositories = array();

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Set LDAP protocol version option
             $this->LDAPServer->setOption( LDAP_OPT_PROTOCOL_VERSION, $this->LDAPServer->protocol );

             // Bind using the LDAP administration account and search for the user which is to be authenticated
          	 $this->LDAPServer->adminBind();

             // Search for all of the packages installed on this server
             $reposFilter = "objectClass=virtualHostFrameworkRepository";
             $reposAttrs = array( "cn", "repositoryUrl" );

             $arrRepos = $this->LDAPServer->getEntries( $reposFilter, $reposAttrs );

             // Let the UI know if there arent any packages installed
	         if( !$arrRepos['count'] )
	             return false;

             // Prepare an array for return to the client 
	         for( $i=0; $i<$arrRepos['count']; $i++ )
                  $arrRepositories[ $i ] = array( "name" => $arrRepos[$i]['cn'][0], "URL" => $arrRepos[$i]['repositoryurl'][0] );

             // Unbind from the directory server
   	         $this->LDAPServer->unbind();

   	         // Return the repository array
   	         return $arrRepositories;
	  }
	  /**
       * Deletes a virtualHostFrameworkPackage object from the LDAP server
       * 
       * @access public
       * @param String $Classpath The classpath dot syntax location of the package
       * @return String The namespace of the package
       */
	  public function delete() {

               /*
                * File system requirements
                */

               $classpath = $this->PackageDTO->getPackageClasspath();
               $namespace = "";

               // Extract the actual namespace and script file name from the namespace
               $arrClasspath = explode( ".", $classpath );

               for( $i=0; $i<count( $arrClasspath ); $i++ ) {

                    // Operation starts in the packages folder
                    if( $arrClasspath[$i] == "packages" )
                        continue;

                    if( $i < sizeof( $arrClasspath ) - 1 )
                        $namespace .= $arrClasspath[ $i ];

                    if( $i <= count( $arrClasspath ) - 3 )
                        $namespace .= DIRECTORY_SEPARATOR;

                    if( $i == count( $arrClasspath ) - 1 )
                        $scriptPath = $namespace . DIRECTORY_SEPARATOR . $arrClasspath[ $i ] . ".js";
               }

               // Delete the script file
               if( !unlink( $scriptPath ) )
                   throw new virtualHostFrameworkAPIException( "Could not delete classpath '" . $scriptPath . "'" );

               // Recursive - Delete the parent directory if the directory is empty
               if( !$this->deleteEmptyDirectories( $namespace ) )
                   throw new virtualHostFrameworkAPIException( "Could not delete associated package namespace directories." );
               
               /*
                * LDAP requirements
                */

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account and search for the user which is to be authenticated
               $this->LDAPServer->adminBind();

               // Delete the package
               $this->LDAPServer->deleteEntry( $this->PackageDTO->getDn() );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return the namespace back to the client for processing
               return $namespace;
	  }
	  /**
       * Downloads and installs a new package
       * 
       * @access public
       */
       public function install() {

               /*
                * Perform file system requirements
                */

               // Extract the name of the archive from the location property of the new package
               $arrLocation = explode( "/", $this->PackageDTO->getLocation() );
               $archiveName = $arrLocation[ sizeof( $arrLocation ) -1 ];

               // Extract the actual namespace and script file name from the namespace
               $arrNamespace = explode( ".", $this->PackageDTO->getpackageClasspath() );
               for( $i=0; $i<sizeof( $arrNamespace ); $i++ ) {

                    if( $arrNamespace[$i] == "packages" )
                        continue;

                    if( $i < sizeof( $arrNamespace ) - 1 )
                       $namespace .= $arrNamespace[ $i ];
                    
                    if( $i <= sizeof( $arrNamespace ) - 3 )
                        $namespace .= ".";

                    if( $i == sizeof( $arrNamespace ) - 1 )
                        $script = $arrNamespace[ $i ] . ".js";
               }

               // Create the directory structure for the new package based on the namespace
               $packagePath = str_replace( ".", "/", $namespace );

               if( !is_dir( $packagePath ) ) {

                   $dirs = explode( "/", $packagePath );
                   $count = count($dirs);
                   $path = ".";
                   for( $i = 0; $i < $count; $i++ ) {
                       $path .= DIRECTORY_SEPARATOR . $dirs[$i];

                       if( !is_dir( $path ) && !mkdir( $path, 0777 ) )
                           throw new virtualHostFrameworkAPIException( "Error creating directory path: " . $path . "." );
                   }
               }

               // Download the package and save it to the packages namespace directory
               if( !$destination = fopen( $packagePath . DIRECTORY_SEPARATOR . $archiveName, "w" ) )
                   throw new virtualHostFrameworkAPIException( "Error connecting to download requested package from repository." );

			   if( !$source = fopen( $this->PackageDTO->getLocation(), "r" ) )
				   throw new virtualHostFrameworkAPIException( "Error  downloading requested package '" . $this->PackageDTO->getPackageClasspath() );

			   while( $data = fread( $source, 6000 ) )
				      if( !fwrite( $destination, $data ) ) throw new virtualHostFrameworkAPIException( "Error while writing package data to '" . $destination . "'." );

			   fclose( $source );
			   fclose( $destination );

			   // Unzip the downloaded package archive
			   $zip = new ZipArchive;

               if( $zip->open( $packagePath . DIRECTORY_SEPARATOR . $archiveName ) === TRUE ) {
                   $zip->extractTo( $packagePath );
                   $zip->close();
               }
               else {

                   // Let the administrator know the installation failed
                   throw new virtualHostFrameworkAPIException( "Error attempting to unzip the downloaded package." );

                   // Attempt to clean up residual data remnants
                   if( !unlink( $packagePath . DIRECTORY_SEPARATOR . $archiveName ) )
                       throw new virtualHostFrameworkAPIException( "Failed attempting to clean up failed install files at classpath: " + $packagePath  );
               }

               // Copy the contents of the zip file to the final destination
               $source_folder = str_replace( ".zip", "", $archiveName );
               if( !$this->copyDirectory( $packagePath . DIRECTORY_SEPARATOR . $source_folder, $packagePath ) )
                   throw new virtualHostFrameworkAPIException( "Could not copy package to its required location on the local file system. Please check that the web server account has permissions to create the required directory structure." );

               // Clean up the package installation process
               if( !unlink( $packagePath . DIRECTORY_SEPARATOR . $archiveName ) )
                   throw new virtualHostFrameworkAPIException( "Could not clean up after installation process at classpath '" + $packagePath . DIRECTORY_SEPARATOR . $archiveName );

               if( !$this->deleteDirectory( $packagePath . DIRECTORY_SEPARATOR . $source_folder ) )
                   throw new virtualHostFrameworkAPIException( "Could not clean up the source folder for newly downloaded package at '" . $packagePath . DIRECTORY_SEPARATOR . $source_folder ."'" );

               /*
                * Perform LDAP requirements
                */

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Set LDAP protocol version option
               $this->LDAPServer->setOption( LDAP_OPT_PROTOCOL_VERSION, $this->LDAPServer->protocol );

               // Bind using the LDAP administration account and search for the user which is to be authenticated
               $this->LDAPServer->adminBind();

               // Define the attributes for the new package object
               $dn = "cn=" . $this->PackageDTO->getCn() . "," . $this->PackageDTO->getParentDn();
               $attributes['cn']               = $this->PackageDTO->getCn();
               $attributes['packageClasspath'] = $this->PackageDTO->getPackageClasspath();
               $attributes['packageVersion']   = $this->PackageDTO->getpackageVersion();
               $attributes['packageStatus']    = "disabled";
               $attributes['objectClass'][0]   = "top";
               $attributes['objectClass'][1]   = "groupOfNames";
               $attributes['objectClass'][2]   = "virtualHostFrameworkPackage";

               // Define the default member DN ACL for this package
               $arrDN = explode( "|", $this->Registry->get( "Config" )->get( "PACKAGE_DEFAULT_MEMBERS" ) );
               for( $i=0; $i<sizeof( $arrDN ); $i++ )
                    $attributes['member'][$i] = $arrDN[$i];

               // Create the new package object
               $this->LDAPServer->addEntry( $dn, $attributes );

               // Unbind from the LDAP server
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return successful response
               return true;
       }
 	  /**
       * Updates a package object from the ldap browser package properties window
       * 
       * @access public
       * @return Boolean Returns true on success
       */
	  public function update() {

             $dn                        = $this->PackageDTO->getDn();
             $attrs['packageStatus']    = $this->PackageDTO->getPackageStatus();
             $attrs['packageClasspath'] = $this->PackageDTO->getPackageClasspath();
             $attrs['packageVersion']   = $this->PackageDTO->getPackageVersion();

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Use the new members list
             $members = $this->PackageDTO->getMembers();
             for( $i=0; $i<count( $members ); $i++ )
                  $attrs['member'][$i] = $members[$i];

             // Perform the rename opretaion
             $this->LDAPServer->updateEntry( $this->PackageDTO->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the array of account attributes
             return true;
	  }
	  /**
       * Renames a package object
       * 
       * @access public
       * @param String $newName The new name for the package
       * @return mixed Returns true on success or false on error
       */
	  public function rename() {

             // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Perform the rename opretaion
             $this->LDAPServer->renameEntry( $this->PackageDTO->getDn(), "cn=" . $this->PackageDTO->getCn(), $this->PackageDTO->getParentDn() );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the array of account attributes
             return true;
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
      /**
       * Recursively copies a source directory to the specified target directory
       * 
       * @access private
       * @param string $source The source directory to copy
       * @param string $target The target directory to copy the source directory into
       */
      private function copyDirectory( $source, $target ) {

              if ( is_dir( $source ) ) {

                   if( !is_dir( $target ) ) 
                       mkdir( $target, 0777 );
                       

	               $d = dir( $source );	
	               while( FALSE !== ( $entry = $d->read() ) ) {
	
	                      if ( $entry == "." || $entry == ".." )
	                           continue;
	
	                      $Entry = $source . DIRECTORY_SEPARATOR . $entry;           
		                  if ( is_dir( $Entry ) ) {
		
		                      copyDirectory( $Entry, $target . DIRECTORY_SEPARATOR . $entry );
		                      continue;
		                  }
		                  copy( $Entry, $target . DIRECTORY_SEPARATOR . $entry );
	                }
	                $d->close();
              }
              else {
                    copy( $source, $target );
              }

              return true;
      }
      /**
       * Recursively deletes the specified directory and its contents
       * 
       * @access private
       * @param string $directory The directory to delete
       */
      private function deleteDirectory( $directory ) {
        
	           $handle = opendir( $directory );

	           while( FALSE !== ($entry = readdir( $handle ) ) ) {
  	                 if( $entry != "." && $entry != ".." ) {

	                     $path = $directory .  DIRECTORY_SEPARATOR . $entry;
	  
		                 if( is_dir( $path ) )
		                     deleteDirectory( $path );
		                 else
		                     unlink( $path );
  	                 }
	           }
	           closedir( $handle );
               if( !rmdir( $directory ) )
                   return false;

               return true;
      }
      /**
       * Recursively deletes the specified directory if its empty and loops backwards up the tree until a directory is found with files
       * Stops when a directory is reached which contains data.
       * 
       * @access private
       * @param string $directory The parent directory to delete
       */
      private function deleteEmptyDirectories( $directory ) {

               $arrParents = explode( DIRECTORY_SEPARATOR, $directory );
               for( $i=0; $i<sizeof( $arrParents ); $i++ ) {

                    if( $i < sizeof( $arrParents ) - 1 )
                    	$parentDir = $arrParents[$i];

                    if( $i < sizeof( $arrParents ) - 2 )
                        $parentDir .= DIRECTORY_SEPARATOR;
               }

	           $handle = opendir( $directory );

	           while( FALSE !== ($entry = readdir( $handle ) ) ) {
  	                 if( $entry != "." && $entry != ".." ) {

	                     $path = $directory .  DIRECTORY_SEPARATOR . $entry;
	  
		                 if( is_dir( $path ) )
		                     deleteEmptyDirectories( $path );

		                 else if( is_file( $path ) ) 
		                          return true; // Exit - this directory contains valid data
		                 
		                 else // Directory is empty
		                     deleteEmptyDirectories( $parentDir );
  	                 }
	           }
	           closedir( $handle );
               if( !rmdir( $directory ) )
                   return false;

               return true;
      }
      
}
?>