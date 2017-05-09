<?php

namespace ioValidate\Validator;

class email extends \ioValidate\Validator{

	protected $pattern = '/^((([a-z]|\d|[!#\$%&\'\*\+\-\/=\?\^_`{\|}~]|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])+(\.([a-z]|\d|[!#\$%&\'\*\+\-\/=\?\^_`{\|}~]|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(\\\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(([a-z]|\d|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])*([a-z]|\d|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])))\.)+(([a-z]|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(([a-z]|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])*([a-z]|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])))$/i';

	public function Validate( $value, \ioValidate\Values $values ){
		// No need to test if no value
		if( $value == '' ){
			return true;
		}
		return preg_match( $this->pattern, $value ) == 1;
	}
}
