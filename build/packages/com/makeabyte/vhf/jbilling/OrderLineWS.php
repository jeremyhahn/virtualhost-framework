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
  * JbillingAPIFactory::OrderLineWS
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package com.makeabyte.contrib.jbilling.php
  */

class OrderLineWS {

      var $amount;      // The total amount of this line. Usually, this field should respond to the formula price * quantity. This amount will be the one added to calculate the purchase order total. The currency of this field is the one specified in its parent order.
	  var $createDate;  // A time stamp applied when this record is created.
	  var $deleted;     // A flag that indicates if this record is logically deleted in the database. This allows for ‘undo’ of deletions. Valid values are 0 – the record is not deleted 1 – the record is considered deleted.
	  var $description; // A descriptive text for the services being included. This usually copies the description of the item related to this line.
	  var $editable;    // Indicates whether this order line is editable or not (i.e., it cannot be submitted for update).
	  var $id;          // A unique number that identifies this record.
	  var $item;        // Contains information of the item this order line refers to.
	  var $itemId;      // The id of the item associated with this line, or null if this line is not directly related to an item. It is consider a good practice to have all order lines related to an item. This allows for better reporting.
	  var $itemPrice;   // If this line is using the price from the item, rather than its own.
	  var $price;       // The price of one item, or null if there is no related item.
	  var $priceStr;    // A text related to this line's pricing.
	  var $quantity;    // The quantity of the items included in the line, or null, if a quantity doesn’t apply.
	  var $typeId;      // An order line usually has items. However, some lines are used for additional charges, like taxes. See Appendix A for a list of acceptable order line type codes.
	  var $useItem;     // If true, when submitted, this line will take the price and description from the item. This means that you would not need to give a price and description for the line. Instead, you only provide the id of the item. See the createOrder section for details.

