import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import computeClass from "classnames";
import { intoIsLoad } from "~/store/entry";
import "./platform.less";
import PlatformFooter from "../footer";
import AppStartUp from "~/components/appStartUp";
import ActiveAppWindow from "../window";
import AppWindow from "~/components/appWindow";
import { appChannel, AppChannelEventType } from "~events/";
import { 
  Center,
   Box,
    Stack, HStack, VStack ,
    Menu,MenuButton,MenuList,MenuItem,
    
  } from "@chakra-ui/react";
import {
  getActiveAppList, getAppInstanceList, initialActiveAppInfo, pushActiveApp
} from "~/store";


interface IProps {

}


const Platform: FC<IProps> = (props) => {

  const {

  } = props;

  const navigate = useNavigate();
  const [ activeAppForWindowList, setActiveAppWindowList ] = useState<Application[]>([]);


  /**
   * 鉴权重定向
   * 添加监听
   */
  useEffect(
    () => {
      if (intoIsLoad()) {
        navigate("/entry");
        return;
      }

      let un = appChannel.subscribe(AppChannelEventType.appChange, (app, nextAppInfo) => {
        setActiveAppWindowList(getActiveAppList());
      });

      return () => {
        un();
      };
    },
    []
  );

  const handleAppStartUp = (app: Application) => {
    pushActiveApp(
      app,
      initialActiveAppInfo(app)
    );
    setActiveAppWindowList(getActiveAppList());
  };


  const activeAppNodeList = activeAppForWindowList.map(app => {
    return <AppWindow
      appInstance={app}
      key={app.appId}
    />;
  });

  const platformApp = getAppInstanceList().map(app => {
    return <AppStartUp
      key={app.appId}
      appName={app.appName}
      appInstance={app}
      onStartUpApp={handleAppStartUp}
    />;
  });


  return (
    <section className={computeClass(
      "platform-root-container",
    )}>
      {/* 活跃的平台  */}
      <ActiveAppWindow >
        {activeAppNodeList}

      </ActiveAppWindow>
      <PlatformFooter >
        {platformApp}
      </PlatformFooter>
    </section>
  );
};


export default Platform;
