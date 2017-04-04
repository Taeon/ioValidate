<?php

namespace ioValidate\Validator;

class regex extends \ioValidate\Validator{
	protected $pattern = '';
	public function GetFormAttributes(){
		if( !$this->pattern ){
			throw new \Exception( 'You must specify a regular expression (pattern=>"...")' );
		}

		return array_merge( array( 'pattern' => $this->pattern ), parent::GetFormAttributes() );
	}

}
