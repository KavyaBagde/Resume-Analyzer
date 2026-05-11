import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  loading: false,
  error: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      state.user = {
        ...user,

        // 🔥 SAFE DEFAULTS (important for old users)
        credits: user?.credits ?? 0,
        plan: user?.plan ?? "free",
      };

      state.isAuthenticated = true;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    // 🔥 OPTIONAL: real-time credit deduction (UX improvement)
    deductCredits: (state, action) => {
      if (state.user) {
        state.user.credits -= action.payload;
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },

    updateUser: (state, action) => {
      if (action.payload.credits !== undefined) {
        state.user.credits = action.payload.credits;
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  logout,
  setInitialized,
  deductCredits,
  updateUser, // 🔥 export this
} = authSlice.actions;

export default authSlice.reducer;
