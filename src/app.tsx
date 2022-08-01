import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import * as Views from "./views";

const App = (): JSX.Element => (
  <Switch>
    <Route path="/" exact>
      <Views.HomeView />
    </Route>
  </Switch>
);
export default App;
