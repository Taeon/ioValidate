/**
 * Min
 */
var ioValidateValidator_min = function( settings ){
 ioValidateValidator.call( this, settings );
	this.value = settings * 1;
};
extend( ioValidateValidator_min, ioValidateValidator );
ioValidateValidator_min.prototype.Validate = function( value, values ){
 var valid = true;

 switch( this.value_type ){
     case 'date':{
         if( value === null ){
             return true;
         }
         valid = value >= new Date( this.settings );
         break;
     }
     default:{
         // Don't validate string values (i.e. empty strings, which is what you get if it's not a number)
         if( typeof value != 'number' ){
             return true;
         }
         return value >= this.value;
     }
 }

 return valid;
};
