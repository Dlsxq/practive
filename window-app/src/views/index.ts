import { registerViewer } from "~/store/viewer";

import SettingView, { Set2,Set3 } from "./setting";

registerViewer("setUp", SettingView);
registerViewer("setUp", Set2);
registerViewer("setUp", Set3);
