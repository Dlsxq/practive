import { RouteObject } from "react-router-dom";
import Entry from "~/views/entry";
import Platform from "~/views/platform";



const routerConf = [
  {
    path: "/",
    children: [
      {
        element: <Platform />,
        path: "/",
        index: true
      },
      {
        element: <Entry />,
        path: "entry"
      },
    ]
  }
] as RouteObject[];

export default routerConf;
