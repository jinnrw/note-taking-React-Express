import React, { Component } from 'react';
import './App.css';
// import createNote from './components/createNote';

class App extends Component {
  state = {
    notes: [],
    title: '',
    note: '',
    editTitle: '',
    editNote: '',
    editIndex: '',
    isEditMode: false
  }

  componentDidMount() {
    fetch('/notes')
      .then(res => res.json())
      .then(notes => this.setState({ notes }));
  }
  
  createNote = (e) => {
    e.preventDefault();
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        note: this.state.note
      })
    })
      .then(res => res.json())
      .then(notes => this.setState({ notes }))
      .then(this.setState({ title: '', note: '' }))
  }

  deleteNote = (index) => {
    // console.log(index)
    fetch('/notes', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        index: index
      })
    })
      .then(res => res.json())
      .then(notes => this.setState({ notes }))
  }

  editNote = (index) => {
    this.setState({ 
      editTitle: this.state.notes[index].title, 
      editNote: this.state.notes[index].note,
      editIndex: index,
      isEditMode: true });    
    // console.log(this.state.editIndex)
  }

  updateNote = (e) => {
    e.preventDefault();
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        index: this.state.editIndex,
        title: this.state.editTitle,
        note: this.state.editNote
      })
    })
      .then(res => res.json())
      .then(notes => this.setState({ notes }))
      .then(this.setState({ editTitle: '', editNote: '', editIndex: '', isEditMode: false }))
  }

  cancelUpdate = (e) => {
    e.preventDefault();
    this.setState({isEditMode: false})
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <aside className="note-side">
          <h1 className="title">Notes</h1>
          {this.state.notes.map( (note, i) =>
            <div key={i} className="single-note">
              <div className="single-note_header subtitle">
                <h2 className="note-title">{note.title}</h2>
                <div className="header_actions">
                  <a className="edit-btn" title="Edit" onClick={() => {this.editNote(i)}}>Edit</a>
                  <a className="delete" title="Delete" onClick={() => {this.deleteNote(i)}}>Delete</a>
                </div>
                
              </div>
              <p>{note.note}</p>
            </div>
          )}
        </aside>
        <aside className={`compose-side create-post ${!this.state.isEditMode ? 'show': 'hide'}`}>
          <form id="create-post" method="POST">
              <input className="subtitle compost_title-input" name="title" value={ this.state.title } onChange={this.handleChange} placeholder="Title"/>
              <textarea className="subtitle compost_note-input" name="note" value={ this.state.note } onChange={this.handleChange} placeholder="Create a new note"></textarea>
              <button className="button is-light compost_submit" type="submit" value="Submit" onClick={this.createNote}>Submit</button>
          </form>
        </aside>
        <aside className={`compose-side update-post ${this.state.isEditMode ? 'show': 'hide'}`}>
          <form id="update-post" method="POST">
              <input className="subtitle compost_title-input" name="editTitle" value={ this.state.editTitle } onChange={this.handleChange} placeholder="Title" />
              <textarea className="subtitle compost_note-input" name="editNote" value={ this.state.editNote } onChange={this.handleChange} placeholder="Write notes" ></textarea>
              <div className="compost_submit">
                <button className="button is-warning" onClick={this.updateNote} >Update</button>
                <button className="button is-light" onClick={this.cancelUpdate}>Cancel</button>
              </div>
          </form>
        </aside>
      </div>
    );
  }
}

export default App;
