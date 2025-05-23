import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllChats } from '../../../../store/slices/chatSlice';
import styles from './ChatList.module.css';
import ChatItem from './ChatItem';

const ChatList = ({ chats }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.chat);
  const userId = useSelector((state) => state.user.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getAllChats(userId));
    }
  }, [dispatch, userId]);

  if (!userId) {
    return (
      <div className={styles.placeholder}>Sign in to view the chat list</div>
    );
  }

  if (isLoading) {
    return <div>Loading chats ...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        An error occurred when downloading chats: {error}
      </div>
    );
  }

  return (
    <div className={styles.chatListContainer}>
      <ul className={styles.chatList}>
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
