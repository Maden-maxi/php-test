<?php

/**
* @version 1.0.0
*/
class Validator
{	
	/**
	 * @var $fieldname str Name for detect were output $errorMsg
	 */
	public $fieldname;
	/**
	 * @var $errorMsg str Error Message to output
	 */
	public $errorMsg;
	/**
	 * @var $errorCode int Error code.For detect which message output
	 */
	public $errorCode;
	/**
	 * @param $fieldname str
	 * @param $value mixed(str,int) 
	 */
	function __construct($fieldname, ,$value)
	{
		
	}
	function name($value)
	{
		
	}

}
$errorMsg = '';
if ( isset($_POST['username']) ) {

	if( strlen($_POST['username']) < 6 ){
		$errorMsg = "Имя слишком короткое";
	} elseif ( strlen($_POST['username']) > 12) {
		$errorMsg = "Имя слишком длинное";
	}
}
echo $errorMsg;

if ( isset( $_POST['email'] ) ) {

	$pattern = "/@/";
	preg_match("/^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/", $_POST['email']);
	if( preg_match($pattern, $_POST['email'] ) ){
		echo "совпало email";
	}

}
if ( isset($_POST['tel']) ) {
	$pattern = "/^380 \(([\d]{2})\) ([\d]{3})-([\d]{2})-([\d]{2})$/";
	if( preg_match($pattern, $_POST['tel']) ){
		echo "Совпало tel";
	}
}