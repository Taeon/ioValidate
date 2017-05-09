<?php

namespace ioValidate;

class Values implements \Iterator, \Countable{
	protected $values;

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

	public function HasValue( $name ){
		return isset( $this->values[ $name ] );
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

}
