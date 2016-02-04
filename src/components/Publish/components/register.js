import React from 'react';

export
default React.createClass({
    render() {
        return (
            <div className="section publish register-publisher" id="registerPublisher">
                <h4 className="title">Register New Publisher Address</h4>
                <form className="important">
                    <p className="text-right">Mandatory</p>
                    <label htmlFor="">Publisher name:</label>
                    <div className="form-inline">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="New Publisher Name"/>
                        </div>
                        <button className="btn btn-default">Create</button>
                    </div>
                    <label htmlFor="">Florincoin address:</label>
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
                </form>
                <form className="optional">
                    <p className="text-right">Optional</p>
                    <div className="form-group">
                        <div className="form-inline">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Namespace URL"/>
                            </div>
                            <p>.alexandria.media</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="" placeholder="Email address"/>
                        <span className="help-block">Your email address will not be stored anywhere. If you provide it, a hash of it will be generated and attached to your publisher to connect it with your <a href="https://secure.gravatar.com/">Gravatar</a> profile</span>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="" placeholder="Bitmessage address"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="" placeholder="Bitcoin address"/>
                    </div>
                </form>
                <button className="btn btn-primary btn-next">Go</button>
            </div>
        );
    }
});