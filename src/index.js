import React from "react";
import GlobalStyles from "./styles/global.styles";
import App from "./view/App";
import { Provider } from "react-redux";
import store from "./state/configure.store";
import ReactDOM from "react-dom";
import { fetchBots } from "./state/bot.slice";
store.dispatch(fetchBots());
ReactDOM.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
    <GlobalStyles />
  </>,
  document.getElementById("root")
);
