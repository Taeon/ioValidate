<?php

namespace ioValidate\Validator;

class min extends \ioValidate\Validator{

	public $min;
	public $value;
	public $value_type;

	public function GetFormAttributes(){
		if( $this->value === null ){
			throw new Exception( 'You must specify minimum value' );
		}
		$value = $this->value;

		if( $this->type ){
			switch ( $this->value_type ) {
				case 'date':{
					// Check for relative date
					if( preg_match( '~^(\-|\+|)(P.*)$~', $value, $matches ) ){
						list( $foo, $sign, $period ) = $matches;
						$interval = new \DateInterval( $period );
						$date = new \DateTime();
						if( $sign == '-' ){
							$date->sub( $interval );
						} else {
							$date->add( $interval );
						}
						$value = $date->format( 'Y-m-d' );
					}
					break;
				}
			}
		}

		return array_merge( array( 'min' => $value ), parent::GetFormAttributes() );
	}
}
