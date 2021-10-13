import React, { FC } from 'react';
import RouteHome from "./routes";
import { globalHistory } from './store/routeHistory';
import {remove} from "./utils"

interface IProps {
  
}

const App: FC<IProps> = (
{

}
) => {


  return (
    <section>
      <button onClick={() => {
        remove("user")
        globalHistory.replace("/login")
      }} >退出登陆</button>
      <RouteHome/>
    </section>
  )
}


export default App;