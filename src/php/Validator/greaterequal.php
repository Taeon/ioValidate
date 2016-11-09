<?php

namespace ioValidate\Validator;

class greaterequal extends \ioValidate\Validator{
	protected $value;
	public function GetFormAttributes(){
		if( !$this->value ){
			throw new Exception( 'You must specify value name for comparison' );
		}
		return array_merge( array( 'data-iovalidate-greaterequal' => $this->value ), parent::GetFormAttributes() );
	}
}