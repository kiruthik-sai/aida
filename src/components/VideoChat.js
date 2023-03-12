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
        <label
        style={{
            fontSize: '1.5rem',
        }}
        >{auth.currentUser.displayName}</label>

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
      ? <div key='a' className='form' 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <label style={{
            fontSize: '1.5rem',
        }}>Call to:</label>
        <input className='inputVid' value={this.state.userToCall} type="text" onChange={e => this.setState({ userToCall: e.target.value })} />
        <button  onClick={this.onStartCallClicked} style={{backgroundColor:'#9bec8b'}}  id="call-btn" className="buttonVid">Call</button>

      </div>
      : <div key='b' className='form'>
        {/* <input value={auth.currentUser.displayName} type="text" onChange={e => this.setState({ username: e.target.value })} /> */}

        <button onClick={this.onLoginClicked} id="login-btn" style={{backgroundColor:'#9bec8b'}} className=" buttonVid">Start a Call</button>

      </div>
  }

  render () {
    return <section id="container">
      {this.props.connectedUser ? null : this.renderForms()}

      {this.renderVideos()}

    </section>
  }
}
