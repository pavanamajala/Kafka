import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function KafkaMessageComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:1998/websocket');
    const stompClient = Stomp.over(socket);
  
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
  
      const subscription = stompClient.subscribe('/topic/cab-location', (message) => {
        setMessages((prevMessages) => [...prevMessages, message.body]);
        console.log(message.body);
      });
      
      // Clean up function to unsubscribe and disconnect the WebSocket when component unmounts
      return () => {
        subscription.unsubscribe();
        stompClient.disconnect();
        console.log('Disconnected');
      };
    });
  }, []);

  return (
    <div>
      <h1>Cab Locations</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default KafkaMessageComponent;
