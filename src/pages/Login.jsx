import React, { Component } from 'react';
import twLogo from '../twitter.svg'
import './Login.css'

import Hook from '../components/hook'

export default class Login extends Component {

  state = {
    username: ''
  }
  

  handleSubmit = e => {
    e.preventDefault();
    const { username } = this.state
    if(!username.length) return;
    localStorage.setItem("@login:username", username)
    this.props.history.push('/timeline')
  }

  handleInputChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <div className="login-wrapper">
        <img src={twLogo} alt=""/>
        <Hook/>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
            placeholder="Nome de usuário"/>
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }
}
