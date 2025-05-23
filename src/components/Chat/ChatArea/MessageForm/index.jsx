import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MessageForm.module.css';
import { sendNewChatMessage } from '../../../../api/ws';

const MessageForm = ({ chatId }) => {
  const [messageText, setMessageText] = useState('');
  const { user } = useSelector((state) => state.user);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageText.trim() !== '') {
      sendNewChatMessage({ chatId, authorId: user.id, text: messageText });

      setMessageText('');
    }
  };

  return (
    <form onSubmit={handleSendMessage} className={styles.messageForm}>
      <div className={styles.messageFormContainer}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Write a message..."
          className={styles.messageFormInput}
        />

        <button type="submit" className={styles.messageFormButton}>
          ✈️
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
