/**
 * File size
 */
var ioValidateValidator_filesize = function( settings ){
    ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_filesize, ioValidateValidator );
ioValidateValidator_filesize.prototype.Validate = function( value, values ){
    var valid = true;

	if( value === null || typeof value === 'string' ){
		// Can't validate
		return valid;
	}

	var matches = this.settings.match( /^(\d+)(.*)$/i );
	if( matches ){
		var size = +matches[1];
		var unit = matches[2];
		switch ( unit ) {
			case 'B':{
				// Do nothing
				break;
			}
			case 'KB':{
				size *= 1024;
				break;
			}
			case 'MB':{
				size *= Math.pow( 1024, 2 );
				break;
			}
			case 'GB':{
				size *= Math.pow( 1024, 3 );
				break;
			}
			case 'TB':{
				size *= Math.pow( 1024, 4 );
				break;
			}
			default:{
				console.log( 'Invalid file size unit [' + unit + ']'  );
				break;
			}
		}
		for( var i = 0; i < value.length; i++ ){
          	var file = value[ i ];
			if(size < file.size){
				valid = false;
				break;
			}
		}
	}
    return valid;
};
