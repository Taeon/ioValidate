<?php

namespace ioValidate;

abstract class Validator{
	public $enabled = true;
	protected $type;
	public $message = false;
	public $value_type; // What sort of value is it? e.g. date, text etc

	public function __construct( $definition ){
		foreach( $definition as $property => $value ){
			if( property_exists( $this, $property ) ){
				$this->$property = $value;
			}
		}
	}
	public function GetFormAttributes(){
		$attributes = array();
		if( $this->message ){
			$attributes[ 'data-iovalidate-error-' . $this->type ] = $this->message;
		}
		return $attributes;
	}

	public abstract function Validate( $value, \ioValidate\Values $values );
}
