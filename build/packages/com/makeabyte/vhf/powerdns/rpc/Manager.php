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
  * PowerDNS LDAP Management Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.com.makeabyte.vhf.powerdns.rpc
  */

class Manager implements ivirtualHostFrameworkDNSServer {

      var $namespace = "packages.com.makeabyte.vhf.powerdns.rpc";
      var $class     = "Manager";
      var $version   = "1.0";

      var $Registry;
      var $LDAPServer;
      var $Config;
      var $DNSDTOEx;

      /**
       * The group properties constructor
       * 
       * @access public
       */
	  public function Manager( DNSDTOEx $DNSDTOEx ) {

             $this->Registry   =& Registry::getInstance();
             $this->LDAPServer =& $this->Registry->get( "LDAPServer" );
             $this->Config     =& $this->Registry->get( "Config" );
             $this->DNSDTOEx   =  $DNSDTOEx; 
	  }
	  /**
       * Retrieves a list of zone which are owned by the specified distinguished name
       * 
       * @access public
       * @return array Returns an array of zones which belong to the specified associatedName
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
      function getZones() {

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Define the filter and attribute array
               $filter = "(&(objectclass=dcObject)(associatedname=" . $this->DNSDTOEx->getAssociatedName() . "))";
               $attrs = array();

               // Perform the search opretaion
               $result = $this->LDAPServer->getEntries( $filter, $attrs );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return the array of zones
               return $result;
	  }
	  /**
       * Deltes all DNS zones owned by the specified distinguished name
       * 
       * @access public
       * @return bool Returns true on success
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
      function deleteZones() {

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               $filter = "(&(objectclass=dcObject)(associatedname=" . $this->DNSDTOEx->getAssociatedName() . "))";
               $attrs = array();

               // Perform the search opretaion
               $result = $this->LDAPServer->getEntries( $filter, $attrs );

               // Delete each of the zones
               for( $i=0; $i<$result['count']; $i++ )
               	   $this->LDAPServer->deleteEntry( $result[$i]['dn'] );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return success
               return true;
	  }
	  /**
       * Retrieves a list of DNS records for the specified zone
       * 
       * @access public
       * @return array Returns an array of records for the specified zone distinguished name
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
      function getRecords() {

                // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               $filter = "objectclass=*";
               $attrs = array();

               // Perform the search opretaion
               $result = $this->LDAPServer->readEntry( $this->DNSDTOEx->getDn(), $filter, $attrs );

               // Unbind from the directory context
               $this->LDAPServer->unbind();
               
               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return the array of account attributes
               return $result[0];
	  }
	  /**
       * Adds defined DNSDTOEx record properties to a the specified zone
       * 
       * @access public
       * @return bool Returns true on success
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
	  public function addRecord() {

      	     $attrs = array();

             // Add each of the values to the zone object properties to the attribute array
             foreach( get_object_vars( $this->DNSDTOEx ) as $property => $value ) {

	                  if( $property == "dn" ) // LDAP no likey :(
	                      continue;

	                  // Add only the properties/attributes which have been defined
	                  if( $value ) {

	                      // If this is an array, this is a multi-values attribute which
	                      // needs to have its existing attribute values preserved.
	                      if( is_array( $value ) ) {

	                          for( $i=0; $i<count( $value ); $i++ )
	                               $attrs[ $property ][$i] = $value[$i];
	                      }
	                      else
	                           $attrs[ $property ] = $value;
	                  }
	         }

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Add the reqested record
             $this->LDAPServer->addAttrib( $this->DNSDTOEx->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return success
             return true;
      }
      /**
       * Updates defined DNSDTOEx record properties for the specified zone
       * 
       * @access public
       * @return bool Returns true on success
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
	  function updateRecord() {
	  	       
	  	       // Attribute array
	  	       $attrs = array();

	  	       // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Add each of the values to the zone object properties to the attribute array
               foreach( get_object_vars( $this->DNSDTOEx ) as $property => $value ) {
	
	                    if( $property == "dn" ) // LDAP no likey :(
	                        continue;
	
	                    // Add only the properties/attributes which have been defined
	                    if( $value ) {

	                        // If this is an array, this is a multi-values attribute which
	                        // needs to have its existing attribute values preserved.
	                        if( is_array( $value ) ) {

	                            for( $i=0; $i<count( $value ); $i++ )
	                                 $attrs[ $property ][$i] = $value[$i];
	                        }
	                        else
	                             $attrs[ $property ] = $value;
	                    }
	           }

               // Perform the update opretaion
               $this->LDAPServer->updateEntry( $this->DNSDTOEx->getDn(), $attrs );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return the array of account attributes
               return true;
	  }
	  /**
       * Deletes defined DNSDTOEx record properties from the specified zone
       * 
       * @access public
       * @return bool Returns true on success
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
	  public function deleterecord() {

             $attrs = array();

             // Add each of the values to the zone object properties to the attribute array
             foreach( get_object_vars( $this->DNSDTOEx ) as $property => $value ) {

                      if( $property == "dn" ) // LDAP no likey :(
                          continue;

                      // Add only the properties/attributes which have been defined
                      if( $value ) {

                          // If this is an array, this is a multi-values attribute which
                          // needs to have its existing attribute values preserved.
                          if( is_array( $value ) ) {

                              for( $i=0; $i<count( $value ); $i++ )
                                   $attrs[ $property ][$i] = $value[$i];
                          }
                          else
                               $attrs[ $property ] = $value;
                      }
             }

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account
             $this->LDAPServer->adminBind();

             // Delete the requested record(s)    
             $this->LDAPServer->deleteAttrib( $this->DNSDTOEx->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();
             
             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return the result
             return true;
      }
	  /**
	   * Creates a new zone file using user defined SOA values and application default A, MX and NS records
       * 
       * @access public
       * @return bool Returns true if the operation completed successfully
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
	  public function addZone() {

             // Create SOA record
             if( !$this->DNSDTOEx->getSOARecord() )
                 $soa = $this->Config->get( "DNS_SOA" );
             else
                 $soa = $this->DNSDTOEx->getSOARecord();

             // Assign new LDAP object SOA record
             $attrs['soarecord'] = $soa;

             $pieces = explode( ".", $this->DNSDTOEx->getAssociatedDomain() );
             $dc = $pieces[0];

             // Create dns components
             $attrs['dc'] = $dc;
             $attrs['objectclass'][0] = "top";
             $attrs['objectclass'][1] = "dcObject";
             $attrs['objectclass'][2] = "dNSDomain";
             $attrs['objectclass'][3] = "domainRelatedObject";
             $attrs['objectclass'][4] = "virtualHostFrameworkDomain";

             // Get default NS records to configure the domain
             $Recs = $this->Config->get( "DNS_NS" );
             $pieces = explode( "|", $Recs );
             for( $i=0; $i<count( $pieces ); $i++ )
                 $attrs['nsrecord'][$i] = $pieces[$i];
              // Get default A records to configure the domain
             $Recs = $this->Config->get( "DNS_A" );
             $pieces = explode( "|", $Recs );
             for( $i=0; $i<count( $pieces ); $i++ )
                  $attrs['arecord'][$i] = $pieces[$i];
             // Get default MX records to configure the domain
             $Recs = $this->Config->get( "DNS_MX" );
             $pieces = explode( "|", $Recs );
             for( $i=0; $i<count( $pieces ); $i++ )
                  $attrs['mxrecord'][$i] = $pieces[$i];

             // Assign the dns domain name (this is the attribute power dns uses to answer requests)
             $attrs['associatedDomain'] = $this->DNSDTOEx->getAssociatedDomain();

             // Configure the owner of the domain
             $attrs['associatedName']   = $this->DNSDTOEx->getAssociatedName();

             // Configure the status attribute  - default to active
             $attrs['accountStatus'] = "active";

       	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Add the new group
             $this->LDAPServer->addEntry( $this->DNSDTOEx->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return successful response
             return true;
      }
      /**
       * Updates the specified zone attribute with the specified value
       * 
       * @access public
       * @return bool Returns true on success
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
	  public function updateZone() {

             // Add SOA record to attribute array
             $attrs['soarecord'] = $this->DNSDTOEx->getSOARecord();

      	     // Connect to the LDAP server
             $this->LDAPServer->connect();

             // Bind using the LDAP administration account and search for the user which is to be authenticated
             $this->LDAPServer->adminBind();

             // Add the new group
             $this->LDAPServer->updateEntry( $this->DNSDTOEx->getDn(), $attrs );

             // Unbind from the directory context
             $this->LDAPServer->unbind();

             // Close the LDAP connection
             $this->LDAPServer->close();

             // Return success
             return true;
      }
      /**
       * Deletes a zone from the LDAP server
       * 
       * @access public
       * @return bool Returns true on success
       *         Exception Throws virtualHostFrameworkAPIException on error
       */
      function deleteZone() {

               // Connect to the LDAP server
               $this->LDAPServer->connect();

               // Bind using the LDAP administration account
               $this->LDAPServer->adminBind();

               // Perform the delete operation
               $this->LDAPServer->deleteEntry( $this->DNSDTOEx->getDn() );

               // Unbind from the directory context
               $this->LDAPServer->unbind();

               // Close the LDAP connection
               $this->LDAPServer->close();

               // Return success
               return true;
	  }
}
?>