import React from 'react';

export
default React.createClass({
    render() {
        return (
            <div className="publish-section publish-submit">
                <div className="row">
                    <div className="col-sm-9">
                        <p className="small">{this.props.desc}</p>
                    </div>
                    <div className="col-sm-3 text-right">
                        <button onClick={this.props.onClick} className="btn btn-primary">Publish</button>
                    </div>
                </div>
            </div>
        );
    }
});