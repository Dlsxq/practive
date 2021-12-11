import { appChannel, AppChannelEventType, AppListener } from "~/events";


/**
 * 一个app的三种状态
 */
export enum ActiveAppStatus {
  hidden = "hidden",
  visible = "visible",
  cancel = "cancel",
  deletion = "deletion"
}

export interface ActiveApp {
  status: ActiveAppStatus;
  position: {
    x: number;
    y: number;
  };
  bindWindow: any[];
  themeStyle?: {
    background?: string;
  };
  priority: number;
}

const activeAppRecord = new WeakMap<Application, ActiveApp>();
export const activeAppSet = new Set<Application>();
let currenTopActiveApp: Application[] = [];

export function pushActiveApp(
  app: Application,
  activeApp: ActiveApp
) {

  activeAppRecord.set(app, activeApp);
  activeAppSet.add(app);
  bindForAppChangeEvent(true);

  setRootTopApplication(app);
  appChannel.dispatch(AppChannelEventType.priority, null, null);
}

export function cancelActiveApp(app: Application) {
  testingActiveApp();
}

globalThis.getALl = () => {
  return getActiveAppList();
};

/**
 * 获取当前活跃的所有app
 * @returns app list
 */
export function getActiveAppList(): Application[] {
  return Array.from(activeAppSet).filter(el => getActiveAppInfo(el).status === ActiveAppStatus.visible);
}

/**
 *  获取活跃app的活动信息
 * @param app app
 * @returns info
 */
export function getActiveAppInfo(app: Application) {
  return activeAppRecord.get(app);
}
export function setActiveAppInfo(app: Application, nextInfo: ActiveApp) {
  activeAppRecord.set(app, nextInfo);
}


// 检测平台是否存在活跃的应用
function testingActiveApp() {
  return activeAppSet.size > 0;
}


/* 
  todo: 所有的事件通过init函数注册一次
  todo: 检测所有的活跃应用，如果没用删除关于应用的监听

  ? 一定要用发布订阅吗， 使用函数不行吗
  ? 在模块内部定义的函数，在外部也可以使用更改
*/
const appHiddenListener: AppListener = (app, nextAppInfo) => {

  let finishNextInfo = mergeActiveInfo(app, nextAppInfo);
  finishNextInfo.status = ActiveAppStatus.hidden;
  setActiveAppInfo(app, finishNextInfo);

  appChannel.dispatch({ type: AppChannelEventType.appChange, emitType: "sync" }, app, finishNextInfo);
};

const appCancelListener: AppListener = (app) => {

};

const appFullScreenListener: AppListener = (app) => {

};


let un = null;
export function bindForAppChangeEvent(isExistActive: boolean) {
  if (isExistActive) {
    if (appChannel.has(AppChannelEventType.hidden, appHiddenListener)) {
      return;
    }
    (un ?? (un = [])).push(
      appChannel.bindListener(AppChannelEventType.hidden, appHiddenListener),
      appChannel.bindListener(AppChannelEventType.cancel, appCancelListener),
      appChannel.bindListener(AppChannelEventType.fullScreen, appFullScreenListener),
    );
    return;
  }
  let unListener = un;
  un = null;
  // 不存在活跃的应用
  unListener.forEach(un => un());
}


export function initialActiveAppInfo(app: Application): ActiveApp {

  if (activeAppSet.has(app)) {
    let info = getActiveAppInfo(app);
    info.status = ActiveAppStatus.visible;
    return info;
  }
  return {
    status: ActiveAppStatus.visible,
    position: {
      x: app.position.x,
      y: app.position.y
    },
    bindWindow: [],
    priority: 10
  };
}

/**
 * 前后两个对象合并
 * @param app app
 * @param nextInfo info
 * @returns nextInfo
 */
export function mergeActiveInfo(app: Application, nextInfo: Partial<ActiveApp>) {
  let oldInfo = getActiveAppInfo(app);
  let next = {} as ActiveApp;
  setActiveAppInfo(app, deepClone(next, oldInfo, nextInfo));
  return next;
}


function deepClone<T = Record<string, any>>(res, old: T, next: T) {

  let keys = Object.keys(old);

  for (let key of keys) {

    let oldVal = old[key], nextVal = next[key];

    if (typeof nextVal === "undefined") {
      res[key] = oldVal;
      continue;
    }

    if (typeof oldVal === "object") {
      res[key] = deepClone({}, oldVal, nextVal);
      continue;
    }
    res[key] = nextVal;
  }
  return res;
}


/**
 * 设置优先级，也可能是删除了
 * @param app app
 */
export function setRootTopApplication(app) {
  currenTopActiveApp = currenTopActiveApp.filter(el => el !== app);
  getActiveAppInfo(app).priority = AppLevelPriority.rootTopLevel;
  currenTopActiveApp.push(app);

  // 重新计算
  computeActiveWindowPriority();
}

export function activePeekApp() {
  return currenTopActiveApp[currenTopActiveApp.length - 1];
}

export function isTopApp(app) {
  return activePeekApp() === app;
}

export enum AppLevelPriority {
  rootTopLevel = 500,
}

const priorityGap = 10;

export function computeActiveWindowPriority() {
  currenTopActiveApp.slice(0, currenTopActiveApp.length - 1).forEach(app => {
    let info = getActiveAppInfo(app);
    info.priority = info.priority - priorityGap;
  });

}