<?php

namespace ioValidate;

class Values implements \Iterator, \Countable, \JsonSerializable{
	public $values;
	public $errors = array();

	public function FromArray( $array ){
		foreach( $array as $name => $value ){
			$this->SetValue( $name, $value );
		}
		// For method chaining
		return $this;
	}

	public function SetValue( $name, $value ){
		$this->values[ $name ] = $value;
	}

	public function GetValue( $name ){
		if( $this->HasValue( $name ) ){
			return $this->values[ $name ];
		}
		return null;
	}
	public function GetValues(){
		return (object)$this->values;
	}

	public function HasValue( $name ){
		return isset( $this->values[ $name ] );
	}

	public function AddError( $field_name, $message ){
		if( !array_key_exists( $field_name, $this->errors ) ){
			$this->errors[ $field_name ] = array();
		}
		$this->errors[ $field_name ][] = $message;
	}

	public function rewind() {
        $this->position = 0;
    }

    public function current() {
    	$keys = array_keys($this->values);
        return $this->values[$keys[$this->position]];
    }

    public function key() {
	    $keys = array_keys( $this->values );
        return $keys[ $this->position ];
    }

    public function next() {
        ++$this->position;
    }

	public function valid() {
		$keys = array_keys($this->values);
        return isset($keys[$this->position]);
    }

	public function count(){
		return count( $this->values );
	}
	public function __get( $key ){
		if( $this->HasValue( $key ) ){
			return $this->values[ $key ];
		}
		return null;
	}
	public function __isset( $key ){
		return $this->HasValue( $key );
	}
	public function __unset( $key ){
		unset( $this->values[ $key ] );
	}

	public function jsonSerialize() {
        return (object)$this->values;
    }
}
