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
  * iJBillingAPI Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.com.makeabyte.vhf.jbilling.rpc.class
  */

interface iJbillingAPI {

          public function getInvoiceWS( $invoiceId );
          public function getLatestInvoice( $userId );
          public function getLastInvoices( $userId, $number );
	      public function getInvoicesByDate( $since, $until );
	      public function createUser( UserWS $newUser );
	      public function deleteUser( $userId );
          public function deleteInvoice( $invoiceId );
          public function updateUserContact( $userId, $typeId, ContactWS $contact );
          public function updateUser( UserWS $user );
          public function getUserWS( $userId );
          public function getUserContactsWS( $userId );
          public function getUserId( $username );
          public function getUsersInStatus( $statusId );
          public function getUsersNotInStatus( $statusId );
          public function getUsersByCustomField( $typeId, $value );
          public function create( UserWS $user, OrderWS $order );
          public function payInvoice( $invoiceId );
          public function updateCreditCard( $userId, CreditCardDTO $creditCard );
          public function createOrderPreAuthorize( OrderWS $order );
          public function createOrder( OrderWS $order );
          public function createOrderAndInvoice( OrderWS  $order );
          public function updateOrder( OrderWS $order );
          public function getOrder( $orderId );
          public function getOrderByPeriod( $userId, $periodId );
          public function getOrderLine( $orderLineId );
          public function updateOrderLine( OrderLineWS $line );
          public function getLatestOrder( $userId );
          public function getLastOrders( $userId, $number );
          public function deleteOrder( $id );
          public function applyPayment( PaymentWS $payment, $invoiceId );
          public function getPayment( $paymentId );
          public function getLatestPayment( $userId );
          public function getLastPayments( $userId, $number );
          public function createItem( ItemDTOEx $dto );
          public function getAllItems();
          public function getUserTransitions( $from, $to );
          public function authenticate( $username, $password );
}
?>