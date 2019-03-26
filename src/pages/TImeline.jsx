import React, { Component } from 'react';
import api from '../services/api'
import Socket from 'socket.io-client'

import twLogo from '../twitter.svg'
import './Timeline.css';
import Tweet from '../components/Tweet';

export default class Timeline extends Component {
  state = {
    newTweet: '',
    tweets: []
  }

  async componentDidMount () {
    this.subscribeToEvents();

    const response = await api.get('tweets');
    
    this.setState({
      tweets: response.data
    })
  }
  subscribeToEvents = () => {
    const io = Socket('http://localhost:3000')

    io.on('tweet', data => {
      this.setState({
        tweets: [data, ...this.state.tweets]
      })
    })

    io.on('likes', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet => tweet._id === data._id ? data : tweet)
      })
    })
  }

  handleInputChange = e => {
    this.setState({
      newTweet: e.target.value
    })
  }
  
  handleSubmit = async e => {
    if (e.keyCode !== 13) return;
    
    const author = localStorage.getItem('@login:username');
    const content = this.state.newTweet;
    
    await api.post('tweets', { content, author });

    this.setState({
      newTweet: ''
    })
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <img src={twLogo} height={24} alt=""/>
        <form>
          <textarea 
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleSubmit}
            placeholder="O que está acontecendo?"
          />
        </form>
        <ul className="tweet-list">
        {
          this.state.tweets.map((tweet, i) => (
            <Tweet key={i} tweet={tweet}/>
          ))
        }
        </ul>



      </div>

    )
  }
}
