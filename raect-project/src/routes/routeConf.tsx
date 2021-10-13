import { RouterTypes } from "../interface";
import Home from "../views/home";
import Abort from "../views/abort";
import Login from "../views/login";


const routeConf: RouterTypes.RoutePage[] = [
  {
    path: "/abort",
    component: Abort
  },
  {
    path: "/home",
    component: Home
  },
  {
    path:"/login",
    component:Login,
    isProform:true
  }
]


export {
  routeConf
}