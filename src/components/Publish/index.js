import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Dropzone from 'react-dropzone';
import _ from 'lodash';

import TableComponent from './components/table';
import PublishActions from './actions';
import publishStore from './store';


let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({

    getInitialState() {
        return {
            type: 'album',
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
        let selectedType = this.state.type;
        return (
            <div className="col-lg-12">
                <div className="section publish">
                    <h4 className="title">Publish Artifact</h4>
                    <div className="publish-section">
                        <h5>Select Artifact type</h5>
                        <div className="artifact-type">
                            <div data-toggle="buttons">
                                {
                                    ['Archive','Movies', 'Videos', 'Song', 'Album', 'Podcast', 'Recipies', 'Things'].map((type, idx) => {
                                        return (
                                            <label key={idx} onClick={this.handleChangeType.bind(this, type)} className={ 'btn btn-toggle-primary ' + ((selectedType === type.replace(/\s/g, '').toLowerCase()) ? 'active' : '')}>
                                                <input type="radio" autoComplete="off"/> {type}
                                            </label>
                                            );
                                    }, this)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="publish-section">
                        <div className="row">
                            <div className="col-sm-8">
                                <h5>Album Information</h5>
                                <form>
                                    {
                                        ['Artist Name','Album Title', 'Record Label', 'Release Date'].map((type, idx) => {
                                            return (
                                                <div key={idx} className="form-group">
                                                    <input type="text" className="form-control" placeholder={type}/>
                                                </div>
                                                )
                                        }, this)
                                    }
                                </form>
                            </div>
                            <div className="col-sm-4">
                                <h5>Cover Art</h5>
                                <Dropzone className="upload-area" onDrop={this.handelOnDrop.bind(this, 'cover-art')}>
                                    <img src={this.state.files.cover.path} alt="" className="cover-art"/>
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    <div className="publish-section publish-pricing">
                        <img src="images/il-money.png" className="li-money"/>
                        <div className="row">
                            <div className="col-sm-10">
                               <p className="small">Pick the price for your track and album.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-sm-6">
                                <h5>Individual Track Pricing</h5>
                                <form className="form-horizontal">
                                    {
                                        ['Suggested price / play', 'Minimum price / play', 'Suggested price / download', 'Minimum price / download'].map((price, idx) => {
                                            return (
                                                    <div key={idx} className="form-group">
                                                        <label htmlFor="" className="col-sm-7 control-label">{price}</label>
                                                        <div className="col-sm-5">
                                                            <div className="input-group">
                                                                <div className="input-group-addon">$</div>
                                                                <input onBlur={this.handelMoneyBlur(this)} type="text" className="form-control" id="" placeholder="0.00"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }, this)
                                    }
                                </form>
                            </div>
                            <div className="col col-sm-6">
                                <h5>Full Album Pricing</h5>
                                <form className="form-horizontal">
                                    {
                                        ['Suggested price / play', 'Minimum price / play', 'Suggested price / download', 'Minimum price / download'].map((price, idx) => {
                                            return (
                                                    <div key={idx} className="form-group">
                                                        <label htmlFor="" className="col-sm-7 control-label">{price}</label>
                                                        <div className="col-sm-5">
                                                            <div className="input-group">
                                                                <div className="input-group-addon">$</div>
                                                                <input onBlur={this.handelMoneyBlur(this)} type="text" className="form-control" id="" placeholder="0.00"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }, this)
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="publish-section">
                        <div className="publish-files audio-tracks">
                            <h5>
                            <object type="image/svg+xml" data="images/svg/media-16px-2_note-03.svg"/>
                            Audio Tracks</h5>

                            <TableComponent type="audio" files={this.state.files.audio} />

                            <Dropzone className="upload-area" onDrop={this.handelOnDrop.bind(this, 'audio')}>
                                <object data="images/svg/arrows-24px-glyph-2_file-upload-88.svg" type="image/svg+xml"/>
                            </Dropzone>
                        </div>
                    </div>
                    <div className="publish-section">
                        <div className="publish-files extra-files">
                            <h5>
                                <object type="image/svg+xml" data="images/svg/files-16px_single-folded-content.svg"/>
                                Extra Files
                            </h5>

                            <TableComponent type="extra" files={this.state.files.extra} />

                            <Dropzone className="upload-area" onDrop={this.handelOnDrop.bind(this, 'extra')}>
                                <object data="images/svg/arrows-24px-glyph-2_file-upload-88.svg" type="image/svg+xml"/>
                            </Dropzone>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});