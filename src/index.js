'use strict';
const _ = require('lodash');

const defaultOptions = {
    fake: true,
    template: `${__dirname}/template.js`
};

module.exports = options => {
    options = _.defaults(options, defaultOptions);
    if (!_.isString(options.input)) return Promise.reject(new Error('Input option is mandatory'));
    if (!_.isString(options.exports)) return Promise.reject(new Error('Exports option is mandatory'));
    return require('fs-promise').readFile(options.input, 'utf-8')
        .catch(handleFSError)
        .then(checkGWTFile)
        .then(handleRemoveWrappingFunction)
        .then(handleRemoveUselessStuff)
        .then(contents => compileTemplate(contents, options))
        .then(payload => options.output ? handleOutputPayload(payload, options) : payload);
};

function checkGWTFile(contents) {
    if (!_.includes(contents, '$wnd.__gwtStatsSessionId : null;')) {
        throw new Error('Invalid GWT file. Only xsiframe linker is supported.');
    }
    return contents;
}

function isObfuscated(contents) {
    return contents.indexOf('onScriptDownloaded(') === -1
        && contents.lastIndexOf(');') === -1;
}

function handleRemoveWrappingFunction(contents) {
    if (isObfuscated(contents)) {
        const beginText = 'onScriptDownloaded(';
        const endText = ');';
        const code = contents.substring(
            contents.indexOf(beginText) + beginText.length,
            contents.lastIndexOf(endText)
        );
        return JSON.parse(code).join('');
    }
    return contents;
}

function handleRemoveUselessStuff(contents) {
    const endStart = '$wnd.__gwtStatsSessionId : null;';
    const endStartIndex = contents.indexOf(endStart);
    return contents.substring(endStartIndex + endStart.length);
}

function handleOutputPayload(payload, options) {
    return require('fs-promise').writeFile(options.output, payload)
        .catch(handleFSError)
        .then(() => true)
}

function handleFSError(error) {
    throw new Error(`Could not read input file (${error.code} ${error.path})`);
}

function compileTemplate(contents, options) {
    return getPackageInfo(options)
        .then(pkgInfo => `${buildComments(pkgInfo)}\n${buildPayload(contents, options, pkgInfo)}`);

    function buildPayload(contents, options, pkgInfo) {
        return getTemplate(options.template)({
            version: _.get(pkgInfo, 'version', ''),
            useFake: options.fake,
            gwtContent: `\n${contents}`,
            exportsPath: getExportsPath(options.exports)
        })
    }

    function buildComments(pkgInfo) {
        const comments = [];
        const push = (content, condition) => {
            if (_.isUndefined(condition) || condition) {
                comments.push(content);
            }
        };

        push('/**');
        push(` * ${_.compact([pkgInfo['name'], pkgInfo['description']]).join(' - ')}`, pkgInfo['name']);
        push(` * @version v${pkgInfo['version']}`, pkgInfo['version']);
        push(` * @date ${(new Date()).toISOString()}`);
        push(` * @link ${pkgInfo['homepage']}`, pkgInfo['homepage']);
        push(` * @license ${pkgInfo['license']}`, pkgInfo['license']);
        push(' */');

        return comments.join('\n');
    }
}

function getPackageInfo(options) {
    const pkg = _.get(options, 'package');
    if (_.isString(pkg)) {
        return require('fs-promise').readFile(pkg, 'utf-8')
            .catch(handleFSError)
            .then(pkgInfo => JSON.parse(pkgInfo), () => {
                throw new Error('Package file is not a valid JSON');
            })
            .then(pkgInfo => {
                if (!_.isObject(pkgInfo)) throw new Error('Package file is not an object');
                return pkgInfo;
            });
    }
    if (_.isObject(pkg)) {
        return Promise.resolve(pkg);
    }
    return Promise.resolve({});
}

function getExportsPath(exports) {
    return exports.split('.')
        .map(name => [String(name)])
        .map(JSON.stringify)
        .join('');
}

function getTemplate(path) {
    return _.template(require('fs').readFileSync(path, 'utf-8'));
}
