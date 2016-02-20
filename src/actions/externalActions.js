import alt from '../alt'

class externalActions {

    constructor() {
        this.generateActions(
            'gotLicense',
            'gotContributors',
            'gotVersion'
        );
    }

    getLicense() {
        require('../utils/aboutUtil').getLicense();
        return false
    }

    getContributors() {
        require('../utils/aboutUtil').getContributors();
        return false
    }

    getVersion() {
        require('../utils/aboutUtil').getVersion();
        return false
    }
}


export
default alt.createActions(externalActions);