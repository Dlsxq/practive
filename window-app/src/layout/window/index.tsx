import { FC } from "react";
import computeClass from "classnames";


import "./window.less";



interface IProps {

}

// 监听全局事件，进行派发
const ActiveWindow: FC<IProps> = (props) => {

  const {
    children
  } = props;


  return (
    <main
      className={computeClass(
        "window-default-style"
      )}
    >
      {children}
    </main>
  );
};


export default ActiveWindow;