import React from 'react';

export
default React.createClass({
    render() {
        return (
            <div className="publish-section register-publisher">
                <form className="important">
                    <label htmlFor="">Publisher name:</label>
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control" id="sel1">
                                <option>Artwork</option>
                                <option>Zip File</option>
                                <option>Thingy</option>
                                <option>Luigi was not here</option>
                            </select>
                        </div>
                        <a className="btn btn-default">Create new</a>
                    </div>
                </form>
            </div>
        );
    }
});