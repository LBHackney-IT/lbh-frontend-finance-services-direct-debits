import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

const Home = () => {
  return <h1>Home</h1>;
};

const App = (): JSX.Element => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
  </Switch>
);
export default App;
