import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import axios from 'axios';
import InputColor from 'react-input-color';
import brace from 'brace';
import { Col } from 'react-bootstrap';
import Login from '../src/components/auth/login'
import auth from '../src/components/auth/auth-helper'
import Navbar from '../src/components/code-editor/code_editor_navbar';

const Webcams = require('../src/components/webcams/webcams.js').default;
describe('Webcams', () => {
  it('should exist', () => {
    var webcams = TestUtils.renderIntoDocument( <Webcams /> );
    expect(TestUtils.isCompositeComponent(webcams)).toBeTruthy();
  });
});

const WebcamBar = require('../src/components/webcams/webcam-bar.js').default;
describe('WebcamBar', () => {
  it('should exist', () => {
    var webcambar = TestUtils.renderIntoDocument( <WebcamBar /> );
    expect(TestUtils.isCompositeComponent(webcambar)).toBeTruthy();
  });
});

const CodeEditor = require('../src/components/code-editor/code_editor.js').default

describe('CodeEditor', () => {
  it('should exist', () => {
    var codeeditor = TestUtils.renderIntoDocument( <CodeEditor /> );
    expect(TestUtils.isCompositeComponent(codeeditor)).toBeTruthy();
    CodeEditor.prototype.increaseSize = jest.genMockFunction();
    const myCodeEditorCompNode = ReactDOM.findDOMNode(codeeditor);
    expect(CodeEditor.prototype.increaseSize).not.toBeCalled();
    TestUtils.Simulate.click(myCodeEditorCompNode);
    expect(CodeEditor.prototype.increaseSize).toBeCalled()
  });

  // it('calls increaseSize on click', () => {
  //   CodeEditor.prototype.increaseSize = jest.genMockFunction();
  //   const myCodeEditorComp = TestUtils.renderIntoDocument(
  //     <CodeEditor />
  //   );

  //   const myCodeEditorCompNode = ReactDOM.findDOMNode(myCodeEditorComp);
  //   expect(CodeEditor.prototype.increaseSize).not.toBeCalled();
  //   TestUtils.Simulate.click(myCodeEditorCompNode);
  //   expect(CodeEditor.prototype.increaseSize).toBeCalled()
  // });
});

const SearchBar = require('../src/components/video/components/search_bar.js').default;
describe('SearchBar', () => {
  it('should exist', () => {
    var searchbar = TestUtils.renderIntoDocument( <SearchBar /> );
    expect(TestUtils.isCompositeComponent(searchbar)).toBeTruthy();
  });
});







