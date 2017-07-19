/**
 * Max
 */
var ioValidateValidator_max = function( settings ){
 ioValidateValidator.call( this, settings );
	this.value = settings * 1;
};
extend( ioValidateValidator_max, ioValidateValidator );
ioValidateValidator_max.prototype.Validate = function( value, values ){
 var valid = true;

 switch( this.value_type ){
     case 'date':{
         if( value === null ){
             return true;
         }
         valid = value <= new Date( this.settings );
         break;
     }
     default:{
         return value <= this.value;
     }
 }

 return valid;
};
