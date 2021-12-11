import { activeAppSet } from "~/store";


export function isAppActive(app:Application) {
  return activeAppSet.has(app);
}