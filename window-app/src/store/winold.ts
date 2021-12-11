// import { winChannel, WindowEventType } from "~/events/winChannel";
// import { ActiveAppInfo, deepClone, getActiveAppInfo } from ".";



// export enum ActiveWindowStatus {
//   hidden = "hidden",
//   visible = "visible",
//   cancel = "cancel",
// }

// export interface ActiveWindow {
//   status: ActiveWindowStatus;
//   position: {
//     x: number; y: number;
//   };
//   themeStyle?: {
//     background?: string;
//   };
//   appInstance: Application;
//   hidden(nextWin?: Partial<ActiveWindow>): void;
//   // has(nextWin?: Partial<ActiveWindow>): void;
// }

// export const activeAppWindow = new WeakMap<Application, Set<ActiveWindow>>();


// // @ 开启一个窗口
// export function startActiveWindow(
//   app: Application,
//   win: ActiveWindow,
  
// ) {

//   let set = activeAppWindow.get(app);
//   if (set === undefined) {
//     activeAppWindow.set(app, (set = new Set()));
//   }

//   set.add(win);
//   // appInfo.bindWindow.push(win);
//   // 计算窗口优先级
// }

// // 关闭一个窗口
// export function cancelActiveWindow(app: Application, win: ActiveWindow) {
//   activeAppWindow.get(app).delete(win);

//   // 计算窗口优先级
//   // 触发事件
// }

// export function clearActiveWindow(app: Application, win: ActiveWindow) {
//   activeAppWindow.set(app, new Set());
//   // 计算窗口优先级
//   // 触发事件
// }

// export function hasWindowActive(app, win) {
//   return activeAppWindow.get(app).has(win)
// }


// export function getAllActiveWindow(appList: Application[]): ActiveWindow[] {
// console.log(activeAppWindow);
//   let res = [];

//   for (let i = 0, len = appList.length;i < len;i++) {
//     let app = appList[i];
//     res = res.concat(Array.from(activeAppWindow.get(app)).filter(win => win.status === ActiveWindowStatus.visible));
//   }
// console.log(res);
//   return res;
// }



// const empty = () => { };
// function hidden(winSource: ActiveWindow, nextWin: ActiveWindow) {
//   // 删除旧的source
//   console.log(activeAppWindow.get(winSource.appInstance).has(winSource),"001");
//   activeAppWindow.get(winSource.appInstance).delete(winSource);
//   console.log(activeAppWindow.get(winSource.appInstance).has(winSource),"001");
//   console.log(activeAppWindow.get(winSource.appInstance),"001");


//   let nextWinSource: ActiveWindow = {
//     position: {
//       ...(nextWin.position ?? winSource.position)
//     },
//     themeStyle: {
//       ...(nextWin.themeStyle ?? winSource.themeStyle)
//     },
//     status: ActiveWindowStatus.hidden,
//     appInstance: winSource.appInstance,
//     hidden: winSource.hidden
//   };

//   winSource = nextWinSource;


//   activeAppWindow.get(winSource.appInstance).add(winSource);
// console.log(winSource,"00");

//   // winSource.appInstance

//   // let info = getActiveAppInfo(winSource.appInstance)
//   // info.bindWindow.map(el => {
//   //   if (el )
//   //   return el;
//   // })



//   winChannel.dispatch({ type: WindowEventType.change, emitType: "sync" }, winSource.appInstance, winSource);
// }



// export function bindWindowFromApplication(app: Application) {


//   let winInfo: ActiveWindow = {
//     status: ActiveWindowStatus.visible,
//     position: {
//       x: app.position.x, y: app.position.y
//     },
//     appInstance: app,
//     hidden: empty,
//     // has:empty
//   };

//   winInfo.hidden = hidden.bind(null, winInfo);

//   // winInfo.has = hasWindowActive.bind(null,)
//   return winInfo;
// }

// /* 


//   active app -> {
//     status : "hidden",
//     postion: {},

//     bindWindow:[

//      window : app ::{
//       clear

//       cancel
//       hidden() {

//       }


//       destory


//       }
//     ]
//   }


// */