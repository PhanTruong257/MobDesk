import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoredUser } from '../types/StoreUser';

// Auth state interface
interface AuthState {
  userInfo: StoredUser | null;
  isAuthenticated: boolean;
}

// Safe localStorage parsing
const getUserFromStorage = (): StoredUser | null => {
  try {
    const storedUser = localStorage.getItem('user'); // Sử dụng 'user' thay vì 'userInfo'
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    localStorage.removeItem('user');
    return null;
  }
};

const initialState: AuthState = {
  userInfo: getUserFromStorage(),
  isAuthenticated: !!getUserFromStorage()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<StoredUser>) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Sử dụng 'user'
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      // Clear all auth-related data
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    updateUser: (state, action: PayloadAction<Partial<StoredUser>>) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.userInfo));
      }
    }
  }
});

export const { setCredentials, logout, updateUser } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.userInfo;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsAdmin = (state: { auth: AuthState }) => 
  state.auth.userInfo?.role === 'admin';

export default authSlice.reducer;