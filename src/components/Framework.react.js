import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    RouteContext
}
from 'react-router'; 
import HTTPAPI from '../utils/httpAPIUtil'; 
import Sidebar from './Sidebar';

@PureRenderMixin
@RouteContext
class Framework extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        new HTTPAPI();
    }

    render() {
        return (
            <div>
                <div id="sidebar">
                    <Sidebar />
                </div>
                <div id="content" className="dashboard">
                    <div className="container-fluid">
                        <div className="row">
                            {React.cloneElement(this.props.children, {query: this.props.query})}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


export
default Framework;