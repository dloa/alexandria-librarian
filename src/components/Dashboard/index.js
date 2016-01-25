import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import IPFS from './components/ipfs';
import Florincoind from './components/florincoin';
import Libraryd from './components/libraryd';


export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {

        };
    },

    componentDidMount() {
        // daemonStore.listen(this.update);
    },

    componentWillUnmount() {
        //daemonStore.unlisten(this.update);
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
                <IPFS/>
                <Florincoind/>
                <Libraryd/>
            </div>
        );
    }
});