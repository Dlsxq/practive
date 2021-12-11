

declare interface Application {
  appId: any;
  appName: string;
  readonly:boolean
  appIcon: string;

  themeStyle: {
    background?: any;
  };

  windowSize: {
    h: number;
    w: number;
  };

  position: {
    x: number;
    y: number;
  };
}
