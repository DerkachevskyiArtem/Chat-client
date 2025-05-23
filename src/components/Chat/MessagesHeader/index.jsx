import PropTypes from 'prop-types';
import styles from './MessagesHeader.module.css';
import { getInitials, getColorFromName } from '../../../utils/avatarUtils';

const MessagesHeader = ({ chatName, chatImageSrc }) => {
  const initials = getInitials(chatName);
  const color = getColorFromName(chatName);

  return (
    <div className={styles.header}>
      <div className={styles.chatInfo}>
        <div className={styles.avatar} style={{ backgroundColor: color }}>
          {chatImageSrc ? (
            <img src={chatImageSrc} alt="Chat Avatar" />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <span className={styles.chatName}>{chatName}</span>
      </div>
    </div>
  );
};

MessagesHeader.propTypes = {
  chatName: PropTypes.string.isRequired,
  chatImageSrc: PropTypes.string,
  onEditClick: PropTypes.func,
};

export default MessagesHeader;
