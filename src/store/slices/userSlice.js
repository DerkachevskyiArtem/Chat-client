import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const SLICE_NAME = 'user';

const refresh = createAsyncThunk(
  `${SLICE_NAME}/refresh`,
  async (refreshToken, thunkAPI) => {
    try {
      const user = await API.refreshSession(refreshToken);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const login = createAsyncThunk(
  `${SLICE_NAME}/login`,
  async (userData, thunkApi) => {
    try {
      const user = await API.login(userData);
      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

const register = createAsyncThunk(
  `${SLICE_NAME}/registerUser`,
  async (userData, thunkApi) => {
    try {
      const user = await API.registerUser(userData);
      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

const updateUser = createAsyncThunk(
  `${SLICE_NAME}/update`,
  async ({ userData, userId }, thunkAPI) => {
    try {
      const user = await API.updateUser(userId, userData);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    logout: () => {
      API.logout();
      return initialState;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(refresh.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(refresh.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: userReducer, actions } = userSlice;

export default userReducer;
export const { logout, resetUser } = actions;
export { refresh, login, register, updateUser };
