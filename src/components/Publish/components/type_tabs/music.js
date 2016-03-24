import React from 'react';

import MetaInfo from '../artifact_modules/meta_information';
import Pricing from '../artifact_modules/pricing';

export
default React.createClass({
    render() {
        return (
            <div className="publish-section information">
                <div className="row">
                    <MetaInfo music={true} coverTitle={"Cover Art"} />
                    <Pricing music={true} type={"Song"} desc={"Pick the price for your track and album, lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit distinctio doloribus maiores ducimus."} />
                </div>
            </div>
        );
    }
});