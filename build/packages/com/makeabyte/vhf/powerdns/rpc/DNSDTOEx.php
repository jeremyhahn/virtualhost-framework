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
  * LDAP DNS Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */

// Load the parent AccountDTO class
Registry::getInstance()->get( "Classloader" )->load( "packages.core.rpc.class.dto.AccountDTO" );

class DNSDTOEx extends AccountDTO {

      var $DNSTTL;
      var $DNSClass;
      var $ARecord;
      var $CNAMERecord;
      var $MXRecord;
      var $WKSRecord;
      var $PTRRecord;
      var $HINFORecord;
      var $MINFORecord;
      var $TXTRecord;
      var $RPRecord;
      var $AFSDBRecord;
      var $SIGRecord;
      var $KEYRecord;
      var $GPOSRecord;
      var $AAAARecord;
      var $LOCRecord;
      var $NXTRecord;
      var $SRVRecord;
      var $NAPTRRecord;
      var $KXRecord;
      var $CERTRecord;
      var $A6Record;
      var $DNAMERecord;
      var $APLRecord;
      var $DSRecord;
      var $SSHFPRecord;
      var $IPSECKEYRecord;
      var $RRSIGRecord;
      var $NSECRecord;
      var $DNSKEYRecord;
      var $DHCIDRecord;
      var $SPFRecord;
      var $SOARecord;
      var $accountStatus;
      var $associatedName;
      var $associatedDomain;
      var $dn;

