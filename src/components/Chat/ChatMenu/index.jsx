import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import { logout } from '../../../store/slices/userSlice';
import { resetChats } from '../../../store/slices/chatSlice';
import ChatList from './ChatList';
import ChatFormModal from '../CreateChatModal';
import ChatSearch from '../ChatSearch';
import AuthModal from '../../AuthModal/';
import RandomMessageButton from '../../RandomButton';
import generateInitialsImage from '../../../utils/avatarUtils';
import styles from './ChatMenu.module.css';

const ChatMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { chats, isLoading, error } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const filteredChats = useMemo(() => {
    if (!searchTerm) return chats;
    return chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [chats, searchTerm]);

  const handleOpenAuthModal = () => setIsAuthModalOpen(true);
  const handleCloseAuthModal = () => setIsAuthModalOpen(false);
  const handleOpenChatModal = () => setIsChatModalOpen(true);
  const handleCloseChatModal = () => setIsChatModalOpen(false);

  const handleLogoutClick = () => {
    dispatch(logout());
    dispatch(resetChats());
  };

  const handleSuccessLogin = () => {
    setIsAuthModalOpen(false);
    dispatch(resetChats());
  };

  const avatarImageSrc = generateInitialsImage(
    user?.id
      ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'
      : 'Guest'
  );

  return (
    <div className={styles.chatContainer}>
      <div className={styles.topBarContainer}>
        <div className={styles.topBar}>
          <div className={styles.avatar}>
            <img
              src={avatarImageSrc}
              alt="User Avatar"
              className={styles.avatarImage}
            />
          </div>

          <button
            className={styles.loginBtn}
            onClick={user?.id ? handleLogoutClick : handleOpenAuthModal}
          >
            {user?.id ? 'Logout' : 'Login / Register'}
          </button>
        </div>

        {user?.id && (
          <div className={styles.chatSearch}>
            <ChatSearch onSearch={setSearchTerm} />
          </div>
        )}
      </div>

      <div className={styles.chatContent}>
        {isLoading && <p>Loading chats...</p>}
        {error && <p>Error: {error}</p>}

        <div className={styles.chatList}>
          <ChatList chats={filteredChats} />
        </div>
      </div>

      {user?.id && (
        <div className={styles.footer}>
          <button onClick={handleOpenChatModal}>Create Chat</button>
          <div className={styles.randomMessage}>
            <RandomMessageButton userId={user.id} />
          </div>
        </div>
      )}

      {isChatModalOpen && <ChatFormModal onClose={handleCloseChatModal} />}

      {isAuthModalOpen && (
        <AuthModal
          onClose={handleCloseAuthModal}
          onSuccess={handleSuccessLogin}
        />
      )}
    </div>
  );
};

export default ChatMenu;
