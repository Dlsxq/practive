import { FC, ReactNode } from "react";
import compluteClass from "classnames";
import Entry from "./entryImage.jpg";

import "./appEntry.less";
import FontIcon from "../fontIcon";


interface IProps {
  appName: string;

  onStartUpApp?: (app: Application) => void;
  appInstance: Application;
}

// 获取活跃的信息
const AppEntry: FC<IProps> = (props) => {

  const {
    appName,
    onStartUpApp,
    appInstance,

  } = props;

  const clickMoniter = () => {
    onStartUpApp?.(appInstance);
  };

  return (
    <section className={compluteClass(
      "app-entry-container"
    )} >
      <div className="app-entry-icon" onClick={clickMoniter}>
        <div className="hover-wrapper">
          <FontIcon type={appInstance.appIcon} />
        </div>
      </div>
      <footer className="app-entry-name">
        {appName}
      </footer>
    </section>
  );
};


export default AppEntry;