import { ReactElement, ReactNode, useMemo } from "react";
import { RouteObject, Route, Routes } from "react-router-dom";



function createRoute(route: RouteObject) {

  return <Route path={route.path} key={route.path} element={route.element as ReactElement} children={route.children} />;
}




/**
 * todo:useRoutes 暂时有bug， 先自己写
 * @param routerConf router
 * @returns Node
 */
export function useRoutes(routerConf: RouteObject[]): ReactNode {

  return useMemo(() => {
    return routerConf.map(router => <Routes key={router.path} children={Array.isArray(router.children) ? router.children.map(route => createRoute(route)) : createRoute(router)} />);
  }, []);
}