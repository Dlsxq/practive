
import { ActiveApp } from "~/store";
import { EventControll } from ".";


export enum AppChannelEventType {
  hidden = "hidden",
  cancel = "cancel",
  fullScreen = "fullScreen",
  appChange = "change",
  priority = "priority"
}

export type AppListener = (app: Application, nextAppInfo:Partial<ActiveApp>) => void;

export const appChannel = new EventControll<AppChannelEventType, AppListener>();
