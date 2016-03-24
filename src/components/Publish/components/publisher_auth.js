import React from 'react';

export
default React.createClass({
    onContinue(event){
        console.log("test")
        this.props.continue();
    },
    render() {
        return (
            <div className="section publish" id="publishAuth">
                <h4 className="title">Publisher Authentication</h4>
                
                <form className="important">
                    <p className="text-right">Mandatory</p>
                    <label>Florincoin address:</label>
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control" id="sel1">
                                <option>Artwork</option>
                                <option>Zip File</option>
                                <option>Thingy</option>
                                <option>Luigi was not here</option>
                            </select>
                        </div>
                        <button className="btn btn-default">Generate new</button>
                    </div>
                    <label>Publisher name:</label>
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control" id="sel1">
                                <option>Artwork</option>
                                <option>Zip File</option>
                                <option>Thingy</option>
                                <option>Luigi was not here</option>
                            </select>
                        </div>
                        <a onclick="createNewPublisherName()" className="btn btn-default">Create new</a>
                    </div>
                </form>
                
               <form className="optional">
                    <p className="text-right">Optional</p>
                    <div className="form-group">
                        <div className="form-inline">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Namespace URL"></input>
                            </div>
                            <p>.alexandria.media</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="" placeholder="Email address"></input>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="" placeholder="Bitmessage address"></input>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="" placeholder="Bitcoin address"></input>
                    </div>
                </form>
               <button onClick={this.onContinue} className="btn btn-primary btn-next">Continue to publish artifact</button>
            </div>
        );
    }
});