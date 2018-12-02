import React, { Component } from 'react';
import * as axios from 'axios';
import Kudo from './components/Kudo';
import KudoModal from './components/KudoModal';
import { Button } from 'reactstrap';

class App extends Component {

  state = {
    loggedIn: false,
    kudos: [],
  }

  //DEFAULT SETUP;
  componentDidMount() {
    this.getKudos();
  }

  getKudos = () => {
    axios.get('/api/kudos')
      .then((result) => {
        this.setState({ kudos: result.data });
      })
  }

  handleDelete = (event) => {
    event.preventDefault()

    const kudoId = event.target.value;
    const senderId = event.target.id;

    axios.delete(`/api/kudos/${kudoId}`)
      .then(() => {
        axios.put(`/api/users/${senderId}`, kudoId)
      })
      .then(() => {
        this.getKudos();
      })

  }

  logIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  logOut = () => {
    this.setState({
      loggedIn: false
    })
    console.log(this.state.loggedIn)
  }

  render() {
    return (

      <div className="App">
        {this.state.loggedIn ? <Button onClick={this.logOut}>Log Out</Button> : (
          <div className="headRow">
            <div className="headRowBox">
              <KudoModal modalType="input" changeText={"Kudos!"} getKudos={this.getKudos} />
            </div>
            <div className="headRowBox">
              {!this.state.loggedIn ? <div>Not In</div> : <div>I'm In</div>}
            </div>
            <div className="headRowBox">
              <KudoModal logIn={this.logIn} modalType="admin" changeText={"Admin?"} />
            </div>
          </div>)}
        <div className="kudosDisplay">
          {this.state.kudos.map((kudo) => (
            <Kudo
              key={kudo._id}
              id={kudo._id}
              sender={kudo.sender}
              senderId={kudo.senderId}
              receiver={kudo.receiver}
              title={kudo.title}
              body={kudo.body}
              loggedIn={this.state.loggedIn}
              handleDelete={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;