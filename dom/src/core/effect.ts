import { Hooks, createEffect } from "../interface";


export let activeHooks: { activeHooks: Hooks } = {
  activeHooks: null
};

export function mountEffect(hook, hookName: keyof Hooks) {

  let curr = activeHooks.activeHooks[hookName];
  if (curr === null || curr === undefined) {
    activeHooks.activeHooks[hookName] = hook;
    return
  }
  let currentEffect = curr[hookName];
  if (currentEffect === null || currentEffect === undefined) {
    activeHooks.activeHooks[hookName] = hook;
    return
  }
  while (currentEffect.next !== null) {
    currentEffect = currentEffect.next;
  }
  currentEffect.next = hook;
}

export function onMountd(fn: () => any) {
  let hook = createEffect(fn);
  mountEffect(hook, "mountd")
}

export function useState(initialize) {
  let hook = createEffect(initialize);
  mountEffect(hook, "state")
  function setState(c) {
    // a = c;
    console.log(activeHooks.activeHooks, c);
  }


  return [hook.effect, setState]
}