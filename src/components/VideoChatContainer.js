import React from 'react'
import './App.css'
import { createOffer, initiateConnection, startCall, sendAnswer, addCandidate, initiateLocalStream, listenToConnectionEvents } from './modules/RTCModule'
import { auth, data, database } from '../firebase/firebase'
import config from './config'
import { doOffer, doAnswer, doLogin, doCandidate } from './modules/FirebaseModule'
import 'webrtc-adapter'
import VideoChat from './VideoChat'
import { useWhisper } from '@chengsokdara/use-whisper'
import * as faceApi from "face-api.js"

class TmpVideoChatContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      database: null,
      connectedUser: null,
      localStream: null,
      localConnection: null,
      emotion:""
    }
    this.localVideoRef = React.createRef()
    this.remoteVideoRef = React.createRef()
  }

    componentDidMount = async () => {
      faceApi.nets.tinyFaceDetector.loadFromUri('/models')
      faceApi.nets.faceExpressionNet.loadFromUri('/models')

      // getting local video stream
      const localStream = await initiateLocalStream()
      this.localVideoRef.srcObject = localStream

      const localConnection = await initiateConnection()

      this.setState({
        database: database,
        localStream,
        localConnection
      })
    }

    shouldComponentUpdate (nextProps, nextState) {
      if (this.state.database !== nextState.database) {
        return false
      }
      if (this.state.localStream !== nextState.localStream) {
        return false
      }
      if (this.state.localConnection !== nextState.localConnection) {
        return false
      }

      return true
    }

    startCall = async (username, userToCall) => {
      const { localConnection, database, localStream } = this.state
      listenToConnectionEvents(localConnection, username, userToCall, database, this.remoteVideoRef, doCandidate)
      // create an offer
      createOffer(localConnection, localStream, userToCall, doOffer, database, username)
    }

    onLogin = async (username) => {
      return await doLogin(username, this.state.database, this.handleUpdate)
    }

    setLocalVideoRef = ref => {
      this.localVideoRef = ref
    }

    setRemoteVideoRef = ref => {
      this.remoteVideoRef = ref
      this.update()
    }

    handleUpdate = (notif, username) => {
      const { localConnection, database, localStream } = this.state

      if (notif) {
        switch (notif.type) {
          case 'offer':
            this.setState({
              connectedUser: notif.from
            })

            listenToConnectionEvents(localConnection, username, notif.from, database, this.remoteVideoRef, doCandidate)

            sendAnswer(localConnection, localStream, notif, doAnswer, database, username)
            break
          case 'answer':

            this.setState({
              connectedUser: notif.from
            })
            startCall(localConnection, notif)
            break
          case 'candidate':
            addCandidate(localConnection, notif)
            break
          default:
            break
        }
      }
    }

    update = async ()=>{
      const options = new faceApi.TinyFaceDetectorOptions({
          inputSize: 512,
          scoreThreshold: 0.5
      });
      try{
        if(!this.remoteVideoRef.current){
          console.log("no remote video")
          setTimeout(() => this.update(), 500);
        }
        console.log(this.remoteVideoRef.current)
        const result = await faceApi
        .detectSingleFace(this.remoteVideoRef.current, options)
        .withFaceExpressions();
        
        if(result){
            let sortedExpressions = result.expressions.asSortedArray()
            console.log(sortedExpressions[0].expression)
            //setCurrentEmotion(sortedExpressions[0].expression)
        }
      }
      catch(err){
        console.log("in expression", err)
      }
      

      setTimeout(() => this.update(), 500);

  }

    render () {
      return (
        <div className='wholeVid'>
          <VideoChat
            startCall={this.startCall}
            onLogin={this.onLogin}
            setLocalVideoRef={this.setLocalVideoRef}
            setRemoteVideoRef={this.setRemoteVideoRef}
            connectedUser={this.state.connectedUser}
            update={this.update}
          />
          <button className='buttonVid' style={{backgroundColor:'#ed8b8b'}}  onClick={()=>{
            this.state.localStream.getTracks().forEach(function(track) {
              track.stop();
            });
            this.state.localConnection.close()

          
          }}>End Call</button>
        </div>
        
      )
    }
}


export const VideoChatContainer = () =>{
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey : "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",
    streaming: true,
    timeSlice: 1_000
  })
  return (
    <>
    <TmpVideoChatContainer/>
    <div className='wholeVid'>
          
          <p
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
margin:'5px'
          }}
          >Transcribed Text: {transcript.text}</p>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',

          }}>
          <button className='buttonVid' style={{backgroundColor:'#9bec8b'}} onClick={() => startRecording()}>Start</button>
          <button className='buttonVid' style={{backgroundColor:'#edec8b'}} onClick={() => pauseRecording()}>Pause</button>
          <button className='buttonVid' style={{backgroundColor:'#ed8b8b'}} onClick={() => stopRecording()}>Stop</button>
          </div>
        </div>
    </>
  )
} 

export default VideoChatContainer
