import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice";
import LoadersReducer from "./LoadersSlice";

const Store = configureStore({
  reducer: {
    users: usersReducer,
    loaders: LoadersReducer,
  },
});

export default Store;
