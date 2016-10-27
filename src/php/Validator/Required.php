<?php

namespace ioValidate\Validator;

class Required extends \ioValidate\Validator{
	public function GetFormAttributes(){
		return array( 'required' => true );
	}
}