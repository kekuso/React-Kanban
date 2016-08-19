const Card = React.createClass({
  rawMarkup: function () {
    let md = new Remarkable();
    const rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  handleClick: function (author, status, assignedTo) {
    alert("Author: " + author + "\n" + "Status: " + status + "\n" + "Assigned to: " + assignedTo);
  },
  // handleCardSubmit: function (card) {
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     type: 'POST',
  //     data: card,
  //     success: function (data) {
  //       this.setState({data: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  render: function() {
    var randomColors = ['aqua', 'aquamarine', 'yellow', 'orange', 'orchid', 'palegreen'];
    var randomColor = randomColors[Math.floor(Math.random()*6)];
    var priorityColor;

    if(this.props.priority === "low") {
      priorityColor = "green";
    }
    else if (this.props.priority === "Medium") {
      priorityColor = "yellow";
    }
    else if (this.props.priority === "High") {
      priorityColor = "orange";
    }
    else if (this.props.priority === "Blocker") {
      priorityColor = "red";
    }

    return (
      <div
        className = "card"
        style = {{backgroundColor: randomColor}}
        onClick = {this.handleClick
          .bind(null, this.props.author, this.props.status, this.props.assignedTo)}
      >
        <div className = "cardTitle">
          {this.props.title}
        </div>
        <p className = "cardPriority" style = {{color: priorityColor}}>
          {this.props.priority}
        </p>
        <br />
      </div>
    );
  }
});

const ToDoList = React.createClass({
  render: function() {
    const cardNodes = this.props.data.map(function(card, index) {
      if(card.status === 'Queue') {
        return (
          <Card
            key = {index}
            author = {card.createdBy}
            title = {card.title}
            status = {card.status}
            priority = {card.priority}
            assignedTo = {card.assignedTo}
            >
          </Card>
        );
      }
    })
    return (
      <div
        className = "toDoList"
      >
        { cardNodes }
      </div>
    );
  }
});

const DoingList = React.createClass({
  render: function() {
    const cardNodes = this.props.data.map(function(card, index) {
      if(card.status === 'In Progress') {
        return (
          <Card
            key = {index}
            author = {card.createdBy}
            title = {card.title}
            status = {card.status}
            priority = {card.priority}
            assignedTo = {card.assignedTo}
            >
          </Card>
        );
      }
    })
    return (
      <div className = "doingList">
        { cardNodes }
      </div>
    );
  }
});

const DoneList = React.createClass({
  render: function() {
    const cardNodes = this.props.data.map(function(card, index) {
      if(card.status === 'Done') {
        return (
          <Card
            key = {index}
            author = {card.createdBy}
            title = {card.title}
            status = {card.status}
            priority = {card.priority}
            assignedTo = {card.assignedTo}
            >
          </Card>
        );
      }
    })
    return (
      <div className = "doneList">
        { cardNodes }
      </div>
    );
  }
});

const CardContainer = React.createClass({
  loadCardsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  // make data available in this
  getInitialState: function () {
    return {data: []}
  },
  componentDidMount: function () {
    this.loadCardsFromServer();
    //setInterval(this.loadCardsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="cardContainer">
        <h1>Kanban</h1>
        <a className="createCardButton" href="./newCard.html">Create New</a>
        <div className = "columns">
          <div className = "toDoContainer">
            <h2>To Do</h2>
            <ToDoList
              data = { this.state.data }
            />
          </div>
          <div className = "doingContainer">
            <h2>Doing</h2>
            <DoingList
              data = { this.state.data }
            />
          </div>
          <div className = "doneContainer">
            <h2>Done</h2>
            <DoneList
              data = { this.state.data }
            />
          </div>
        </div>
        <br />
      </div>
    );
  }
});

ReactDOM.render(
  <CardContainer url = "/api/cards" pollInterval = {2000}/>,
  document.getElementById('app')
);