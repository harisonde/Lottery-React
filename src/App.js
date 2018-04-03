import React, { Component } from 'react';
import './App.css';
import web3 from './web3';

class App extends Component {

  render() {
    console.log(web3.version);
    return (
      <div>
      <h1>Hello, how are you?</h1>
      </div>
    );
  }
}

export default App;
