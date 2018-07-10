import React, { Component } from 'react';
import './App.css';
// import createNote from './components/createNote';

class App extends Component {
  state = {
    notes: {},
    title: '',
    note: '',
    editTitle: '',
    editNote: '',
    editKey: '',
    isEditMode: false
  }

  componentDidMount() {
    fetch('/notes')
      .then(res => res.json())
      .then(data => {
        // let notes = [];
        // notes = Object.values(data)
        this.setState({ notes: data })
      })
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
      .then(data => this.setState({ notes: data }))
      .then(this.setState({ title: '', note: '' }))
  }

  deleteNote = (key) => {
    fetch('/notes', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: key
      })
    })
      .then(res => res.json())
      .then(data => this.setState({ notes: data }))
  }

  editNote = (key) => {
    this.setState({ 
      editTitle: this.state.notes[key].title, 
      editNote: this.state.notes[key].note,
      editKey: key,
      isEditMode: true });    
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
        key: this.state.editKey,
        title: this.state.editTitle,
        note: this.state.editNote
      })
    })
      .then(res => res.json())
      .then(data => this.setState({ notes: data }))
      .then(this.setState({ editTitle: '', editNote: '', editKey: '', isEditMode: false }))    
  }

  cancelUpdate = (e) => {
    e.preventDefault();
    this.setState({isEditMode: false})
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {

    const noteKey = Object.keys(this.state.notes);
    const noteValues = Object.values(this.state.notes);

    return (
      <div className="App">
        <aside className="note-side">
          <h1 className="title">Notes</h1>
          {noteValues.map((note, i) =>
            <div key={noteKey[i]} className="single-note">
              <div className="single-note_header subtitle">
                <h2 className="note-title">{note.title}</h2>
                <div className="header_actions">
                  <a className="edit-btn" title="Edit" onClick={() => {this.editNote(noteKey[i])}}>Edit</a>
                  <a className="delete" title="Delete" onClick={() => {this.deleteNote(noteKey[i])}}>Delete</a>
                </div>
              </div>
              <p>{note.note}</p>
            </div>
          )}

          {/* {this.state.notes.map( (note, i) =>
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
          )} */}
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
