import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import TopBar from "./TopBar";
import HomePage from "./HomePage";
import RoboBrowser from "./RoboBrowser";
import CreateBot from "./CreateBot1";
import Links from "./MainNav";

const App = () => (
  <BrowserRouter>
    <div>
      <TopBar>
        <Links />
      </TopBar>
      <Route exact path="/" component={HomePage} />
      <Route path="/browse" component={RoboBrowser} />
      <Route path="/create" component={CreateBot} />
    </div>
  </BrowserRouter>
);
export default App;
