const Card = React.createClass({
  handleClick: function (author, status, assignedTo) {
    alert("Author: " + author + "\n" + "Status: " + status + "\n" + "Assigned to: " + assignedTo);
  },
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

    if(this.props.status === 'Queue') {
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
          <button className="moveButton">Move to In Progress</button>
          <button className="moveButton">Mark as Done</button>
        </div>
      );
    }

    else if(this.props.status === 'In Progress') {
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
          <button className="moveButton">Move to Queue</button>
          <button className="moveButton">Mark as Done</button>
        </div>
      );
    }

    else {
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
          <button className="moveButton">Move to Queue</button>
          <button className="moveButton">Move to In Progress</button>
        </div>
      );
    }
  }
});

const ToDoList = React.createClass({
  render: function() {
    const cardNodes = this.props.data.map(function(card, index) {
      if(card.status === 'Queue') {
        // sort cards by priority
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
        // sort cards by priority
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
        // sort cards by priority

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

const NewCardModal = React.createClass({
  render: function () {
    return (
      <div className="newCardContainer">
        <h2>Create New Kanban Card</h2>
        <form action="/api/cards" method="POST">
          <div>
            Title
            <input type="text" name="title" />
          </div>
          <div>
            Priority
            <input type="text" name="priority" />
          </div>
          <div>
            Created by
            <input type="text" name="createdBy" />
          </div>
          <div>
            Assigned to
            <input type="text" name="assignedTo" />
          </div>
          <div className="newCardButtons">
            <button type="submit" className="submitButton">
              Submit new task
            </button>
            <br />
          </div>
        </form>
        <button onClick={this.props.showForm} className="cancel">
              Cancel
        </button>
      </div>
    )
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
    return {data: [], showForm: false}
  },
  toggle: function () {
    this.setState( {showForm: !this.state.showForm})
  },
  componentDidMount: function () {
    this.loadCardsFromServer();
    //setInterval(this.loadCardsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="cardContainer">
        <h1>Kanban</h1>
        <button onClick= {this.toggle} className="createCardButton">Create New</button>
        { this.state.showForm ?
            <div className = "modal-container">
              <NewCardModal
                className = "modal"
                showForm = {this.toggle}/>
            </div>
          : null
        }
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