import React from 'react';
import path from 'path';
import _ from 'lodash';
import shell from 'shell';
import PinActions from './actions';
import PinStore from './store';


export
default class extends React.Component {
    constructor() {
        super();

        this.state = PinStore.getState();
        this._update = this._update.bind(this);
        this._generatePined = this._generatePined.bind(this);
    }

    componentWillMount() {
        PinStore.listen(this._update);
    }

    componentDidMount() {
        if (!this.state.loadedDB) {
            this.setState({
                loadedDB: true
            });
            PinActions.loadLocalDB();
        }
    }

    componentWillUnmount() {
        PinStore.unlisten(this._update);
    }

    _update() {
        this.setState(PinStore.getState());
    }

    _openURL(event) {
        shell.openExternal(event.target.getAttribute('data-url'));
    }

    _handelPin() {
        PinActions.pinURL(this.refs['pin-hash'].value);
    }

    _generatePinRow(file) {
        return (
            <tr key={file.hash}>
                <td>{file.name}</td>
                <td onClick={this._openURL} data-url={('http://localhost:8080/ipfs/'+file.hash)} className="hash-link">{file.hash}</td>
                <td>{file.size}</td>
                <td></td>
                <td className="unpin">
                    <a href="" className="svg btn">
                        <object type="image/svg+xml" data="images/svg/location-16px-e_pin-remove.svg"/>
                    </a>
                </td>
            </tr>
        );
    }

    _generatePined() {
        let pinned = []
        _.forEach(this.state.pinned, file => pinned.push(this._generatePinRow(file)));
        return pinned;
    }

    render() {
        return (
            <div className="section ipfs">
                <form onSubmit={this._handelPin} className="form-inline">
                    <button onClick={PinActions.pinLocal} type="button" className="btn btn-default">Browse local</button>
                    <p className="margin">or</p>
                    <div className="form-group pull-right">
                        <input ref="pin-hash" type="text" className="form-control ipfs" id="" placeholder="Enter Local Path, IPFS hash or URL"/>
                        <button type="submit" className="btn btn-primary btn-pin-file">Pin file</button>
                    </div>
                </form>
                
                <table className="table pinned-files">
                    <thead>
                        <tr>
                            <th>File name</th>
                            <th>Hash</th>
                            <th>File size</th>
                            <th>Seeds</th>
                            <th>Unpin</th>
                        </tr>
                    </thead>

                    <colgroup>
                        <col className=""/>
                        <col className=""/>
                        <col className=""/>
                        <col className=""/>
                        <col className="col-sm-1"/>
                    </colgroup>
                    <tbody>
                        {this._generatePined()}
                    </tbody>
                </table>
            </div>
        );
    }
};