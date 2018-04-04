import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import logo from './logo.svg';
import lottery from './lottery';

class App extends Component {
  constructor(props){
  super(props);
    this.state = {
       manager: '',
       noOfPlayers: 0,
       balance: '',
       value: '',
       message:''
  };
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const noOfPlayers = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager, noOfPlayers, balance});
  }

 onEnter = async (event) => {
   this.setState({
     message: 'You are entering into Lotttery contract!! Please bear with us while we add you to the contract!'
   });
   event.preventDefault();
     const accounts = await web3.eth.getAccounts();

     try{
       await lottery.methods.enter().send({
         from: accounts[0],
         value: web3.utils.toWei(this.state.value, 'ether')
        });

        const noOfPlayers = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({noOfPlayers, balance, message:'You are successfully entered to contract!!'});

     }catch(error){
       console.log('An errror occured', error);
       this.setState({
         message: 'Sorry!. An error occured'
       });
     }
  }

  pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: 'Waiting on transaction success'
    });
    await lottery.methods.pickWinner().send({from: accounts[0]});

    this.setState({
      message: 'Winner has picked!!!'
    });

  }

  render() {
    return (
      <div>
      <h2>Lottery contract</h2>
      <p> This is Lottery contract!!!!!.  It is managed by <b> {this.state.manager}.</b> <br/>
      <i>Contract has {this.state.noOfPlayers.length}</i> number of players
       and <b>competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</b>.
      </p>
      <hr/>
      <form onSubmit={this.onEnter}>
          <h4>  Want to try luck?? :  </h4>
          <div>
            <lable>Amount of Ether to enter : </lable>
            <input
              type='text'
              value={this.state.value}
              onChange={ event => this.setState({value: event.target.value})}>
             </input>
          </div>
          <br/>
          <button>Enter</button>
          <hr/>
      </form>

      <h4>Ready to pick winner</h4>
      <button onClick={this.pickWinner}>Click</button>
          <br/><br/>
          <hr/>
        <i>{this.state.message}</i>
      </div>
    );
  }
}

export default App;
