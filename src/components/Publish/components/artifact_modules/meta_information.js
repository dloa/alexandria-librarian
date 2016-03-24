import React from 'react';

import CoverArt from './coverArt';

export
default React.createClass({
    render() {
        return (
            <div className="publish-section information">
                <div className="row">
                    {this.props.music && (
                        <div className="col-sm-8">
                            <h5>Album Information</h5>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Album Title"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Artist Name"/>
                                </div>
                                <div className="row">
                                    <div className="col col-sm-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Genre"/>
                                        </div>
                                    </div>
                                    <div className="col col-sm-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Release Year"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Tags"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Record Label"/>
                                </div>
                                <div className="form-group">
                                    <textarea row="3" className="form-control" placeholder="Album Description"/>
                                </div>
                            </form>
                        </div>
                    )}
                    {this.props.podcast && (
                        <div className="col-sm-8">
                            <h5>Podcast Information</h5>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="" placeholder="Episode Title" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="" placeholder="Creator Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="" placeholder="Company Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="" placeholder="Release Year" />
                                </div>
                                <div className="form-group">
                                    <textarea row="3" className="form-control" id="" placeholder="Episode Description"></textarea>
                                </div>
                            </form>
                        </div>
                    )}
                    {this.props.movie && (
                        <div className="col-sm-8">
                            <h5>Video Information</h5>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="" placeholder="Video Title" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="" placeholder="Director Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="" placeholder="Distributor" />
                                </div>
                                <div className="form-group">
                                    <input type="date" className="form-control" id="" placeholder="Release Year" />
                                </div>
                                <div className="form-group">
                                    <textarea row="3" className="form-control" id="" placeholder="Video Description"></textarea>
                                </div>
                            </form>
                        </div>
                    )}
                    <CoverArt title={this.props.coverTitle} />
                </div>
            </div>
        );
    }
});