

const rootAppProto = Object.create(null);


const setUp: Application = Object.create(rootAppProto);
createAppInstance(setUp, {
  appId: "setUp",
  appName: "SetUp",
  readonly: true,
  appIcon: "icon-shezhi",
  position: {
    x: 300,
    y: 300,
  },
  windowSize: {
    w: 0,
    h: 0
  },
  themeStyle: {}
});


const App: Application = Object.create(rootAppProto);
createAppInstance(App, {
  appId: "App",
  appName: "App",
  readonly: true,
  appIcon: "icon-shezhi",
  position: {
    x: 300,
    y: 300,
  },
  windowSize: {
    w: 0,
    h: 0
  },
  themeStyle: {}
});


export const appInstanceList = [ setUp,App ];


function createAppInstance(app, appSource: Application) {
  for (let [ key, val ] of Object.entries(appSource)) {
    app[key] = val;
  }
}


export function getAppInstanceList() {
  return appInstanceList;
}