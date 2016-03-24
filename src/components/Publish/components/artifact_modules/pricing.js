import React from 'react';

export
default React.createClass({
    render() {
        return (
            <div className="publish-section publish-pricing">
                <div className="row">
                    <div className="col-sm-10">
                        <p className="small">{this.props.desc}</p>
                    </div>
                </div>
                <div className="row">
                   <div className="col col-sm-6">
                        <h5>Price to Play {this.props.type}</h5>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-5 control-label">Suggested:</label>
                                <div className="col-sm-7">
                                    <div className="input-group">
                                        <div className="input-group-addon">$</div>
                                        <input type="text" className="form-control" id="" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-5 control-label">Minimum:</label>
                                <div className="col-sm-7">
                                    <div className="input-group">
                                        <div className="input-group-addon">$</div>
                                        <input type="text" className="form-control" id="" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                   <div className="col col-sm-6">
                        <h5>Price to Purchase {this.props.type}</h5>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-5 control-label">Suggested:</label>
                                <div className="col-sm-7">
                                    <div className="input-group">
                                        <div className="input-group-addon">$</div>
                                        <input type="text" className="form-control" id="" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-5 control-label">Minimum:</label>
                                <div className="col-sm-7">
                                    <div className="input-group">
                                        <div className="input-group-addon">$</div>
                                        <input type="text" className="form-control" id="" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {this.props.music && ( 
                    	<div>
		                   <div className="col col-sm-6">
		                        <h5>Price to Play Album</h5>
		                        <form className="form-horizontal">
		                            <div className="form-group">
		                                <label className="col-sm-5 control-label">Suggested:</label>
		                                <div className="col-sm-7">
		                                    <div className="input-group">
		                                        <div className="input-group-addon">$</div>
		                                        <input type="text" className="form-control" id="" placeholder="0.00" />
		                                    </div>
		                                </div>
		                            </div>
		                            <div className="form-group">
		                                <label className="col-sm-5 control-label">Minimum:</label>
		                                <div className="col-sm-7">
		                                    <div className="input-group">
		                                        <div className="input-group-addon">$</div>
		                                        <input type="text" className="form-control" id="" placeholder="0.00" />
		                                    </div>
		                                </div>
		                            </div>
		                        </form>
		                    </div>
		                   <div className="col col-sm-6">
		                        <h5>Price to Purchase Album</h5>
		                        <form className="form-horizontal">
		                            <div className="form-group">
		                                <label className="col-sm-5 control-label">Suggested:</label>
		                                <div className="col-sm-7">
		                                    <div className="input-group">
		                                        <div className="input-group-addon">$</div>
		                                        <input type="text" className="form-control" id="" placeholder="0.00" />
		                                    </div>
		                                </div>
		                            </div>
		                            <div className="form-group">
		                                <label className="col-sm-5 control-label">Minimum:</label>
		                                <div className="col-sm-7">
		                                    <div className="input-group">
		                                        <div className="input-group-addon">$</div>
		                                        <input type="text" className="form-control" id="" placeholder="0.00" />
		                                    </div>
		                                </div>
		                            </div>
		                        </form>
		                    </div>
                    	</div>
                    )}
               </div>     
            </div>
        );
    }
});