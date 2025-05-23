import axios from 'axios';
import CONSTANTS from '../constants';
import { checkToken } from '../utils/tokenUtils';

const httpClient = axios.create({
  baseURL: CONSTANTS.SERVER_URL,
});

let accessTokenInMemory = null;

function setTokens(tokenPair) {
  const { accessToken, refreshToken } = tokenPair;
  accessTokenInMemory = accessToken;
  window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN_KEY, refreshToken);
}

function clearTokens() {
  accessTokenInMemory = null;
  localStorage.removeItem(CONSTANTS.REFRESH_TOKEN_KEY);
}

httpClient.interceptors.request.use(
  async function (config) {
    if (config.url.includes('auth')) {
      return config;
    }

    const refreshTokenFromLS = localStorage.getItem('refreshToken');

    const isAccessValid = checkToken(accessTokenInMemory);
    const isRefreshValid = checkToken(refreshTokenFromLS);

    if (isAccessValid) {
      config.headers.Authorization = `Bearer ${accessTokenInMemory}`;
    } else if (isRefreshValid) {
      const {
        data: {
          data: { tokenPair },
        },
      } = await axios.post(`${CONSTANTS.SERVER_URL}/auth/refresh`, {
        refreshToken: refreshTokenFromLS,
      });

      setTokens(tokenPair);

      config.headers.Authorization = `Bearer ${accessTokenInMemory}`;
    } else {
      clearTokens();
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    if (response?.data?.data?.tokenPair) {
      const { tokenPair } = response.data.data;

      setTokens(tokenPair);
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export async function registerUser(userData) {
  const response = await httpClient.post('/auth/registration', userData);

  const {
    data: {
      data: { user },
    },
  } = response;

  return user;
}

export async function login(userData) {
  const {
    data: {
      data: { user },
    },
  } = await httpClient.post('/auth/login', userData);

  return user;
}

export const logout = () => {
  clearTokens();
};

export async function refreshSession(refreshToken) {
  const {
    data: {
      data: { user },
    },
  } = await httpClient.post('/auth/refresh', { refreshToken });

  return user;
}

export async function getUser(userId) {
  const response = await httpClient.get(`/users/${userId}`);

  const {
    data: { data: user },
  } = response;

  return user;
}

export const getChats = async (userId) => {
  const {
    data: { data },
  } = await httpClient.get(`/chats/users/${userId}`);
  return data;
};

export const getMessages = async (chatId) => {
  const {
    data: { data },
  } = await httpClient.get(`/chats/${chatId}/messages`);

  return data;
};

export const createNewChat = async (chatName, userIds) => {
  const {
    data: { data: chat },
  } = await httpClient.post('/chats', { name: chatName, userIds });

  return chat;
};


export const deleteChatById = (chatId) => {
  return httpClient.delete(`/chats/${chatId}`);
};

export const updateChatName = (chatId, newName) => {
  console.log(chatId, newName);
  return httpClient.put(`/chats/${chatId}`, { name: newName });
};
