import ls from 'local-storage';
import _ from 'lodash';
import {
    v4 as uuid
}
from 'node-uuid';
import {
    EventEmitter
}
from 'events';

const defaultSettings = {
    httpAPI: {
        port: 8079,
        active: false
    },
    minimizeToTray: true,
    startOnLogin: true,
    florincoind: {
        user: 'default',
        pass: uuid()
    }
};

const SettingsEmiiter = new EventEmitter();

export
default class {
    constructor() {
        this.emitter = SettingsEmiiter;
        this.settings = {};

        _.forEach(defaultSettings, (value, index) => {
            if (typeof value === 'object') {
                this.settings[index] = {};
                _.forEach(value, (subValue, subValueIndex) => {
                    let parm = index + ':' + subValueIndex;
                    if (!ls.isSet(parm))
                        this.settings[index][subValueIndex] = this.getAndSet(parm, subValue);
                    else
                        this.settings[index][subValueIndex] = ls.get(parm);
                });
            } else {
                if (!ls.get(index))
                    this.settings[index] = this.getAndSet(index, value);
                else
                    this.settings[index] = ls.get(index);
            }
        });
    }

    set(setting, value) {
        if (setting.includes(':')) {
            let splitSetting = setting.split(':');
            this.settings[splitSetting[0]][splitSetting[1]] = value;
        } else
            this.settings[setting] = value;
        ls.set(setting, value);
        this.emitter.emit(setting, value);
    }

    getAndSet(setting, value) {
        ls.set(setting, value);
        this.emitter.emit(setting, value);
        return value;
    }
};