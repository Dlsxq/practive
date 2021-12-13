import { ReactNode, FC, ComponentClass } from "react";
import { LinkedList } from "~/helper";


type RegisterView = FC<Viewer> | ComponentClass<Viewer> ;

export type View = LinkedList<FC<Viewer> | ComponentClass<Viewer> >;

const viewer = new Map<string, View>();


export function registerViewer(appId: string, v: RegisterView) {
  let list = viewer.get(appId);

  if (list === undefined) {
    list = new LinkedList<RegisterView>();
    list.push(v);
    viewer.set(appId, list);
    return;
  }

  list.push(v);

}

export function getViewByAppId(appId: string): View {
  return viewer.get(appId);
}
