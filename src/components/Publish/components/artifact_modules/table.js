import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export
default React.createClass({

    getHeader() {
        switch (this.props.type) {
            case 'audio':
                return {
                    title: "Audio Tracks",
                    icon: "images/svg/media-16px-2_note-03.svg",
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
                    title: "Extra Files",
                    icon: "images/svg/files-16px_single-folded-content.svg",
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
            <div className="publish-section">
                <div className="publish-files extra-files">
                    <h5>
                        <object type="image/svg+xml" data={header.icon}/>
                        {header.title}
                    </h5>
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
                    <div className="upload-area">
                        <object data="images/svg/arrows-24px-glyph-2_file-upload-88.svg" type="image/svg+xml"/>
                    </div>
                </div>
            </div>
        );
    }
});