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
  * Encryption Class
  * @author Jeremy Hahn
  * @version 1.0
  * @copyright Make A Byte, inc
  * @package packages.core.rpc.security
  */


class Encryption {

      private $key, $iv;

     /**
      * The constructor for the encryption class
      * 
      * @access public
      * @param array $args The private key $args[0] and iv $args[1] to use within the encrypt/decrypt routines
      */
      public function Encryption( EncryptionKeyDTO $objKey ) {

             $this->setPassphrase( $objKey->getKey() );
             $this->setIv( $objKey->getIv() );
      }
      /**
       * Creates a strong key from the passed data and sets the string
       * to be used as the passphrase for the encrypt/decrypt methods
       * 
       * @access public
       * @param string $data The data to encrypt
       * @return string The decrypted string
       */
      function setPassphrase( $phrase ) {

               $key = hash( "sha256", $phrase, true );
      	       $this->key = $phrase;
      }
      /**
       * Sets the IV to use for encrypt/decrypt methods
       * 
       * @access public
       * @param string $data The data to encrypt
       * @return string The decrypted string
       */
      function setIv( $iv ) {

      	       $this->iv = $iv;
      }
      /**
       * Generates an IV to use within the encrypt/decrypt methods
       * 
       * @access public
       * @return string The generated iv
       */
      function makeIv() {

      	       return mcrypt_create_iv( 32 );
      }
      /**
       * Encrypts the passed data using the AES 256-bit cipher
       * 
       * @access public
       * @param string $data The data to encrypt
       * @return string The encrypted string
       */
      function encrypt_aes_256( $data ) {

               return mcrypt_encrypt( MCRYPT_RIJNDAEL_256, $this->key, $data, MCRYPT_MODE_ECB, $this->iv );
      }
      /**
       * Decrypts the passed data using the AES 256-bit cipher
       * 
       * @access public
       * @param string $data The data to encrypt
       * @return string The decrypted string
       */
      function decrypt_aes_256( $data ) {

               return trim( mcrypt_decrypt( MCRYPT_RIJNDAEL_256, $this->key, $data, MCRYPT_MODE_ECB, $this->iv ) );
      }
      /**
       * Encrypts the passed data using the AES 128-bit cipher
       * 
       * @access public
       * @param string $data The data to encrypt
       * @return string The encrypted string
       */
      public function encrypt_aes_128( $data ) {

      	     return mcrypt_encrypt( MCRYPT_RIJNDAEL_128, $this->key, $data, MCRYPT_MODE_CBC, $this->iv );
      }
      /**
       * Decrypts the passed data using the AES 128-bit cipher
       * 
       * @access public
       * @param string $data The data to decrypt
       * @return string The decrypted string
       */
      public function decrypt_aes_128( $data ) {

      	     return trim( mcrypt_decrypt( MCRYPT_RIJNDAEL_128, $this->key, $data, MCRYPT_MODE_CBC, $this->iv ) );
      }
      /**
       * Encrypts the passed data using the blowfish cipher
       * 
       * @access public
       * @param string $data The data to encrypt
       * @return string The encrypted string
       */
      function encrypt_blowfish( $data ) {
       	
               return mcrypt_cbc( MCRYPT_BLOWFISH, $this->key ,$data, MCRYPT_ENCRYPT, $this->iv );
      }
      /**
       * Decrypts the passed data using the blowfish cipher
       * 
       * @access public
       * @param string $data The data to encrypt
       * @return string The encrypted string
       */
      function decrypt_blowfish( $data ) {

               return trim( mcrypt_cbc( MCRYPT_BLOWFISH, $this->key, $data, MCRYPT_DECRYPT, $this->iv ) );
      }
      /**
       * Base64 encodes a string
       * 
       * @access public
       * @param string $data The data to encode
       * @return string The encrypted string
       */
      function encode( $data ) {
      	
      	       return base64_encode( $data );
      }
      /**
       * Decodes a base64 string 
       * 
       * @access public
       * @param string $data The data to decode
       * @return string The base64 decoded string
       */
      function decode( $data ) {
      	
      	       return base64_decode( $data );
      }
      /**
       * Encrypts the passed data using the MD5 one way hashing algorithm
       * 
       * @access public
       * @param string $data The data to encrypt
       * @return string The encrypted string
       */
      public function encrypt_md5( $data ) {
      	
      	     return md5( $data );
      }
}
?>