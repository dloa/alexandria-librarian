import React from 'react';
import ReactDOM from 'react-dom';

import ipfsUtil from '../utils/daemons/ipfsUtil';
import utils from '../utils/util';


export
default React.createClass({
    getInitialState() {
        return {
            history: [],
            prompt: '$ '
        }
    },
    clearHistory() {
        this.setState({
            history: []
        });
    },
    showWelcomeMsg() {
        this.addHistory("type " + this.props.daemonname + " --help for available commands");
    },
    openLink(link) {

    },
    showHelp() {
        this.addHistory("command - commandinfo");
    },
    componentDidMount() {
        var term = this.refs.term;
        this.showWelcomeMsg();
    },
    componentDidUpdate() {
        var el = ReactDOM.findDOMNode(this);
        var container = document.getElementById("cli-emulator");
        container.scrollTop = el.scrollHeight;
    },
    handleInput(e) {
        if (e.key === "Enter") {
            var input_text = this.refs.term.value;
            var input_array = input_text.split(' ');

            this.addHistory(this.state.prompt + " " + input_text);
            input_array.shift();

            utils.exec([this.props.daemonbin].concat(input_array))
                .then(this.addHistory)
                .catch(this.addHistory)


            this.clearInput();
        }
    },
    clearInput() {
        this.refs.term.value = "";
    },
    addHistory(output) {
        var history = this.state.history;
        history.push(output)
        this.setState({
            'history': history
        });
    },
    handleClick() {
        this.refs.term.focus();
    },
    render() {
        var output = this.state.history.map(function(op, i) {
            return <p key={i} >{op}</p>;
        });
        return (
            <section>
                <div id="cli-emulator" className="cli-emulator">
                    <div className='input-area' onClick={this.handleClick}>
                        {output}
                        <p>
                            <span className="prompt">{this.state.prompt}</span> 
                            <input type="text" onKeyPress={this.handleInput} ref="term" />
                        </p>
                    </div>
                </div>
            </section>
        )
    }
});