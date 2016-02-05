import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Dropzone from 'react-dropzone';
import _ from 'lodash';


import PublishActions from './actions';
import publishStore from './store';


/* Publisher Components */
import Table from './components/table';
import Register from './components/register';
import TypeSwitcher from './components/type_switcher';
import PublisherSwitcher from './components/publisher_switcher';


/* tabs */
import MusicTab from './components/type_tabs/music';




let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({

    getInitialState() {
        const types = ['Music'];
        return {
            selectedType: types[0],
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
    handelMoneyBlur(event) {

        
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
                    return (file.type.indexOf('image') > -1);
                }));
                break;
        }
    },

    getTab(){
        switch (this.state.selectedType.toLowerCase()) {
            case 'music':
                    return <MusicTab/>;
                break;
        }
    },

    render() {
        return (
            <div className="col-lg-12">
                <div className="section publish" id="publishArtifact">
                    <h4 className="title">Publish Artifact</h4>
                    <PublisherSwitcher/>
                    <TypeSwitcher handleChangeType={this.handleChangeType} types={this.state.types} selectedType={this.state.selectedType}/>
                    {this.getTab()}


                </div>
            </div>
        );
    }
});