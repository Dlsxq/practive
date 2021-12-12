import { Component, ReactNode, MouseEvent, PointerEvent, CSSProperties, createElement } from "react";
import computeClass from "classnames";
import "./app.less";
import FontIcon from "../fontIcon";
import { appChannel, AppChannelEventType } from "~/events";
import { AppLevelPriority, ActiveAppStatus, computeActiveWindowPriority, getActiveAppInfo, ActiveApp, setRootTopApplication, isTopApp } from "~/store";
import { debounce } from "~/utils/debounce";
import { View, getViewFromAppId } from "~/store/viewer";



interface WindowPostion {
  x: number;
  y: number;
}

interface AppContainerProps {

  appInstance?: Application;

  apprReRender?: () => void;

  // winSource: ActiveWindow;
}

interface AppPrivateState {
  position: WindowPostion;
  appStatus: ActiveAppStatus;
  isElementFullScreen: boolean;
}
/* 
  1. 拖拽
  2. 隐藏
  3. 管理状态
  4. 检测触碰
*/
class AppWindow extends Component<AppContainerProps, AppPrivateState> {

  private readonly appInstance: Application;
  private readonly appChildren: ReactNode;
  private readonly view: View;
  // private readonly winSource: ActiveWindow;

  private windownPosition: WindowPostion;
  private winowSize:{
    h: number;
    w: number;
  };


  private activeApp: ActiveApp;
  private containerElement: HTMLElement;

  constructor(props) {
    super(props);

    this.appInstance = props.appInstance;

    // @ 保持引用传递
    this.activeApp = getActiveAppInfo(this.appInstance);
    this.windownPosition = this.activeApp.position;
    this.winowSize = this.activeApp.windowSize;

    this.view = getViewFromAppId(this.appInstance.appId);


    this.state = {
      position: null,
      appStatus: this.activeApp.status,
      isElementFullScreen: false
    };
  }


  componentDidMount(): void {
    this.containerElement.addEventListener("fullscreenchange", this.fullscreenChangeMoniter);
    this.changeRootElementLevel();
    appChannel.subscribe(AppChannelEventType.priority, this.changeRootElementLevel.bind(this));
  }

  componentWillUnmount(): void {
    this.containerElement.removeEventListener("fullscreenchange", this.fullscreenChangeMoniter);
  }


  // ------------------------------------拖拽--------------------------------
  startPosition: WindowPostion = null;
  mouseMove = null;

  keyDownListener = (evl: PointerEvent<HTMLElement>) => {

    let position = {
      x: evl.clientX - this.windownPosition.x,
      y: evl.clientY - this.windownPosition.y
    };

    this.startPosition = position;
    this.mouseMove = this.handleMouseMove;
    /*eslint-disable */
    (evl.target as any).setPointerCapture(evl.pointerId);
    this.setState({ position: { ...this.windownPosition } });

    this.containerSize = {
      x: document.body.clientWidth,
      y: document.body.clientHeight
    };
  };

  containerSize: WindowPostion = null;

  handleMouseMove = (evl: MouseEvent) => {
    let { clientX, clientY } = evl;
    if (clientX <= 50 || this.containerSize.x - clientX <= 50) {
      return;
    }
    if (clientY <= 50 || Math.abs(clientY - this.containerSize.y) <= 170) {
      return;
    }
    if (this.startPosition === null) {
      return;
    }

    let { x: startX, y: startY } = this.startPosition;

    // 设置拖拽位置
    this.setState({
      position: {
        x: clientX - startX,
        y: clientY - startY
      }
    });
  };

  keyUpListener = (evl: PointerEvent<HTMLElement>) => {
    if (this.state.position !== null) {
      this.windownPosition = this.state.position;
    }

    this.startPosition = null;
    this.mouseMove = null;

    /*eslint-disable */
    (evl.target as any).releasePointerCapture(evl.pointerId);
    this.setState({ position: null });
  };
  // ------------------------------------拖拽--------------------------------


