



export interface Hooks {
  onMountd?(): void
}

export type ViewType = string | ((...args: any[]) => VNode)

export class VNode {

  key: any = null;

  hooks: Hooks = {}

  // tag - func
  miniType: string = null;

  // 是否静态
  static: boolean = false;

  // tag - func
  type: ViewType = null;

  // 属性
  props: Record<string, any> = null;

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