import _ from 'lodash';
import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import DaemonActions from '../../actions/daemonEngineActions';
import CommonUtil from '../../utils/CommonUtil';
import {
    app, dialog
}
from 'remote';


const fileExists = filePath => {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}


export
default {
    getParms(installed) {
        return new Promise((resolve, reject) => {

            const confFile = path.join(app.getPath('appData'), 'Florincoin', 'Florincoin.conf');

            if (fileExists(confFile)) {
                let Conf = fs.readFileSync(confFile, 'utf8').split('\n');
                var matches = _.filter(Conf, line => {
                    return (line.indexOf('rpcuser=') !== -1 || line.indexOf('rpcpassword=') !== -1);
                });
                if (matches.length === 2) {
                    var res = {};
                    _.forEach(matches, match => {
                        if (match.indexOf('rpcpassword=') > -1)
                            res.pass = match.split('=').splice(1).join('=');
                        else
                            res.user = match.split('=').splice(1).join('=');
                    });
                    resolve(res);
                } else {
                    dialog.showMessageBox({
                        noLink: true,
                        type: 'error',
                        title: 'Alexandria Librarian: Error!',
                        message: 'Invalid Florincoin config detected!',
                        detail: 'Libraryd daemon requires a valid Florincoin daemon configuration.',
                        buttons: ['Dissmiss']
                    });
                    reject();
                }
            } else {
                DaemonActions.enabling({
                    id: 'libraryd',
                    code: 8,
                    error: 'Initialization Error: Florincoind installation not found.'
                });
            }

        });
    }

}