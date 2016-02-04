import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Dropzone from 'react-dropzone';
import _ from 'lodash';


import PublishActions from './actions';
import publishStore from './store';


/* Publisher Components */
import Table from './components/table';
import Register from './components/register';
import TypeSwitcher from './components/type_switcher'





let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({

    getInitialState() {
        return {
            types: ['Archive','Movies', 'Videos', 'Song', 'Album', 'Podcast', 'Recipies', 'Things'],
            selectedType: 'album',
            files: {
                audio: publishStore.getState().audio,
                extra: publishStore.getState().extra,
                cover: publishStore.getState().cover
            },
            meta: {},
            pricing: {}
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
            type: type.replace(/\s/g, '').toLowerCase()
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
    render() {
        return (
            <div className="col-lg-12">
                <TypeSwitcher handleChangeType={this.handleChangeType} types={this.state.types} selectedType={this.state.selectedType}/>



            </div>
        );
    }
});