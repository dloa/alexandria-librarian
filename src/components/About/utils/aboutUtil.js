import request from 'request';
import fs from 'fs';
import path from 'path';
import externalActions from '../actions/externalActions';


module.exports = {
    getVersion: function() {
        var appVersion = 'ΛLΞXΛNDRIΛ Librarian v' + require('../../package.json').version;
        externalActions.gotVersion(appVersion);
        return appVersion;
    },

    getLicense: function() {
        request('https://raw.githubusercontent.com/dloa/alexandria-librarian/master/LICENSE.md', function(error, response, body) {
            if (!error && response.statusCode == 200)
                externalActions.gotLicense(body);
            else
                fs.readFile(path.normalize(path.join(__dirname, '../../', 'LICENSE.md')), function(err, data) {
                    if (err) return console.log(err);
                    externalActions.gotLicense(data);
                })
        });
    },

    getContributors: function() {
        var contributors = [];
        request('https://raw.githubusercontent.com/dloa/alexandria-librarian/master/CONTRIBUTORS.md', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var people = body.split('# ΛLΞXΛNDRIΛ Librarian Contributors:')[1].replace('### Want to contribute?', '').replace(/\n/g, '').replace(/^\s+|\s+$/g, '').split('*').filter(Boolean);
                people.forEach(function(entry) {
                    entry = entry.split(' | ');
                    var person = {
                        name: entry[0],
                        email: entry[1],
                        github: entry[2].split('(')[1].split(')')[0]
                    };
                    contributors.push(person);
                });
                externalActions.gotContributors(contributors);

            } else {
                fs.readFile(path.normalize(path.join(__dirname, '../../', 'CONTRIBUTORS.md')), function(err, data) {
                    if (err) return console.log(err);
                    var people = data.toString().split('# ΛLΞXΛNDRIΛ Librarian Contributors:')[1].replace('### Want to contribute?', '').replace(/\n/g, '').replace(/^\s+|\s+$/g, '').split('*').filter(Boolean);
                    people.forEach(function(entry) {
                        entry = entry.split(' | ');
                        var person = {
                            name: entry[0],
                            email: entry[1],
                            github: entry[2].split('(')[1].split(')')[0]
                        };
                        contributors.push(person);
                    });
                    externalActions.gotContributors(contributors);
                });
            }
        });
    }
};