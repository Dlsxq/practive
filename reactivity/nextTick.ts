/**
 * 
 */

//?======================================

interface ExecutionCallback {
  (): void;
}

const channel = new MessageChannel();

let nextCallbackQueue: ExecutionCallback[] = [];
let processCallbackQueue: ExecutionCallback[] = [];

let BatchingExecution = false;

/**
 * resume 重新开始
 */
function resumeWork() {
  BatchingExecution = false;
}

/**
 * pause 暂停执行
 */
export function pauseWork() {
  BatchingExecution = true;
}

function flushNextPendingExecutionCallbackQueue() {

  let currentCallbackQueue = nextCallbackQueue;
  nextCallbackQueue = processCallbackQueue;

  while (currentCallbackQueue.length > 0) {
    let callback = currentCallbackQueue.shift();
    callback();
  }

  // 交替执行
  processCallbackQueue = currentCallbackQueue;

  // 队列不为空， 我希望在下一轮循环中执行他们
  if (nextCallbackQueue.length > 0) {
    requestNextLoopExecutionCallback();
  }
  else {
    // 本轮循环中立即关闭，否增，下一轮循环关闭时会存在未被执行的回调函数
    completeCurrentLoopExecutionCallback();
  }
}

function runCallbackWithExecution(fn: ExecutionCallback) {
  if (!BatchingExecution) {
    BatchingExecution = true;
    fn();
  }
}

function requestNextLoopExecutionCallback() {
  channel.port2.postMessage(null);
}

function completeCurrentLoopExecutionCallback() {
  BatchingExecution = false;
}


channel.port1.onmessage = flushNextPendingExecutionCallbackQueue;
channel.port2.onmessage = function completeNextLoopExecutionCallback() {
  completeCurrentLoopExecutionCallback();
};


function schedulerOnCallbackExecution(fn: ExecutionCallback) {
  nextCallbackQueue.push(fn);
  runCallbackWithExecution(requestNextLoopExecutionCallback);
}


function nextTick(fn: ExecutionCallback) {
  schedulerOnCallbackExecution(fn);
}


export {
  nextTick
};
