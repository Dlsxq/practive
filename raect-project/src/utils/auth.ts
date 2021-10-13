import { getSession } from "./io";


export function isGlobalUserLogin() {
  let r = getSession("user");
  return !(r === null || r === "null")
}

