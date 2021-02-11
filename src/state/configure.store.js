import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  save_state_locally,
  get_local_state
} from "../state/middleware/localstorage.middleware";
import logger from "../state/middleware/log.middlware";
import BotReducer from "./bot.slice";

const store = configureStore({
  reducer: {
    bots: BotReducer
  },
  preloadedState: get_local_state(),
  devTools: process.env.NODE_ENV !== "production",
  middleware: [...getDefaultMiddleware(),save_state_locally]
});
export default store;
