<?php
$fields = ['username', 'email', 'tel'];
foreach ( $fields as $value){
	if (!isset($_POST[$value])) {
		echo "Bad request!";
		die;
	}
}

/**
* Class for validating data
* @author Denys Dnischenko <den0296@gmail.com>
* @version 1.0.0
*/
class Validator
{	
	/**
	 * Name for detect were output $errorMsg
	 * @var $fieldname string
	 */
	public $fieldname;
	/**
	 * Error Message to output
	 * @var $errorMsg string
	 */
	public $errorMsg;
	/**
	 * Error status.For detect which message output
	 * @var $errorStatus string
	 */
	public $errorStatus;

    /**
     * Validator constructor.
     * @param $type string
     * @param $value string
     */
	public function __construct($type ,$value)
	{
	    $this->fieldname = $type;
		switch ($type) {
			case 'username':
				self::name($value);
				break;
			case 'email':
				self::email($value);
				break;
			case 'tel':
				self::tel($value);
				break;	
			default:
				echo "method not defined";
				break;
		}
	}

    /**
     * Validate user name
     * @param string $value
     * @param int $min
     * @param int $max
     */
	protected function name($value, $min = 6, $max = 12)
	{
		if( is_string($value) ) {
			//$pattern = preg_match("/^[\w]{6,12}$/", $value);
			if( $value == '' ) {
				$this->errorStatus = 'empty';
				$this->errorMsg = 'Поле пустое,заполните пожалуйста поле';

			}elseif ( mb_strlen( $value ) < $min ) {
				$this->errorStatus = 'few chars';
				$this->errorMsg = 'Имя слишком короткое';
			}elseif ( mb_strlen( $value ) > $max ) {
				$this->errorStatus = 'many chars';
				$this->errorMsg = 'Имя слишком длинное';
			}else{
				$this->errorStatus = 'success';
				$this->errorMsg = 'Поле заполнено правильно';
			}
		} else{
			$this->errorStatus = 'type error';
			$this->errorMsg = 'Введите буквение символи';
		}
	}

    /**
     * Validate email
     * @param string $value
     */
	protected function email( $value )
	{
		if( is_string($value) ){
			if( !preg_match("/^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/", $value) ) {
				$this->errorStatus = 'error';
				$this->errorMsg = 'Неверно введений email. Пример как надо "my@mail.com".';
			} else {
				$this->errorStatus = 'success';
				$this->errorMsg = 'Поле заполнено правильно';
			}
		}
	}

    /**
     * Validate Telephone number
     * @param string $value
     */
	protected function tel( $value )
	{
	    //$pattern = "/^380 \(([\d]{2})\) ([\d]{3})-([\d]{2})-([\d]{2})$/";
        //#^380 \(([0-9]{2})\( ([0-9]{3})-([0-9]{2})-([0-9]{2})$#
        if ( !preg_match("/^380 \(([\d]{2})\) ([\d]{3})-([\d]{2})-([\d]{2})$/", $value) ) {
            $this->errorStatus = 'error';
            $this->errorMsg = 'Неправильний формат.Пример "380 (22) 333-22-22" (Вместе с пробалами).';
        } else {
            $this->errorStatus = 'success';
            $this->errorMsg = 'Поле заполнено верно';
        }

	}

}
// Pushing all fields in one array
$fieldsValidateResult = [];
foreach ($fields as $value) {
    $fieldsValidateResult[] = new Validator( $value, $_POST[$value] );
}
// doing sleep for watch how spin spinner on the form
sleep(3);
// Encode our array object to JSON data for client side
echo json_encode($fieldsValidateResult);
