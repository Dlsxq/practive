


let workInProgress = null, workInProgressRoot = null;
let workInProgressHook = null, workInProgressFirstHook = null;

const currentHook = {
  current: null
}

function mountCurrentHook(initialiState) {
  const nextHook = {
    memoizedState: initialiState,
    baseState: initialiState,
    queue: null,
    next: null
  };

  // 挂载hook
  if (workInProgressFirstHook === null) {
    workInProgressFirstHook = workInProgressHook = nextHook;
  } else {
    workInProgressHook = (workInProgressHook).next = nextHook;
  }

  return workInProgressHook;
}

function updateCurrentHook() {
  let currentAction = workInProgressHook.queue.pending;
  workInProgressHook.queue.pending = null;

  let nextState = workInProgressHook.memoizedState;
  if (currentAction !== null) {
    currentAction.next.next = null;

    while (currentAction !== null) {
      let nextAction = currentAction.action;
      if (typeof nextAction === "function") {
        nextState = nextAction(workInProgressHook.memoizedState)
      } else {
        nextState = nextAction;
      }

      currentAction = currentAction.next;
    }
  }

  workInProgressHook.memoizedState = nextState;

  let nextHook = workInProgressHook;
  if (workInProgressFirstHook === workInProgressHook) {
    workInProgressFirstHook = workInProgressHook;
  } else {
    workInProgressHook = workInProgressHook.next;
  }

  return nextHook;
}

export function render(el, callback) {

  const fiberRoot = {
    element: el,
    memoizedState: null,
    callback: callback
  };

  currentHook.current = mountCurrentHook;
  workInProgress = workInProgressRoot = fiberRoot;

  schedulerUpdateFiberOnRoot(fiberRoot)
}

function schedulerUpdateFiberOnRoot(current) {

    /* 理论上来说应该每次都从当前的fiber节点通过return指针找当应用的根节点，从根节点一次向下深度优先遍历。查找更新提交变更 */
    workInProgress = workInProgressRoot;
    workInProgressHook = workInProgressFirstHook = workInProgress.memoizedState;

    let jsx /* --~ */ = workInProgress.element();
    workInProgress.memoizedState = workInProgressFirstHook;
    workInProgressHook = workInProgressFirstHook = null;
    workInProgress.callback(jsx)

    document.getElementById("root").textContent = JSON.stringify({ count: jsx.count }, null, 4)

    if (currentHook.current !== updateCurrentHook) {
      currentHook.current = updateCurrentHook;
    };
}


export function useState(initialiState) {
  const hook = currentHook.current(initialiState);
  const queue = hook.queue = {
    pending: null,
    dispatch: null
  };

  return [hook.memoizedState, dispatchAction.bind(null, queue, workInProgress)]
}


function dispatchAction(queue, fiber, action) {
  const update = {
    action,
    nextState: null,
    next: null
  };

  const pending = queue.pending;
  if (pending === null) {
    update.next = update;
  } else {
    // 插入一个新的udate对象，构成循环链表
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;

  schedulerUpdateFiberOnRoot(fiber);
}


