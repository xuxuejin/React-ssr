import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import clientAxios from "../client/request";
import serverAxios from "../server/request";

export const getServerStore = (req) => {
  //   console.log(req);
  //   return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(serverAxios)))
  );
};

export const getClientStore = () => {
  const initState = window.context.state;

  return createStore(
    reducers,
    initState,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(clientAxios), logger)
    )
  );
};
