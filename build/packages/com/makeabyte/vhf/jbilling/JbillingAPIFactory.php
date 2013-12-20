<?php

# PHP JBillingAPIFactory
# Copyright (C) 2008  Make A Byte, inc
# http://www.makeabyte.com

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
  * JbillingAPIFactory Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package com.makeabyte.contrib.jbilling.php
  */

// Required SOAP libraries
require_once( 'SOAP/Client.php' );
require_once( 'SOAP/Value.php' );

// Required JbillingAPIFactory classes
require_once( 'iJbillingAPI.php' );
require_once( 'JbillingAPIException.php' );
require_once( 'AchDTO.php' );
require_once( 'ContactDTO.php' );
require_once( 'CreateResponseWS.php' );
require_once( 'CreditCardDTO.php' );
require_once( 'InvoiceLineDTO.php' );
require_once( 'InvoiceWS.php' );
require_once( 'ItemDTOEx.php' );
require_once( 'OrderLineWS.php' );
require_once( 'OrderWS.php' );
require_once( 'PaymentAuthorizationDTO.php' );
require_once( 'PaymentAuthorizationDTOEx.php' );
require_once( 'PaymentInfoChequeDTO.php' );
require_once( 'PaymentWS.php' );
require_once( 'UserTransitionResponseWS.php' );
require_once( 'UserWS.php' );
require_once( 'WSDLAPI.php' );

class JbillingAPIFactory {

      private static $api = null;

      private function __construct() { }

      /**
	   * Create the getAPI method which returns a singleton object of the WSDLAPI
	   * NOTE: You can modify this routine to automatically retrieve your Jbilling API connection parameters or add another
	   *       API type, such as creating another API provider which uses PHP/Java integration performing native calls to EJBAPI
	   *       rather than using AXIS WSDL.
	   * 
	   * @access public
	   * @param Integer $url The uniform resource locator of the jbilling WSDL provider
	   * @param String $username The username of the jbilling API account to use for WSDL connection
	   * @param String $password The password used to authenticate the jbilling WSDL API account
	   * @return JbillingAPIFactory A singleton instance of JbillingAPIFactory which should be a handle to one of the supported jbilling PHP wrapper API providers
	   */
	  public static function getInstance( BillingDTO $BillingDTO ) {

             // Get Virtual Host Framework jbilling configuration
             $Registry =& Registry::getInstance();
             $Config   = $Registry->get( "Config" );

             // Create a new instance of the WSDLAPI provider
             if( self::$api == null )             
                 self::$api = new WSDLAPI( $Config->get( "BILLING_URL" ), $Config->get( "BILLING_USER" ), $Config->get( "BILLING_PASS" ), $BillingDTO );

             // Catch SOAP_Faults / JbillingAPIExceptions throws by the WSDL provider
             if( self::$api instanceof SOAP_Fault )
                 throw new JbillingAPIException( self::$api->message );

             // Return an instance of the WSDLAPI provider object 
             return self::$api;
	  }
}
?>