import React from 'react';
import path from 'path';
import _ from 'lodash';

import IPFSDash from '../../Dashboard/components/ipfs';
import IPFSPins from './pins';

export
default React.createClass({

    getInitialState() {
        return {

        };
    },
    componentDidMount() {

    },
    componentWillUnmount() {

    },

    update() {
        if (this.isMounted()) {
            this.setState({

            });
        }
    },

    render() {
        return (
            <div className="col-lg-12">
                <IPFSDash active={true}/>
                <IPFSPins />
            </div>
        );
    }
});