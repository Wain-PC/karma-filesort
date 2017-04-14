'use strict';
var fileSort = function (emitter, logger, sorter) {
	var log = logger.create('karma-filesort'), originalEmit = emitter.emit;
	// The file list is sorted by intercepting the file_list_modified event as Vojta Jina describes here:
	// https://github.com/karma-runner/karma/issues/851#issuecomment-30290071
	emitter.emit = function (event, files) {
		if (event === 'file_list_modified') {
			files.included = sorter && sorter.included ? sorter.included(files.included, log) : files.included;
			files.served = sorter && sorter.served ? sorter.served(files.served, log) : files.served;
			originalEmit.call(emitter, event, files);
		} else {
			originalEmit.apply(emitter, arguments);
		}
	};
};

fileSort.$inject = ['emitter', 'logger', 'config.fileSort'];

module.exports = {
	'framework:filesort': ['factory', fileSort]
};
