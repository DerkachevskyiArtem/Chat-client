import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import socket from '../../api/ws';
import ChatMenu from '../../components/Chat/ChatMenu';
import ChatArea from '../../components/Chat/ChatArea';
import { newMessage } from '../../store/slices/chatSlice';
import styles from './ChatsPage.module.css';

const ChatPage = () => {
  const { user } = useSelector((state) => state.user);
  const { chats, currentChatId } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const isAuthenticated = !!user?.id;

  useEffect(() => {
    if (!socket || !user?.id) return;

    const handleNewMessage = (message) => {
      dispatch(newMessage(message));

      const isMyMessage = message.authorId === user.id;
      const isDifferentChat = message.chatId !== currentChatId;

      if (!isMyMessage && isDifferentChat) {
        toast.info(`New message in chat: ${message.text}`, {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
    };

    socket.off('newChatMessage', handleNewMessage); // Видаляємо попередній обробник
    socket.on('newChatMessage', handleNewMessage);

    return () => {
      socket.off('newChatMessage', handleNewMessage);
    };
  }, [user?.id, currentChatId, dispatch]);
  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.topBar}></div>
      <div className={styles.chatListContainer}>
        <ChatMenu />
      </div>
      <div className={styles.chatAreaContainer}>
        {isAuthenticated ? (
          chats.length > 0 ? (
            <ChatArea />
          ) : (
            <div
              className={styles.placeholder}
            >{`You don't have chats yet`}</div>
          )
        ) : (
          <div className={styles.placeholder}>Please log in</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
