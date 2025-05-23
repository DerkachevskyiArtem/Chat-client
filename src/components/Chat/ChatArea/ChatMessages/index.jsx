import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; 
import MessageItem from './MessageItem';
import styles from './ChatMessages.module.css';

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!messages || messages.length === 0) {
    return <div className={styles.emptyMessages}>No Messages yet.</div>;
  }

  return (
    <ul className={styles.ChatList}>
      {messages.map((message, index) => {
        const key =
          message.id || `${message.chatId}-${message.authorId}-${index}`;

        return <MessageItem key={key} message={message} />;
      })}

      <div ref={messagesEndRef} />
    </ul>
  );
};

ChatMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      chatId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default ChatMessages;
