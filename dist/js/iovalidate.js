(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.ioValidate = factory();
    }
}(
    this,
    function () {
        'use strict';

        var getAttributes = function( element ){
            var attributes = {};
			var attribute_names = element.attributes;
			if( typeof attribute_names != 'undefined' ){
				for (var i = 0; i < attribute_names.length; i++){
					attributes[ attribute_names[i].nodeName ] = element.getAttribute( attribute_names[i].nodeName );
				}
			}
            return attributes;
        };

        /********
         * Handles form interaction
         */
        var ioValidate = function( definition ){
            this.validators = {};
			this.error_render_function = null;
			this.error_render_target = null;
            this.error_text = {
				required: 'This field is required',
				email: 'This is not a valid email address'
			};
            this.error_text_field = {};
            this.errors = {};

            // What sort of element/selector have we been given?
            if ( typeof definition == 'string' ) {
                // String
                var items = document.querySelectorAll( definition );
                if ( items.length === 0 ) {
                    throw new Error( 'ioValidate error: Selector ["' + definition + '"] returns no elements' );
                }
                if ( items.length > 1 ) {
                    console.log( 'ioValidate warning: Selector ["' + definition + '"] returns more than one element. All but the first element will be ignored. Selected elements are:' );
                    console.log( items );
                }
                definition = items[0];
            } else if ( typeof definition == 'object' && !(definition instanceof HTMLElement) ) {
                // If it has length, it's probably an array-ish thing (e.g. jQuery collection)
                if ( typeof definition.length !== 'undefined' ) {
                    if ( definition.length === 0 ) {
                        throw new Error( 'ioValidate error: Collection contains no elements' );
                    }
                    if ( definition.length > 1 ) {
                        console.log( 'ioValidate warning: Collection contains more than one element. All but the first element will be ignored. Selected elements are:' );
                        console.log( definition );
                    }
                    definition = definition[0];
                } else {
					if( definition instanceof ioForm ){
						definition = definition.GetElement();
					} else {
						// It's an object -- do nothing
					}
				}
            }

			if( definition instanceof HTMLElement ){
				// Already initialised?
				if ( definition.ioValidate ) {
					// Return current instance
					return definition.ioValidate;
				} else {
					definition.ioValidate = this;
					definition.setAttribute( 'novalidate', '' );
					var _form = new ioForm( definition );
					this.FromForm( _form );
				}
			} else {
				// It's an object
				alert( 'Objects not yet supported' );
			}
        };
        ioValidate.prototype = {
            FromForm:function( form ){
                if( typeof ioForm == 'undefined' ){
                    console.log( 'ioValidate requires ioForm' );
                    return;
                }
                this.validators = {};
                var fields = form.GetFields();
                var validators = [];
                var errors = [];
                for( var index in fields ){
                    if( fields.hasOwnProperty( index ) ){
                        var field = fields[ index ];
                        var attributes = getAttributes( field.GetElement() );
                        for( var attribute in attributes ){
                            if( attributes.hasOwnProperty( attribute ) ){
                                switch( attribute ){
                                    // HTML5 validators
                                    case 'required':
                                    case 'min':
                                    case 'max':
//                                    case 'step':
                                    case 'maxlength':
                                    {
                                        validators.push( {field:field, type:attribute, settings:attributes[ attribute ], value_type:attributes.type} );
                                        break;
                                    }
									case 'pattern':
                                    {
                                        validators.push( {field:field, type:'pattern', settings:attributes[ attribute ], value_type:attributes.type} );
                                        break;
                                    }
									case 'type':{
										var types = ['email','number','url'];
										if( types.indexOf( attributes[ attribute ] ) !== -1 ){
	                                        validators.push( {field:field, type:attributes[ attribute ], settings:{}, value_type:attributes.type} );
										}
										break;
									}
                                    // Anything else
                                    default:{
                                        // Anything with iovalidate prefix
                                        if(
                                           attribute.substr( 0, 16 ) === 'data-iovalidate-'
                                           ||
                                           attribute.substr( 0, 9 ) === 'data-iov-'
                                        ){
                                            var name = attribute.match( /^(data\-iovalidate\-|data\-iov\-)(.*)$/ )[2];
                                            // Error string?
                                            if( name.substr( 0, 6 ) === 'error-' ){
                                                errors.push( {field:field, type:name.substr( 6 ), settings:attributes[ attribute ]} );
                                            } else {
                                                validators.push( {field:field, type:name, settings:attributes[ attribute ], value_type:attributes.type} );
                                            }
                                        }
                                        // Do nothing
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                for( var i = 0; i < validators.length; i++ ){
                    var validator = validators[i];
                    this.AddValidator( validator.field, validator.type, validator.settings, validator.value_type );
                }
                for( i = 0; i < errors.length; i++ ){
                    var error = errors[i];
                    this.AddErrorText( error.field, error.type, error.settings );
                }

				form.on(
					'reset',
					function(event){
						this.ClearFormErrors( new ioForm( event.target ) )
					}.bind(this)
				);
			},
			GetValidator:function( value, type ){
				if( typeof this.validators[ value ] !== 'undefined' ){
					for( var i = 0; i < this.validators[ value ].length; i++ ){
						if( this.validators[ value ][ i ].type === type ){
							return this.validators[ value ][ i ];
						}
					}
				}
				return null;
			},
			DoFormValidation:function( form ){
				var form = new ioForm( form );
				this.ClearFormErrors( form );
				var values = form.GetValues();
				if( this.Validate( values ) ){
					form.trigger( 'iovalidate:valid' );
                    return true;
				} else {
					this.RenderFormErrors( form, this.errors );
					form.trigger( 'iovalidate:invalid', { errors: this.errors } );
                    return false;
				}
			},
            AddValidator:function( field, type, settings, value_type ){
                var field_name = field.GetFieldName();
                if( typeof this.validators[ field_name ] === 'undefined' ){
                    this.validators[ field_name ] = [];
                }
                if( typeof settings.message != 'undefined' ){
                    this.AddErrorText( field, type, settings.message );
                }
                this.validators[ field_name ].push(
                    new ioValidateDefinition(
                        {
                            type: type,
                            settings: settings,
                            enabled:true,
                            value_type:value_type
                        }
                    )
                );
            },
            AddErrorText:function( field, type, message ){
                var field_name = field.GetFieldName();

                if( typeof this.error_text_field[ field_name ] === 'undefined' ){
                    this.error_text_field[ field_name ] = {};
                }
                this.error_text_field[ field_name ][ type ] = message;
            },
			/**
			 * Get message text for error
			 *
			 * @param	string		error_type		e.g. required, max etc
			 * @param	string		field_name		Name of field (in case a custom error message has been set)
			 */
            GetErrorText:function( error_type, field_name ){
				if(
				   typeof this.error_text_field[ field_name ] !== 'undefined'
				   &&
				   typeof this.error_text_field[ field_name ][ error_type ] !== 'undefined'
				){
					return this.error_text_field[ field_name ][ error_type ];
				}
				if( typeof this.error_text[ error_type ] !== 'undefined' ){
					return this.error_text[ error_type ];
				}
                return 'This value is not valid';
            },
            Validate:function( values ){
                var valid = true;
                for( var index in values ){
                    if( values.hasOwnProperty( index ) ){
                        if( !this.ValidateValue( index, values[ index ], values ) ){
                            valid = false;
                        }
                    }
                }
                return valid;
            },
            ValidateValue:function( name, value, values ){
                this.ClearErrors( name );
                var valid = true;
                if( typeof this.validators[ name ] !== 'undefined' ){
                    for( var i = 0; i < this.validators[ name ].length; i++ ){
                        var validator_definition = this.validators[ name ][ i ];
						if( validator_definition.enabled ){
							var settings = validator_definition.settings;
							var validator = new window[ 'ioValidateValidator_' + validator_definition.type ]( settings );
                            validator.value_type = validator_definition.value_type;
							if( !validator.Validate( value, values ) ){
								this.AddError(
									name,
									this.GetErrorText( validator_definition.type, name )
								);
								valid = false;
							}
						}
                    }
                }
                return valid;
            },
            ClearErrors:function( name ){
                if( typeof this.errors[ name ] !== 'undefined' ){
                    delete( this.errors[ name ] );
                }
            },
            AddError:function( name, error ){
                if( typeof this.errors[ name ] === 'undefined' ){
                    this.errors[ name ] = [];
                }
                this.errors[ name ].push( error );
            },
            GetErrors:function(){
                return this.errors;
            },
			ClearFormErrors:function( form ){
				var form_element = form.GetElement();
				var errors = form_element.querySelectorAll( '[data-iovalidate-errors-for]' );
				for( var i = 0; i < errors.length; i++ ){
					errors[ i ].parentNode.removeChild( errors[ i ] );
				}
				form.trigger( 'iovalidate:clearformerrors' );
			},
			SetErrorRenderFunction:function( func ){
				this.error_render_function = func;
			},
			SetErrorRenderTarget:function( target ){
				this.error_render_target = target;
			},
            RenderFormErrors:function( form, errors ){

				var form_element = form.GetElement();

                for( var index in errors ){
                    if( this.errors.hasOwnProperty( index ) ){
            			var field = form_element.querySelector( '[name="' + form.GetField( index ).GetName() + '"]' );

                        var error_html = '';
                        for( var i = 0; i < errors[ index ].length; i++ ){
                            error_html += '<li>' + errors[ index ][ i ] + '</li>';
                        }
						var errors_container = form_element.querySelector( '[data-iovalidate-errors-for="' + index + '"]' );
						if( errors_container ){
							errors_container.parentNode.removeChild( errors_container );
						}
						var errors_element = parseHTML('<ul class="errors" data-iovalidate-errors-for="' + index + '">' + error_html + '</ul>');
						if( this.error_render_target !== null && typeof this.error_render_target === 'function' ){
							this.error_render_target( field, errors_element );
						} else {
	                        field.parentNode.insertBefore(errors_element, field.nextSibling);
						}
                    }
                }
            }
        };
        return ioValidate;
    }
));

if( typeof extend !== 'function' ){
	if (typeof Object.create !== 'function') {
		Object.create = function (o) {function F() {}F.prototype = o;return new F();};
	}
	var extend = function(ch, p) {var cp = Object.create(p.prototype);cp.constructor = ch;ch.prototype = cp;};
}

//isNumeric: function( obj ) {
//    return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
//}

/**
 * jQuery 2.1.3's parseHTML (without scripts options).
 * Unlike jQuery, this returns a DocumentFragment, which is more convenient to insert into DOM.
 * MIT license.
 *
 * If you only support Edge 13+ then try this:
    function parseHTML(html, context) {
        var t = (context || document).createElement('template');
            t.innerHTML = html;
        return t.content.cloneNode(true);
    }
 */
var parseHTML = (function() {
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        // We have to close these tags to support XHTML (#13200)
        wrapMap = {
            // Support: IE9
            option: [1, "<select multiple='multiple'>", "</select>"],

            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

            _default: [0, "", ""]
        };

    /**
     * @param {String} elem A string containing html
     * @param {Document} context
     */
    return function parseHTML(elem, context) {
        context = context || document;

        var tmp, tag, wrap, j,
            fragment = context.createDocumentFragment();

        if (!rhtml.test(elem)) {
            fragment.appendChild(context.createTextNode(elem));

            // Convert html into DOM nodes
        } else {
            tmp = fragment.appendChild(context.createElement("div"));

            // Deserialize a standard representation
            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

            // Descend through wrappers to the right content
            j = wrap[0];
            while (j--) {
                tmp = tmp.lastChild;
            }

            // Remove wrappers and append created nodes to fragment
            fragment.removeChild(fragment.firstChild);
            while (tmp.firstChild) {
                fragment.appendChild(tmp.firstChild);
            }
        }

        return fragment;
    };
}());
;
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
;
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
;
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
;
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
;
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
			case 'KB':{
				// Do nothing
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
;
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
;
/**
 * Greater than or equal to
 */
var ioValidateValidator_greaterequal = function( settings ){
 ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_greaterequal, ioValidateValidator );
ioValidateValidator_greaterequal.prototype.Validate = function( value, values ){
 var valid = true;

	if( value !== null && values[ this.settings ] !== null ){
		if( value < values[ this.settings ] ){
			valid = false;
		}
	}

 return valid;
};
;
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
;
/**
 * Max length
 */
var ioValidateValidator_maxlength = function( settings ){
	ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_maxlength, ioValidateValidator );
ioValidateValidator_maxlength.prototype.Validate = function( value, values ){
	// This shouldn't be required, because the maxlength attribute...
	// ...should restrict the length of the input
	return value.toString().length <= parseInt( this.settings );
};
;
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
;
/**
 * Number
 */
var ioValidateValidator_number = function( settings ){
 ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_number, ioValidateValidator );
ioValidateValidator_number.prototype.Validate = function( value ){
 var valid = true;
	if( value.toString().length > 0 && !( (value - parseFloat( value ) + 1) >= 0) ){
		valid = false;
	}

 return valid;
};
;
/**
 * Regular expression - 'pattern'
 * i.e. equivalent to the HTML5 pattern attribute
 */
var ioValidateValidator_pattern = function( settings ){
	ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_pattern, ioValidateValidator );
ioValidateValidator_pattern.prototype.Validate = function( value, values ){

	// We're just going to use HTML5's native pattern validation
	var element = document.createElement('input');
	element.setAttribute( 'pattern', this.settings );
	element.setAttribute( 'value', value );
	element.checkValidity();

	return element.validity.valid;
};
ioValidateValidator_pattern.prototype.SetPattern = function( pattern ){
	this.settings = pattern;
}
;
/**
 * Regular expression - 'pattern'
 */
var ioValidateValidator_regex = function( settings ){
	ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_regex, ioValidateValidator );
ioValidateValidator_regex.prototype.Validate = function( value, values ){
 	var valid = true;

	if( new RegExp( this.settings ).test( value ) ){
		valid = false;
	}

	return valid;
};
;
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
;
/**
 * URL
 */
var ioValidateValidator_url = function( settings ){
    ioValidateValidator.call( this, settings );
};
extend( ioValidateValidator_url, ioValidateValidator );
ioValidateValidator_url.prototype.Validate = function( value ){
    var valid = true;
	// Taken from https://rodneyrehm.de/t/url-regex.html#imme_emosol
	if( value != '' && !value.match( /(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i ) ){
		valid = false;
	}
    return valid;
};
