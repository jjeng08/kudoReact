import React, { Component } from 'react';
import KudosModal from './components/Modal';
import User from './components/User';
import * as axios from 'axios';



class App extends Component {

  state = {
    userList: []
  }

  getUsers = () => {
    axios.get('/api/users')
    .then((result) => {
      this.setState({userList: result.data});
      console.log(this.state.userList)
    })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (

      <div className="App">
        {this.state.userList.map((user) => (
          <User
            key={user._id}
            name={user.username}
          />
        ))}
        <KudosModal />
      </div>
    );
  }
}

export default App;