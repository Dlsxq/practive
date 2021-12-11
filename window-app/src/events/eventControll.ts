

export enum PublishFlow {
  "break" = "break",
  "delete" = "delete"
}

interface InitEventControll<T> {
  observer?: (type: T, ...args: any[]) => void | PublishFlow;
}


type EmitType = "async" | "sync";

interface Emit<T> {
  type: T;
  emitType: EmitType;
}


class EventControll<EventType, Listener extends ((...args: any[]) => any)> {

  private eventStore = new Map<EventType, Set<Listener>>();
  private readonly observer: InitEventControll<EventType>["observer"];

  private port: MessagePort;

  public eventType: EventType;


  constructor(
    eventInit?: InitEventControll<EventType>
  ) {

    this.observer = eventInit?.observer;

    let ch = new MessageChannel();
    this.port = ch.port1;
    ch.port2.addEventListener("message", this.onPort.bind(this));
    ch.port2.start();
  }

  private onPort(evl: MessageEvent<{ type: EventType, argv: Parameters<Listener>; }>) {
    this.emitEvent(evl.data.type, evl.data.argv);
  }

  public bindListener(type: EventType, listener: Listener) {
    let listeners = this.eventStore.get(type);
    if (listeners === undefined) {
      this.eventStore.set(type, listeners = new Set());
    }

    listeners.add(listener);

    function unEventListener() {
      listeners.delete(listener);

      // 在listeners为空时清除set
      if (listeners.size === 0) {
        this.eventStore.delete(type);
      }
    }

    return unEventListener.bind(this);
  }

  public once(type: EventType, listener: Listener) {

    const onceRuning = (...args: any[]) => {
      listener(...args);
      un();
      return null;
    };

    let un = this.bindListener(type, onceRuning as Listener);
  }

  private emitEvent(type: EventType, argv: Parameters<Listener>[]) {

    let listenerSet = this.eventStore.get(type);

    if (!(listenerSet instanceof Set)) {
      console.warn(`type:${type} 事件暂时没有订阅者`);
      return;
    }

    let pendingListeners = Array.from(listenerSet);
    let pendingDeleteListener = [] as Listener[];

    for (let i = 0, len = pendingListeners.length;i < len;i++) {
      let listener = pendingListeners[i];

      try {
        let temp = listener(...argv);
        // 比如页面卸载以后可能会删除或者退出执行
        let ob = this.observer?.(type, temp, ...argv);

        if (ob === PublishFlow.break) {
          return;
        }
        if (ob === PublishFlow.delete) {
          pendingDeleteListener.push(listener);
        }
      } catch (exx) {
        console.log(`EventControll: ${type} ->  执行${listener.name} 时发生错误`, exx);
      }
    }

    pendingDeleteListener.forEach(el => {
      listenerSet.delete(el);
    });
  }

  dispatch(type: EventType | Emit<EventType>, ...args: Parameters<Listener>) {

    if (typeof type === "string") {
      this.emitEvent(type, args);
      return;
    }

    let emitType: EmitType = (type as Emit<any>).emitType, changeType = (type as Emit<any>).type;

    switch (emitType) {
      case "async":
        // ! async 的事件会把数据拷贝一份
        return this.port.postMessage({ type: changeType, argv: args });
      default: {
        return this.emitEvent(changeType, args);
      }
    }
  }


  has(type: EventType, listener: Listener) {
    let set;
    if (this.eventStore.has(type)) {
      set = this.eventStore.get(type);
    }
    return set !== undefined ? set.has(listener) : false;
  }

}

export { EventControll };