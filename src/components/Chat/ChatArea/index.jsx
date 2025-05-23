import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../../store/slices/chatSlice';
import MessageForm from './MessageForm';
import ChatMessages from './ChatMessages';
import styles from './ChatArea.module.css';
import MessagesHeader from '../MessagesHeader';

const ChatArea = () => {
  const dispatch = useDispatch();
  const { currentChat, isLoading } = useSelector((state) => state.chat);

  useEffect(() => {
    if (currentChat?.id) {
      dispatch(getAllMessages(currentChat.id));
    }
  }, [currentChat?.id, dispatch]);

  if (!currentChat) {
    return <div className={styles.emptyChat}>Choose Chat to get started.</div>;
  }

  return (
    <div className={styles.chatArea}>
      <MessagesHeader
        chatName={currentChat.name}
        onEditClick={() => console.log('Edit Chat Name')}
      />

      {isLoading ? (
        <div className={styles.chatArea}>Loading messages ...</div>
      ) : (
        <>
          <ChatMessages messages={currentChat.messages} />
          <div className={styles.MessageFormContainer}>
            <MessageForm chatId={currentChat.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
