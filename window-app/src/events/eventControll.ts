

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

  private pendingUnsubscribe: Function[] = null;
  private readonly eventStore = new Map<EventType, Set<Listener>>();

  private readonly observer: InitEventControll<EventType>["observer"];
  private readonly channel: MessagePort;

  constructor(eventInit?: InitEventControll<EventType>) {
    this.observer = eventInit?.observer;

    let ch = new MessageChannel();
    this.channel = ch.port1;
    
    ch.port2.addEventListener("message", this.onPort.bind(this));
    ch.port2.start();
  }

  private onPort(evl: MessageEvent<{ type: EventType, argv: Parameters<Listener>; }>) {
    this.run(evl.data.type, evl.data.argv);
  }

  public subscribe(type: EventType, listener: Listener) {
    let listeners = this.eventStore.get(type);
    if (listeners === undefined) {
      this.eventStore.set(type, listeners = new Set());
    }

    listeners.add(listener);

    let un = () => {

      // 防止重复
      let unsubscribe = un;
      un = null;

      if (Array.isArray(this.pendingUnsubscribe)) {
        this.pendingUnsubscribe.push(unsubscribe);
        return;
      }

      listeners.delete(listener);

      // 在listeners为空时清除set
      if (listeners.size === 0) {
        this.eventStore.delete(type);
      }
    };

    return un;
  }

  public once(type: EventType, listener: Listener) {

    const once = (...args: any[]) => {
      listener(...args);
      un();
      return null;
    };

    let un = this.subscribe(type, once as Listener);
  }

  private run(type: EventType, argv: Parameters<Listener>[]) {

    let listenerSet = this.eventStore.get(type);

    if (!(listenerSet instanceof Set)) {
      console.warn(`EventControll: ${type}类型事件暂时没有订阅者`);
      return;
    }

    let listeners = Array.from(listenerSet);
    // ? 多个事件类型，使用一个数组会有问题吗？
    let pendingUnsubscribe = this.pendingUnsubscribe = [];

    for (let i = 0, len = listeners.length;i < len;i++) {
      let listener = listeners[i];

      try {
        let temp = listener(...argv);
        // 比如页面卸载以后可能会删除或者退出执行
        let ob = this.observer?.(type, temp, ...argv);

        if (ob === PublishFlow.break) {
          return;
        }
        if (ob === PublishFlow.delete) {
          pendingUnsubscribe.push(listener);
        }
      } catch (exx) {
        console.log(`EventControll: ${type} ->  执行${listener.name} 时发生错误\r\n`, exx);
      }
    }

    while (pendingUnsubscribe.length > 0) {
      pendingUnsubscribe.shift()();
    }

    // clean
    pendingUnsubscribe = this.pendingUnsubscribe = null;
  }

  dispatch(type: EventType | Emit<EventType>, ...args: Parameters<Listener>) {

    // string | object
  
    // 同步派发
    if (typeof type === "string") {
      this.run(type, args);
      return;
    }

    let emitType: EmitType = (type as Emit<any>).emitType, changeType = (type as Emit<any>).type;
    
    switch (emitType) {
      case "async":
        // ! async 的事件会把数据拷贝一份
        return this.channel.postMessage({ type: changeType, argv: args });
      default: {
        return this.run(changeType, args);
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