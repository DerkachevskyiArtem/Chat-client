import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/userSlice';
import styles from './LoginForm.module.css';

const LoginForm = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login({ email, password })).unwrap();
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className={styles.input}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className={styles.input}
      />
      <button type="submit" className={styles.btn}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
