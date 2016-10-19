<?php

namespace ioValidate;

class Definition {
	protected $fields;
	public function GetValidators(){
		return $this->fields;
	}
}
