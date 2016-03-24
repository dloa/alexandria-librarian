import React from 'react';

export
default React.createClass({
    render() {
        return (
            <div class="section publish" id="publishAuth">
                <h4 class="title">Publisher Authentication</h4>
                
                <form class="important">
                    <p class="text-right">Mandatory</p>
                    <label for="">Florincoin address:</label>
                    <div class="form-inline">
                        <div class="form-group">
                            <select class="form-control" id="sel1">
                                <option>Artwork</option>
                                <option>Zip File</option>
                                <option>Thingy</option>
                                <option>Luigi was not here</option>
                            </select>
                        </div>
                        <button class="btn btn-default">Generate new</button>
                    </div>
                    <label for="">Publisher name:</label>
                    <div class="form-inline">
                        <div class="form-group">
                            <select class="form-control" id="sel1">
                                <option>Artwork</option>
                                <option>Zip File</option>
                                <option>Thingy</option>
                                <option>Luigi was not here</option>
                            </select>
                        </div>
                        <a onclick="createNewPublisherName()" class="btn btn-default">Create new</a>
                    </div>
                </form>
                
               <form class="optional">
                    <p class="text-right">Optional</p>
                    <div class="form-group">
                        <div class="form-inline">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Namespace URL"> </input>
                            </div>
                            <p>.alexandria.media</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="" placeholder="Email address"> </input>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="" placeholder="Bitmessage address"> </input>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="" placeholder="Bitcoin address"> </input>
                    </div>
                </form>
               <button onclick="" class="btn btn-primary btn-next">Continue to publish artifact</button>
            </div>
        );
    }
});