<?php

if (!isset($_SESSION))
{
	session_name('SPIApp');
	session_start();
	session_cache_limiter('private');
}

require_once 'HTTP/Request2.php';

class Languages
{
	public function getLanguageFromTransifex($lang)
	{
		$request = new HTTP_Request2('http://vela1606:pass@www.transifex.net/api/2/project/gaiaehr/resource/All/translation/' . $lang . '/?file', HTTP_Request2::METHOD_GET);
		$r = $request -> send() -> getBody();
		$r = str_replace('<?php $LANG = ', '', $r);
		$r = str_replace('array(', '', $r);
		$r = str_replace('=>', ':', $r);
		$r = str_replace(');', '', $r);
		$r = str_replace('\'', '"', $r);
		$r = '{"lang":{' . $r . "}}";

		return json_decode($r, true);
	}

	public function getLanguagesFromTransifex()
	{
		$request = new HTTP_Request2('http://vela1606:pass@www.transifex.net/api/2/project/gaiaehr/resource/All/?details', HTTP_Request2::METHOD_GET);
		$r = $request -> send() -> getBody();
		$r = json_decode($r, true);
		return array('langs' => $r['available_languages']);
	}

}
