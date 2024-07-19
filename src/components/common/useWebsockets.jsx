// useWebSocket.js
import { useEffect, useState } from 'react';
import WebSocket from 'websocket';

const useWebSocket = () => {
  const access_token = localStorage.getItem("access_token");
  const [notifications, setNotifications] = useState([]);
  const apiUrl = import.meta.env.VITE_WEBSOCKETS_URL

  useEffect(() => {
    // const client = new WebSocket.w3cwebsocket(`wss://awake-quail-externally.ngrok-free.app/ws/notify/?token=${access_token}`);
    const client = new WebSocket.w3cwebsocket(`${apiUrl}/ws/notify/?token=${access_token}`);

    client.onerror = (error) => {
      console.error('WebSocket Error: ' + error);
    };

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      console.log('Received message:', message.data);
      try {
        const parsedMessage = JSON.parse(message.data);
        console.log('Parsed message:', parsedMessage);
        setNotifications(prevNotifications => [...prevNotifications, parsedMessage.notification]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    return () => {
      client.close();
    };
  }, []);

  return notifications;
};

export default useWebSocket;

