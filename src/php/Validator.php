<?php

namespace ioValidate;

class Validator{
	public $enabled = true;
	public function __construct( $definition ){
		foreach( $definition as $property => $value ){
			if( property_exists( $this, $property ) ){
				$this->$property = $value;
			}
		}
	}
}