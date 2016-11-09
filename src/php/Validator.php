<?php

namespace ioValidate;

class Validator{
	public $enabled = true;
	protected $type;
	public $message = false;
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
}