karma-filesort
==============

> Sorts and modifies Karma files lists using JS functions. No more tricky RegExps!

This plugin has been inspired by [karma-angular-filesort](https://github.com/wilsonjackson/karma-angular-filesort), on which it is heavily based.

Installation
------------

    npm install --save-dev karma-filesort

Compatibility
-------------

This plugin is compatible with Karma version 0.13.x and above.

Configuration
-------------

A full plugin configuration would look something like this:

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    //Include 'filesort' as a framework
    frameworks: ['jasmine', 'filesort'],
    
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/**/*.js',
      'test/**/*.js'
    ],

    fileSort: {
        //Sort or modify included files (ones that are included on the page with the <script> tag.
        included: function (includedFiles, log) {
            return includedFiles.filter(function (file) {
                //Filter the list of files using any JS code.
                return ~file.path.indexOf('exclude');
            })
        },
        //Sort or modify served files (ones that are not included on the page, but can be requested manually).
        //If you use it, make sure that served files contain all the included files.
        served: function (servedFiles, log) {
            //Log them, sort them, do anything you want.
            servedFiles.forEach(file=>log.info(file.path));
            //Just return the modified array.
            return servedFiles;
        },
    }
  });
};
```
License
-------

MIT
