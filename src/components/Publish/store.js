import alt from '../../alt'
import Actions from './actions';


class Store {
    constructor() {
        this.bindActions(Actions);

        this.cover = {};
        this.audio = [];
        this.extra = [];

    }

    onRemoveFile(id) {
        this.setState({
            extra: this.extra.filter(file => {
                return file._id !== id;
            }),
            audio: this.audio.filter(file => {
                return file._id !== id;
            })
        });
    }

    onSetCover(cover) {
        this.setState({
            cover: cover
        });
    }

    onClearType(type) {
        this.setState({
            [type]: (type === cover) ? {} : []
        });
    }

    onAddedFiles(file) {
        this[file.type].push(file);
        this.setState({
            [file.type]: this[file.type]
        });
    }

}

export
default alt.createStore(Store);