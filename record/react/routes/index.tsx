import React, { FC, useEffect, useMemo, useState } from 'react';
import "./index.style.less"
import { routeConf } from "./routeConf"
import { read, write } from "../utils"

interface IProps {

}

const ioKey = "path"

const Index: FC<IProps> = (
  {

  }
) => {


  const [activePath, setPath] = useState(read(ioKey))

  useEffect(() => write(ioKey, activePath), [activePath])

  const checkoutViews = (path: string) => {
    setPath(path)
  }

  const [routeMenu, cmp] = useMemo(() => {
    let cmp = new Map();
    let routeMenu = routeConf.map(route => {
      cmp.set(route.path, route.component)
      return (
        <div className="route-item" key={route.path} onClick={() => checkoutViews(route.path)}>{route.content}</div>
      )
    })
    return [routeMenu, cmp]
  }, [])
  //  < section className = "route-views" >
  //
  return (
    <>
      <section className="route-menu">
        {routeMenu}
      </section>
      <main className="route-main">
        {cmp.get(activePath)}
      </main>
    </>
  )
}

export default Index;