/**
 * Regular expression - 'pattern'
 */
var ioValidateValidator_regex = function( settings ){
	ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_regex, ioValidateValidator );
ioValidateValidator_regex.prototype.Validate = function( value, values ){
 	var valid = true;

	if( new RegExp( this.settings ).test( value ) ){
		valid = false;
	}

	return valid;
};
