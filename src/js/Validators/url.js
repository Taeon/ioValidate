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
