import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../../../store/slices/chatSlice';
import styles from './CreateChatModal.module.css';

const CreateChatModal = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?.id);

  const handleCreateChat = () => {
    if (userId && firstName && lastName) {
      const chatName = `${firstName} ${lastName}`;
      dispatch(
        createChat({ chatName, userIds: [userId], firstName, lastName })
      );
      onClose();
    }
  };

  if (!userId) {
    return (
      <div className={styles.emptyMessages}>Please login to create a chat</div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create a new chat</h2>

        <div className={styles.inputGroup}>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleCreateChat} disabled={!firstName || !lastName}>
            Create Chat
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;
