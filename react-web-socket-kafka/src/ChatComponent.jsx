import { useEffect, useState } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { FaUserCircle, FaBell, FaCog } from 'react-icons/fa'; // Importing icons

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, { label: newMessage, styleClass: 'show-right' }]);
      setNewMessage('');
      axios.put('http://localhost:1999/location/send', newMessage, {
        headers: {
          'Content-Type': 'text/plain',  // Ensure Content-Type is plain text
        }
      })
        .then(response => {
          console.log('Message sent successfully:', response.data);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  };

  useEffect(() => {
    let copiedMessages = messages.filter((item, index, arr) => {
      return index === arr.findIndex(ele => item.label === ele.label);
    })
    if (copiedMessages.length !== messages.length) {
      setMessages(copiedMessages);
    }
    const tables = document.getElementsByClassName('message-item');
    if (Object.keys(tables).length > 0) {
      tables?.[tables.length - 1]?.scrollIntoView();
    }
  }, [messages])

  useEffect(() => {
    const socket = new SockJS('http://localhost:1998/websocket');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);

      const subscription = stompClient.subscribe('/topic/cab-location', (message) => {
        setMessages((prevMessages) => [...prevMessages, { label: message.body, styleClass: 'show-left' }]);
        console.log(message.body);
      });

      return () => {
        subscription.unsubscribe();
        stompClient.disconnect();
        console.log('Disconnected');
      };
    });
  }, []);

  return (
    <div className="chat-container">
      {/* Header section with profile name, profile icon, and right-side icons */}
      <div className="chat-header">
        <div className="header-left">
          <FaUserCircle size={30} className="profile-icon" /> {/* Profile icon */}
          <span>Amajala Sri Ram Pavan</span> {/* Profile name */}
        </div>
        <div className="header-right">
          <FaBell size={22} className="header-icon" /> {/* Notifications icon */}
          <FaCog size={22} className="header-icon" /> {/* Settings icon */}
        </div>
      </div>

      <div className="message-area">
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className='message-container'>
              <div key={index} className={`message-item ${msg.styleClass}`}              >
                {msg.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="input-area">
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
