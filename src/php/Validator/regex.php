<?php

namespace ioValidate\Validator;

/**
 * Perform a regular expression check
 */
class regex extends \ioValidate\Validator{
	protected $pattern = '';
	public $delimiter = '~';
	public function GetFormAttributes(){
		if( !$this->pattern ){
			throw new \Exception( 'You must specify a regular expression (pattern=>"...")' );
		}

		return array_merge( array( 'data-iovalidate-regex' => $this->pattern ), parent::GetFormAttributes() );
	}
	public function Validate( $value, \ioValidate\Values $values ){
		$pattern = $this->pattern;

		// Make any instances of the delimiter in the pattern istelf are escaped
		$pattern = str_replace( $this->delimiter, '\\' . $this->delimiter, $pattern );
		// Wrap with delimiter
		$pattern = $this->delimiter . $pattern . $this->delimiter;

		return preg_match( $pattern, $value ) === 0;
	}
}
