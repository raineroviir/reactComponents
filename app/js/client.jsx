'use strict';

var React = require('react');
var request = require('superagent');

var mockData = [
{author: 'Kanye'}
]

var App = React.createClass({
  handleSongSubmit: function(comment) {
    this.setState({notes: comment})
  },
  getInitialState: function() {
    return {notes: [], title: "Favorite Musician: "};
  },
  componentDidMount: function() {
    this.setState({notes: mockData});
  },
  render: function() {
    return (
      <section>
        <h1>{this.state.title}</h1>
        <NoteList data={this.state.notes}/>
        <ul>
          <li></li>
        </ul>
        <SongForm onSongSubmit={this.handleSongSubmit} />
      </section>
    )
  }
});

var SongForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    if(!author) {
      return;
    }
    this.props.onSongSubmit({author: author});
    React.findDOMNode(this.refs.author).value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var NoteList = React.createClass({
  renderNotes: function() {
      return <Note data={this.props.data} />;
  },
  render: function() {
    return (
      <ul>
        {this.renderNotes()}
      </ul>
    )
  }
});

var Note = React.createClass({
  render: function() {
    return <li>{this.props.data}</li>;
  }
});

React.render(<App />, document.getElementsByTagName('main')[0]);