      /**
       * The OrderLineWS constructor
       * 
       * @access public
       */
	  public function OrderLineWS() {
	  }
	  /**
	   * Sets the amount property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Float $amount The total amount of this line. Usually, this field should respond to the formula price * quantity. This amount will be the one added to calculate the purchase order total. The currency of this field is the one specified in its parent order.
	   * @return void 
	   */
      public function setAmount( $amount ) {

      	     $this->amount = $amount;
      }
      /**
	   * Sets the createDate property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Date $amount A time stamp applied when this record is created.
	   * @return void 
	   */
      public function setCreateDate( $date ) {

      	     $this->createDate = $date;
      }
      /**
	   * Sets the deleted property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Integer $amount A flag that indicates if this record is logically deleted in the database. This allows for ‘undo’ of deletions. Valid values are 0 – the record is not deleted 1 – the record is considered deleted.
	   * @return void 
	   */
      public function setDeleted( $int ) {

      	     $this->deleted = $int;
      }
      /**
	   * Sets the description property on the OrderLineWS object
	   * 
	   * @access public
	   * @param String $amount A descriptive text for the services being included. This usually copies the description of the item related to this line.
	   * return void 
	   */
      public function setDescription( $desc ) {

      	     $this->description = $desc;
      }
      /**
	   * Sets the editable property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Boolean $amount Indicates whether this order line is editable or not (i.e., it cannot be submitted for update).
	   * @return void 
	   */
      public function setEditable( $bool ) {

      	     $this->editable = $bool;
      }
      /**
	   * Sets the id property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Integer $amount A unique number that identifies this record.
	   * @return void 
	   */
      public function setId( $id ) {

      	     $this->id = $id;
      }
      /**
	   * Sets the item property on the OrderLineWS object
	   * 
	   * @access public
	   * @param ItemDTOEx $amount Contains information of the item this order line refers to.
	   * @return void 
	   */
      public function setItem( $item ) {

      	     $this->item = $item;
      }
      /**
	   * Sets the itemId property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Integer $amount The id of the item associated with this line, or null if this line is not directly related to an item. It is consider a good practice to have all order lines related to an item. This allows for better reporting.
	   * @return void 
	   */
      public function setItemId( $id ) {

      	     $this->itemId = $id;
      }
      /**
	   * Sets the itemPrice property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Integer $amount If this line is using the price from the item, rather than its own.
	   * @return void 
	   */
      public function setItemPrice( $price ) {

      	     $this->itemPrice = $price;
      }
      /**
	   * Sets the price property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Float $amount The price of one item, or null if there is no related item.
	   * @return void 
	   */
      public function setPrice( $price ) {

      	     $this->price = $price;
      }
      /**
	   * Sets the priceStr property on the OrderLineWS object
	   * 
	   * @access public
	   * @param String $amount A text related to this line's pricing.
	   * @return void 
	   */
      public function setPriceStr( $str ) {

      	     $this->priceStr = $str;
      }
      /**
	   * Sets the quantity property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Integer $amount The quantity of the items included in the line, or null, if a quantity doesn’t apply.
	   * @return void 
	   */
      public function setQuantity( $int ) {

             $this->quantity = $int;
      }
      /**
	   * Sets the typeId property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Integer $amount An order line usually has items. However, some lines are used for additional charges, like taxes. See Appendix A for a list of acceptable order line type codes.
	   * @return void 
	   */
      public function setTypeId( $id ) {

      	     $this->typeId = $id;
      }
      /**
	   * Sets the useItem property on the OrderLineWS object
	   * 
	   * @access public
	   * @param Boolean $amount If true, when submitted, this line will take the price and description from the item. This means that you would not need to give a price and description for the line. Instead, you only provide the id of the item. See the createOrder section for details.
	   * @return void 
	   */
      public function setUseItem( $item ) {
      	
      	     $this->useItem = $item;
      }
      /**
	   * Gets the amount property on the OrderLineWS object
	   * 
	   * @access public
	   * @return The total amount of this line. Usually, this field should respond to the formula price * quantity. This amount will be the one added to calculate the purchase order total. The currency of this field is the one specified in its parent order.
	   */
      public function getAmount() {

      	     return $this->amount;
      }
      /**
	   * Gets the createDate property on the OrderLineWS object
	   * 
	   * @access public
	   * @return A time stamp applied when this record is created.
	   */
      public function getCreateDate() {

      	     return $this->createDate;
      }
      /**
	   * Gets the deleted property on the OrderLineWS object
	   * 
	   * @access public
	   * @return A flag that indicates if this record is logically deleted in the database. This allows for ‘undo’ of deletions. Valid values are 0 – the record is not deleted 1 – the record is considered deleted.
	   */
      public function getDeleted() {

      	     return $this->deleted;
      }
      /**
	   * Gets the description property on the OrderLineWS object
	   * 
	   * @access public
	   * @return A descriptive text for the services being included. This usually copies the description of the item related to this line.
	   */
      public function getDescription() {

      	     return $this->description;
      }
      /**
	   * Gets the editable property on the OrderLineWS object
	   * 
	   * @access public
	   * @return Indicates whether this order line is editable or not (i.e., it cannot be submitted for update).
	   */
      public function getEditable() {

      	     return $this->editable;
      }
      /**
	   * Gets the id property on the OrderLineWS object
	   * 
	   * @access public
	   * @return A unique number that identifies this record.
	   */
      public function getId() {

      	     return $this->id;
      }
      /**
	   * Gets the item property on the OrderLineWS object
	   * 
	   * @access public
	   * @return Contains information of the item this order line refers to.
	   */
      public function getItem() {

      	     return $this->item;
      }
      /**
	   * Gets the itemId property on the OrderLineWS object
	   * 
	   * @access public
	   * @return The id of the item associated with this line, or null if this line is not directly related to an item. It is consider a good practice to have all order lines related to an item. This allows for better reporting.
	   */
      public function getItemId() {

      	     return $this->itemId;
      }
      /**
	   * Gets the itemPrice property on the OrderLineWS object
	   * 
	   * @access public
	   * @return If this line is using the price from the item, rather than its own.
	   */
      public function getItemPrice() {

      	     return $this->itemPrice;
      }
      /**
	   * Gets the price property on the OrderLineWS object
	   * 
	   * @access public
	   * @return The price of one item, or null if there is no related item.
	   */
      public function getPrice() {

      	     return $this->price;
      }
      /**
	   * Gets the priceStr property on the OrderLineWS object
	   * 
	   * @access public
	   * @return A text related to this line's pricing.
	   */
      public function getPriceStr() {

      	     return $this->priceStr;
      }
      /**
	   * Gets the quantity property on the OrderLineWS object
	   * 
	   * @access public
	   * @return The quantity of the items included in the line, or null, if a quantity doesn’t apply.
	   */
      public function getQuantity() {

             return $this->quantity;
      }
      /**
	   * Gets the typeId property on the OrderLineWS object
	   * 
	   * @access public
	   * @return An order line usually has items. However, some lines are used for additional charges, like taxes. See Appendix A for a list of acceptable order line type codes.
	   */
      public function getTypeId() {

      	     return $this->typeId;
      }
      /**
	   * Gets the useItem property on the OrderLineWS object
	   * 
	   * @access public
	   * @return If true, when submitted, this line will take the price and description from the item. This means that you would not need to give a price and description for the line. Instead, you only provide the id of the item. See the createOrder section for details.
	   */
      public function getUseItem() {

      	     return $this->useItem;
      }
	  	    	  
}
?>