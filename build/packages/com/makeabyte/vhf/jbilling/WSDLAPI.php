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
  * JbillingAPIFactory::WSDLAPI
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package com.makeabyte.contrib.jbilling.php
  */

class WSDLAPI implements iJbillingAPI, iVirtualHostFrameworkBilling {

      var $url;                        // The URL to the Jbilling WSDL provider
      var $username;                   // The username of a JBilling account which has API access
      var $password;                   // The password to authenticate the JBilling acccount
      var $soapClient;                 // The SOAP client proxy handle
      var $BillingDTO;                 // Virtual Host Framework billing data type object
      var $wsdlHandle;                 // Handle to SOAP_WSDL

      public function WSDLAPI( $url, $username, $password, $BillingDTO ) {

      	     $this->url      = $url;
      	     $this->username = $username;
      	     $this->password = $password;
      	     $this->BillingDTO = $BillingDTO;

             try {
	      	     // Establish a connection to the jbilling WSDL provider.
	             $authParams        = array( 'user' =>  $username, 'pass' => $password );
	             $this->wsdlHandle  = new SOAP_WSDL( $url, $authParams );
	             $this->soapClient  = $this->wsdlHandle->getProxy();

	             if( !$this->soapClient )
	                 throw new JbillingAPIException( "An error occurred attempting to retrieve WSDL from JBilling API server." );
	             
	             if( $this->soapClient instanceof SOAP_Fault )
	                 throw new JbillingAPIException( $this->soapClient->message );
             }
             catch( Exception $e ) {

                    throw new JbillingAPIException( "An error occurred attempting to instantiate the JBilling WSDL connection. " . $e->getMessage() );
             }
      }
      /**
       * This method provides user authentication. It is a shorthand for calling getUserId() 
       * and getUserWS() in sequence, while also checking the password in the process.
       * 
       * @access public
       * @param String $username The username to authenticate
       * @param String @password The password to authenticate the user with
       * @return Integer Returns one of the following values:
       *                 0: The user was successfully authenticated and his current status allows him entrance to the system.
       *                 1: Invalid credentials. The user name or password are not correct.
       *                 2: Locked account: The user name or password are incorrect, and this is the last allowed login attempt. From now on, the account is locked. 
       *                 3: Password expired: The credentials are valid, but the password is expired. The user needs to change it before logging in.
       */
      public function authenticate( $username, $password ) {

             $result = $this->getSoapClient()->authenticate( $username, $password );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;
             
      }
      /**
       * This method creates a new user.
       * 
       * @access public
       * @param UserWS $newUser The user data that will be used to create the new user record. The
       *                        username field of this structure must have a valid and unused user name string. The
       *                        userId field can be set to -1 since the unique identifier has not been generated yet
       *                        (jbilling generates it during this call).
       *                        If the contact or credit card information are present, they will be created for the new user as well.
       * @return mixed Integer: If the user has been successfully created, the return value is the newly created user's ID.
       *               Null:    If the user name has already been used by another user record, it returns null.
       *               JbillingAPIException: If the input data is null or missing, this method generates a JbillingAPIException
       *                                     that signals the problem.
       */
      public function createUser( UserWS $newUser ) {

      	     $result = $this->getSoapClient()->createUser( $this->__toComplexDataType( $newUser ) );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;
      }
      /**
       * Deletes an existing user. It will only mark the user as deleted, the record will remain in 
       * the database. It will do the same for all the orders, but will leave the invoices and payment untouched.
       * 
       * @access public
       * @param Integer $userId The jbilling identifier for the user that is being deleted. This id is
       *                        retrieved either from your application's data or by a previous call to getUserId().
       *
       * @return void
       *         Exception If the userId provided is null or inexistent, a JbillingAPIException is generated.
       */
       public function deleteUser( $userId ) {
       
              $result = $this->getSoalClient()->deleteUser( $userId );
              if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	          return $result;
       }
       /**
        * Updates the user contact information.
        * 
        * @access public
        * @param Integer $userId The identifier of the user whose contact information is being updated.
        * @param Integer $typeId The contact's type. This is typically a '2' for the primary contact type in 
        *                        an installation with only one company. You would need to query the table contact_type
        *                        to find out the IDs of all the type available in your system.
        * @param ContactWS $contact Maintains the contact data that is being updated.  
        */
       public function updateUserContact( $userId, $typeId, ContactWS $contact ) {
       	
              $result = $this->getSoalClient()->updateUserContact( $userId, $typeId, $this->__toComplexDataType( $contact ) );
              if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;
       }
       /**
        * This method updates the user account information in jbilling. This includes the contact and credit card information.
        * 
        * @access public
        * 
        * @param UserWS $user The user's data. Can be obtained by a previous call to getUserWS() or generated directly by your
        *                     application (be careful, if you don't put values into fields that haven't changed, you'll loose
        *                     those values, so it is best to first retrieve the data record with getUserWS() and just change the
        *                     required fields and resubmit the UserWS structure). The supplied UserWS structure must contain a valid user
        *                     identification number in its userId field.
        *                     
        *                     Three fields of the UserWS input parameter can be null. If the
        *                     following fields are null, they will simply be ignored: password, creditCard and contact. If you do not want
        *                     those fields to be updated, simply set their value to null.
        *
        *                     This is useful on occasions where the jbilling
        *                     configuration encrypts or does not make available certain values. The password and credit card are among them.
        *                     If that is the case, a call to getUserWS() will return values for those fields that won't pass the
        *                     validations of a subsequent call to updateUser.
        * @return void
        *         Exception If the user identifier supplied is incorrect or the parameter is null or invalid, this method throws a JbillingAPIException to signal the problem.   
        */
       public function updateUser( UserWS $user ) {
       
              $result = $this->getSoapClient()->updateUser( $this->__toComplexDataType( $user ) );
              if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;
       }
       /**
        * This method returns the user data contained in jbilling.
        * 
        * @access public
        * 
        * @param Integer $userId The identifier for the user whose account data is being retrieved.
        * @return UserWS The account information, or null if the supplied userId is not assigned to an 
        *                existing user. If the parameter is null or inexistent, a JbillingAPIException is generated.
        */
        public function getInvoiceWS( $invoiceId ) {

               $result = $this->soapClient->getInvoiceWS( $invoiceId );                	
               if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	           return $result;
        }
        /**
         * This method returns the user data contained in jbilling.
         * 
         * @access public
         * 
         * @param Integer $userId The identifier for the user whose account data is being retrieved.
         * @return UserWS The account information, or null if the supplied userId is not assigned to an 
         *                existing user. If the parameter is null or inexistent, a JbillingAPIException is generated.
         */
        public function getUserWS( $userId ) {

               $result = $this->getSoapClient()->getUserWS( $userId );
               if( $result instanceof SOAP_Fault )
                   throw new JbillingAPIException( $result->message );

   	           return $result;
        }
        /**
         * Returns the contact information for the user. An user can have several contact fields 
         * assigned to it (one primary contact plus any number of secondary contacts). This 
         * function returns all known contacts for the given user.
         * 
         * @param Integer userId The identifier for the user whose contact information is being retrieved. 
         * @return ContactWS[] An array of ContactWS structures containing all known contact records assigned to the user given as input.
         *         Exception   If the input parameter is null or inexistent, a JbillingAPIException is thrown.
 
         */
        public function getUserContactsWS( $userId ) {

               $result = $this->getSoapClient()->getUserContactsWS( $userId );
               if( $result instanceof SOAP_Fault )
                   throw new JbillingAPIException( $result->message );

   	           return $result;
        }
        /**
         * Returns the unique identifier associated to a user in jbilling. This method is meaningful specially during login,
         * where you use it to retrieve the user's ID from the supplied user name.
         * 
         * @param Integer userId The identifier for the user whose contact information is being retrieved. 
         * @return ContactWS[] An array of ContactWS structures containing all known contact records assigned to the user given as input.
         *         Exception   If the input parameter is null or inexistent, a JbillingAPIException is thrown.
         */
        public function getUserId( $username ) {

               $result = $this->getSoapClient()->getUserId( $username );
               if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	           return $result;
       }
       /**
        * Returns a list of all users in a given status. Useful for making synchronization calls between your application and jbilling,
        * or to otherwise process this information (for example, for a report).
        * 
        * @access public
        * @param Integer $statusId Indicates what status will be used for extraction. See Appendix A for a list of acceptable status codes.
        * @return Integer[] An array containing the identifiers of all users that were in the status given as input in the moment the
        *                   method was called (status transitions could occur after the method was called, so this information should
        *                   not be used to grant access to the site or to substitute the authorize() or getUserWS() methods for authentication).
        */       
      public function getUsersInStatus( $statusId ) {

             $result = $this->getSoapClient()->getUsersInStatus( $statusId );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;   	           
      }
      /**
       * The opposite of getUsersInStatus(), this method provides a list of all users that are not currently in the given status.
       * 
       * @access public
       * @param Integer @statusId Indicates what status will be used for extraction. See Appendix A for a list of acceptable status codes.
       * @return Integer[] An array containing the identifiers of all users that were in any status different to the one given as input
       *                   in the moment the method was called (status transitions could occur after the method was called, so this
       *                   information should not be used to grant access to the site or to substitute the authorize() or getUserWS()
       *                    methods for authentication).
       */
      public function getUsersNotInStatus( $statusId ) {
     
             $result = $this->getSoapClient()->getUsersNotInStatus( $statusId );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;   	          	
      }
      /**
       * Returns all users that share a common custom contact field with a specific value. See the section Custom Contact Fields for an
       * explanation on how to use these fields.
       * 
       * @access public
       * @param Integer $typeId Identifier of the custom contact field ID.
       * @param String $value The value that will be tested for all users in order to determine which users should be extracted.
       * @return Integer[] An array of all users that have the indicated custom field set to the specified value.
       */
      public function getUsersByCustomField( $typeId, $value ) {

             $result = $this->getSoapClient()->getUsersByCustomField( $typeId, $value );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;   	         
      }
      /**
       * Updates credit card information for a user. A user can have more than one credit card record. After calling this method,
       * the user will only have this credit card. This method will remove all the existing credit cards and then assign the one
       * given as a parameter.
       * 
       * @access public
       * @param Integer $userId The identifier of the user whose credit card information is being updated.
       * @param CreditCardDTO $creditCard The credit card's data with the updated values.
       * @return void
       *         Exception If the parameters provided are null or incorrect, a JbillingAPIException is thrown.
       */
      public function updateCreditCard( $userId, CreditCardDTO $creditCard ) {
     
             $result = $this->getSoapClient()->updateCreditCard( $userId, $this->__toComplexDataType( $creditCard ) );	
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;
      }
      /**
       * Returns a list of subscription transitions that have taken place in a given period of time. See the section Subscription status for
       * an explanation on how this function can be used.
       * 
       * @access public
       * @param Date $from Starting date of the extraction period. Can be null (in which case, the extraction period starts from the last
       *                   time this function was called, or from the first transition if the function has not yet been called).
       * @param Date $to Ending date of the extraction period. Can be null (in which case the extraction has no upper limit, i.e. It extracts
       *                 all records that have happened to this moment).
       * @return UserTransitionResponseWS[] Array of transition records containing the transition information for all registered changes in subscription status.
       */
      public function getUserTransitions( $from, $to ) {

             $result = $this->getSoapClient()->getUserTransitions( $from, $to );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;             
      }
      /**
       * This method facilitates the sign-up of a new customer. It will create the new user, and all the related objects:
       * purchase order, invoice and payment. The payment will only be created and processed if a credit card is included in the 
       * UserWS parameter. Therefore, the caller will always get values for the fields userId, orderId and invoiceId, but paymentId
       * and paymentResult would remain null if not credit card information is found in the UserWS parameter.
       * The payment will be submitted for immediate, real-time processing to the payment processor. The value in paymentResult
       * will reflect the response of the payment processor. An email notification will also be sent to the customer with the result of this
       * transaction.
       * To summarize, these are the tasks involved in this method:
       * 1. Creation of a new user
       * 2. Creation of a new purchase order for this new user.
       * 3. Generation of an invoice based on the purchase order.
       * 4. Real-time processing of a payment for the invoice through a payment processor.
       * 5. Notification via email of the result of this payment to the customer (if applicable, see the Notifications documentation for more information).
       * Steps 4 and 5 only take place if a credit card is present in the UserWS parameter. See the description of the createUser and createOrder methods for more information.
       * 
       * @access public
       * @param UserWS $user The account information for the user that is being created.
       * @param OrderWS $order The purchase order information to assign to the new user. The userId of this object can be null and will be ignored,
       *                       since this value will be assigned automatically with the userId of the newly created customer.
       * @return CreateResponseWS A data structure containing data about all the objects created.
       */
      public function create( UserWS $user, OrderWS $order ) {

             $result = $this->getSoapClient()->create( $this->__toComplexDataType( $user ), $this->__toComplexDataType( $order ) );
             if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

  	         return $result;
      }
      /**
       * This method creates an order. Then it submits pre-authorization payment request to a payment gateway. The result of this request is
       * returned as a PaymentAuthorizationDTOEx object. Regardless of the pre-authorization result, the order remains in the system after
       * this call. This method is typically called with an order whose 'active since' is set to a future date: this would represent a 'free trial',
       * where the paying period starts on the 'active since' date, but you need to verify the paying capabilities of the potential customer.
       * The billing process will generate the invoice at the 'active since' date, and then 'capture' the pre-authorization for the first payment.
       * This guarantees that the payment will be successful, since the payment gateway had already pre-authorized it.
       *
       * @access public
       * @param OrderWS $order Data for the order whose payment data is to be validated.
       * @return PaymentAuthorizationDTOEx Data structure containing the outcome of the payment verification process. If you need to know the
       *         ID of the new order, you will have to call 'getLatestOrder'.
       */
      public function createOrderPreAuthorize( OrderWS $order ) {

             $result = $this->getSoapClient()->createOrderPreAuthorize( $this->__toComplexDataType( $order ) );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;             
      }
      /**
       * Creates an order. When creating an order, you can indicate that the information of an order line should be fetched from the properties
       * of an existing item. This is done through the field OrderLineWS.useItem. If this flag is set to ‘true’, then the price of the order
       * line will be the price of the item designated in OrderLineWS.itemId. The behavior of some fields change depending on this flag:
       * 
       * @access public
       * @param OrderWS $order The order data.
       * @return Integer Identifier for the newly created order, if any, or null if the order data supplied was incorrect or insufficient.
       */
      public function createOrder( OrderWS $order ) {

             $result = $this->getSoapClient()->createOrder( $this->__toComplexDataType( $order ) );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;
      }
      /**
       * Creates a new order and contextually generates the corresponding invoice. Typically, you only create the order and then let the billing
       * process take care of the invoice generation. However, at times you might want to subscribe an existing user (if the user does not
       * exist, then it's better to call 'create') and immediately process the payment. In that case, you will call this method and then
       * call 'payInvoice' using the return value of 'getLatestInvoice'.
       * 
       * @access public
       * @param OrderWS $order The order data.
       * @return Integer Identifier for the newly created order, if any, or null if the order data supplied was incorrect or insufficient.
       */
      public function createOrderAndInvoice( OrderWS $order ) {

             $result = $this->getSoapClient()->createOrderAndInvoice( $this->__toComplexDataType( $order ) );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;             
      }
      /**
       * Updates an order's data. Calling this method will modify an existing purchase order. Since this method updates all the order fields
       * and all the order lines, normally the following steps are followed:
       * 1. A call to get to retrieve the current information
       * 2. Modify the fields to update. Add, update or remove order lines.
       * 3. Call update
       * 
       * The existing order lines will be deleted, and new ones will be created with those provided in the OrderWS object passed as
       * a parameter. In the end, the order identified by the field id will look exactly the same as the parameter passed.
       * The flag useItem present in each order line (OrderLineWS) works the same way when updating an order as it does when creating one.
       * This is something to consider when you want to add order lines to an existing purchase order. You could also use this flag when
       * updating an order line, but is not as common. Keep in mind that when your retrieve an order from the system, all its order lines
       * will be having the flag useItem equal to false, regardless on how the were created.
       * 
       * @access public
       * @param OrderWS $order The updated order data. This can be either obtained from a previous call to getOrder() or created directly
       * by your application, although the latter is unadvised (if you do not fill a field, its previous content is lost, so the advised
       * procedure is to first retrieve the data to update, make the changes needed and resubmit that same data back).
       * 
       * @return void
       *         Exception If the order information provided is invalid, a JbillingAPIException is generated.
       */
      public function updateOrder( OrderWS $order ) {

             $result = $this->getSoapClient()->updateOrder( $this->__toComplexDataType( $order ) );	
             if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

  	         return $result;
      }
      /**
       * Returns the order data for a specific order.
       * 
       * @access public
       * @param Integer $orderId Unique identifier for the order.
       * @return OrderWS The order information, or an exception if the supplied order ID is invalid or if the order ID belongs to a deleted order.
       *                 The object will have all the related order lines. 
       */
      public function getOrder( $orderId ) {

             $result = $this->getSoapClient()->getOrder( $orderId );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;
      }
      /**
       * Returns a list of all orders of a specific periodicity for a given user. The method only returns the order's IDs, so subsequent
       * calls to 'getOrder' are necessary if you need the objects.
       * 
       * @param Integer $userId The user for which the extraction is desired.
       * @param Integer $periodId Identifier for the period type. This value can be obtained from the jbilling User Interface
       * under “Orders -> Periods” or from your billing administrator.
       * @return Integer[] Array containing the identifiers for the orders that respond to the input parameters.
       */
      public function getOrderByPeriod( $userId, $periodId ) {

             $result = $this->getSoapClient()->getOrderByPeriod( $userId, $periodId );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;             
      }
      /**
       * Retrieves a specific order line by supplying its identifier.
       * 
       * @access public
       * @param orderLineId Integer Unique identifier of the desired order line. You would know about this ID by first getting a complete order.
       * @param OrderLineWS The order line's information.
       */
      public function getOrderLine( $orderLineId ) {

             $result = $this->getSoapClient()->getOrderLine( $orderLineId );
             if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	         return $result;
      }
      /**
       * Updates the order line with the supplied information. This can be used to also delete an order line. If the 'quantity' field of
       * the order line is set to '0', the order line is not updated, it is instead removed.
       * 
       * @access public
       * @param OrderLineWS $line The updated order line data to be stored in jbilling.
       * @return void
       *         Exception If the provided order line data is invalid or does not correspond to an existing order line, the method generates a JbillingAPIException.
       */
      public function updateOrderLine( OrderLineWS $line ) {
      
             $result = $this->getSoapClient()->updateOrderLine( $line );	
             if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;
      }
      /**
       * Retrieves the latest order created for a given user account. This is true unless the order has been deleted. This method will
       * filter out any deleted order.
       * 
       * @access public
       * @param Integer $userId The user account's unique identifier.
       * @return OrderWS The data for the latest order inserted for the user, or null if the user has not yet been assigned an order or all the orders have been deleted.
       */
      public function getLatestOrder( $userId ) {

             $result = $this->getSoapClient()->getLatestOrder( $userId );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;
      }
      /**
       * The ids of the last n purchase orders belonging to the user id given as a first parameter will be returned as an array. The
       * first element of the array will be the latest purchase order. The next element will be the previous purchase order and so on.
       * Subsequent calls to getOrder are necessary to retrieve the related OrderWS objects. The caller should check if the purchase
       * order is not deleted by verifying that that deleted == 0. If the customer does not have any purchase orders, an empty array is returned.
       * 
       * @access public
       * @param Integer $userId The user account for which the extraction is to be performed.
       * @param Integer $number The maximum number of orders that should be extracted.
       * @return Integer[] Array containing the order identifiers for the most recent orders created for this user. This method does not differentiate between deleted and non-deleted orders.
       */
      public function getLastOrders( $userId, $number ) {

             $result = $this->getSoapClient()->getLastOrders( $userId, $number );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;             
      }
      /**
       * Calling this method will mark a purchase order record as deleted, along with all its order lines.
       * 
       * @access public
       * @param Integer $orderId The unique identifier of the order that is to be deleted.
       * @return void
       *         Exception If the order identifier provided as input is null or does not correspond to an existing order, the method throws a JbillingAPIException.
       */
      public function deleteOrder( $id ) {
      
             $result = $this->getSoapClient()->deleteOrder( $id );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;
      }
      /**
       * This method creates a new item. A new record with this item information will be inserted in the database. This method is
       * frequently used to automate the uploading of a large number of items during the initial setup.
       * 
       * @access public
       * @param ItemDTOEx $dto Information for the item that is being created.
       * @return Integer The newly created item's identifier.
       *         Exception If required fields in the input data structure are missing, a JbillingAPIException is thrown to signal the error.
       */
      public function createItem( ItemDTOEx $dto ) {

             $result = $this->getSoapClient()->createItem( $dto );               	
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	          return $result;
      }       
      /**
        * This method returns a list of all items registered for a company in jbilling at the moment the call is placed. It is useful to
        * keep the data in other application synchronized with jbilling.
        * 
        * @access public
        * @return ItemDTOEx[] Array of item description data structures containing the information for all items currently registered in jbilling.
        */
      public function getAllItems() {

             $result = $this->getSoapClient()->getAllItems();
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;              	
      }
      /**
       * This method retrieves the invoice information regarding a specific invoice in the system.
       * 
       * @access public
       * @param Integer $invoiceId Identifier for the invoice that should be retrieved.
       * @return InvoiceWS Contains the information regarding the invoice that was requested.
       *         Exception If the identifier supplied as argument is null or does not represent a currently existing invoice, a JbillingAPIException is thrown.
       */
      public function getInvoceWS( $invoiceId ) {
      	
             $result = $this->getSoapClient()->getInvoiceId();
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;
      	     
      }
      /**
       * Calling this method will delete the invoice record from the database, along with all its invoice lines. It will also remove any
       * links between the invoice and any related payments, increasing the payments balance accordingly.
       * 
       * @access public
       * @param Integer $invoiceId The unique identifier of the invoice that is to be deleted.
       * @return void
       *        Exception If the invoice identifier provided as input is null or does not correspond to an existing invoice, the method throws a JbillingAPIException.
       */
      public function deleteInvoice( $invoiceId ) {

              $result = $this->getSoapClient()->deleteInvoice( $invoiceId );
              if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;
      }
      /**
       * Returns the latest invoice that has been issued for a given user. This is particularly important because the latest invoice
       * typically represents the account balance of a customer (this does not have to be the case, but it is a typical jbilling configuration).
       * 
       * @access public
       * @param Integer $userId Identifier of the customer whose latest invoice is to be retrieved.
       * @param InvoiceWS Contains the information regarding the latest issued invoice for the user.
       *        Exception If the supplied user identifier is null or does not represent a currently existing user, a JbillingAPIException is thrown to signal the error.
       */
      public function getLatestInvoice( $userId ) {

             $result = $this->getSoapClient()->getLatestInvoice( $userId );	
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

 	         return $result;
      }
      /**
       * Use this method to retrieve several invoices belonging to a customer, starting from the last one. The method will return the ids of
       * the invoices, so you will have to call getInvoice to get the complete object related to each ID. The results will be returned
       * in inverse chronological order. This is a handy method to provide your customers with historical data regarding their invoices.
       * For example, getLastInvoices(1234, 12) will be returning the last 12 invoices of the customer id 1234, and if you invoice your
       * customers in a monthly basis, that means one year of invoices.
       * 
       * @param Integer $userId Identifier of the user whose latest invoices are to be retrieved.
       * @param Integer $integer The number of invoices that are to be retrieved for this user.
       * @return Integer[] Array of invoice identifiers of the latest n invoices for this customer. It is possible that the customer has
       *                  not generated as many invoices as requested (for example, you ask for the latest 10 invoices, but the system
       *                  has generated only 8 invoices so far, you'll be returned those 8 invoices, so it is good practice to double check
       *                  the size of the returned array). The caller should check if the invoice is not deleted by verifying that that
       *                  deleted == 0. If the customer does not have any invoices, an empty array is returned. If the userId provided
       *                  as parameter is either null or does not represent a currently existing user, a JbillingAPIException will be thrown, to
       *                  indicate the error condition.
       */
      public function getLastInvoices( $userId, $number ) {

             $result = $this->getSoapClient()->getLastInvoices( $userId, $number );	
             if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;
      }
      /**
       * Use this method to retrieve all the invoices created in a given period of time. The method will return the ids of the invoices, so
       * you will have to call getInvoice to get the complete object related to each ID. The results will be returned in no particular order.
       * This method can help you synchronize jbilling with other applications that require an updated list of invoices. For example, to
       * get all the invoices for January 2005, you would call, getInvoicesByDate(“2005-01-01”, “2005-01-31”).
       * 
       * @access public
       * @param Date $since The starting date for the data extraction.
       * @param Date $until The ending date for the data extraction.
       * @return Integer[] This method returns the invoices generated within the period specified by the parameters. Both dates are included
       * in the query. The date used for the query is the actual creation of the invoices (time stamp), regardless of the ‘invoice date’, that
       * is assigned following the billing rules and configuration parameters. Subsequent calls to getInvoice are necessary to retrieve the
       * related InvoiceWS objects. If the no invoices where generated for the specified period, an empty array is returned. If the
       * parameters do not follow the required format (yyyy-mm-dd), null is returned.      
       */
      public function getInvoicesByDate( $since, $until ) {

             $result = $this->getSoapClient()->getInvoicesByDate( $since, $until );
             if( $result instanceof SOAP_Fault )
                 throw new JbillingAPIException( $result->message );

   	         return $result;             
      }
      /**
       * This method enters a payment to the user account. It does not invoke any payment processes, it just signals the payment as “entered”.
       * It is useful to signal payments done via external payment processes (a cheque being cashed, for example). This method can apply a
       * payment of any type. The parameter for the related invoice, although optional, should always be specified to allow the system to
       * properly trace late payments.
       * 
       * @access public
       * @param PaymentWS $payment The data of the payment being applied.
       * @param Integer invoiceId Optionally identifies an invoice that is being paid by this payment. This parameter can be null
       *                 (indicating this payment does not cover a specific invoice, or covers more than one).
       * @return Integer Identifier of the newly created payment record.
       */
      public function applyPayment( PaymentWS $payment, $invoiceId ) {

              $result = $this->getSoapClient()->applyPayment( $payment, $invoiceId );
              if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;             
      }
      /**
       * This method executes a payment for a given invoice. The system will call the payment processor plug-in configured in your system
       * to access a payment gateway and submit the payment to it.
       * 
       * @access public
       * @param Integer $invoiceId Identifier of the invoice that is to be paid.
       * @return PaymentAuthorizationDTOEx Contains information about the payment operation, for example, if the payment attempt was successful
       *                                   or not. It will return null if the invoice does not have a balance greater than 0 or if the user does 
       *                                   not have a payment method that allows on-line payment processing (usually a credit card).
       */
       public function payInvoice( $invoiceId ) {
       

              $result = $this->getSoapClient()->payInvoice( $invoiceId );
              if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;
       }       
       /**
        * This method returns information about a specific payment.
        * 
        * @access public
        * @param Integer $paymentId Identifier of the payment to be retrieved.
        * @return PaymentWS $payment Information for the specified payment. If the input parameter is either null or does not correspond to a
        *                   currently existing payment record, a JbillingAPIException is issued.
        */
       public function getPayment( $paymentId ) {
       
              $result = $this->getSoapClient()->getPayment( $paymentId );
              if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;
       }
       /**
        * This method returns the latest payment entered or processed for a specific customer.
        * 
        * @access public
        * @param Integer $userId Identifier of the customer whose payment information is to be retrieved.
        * @return PaymentWS Information for this customer's latest payment. Can be null (no payments present for this customer).
        */
       public function getLatestPayment( $userId ) {
       
              $result = $this->getSoapClient()->getLatestPayment( $userId );
              if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;
       }
       /**
        * Use this method to retrieve several payments belonging to a customer, starting from the last one. The method will return the ids
        * of the payments, so you will have to call getPayment to get the complete object related to each ID. The results will be returned
        * in inverse chronological order. This is a handy method to provide your customers with historical data regarding their payments.
        * For example, getLastPayments(1234, 12) will be returning the last 12 payments of the customer id 1234.
        * 
        * @access public
        * @param Integer $userId Identifier of the customer whose payment information is to be retrieved.
        * @param Integer $number The number of payments to retrieve.
        * @return Integer[] Array of payment identifiers for the latest n payments processed for the user. If the input parameters are missing
        *                   or incorrect, a JbillingAPIException is issued.
        */
       public function getLastPayments( $userId, $number ) {

              $result = $this->getSoapClient()->getLastPayments( $userId, $number );
              if( $result instanceof SOAP_Fault )
                  throw new JbillingAPIException( $result->message );

   	          return $result;
       }

