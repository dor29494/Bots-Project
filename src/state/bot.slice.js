import { createSlice } from "@reduxjs/toolkit";
import { get_all_robots } from "../api/Robo.service";

const botSlice = createSlice({
  name: "bot",
  initialState: {
    all_robots: [],
    filtered_robots: [],
    selected_bot: {},
    loading_robots: false,
    error_msg: "",
    email_list: [],
  },
  reducers: {
    update_profile: (state, action) => {
      return {
        ...state,
        selected_bot: action.payload
      };
    },
    update_register_email: (state, action) => {
      return {
        ...state,
        email_list: [...state.email_list,action.payload]
      };
    },
    filter_list: (state, action) => {
      return {
        ...state,
        filtered_robots: action.payload
      };
    },
    fetch_robots_start: (state, action) => {
      return {
        ...state,
        loading_robots: true,
      };
    },
    fetch_robots_success: (state, action) => {
      return {
        ...state,
        all_robots: action.payload,
        filtered_robots: action.payload,
        selected_bot: action.payload[0],
        loading_robots: false,
      };
    },
    fetch_robot_fail: (state, action) => {
      return {
        ...state,
        error_msg: action.payload,
        loading_robots: false
      };
    },
    create_bot: (state, action) => {
      return {
        ...state,
        all_robots: [...state.filtered_robots, action.payload],
        filtered_robots: [...state.filtered_robots, action.payload],
        selected_bot: action.payload
      };
    }
  }
});
export const {
  update_profile,
  create_bot,
  fetch_robot_fail,
  fetch_robots_start,
  fetch_robots_success,
  filter_list,
  update_register_email,
} = botSlice.actions;
export default botSlice.reducer;


export const fetchBots = () => async (dispatch) => {
  try {
    dispatch(fetch_robots_start());
    const data = await get_all_robots();
    dispatch(fetch_robots_success(data));
  } catch (err) {
    dispatch(fetch_robot_fail(err.message));
  }
};
