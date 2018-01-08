<?php

namespace ioValidate;

class Definition {
	protected $fields;
	public function GetValidators(){
		return $this->fields;
	}

	/**
	 * Create a definition from an array
	 *
	 * @param 		\ioForm\Form		$form
	 */
	public function FromArray( $fields ){
		foreach( $fields as $field_name => $validators ){
			foreach( $validators as $validator_definition ){
				$validator_type = '\\ioValidate\\Validator\\' . $validator_definition[ 'type' ];
				$validator = new $validator_type( (object)$validator_definition );
				$this->fields[ $field_name ][] = $validator;
			}
		}

		// For method chaining
		return $this;
	}
	
	/**
	 * Create a definition from an ioForm form definition
	 *
	 * @param 		\ioForm\Form		$form
	 */
	public function FromForm( \ioForm\Form $form ){
		foreach( $form->GetFields() as $field ){
			if( count( $field->validators ) ){
				$this->fields[ $field->name ] = $field->validators;
			}
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
						$values->AddError( $name, $validator->message );
					}
				}
			}
		}
		return $valid;
	}

	public function GetValidator( $value, $type ){
		if( isset( $this->fields[ $value ] ) ){
			$class_name = "\ioValidate\Validator\\" . $type;
			foreach( $this->fields[ $value ] as $validator ){
				if( $validator instanceof $class_name ){
					return $validator;
				}
			}
		}
		return null;
	}
}
