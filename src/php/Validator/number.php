<?php

namespace ioValidate\Validator;

class number extends \ioValidate\Validator{
	protected $min = null;
	protected $max = null;
	protected $integer = null;

	public function Validate( $value, \ioValidate\Values $values ){
return true;
	}
}
