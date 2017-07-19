/**
 * Regular expression - 'pattern'
 * i.e. equivalent to the HTML5 pattern attribute
 */
var ioValidateValidator_pattern = function( settings ){
	ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_pattern, ioValidateValidator );
ioValidateValidator_pattern.prototype.Validate = function( value, values ){

	// We're just going to use HTML5's native pattern validation
	var element = document.createElement('input');
	element.setAttribute( 'pattern', this.settings );
	element.setAttribute( 'value', value );
	element.checkValidity();

	return element.validity.valid;
};
ioValidateValidator_pattern.prototype.SetPattern = function( pattern ){
	this.settings = pattern;
}
