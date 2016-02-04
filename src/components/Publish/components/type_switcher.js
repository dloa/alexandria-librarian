import React from 'react';

export
default React.createClass({
    render() {
        return (
            <div className="publish-section artifact-type">
                <h5>Select Artifact type</h5> 
                    <ul className="nav nav-pills" role="tablist">
                        {
                            this.props.types.map((type, idx) => {
                                return (
                                    <li key={idx} onClick={this.props.handleChangeType.bind(this, type)} className={((this.props.selected === type.replace(/\s/g, '').toLowerCase()) ? 'active' : '')}>
                                        <a>{type}</a>
                                    </li>
                                    );
                            }, this)
                        }
                    </ul>
            </div>
        );
    }
});