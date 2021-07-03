


const events = new Map<any, Set<(...args: any) => any>>();



export function set(evName, cb) {
  let set = events.get(evName);
  if (set == null) {
    events.set(evName, new Set([cb]))
    return;
  }
  set.add(cb);
}


export function initRootContainerEvents(container: HTMLElement) {
  container.addEventListener("click", (e) => {
    events.get("evt").forEach(evl => evl())
  })
}