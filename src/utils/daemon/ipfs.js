import ipfsAPI from 'ipfs-api';
import async from 'async';
import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import {
    EventEmitter
}
from 'events'
import DaemonEngineStore from '../../stores/daemonEngineStore';
import CommonUtil from '../../utils/CommonUtil';

var statsUpdateEmitter = new EventEmitter();

var statsUpdateQueue = async.queue((task, next) => {
    Promise.all([getPeers(), sendCommand('stats/bw'), getPinned()])
        .spread((peers, bandwidth, pinned) => {
            statsUpdateEmitter.emit('stats', {
                id: 'ipfs',
                key: 'stats',
                stats: {
                    peers: peers.length,
                    pinned: {
                        size: _.has(DaemonEngineStore.getState().enabled, 'ipfs.stats.pinned.size') ? DaemonEngineStore.getState().enabled.ipfs.stats.pinned.size : ' loading... ',
                        total: pinned
                    },
                    speed: {
                        up: CommonUtil.formatBytes(bandwidth.RateOut.toFixed(3), 2) + '/s',
                        down: CommonUtil.formatBytes(bandwidth.RateIn.toFixed(3), 2) + '/s'
                    },
                    bw: {
                        up: CommonUtil.formatBytes(bandwidth.TotalOut.toFixed(3), 2),
                        down: CommonUtil.formatBytes(bandwidth.TotalIn.toFixed(3), 2)
                    }
                }
            });
            process.nextTick(next);
        }).catch(err => {
            console.error('IPFS refreshStats()', err);
            process.nextTick(next);
        });
});




const getPeers = () => {
    return new Promise((resolve, reject) => {
        DaemonEngineStore.getState().enabled.ipfs.api.swarm.peers((err, output) => {
            err ? reject(err) : resolve(output.Strings);
        });
    });
}

const getPinnedSize = () => {
    return new Promise((resolve, reject) => {
        CommonUtil.folderSize(path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.ipfs/blocks'))
            .then(bytes => {
                let stats = DaemonEngineStore.getState().enabled.ipfs.stats;
                stats.pinned.size = CommonUtil.formatBytes(bytes.toFixed(3), 2);
                resolve({
                    id: 'ipfs',
                    key: 'stats',
                    stats: stats
                });
            }).catch(reject);
    });
};

const getHashsSize = hashs => {
    let total = 0;
    return new Promise((resolve, reject) => {
        DaemonEngineStore.getState().enabled.ipfs.api.ls(hashs, (err, res) => {
            if (!res.Objects)
                return reject();
            res.Objects.forEach(node => {
                if (node.Links.length > 0) {
                    node.Links.forEach(link => {
                        total = total + link.Size;
                    });
                }
            })
            resolve(CommonUtil.formatBytes(total.toFixed(3), 2));
        })
    });
};

const getPinned = () => {
    return new Promise((resolve, reject) => {
        DaemonEngineStore.getState().enabled.ipfs.api.pin.list((err, output) => {
            if (err) return reject(err);
            resolve(output.Keys);
        });
    });
}

const sendCommand = (cmd, key = null, opts = {}) => {
    return new Promise((resolve, reject) => {
        DaemonEngineStore.getState().enabled.ipfs.api.send(cmd, key, opts, null, (err, output) => {
            err ? reject(err) : resolve(output[0]);
        });
    });
}

module.exports = {
    refreshStats(pinned = false) {
        if (pinned)
            return getPinnedSize();


        return new Promise((resolve, reject) => {

            if (!statsUpdateQueue.idle())
                return reject();

            statsUpdateQueue.push('getStats');

            statsUpdateEmitter.once('stats', resolve);

        });
    },
    getHashsSize(hashs) {
        return getHashsSize(hashs);
    },
    pinHash(hash) {
        return new Promise((resolve, reject) => {
            DaemonEngineStore.getState().enabled.ipfs.api.pin.add(hash, {
                hidden: true
            }, (err, res) => {
                if (err || !res) return reject(err);
                resolve(res.Pinned[0]);
            })
        });
    },
    addFile(file) {
        return new Promise((resolve, reject) => {
            DaemonEngineStore.getState().enabled.ipfs.api.add(file, {
                recursive: true
            }, (err, res) => {
                if (err || !res) return reject(err)
                resolve(res[0]);
            })
        });
    }
}