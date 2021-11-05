



let getType = (val: unknown) => Object.prototype.toString.call(val);

const staticTypes = ["string", "number", "boolean", "undefined", "function"];

function clone<T extends Record<string, unknown>>(target: T, result: T): T {
 

  return result;
}
function deepClone<T extends Record<string, unknown>>(target: T) {
  if (staticTypes.includes(typeof target) || target === null) {
    return target;
  }

  // 不考虑类型数组
  // 基本引用类型
  let result:T = (Array.isArray(target) ? [] : {}) as T;
  
  let key: keyof T;

  for (key in target) {
    let val = target[key];
    let type = getType(val);

    switch (type) {
      case "[object Date]":
        result[key] = new Date((val as Date).getTime()) as T[keyof T];
        continue;
      case "[object Array]":
      case "[object Object]":
      default:

        result[key] = deepClone(val as T) as T[keyof T];
        break;
    }
  }

  return result;
}


let souorce = {
  name: "000"
}


let arr = [{ a: [1, 2, 3] }, { a: [4, 5, 6] }] //

let b = deepClone(arr);


arr[0].a[1] = 999
console.log(b);