import express from 'express';
import morgan from 'morgan';
import url from 'url';
import expressProxy from 'express-http-proxy';
import Promise from 'bluebird';
import enableDestroy from 'server-destroy';
import bodyParser from 'body-parser';
import _ from 'lodash';
import request from 'request';
import Preferences from './PreferencesUtil';

import DaemonEngineStore from '../stores/daemonEngineStore';

/**
 * Base Http API for both the web interface & daemon apis
 * @param {extensions} [extensions=['ipfs']] array of extensions to be loaded
 * @extends Preferences
 */

class HttpAPI extends Preferences {
    constructor(extensions = ['ipfs']) {
        super();

        this.logs = [];
        this.port = this.settings.httpAPI.port;
        this._api = express();
        this.loadedExtensions = [];

        this._APIRouter = express.Router();
        this._APIRouter.get('/', (req, res) => res.json({
            status: 'Librarian API online',
            'available-daemons': this.loadedExtensions
        }));

        this._api.use('/api', this._APIRouter);

        // Log all server hits to console & push to array for use in GUI console
        this._api.use(morgan('combined', {
            stream: {
                write: str => {
                    this.logs.push(str);
                    console.info('HTTPAPI:', str);
                }
            }
        }));

        this._api.use(bodyParser.urlencoded({
            extended: true
        }));
        this._api.use(bodyParser.json());

        this._api.get('/', (req, res) => res.json({
            paths: ['/api/<daemon>/<action>/<command>?<optname>=<opt>', '/web/']
        }));

        this._api.get('*', (req, res) => res.redirect('/'));

        _.each(extensions, extension => this['_' + extension]());

        if (this.settings.httpAPI.active)
            this.start();

        this.emitter.on('httpAPI:active', state => state ? this.start() : this.stop());

        this.emitter.on('httpAPI:port', port => {
            this.port = port;
            this.restart();
        });
    }

    /**
     */
    add(extension) {
        if (!extension)
            return 'no extension provided';

    }

    /**
     */
    remove(extension) {
        if (!extension)
            return 'no extension provided';

    }

    /**
     * Restarts the HTTP API server
     * @type {Function}
     */
    restart() {
        this._server.destroy(_.defer(this.start.bind(this)));
    }

    /**
     * Starts HTTP API server
     * @param {boolean} [force=false] - Force close any exsisting HTTP API instances
     * @type {Function}
     */
    start(force) {
        if (force && this._server)
            this.stop();

        this._server = this._api.listen(this.port, () => console.info('HTTPAPI listening at http://localhost:%s', this._server.address().port));
        enableDestroy(this._server);
    }

    /**
     * Stops HTTP API server
     * @type {Function}
     */
    stop() {
        console.info('Killing HTTPAPI at %s', this._server.address().port);
        this._server.destroy();
    }

    /**
     * Loads Http IPFS API extension
     * @type {Function}
     * @description Serves as an http abstraction layer for https://github.com/ipfs/js-ipfs-api
     * @private
     */
    _ipfs() {
        console.log('Loading IPFS HTTPAPI Extension');

        this._APIRouter.get('/ipfs', (req, res) => res.json({
            status: DaemonEngineStore.getState().enabled.ipfs ? 'online' : 'offline',
            docs: 'https://ipfs.io/docs/api'
        }));

        this._APIRouter.get('/ipfs/add', (req, res) => {
            if (!DaemonEngineStore.getState().enabled.ipfs)
                return res.json({
                    status: 'error',
                    error: 'IPFS daemon not running!'
                });

            if (!req.query || !req.query.file)
                return res.json({
                    status: 'error',
                    error: 'No file specified'
                });

            const file = _.unescape(req.query.file);
            delete req.query.file;

            DaemonEngineStore.getState().enabled.ipfs.api.add(file, req.query, (err, output) => {
                res.json({
                    status: (err || !output) ? 'error' : 'ok',
                    output: (err || !output) ? err : output
                });
            })
        });

        this._APIRouter.use('/ipfs/*', expressProxy('localhost:5001', {
            forwardPath: (req, res) => {
                return '/api/v0/' + req.originalUrl.replace('/api/ipfs/', '');
            }
        }));

        this.loadedExtensions.push('ipfs');
    }

}

export
default HttpAPI;