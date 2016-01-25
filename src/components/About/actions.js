import _ from 'lodash';
import request from 'request';
import fs from 'fs';
import path from 'path';
import alt from '../../alt'



class AboutActions {
    constructor() {
        this.generateActions(
            'got'
        );
    }

    getLicense() {
        request('https://raw.githubusercontent.com/dloa/alexandria-librarian/master/LICENSE.md', (error, response, body) => {
            if (!error && response.statusCode == 200 && body)
                this.actions.got({
                    license: body
                });
            else
                fs.readFile(path.join(__dirname, '../../../../', 'LICENSE.md'), (err, data) => {
                    if (err) return console.error(err);
                    this.actions.got({
                        license: data
                    });
                });
        });
    }

    getContributors() {
        var contributors = [];
        request('https://raw.githubusercontent.com/dloa/alexandria-librarian/development/CONTRIBUTORS.md', (error, response, body) => {
            if (!error && response.statusCode == 200 && body) {
                var people = body.split('# ΛLΞXΛNDRIΛ Librarian Contributors:')[1].replace('### Want to contribute?', '').replace(/\n/g, '').replace(/^\s+|\s+$/g, '').split('*').filter(Boolean);
                people.forEach(entry => {
                    entry = entry.split(' | ');
                    var person = {
                        name: entry[0],
                        email: entry[1],
                        url: entry[2].split('(')[1].split(')')[0]
                    };
                    contributors.push(person);
                });
                this.actions.got({
                    contributors: contributors
                });
            } else {
                fs.readFile(path.normalize(path.join(__dirname, '../../', 'CONTRIBUTORS.md')), (err, data) => {
                    if (err) return console.log(err);
                    var people = data.toString().split('# ΛLΞXΛNDRIΛ Librarian Contributors:')[1].replace('### Want to contribute?', '').replace(/\n/g, '').replace(/^\s+|\s+$/g, '').split('*').filter(Boolean);
                    people.forEach(entry => {
                        entry = entry.split(' | ');
                        var person = {
                            name: entry[0],
                            email: entry[1],
                            url: entry[2].split('(')[1].split(')')[0]
                        };
                        contributors.push(person);
                    });
                    this.actions.got({
                        contributors: contributors
                    });
                });
            }
        });
    }

    getVersion() {
        let packageJson = require('../../../../package.json');
        this.actions.got({
            appInfo: {
                version: packageJson.version,
                releaseName: packageJson['relese-name']
            },
            requestedInfo: true
        });
    }

}


export
default alt.createActions(AboutActions);