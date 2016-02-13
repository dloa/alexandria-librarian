import React from 'react';


import ExtraDrop from '../drop_zones/extra';
import MusicTab from './music';



export
default React.createClass({

    getTab(){
        switch (this.props.selectedType) {
            case 'music':
                    return <MusicTab/>;
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