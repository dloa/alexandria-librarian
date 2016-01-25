import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';
import ProgressComponent from './progress';

import DaemonStore from '../../../stores/daemonEngineStore';
import DaemonActions from '../../../actions/daemonEngineActions';

let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            active: this.props.active ? true : false,
            enabled: DaemonStore.getState().enabled.florincoind || false,
            initStats: DaemonStore.getState().enabling.florincoind || {
                code: 0,
                task: false,
                percent: false
            },
        };
    },

    componentWillMount() {
        DaemonStore.listen(this.update);

    },

    componentWillUnmount() {
        DaemonStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                enabled: DaemonStore.getState().enabled.florincoind || false,
                initStats: DaemonStore.getState().enabling.florincoind || {
                    code: 0,
                    task: false,
                    percent: false
                },
            });
        }
    },

    enableStats() {
        if (this.state.initStats.task && this.state.initStats.percent)
            return {
                task: this.state.initStats.task,
                percent: this.state.initStats.percent
            };

        switch (this.state.initStats.code) {
            case 0:
            case 1:
                return {
                    task: 'Verifying Installation...',
                    percent: 0
                };
                break;
            case 2:
                return {
                    task: 'Installing...',
                    percent: 30
                };
                break;
            case 3:
                return {
                    task: 'Installing...',
                    percent: 60
                };
                break;
            case 4:
                return {
                    task: 'Initializing...',
                    percent: 90
                };
                break;
            case 7:
                return {
                    task: 'Enabled',
                    percent: 100
                };
                break;
            case 8:
                return {
                    task: 'Error',
                    percent: 100
                };
                break;
        }
    },

    handleChangeEnable() {
        if (this.state.initStats.code === 8)
            return DaemonActions.florincoind('enable');

        if (this.state.initStats.code >= 6 || this.state.initStats.code === 0) {
            DaemonActions.florincoind(this.state.enabled ? 'disable' : 'enable')
        }
    },

    render() {
        let progressInfo = this.enableStats();
        return (
            <div className={'section ipfs ' + (this.state.active? 'active' : '')}>
                <div className="clearfix">
                    <div className="pull-left">
                        <h4 className="title">Florincoin</h4>
                    </div>
                    <div className="pull-right">
                        <input onChange={this.handleChangeEnable}  type="checkbox" id="florincoin-toggle" className="toggle hidden" checked={(this.state.enabled && this.state.initStats.code >= 6)}/>
                        <label htmlFor="florincoin-toggle" className="lbl"></label>   
                    </div>
                    <If test={(this.state.initStats.code !== 0 && this.state.initStats.code !== 6 && this.state.initStats.code !== 7)}>
                        <div className="pull-right enabling">
                            <span className={(this.state.initStats.code === 8) ? 'label label-danger' : 'label label-default-flash'}>{(this.state.initStats.code === 8) ? this.state.initStats.error : 'Enabling ...'}</span>
                        </div>
                    </If>
                </div>
                <If test={(this.state.initStats.code !== 0 && this.state.initStats.code !== 7 && this.state.initStats.code !== 8)}>
                    <ProgressComponent task={progressInfo.task} percent={progressInfo.percent} />
                </If>
                <If test={!this.state.active}>
                    <div className="detail">
                        <p>Florincoin is free software with an open ledger of transaction history known as the block chain. 
                        Florincoin extends the Bitcoin codebase and stores additional information on the network.</p>
                    </div>
                </If>
            </div>
        );
    }
});