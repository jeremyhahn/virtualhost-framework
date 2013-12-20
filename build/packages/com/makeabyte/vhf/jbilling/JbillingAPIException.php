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
  * JbillingAPIFactory::JbillingAPIException
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package com.makeabyte.contrib.jbilling.php
  */

class JbillingAPIException extends Exception {

      var $code;
      var $message;

      public function __construct( $message, $code=0 ) { 

      	     parent::__construct( $message, $code );
      }

      /**
       * The JbillingAPIException constructor
       * 
       * @access public
       * @param Integer $code The exception code
       * @param String Smessage The exception message
       */
      public function JbillingAPIException( $message, $code ) {

             $this->code      = $code;
             $this->message   = $message;
      }
}
?>