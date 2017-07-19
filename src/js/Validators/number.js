/**
 * Number
 */
var ioValidateValidator_number = function( settings ){
 ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_number, ioValidateValidator );
ioValidateValidator_number.prototype.Validate = function( value ){
 var valid = true;
	if( value.toString().length > 0 && !( (value - parseFloat( value ) + 1) >= 0) ){
		valid = false;
	}

 return valid;
};