  // -------------------------------------Active-----------------------------
  transitionend = undefined;
  isEnd = false;
  transitionendListener = () => {
    if (this.isEnd) {
      return;
    }

    this.transitionend = undefined;
    this.isEnd = !this.isEnd;
    this.props.apprReRender?.();

    /* 
      @ 动画完成以后，从active app删除，不在构建jsx对象
      @ 隐藏或者全屏是阻塞渲染的，必须同步的通知其他应用
      @ react16.8 以后的scheduler有能力合并异步的更新。 否则react的更新会打断动画效果
      @ 事件派发器中，异步的派发使用的通道，引用类型会交出引用所有权
    */
    appChannel.dispatch(AppChannelEventType.hidden, this.appInstance, { position: { ...this.windownPosition } });
    // this.winSource.hidden({ position: { ...this.windownPosition } });
  };

  // 动画完成以后，从active中删除， 不在构建jsx对象
  handleAppHidden = () => {
    if (this.state.isElementFullScreen) {
      return;
    }
    this.setState({ appStatus: ActiveAppStatus.hidden });
    this.transitionend = this.transitionendListener;
  };

  handleAppCancel = () => {
    if (this.state.isElementFullScreen) {
      return;
    }

  };


  fullscreenChangeMoniter = (evl) => {
    // 元素全屏成功， 发出active事件
    // 退出
    this.setState(olv => ({ isElementFullScreen: !olv.isElementFullScreen }));
  };

  // 全屏
  handleAppFullScreen = debounce(() => {
    this.state.isElementFullScreen ? document.exitFullscreen() : this.containerElement.requestFullscreen();
  });

  // --------------------------操作------------------------------


  bindHtmlElement = (el) => this.containerElement = el;

  // ------------------------compute priority--------------------------

  containerClick = () => {
    if (isTopApp(this.appInstance)) {
      return;
    }

    setRootTopApplication(this.appInstance);
    appChannel.dispatch(AppChannelEventType.priority, null, null);
  };

  changeRootElementLevel() {
    this.containerElement.style.setProperty("z-index", String(this.activeApp.priority));
    this.forceUpdate();
  }

  // ---------------------------view----------------------------------------
  next = () => {
    this.view.next();
    this.forceUpdate();
  };

  prev = () => {
    this.view.prev();
    this.forceUpdate();
  };


  render(): ReactNode {
    const { position, appStatus, isElementFullScreen } = this.state;

    let moveStyle: CSSProperties = {
      left: this.windownPosition.x,
      top: this.windownPosition.y
    };

    if (position !== null) {
      let { x, y } = position;
      moveStyle = {
        transform: `translate(${x}px, ${y}px)`
      };
    }

    let size = {width:this.winowSize.w,height:this.winowSize.h};
    let style = Object.assign(size,moveStyle)

    const View = this.view.currentData;

    return (
      <section
        style={style}
        onClick={this.containerClick}
        onTransitionEnd={this.transitionend}
        className={computeClass(
          "app-window-default-size",
          "app-window",
          {
            "app-window-active ": this.activeApp.priority === AppLevelPriority.rootTopLevel,
            "visible-hidden": appStatus === ActiveAppStatus.hidden
          }
        )}
        ref={this.bindHtmlElement}
      >
        <header
          onPointerDown={this.keyDownListener}
          onPointerUp={this.keyUpListener}
          onPointerMove={this.mouseMove}
          className={computeClass(
            "app-window-header",
            { "full-element-header": isElementFullScreen }
          )} >
          <div className={computeClass("app-window-action", { "full-element": isElementFullScreen })}>
            <span className="icon" onClick={this.handleAppHidden}>
              <FontIcon type="icon-minus-bold" />
            </span>
            <span className="icon" onClick={this.handleAppFullScreen}>
              <FontIcon type="icon-electronics" />
            </span>
            <span className="icon">
              <FontIcon type="icon-close-bold" />
            </span>
          </div>
          <span className={computeClass(
            "app-window-title"
          )}>
            {this.appInstance.appName}
          </span>
          <div className={computeClass("app-window-setting")}>
            {/* 右上角 */}
          </div>
        </header>

        <View next={this.next} />
      </section>
    );
  }

}



export default AppWindow;