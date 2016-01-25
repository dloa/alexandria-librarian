import React from 'react';
import shell from 'shell';
import _ from 'lodash';

import AboutStore from './store';
import AboutActions from './actions';


export
default class extends React.Component {
    constructor() {
        super();

        this.state = AboutStore.getState();

        this._update = this._update.bind(this);
    }

    componentWillMount() {
        AboutStore.listen(this._update);
    }

    componentDidMount() {
        if (!this.state.requestedInfo) {
            this.setState({
                requestedInfo: true
            });
            _.defer(() => {
                AboutActions.getContributors();
                AboutActions.getLicense();
                AboutActions.getVersion();
            });
        }
    }

    componentWillUnmount() {
        AboutStore.unlisten(this._update);
    }

    _update() {
        this.setState({
            appInfo: AboutStore.getState().appInfo,
            contributors: AboutStore.getState().contributors,
            license: AboutStore.getState().license,
            requestedInfo: AboutStore.getState().requestedInfo
        });
    }

    _openURL(event) {
        shell.openExternal(event.target.getAttribute('data-url'));
    }

    render() {
        return (
            <div className="col-lg-12">
                <div className="section about">
                    <h4 className="title">About</h4>
                    <p>ΛLΞXΛNDRIΛ Librarian v{this.state.appInfo.version} - "{this.state.appInfo.releaseName}"</p>
                    <p>This is a prototype developer build, and is not representative of the final product.</p>
                </div>
                <div className="section about contributors">
                    <h4 className="title">Contributors</h4>
                    {
                        this.state.contributors.map((Contributor, i) => {
                            return (
                                    <p key={i}>
                                        <a onClick={this._openURL} data-url={Contributor.url} href="" className="svg btn btn-github">
                                            <object type="image/svg+xml" data="images/svg/social-16px_logo-github.svg"/>
                                        </a>
                                        {Contributor.name} <span className="muted">{Contributor.email}</span>
                                    </p>
                                );
                            }, this)
                    }
                </div>
                <div className="section about license">
                    <h4 className="title">License</h4>
                    <div className="well license">
                       {this.state.license}
                    </div>
                </div>
            </div>
        );
    }
}