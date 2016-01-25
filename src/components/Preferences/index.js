import React from 'react';
import _ from 'lodash';
import remote from 'remote';

import PreferencesStore from './store';
import PreferencesActions from './actions';


export
default class extends React.Component {
    constructor() {
        super();

        this.state = PreferencesStore.getState().settings;

        this._update = this._update.bind(this);
        this._handleToggleMinimizeToTray = this._handleToggleMinimizeToTray.bind(this);
        this._handleToggleHTTPAPI = this._handleToggleHTTPAPI.bind(this);
        this._handleChangeHTTPAPIPort = _.throttle(this._handleChangeHTTPAPIPort, 400);
    }

    componentWillMount() {
        PreferencesStore.listen(this._update);
    }

    componentWillUnmount() {
        PreferencesStore.unlisten(this._update);
    }

    _update() {
        this.setState(PreferencesStore.getState().settings);
    }

    _openURL(event) {
        shell.openExternal(event.target.getAttribute('data-url'));
    }

    _handleToggleMinimizeToTray() {
        PreferencesActions.changed({
            setting: 'minimizeToTray',
            value: !this.state.minimizeToTray
        });
    }

    _handleChangeHTTPAPIPort(event) {
        if (!event.target.value > 0)
            return false;
        PreferencesActions.changed({
            setting: 'httpAPI:port',
            value: event.target.value
        });
    }

    _handleToggleHTTPAPI() {
        PreferencesActions.changed({
            setting: 'httpAPI:active',
            value: !this.state.httpAPI.active
        });
    }

    _handleOpenDevTools() {
        remote.getCurrentWindow().toggleDevTools();
    }

    render() {
        return (
            <div className="section preferences">
                <div className="settings-section">
                    <h4 className="title">General</h4>
                    <div className="settings-toggle clearfix">
                        <div className="pull-left">
                            <input type="checkbox" id="login" className="toggle hidden" checked={this.state.startOnLogin}/>
                            <label htmlFor="login" className="lbl"/>
                        </div>
                        <div className="pull-left">
                            <p>Start Alexandria Librarian on login</p>
                        </div>
                    </div>
                    <div className="settings-toggle clearfix">
                        <div className="pull-left">
                            <input type="checkbox" id="ToggleMinimizeToTray" className="toggle hidden" onChange={this._handleToggleMinimizeToTray} checked={this.state.minimizeToTray}/>
                            <label htmlFor="ToggleMinimizeToTray" className="lbl"/> 
                        </div>
                        <div className="pull-left">
                            <p>Start in tray</p>
                        </div>
                    </div>
                </div>
                <div className="settings-section">
                    <h4 className="title">Web Interface</h4>
                    <div className="settings-toggle clearfix">
                        <div className="pull-left">
                            <input type="checkbox" id="httpapi" className="toggle hidden" onChange={this._handleToggleHTTPAPI} checked={this.state.httpAPI.active} />
                            <label htmlFor="httpapi" className="lbl"/>
                        </div>
                        <div className="pull-left">
                            <p>Enable HTTP API</p>
                        </div>
                    </div>
                    <form className="form-inline">
                        <div className="form-group">
                            <p>Port:</p>
                            <input type="number" min="0" step="1" onChange={this._handleChangeHTTPAPIPort} className="form-control port" defaultValue={this.state.httpAPI.port}/>
                        </div>
                    </form>
                </div>
                <div className="settings-section">
                    <h4 className="title">Florincoind Credentials</h4>
                    <form className="form-inline">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Password"/>
                        </div>
                        <button className="btn btn-primary">Save</button>
                    </form>
                </div>
                <div className="settings-section">
                    <h4 className="title">Other</h4>
                    <p>
                        <button onClick={PreferencesActions.reset} className="btn btn-default">Reset Settings</button>
                    </p>
                    <p>
                        <button className="btn btn-default">Uninstall All Daemons</button>
                    </p>
                    <p>
                        <button className="btn btn-default">Uninstall & Reset Settings (dev)</button>
                    </p>
                    <p>
                        <button onClick={this._handleOpenDevTools} className="btn btn-default">Open Dev tools</button>
                    </p>
                </div>
            </div>
        );
    }
}