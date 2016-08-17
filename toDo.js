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
  handleCardSubmit: function (card) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: card,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
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
        <CardList
          data = { this.state.data }
        />
      </div>
    );
  }
});

ReactDOM.render(
  <CardContainer url = "/api/comments" pollInterval = {2000}/>,
  document.getElementById('app')
);