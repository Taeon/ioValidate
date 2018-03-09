<?php

namespace ioValidate\Validator;

class email extends \ioValidate\Validator{

	protected $pattern = '/^\S+@\S+$/i';

	public function Validate( $value, \ioValidate\Values $values ){
		// No need to test if no value
		if( $value == '' ){
			return true;
		}
		return preg_match( $this->pattern, $value ) == 1;
	}
}
