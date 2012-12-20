/** MIT License (c) copyright B Cavalier & J Hann */

/**
 * curl json! cram plugin
 */
define(['./jsEncode'], function (jsEncode) {

	return {

		compile: function (pluginId, resId, req, io, config) {
			var absId;

			absId = pluginId + '/_/' + resId;

			io.read(
				resId,
				function (source) {
					if (config.strictJSONParse) {
						try { JSON.parse(source); } catch (ex) { io.error(ex); }
					}
					// write-out define(id,function(){return{/* json here */}});
					source = 'define("'
						+ absId
						+ '", function () { return '
						+ source
						+ '; });';
					io.write(source);
				},
				io.error
			);
		}
	};

});
