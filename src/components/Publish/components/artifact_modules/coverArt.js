import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export
default React.createClass({
    render() {
        return (
            <div className="col-sm-4">
                <h5>{this.props.title}</h5>
                <div className="cover-art">
                    <p>{this.props.title}</p>
                </div>
            </div>
        );
    }
});