      /**
       * PHP implementation specific methods
       */

       /**
        * Recursively transforms a PHP object's properties (and any property values which are obejcts) to a SOAP VALUE array  
        * 
        * @access private
        * @param Object $obj The object to transform to a SOAP complex data type array
        */
       private function __toComplexDataType( $obj ) {

               $retval = array();

               // Convert the data type object properties to a soap value array
               foreach( get_object_vars( $obj ) as $property => $value ) {

                        // PEAR SOAP does not seem to preserve PHP data types very well and this causes the SOAP calls to the jbilling java based
                        // API to break since java is a strict definition language. This is a brave effort at matching PHP property value data types
                        // so they can be casted to expected data types by jbilling.

                        // Default to string
                        $dataType = "string";

                        // Matches SOAP dateTime type
                        if( preg_match( "/^[0-9]{4}[\/]?[\.]?[-]?[0-9]{2}[\/]?[\.]?[-]?[0-9]{2}T/", $value ) )
                            $dataType = "dateTime";

                        // Matches a PHP integer type
                        if( gettype( $value ) == "integer" )
                            $dataType = "int";

                        // Matches a boolean true/falue value
                        if( $value == "true" || $value == "false" )
                            $dataType = "boolean";

                        // Matches an array and transforms the array into a SOAP_VALUE complex data type value
                        if( is_array( $value ) ) {

                             $dataType = "arrayType";
                             $values = array();

                             // Iterate over each of the array values
	                         for( $i=0; $i<count( $value ); $i++ ) {

                                  if( is_object( $value[$i] ) ) { 

		                              $cls = new ReflectionClass( $value[$i] );
		                              array_push( $retval, new SOAP_VALUE( $property,
						                                                   $dataType,
						                                                   $this->__toComplexDataType( $value[$i] ),
						                                                   array( "SOAP-ENC:arrayType" => $this->__getDeserializer() . ":" . $cls->getName() . "[]",
						                                                          "xsi:type" => $this->__getDeserializer() . ":" . $cls->getName()
					                                                             )
					                                                     )
					                            );
                                  }
	                         }
                             continue;
                        }

                        // Transform the property object to a SOAP_VALUE complex data type
                        if( is_object( $value ) ) {

                            $dataType = $property;
                            array_push( $retval,  new SOAP_VALUE( $property, $dataType, $this->__toComplexDataType( $value ) ) );
                            continue;
                        }
                        else {

                            // Transform the property and its value to a SOAP_VALUE element
	                        if( strlen( $value ) )
	                            array_push( $retval, new SOAP_Value( $property, $dataType, $value ) );
                        }
               }

               // Return the SOAP_VALUE array 
               return $retval;
       }
       /**
        * Returns the deseralizer namespce to use for array types
        * 
        * @access public
        * @return String The deserializer namespace to use during array->complexType transformations 
        */
       private function __getDeserializer() {

			   $i=1;
			   foreach( $this->wsdlHandle->ns as $url => $namespace ) {

				        if( $namespace == "tns1" )
				            return $tns1 = "ns" . $i;

				        $i++;
			   }
               // Object type not found
			   throw new JbillingAPIException( "Could not locate a deserializer for namespace tns1." );
       }
       /**
        * Accessor method to soapClient property
        * 
        * @access public
        * @return Returns a handle to the SOAP_WSDL proxyClient
        */
       public function getSoapClient() {

       	      return $this->soapClient;
       }
       /**
        * Virtual Host Framework Integration Specific Methods
        */

