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
  * LDAP Account Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */
  
class AccountDTO {

      var $givenName;
      var $sn;
      var $displayName;
      var $description;
      var $title;
      var $physicalDeliveryOfficeName;
      var $telephoneNumber;
      var $mail;
      var $street;
      var $postOfficeBox;
      var $l;
      var $st;
      var $postalCode;
      var $uid;
      var $uidNumber;
      var $cn;
      var $homeDirectory;
      var $accountStatus;
      var $accountRole;
      var $loginShell;
      var $userPassword;
      var $webQuota;
      var $ftpQuota;
      var $dnsDynamicUpdates;
      var $databaseQuota;
      var $dnsQuota;
      var $mailboxQuota;
      var $mailQuota;
      var $mailingListQuota;
      var $dn;
      var $bilingId;
      var $serviceId;

      /**
       * The constructor for the Account Data Type Object
       * 
       * @access public
       */
      public function AccountDTO() {
      }
      /**
       * Sets the givenName property of the AccountDTO object
       * 
       * @access public
       * @param String $name This persons first name
       * @return void
       */
      public function setGivenName( $name ) {
      	    
      	     $this->givenName = $name;
      }
      /**
       * Sets the sn property of the AccountDTO object
       * 
       * @access public
       * @param String $name This persons last name
       * @return void
       */      	
      public function setSn( $name ) {
      	 
      	     $this->sn = $name;
      }
      /**
       * Sets the displayName property of the AccountDTO object
       * 
       * @access public
       * @param String $name This name to display when referring to this person
       * @return void
       */
      public function setDisplayName( $name ) {
     
             $this->displayName = $name; 	
      }
      /**
       * Sets the description property of the AccountDTO object
       * 
       * @access public
       * @param String $desc A description for this person
       * @return void
       */
      public function setDescription( $desc ) {

             $this->description = $desc;
      }
      /**
       * Sets the title property of the AccountDTO object
       * 
       * @access public
       * @param String $title A title for this person
       * @return void
       */
      public function setTitle( $title ) {
      
             $this->title = $title;	
      }
      /**
       * Sets the physicalDeliveryOfficeName property of the AccountDTO object
       * 
       * @access public
       * @param String $name The physical location of the office where this person works 
       * @return void
       */
      public function setPhysicalDeliveryOfficeName( $name ) {
      
             $this->physicalDeliveryOfficeName = $name;
      }
      /**
       * Sets the telephoneNumber property of the AccountDTO object
       * 
       * @access public
       * @param String $number The telephone number for this person
       * @return void
       */
      public function setTelephoneNumber( $number ) {
     
             $this->telephoneNumber = $number; 	
      }
      /**
       * Sets the mail property of the AccountDTO object
       * 
       * @access public
       * @param String $mail The email address for this person
       * @return void
       */
      public function setMail( $mail ) {
      
             $this->mail = $mail;	
      }
      /**
       * Sets the givenName property of the AccountDTO object
       * 
       * @access public
       * @param String $street The street address for this person
       * @return void
       */
      public function setStreet( $street ) {

             $this->street = $street;	
      }
      /**
       * Sets the postOfficeBox property of the AccountDTO object
       * 
       * @access public
       * @param String $pobox The Po Box for thie person
       * @return void
       */
      public function setPostOfficeBox( $pobox  ) {

             $this->postOfficeBox = $pobox;
      }
      /**
       * Sets the l (city/locatily) property of the AccountDTO object
       * 
       * @access public
       * @param String $l The city/locality where this person resides
       * @return void
       */
      public function setL( $l ) {
     
             $this->l = $l;
      }
      /**
       * Sets the st property of the AccountDTO object
       * 
       * @access public
       * @param String $st The state or province where this person resides
       * @return void
       */
      public function setSt( $st ) {
     
             $this->l = $st;
      }
      /**
       * Sets the postalCode property of the AccountDTO object
       * 
       * @access public
       * @param Integer $code This postal code/zip code for this person
       * @return void
       */
      public function setPostalCode( $code ) {
      
             $this->postalCode = $code;
      }
      /**
       * Sets the uid property of the AccountDTO object
       * 
       * @access public
       * @param String $uid The logon name for this person
       * @return void
       */
      public function setUid( $uid ) {
     
             $this->uid = $uid;
      }
      /**
       * Sets the uidNumber property of the AccountDTO object
       * 
       * @access public
       * @param Integer $uidNumber The posixAccount user id for this account
       * @return void
       */
      public function setUidNumber( $int ) {
     
             $this->uidNumber = $int;
      }
      /**
       * Sets the cn property of the AccountDTO object
       * 
       * @access public
       * @param String $cn The canonical name for this user
       * @return void
       */
      public function setCn( $cn ) {
      
             $this->cn = $cn;	
      }
      /**
       * Sets the billingId property
       * 
       * @access public
       * @param Integer $id The identifier for this user within an external billing system
       * @return void
       */
      public function setBillingId( $id ) {
      
             $this->billingId = $id;	
      }
      /**
       * Sets the serviceId property
       * 
       * @access public
       * @param Integer $id An identifier to a service in an external billing system
       * @return void
       */
      public function setServiceId( $id ) {
      
             $this->serviceId = $id;	
      }
      /**
       * Sets the homeDirectory property of the AccountDTO object
       * 
       * @access public
       * @param String $dirPath This full path to the location of this persons home directory
       * @return void
       */
      public function setHomeDirectory( $dirPath ) {
     
             $this->homeDirectory = $dirPath; 	
      }
      /**
       * Sets the accountStatus property of the AccountDTO object
       * 
       * @access public
       * @param String $status The status of this user account (active|disabled)
       * @return void
       */
      public function setAccountStatus( $status ) {
     
             $this->accountStatus = $status; 	
      }
      /**
       * Sets the accountRole property of the AccountDTO object
       * 
       * @access public
       * @param String $role The role of this user within the virtual host framework environment
       * @return void
       */
      public function setAccountRole( $role ) {
      
             $this->accountRole = $role;	
      }
      /**
       * Sets the loginShell property of the AccountDTO object
       * 
       * @access public
       * @param String $name The unix/linux login shell to assign to this account
       * @return void
       */
      public function setLoginShell( $shell ) {
     
             $this->loginShell = $shell; 	
      }
      /**
       * Sets the userPassword property of the AccountDTO object
       * 
       * @access public
       * @param String $name The password used to authenticate the account
       * @return void
       */
      public function setUserPassword( $password ) {
     
             $this->userPassword = $password;
      }
      /**
       * Sets the webQuota property of the AccountDTO object
       * 
       * @access public
       * @param Integer $quota The maximum number of websites which this account is allowed to create
       * @return void
       */
      public function setWebQuota( $quota ) {
      
             $this->webQuota = $quota;	
      }
      /**
       * Sets the ftpQuota property of the AccountDTO object
       * 
       * @access public
       * @param String $quota The FTP quota properties (per_session,limit_type,bytes_in_avail,bytes_out_avail,bytes_xfer_avail, files_in_avail,files_out_avail,files_xfer_avail) assigned to this account 
       * @return void
       */
      public function setFtpQuota( $quota ) {
      
             $this->webQuota = $quota;	
      }
      /**
       * Sets the dnsDynamicUpdates property of the AccountDTO object
       * 
       * @access public
       * @param Boolean $bool True if this user is allows to use the dynamic dns api, false to disallow
       * @return void
       */
      public function setDnsDynamicUpdates( $bool ) {
      
             $this->dnsDynamicUpdates = $bool;
      }
      /**
       * Sets the databaseQuota property of the AccountDTO object
       * 
       * @access public
       * @param Integer $quota The maximum number of databases which this account is allowed to create
       * @return void
       */
      public function setDatabaseQuota( $quota ) {

             $this->databaseQuota = $quota;	
      }
      /**
       * Sets the dnsQuota property of the AccountDTO object
       * 
       * @access public
       * @param Integer $quota The maximum number of DNS domains which this account is allowed to create
       * @return void
       */
      public function setDnsQuota( $quota ) {

             $this->dnsQuota = $quota;
      }
      /**
       * Sets the mailboxQuota property of the AccountDTO object
       * 
       * @access public
       * @param Integer $quota The maximum number of mailboxes this user is allowed to create per domain
       * @return void
       */
      public function setMailboxQuota( $quota ) {

             $this->mailboxQuota = $quota;	
      }
      /**
       * Sets the mailQuota property of the AccountDTO object
       * 
       * @access public
       * @param Integer $quota The maximum size (in bytes) a mailbox for this account is allowed to grow
       * @return void
       */
      public function setMailQuota( $quota ) {

             $this->mailQuota = $quota; 	
      }
      /**
       * Sets the mailingListQuota property of the AccountDTO object
       * 
       * @access public
       * @param Integer $quota The maximum size (in bytes) a mailbox for this account is allowed to grow
       * @return void
       */
      public function setMailingListQuota( $quota ) {

             $this->mailingListQuota = $quota;	
      }
      /**
       * Sets the dn property of the AccountDTO object
       * 
       * @access public
       * @param String $dn The distinguished name of the account
       * @return void
       */
      public function setDn( $dn ) {

             $this->dn = $dn;	
      }
      /**
       * Gets the givenName property of the AccountDTO object
       * 
       * @access public
       * @return This persons first name
       */
      public function getGivenName() {
      	    
      	     return $this->givenName;
      }
      /**
       * Gets the sn property of the AccountDTO object
       * 
       * @access public
       * @return This persons last name
       */      	
      public function getSn() {
      	 
      	     return $this->sn;
      }
      /**
       * Gets the displayName property of the AccountDTO object
       * 
       * @access public
       * @return This name to display when referring to this person
       */
      public function getDisplayName() {
     
             return $this->displayName; 	
      }
      /**
       * Gets the description property of the AccountDTO object
       * 
       * @access public
       * @return A description for this person
       */
      public function getDescription() {

             return $this->description;
      }
      /**
       * Gets the title property of the AccountDTO object
       * 
       * @access public
       * @return A title for this person
       */
      public function getTitle() {
      
             return $this->title;	
      }
      /**
       * Gets the physicalDeliveryOfficeName property of the AccountDTO object
       * 
       * @access public
       * @return The physical location of the office where this person works 
       */
      public function getPhysicalDeliveryOfficeName() {
      
             return $this->physicalDeliveryOfficeName;
      }
      /**
       * Gets the telephoneNumber property of the AccountDTO object
       * 
       * @access public
       * @return The telephone number for this person
       */
      public function getTelephoneNumber() {
     
             return $this->telephoneNumber; 	
      }
      /**
       * Gets the mail property of the AccountDTO object
       * 
       * @access public
       * @return The email address for this person
       */
      public function getMail() {
      
             return $this->mail;	
      }
      /**
       * Gets the givenName property of the AccountDTO object
       * 
       * @access public
       * @return The street address for this person
       */
      public function getStreet() {

             return $this->street;	
      }
      /**
       * Gets the postOfficeBox property of the AccountDTO object
       * 
       * @access public
       * @return The Po Box for thie person
       */
      public function getPostOfficeBox() {

             return $this->postOfficeBox;
      }
      /**
       * Gets the l (city/locality) property of the AccountDTO object
       * 
       * @access public
       * @return The state/province where this person resides
       */
      public function getL() {
     
             return $this->l;
      }
      /**
       * Gets the st property of the AccountDTO object
       * 
       * @access public
       * @return The state/province where this person resides
       */
      public function getSt() {
     
             return $this->St;
      }
      /**
       * Gets the postalCode property of the AccountDTO object
       * 
       * @access public
       * @return This postal code/zip code for this person
       */
      public function getPostalCode() {
      
             return $this->postalCode;
      }
      /**
       * Gets the uid property of the AccountDTO object
       * 
       * @access public
       * @return The logon name for this person
       */
      public function getUid() {
     
             return $this->uid;
      }
      /**
       * Gets the uidNumber property of the AccountDTO object
       * 
       * @access public
       * @return Integer The posixAccount user id of this account
       */
      public function getUidNumber() {

             return $this->uidNumber;
      }
      /**
       * Gets the cn property of the AccountDTO object
       * 
       * @access public
       * @return The canonical name for this user
       */
      public function getCn() {
      
             return $this->cn;	
      }
      /**
       * Gets the homeDirectory property of the AccountDTO object
       * 
       * @access public
       * @return This full path to the location of this persons home directory
       */
      public function getHomeDirectory() {
     
             return $this->homeDirectory; 	
      }
      /**
       * Gets the accountStatus property of the AccountDTO object
       * 
       * @access public
       * @return The status of this user account (active|disabled)
       */
      public function getAccountStatus() {
     
             return $this->accountStatus; 	
      }
      /**
       * Gets the accountRole property of the AccountDTO object
       * 
       * @access public
       * @return The role of this user within the virtual host framework environment
       */
      public function getAccountRole() {
      
             return $this->accountRole;	
      }
      /**
       * Gets the loginShell property of the AccountDTO object
       * 
       * @access public
       * @return The unix/linux login shell to assign to this account
       */
      public function getLoginShell() {
     
             return $this->loginShell; 	
      }
      /**
       * Gets the userPassword property of the AccountDTO object
       * 
       * @access public
       * @return The password used to authenticate this account
       */
      public function getUserPassword() {
     
             return $this->userPassword; 	
      }
      /**
       * Gets the webQuota property of the AccountDTO object
       * 
       * @access public
       * @return The maximum number of websites which this account is allowed to create
       */
      public function getWebQuota() {
      
             return $this->webQuota;	
      }
      /**
       * Gets the ftpQuota property of the AccountDTO object
       * 
       * @access public
       * @return The FTP quota properties (per_session,limit_type,bytes_in_avail,bytes_out_avail,bytes_xfer_avail, files_in_avail,files_out_avail,files_xfer_avail) assigned to this account 
       */
      public function getFtpQuota() {
      
             return $this->webQuota;	
      }
      /**
       * Gets the dnsDynamicUpdates property of the AccountDTO object
       * 
       * @access public
       * @return True if this user is allows to use the dynamic dns api, false to disallow
       */
      public function getDnsDynamicUpdates() {
      
             return $this->dnsDynamicUpdates;
      }
      /**
       * Gets the databaseQuota property of the AccountDTO object
       * 
       * @access public
       * @return The maximum number of databases which this account is allowed to create
       */
      public function getDatabaseQuota() {

             return $this->databaseQuota;	
      }
      /**
       * Gets the dnsQuota property of the AccountDTO object
       * 
       * @access public
       * @return The maximum number of DNS domains which this account is allowed to create
       */
      public function getDnsQuota() {

             return $this->dnsQuota;
      }
      /**
       * Gets the mailboxQuota property of the AccountDTO object
       * 
       * @access public
       * @return The maximum number of mailboxes this user is allowed to create per domain
       */
      public function getMailboxQuota() {

             return $this->mailboxQuota;	
      }
      /**
       * Gets the mailQuota property of the AccountDTO object
       * 
       * @access public
       * @return The maximum size (in bytes) a mailbox for this account is allowed to grow
       */
      public function getMailQuota() {

             return $this->mailQuota; 	
      }
      /**
       * Gets the mailingListQuota property of the AccountDTO object
       * 
       * @access public
       * @return The maximum size (in bytes) a mailbox for this account is allowed to grow
       */
      public function getMailingListQuota() {

             return $this->mailingListQuota;	
      }
      /**
       * Gets the dn property of the AccountDTO object
       * 
       * @access public
       * @return The distinguished name of the account
       */
      public function getDn() {

             return $this->dn;	
      }
      /**
       * Gets the billingId property
       * 
       * @access public
       * @return Integer The billing identifier of this user within an external billing system
       */
      public function getBillingId() {

             return $this->billingId;	
      }
      /**
       * Gets the serviceId proeprty
       * 
       * @access public
       * @return Integer The identifier to a service id within an external billing system, which this account subscribes to
       */
      public function getServiceId() {

             return $this->serviceId;	
      }
}
?>