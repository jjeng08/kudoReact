import React, { Component } from 'react';
import * as axios from 'axios';
import Kudo from './components/Kudo';
import KudoModal from './components/KudoModal';


class App extends Component {

  state = {
    kudos:[],
  }

  //DEFAULT SETUP;
  componentDidMount() {
    this.getKudos();
  }

  getKudos = () => {
    axios.get('/api/kudos')
    .then((result) => {
      this.setState({kudos: result.data});
    })
  }

  render() {
    return (

      <div className="App">
              <KudoModal getKudos={this.getKudos}/>
        {this.state.kudos.map((kudo) => (
          <Kudo
            key={kudo._id}
            sender={kudo.sender}
            receiver={kudo.receiver}
            title={kudo.title}
            body={kudo.body}
          />
        ))}

      </div>
    );
  }
}

export default App;