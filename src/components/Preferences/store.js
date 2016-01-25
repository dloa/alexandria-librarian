import alt from '../../alt';
import Preferences from '../../utils/PreferencesUtil';
import PreferencesActions from './actions';


class PreferencesStore extends Preferences {
    constructor() {
        super();
        this.bindActions(PreferencesActions);
    }

    onChanged(opts) {
        const {
            setting, value
        } = opts;
        this.set(setting, value)
    }


}

export
default alt.createStore(PreferencesStore);