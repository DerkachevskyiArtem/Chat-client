import PropTypes from 'prop-types';
import styles from './MessageItem.module.css';
import { getInitials } from '../../../../../utils/avatarUtils';
import { useSelector } from 'react-redux';

const MessageItem = ({ message }) => {
  const { text, author, createdAt } = message;
  const currentUser = useSelector((state) => state.user.user);

  const isCurrentUser = currentUser?.id === author?.id;
  const isBot = author?.lastName === 'Bot';

  const initials = isBot
    ? '🤖'
    : author?.firstName || author?.lastName
    ? getInitials(`${author.firstName || ''} ${author.lastName || ''}`)
    : '🤖'; //

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <li
      className={`${styles.messageItem} ${
        isCurrentUser ? styles.myMessage : styles.theirMessage
      }`}
    >
      <div className={styles.avatar}>{initials}</div>
      <div className={styles.messageContent}>
        <div className={styles.authorName}>
          {author?.firstName} {author?.lastName}
        </div>
        <div className={styles.text}>{text}</div>
        <div className={styles.timestamp}>{formatTimestamp(createdAt)}</div>
      </div>
    </li>
  );
};

MessageItem.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      isBot: PropTypes.bool,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageItem;
