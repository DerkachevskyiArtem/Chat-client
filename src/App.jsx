import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserContext } from './contexts';
import CONSTANTS from './constants';
import { refresh } from './store/slices/userSlice';
import ChatPage from './pages/ChatsPage';

function App() {
  const { user } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN_KEY);

    if (refreshToken) {
      dispatch(refresh(refreshToken));
    }
  }, []);

  return (
    <UserContext.Provider value={[user]}>
      <ChatPage />
      <ToastContainer position="bottom-right" autoClose={3000} limit={3} />
    </UserContext.Provider>
  );
}

export default App;
