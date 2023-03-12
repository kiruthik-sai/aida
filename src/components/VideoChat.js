import React from 'react'
import './App.css'
import 'firebase/database'
import classnames from 'classnames'
import { auth } from '../firebase/firebase'


export default class VideoChat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userToCall: null,
      username: null
    }
  }


  onLoginClicked = async () => {
    console.log(auth.currentUser.displayName)
    await this.props.onLogin(auth.currentUser.displayName)
    this.setState({
      isLoggedIn: true
    })
  }

  onStartCallClicked = () => {
    this.props.startCall(auth.currentUser.displayName, this.state.userToCall)
  }

  renderVideos = () => {
    return <div className={classnames('videos', { active: this.state.isLoggedIn })}>
      <div>
        <label>{auth.currentUser.displayName}</label>

        <video ref={this.props.setLocalVideoRef} autoPlay playsInline></video>
      </div>
      <div>
        <label>{this.props.connectedUser}</label>
        <video ref={this.props.setRemoteVideoRef} autoPlay playsInline ></video>
        {/* onPlay={this.props.update} */}
      </div>

    </div>
  }

  renderForms = () => {
    return this.state.isLoggedIn
      ? <div key='a' className='form'>
        <label>Call to</label>
        <input value={this.state.userToCall} type="text" onChange={e => this.setState({ userToCall: e.target.value })} />
        <button onClick={this.onStartCallClicked} id="call-btn" className="btn btn-primary">Call</button>

      </div>
      : <div key='b' className='form'>
        <label>Type a name</label>
        {/* <input value={auth.currentUser.displayName} type="text" onChange={e => this.setState({ username: e.target.value })} /> */}

        <button onClick={this.onLoginClicked} id="login-btn" className="btn btn-primary">Start a Call</button>

      </div>
  }

  render () {
    return <section id="container">
      {this.props.connectedUser ? null : this.renderForms()}

      {this.renderVideos()}

    </section>
  }
}
