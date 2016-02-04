import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export
default React.createClass({
    render() {
        return (
            <div className="col-sm-4">
                <h5>Cover Art</h5>
                <div className="cover-art">
                    <p>Cover art</p>
                </div>
            </div>
        );
    }
});