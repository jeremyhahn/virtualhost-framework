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
  * Billing Data Type Object
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.class.dto
  */

class BillingDTO {

      var $firstName;                    // First name of the person who owns this billing object
      var $lastName;                     // Last name of the person who owns this billing object
      var $displayName;                  // Display name of the person who owns this billing object
      var $description;                  // Description about the person who owns this billing object
      var $title;                        // Title of the person who owns this billing object
      var $telephoneNumber;              // Telephone number of the person who owns this billing object
      var $mail;                         // Email address of person who owns this billing object
      var $street;                       // The billing street address
      var $poBox;                        // The billing poBox
      var $city;                         // The billing city
      var $state;                        // The billing state 
      var $zip;                          // The billing zip/postal code
      var $uid;                          // The username which this person has choosen for their logon name
      var $password;                     // The password used to authenticate this user
      var $serviceId;                    // The service which this person desires to purchase
      var $ccname;                       // The name of this person as it appears on their credit card
      var $ccnumber;                     // The credit card number
      var $ccexpiry;                     // The credit card expiration date (MM/YYYY)
      var $ccv;                          // The credit card verifcation number (CCV)
      var $cctypeId;                     // The type of credit card being charged

      /**
       * The BillingDTO constructor
       * 
       * @access public
       */
	  public function BillingDTO() {
	  }
	  /**
	   * Sets the firstName property
	   * 
	   * @access public
	   * @param String The first name of the person who owns this billing object
	   * @return void
	   */
	  public function setfirstName( $name ) {

	  	     $this->firstName = $name;
	  }
	  /**
	   * Sets the lastName property
	   * 
	   * @access public
	   * @param String The last name of the person who owns this billing object
	   * @return void
	   */
	  public function setLastName( $name ) {

	  	     $this->lastName = $name;
	  }
	  /**
	   * Sets the displayName property
	   * 
	   * @access public
	   * @param String $name This person's name as they prefer to see it displayed
	   * @return void
	   */
	  public function setDisplayName( $name ) {

	  	     $this->displayName = $name;
	  }
	  /**
	   * Sets the description property
	   * 
	   * @access public
	   * @param String $description A description for the person who owns this billing object 
	   * @return void
	   */
	  public function setDescription( $description ) {

	  	     $this->description = $description;
	  }
	  /**
	   * Sets the telephoneNumber property
	   * 
	   * @access public
	   * @param String $number The telephoneNumber of the person who owns this billing object
	   * @return void
	   */
	  public function setTelephoneNumber( $number ) {

	  	     $this->telephoneNumber = $number;
	  }
	  /**
	   * Sets the mail property
	   * 
	   * @access public
	   * @param String $email The email address of the person who owns this billing object
	   * @return void
	   */
	  public function setMail( $email ) {

	  	     $this->mail = $email;
	  }
	  /**
	   * Sets the street property
	   * 
	   * @access public
	   * @param String $street The billing street address of the person who owns this billing object
	   * @return void
	   */
	  public function setStreet( $street ) {

	  	     $this->street = $street;
	  }
	  /**
	   * Sets the poBox property
	   * 
	   * @access public
	   * @param String $poBox The post office box address of the person who owns this billing object
	   * @return void
	   */
	  public function setPoBox( $poBox ) {

	  	     $this->poBox = $poBox;
	  }
	  /**
	   * Sets the city property
	   * 
	   * @access public
	   * @param String $ity The billing city of the person who owns this billing object
	   * @return void
	   */
	  public function setCity( $city ) {

	  	     $this->city = $city;
	  }
	  /**
	   * Sets the state property
	   * 
	   * @access public
	   * @param String $state The billing state of the person who owns this billing object
	   * @return void
	   */
	  public function setState( $state ) {

	  	     $this->state = $state;
	  }
	  /**
	   * Sets the zip property
	   * 
	   * @access public
	   * @param String $zip The billing zip code of the person who owns this billing object
	   * @return void
	   */
	  public function setZip( $zip ) {

	  	     $this->zip = $zip;
	  }
	  /**
	   * Sets the uid property
	   * 
	   * @access public
	   * @param String $uid The username which this person has choosen to log into the Virtual Host Framework
	   * @return void
	   */
	  public function setUid( $uid ) {

	  	     $this->uid = $uid;
	  }
	  /**
	   * Sets the password property
	   * 
	   * @access public
	   * @param String $password The password used to authenticate this user
	   * @return void
	   */
	  public function setPassword( $password ) {

	  	     $this->password = $password;
	  }
	  /**
	   * Sets the service property
	   * 
	   * @access public
	   * @param String $service The service identifer as it was choosen from the service drop-down by the person who owns this billing object
	   * @return void
	   */
	  public function setServiceId( $serviceId ) {

	  	     $this->serviceId = $serviceId;
	  }
	  /**
	   * Sets the ccname property
	   * 
	   * @access public
	   * @param String $name The name of this person as it appears on their credit card
	   * @return void
	   */
	  public function setCcname( $name ) {

	  	     $this->ccname = $name;
	  }
	  /**
	   * Sets the ccnumber property
	   * 
	   * @access public
	   * @param String $number The credit card number as it appears on this person's credit card
	   * @return void
	   */
	  public function setCcnumber( $number ) {

	  	     $this->ccnumber = $number;
	  }
	  /**
	   * Sets the ccexpiry property
	   * 
	   * @access public
	   * @param String $date The MM/YYYY formatted expiration date of this person's credit card
	   * @return void
	   */
	  public function setCcexpiry( $date ) {

	  	     $this->ccexpiry = $date;
	  }
	  /**
	   * Sets the ccv property
	   * 
	   * @access public
	   * @param String $code The credit card verification code as it appears on the card
	   * @return void
	   */
	  public function setCcv( $code ) {

	  	     $this->ccv = $code;
	  }
	  /**
	   * Sets the cctype property
	   * 
	   * @access public
	   * @param Integer $type The type of credit card being used for this billing transaction
	   *                      1: Cheque
	   *                      2: Visa
	   *                      3: MasterCard
	   *                      4: AMEX
	   *                      5: ACH
	   *                      6: Discovery
	   *                      7: Diners
	   *                      8: PayPal
	   * @return void
	   */
	  public function setCctypeId( $typeId ) {

	  	     $this->cctypeId = $typeId;
	  }
	  /**
	   * Gets the firstName property
	   * 
	   * @access public
	   * @return String The first name of the person who owns this billing object
	   */
	  public function getfirstName() {

	  	     return $this->firstName;
	  }
	  /**
	   * Gets the lastName property
	   * 
	   * @access public
	   * @return String The last name of the person who owns this billing object
	   */
	  public function getLastName() {

	  	     return $this->lastName;
	  }
	  /**
	   * Gets the displayName property
	   * 
	   * @access public
	   * @return String $name This person's name as they prefer to see it displayed
	   */
	  public function getDisplayName() {

	  	     return $this->displayName;
	  }
	  /**
	   * Gets the description property
	   * 
	   * @access public
	   * @return String $description A description for the person who owns this billing object 
	   */
	  public function getDescription() {

	  	     return $this->description;
	  }
	  /**
	   * Gets the telephoneNumber property
	   * 
	   * @access public
	   * @return String $number The telephoneNumber of the person who owns this billing object
	   */
	  public function getTelephoneNumber() {

	  	     return $this->telephoneNumber;
	  }
	  /**
	   * Gets the mail property
	   * 
	   * @access public
	   * @return String $email The email address of the person who owns this billing object
	   */
	  public function getMail() {

	  	     return $this->mail;
	  }
	  /**
	   * Gets the street property
	   * 
	   * @access public
	   * @return String $street The billing street address of the person who owns this billing object
	   */
	  public function getStreet() {

	  	     return $this->street;
	  }
	  /**
	   * Gets the poBox property
	   * 
	   * @access public
	   * @return String $poBox The post office box address of the person who owns this billing object
	   */
	  public function getPoBox() {

	  	     return $this->poBox;
	  }
	  /**
	   * Gets the city property
	   * 
	   * @access public
	   * @return String $ity The billing city of the person who owns this billing object
	   */
	  public function getCity() {

	  	     return $this->city;
	  }
	  /**
	   * Gets the state property
	   * 
	   * @access public
	   * @return String $state The billing state of the person who owns this billing object
	   */
	  public function getState() {

	  	     return $this->state;
	  }
	  /**
	   * Gets the zip property
	   * 
	   * @access public
	   * @return String $zip The billing zip code of the person who owns this billing object
	   */
	  public function getZip() {

	  	     return $this->zip;
	  }
	  /**
	   * Gets the uid property
	   * 
	   * @access public
	   * @return String $uid The username which this person has choosen to log into the Virtual Host Framework
	   */
	  public function getUid() {

	  	     return $this->uid;
	  }
	  /**
	   * Gets the password property
	   * 
	   * @access public
	   * @return String The password used to authenticate this user
	   */
	  public function getPassword() {

	  	     return $this->password;
	  }
	  /**
	   * Gets the service property
	   * 
	   * @access public
	   * @return String $service The service identifer as it was choosen from the service drop-down by the person who owns this billing object
	   */
	  public function getServiceId() {

	  	     return $this->serviceId;
	  }
	  /**
	   * Gets the ccname property
	   * 
	   * @access public
	   * @return String $name The name of this person as it appears on their credit card
	   */
	  public function getCcname() {

	  	     return $this->ccname;
	  }
	  /**
	   * Gets the ccnumber property
	   * 
	   * @access public
	   * @return String $number The credit card number as it appears on this person's credit card
	   */
	  public function getCcnumber() {

	  	     return $this->ccnumber;
	  }
	  /**
	   * Gets the ccexpiry property
	   * 
	   * @access public
	   * @return String $date The MM/YYYY formatted expiration date of this person's credit card
	   */
	  public function getCcexpiry() {

	  	     return $this->ccexpiry;
	  }
	  /**
	   * Gets the ccv property
	   * 
	   * @access public
	   * @return String $code The credit card verification code as it appears on the card
	   */
	  public function getCcv() {

	  	     return $this->ccv;
	  }
	  /**
	   * Gets the cctypeId property
	   * 
	   * @access public
	   * @return Integer $type The type of credit card being used for this billing transaction
	   *                      1: Cheque
	   *                      2: Visa
	   *                      3: MasterCard
	   *                      4: AMEX
	   *                      5: ACH
	   *                      6: Discovery
	   *                      7: Diners
	   *                      8: PayPal
	   */
	  public function getCctypeId() {

	  	     return $this->cctypeId;
	  }
}
?>