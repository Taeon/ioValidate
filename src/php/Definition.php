<?php

namespace ioValidate;

class Definition {
	protected $fields;
	public function GetValidators(){
		return $this->fields;
	}
	/**
	 * Create a definition from an ioForm form definition
	 *
	 * @param 		\ioForm\Form		$form
	 */
	public function FromForm( \ioForm\Form $form ){
		foreach( $form->GetFields() as $field ){
			if( count( $field->validators ) ){
			}
			$this->fields[ $field->name ] = $field->validators;
		}

		// For method chaining
		return $this;
	}

	public function Validate( \ioValidate\Values $values ){
		$valid = true;

		foreach( $values as $name => $value ){
			if( isset( $this->fields[ $name ] ) ){
				foreach( $this->fields[ $name ] as $validator ){
					if( !$validator->Validate( $value, $values ) ){
						$valid = false;
					}
				}
			}
		}
		return $valid;
	}
}
