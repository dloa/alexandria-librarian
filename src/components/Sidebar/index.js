import React from 'react';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    History
}
from 'react-router';


export
default React.createClass({

    mixins: [PureRenderMixin, History],

    getInitialState() {
        return {
            active: '/',
            tabs: [{
                name: 'Dashboard',
                path: '/'
            }, {
                name: 'Publish',
                path: 'publish/dashboard'
            }, {
                name: 'Preferences',
                path: 'preferences'
            }, {
                name: 'IPFS',
                path: 'management/ipfs'
            }, {
                name: 'About',
                path: 'about'
            }]
        };
    },
    markActive(tab, event) {
        this.setState({
            active: tab
        });
        _.defer(this.history.replaceState.bind(this, null, tab));
    },
    render() {
        return (
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="">
                        <object type="image/svg+xml" data="images/svg/logo-text.svg" className="logo"></object>
                    </a>
                </li>
                {
                    this.state.tabs.map((tab, idx) => {
                        return (
                            <li key={idx} onClick={this.markActive.bind(this, tab.path)} className={(this.state.active === tab.path) ? 'active' : ''}>
                                <a href="">{tab.name}</a>
                            </li>
                            );
                    }, this)
                }
            </ul>
        );
    }
});