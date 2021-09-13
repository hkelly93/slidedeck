import React from "react";
import { Router, Route, Switch } from "react-router-dom";

export const buildPath = (index: number): string =>
  `/${index === 0 ? "" : index}`;

const buildRoutes = (components: Array<any>) =>
  components.map((component, index) => {
    const path = buildPath(index);

    // @ts-ignore
    return <Route key={path} path={path} component={() => component} exact />;
  });

export const configureRouter = (history: any, components: Array<any>) => (
  <Router history={history}>
    <Switch>{buildRoutes(components)}</Switch>
  </Router>
);
