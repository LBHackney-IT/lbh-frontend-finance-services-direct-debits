import React from "react";
import { Route, Switch } from "react-router-dom";

import * as RouteConstants from "./routes/RouteConstants";
import * as Views from "./views";
import "./App.css";

const App = (): JSX.Element => (
  <Switch>
    <Route exact path={RouteConstants.HOME}>
      <Views.Home />
    </Route>

    <Route path={`${RouteConstants.SEARCH}/:type/:search/:page`}>
      <Views.Search />
    </Route>

    <Route path={`${RouteConstants.DIRECTDEBIT}/:id/edit`}>
      <Views.DirectDebitEdit />
    </Route>

    <Route path={`${RouteConstants.DIRECTDEBIT}/:id/pause`}>
      <Views.DirectDebitPause />
    </Route>

    <Route path={`${RouteConstants.DIRECTDEBIT}/:id/create`}>
      <Views.DirectDebitCreate />
    </Route>

    <Route path={`${RouteConstants.DIRECTDEBIT}/:id`}>
      <Views.DirectDebitView />
    </Route>

    <Route path={`${RouteConstants.DIRECTDEBIT}`}>
      <Views.DirectDebitList />
    </Route>

    <Route path={`${RouteConstants.PROPERTY}/form/:type`}>
      <Views.PropertyForm />
    </Route>

    <Route path={`${RouteConstants.PROPERTY}/form/:type/:id`}>
      <Views.PropertyForm />
    </Route>

    <Route path={`${RouteConstants.PROPERTY}/:id`}>
      <Views.Property />
    </Route>

    <Route path="/:type/form">
      <Views.TenantForm />
    </Route>

    <Route path="/:type/form/:id">
      <Views.TenantForm />
    </Route>

    <Route path="/:type/:id">
      <Views.TenantSingle />
    </Route>
  </Switch>
);
export default App;
