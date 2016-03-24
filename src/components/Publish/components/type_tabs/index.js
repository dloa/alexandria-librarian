import React from 'react';

import ExtraDrop from '../drop_zones/extra';
import MusicTab from './music';
import PodcastTab from './podcast';
import VideoTab from './video';

export
default React.createClass({

    getTab(){
        switch (this.props.selectedType) {
            case 'music':
                    return <MusicTab/>;
                break;
            case 'podcast':
                    return <PodcastTab/>;
                break;
            case 'video':
                    return <VideoTab/>;
                break;
        }
    },


    render() {
        return (
            <div className="tab-pane fade in active">
            	{this.getTab()}
            </div>
        );
    }
});