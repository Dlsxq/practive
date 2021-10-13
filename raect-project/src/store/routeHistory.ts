import { createBrowserHistory } from "history";
import { globalEventGetListenerOne } from "../store/event";
import { isGlobalUserLogin } from "../utils";

const globalHistory = createBrowserHistory({
  getUserConfirmation(message: string, cb: (ok: boolean) => void) {
    cb(false)
  }
})

let basePush = globalHistory.push;
globalHistory.push = function (path: string, state?: unknown) {
  let islogin = isGlobalUserLogin();
  
  if (path === "/login" && islogin) {
    console.log("1");
    return
  }

  if (!islogin){
    basePush("/login")
    return
  }

  let currentPath = globalHistory.location.pathname;
  let listener = globalEventGetListenerOne(currentPath);
  if ((listener?.(null) as boolean) ?? false) {
    return
  }

  basePush(path, state)
}

export {
  globalHistory
}