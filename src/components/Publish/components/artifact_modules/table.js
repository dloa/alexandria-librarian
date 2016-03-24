import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export
default React.createClass({

    getHeader() {
        switch (this.props.type) {
            case 'audio':
                return {
                    thead: (
                        <tr>
                            <th>File</th>
                            <th>File Name</th>
                            <th>File Size</th>
                            <th>Duration</th>
                            <th>Track</th>
                            <th>Display name</th>
                        </tr>
                    ),
                    colgroup: (
                        <colgroup>
                            <col className=""/>
                            <col className=""/>
                            <col style={{width: '75px'}}/>
                            <col style={{width: '75px'}}/>
                            <col style={{width: '75px'}}/>
                            <col className=""/>
                        </colgroup>
                    )
                }
                break;
            case 'extra':
                return {
                    thead: (
                        <tr>
                            <th>File</th>
                            <th>File Name</th>
                            <th>File Size</th>
                            <th>Display name</th>
                        </tr>
                    ),
                    colgroup: (
                        <colgroup>
                            <col className=""/>
                            <col className=""/>
                            <col style={{width: '75px'}}/>
                            <col className=""/>
                        </colgroup>
                    )
                }
                break;
        }
    },


    setFile(event) {

    },

    generateFile(file, idx) {
        switch (this.props.type) {
            case 'audio':
                return (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{file.name}</td>
                        <td>{file.size}</td>
                        <td>{file.duration} min</td>
                        <td><input onChange={this.setFile} type="text" className="form-control" defaultValue={file.track}/></td>
                        <td><input onChange={this.setFile} type="text" className="form-control" defaultValue={file.title}/></td>
                    </tr>
                );
                break;
            case 'extra':
                return (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{file.name}</td>
                        <td>{file.size}</td>
                        <td><input onChange={this.setFile} type="text" className="form-control" defaultValue={file.name}/></td>
                    </tr>
                );
                break;
        }

    },

    render(header = this.getHeader()) {
        return (
            <table className="table">
                {header.colgroup}
                <thead>
                    {header.thead}
                </thead>
                <tbody>
                    {
                        this.props.files.map((file, idx) => {
                            return this.generateFile(file, idx)
                        })
                    }
                </tbody>
            </table>
        );
    }
});