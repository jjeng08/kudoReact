import React, { Component } from 'react';
import * as $ from 'axios';
import Note from './Note';
import UpdateForm from './UpdateForm';

class App extends Component {

  state = {
    notesList: [],
    newNote: '',
    option: '',
    updateMode: false,
    updateId: ''
  }

  handleChange = (event) => {
    this.setState({ newNote: event.target.value })
  }

  handleDelete = (event) => {
    event.preventDefault()

    console.log(event.target.value);

    $.delete(`/api/notes/${event.target.value}`)
      .then(() => {
        this.getNotes();
      })
  }

  update = (event) => {
    event.preventDefault();

    this.setState({updateId:event.target.value})
    if (this.state.updateMode) {
      console.log("UPDATE")
      this.setState({ updateMode: false })
    } else {
      console.log("DEFAULT")
      this.setState({ updateMode: true })
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    $.post('/api/notes', { content: this.state.newNote })
      .then((result) => {
        this.getNotes();
      });
  };

  getNotes = () => {
    $.get('/api/notes')
      .then((result) => {
        this.setState({ notesList: result.data });
      })
  };

  componentDidMount() {
    this.getNotes();
  };

  render() {
    return (

      <div className="App">
        <button onClick={this.update}>Update?</button>

        {!this.state.updateMode ? <UpdateForm /> : (
          <div>
            <form>
              <input val={this.state.newNote} onChange={this.handleChange} />
              <button onClick={this.handleClick}>Submit</button>
            </form>
            {this.state.notesList.map((note) => (
              <Note
                key={note._id}
                id={note._id}
                content={note.content}
                handleDelete={this.handleDelete}
                update={this.update}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;

// import Option from './Option';

       /* <select onChange={this.handleDelete}>
          {this.state.notesList.map((option) => (
            <Option
              value={option._id}
              content={option.content}
            />
          ))}
        </select> */