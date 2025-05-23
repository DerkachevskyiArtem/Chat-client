import { io } from 'socket.io-client';
import CONSTANTS from '../constants';

const socket = io(CONSTANTS.WS_SERVER_URL);

export const sendNewChatMessage = (messageData) => {
  socket.emit('newChatMessage', messageData);
};

export default socket;