import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Dropzone from 'react-dropzone';

export
default React.createClass({
    artworkDrop(files) {
        console.log(files);
        base64encoder(path.normalize(files[0].path), {
             localFile: true,
            string: true
        }, (err, image) => {
           if (err)
                return console.log(err);
            this.setState({
                files: ReactUpdate(this.state.files, {
                    artwork: {
                        $set: 'data:' + files[0].type + ';base64,' + image
                    }
                })
            });
        });
    },
    render() {
        //this.state.files.artwork
        return (
            <div className="col-sm-4">
                <h5>{this.props.title}</h5>
                <Dropzone className="cover-art" activeClassName="cover-art-active" onDrop={this.artworkDrop} style={{backgroundImage: false ? 'url(' + this.state.files.artwork + ')' : ''}}>
                    <p><object data="images/svg/arrows-24px-glyph-2_file-upload-88.svg" type="image/svg+xml"/></p>
                </Dropzone>
            </div>
        );
    }
});