import { RouteObject } from "react-router-dom";
import Entry from "~/layout/entry";
import Platform from "~/layout/platform";



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