        /**
         * Authenticates the jBilling API user
         * 
         * @access public
         * @param String $username The username of the JBilling API account
         * @param String $password The password to authenticate the JBilling API account
         * @return Boolean True if the user was authenticated successfully or false if authentication failed
         */
        public function authenticateAPIUser( $username, $password ) {

               	$result = $this->authenticate( $username, $password );
               	return ($result > 0 ) ? false : true;
        }
       /**
        * Creates a new JBilling customer account using Virtual Host Framework BillingDTO property values
        * 
        * @access public
        * @return Integer The newly created customers userId
        */
        public function createCustomer() {

               // Make sure VHF LDAP username doesnt already exist
               $LDAPServer = Registry::getInstance()->get( "LDAPServer" );
               $LDAPServer->connect();
               $LDAPServer->adminBind();
               $filter = "(&(objectClass=virtualHostFrameworkAccount)(uid=" . $this->BillingDTO->getUid() . "))";
               $attrs = array();
               $vhfusers = $LDAPServer->getEntries( $filter, $attrs );
               // The user already exists
               if( $vhfusers['count'] ) Registry::getInstance()->get( "ExceptionHandler" )->HandleException( new Exception( "Username already exists. Please choose a different username.", 0 ) );



               // Instantiate each of the required JBilling data type objects
               $UserWS = new UserWS();
               $OrderWS = new OrderWS();
               $ContactDTO = new ContactDTO();
               $OrderLineWS = new OrderLineWS();
               $CreditCardDTO = new CreditCardDTO();

               // Define Jbilling user properties
               $UserWS->setUserName( $this->BillingDTO->getUid() );
               $UserWS->setPassword( $this->BillingDTO->getPassword() );
               $UserWS->setLanguageId( 1 ); // English
               $UserWS->setMainRoleId( 5 ); // Customer
               $UserWS->setRole( "Customer" ); 
               $UserWS->setStatusId( 1 );  // Active
               $UserWS->setSubscriberStatusId( 1 ); // Pre-paid

               // Define Jbilling contact properties
               $ContactDTO->setFirstName( $this->BillingDTO->getFirstName() );
               $ContactDTO->setLastName( $this->BillingDTO->getLastName() );
               $ContactDTO->setPhoneNumber( $this->BillingDTO->getTelephoneNumber() );
               $ContactDTO->setEmail( $this->BillingDTO->getMail() );
               $ContactDTO->setAddress1( $this->BillingDTO->getStreet() );
               $ContactDTO->setCity( $this->BillingDTO->getCity() );
               $ContactDTO->setStateProvince( $this->BillingDTO->getState() );
               $ContactDTO->setPostalCode( $this->BillingDTO->getZip() );

               // Define Jbilling credit card properties
               $CreditCardDTO->setName( $this->BillingDTO->getCcname() );
               $CreditCardDTO->setNumber( $this->BillingDTO->getCcnumber() );
               $CreditCardDTO->setSecurityCode( $this->BillingDTO->getCcv() );
               $CreditCardDTO->setType( $this->BillingDTO->getCctypeId() );

               // Apply contact object to user properties
               $UserWS->setContact( $ContactDTO );

               // Convert the passed javascript date to a PHP ISO 8601 date
               $newDate = explode( " ", $this->BillingDTO->getCcexpiry() );
			   array_pop( $newDate );
			   $expireDate = date( "c", strtotime( implode( " ", $newDate ) ) );
               $CreditCardDTO->setExpiry( $expireDate );

               // Add the credit card to the user property 
               $UserWS->setCreditCard( $CreditCardDTO );

               // Set Jbilling OrderLineWS properties
               $OrderLineWS->setUseItem( true );
               $OrderLineWS->setItemId( $this->BillingDTO->getServiceId() );
               $OrderLineWS->setTypeId( 1 ); // Item type
               $OrderLineWS->setQuantity( 1 );

               // Set Jbilling purchase order properties
               $OrderWS->setPeriod( 1 );   // Monthly
               $OrderWS->setOrderLines( array( $OrderLineWS ) );
               $OrderWS->setBillingTypeId( 1 );
               $OrderWS->setCurrencyId( 1 ); // US Dollar

               // Attempt to create the new user and purcahse order
               try {
               	     $POResult = $this->create( $UserWS, $OrderWS );

                     // Create response for VHF UI
                     return array( "serviceId" => $this->BillingDTO->getServiceId(), "userId" => $POResult->userId, "paymentResult" => $POResult->paymentResult->responseMessage );
               }
               catch( JbillingAPIException $JBEx ) {

              	      throw new virtualHostFrameworkAPIException( $JBEx->getMessage() );
               }
        }

