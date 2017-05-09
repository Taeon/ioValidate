<?php

namespace ioValidate\Validator;

class regex extends \ioValidate\Validator{
	protected $pattern = '';
	public $delimiter = '~';
	public function GetFormAttributes(){
		if( !$this->pattern ){
			throw new \Exception( 'You must specify a regular expression (pattern=>"...")' );
		}

		return array_merge( array( 'pattern' => $this->pattern ), parent::GetFormAttributes() );
	}
	public function Validate( $value, \ioValidate\Values $values ){
		$pattern = $this->pattern;

		// This forces the PHP regex to work like the equivalent in JS
		// per the spec at https://www.w3.org/TR/html5/forms.html#the-pattern-attribute
		// "the pattern attribute is matched against the entire value, not just any subset
		// (somewhat as if it implied a ^(?: at the start of the pattern and a )$ at the end)."
		// Needs more testing
		if( substr( $this->pattern, 0, 1 ) == '^' ){
			$pattern = substr( $pattern, 1 );
		}
		$pattern = '^(?:' . $pattern;
		if( substr( $this->pattern, -1 ) == '$' ){
			$pattern = substr( $pattern, 0, -1 );
		}
		$pattern = $pattern . ')$';

		// Make any instances of the delimiter in the pattern istelf are escaped
		$pattern = str_replace( $this->delimiter, '\\' . $this->delimiter, $pattern );
		// Wrap with delimiter
		$pattern = $this->delimiter . $pattern . $this->delimiter;

		return preg_match( $pattern, $value ) > 0;
	}
}
