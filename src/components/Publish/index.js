import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Dropzone from 'react-dropzone';
import _ from 'lodash';


import PublishActions from './actions';
import publishStore from './store';


/* Publisher Components */
import TabController from './components/tab_controller';
import PublisherAuth from './components/publisher_auth';

import Tab from './components/type_tabs';

class If extends React.Component {
    render() {
        return this.props.test ? this.props.children : null;
    }
}



export
default React.createClass({

    getInitialState() {
            return {
                publisherPage: true,
                artifactPage: false
            };
        },
        componentDidMount() {
            publishStore.listen(this.update);
        },
        componentWillUnmount() {
            publishStore.unlisten(this.update);
        },
        onContinue(event) {
        },
        render() {
            return (
                <div className="col-lg-12">
                    {this.state.publisherPage && <PublisherAuth continue={this.onContinue} />}
                    {this.state.artifactPage && <TypeSwitcher handleChangeType={this.handleChangeType} types={this.state.types} selected={this.state.selectedType}/>}
                </div>
            );
        }
});