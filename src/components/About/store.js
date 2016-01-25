import alt from '../../alt'
import Actions from './actions';


class AboutStore {
    constructor() {
        this.bindActions(Actions);

        this.contributors = [];
        this.license = '';
        this.appInfo = {
            version: '',
            releaseName: ''
        };
        this.requestedInfo = false;
    }

    onGot(data) {
        this.setState(data);
    }

}

export
default alt.createStore(AboutStore);