import React, { useEffect, useState } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {auth, database} from '../firebase/firebase';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';

export default function Chat() {
    let currentUser = auth.currentUser;
    let uid = "7gTvp7fpXYZJSWWqCsk7PQJcooG2"
    const [messages, setMessages] = useState([])

    useEffect(() => {
    
        console.log(messages)
        
    },[messages])



    useEffect(() => {
        let ref = database.ref('Users/' + uid + '/messages/')

        ref.on("value", (snapshot) => {
            console.log("Value")
            let temp=[]
            snapshot.forEach((snap) => {
                temp.push(snap.val())
            })
            setMessages(temp)
        })

        // ref.on("child_added", (snapshot) => {
        //     console.log("Child_added")
        //     console.log(snapshot.val())
            
        //     console.log(temp)
        //     setMessages([...messages, snapshot.val()])
        // })
    }, [])

    let onSend = (message) => {
        let userMessagesRef = database.ref('Users/' + uid + '/messages').push()
        userMessagesRef.set({
            message: message,
            sentTime: new Date().toISOString().split('T')[0],
            role: uid
        })

        //for test:
        if(message==="test"){
            let userMessagesRef = database.ref('Users/' + uid + '/messages').push()
            userMessagesRef.set({
                message: "This is a bot",
                sentTime: new Date().toISOString().split('T')[0],
                role: "assistant"
            })
        }
    }
    return (
        <div style={{ position:"relative", height: "500px" }}>
            
            <MainContainer>
                <ChatContainer>       
                <MessageList>
                    {messages && messages.map((message) => {
                        return <Message model={{...message,
                            direction: message.role === uid ? "outgoing" : "incoming"
                        }} />
                    })}
                   
                    </MessageList>
                <MessageInput placeholder="Type message here" onSend={onSend}/>        
                </ChatContainer>
            </MainContainer>
            <button onClick={()=>{
                let ref = database.ref("/")
                ref.on("value", (snapshot) => {
                    console.log("show database")
                    console.log(snapshot.val())
                })
            }}>Test</button><br/>
            <button onClick={()=>{
                let ref = database.ref('Users/' + uid + '/messages')
                ref.remove()
            }}>
                Remove all chats</button>
        </div>
    )
}
