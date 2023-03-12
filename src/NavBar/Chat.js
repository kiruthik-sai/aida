import React, { useEffect, useRef, useState } from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { auth, database } from '../firebase/firebase';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import './Chatz.css';
export default function Chat() {
  let currentUser = auth.currentUser;
  let uid = currentUser.uid
  const [messages, setMessages] = useState([]);
  const url = 'http://35.153.51.197/chat';
  const firstRender = useRef(true);
  let count = 1;

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      addBotMessage();
    }
  }, [messages]);

  const addBotMessage = async () => {
    try {
      if (messages.length > 0) {
        let lastMessage = messages[messages.length - 1];
        if (lastMessage.role === uid) {
          console.log('last message', lastMessage, lastMessage.role);
          let gptResponse = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              chatinput: messages,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          let gptResponseText = await gptResponse.json();
          console.log('-------------------------');
          await addMessage(gptResponseText, 'aida');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let ref = database.ref('Users/' + uid + '/messages/');
    ref.on('value', (snapshot) => {
      console.log('count', count);
      count += 1;
      let temp = [];
      snapshot.forEach((snap) => {
        temp.push(snap.val());
      });
      setMessages(temp);
    });
  }, []);

  let addMessage = async (message, role) => {
    console.log('add message', message, role);
    //let userMessagesRef = database.ref('Users/' + uid + '/messages').push()
    database.ref('Users/' + uid + '/messages').push({
      message: message,
      sentTime: new Date().toISOString().split('T')[0],
      role: role,
    });
  };

  let onSend = async (message) => {
    console.log('qwertyuiopasdfghjklzxcvbnm,');
    addMessage(message, currentUser.displayName).then(() => {
      console.log('Message added');
    });
  };
  return (
    <div 
    className='chatz'
    >
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages &&
              messages.map((message) => {
                return (
                  <Message
                    model={{
                      ...message,
                      direction:
                        message.role !== 'aida' ? 'outgoing' : 'incoming',
                    }}
                  />
                );
              })}
          </MessageList>
          <MessageInput
            placeholder='Type message here'
            onSend={onSend}
          />
        </ChatContainer>
      </MainContainer>

    
    </div>
  );
}