
export class Effect<T = (...args) => any> {
  effect: T;
  next: Effect = null;
  constructor(fn?: T) {
    this.effect = fn;
  }
}
export function createEffect(fn) {
  return new Effect(fn);
}

export interface Hooks {
  mountd?: Effect
  state?: Effect<any>
}

export type ViewType = string | ((...args: any[]) => Element$)
export class Element$<T = ViewType> {
  key: any = null;

  static: boolean = false;
  type: T = null;
  props: Record<string, any> = {};

  // 文本
  text: string = null;
  children: any[] = []
}

export function createElement() {
  return new Element$()
}



export class Vnode {
  originalElement: Element$ = null;

  parent: Vnode = null;
  nextSibing: Vnode = null;
  prevSibing: Vnode = null;
  firstChild: Vnode = null;
}