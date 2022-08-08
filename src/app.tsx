import React from "react";
import { Route, Switch } from "react-router-dom";

import * as RouteConstants from "./routes/RouteConstants";

import DirectDebitCreate from "./views/DirectDebitCreate";
import DirectDebitEdit from "./views/DirectDebitEdit";
import DirectDebitList from "./views/DirectDebitList";
import DirectDebitPause from "./views/DirectDebitPause";
import DirectDebitView from "./views/DirectDebitView";
import Home from "./views/Home";
import Property from "./views/Property";
import PropertyForm from "./views/PropertyForm";
import Search from "./views/Search";
import Tenant from "./views/Tenant";
import TenantForm from "./views/TenantForm";
import "./App.css";

const App = (): JSX.Element => (
  <Switch>
    <Route exact path={RouteConstants.HOME}>
      <Home />
    </Route>
    <Route path={`${RouteConstants.SEARCH}/:type/:search/:page`}>
      <Search />
    </Route>

    <Route path={`${RouteConstants.DIRECTDEBIT}/:id/edit`}>
      <DirectDebitEdit />
    </Route>
    <Route path={`${RouteConstants.DIRECTDEBIT}/:id/pause`}>
      <DirectDebitPause />
    </Route>
    <Route path={`${RouteConstants.DIRECTDEBIT}/:id/create`}>
      <DirectDebitCreate />
    </Route>
    <Route path={`${RouteConstants.DIRECTDEBIT}/:id`}>
      <DirectDebitView />
    </Route>
    <Route path={`${RouteConstants.DIRECTDEBIT}`}>
      <DirectDebitList />
    </Route>

    <Route path={`${RouteConstants.PROPERTY}/form/:type`}>
      <PropertyForm />
    </Route>
    <Route path={`${RouteConstants.PROPERTY}/form/:type/:id`}>
      <PropertyForm />
    </Route>
    <Route path={`${RouteConstants.PROPERTY}/:id`}>
      <Property />
    </Route>

    <Route path=":type/form">
      <TenantForm />
    </Route>
    <Route path=":type/form/:id">
      <TenantForm />
    </Route>
    <Route path=":type/:id">
      <Tenant />
    </Route>
  </Switch>
);
export default App;
