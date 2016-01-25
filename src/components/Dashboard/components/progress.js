import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export
default React.createClass({

        mixins: [PureRenderMixin],

        render() {
            return (
                    <div className="progress-container">
                <div className="row">
                    <div className="col col-sm-6">
                        <p>{this.props.task}</p>
                    </div>
                    <div className="col col-sm-6">
                        <div className="progress">
                            <div className="progress-bar -info" role="progressbar" aria-valuenow={this.props.percent} aria-valuemin="0" aria-valuemax="100" style={{width: this.props.percent + '%'}}>
                                <span className="sr-only">{this.props.percent}% Complete</span>
                            </div>
                        </div>
                    </div>
                </div> < /div>
        );
    }
});