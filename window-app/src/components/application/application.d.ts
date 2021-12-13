

declare interface Application {
  appId: any;
  appName: string;
  readonly: boolean;
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



declare interface Viewer {
  next(): void;
  prev(): void;
  // pushState?: any;
  // popState: any;
  // memo(): void;
  // getMemo(): any | null;
}