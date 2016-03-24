import alt from '../../alt'
import Actions from './actions';


class Store {
    constructor() {
        this.bindActions(Actions);

        this.publisher = "";
        this.timestamp = 0;
        this.type = "";
        this.title = "";
        this.description = "";
        this.year = 1990;
        this.artist = "";
        this.company = "";
        this.tags = [],
        this.genere = "";
        this.cover = {};
        this.audioFiles = [];
        this.podcastFiles = [];
        this.videoFiles = [];
        this.extraFiles = [];
        this.currency = "usd"; // Do not ask user, stay default.
        this.paymentToken = "btc"; // Do not ask user, stay default.
        this.paymentAddress = ""; // Bitcoin payment address
        this.suggPlayPrices = 0;
        this.minPlayPrices = 0;
        this.suggBuyPrices = 0;
        this.minBuyPrices = 0;
        this.suggTips = 0; // Not implemented in GUI yet
        this.promotersRate = 0; // Not implemented in GUI yet
        this.ptpFreeThreshold = -1; // Not implemented in GUI yet
        this.p2pDiscThreshold = -1; // Not implemented in GUI yet
        this.p2pDiskAmount = 0; // Not implemented in GUI yet
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