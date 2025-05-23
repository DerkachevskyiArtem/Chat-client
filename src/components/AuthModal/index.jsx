import { useState } from 'react';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';
import styles from './AuthModal.module.css';

const AuthModal = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  // Закриття при кліку по overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          ✖
        </button>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin ? (
          <LoginForm onLoginSuccess={onSuccess} />
        ) : (
          <RegistrationForm onRegistrationSuccess={onSuccess} />
        )}

        <p className={styles.switchText}>
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
          <button onClick={toggleForm} className={styles.switchBtn}>
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
