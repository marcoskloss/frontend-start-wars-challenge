import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { HomePage } from ".";
import { PlanetsPage } from './Planets'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/planets" component={PlanetsPage} exact />
      </Switch>
    </BrowserRouter>
  );
};
