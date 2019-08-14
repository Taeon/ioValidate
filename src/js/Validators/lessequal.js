/**
 * Less than or equal to
 */
var ioValidateValidator_lessequal = function( settings ){
 ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_lessequal, ioValidateValidator );
ioValidateValidator_lessequal.prototype.Validate = function( value, values ){
 var valid = true;

	if( value !== null && value !== '' && values[ this.settings ] !== null ){
		if( value > values[ this.settings ] ){
			valid = false;
		}
	}

 return valid;
};
