//DEPENDENCIES
import React, { Component, PropTypes } from 'react';
import ReactAce from 'react-ace';
import brace from 'brace';
import Navbar from './code_editor_navbar';
import { Col } from 'react-bootstrap';

//LANGUAGES
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/xml';
import 'brace/mode/ruby';
import 'brace/mode/sass';
import 'brace/mode/markdown';
import 'brace/mode/mysql';
import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/mode/handlebars';
import 'brace/mode/golang';
import 'brace/mode/csharp';
import 'brace/mode/coffee';
import 'brace/mode/css';

//STYLES
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';

export default class CodeEditor extends Component {
	constructor(props){
		super(props);
		this.state = {
			theme: 'monokai',
			selected: "",
			fontSize: 14,
			mode: "javascript",
			currentVal: "Welcome to Hangouts Code Editor by Greg, Benny, Nikola and Ian",
			codeResult: "You have not ran any code yet",
		}
		this.changeTheme = this.changeTheme.bind(this);
		this.changeLang = this.changeLang.bind(this);
		this.increaseSize = this.increaseSize.bind(this);
		this.decreaseSize = this.decreaseSize.bind(this);
		this.codeChange = this.codeChange.bind(this);
		this.evaluateCode = this.evaluateCode.bind(this);
	}

	codeChange (val) {
		this.setState({currentVal: val});
	}

	changeTheme (e) {
    this.setState({theme: e.target.value});
  }

  changeLang (e) {
    console.log('IN CHANGELANG');
  	this.setState({mode: e.target.value});
  }

  increaseSize () {
  	let sizeIncreaser = this.state.fontSize;
  	console.log(sizeIncreaser);
  	this.setState({fontSize: sizeIncreaser + 2});
  }

  decreaseSize () {
  	let sizeDecreaser = this.state.fontSize;
  	this.setState({fontSize: sizeDecreaser - 2});
  }

  evaluateCode (val) {
  	try {
	    let answer = eval(this.state.currentVal)
	    this.setState({codeResult: answer})
		}
		catch(err) {
			this.setState({codeResult: err.message})
		}
  }

	render() {
		return (
			<div>
        <div>
          <Navbar 
            changeLang={mode => this.setState({mode})}
            changeTheme={theme => this.setState({theme})}
            increaseSize={this.increaseSize}
            decreaseSize={this.decreaseSize}
            evaluateCode={this.evaluateCode} />
        </div>
				<Col xs={12} md={8} className="editor">
					<ReactAce
						value={this.state.currentVal}
						onChange={this.codeChange}
					  mode={this.state.mode}
					  theme={this.state.theme}
					  fontSize={this.state.fontSize}
            width="100%"
            height="800px" 
            float="inline" />
				</Col>
				<Col xs={6} md={4}>
					<b> Result: </b> {this.state.codeResult}
				</Col>
			</div>
		)
	}
}


