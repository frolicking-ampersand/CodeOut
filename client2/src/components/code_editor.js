//DEPENDENCIES
import React, { Component } from 'react';
import ReactAce from 'react-ace';
import brace from 'brace';

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
			codeResult: "You have not ran any code yet"
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
  	this.setState({mode: e.target.value});
  }

  increaseSize () {
  	let sizeIncreaser = this.state.fontSize;
  	console.log(sizeIncreaser)
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
				<div className="editor">
					<ReactAce
						value={this.state.currentVal}
						onChange={this.codeChange}
					  mode={this.state.mode}
					  theme={this.state.theme}
					  fontSize={this.state.fontSize}
					  width="700" />
				</div>
				Select Style:
				<select onChange={this.changeTheme} >
				  <option value="monokai"> Monokai </option>
				  <option value="github">Github</option>
				  <option value="tomorrow">Tomorrow</option>
				  <option value="kuroir">Kuroir</option>
				  <option value="twilight"> Twilight </option>
				  <option value="xcode"> Xcode </option>
				  <option value="textmate"> Textmate </option>
				  <option value="solarized_dark"> Solarized Dark </option>
				  <option value="solarized_light"> Solarized Light </option>
				  <option value="terminal"> Terminal </option>
				</select>
				<div>
				Select Language:
				<select onChange={this.changeLang} >
				  <option value="javascript"> Javascript </option>
				  <option value="java"> Java </option>
				  <option value="python"> Python </option>
				  <option value="xml"> XML </option>
				  <option value="ruby"> Ruby </option>
				  <option value="sass"> SASS </option>
				  <option value="markdown"> Markdown </option>
				  <option value="mysql"> MySQL </option>
				  <option value="json"> JSON </option>
				  <option value="html"> HTML </option>
				  <option value="handlebars"> Handlebars </option>
				  <option value="golang"> Golang </option>
				  <option value="csharp"> CSharp </option>
				  <option value="coffee"> Coffee </option>
				  <option value="css"> CSS </option>
				</select>
				<div>
				<button onClick={this.increaseSize}> Enhance </button>
				<button onClick={this.decreaseSize}> Dehance </button>
				<button onClick={this.evaluateCode}> Run Code </button>
				<div>
					<b> Result: </b> {this.state.codeResult}
				</div>
				</div>
				</div>
			</div>
		)
	}
}


