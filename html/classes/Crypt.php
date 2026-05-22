<?php
if(!isset($_SESSION))
{
	session_name('SPIApp');
	session_start();
	session_cache_limiter('private');
}

class Crypt
{
	public static function encrypt($text)
	{
	    return trim(
		    base64_encode(
			    mcrypt_encrypt(
				    MCRYPT_RIJNDAEL_256,
				    $_SESSION['site']['AESkey'],
				    $text,
				    MCRYPT_MODE_ECB,
				    mcrypt_create_iv(
					    mcrypt_get_iv_size(
						    MCRYPT_RIJNDAEL_256,
						    MCRYPT_MODE_ECB
					    ),
					    MCRYPT_RAND)
			    )
		    )
	    );
	}

	public static function decrypt($text)
	{
	    return trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, site_aes_key, base64_decode($text), MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND)));
	}
}
