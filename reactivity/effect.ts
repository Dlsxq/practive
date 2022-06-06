import { Dict } from "./reactive";



let currentFrameActiveEffect: ReactiveEffect = null;
import { nextTick } from "./nextTick";

const subKeyMap = new Map<string, Set<ReactiveEffect>>();
const targetMap = new WeakMap<Dict, typeof subKeyMap>();

export function trick(target: Dict, key) {

  if (currentFrameActiveEffect === null) {
    return;
  }

  let subKeyMap = targetMap.get(target);

  if (subKeyMap === undefined) {
    targetMap.set(target, (subKeyMap = new Map<string, Set<ReactiveEffect>>()));
  }

  let keyDeps = subKeyMap.get(key);
  if (keyDeps === undefined) {
    subKeyMap.set(key, (keyDeps = new Set()));
  }

  keyDeps.add(currentFrameActiveEffect);
}

export function trggire(target: Dict, key, newValue, oldValue) {
  let subKeyMap = targetMap.get(target);
  if (subKeyMap === undefined) {
    return;
  }

  let keyDeps = subKeyMap.get(key);

  if (keyDeps === undefined) {
    return;
  }

  let effects = Array.from(keyDeps);
  nextTick(() => {
    effects.forEach(ef => ef.run());
  });
}


class ReactiveEffect {
  private parent: ReactiveEffect = null;
  private active = true;


  constructor(private callback: Function) {

  }

  runWithAsync() {
    nextTick(this.run.bind(this));
  }

  run() {

    if (!this.active) {
      return this.callback();
    }
    try {
      this.parent = currentFrameActiveEffect;
      currentFrameActiveEffect = this;

      return this.callback();
    } catch (exx) {
      console.log(exx);
    } finally {
      currentFrameActiveEffect = this.parent;
    }

  }

  stop() {
    this.active = false;
  }
}


export function effect(fn: Function) {

  let effectInstce = new ReactiveEffect(fn);
  effectInstce.run();
}


export function watchEffect(watch:Function,fn:Function) {
  let effectInstce = new ReactiveEffect(() => {
    //! 只有在第一次时候执行
    watch();
    fn();
  });

  effectInstce.run();
}