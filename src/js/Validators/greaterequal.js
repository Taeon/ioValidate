/**
 * Greater than or equal to
 */
var ioValidateValidator_greaterequal = function( settings ){
 ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_greaterequal, ioValidateValidator );
ioValidateValidator_greaterequal.prototype.Validate = function( value, values ){
 var valid = true;

	if( value !== null && value !== '' && values[ this.settings ] !== null ){
		if( value < values[ this.settings ] ){
			valid = false;
		}
	}

 return valid;
};
