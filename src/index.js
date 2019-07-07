'use strict';

var fs = require('fs');
var _ = require('underscore');
var template = _.template(fs.readFileSync(__dirname + '/template.js', 'utf-8'));

module.exports = function(options) {
  return new Promise(function(resolve, reject) {
    if (options === null || typeof options !== 'object') {
      options = {};
    }
    if (!options.input) {
      return reject(new Error('Input option is mandatory'));
    }
    if (!options.exports) {
      return reject(new Error('Exports option is mandatory'));
    }
    fs.readFile(options.input, 'utf-8', function(err, input) {
      if (err)
        return reject(
          new Error(
            'Could not read input file (' + err.code + ' ' + err.path + ')'
          )
        );
      var idx = input.indexOf('onScriptDownloaded');
      if (idx >= 0) {
        // Obfuscated file
        input = input.substring(idx + 19, input.length - 3); // remove wrapping function
        var arr;
        eval('arr = ' + input);
        input = arr.join(''); // Get pyramidal code
      }
      var endStartIdx = input.indexOf('$wnd.__gwtStatsSessionId : null;');
      if (endStartIdx === -1) {
        return reject(
          new Error('Invalid GWT file. Only xsiframe linker is supported.')
        );
      }
      // Remove useless stuff
      input = input.substring(endStartIdx + 32);
      // Remove sourceURL
      input = input.replace(/\/\/# sourceURL=[^.]+\.js/, '');
      var exportsNames = options.exports.split('.');
      var exportsStr = exportsNames
        .map(function(name) {
          return '["' + name + '"]';
        })
        .join('');
      var exportsName =
        '[' +
        exportsNames
          .map(function(name) {
            return '"' + name + '"';
          })
          .join(',') +
        ']';
      if (options.package) {
        if (typeof options.package === 'string') {
          fs.readFile(options.package, 'utf-8', function(err, pkgStr) {
            if (err)
              return reject(
                new Error(
                  'Could not read package file (' +
                    err.code +
                    ' ' +
                    err.path +
                    ')'
                )
              );
            var pkg;
            try {
              pkg = JSON.parse(pkgStr);
            } catch (e) {
              return reject(new Error('Package file is not a valid JSON'));
            }
            if (pkg !== null && typeof pkg === 'object') {
              parseTemplate(pkg);
            } else {
              return reject(new Error('Package file is not an object'));
            }
          });
        } else if (
          options.package !== null &&
          typeof options.package === 'object'
        ) {
          parseTemplate(options.package);
        }
      } else {
        parseTemplate({});
      }
      function parseTemplate(pkg) {
        if (typeof options.fake !== 'boolean') {
          options.fake = true; // if option is not set, we use fake window
        }
        var final = template({
          gwtContent: '\n' + input,
          exportsName: exportsStr,
          exportsPath: exportsName,
          version: pkg.version || '',
          useFake: options.fake
        });
        var commentStr = ['/**'];
        if (pkg.name) {
          if (pkg.description) {
            commentStr.push(' * ' + pkg.name + ' - ' + pkg.description);
          } else {
            commentStr.push(' * ' + pkg.name);
          }
        }
        pkg.version && commentStr.push(' * @version v' + pkg.version);
        commentStr.push(' * @date ' + new Date().toISOString());
        pkg.homepage && commentStr.push(' * @link ' + pkg.homepage);
        pkg.license && commentStr.push(' * @license ' + pkg.license);
        commentStr.push('*/', '');
        final = commentStr.join('\n') + final;
        if (options.output) {
          fs.writeFile(options.output, final, function(err) {
            if (err)
              return reject(
                new Error(
                  'Could not write output file (' +
                    err.code +
                    ' ' +
                    err.path +
                    ')'
                )
              );
            resolve(true);
          });
        } else {
          resolve(final);
        }
      }
    });
  });
};