        public function updateCustomer() {
        }

        public function deleteCustomer() {
        }
        public function getSupportedCreditCards() {

               // Return array of credit card id and types supported by jbilling
               return array(
                             array( "id" => 1, "type" => "Cheque" ), 
                             array( "id" => 2, "type" => "Visa" ),
                             array( "id" => 3, "type" => "MasterCard" ),
                             array( "id" => 4, "type" => "AMEX" ),
                             array( "id" => 5, "type" => "ACH" ),
                             array( "id" => 6, "type" => "Discovery" ),
                             array( "id" => 7, "type" => "Diners" ),
                             array( "id" => 8, "type" => "Paypal" )
                           );
        }
        /**
         * Returns an array of service ids and descriptions to offer customers
         * 
         * @access public
         * @return Array A multi-dimensional associative array of services to offer customers in the following format:
         *               array( "id", "description" );
         */
        public function getBillableServices() {

               // Storage array for service id and descriptions return value
        	   $retval = array();

               // Get a list of all service items in jbilling
        	   $result = $this->getSoapClient()->getAllItems();

               // Jbilling returns an array of objects for each service item; Iterate over the array and create a return array
               // which is compatible with the Virtual Host Framework return type (multi-dimensional array of service id and descriptions)

               // Store an array of service id and description for each service
               for( $i=0; $i<count( $result ); $i++ )
                    if( substr( strtolower( $result[$i]->number ), 0, 3 ) == "vhf" )
                         array_push( $retval, array( "id" =>  $result[$i]->id, "description" => $result[$i]->description ) );

               // Return the services array
               return $retval;
        }
}
?>