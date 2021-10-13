import { routeConf } from "./routeConf"
import React, { FC, useEffect, useMemo } from 'react';
import { Router, Switch, Route, Prompt } from "react-router-dom"
import { globalHistory } from "../store/routeHistory";
import { isGlobalUserLogin } from "../utils";


interface IProps {

}

const RouteHome: FC<IProps> = (
  {

  }
) => {

  let isLogin = isGlobalUserLogin();

  const routeComponents = useMemo(() => {
    return routeConf.map(el => {
      return <Route key={el.path} path={el.path} component={el.component} />
    })
  }, [])

  useEffect(
    () => {
      if (!isLogin) {
        console.log("xxxxxxxx");
        globalHistory.push("/login");
      } else {
        globalHistory.push("/home");
      }
    },
    []
  )

  return (
    <Router history={globalHistory}>
      <Switch>
        {
          routeComponents
        }
      </Switch>
    </Router>
  )
}


export default RouteHome;