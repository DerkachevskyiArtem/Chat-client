import userReducer from './userSlice';
import chatReducer from './chatSlice';

const rootReducer = {
  user: userReducer,
  chat: chatReducer,
};

export default rootReducer;
