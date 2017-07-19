/*********
 * Base class for validators
 */
var ioValidateValidator = function( settings ){
	this.settings = settings;
    this.value_type = null;
};
ioValidateValidator.prototype = {
    Validate:function(){
        alert( 'Validate function not defined' );
    }
}
