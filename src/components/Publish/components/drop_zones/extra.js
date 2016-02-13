import React from 'react';

export
default React.createClass({
    render() {
        return (
            <div className="publish-section">
                <div className="publish-files extra-files">
                    <h5>
                        <object type="image/svg+xml" data="assets/svg/files-16px_single-folded-content.svg"/>
                        Extra Files
                    </h5>
                    <div className="upload-area">
                        <object data="assets/svg/arrows-24px-glyph-2_file-upload-88.svg" type="image/svg+xml"/>
                    </div>
                </div>
            </div>
        );
    }
});