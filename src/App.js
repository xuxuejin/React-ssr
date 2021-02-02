import React from "react";
import { renderRoutes } from "react-router-config";
import Header from "./components/Header";

const App = (props) => {
  return (
    <div className="main">
      <Header />
      <div className="wrap">{renderRoutes(props.route.routes)}</div>
    </div>
  );
};

export default App;
