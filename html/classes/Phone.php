<?php

class Phone
{
	private static $areaCodeSeparator;
	private static $numberSeparator;

	public static function fullPhone($countryCode = null, $areaCode = null, $prefix = null, $number = null)
	{
		self::setAreaCodeSeparator();
		self::setNumberSeparator();

		$foo = '';
		$foo .= self::isValid($countryCode) ? '+' . $countryCode . ' ' : '';

		if(strlen(self::$areaCodeSeparator) == 2){
			$s = str_split(self::$areaCodeSeparator);
			$foo .= self::isValid($areaCode) ? $s[0] . $areaCode . $s[1] . ' ' : '';
		}else{
			$foo .= self::isValid($areaCode) ? $areaCode . self::$areaCodeSeparator : '';
		}

		$foo .= self::isValid($prefix) ? $prefix . self::$numberSeparator : '';
		$foo .= self::isValid($number) ? $number : '';

		return trim($foo);
	}


	private static function isValid($value){
		return !is_null($value) && !empty($value);
	}


	// setters and getters
	public static function setAreaCodeSeparator($separator = '()'){
		self::$areaCodeSeparator = $separator;
	}

	public static function getAreaCodeSeparator(){
		return self::$areaCodeSeparator;
	}
	public static function setNumberSeparator($separator = '-'){
		self::$numberSeparator = $separator;
	}

	public static function getNumberSeparator(){
		return self::$numberSeparator;
	}
}
