import io from 'socket.io-client';
import styles from './RandomMessageButton.module.css';

const socket = io('http://localhost:5000');

const RandomMessageButton = ({ userId, className }) => {
  const handleSendRandomMessage = () => {
    socket.emit('sendRandomMessage', userId);
  };

  return (
    <button onClick={handleSendRandomMessage} className={className}>
      Send Random
    </button>
  );
};

export default RandomMessageButton;
