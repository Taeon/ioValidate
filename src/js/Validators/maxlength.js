/**
 * Max length
 */
var ioValidateValidator_maxlength = function( settings ){
	ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_maxlength, ioValidateValidator );
ioValidateValidator_maxlength.prototype.Validate = function( value, values ){
	// This shouldn't be required, because the maxlength attribute...
	// ...should restrict the length of the input
	return value.toString().length <= parseInt( this.settings );
};
