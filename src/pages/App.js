import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { HomePage } from ".";
import { PlanetsPage } from "./Planets";
import { SpeciesPage } from "./Species";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/planets" component={PlanetsPage} exact />
        <Route path="/species" component={SpeciesPage} exact />
      </Switch>
    </BrowserRouter>
  );
};
