/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var Card = React.createClass({
	  displayName: "Card",

	  handleClick: function handleClick(author, status, assignedTo) {
	    alert("Author: " + author + "\n" + "Status: " + status + "\n" + "Assigned to: " + assignedTo);
	  },
	  render: function render() {
	    var randomColors = ['aqua', 'aquamarine', 'yellow', 'orange', 'orchid', 'palegreen'];
	    var randomColor = randomColors[Math.floor(Math.random() * 6)];
	    var priorityColor;

	    if (this.props.priority === "low") {
	      priorityColor = "green";
	    } else if (this.props.priority === "Medium") {
	      priorityColor = "yellow";
	    } else if (this.props.priority === "High") {
	      priorityColor = "orange";
	    } else if (this.props.priority === "Blocker") {
	      priorityColor = "red";
	    }

	    if (this.props.status === 'Queue') {
	      return React.createElement(
	        "div",
	        {
	          className: "card",
	          style: { backgroundColor: randomColor },
	          onClick: this.handleClick.bind(null, this.props.author, this.props.status, this.props.assignedTo)
	        },
	        React.createElement(
	          "div",
	          { className: "cardTitle" },
	          this.props.title
	        ),
	        React.createElement(
	          "p",
	          { className: "cardPriority", style: { color: priorityColor } },
	          this.props.priority
	        ),
	        React.createElement(
	          "button",
	          { className: "moveButton" },
	          "Move to In Progress"
	        ),
	        React.createElement(
	          "button",
	          { className: "moveButton" },
	          "Mark as Done"
	        )
	      );
	    } else if (this.props.status === 'In Progress') {
	      return React.createElement(
	        "div",
	        {
	          className: "card",
	          style: { backgroundColor: randomColor },
	          onClick: this.handleClick.bind(null, this.props.author, this.props.status, this.props.assignedTo)
	        },
	        React.createElement(
	          "div",
	          { className: "cardTitle" },
	          this.props.title
	        ),
	        React.createElement(
	          "p",
	          { className: "cardPriority", style: { color: priorityColor } },
	          this.props.priority
	        ),
	        React.createElement(
	          "button",
	          { className: "moveButton" },
	          "Move to Queue"
	        ),
	        React.createElement(
	          "button",
	          { className: "moveButton" },
	          "Mark as Done"
	        )
	      );
	    } else {
	      return React.createElement(
	        "div",
	        {
	          className: "card",
	          style: { backgroundColor: randomColor },
	          onClick: this.handleClick.bind(null, this.props.author, this.props.status, this.props.assignedTo)
	        },
	        React.createElement(
	          "div",
	          { className: "cardTitle" },
	          this.props.title
	        ),
	        React.createElement(
	          "p",
	          { className: "cardPriority", style: { color: priorityColor } },
	          this.props.priority
	        ),
	        React.createElement(
	          "button",
	          { className: "moveButton" },
	          "Move to Queue"
	        ),
	        React.createElement(
	          "button",
	          { className: "moveButton" },
	          "Move to In Progress"
	        )
	      );
	    }
	  }
	});

	var ToDoList = React.createClass({
	  displayName: "ToDoList",

	  render: function render() {
	    var cardNodes = this.props.data.map(function (card, index) {
	      if (card.status === 'Queue') {
	        // sort cards by priority
	        return React.createElement(Card, {
	          key: index,
	          author: card.createdBy,
	          title: card.title,
	          status: card.status,
	          priority: card.priority,
	          assignedTo: card.assignedTo
	        });
	      }
	    });
	    return React.createElement(
	      "div",
	      {
	        className: "toDoList"
	      },
	      cardNodes
	    );
	  }
	});

	var DoingList = React.createClass({
	  displayName: "DoingList",

	  render: function render() {
	    var cardNodes = this.props.data.map(function (card, index) {
	      if (card.status === 'In Progress') {
	        // sort cards by priority
	        return React.createElement(Card, {
	          key: index,
	          author: card.createdBy,
	          title: card.title,
	          status: card.status,
	          priority: card.priority,
	          assignedTo: card.assignedTo
	        });
	      }
	    });
	    return React.createElement(
	      "div",
	      { className: "doingList" },
	      cardNodes
	    );
	  }
	});

	var DoneList = React.createClass({
	  displayName: "DoneList",

	  render: function render() {
	    var cardNodes = this.props.data.map(function (card, index) {
	      if (card.status === 'Done') {
	        // sort cards by priority

	        return React.createElement(Card, {
	          key: index,
	          author: card.createdBy,
	          title: card.title,
	          status: card.status,
	          priority: card.priority,
	          assignedTo: card.assignedTo
	        });
	      }
	    });
	    return React.createElement(
	      "div",
	      { className: "doneList" },
	      cardNodes
	    );
	  }
	});

	var NewCardModal = React.createClass({
	  displayName: "NewCardModal",

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "newCardContainer" },
	      React.createElement(
	        "h2",
	        null,
	        "Create New Kanban Card"
	      ),
	      React.createElement(
	        "form",
	        { action: "/api/cards", method: "POST" },
	        React.createElement(
	          "div",
	          null,
	          "Title",
	          React.createElement("input", { type: "text", name: "title" })
	        ),
	        React.createElement(
	          "div",
	          null,
	          "Priority",
	          React.createElement("input", { type: "text", name: "priority" })
	        ),
	        React.createElement(
	          "div",
	          null,
	          "Created by",
	          React.createElement("input", { type: "text", name: "createdBy" })
	        ),
	        React.createElement(
	          "div",
	          null,
	          "Assigned to",
	          React.createElement("input", { type: "text", name: "assignedTo" })
	        ),
	        React.createElement(
	          "div",
	          { className: "newCardButtons" },
	          React.createElement(
	            "button",
	            { type: "submit", className: "submitButton" },
	            "Submit new task"
	          ),
	          React.createElement("br", null)
	        )
	      ),
	      React.createElement(
	        "button",
	        { onClick: this.props.showForm, className: "cancel" },
	        "Cancel"
	      )
	    );
	  }
	});

	var CardContainer = React.createClass({
	  displayName: "CardContainer",

	  loadCardsFromServer: function loadCardsFromServer() {
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function (data) {
	        this.setState({ data: data });
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	  // make data available in this
	  getInitialState: function getInitialState() {
	    return { data: [], showForm: false };
	  },
	  toggle: function toggle() {
	    this.setState({ showForm: !this.state.showForm });
	  },
	  componentDidMount: function componentDidMount() {
	    this.loadCardsFromServer();
	    //setInterval(this.loadCardsFromServer, this.props.pollInterval);
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "cardContainer" },
	      React.createElement(
	        "h1",
	        null,
	        "Kanban"
	      ),
	      React.createElement(
	        "button",
	        { onClick: this.toggle, className: "createCardButton" },
	        "Create New"
	      ),
	      this.state.showForm ? React.createElement(
	        "div",
	        { className: "modal-container" },
	        React.createElement(NewCardModal, {
	          className: "modal",
	          showForm: this.toggle })
	      ) : null,
	      React.createElement(
	        "div",
	        { className: "columns" },
	        React.createElement(
	          "div",
	          { className: "toDoContainer" },
	          React.createElement(
	            "h2",
	            null,
	            "To Do"
	          ),
	          React.createElement(ToDoList, {
	            data: this.state.data
	          })
	        ),
	        React.createElement(
	          "div",
	          { className: "doingContainer" },
	          React.createElement(
	            "h2",
	            null,
	            "Doing"
	          ),
	          React.createElement(DoingList, {
	            data: this.state.data
	          })
	        ),
	        React.createElement(
	          "div",
	          { className: "doneContainer" },
	          React.createElement(
	            "h2",
	            null,
	            "Done"
	          ),
	          React.createElement(DoneList, {
	            data: this.state.data
	          })
	        )
	      ),
	      React.createElement("br", null)
	    );
	  }
	});

	ReactDOM.render(React.createElement(CardContainer, { url: "/api/cards", pollInterval: 2000 }), document.getElementById('app'));

/***/ }
/******/ ]);