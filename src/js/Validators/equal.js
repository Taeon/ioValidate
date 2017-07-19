/**
 * Equal
 */
 var ioValidateValidator_equal = function( settings ){
     ioValidateValidator.call( this, settings );
 };
 extend( ioValidateValidator_equal, ioValidateValidator );
 ioValidateValidator_equal.prototype.Validate = function( value, values ){

 	if( typeof values[ this.settings ] == 'undefined' ){
 		return false;
 	}

     return value == values[ this.settings ];
 };
