<?php

namespace ioValidate\Validator;

class required extends \ioValidate\Validator{
	public function GetFormAttributes(){
		return array_merge( array( 'required' => true ), parent::GetFormAttributes() );
	}
	public function Validate( $value, \ioValidate\Values $values ){
return true;
	}
}
