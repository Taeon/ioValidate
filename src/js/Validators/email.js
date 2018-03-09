/**
 * Email
 */
var ioValidateValidator_email = function( settings ){
    ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_email, ioValidateValidator );
ioValidateValidator_email.prototype.Validate = function( value ){
    var valid = true;
	if( value != '' && !value.match( /^\S+@\S+$$/i ) ){
		valid = false;
	}
    return valid;
};
