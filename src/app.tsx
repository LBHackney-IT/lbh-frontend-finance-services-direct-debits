import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css'
import * as Views from "./views";

const App = (): JSX.Element => (
  <>
    <Switch>
      <Route path="/" exact>
        <Views.Home />
      </Route>

      <Route path='/operating-balances'> 
        <Views.OperatingBalances /> 
      </Route>
      

      <Route path='/individual-lookup/:searchId/:search'>
        <Views.IndividualLookup />
      </Route>

      <Route path='/individual-lookup'>
        <Views.IndividualLookup />
      </Route>
      
      <Route path='/individual-lookup-payments/:tenancyAgreementRef'>
        <Views.IndividualLookupPayments />
      </Route>
      <Route path='/report/charges'>
        <Views.ReportCharges />
      </Route>
      
      <Route exact path='/report'>
        <Views.Report />
      </Route>

      <Route path='/report/cash'>
        <Views.ReportCash />
      </Route>

      <Route path='/report/housing-benefit/academy'>
        <Views.ReportHousingBenefitAcademy />
      </Route>
      <Route path='/report/cash-suspense'>
        <Views.ReportSuspenseAccounts />
      </Route>

      <Route path='/report/account-balance'>
        <Views.ReportAccountBalance />
      </Route>

      <Route path='/batch-log'>
        <Views.BatchLog />
      </Route>

    </Switch>
  </>
)
export default App