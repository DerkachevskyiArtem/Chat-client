import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  selectCurrentChat,
  renameChat,
  deleteChat,
} from '../../../../../store/slices/chatSlice';
import generateInitialsImage from '../../../../../utils/avatarUtils';
import styles from './ChatItem.module.css';

const ChatItem = ({ chat }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(chat?.name || '');

  useEffect(() => {
    setNewName(chat?.name);
  }, [chat]);

  const handleRename = () => {
    if (!chat?.id || !newName.trim()) return;
    dispatch(renameChat({ chatId: chat.id, newName: newName.trim() }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`You are sure you want to delete chat: "${chat.name}"?`)) {
      dispatch(deleteChat(chat.id));
    }
  };

  return (
    <li
      className={styles.chatItem}
      onClick={() => !isEditing && dispatch(selectCurrentChat(chat.id))}
    >
      <div className={styles.chatInfo}>
        <img
          src={chat.img_src || generateInitialsImage(chat.name)}
          alt="Chat Avatar"
          className={styles.chatAvatar}
        />
        {isEditing ? (
          <div className={styles.editContainer}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
              className={styles.input}
            />
            <div className={styles.actionButtons}>
              <button onClick={handleRename} className={styles.saveButton}>
                💾
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={styles.cancelButton}
              >
                ❌
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.chatDetails}>
              <div className={styles.chatHeader}>
                <span className={styles.chatName}>{chat.name}</span>
                {chat?.lastMessage?.createdAt && (
                  <span className={styles.chatLastMessageDate}>
                    {new Date(chat.lastMessage.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              {chat?.lastMessage?.text ? (
                <span className={styles.lastMessageText}>
                  {chat.lastMessage.text}
                </span>
              ) : (
                <span className={styles.noMessages}>No messages</span>
              )}
            </div>
            <div
              className={styles.actionButtons}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsEditing(true)}
                className={styles.editButton}
              >
                ✏️
              </button>
              <button onClick={handleDelete} className={styles.deleteButton}>
                🗑️
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default ChatItem;
