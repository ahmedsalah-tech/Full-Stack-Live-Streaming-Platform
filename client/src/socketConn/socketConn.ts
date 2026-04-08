import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const getSocket = () => socket;

export const connectWithSocketServer = () => {
  const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5002';
  socket = io(socketUrl);

  socket.on('connect', () => {
    console.log('successfully connected with socket.io server');
    console.log(socket.id);
  });

  socket.on('chat-history', (chatHistory) => {
    console.log(chatHistory);
    console.log('chat-history-came-from-the-server');
  });
};

export const getChatHistory = (channelId: string) => {
  socket.emit('chat-history', channelId);
};
