//DEPENDENCIES
import React, { Component, PropTypes } from 'react';
import ReactAce from 'react-ace';
import brace from 'brace';
import Navbar from './code_editor_navbar';
import { Col } from 'react-bootstrap';
import Webcams from './webcam-bar';
import auth from "../auth-helper";
import Login from "./login";

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
      theme: 'twilight',
      loggedIn: auth.loggedIn(),
      selected: "",
      fontSize: 14,
      mode: "javascript",
      currentVal: "//Code with friends!",
      codeResult: "You have not ran any code yet",
      index: 0
    }
    this.changeTheme = this.changeTheme.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.increaseSize = this.increaseSize.bind(this);
    this.decreaseSize = this.decreaseSize.bind(this);
    this.codeChange = this.codeChange.bind(this);
    this.evaluateCode = this.evaluateCode.bind(this);
    this.findToyProblem = this.findToyProblem.bind(this);
    this.findSolution = this.findSolution.bind(this);
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('write code', function (data) {
      this.setState({currentVal: data.currentVal});
    }.bind(this));

    this.socket.on('receiveCodeProblem', function (data) {
      this.setState({currentVal: data.currentVal})
    }.bind(this));

    this.socket.on('receiveAnswer', function (data) {
      console.log(data);
      this.setState({currentVal: data.currentVal});
    }.bind(this));
  }

  codeChange (val) {
    this.setState({currentVal: val});
    this.socket.emit('type', { currentVal: val});
  }

  changeTheme (e) {
    this.setState({theme: e.target.value});
  }

  changeLang (e) {
    this.setState({mode: e.target.value});
  }

  increaseSize () {
    let sizeIncreaser = this.state.fontSize;
    this.setState({fontSize: sizeIncreaser + 2});
  }

  decreaseSize () {
    let sizeDecreaser = this.state.fontSize;
    this.setState({fontSize: sizeDecreaser - 2});
  }

  findToyProblem () {
    const toyProblems = ["/*\nInvert a binary tree.\n\n     4\n   /   \\ \n  2     7 \n / \\   / \\  \n1   3 6   9 \n\nto\n\n     4\n   /   \\ \n  7     2\n / \\   / \\ \n9   6 3   1\n\nDefinition for a binary tree node.\n\nfunction TreeNode(val) {\n     this.val = val;\n     this.left = this.right = null;\n }\n */\n\nvar invertTree = function(root) {\n\n};",
                        "/*\nReverse a singly linked list.\n\nDefinition for singly-linked list.\nfunction ListNode(val) {\n     this.val = val;\n     this.next = null;\n }\n*/ \n\nvar reverseList = function(head) { \n\n};",
                        "/*\nGiven a linked list, determine if it has a cycle in it.\n\nFollow up:\nCan you solve it without using extra space? \n\nDefinition for singly-linked list. \nfunction ListNode(val) {\n     this.val = val;\n     this.next = null;\n}\n*/ \n\nvar hasCycle = function(head) {\n\n};",
                        "/*\nGiven two binary trees, write a function to check if they are equal or not.\nTwo binary trees are considered equal if they are structurally identical and the nodes have the same value.\n\nDefinition for a binary tree node. \n\nfunction TreeNode(val) {\n     this.val = val;\n     this.left = this.right = null; \n }*/\n\nvar isSameTree = function(p, q) {\n\n};",
                        "/*\nGiven a binary tree, find its maximum depth. \nThe maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node. \nDefinition for a binary tree node. \n\nfunction TreeNode(val) {\n     this.val = val;\n     this.left = this.right = null;\n }*/\n\nvar maxDepth = function(root) {\n\n};"
                        ]

    let randomNum = Math.floor(Math.random() * toyProblems.length);
    this.socket.emit('sendCodeProblem', { currentVal: toyProblems[randomNum]});
    this.setState({currentVal: toyProblems[randomNum],
                   currentIndex: randomNum
    });
  }


  findSolution () {
    const answers = ["/*\nInvert a binary tree.\n\n     4\n   /   \\ \n  2     7 \n / \\   / \\  \n1   3 6   9 \n\nto\n\n     4\n   /   \\ \n  7     2\n / \\   / \\ \n9   6 3   1\n\nDefinition for a binary tree node.\n\nfunction TreeNode(val) {\n     this.val = val;\n     this.left = this.right = null;\n }\n */\n\nvar invertTree = function(root){ \n    //if there is no root, return out of the function, this will be the base case.\n    if(!root) return null;\n    //set a temp variable to the left pointer of the root so we will have access to it later\n    var temp = root.left;\n    //switch the number of the left to the right\n    root.left = root.right;\n    //switch the number of the right to the left\n    root.right = temp;\n    //call a the function recursively on each side of the tree\n    invertTree(root.left);\n    invertTree(root.right);\n    //return the tree at the end...\n    return root;\n};",
                     "/*\nReverse a singly linked list.\n\nDefinition for singly-linked list.\nfunction ListNode(val) {\n     this.val = val;\n     this.next = null;\n }\n*/ \n\nvar reverseList = function(head) {\n  //set the head as a the default node\n  var node = head;\n  //have it point to null, because the last pointer in the list points to null\n  var previous = null;\n  //while there is a node..\n  while (node) {\n    //save the next node in a temp variable, so we will have access to it later.\n    var temp = node.next;\n    //point node's next pointer to the previous node\n    node.next = previous;\n    //set the previous to the current node\n    previous = node;\n    //set the current node to the one after it.\n    node = temp;\n  }\n  return previous;\n};",
                     "/*\nGiven a linked list, determine if it has a cycle in it.\n\nFollow up:\nCan you solve it without using extra space? \n\nDefinition for singly-linked list. \nfunction ListNode(val) {\n     this.val = val;\n     this.next = null;\n}*/ \n\nvar hasCycle = function(head) {\n //if there is nothing in the list, run false because there is no cycle\n  if(!head) return false\n  var slow = head;\n  var fast = head;\n  var pause = true\n  //while there is a next value\n  while(fast = fast.next) {\n    //check if the two are the same... and if they are return true\n    if (fast === slow) { return true; }\n    //flip the pause so the slow goes every other cycle\n    slow = pause ? slow : slow.next;\n    pause = !pause;\n  }\n  //if we go all the way through and there is no time the two nodes touch, if must not have an infinite loop\n  return false;\n};",
                     "/*\nGiven two binary trees, write a function to check if they are equal or not.\nTwo binary trees are considered equal if they are structurally identical and the nodes have the same value.\n\nDefinition for a binary tree node. \n\nfunction TreeNode(val) {\n     this.val = val;\n     this.left = this.right = null; \n }*/\n\nvar isSameTree = function(p, q) {\n//if there is nothing left in the tree, return true, this is the base case in recursion\n  if (!p && !q) return true;\n  //if there isn't a p or a q, we know it is not the same tree, also if the values\n  // do not match, it can't be the same tree\n  if (!p || !q || p.val !== q.val) return false;\n  //run the function recursivly, to check both sides of the tree\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n};",
                     "/*\nGiven a binary tree, find its maximum depth. \nThe maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node. \nDefinition for a binary tree node. \n\nfunction TreeNode(val) {\n     this.val = val;\n     this.left = this.right = null;\n } \n */\n\nvar maxDepth = function(root) {\n  //create a base case for the recursive function, saying if there is no root, return 0\n  if(root === null) return 0;\n\n  //call our function over again on the left and right side of the root, while adding one each time.\n  //Use Math.max to get the larger of the two sides.\n  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;\n};",
                    ]
    let solution = answers[this.state.currentIndex]
    this.socket.emit('getAnswer', { currentVal: solution});
    this.setState({currentVal: solution});
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
      {this.state.loggedIn ? (
      <div>
        <div>
          <Webcams />
          <Navbar
            changeLang={mode => this.setState({mode})}
            changeTheme={theme => this.setState({theme})}
            increaseSize={this.increaseSize}
            decreaseSize={this.decreaseSize}
            evaluateCode={this.evaluateCode}
            findToyProblem={this.findToyProblem}
            findSolution={this.findSolution}
            logout={this.logout}
          />

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
        ) : (
          <div>
          <Login />
          </div>
        )}
      </div>
    )
  }
}


