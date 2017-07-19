/*********
 * Base class for validators
 */
var ioValidateDefinition = function( options ){
	for( var index in options ){
		this[ index ] = options[ index ];
	}
};
ioValidateDefinition.prototype = {
    UpdateSettings:function( settings ){
        this.settings = settings;
    }
}
