/**
 * File size
 */
var ioValidateValidator_filetype = function( settings ){
    settings = JSON.parse( settings );
    ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_filetype, ioValidateValidator );
ioValidateValidator_filetype.prototype.Validate = function( value, values ){
    var valid = true;

	if( value === null ){
		return valid;
	}

    var types = [];
    for( var i = 0; i < this.settings.types.length; i++ ){
      for( var t = 0; t < this.settings.types[ i ].mimetypes.length; t++ ){
        types.push( this.settings.types[ i ].mimetypes[ t ] );
      }
    }

    if( typeof value == 'string' ){
alert('Validate file type: check extension');
    } else {
      // Iterate over file(s)
      for( var i = 0; i < value.length; i++ ){
        var file = value[ i ];
        if( types.indexOf( file.type ) === -1 ){
          valid = false;
		  break;
        }
      }
    }

    return valid;
};
