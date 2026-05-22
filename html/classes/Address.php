<?php

class Address
{
	public static function fullAddress($line1 = null, $line2 = null, $city = null, $state = null, $zip = null, $plusFour = null, $country = null)
	{
		$foo = '';
		$foo .= self::isValid($line1) ? $line1 . ' ' : '';
		$foo .= self::isValid($line2) ? $line2 . ' ' : '';
		$foo .= self::isValid($city) ? $city . ', ' : '';
		$foo .= self::isValid($state) ? $state . ' ' : '';
		$foo .= self::isValid($zip) ? $zip : '';
		$foo .= self::isValid($plusFour) ? '-' . $plusFour . ' ' : ' ';
		$foo .= self::isValid($country) ? $country : '';

		return trim($foo);
	}

	private static function isValid($value){
		return !is_null($value) && !empty($value);
	}

}
