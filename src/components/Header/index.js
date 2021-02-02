import React from "react";
import { Link } from "react-router-dom";
// import "./style.less";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">REACT-SSR</a>
          </div>
          <div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="/news">新闻</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
