<?php

namespace ioValidate\Validator;

class filesize extends \ioValidate\Validator{
	protected $max;

	public function GetFormAttributes(){

		if( $this->max === null ){
			throw new \Exception( 'You must supply a file size value' );
		}

		return array_merge( array( 'data-iovalidate-filesize' => $this->max ), parent::GetFormAttributes() );
	}
	public function Validate( $value, \ioValidate\Values $values ){
return true;
	}

}
