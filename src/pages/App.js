import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { HomePage } from ".";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
      </Switch>
    </BrowserRouter>
  );
};
