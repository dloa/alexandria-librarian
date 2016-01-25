import {
    app
}
from 'remote';
import path from 'path';
import alt from '../../../alt';
import Actions from './actions';
import CommonUtil from '../../../utils/CommonUtil';

const pinnedJson = path.join(app.getPath('userData'), 'pinned.json');


class ipfsManageStore {
    constructor() {
        this.bindActions(Actions);

        this.pinned = {};
        this.loadedDB = false;
    }

    onPined(pin) {
        let pinned = this.pinned;
        pinned[pin.hash] = pin;
        this.setState({
            pinned: pinned
        });
        CommonUtil.saveJson(pinnedJson, pinned);
    }

    onLoadedDB(db) {
        this.setState({
            loadedDB: true,
            pinned: Object.assign(this.pinned, db)
        });
    }


}

export
default alt.createStore(ipfsManageStore);