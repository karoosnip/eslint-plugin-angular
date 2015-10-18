
var fs = require('fs');
var _ = require('lodash');

var templates = {
    ruleSourcePath: _.template('rules/<%= ruleName %>.js'),
    ruleDocumentationPath: _.template('docs/<%= ruleName %>.md'),
    readmeRuleLine: _.template(' * [<%= ruleName %>](<%= documentationPath %>) - <%= linkDescription %>'),
    readmeRuleSectionContent: _.template('## Rules\n\n<%= content %>\n\n\n\n##')
};

var templatesDir = './scripts/templates/';
var templateSettings = {
    imports: {
        formatConfigAsJson: function (examples) {
            var config = examples[0].options;
            if (!config) {
                return 2
            } else {
                return JSON.stringify([2].concat(config));
            }
        },
        formatConfigAsMarkdown: function (examples) {
            var config = examples[0].options;
            if (!config) {
                return '';
            } else {
                return '`' + config.map(JSON.stringify).join('` and `') + '`';
            }
        },
        indent: function (content, indentation) {
            var spaces = new Array(indentation + 1).join(' ');
            return content.replace(/\n/g, '\n' + spaces);
        }
    }
};

fs.readdirSync(templatesDir).forEach(function (templateFilename) {
    var templateName = templateFilename.split('.')[0];
    if (templates[templateName] !== undefined) {
        throw new Error('Can not create from template "' + templateFilename + '" because template key "' +
            templateName + '" already exists.');
    }

    templates[templateName] = _.template(fs.readFileSync(templatesDir + templateFilename), templateSettings);
});

module.exports = templates;
