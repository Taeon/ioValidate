<?php

namespace ioValidate\Validator;

class length extends \ioValidate\Validator{
	protected $min = null; // Requires javascript
	protected $max = null;
	public function Validate( $value, \ioValidate\Values $values ){
		if( $this->min !== null ){
			if( strlen( (string)$value ) < $this->min ){
				return false;
			}
		}
		if( $this->max !== null ){
			if( strlen( (string)$value ) > $this->max ){
				return false;
			}
		}
		return true;
	}
}