      /**
       * The constructor for the DNSDTOEx Object
       * 
       * @access public
       */
      public function DNSDTOEx() {
      }
      /**
       * Sets the DNSTTL property
       * 
       * @access public
       * @param integer $ttl The Time-To-Live value for this zone
       * @return void
       */
      public function setDNSTTL( $ttl ) {

      	     $this->DNSTTL = $ttl;
      }
      /**
       * Sets the DNSClass property
       * 
       * @access public
       * @param string $class The DNS class of this zone
       * @return void
       */
      public function setDNSClass( $class ) {

      	     $this->DNSClass = $class;
      }
      /**
       * Sets the ARecord property
       * 
       * @access public
       * @param string $value The ARecord value
       * @return void
       */
      public function setARecord( $value ) {
      	
      	     $this->ARecord = $value;
      }
      /**
       * Sets the MXRecord property
       * 
       * @access public
       * @param string $value The MXRecord value
       * @return void
       */
      public function setMXRecord( $value ) {
      	
      	     $this->MXRecord = $value;
      }
      /**
       * Sets the CNAMERecord property
       * 
       * @access public
       * @param string $value The CNAMERecord value
       * @return void
       */
      public function setCNAMERecord( $value ) {
      	
      	     $this->CNAMERecord = $value;
      }
      /**
       * Sets the WKSRecord property
       * 
       * @access public
       * @param string $value The WKSRecord value
       * @return void
       */
      public function setWKSRecord( $value ) {
      	
      	     $this->WKSRecord = $value;
      }
      /**
       * Sets the PTRRecord property
       * 
       * @access public
       * @param string $value The PTRRecord value
       * @return void
       */
      public function setPTRRecord( $value ) {
      	
      	     $this->PTRRecord = $value;
      }
      /**
       * Sets the HINFORecord property
       * 
       * @access public
       * @param string $value The HINFORecord value
       * @return void
       */
      public function setHINFORecord( $value ) {
      	
      	     $this->HINFORecord = $value;
      }
      /**
       * Sets the MINFORecord property
       * 
       * @access public
       * @param string $value The MINFORecord value
       * @return void
       */
      public function setMINFORecord( $value ) {
      	
      	     $this->MINFORecord = $value;
      }
      /**
       * Sets the TXTRecord property
       * 
       * @access public
       * @param string $value The TXTRecord value
       * @return void
       */
      public function setTXTRecord( $value ) {
      	
      	     $this->TXTRecord = $value;
      }
      /**
       * Sets the RPRecord property
       * 
       * @access public
       * @param string $value The RPRecord value
       * @return void
       */
      public function setRPRecord( $value ) {
      
             $this->RPRecord = $value;	
      }
      /**
       * Sets the AFSDBRecord property
       * 
       * @access public
       * @param string $value The AFSDBRecord value
       * @return void
       */
      public function setAFSDBRecord( $value ) {
      	
      	     $this->AFSDBRecord = $value;
      }
      /**
       * Sets the SIGRecord property
       * 
       * @access public
       * @param string $value The SIGRecord value
       * @return void
       */
      public function setSIGRecord( $value ) {
      	
      	     $this->SIGRecord = $value;
      }
      /**
       * Sets the KEYRecord property
       * 
       * @access public
       * @param string $value The KEYRecord value
       * @return void
       */
      public function setKEYRecord( $value ) {
      
             $this->KEYRecord = $value;	
      }
      /**
       * Sets the GPOSRecord property
       * 
       * @access public
       * @param string $value The GPOSRecord value
       * @return void
       */
      public function setGPOSRecord( $value ) {
      	
      	     $this->GPOSRecord = $value;
      }
      /**
       * Sets the AAAARecord property
       * 
       * @access public
       * @param string $value The AAAARecord value
       * @return void
       */
      public function setAAAARecord( $value ) {
      	
      	     $this->AAAARecord = $value;
      }
      /**
       * Sets the LOCRecord property
       * 
       * @access public
       * @param string $value The LOCRecord value
       * @return void
       */
      public function setLOCRecord( $value ) {
      	
      	     $this->LOCRecord = $value;
      }
      /**
       * Sets the NXTRecord property
       * 
       * @access public
       * @param string $value The NXTRecord value
       * @return void
       */
      public function setNXTRecord( $value ) {
      	
      	     $this->NXTRecord = $value;
      }
      /**
       * Sets the SRVRecord property
       * 
       * @access public
       * @param string $value The SRVRecord value
       * @return void
       */
      public function setSRVRecord( $value ) {
      	
      	     $this->SRVRecord = $value;
      }
      /**
       * Sets the NAPTRRecord property
       * 
       * @access public
       * @param string $value The NAPTRRecord value
       * @return void
       */
      public function setNAPTRRecord( $value ) {
      	
      	     $this->NAPTRRecord = $value;
      }
      /**
       * Sets the KXRecord property
       * 
       * @access public
       * @param string $value The KXRecord value
       * @return void
       */
      public function setKXRecord( $value ) {
      	
      	     $this->KXRecord = $value;
      }
      /**
       * Sets the CERTRecord property
       * 
       * @access public
       * @param string $value The CERTRecord value
       * @return void
       */
      public function setCERTRecord( $value ) {
      	
      	      $this->CERTRecord = $value;
      }
      /**
       * Sets the A6Record property
       * 
       * @access public
       * @param string $value The A6Record value
       * @return void
       */
      public function setA6Record( $value ) {
      	
      	     $this->A6Record = $value;
      }
      /**
       * Sets the DNAMERecord property
       * 
       * @access public
       * @param string $value The DNAMERecord value
       * @return void
       */
      public function setDNAMERecord( $value ) {
      	
      	     $this->DNAMERecord = $value;
      }
      /**
       * Sets the APLRecord property
       * 
       * @access public
       * @param string $value The APLRecord value
       * @return void
       */
      public function setAPLRecord( $value ) {
      	
      	     $this->APLRecord = $value;
      }
      /**
       * Sets the DSRecord property
       * 
       * @access public
       * @param string $value The DSRecord value
       * @return void
       */
      public function setDSRecord( $value ) {
      	
      	     $this->DSRecord = $value;
      }
      /**
       * Sets the SSHFPRecord property
       * 
       * @access public
       * @param string $value The SSHFPRecord value
       * @return void
       */
      public function setSSHFPRecord( $value ) {
      	
      	     $this->SSHFPRecord = $value;
      }
      /**
       * Sets the IPSECKEYRecord property
       * 
       * @access public
       * @param string $value The IPSECKEYRecord value
       * @return void
       */
      public function setIPSECKEYRecord( $value ) {
      	
      	     $this->IPSECKEYRecord = $value;
      }
      /**
       * Sets the RRSIGRecord property
       * 
       * @access public
       * @param string $value The RRSIGRecord value
       * @return void
       */
      public function setRRSIGRecord( $value ) {
      	
      	     $this->RRSIGRecord = $value;
      }
      /**
       * Sets the NSECRecord property
       * 
       * @access public
       * @param string $value The NSECRecord value
       * @return void
       */
      public function setNSECRecord( $value ) {
      	
      	     $this->NSECRecord = $value;
      }
      /**
       * Sets the DNSKEYRecord property
       * 
       * @access public
       * @param string $value The DNSKEYRecord value
       * @return void
       */
      public function setDNSKEYRecord( $value ) {
      	
      	     $this->DNSKEYRecord = $value;
      }
      /**
       * Sets the DHCIDRecord property
       * 
       * @access public
       * @param string $value The DHCIDRecord value
       * @return void
       */
      public function setDHCIDRecord( $value ) {
      	
      	     $this->DHCIDRecord = $value;
      }
      /**
       * Sets the SPFRecord property
       * 
       * @access public
       * @param string $value The SPFRecord value
       * @return void
       */
      public function setSPFRecord( $value ) {
      	
      	     $this->SPFRecord = $value;
      }
      /**
       * Sets the SOARecord property
       * 
       * @access public
       * @param string $value The SOARecord value
       * @return void
       */
      public function setSOARecord( $value ) {
      	
      	     $this->SOARecord = $value;
      }
      /**
       * Sets the accountStatus property
       * 
       * @access public
       * @param string $value The status of this dns account (active|disabled)
       * @return void
       */
      public function setAccountStatus( $status ) {
      	
      	     $this->accountStatus = $status;
      }
      /**
       * Sets the associatedName property
       * 
       * @access public
       * @param string $dn The distinguished name of the account who owns this dns object
       * @return void
       */
      public function setAssociatedName( $dn ) {

      	     $this->associatedName = $dn;
      }
      /**
       * Sets the associatedDomain property
       * 
       * @access public
       * @param string $name The fully qualified domain name for this zone object
       * @return void
       */
      public function setAssociatedDomain( $name ) {

      	     $this->associatedDomain = $name;
      }
      /**
       * Sets the dn property
       * 
       * @access public
       * @param string $dn The distinguished name of this DNS LDAP object
       * @return void
       */
      public function setDn( $dn ) {

             $this->dn = $dn;
      }
      /**
       * Gets the DNSTTL property
       * 
       * @access public
       * @return integer The Time-To-Live value for this zone
       */
      public function getDNSTTL() {

      	     return $this->DNSTTL;
      }
      /**
       * Gets the DNSClass property
       * 
       * @access public
       * @return string The DNS class of this zone
       */
      public function getDNSClass() {

      	     return $this->DNSClass;
      }
      /**
       * Sets the ARecord property
       * 
       * @access public
       * @return string The ARecord value
       */
      public function getARecord( $value ) {
      	
      	     return $this->ARecord;
      }
      /**
       * Sets the MXRecord property
       * 
       * @access public
       * @return string The MXRecord value
       */
      public function getMXRecord() {
      	
      	     return $this->MXRecord;
      }
      /**
       * Sets the CNAMERecord property
       * 
       * @access public
       * @return string The CNAMERecord value
       */
      public function getCNAMERecord() {
      	
      	     return $this->CNAMERecord;
      }
      /**
       * Gets the WKSRecord property
       * 
       * @access public
       * @return string The WKSRecord value
       */
      public function getWKSRecord() {
      	
      	     return $this->WKSRecord;
      }
      /**
       * Gets the PTRRecord property
       * 
       * @access public
       * @return string The PTRRecord value
       */
      public function getPTRRecord() {
      	
      	     return $this->PTRRecord;
      }
      /**
       * Gets the HINFORecord property
       * 
       * @access public
       * @return string The HINFORecord value
       */
      public function getHINFORecord() {
      	
      	     return $this->HINFORecord;
      }
      /**
       * Gets the MINFORecord property
       * 
       * @access public
       * @return string The MINFORecord value
       */
      public function getMINFORecord() {
      	
      	     return $this->MINFORecord;
      }
      /**
       * Gets the TXTRecord property
       * 
       * @access public
       * @return string The TXTRecord value
       */
      public function getTXTRecord() {
      	
      	     return $this->TXTRecord;
      }
      /**
       * Gets the RPRecord property
       * 
       * @access public
       * @return string The RPRecord value
       */
      public function getRPRecord() {
      
             return $this->RPRecord;	
      }
      /**
       * Gets the AFSDBRecord property
       * 
       * @access public
       * @return string The AFSDBRecord value
       */
      public function getAFSDBRecord() {
      	
      	     return $this->AFSDBRecord;
      }
      /**
       * Gets the SIGRecord property
       * 
       * @access public
       * @return string $value The SIGRecord value
       */
      public function getSIGRecord( $value ) {
      	
      	     $this->SIGRecord = $value;
      }
      /**
       * Gets the KEYRecord property
       * 
       * @access public
       * @return string $value The KEYRecord value
       * @return void
       */
      public function getKEYRecord( $value ) {
      
             $this->KEYRecord = $value;	
      }
      /**
       * Gets the GPOSRecord property
       * 
       * @access public
       * @return string $value The GPOSRecord value
       * @return void
       */
      public function getGPOSRecord( $value ) {
      	
      	     $this->GPOSRecord( $value );
      }
      /**
       * Gets the AAAARecord property
       * 
       * @access public
       * @return string $value The AAAARecord value
       * @return void
       */
      public function getAAAARecord( $value ) {
      	
      	     $this->AAAARecord = $value;
      }
      /**
       * Gets the LOCRecord property
       * 
       * @access public
       * @return string The LOCRecord value
       * @return void
       */
      public function getLOCRecord() {
      	
      	     return $this->LOCRecord;
      }
      /**
       * Gets the NXTRecord property
       * 
       * @access public
       * @return string The NXTRecord value
       */
      public function getNXTRecord() {
      	
      	     return $this->NXTRecord;
      }
      /**
       * Gets the SRVRecord property
       * 
       * @access public
       * @return string The SRVRecord value
       */
      public function getSRVRecord() {
      	
      	     return $this->SRVRecord;
      }
      /**
       * Gets the NAPTRRecord property
       * 
       * @access public
       * @return string The NAPTRRecord value
       */
      public function getNAPTRRecord() {
      	
      	     return $this->NAPTRRecord;
      }
      /**
       * Gets the KXRecord property
       * 
       * @access public
       * @return string The KXRecord value
       */
      public function getKXRecord() {
      	
      	     return $this->KXRecord;
      }
      /**
       * Gets the CERTRecord property
       * 
       * @access public
       * @return string The CERTRecord value
       */
      public function getCERTRecord() {
      	
      	      return $this->CERTRecord;
      }
      /**
       * Gets the A6Record property
       * 
       * @access public
       * @return string The A6Record value
       * @return void
       */
      public function getA6Record() {
      	
      	     return $this->A6Record;
      }
      /**
       * Gets the DNAMERecord property
       * 
       * @access public
       * @return string The DNAMERecord value
       */
      public function getDNAMERecord() {
      	
      	     return $this->DNAMERecord;
      }
      /**
       * Gets the APLRecord property
       * 
       * @access public
       * @return string The APLRecord value
       */
      public function getAPLRecord() {
      	
      	     return $this->APLRecord;
      }
      /**
       * Gets the DSRecord property
       * 
       * @access public
       * @return string The DSRecord value
       */
      public function getDSRecord() {
      	
      	     return $this->DSRecord;
      }
      /**
       * Gets the SSHFPRecord property
       * 
       * @access public
       * @return string The SSHFPRecord value
       */
      public function getSSHFPRecord() {
      	
      	     return $this->SSHFPRecord;
      }
      /**
       * Gets the IPSECKEYRecord property
       * 
       * @access public
       * @return string The IPSECKEYRecord value
       */
      public function getIPSECKEYRecord() {
      	
      	     return $this->IPSECKEYRecord;
      }
      /**
       * Gets the RRSIGRecord property
       * 
       * @access public
       * @return string The RRSIGRecord value
       */
      public function getRRSIGRecord() {
      	
      	     return $this->RRSIGRecord;
      }
      /**
       * Gets the NSECRecord property
       * 
       * @access public
       * @return string The NSECRecord value
       */
      public function getNSECRecord() {
      	
      	     return $this->NSECRecord;
      }
      /**
       * Gets the DNSKEYRecord property
       * 
       * @access public
       * @return string The DNSKEYRecord value
       */
      public function getDNSKEYRecord() {
      	
      	     return $this->DNSKEYRecord;
      }
      /**
       * Gets the DHCIDRecord property
       * 
       * @access public
       * @return string The DHCIDRecord value
       */
      public function getDHCIDRecord() {
      	
      	     return $this->DHCIDRecord;
      }
      /**
       * Gets the SPFRecord property
       * 
       * @access public
       * @return string The SPFRecord value
       */
      public function getSPFRecord() {
      	
      	     return $this->SPFRecord;
      }
      /**
       * Gets the SOARecord property
       * 
       * @access public
       * @return string The SOARecord value
       */
      public function getSOARecord() {
      	
      	     return $this->SOARecord;
      }
      /**
       * Gets the accountStatus property
       * 
       * @access public
       * @return string The status of this dns account (active|disabled)
       */
      public function getAccountStatus() {
      	
      	     return $this->accountStatus;
      }
      /**
       * Gets the associatedName property
       * 
       * @access public
       * @return string The distinguished name of the account who owns this dns object
       */
      public function getAssociatedName() {

      	     return $this->associatedName;
      }
      /**
       * Gets the associatedDomain property
       * 
       * @access public
       * @return string The fully qualified domain name for this zone object
       */
      public function getAssociatedDomain() {

      	     return $this->associatedDomain;
      }
      /**
       * Gets the dn property
       * 
       * @access public
       * @return string The distinguished name of this DNS LDAP object
       */
      public function getDn() {

             return $this->dn;
      }
}
?>