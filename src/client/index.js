import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";
import routes from "../routes";
import { getClientStore } from "../store";
import { renderRoutes } from "react-router-config";

hydrate(
  <Provider store={getClientStore()}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>,
  window.root
);
