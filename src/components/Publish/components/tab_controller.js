import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Dropzone from 'react-dropzone';
import _ from 'lodash';


import PublishActions from '../actions';
import publishStore from '../store';


/* Publisher Components */
import Table from './table';
import Register from './register';
import TypeSwitcher from './type_switcher';

import Tab from './type_tabs';

class If extends React.Component {
    render() {
        return this.props.test ? this.props.children : null;
    }
}



export
default React.createClass({

    getInitialState() {
            const types = ['Music'];
            return {
                selectedType: types[0].replace(/\s/g, '').toLowerCase(),
                files: {
                    audio: publishStore.getState().audio,
                    extra: publishStore.getState().extra,
                    cover: publishStore.getState().cover
                },
                meta: {},
                pricing: {},
                types
            };
        },
        componentDidMount() {
            publishStore.listen(this.update);
        },
        componentWillUnmount() {
            publishStore.unlisten(this.update);
        },
        update() {
            if (this.isMounted()) {
                this.setState({
                    files: {
                        audio: publishStore.getState().audio,
                        extra: publishStore.getState().extra,
                        cover: publishStore.getState().cover
                    },
                });
            }
        },
        handleChangeType(type) {
            this.setState({
                selectedType: type.replace(/\s/g, '').toLowerCase()
            });
        },
        handelMetaChange(event) {



        },
        handelOnDrop(type, files) {
            switch (type) {
                case 'audio':
                    PublishActions.processFiles('audio', _.filter(files, file => {
                        return (file.type.indexOf('audio') > -1);
                    }));
                    break;
                case 'extra':
                    PublishActions.processFiles('extra', files);
                    break;
                case 'cover-art':

                    if (this.state.files.cover._id)
                        PublishActions.removeFile(this.state.files.cover._id);

                    PublishActions.processFiles('cover-art', _.filter(files, file => {
                        return (file.type.includes('image'))
                    }));
                    break;
            }
        },



        render() {
            return (
                <div className="section publish" id="publishArtifact">
                    <h4 className="title">Publisher Artifact</h4>
                    <TypeSwitcher handleChangeType={this.handleChangeType} types={this.state.types} selected={this.state.selectedType}/>
                    <Tab {...this.state} />
                </div>
            );
        }
});