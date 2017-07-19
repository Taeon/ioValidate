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
         return value >= this.value;
     }
 }

 return valid;
};
