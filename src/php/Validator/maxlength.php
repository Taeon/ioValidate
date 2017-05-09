<?php

namespace ioValidate\Validator;

class maxlength extends \ioValidate\Validator{
	protected $value;
	public function GetFormAttributes(){
		if( !$this->value ){
			throw new Exception( 'You must specify maximum length' );
		}

		return array_merge( array( 'maxlength' => $this->value ), parent::GetFormAttributes() );
	}
	public function Validate( $value, \ioValidate\Values $values ){
		return strlen( (string)$value ) <= $this->value;
	}
}
