/**
 * Required
 */
var ioValidateValidator_required = function( settings ){
    ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_required, ioValidateValidator );
ioValidateValidator_required.prototype.Validate = function( value ){
    var valid = true;

    switch( typeof value ){
        case 'boolean':{
            valid = ( value === true );
            break;
        }
        case 'string':{
            valid = ( value !== '' );
            break;
        }
        case 'object':{
			if( Array.isArray( value ) ){
	            valid = value.length > 0;
			} else {
	            valid = ( value !== null );
			}
            break;
        }
    }
    return valid;
};
