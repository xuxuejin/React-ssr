import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { getServerStore } from "../store";
import routes from "../routes";
import { matchRoutes, renderRoutes } from "react-router-config";
import StyleContext from "isomorphic-style-loader/StyleContext";

export default (req, res) => {
  const context = {
    csses: [],
  };
  const store = getServerStore(req);
  const promises = [];

  //   const css = new Set(); // CSS for all rendered React components
  //   const insertCss = (...styles) =>
  //     styles.forEach((style) => css.add(style._getCss()));

  //   console.log(insertCss());

  const matchedRoutes = matchRoutes(routes, req.path);

  matchedRoutes.forEach((item) => {
    const loadData = item.route.loadData;
    if (loadData) {
      const promise = new Promise((resolve) => {
        loadData(store).then(resolve).catch(resolve);
      });
      promises.push(promise);
    }
  });

  Promise.all(promises).then(() => {
    let domContent = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );

    let cssStr = context.csses.length ? context.csses.join("\n") : "";

    let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link href="https://cdn.bootcss.com/twitter-bootstrap/3.4.1/css/bootstrap.css" rel="stylesheet">
  <title>react-ssr</title>
  </head>
  <body>
  <div id="root">${domContent}</div>
  <script>
  window.context = {
    state: ${JSON.stringify(store.getState())}
  }
  </script>
  <script src="/client.js"></script>
  </body>
  </html>
    `;
    res.send(html);
  });
};
