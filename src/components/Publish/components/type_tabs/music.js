import React from 'react';

import CoverArt from '../coverArt';

export
default React.createClass({
    render() {
        return (
            <div className="publish-section information">
                <div className="row">
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
                    <CoverArt/>
                </div>
            </div>
        );
    }
});