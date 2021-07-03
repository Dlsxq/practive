
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

export type ViewType = string | ((...args: any[]) => VNode)

export class VNode<T = ViewType> {

  key: any = null;

  hooks: Hooks = {}

  // tag - func
  miniType: string = null;

  // 是否静态
  static: boolean = false;

  // tag - func
  type: T = null;

  // 属性
  props: Record<string, any> = {};

  // 文本
  text: string = null;
  firstChild: VNode = null;
  lastChild: VNode = null;

  // 父节点
  parentNode: VNode = null;
  // 下一个兄弟元素
  nextSibling: VNode = null;
  prevSibling: VNode = null;
}



export function createVnodeStruct() {
  return new VNode()
}