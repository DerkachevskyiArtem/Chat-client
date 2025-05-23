import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getChats,
  getMessages,
  createNewChat,
  deleteChatById,
  updateChatName,
} from '../../api';
import {
  handlePending,
  handleFulfilled,
  handleRejected,
} from '../../utils/sliceUtils';

const initialState = {
  chats: [],
  currentChat: null,
  isLoading: false,
  error: null,
};

const SLICE_NAME = 'chat';

export const getAllChats = createAsyncThunk(
  `${SLICE_NAME}/getAllChats`,
  async (userId, thunkApi) => {
    try {
      const chats = await getChats(userId);

      const chatsWithLastMessage = chats.map((chat) => ({
        ...chat,
        lastMessage: chat.messages ? chat.messages[0] : null,
      }));

      return chatsWithLastMessage;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  `${SLICE_NAME}/getMessages`,
  async (chatId, thunkApi) => {
    try {
      return await getMessages(chatId);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const createChat = createAsyncThunk(
  'chats/createChat',
  async ({ chatName, userIds }, thunkApi) => {
    try {
      return await createNewChat(chatName, userIds);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const deleteChat = createAsyncThunk(
  'chats/deleteChat',
  async (chatId, thunkApi) => {
    try {
      await deleteChatById(chatId);
      return chatId;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.errors || error.message
      );
    }
  }
);

export const renameChat = createAsyncThunk(
  'chats/renameChat',
  async ({ chatId, newName }, thunkApi) => {
    try {
      const response = await updateChatName(chatId, newName);

      const updatedChat = response.data?.data;

      if (!updatedChat || !updatedChat.id) {
        throw new Error('Chat not updated or chat not found');
      }

      return updatedChat;
    } catch (error) {
      console.error('Error updating chat:', error);
      return thunkApi.rejectWithValue(
        error.response?.data?.errors || error.message
      );
    }
  }
);

const chatSlice = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    selectCurrentChat: (state, action) => {
      state.currentChat = state.chats.find(
        (chat) => chat.id === action.payload
      );
    },
    newMessage: (state, action) => {
      const { chatId } = action.payload;

      if (chatId === state?.currentChat?.id) {
        if (Array.isArray(state.currentChat.messages)) {
          state.currentChat.messages.push(action.payload);
        } else {
          state.currentChat.messages = [action.payload];
        }
        state.currentChat.lastMessage = action.payload;
      }

      const chatIndex = state.chats.findIndex((chat) => chat.id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].lastMessage = action.payload;
      }
    },
    newMessageError: (state, action) => {
      state.error = action.payload;
    },
    resetChats: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, handlePending)
      .addCase(getAllChats.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.chats = action.payload;

        state.chats.forEach((chat) => {
          if (!chat.lastMessage && chat.messages?.length) {
            chat.lastMessage = chat.messages[0];
          }
        });
      })
      .addCase(getAllChats.rejected, handleRejected)

      .addCase(getAllMessages.pending, handlePending)
      .addCase(getAllMessages.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.currentChat.messages = action.payload;
      })
      .addCase(getAllMessages.rejected, handleRejected)

      .addCase(createChat.pending, handlePending)
      .addCase(createChat.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, handleRejected)

      .addCase(deleteChat.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.chats = state.chats.filter((chat) => chat.id !== action.payload);
        if (state.currentChat?.id === action.payload) {
          state.currentChat = null;
        }
      })
      .addCase(deleteChat.pending, handlePending)
      .addCase(deleteChat.rejected, handleRejected)

      .addCase(renameChat.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        const updatedChat = action.payload;

        const chatIndex = state.chats.findIndex(
          (chat) => chat.id === updatedChat.id
        );
        if (chatIndex !== -1) {
          state.chats[chatIndex] = updatedChat; 
        }

        if (state.currentChat?.id === updatedChat.id) {
          state.currentChat.name = updatedChat.name;
        }
      })
      .addCase(renameChat.pending, handlePending)
      .addCase(renameChat.rejected, handleRejected);
  },
});

const { reducer: chatReducer } = chatSlice;

export default chatReducer;
export const { selectCurrentChat, newMessage, newMessageError, resetChats } =
  chatSlice.actions;
