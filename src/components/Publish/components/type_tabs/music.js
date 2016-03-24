import React from 'react';

import MetaInfo from '../artifact_modules/meta_information';
import Pricing from '../artifact_modules/pricing';
import Table from '../artifact_modules/table';
import PublishButton from '../artifact_modules/publish_button';

export
default React.createClass({
    onPublish(event){
        // Add link to publisher API here.
        console.log("Publish Button Clicked");
    },
    render() {
        return (
            <div className="publish-section information">
                <div className="row">
                    <MetaInfo music={true} coverTitle={"Cover Art"} />
                    <Pricing music={true} type={"Song"} desc={"Pick the price for your track and album, lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit distinctio doloribus maiores ducimus."} />
                    <Table files={[]} type={"audio"} />
                    <Table files={[]} type={"extra"} />
                    <PublishButton onClick={this.onPublish} desc={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam recusandae quae minima accusantium, tempora, sunt quia."} />
                </div>
            </div>
        );
    }
});