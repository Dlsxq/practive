import React, { ReactElement, ReactNode, FC } from "react"
import TimeLine from "../views/timeLine"
import Media from "../views/midal"
import Style from "../views/styleCmp"
import UploadFile from "../views/upload"
import Scroll from "../views/scroll"





interface RouteInterface {
  path: string
  component: ReactElement | ReactNode | FC<any>
  content: string
}


export const routeConf = [
  {
    path: "/Style",
    content: "Style",
    component: (<Style></Style>)
  },
  {
    path: "/er",
    content: "er",
    component: (<div>2</div>)
  },
  {
    path: "uploadFIle",
    component: <UploadFile />,
    content: "上传文件"
  },
  {
    path: "scroll",
    content: "滚动",
    component: <Scroll />
  },

  {
    path: "/sa",
    content: "s",
    component: (<div>3</div>)
  },
  {
    path: "timeline",
    content: "timeLine",
    component: <TimeLine />
  },
  {
    path: "userMedia",
    content: "userMedia",
    component: <Media />
  }
] as RouteInterface[]