import { createSlice, configureStore } from "@reduxjs/toolkit";

const logoutMiddleware = (store) => (next) => (action) => {
  if (action.type === authActions.logout.type) {
    localStorage.removeItem("userId");
    console.log("logoutmiddleware is called");
    // ... Any other side effects you want to handle
  }
  return next(action);
};

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logoutMiddleware),
});
