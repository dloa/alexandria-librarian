import alt from '../alt';
import publishActions from '../actions/publishActions';


class publishStore {
    constructor() {
        this.bindActions(publishActions);

        this.youtubeAuthorization = false;
        this.youtubeContent = false;

    }

    onYoutubeAuthorized(tokens) {
        this.setState({
            youtubeAuthorization: tokens
        });
    }

    onYoutubeContent(content) {
        this.setState({
            youtubeContent: content
        });
    }


}

export
default alt.createStore(publishStore);