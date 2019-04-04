<?php

namespace ioValidate\Validator;

class lessequal extends \ioValidate\Validator{
	protected $value;
	public function GetFormAttributes(){
		if( !$this->value ){
			throw new Exception( 'You must specify value name for comparison' );
		}
		return array_merge( array( 'data-iovalidate-lessequal' => $this->value ), parent::GetFormAttributes() );
	}
	public function Validate( $value, \ioValidate\Values $values ){
		if( !$values->HasValue( $this->value ) ){
			return false;
		}
		// Ignore if no value
		if( !$value ){
			return true;
		}
		return $value <= $values->GetValue( $this->value );
	}
}