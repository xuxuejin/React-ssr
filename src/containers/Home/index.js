import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as UserActions from "../../store/user/createActions";
import styles from "./style.less";

console.log(styles);
// console.log("styles._getContent()", styles._getContent());
// console.log("styles._getCss()", styles._getCss());

const Home = (props) => {
  console.log("props", props);
  //   console.log(styles._getCss());
  const { name, age, schoolList, dispatch } = props;
  const [number, setNumber] = useState(0);
  const handleClick = () => {
    alert(123);
  };

  if (props.staticContext) {
    // console.log("服务端", styles._getContent());
    props.staticContext.csses.push(styles._getCss());
  }

  //   console.log(
  //     "props.staticContext++++++++++++++++++++++++++++++++",
  //     props.staticContext
  //   );

  //   useEffect(() => {
  //     if (props.staticContext) {
  //       console.log(styles._getCss());
  //     }
  //     console.log(
  //       "++++++++++++++++++++++++++++++props.staticContext",
  //       props.staticContext
  //     );
  //   }, []);

  //   if (props.staticContext) {
  //     props.staticContext.csses.push(styles._getCss());
  //   }

  const incrementAge = () => {
    dispatch(UserActions.incrementAge());
  };

  const getSchoolList = () => {
    dispatch(UserActions.getSchoolList());
  };
  useEffect(() => {
    if (!schoolList.length) {
      // 服务端注水失败，客户端重新请求数据
      dispatch(UserActions.getSchoolList());
    }
  }, []);

  return (
    <div>
      {/* <div className={styles.homeWrap}> */}
      {/* <h2 className={styles.title}>HELLO, HOME PAGE</h2> */}
      <h2>HELLO, HOME PAGE</h2>
      {/* <h2 className={styles.btnWrap}> */}
      <h2>
        <button className="btn btn-primary" onClick={handleClick}>
          click
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>{number}</span>
      </h2>
      <ul className="list-group">
        <li className="list-group-item">name: {name}</li>
        <li className="list-group-item">
          <button className="btn btn-primary" onClick={incrementAge}>
            increment age
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>{age}</span>
        </li>
      </ul>
      <h2>
        <button className="btn btn-primary" onClick={getSchoolList}>
          schoolList
        </button>
      </h2>
      <ul className="list-group">
        {schoolList.length > 0 &&
          schoolList.map((school) => (
            <li key={school.id} className="list-group-item">
              {school.id}. {school.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

Home.getInitialState = (store) => {
  return store.dispatch(UserActions.getSchoolList());
};

export default connect(({ user }) => user)(Home);
