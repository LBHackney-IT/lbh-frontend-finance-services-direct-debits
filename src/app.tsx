import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Switch } from "react-router-dom";

import * as RouteConstants from "./references/RouteConstants";
import * as Views from "./views/Views";
import "./App.css";

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <Switch>
      <Route exact path={RouteConstants.HOME}>
        <Views.Home />
      </Route>

      <Route path={`${RouteConstants.SEARCH}/:type/:search/:page`}>
        <Views.Search />
      </Route>
      <Route
        path={`${RouteConstants.DIRECTDEBIT}${RouteConstants.MANUALSUBMIT}`}
      >
        <Views.DirectDebitManual />
      </Route>
      <Route path={`${RouteConstants.DIRECTDEBITSINGLE}/:id/edit`}>
        <Views.DirectDebitEdit />
      </Route>
      <Route path={`${RouteConstants.DIRECTDEBITSINGLE}/:id/pause`}>
        <Views.DirectDebitPause />
      </Route>
      <Route path={`${RouteConstants.DIRECTDEBITSINGLE}/:id/:prn/create`}>
        <Views.DirectDebitCreate />
      </Route>
      <Route path={`${RouteConstants.DIRECTDEBITSINGLE}/:id`}>
        <Views.DirectDebitView />
      </Route>

      <Route path={`${RouteConstants.DIRECTDEBIT}/:pagination`}>
        <Views.DirectDebitList />
      </Route>
      <Route path={RouteConstants.DIRECTDEBIT}>
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
        <Views.Tenant />
      </Route>
    </Switch>
  </QueryClientProvider>
);
export default App;
