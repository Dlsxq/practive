

/* 
0 -- 000
1 -- 001
2 -- 010
3 -- 011
4 -- 100
5 -- 101
6 -- 110
7 -- 111
*/

globalThis.form8Into2 = (target: string) => {
  let i = 3 - (target.length % 3)
  console.log(i);
}


const map8 = {
  "000": 0,
  "001": 1,
  "010": 2,
  "011": 3,
  "100": 4,
  "101": 5,
  "110": 6,
  "111": 7
}

globalThis.form2Into8 = (target: string) => {
  let i = Math.abs((target.length % 3) - 3)
  while (i > 0) {
    target = "0" + target
    i--
  }
  let r = "", temp = ""
  for (let i = 0; i < target.length; i++) {
    const el = target[i];
    temp += el;
    if (temp.length === 3) {
      r += map8[temp]
      temp = ""
    }
  }
  return r;
}


globalThis.form10Into8 = function (target: number) {
  let stack = [];
  while (target > 0) {
    stack.push(target % 8)
    target = target / 8 >> 0
  }
  return stack.reverse().join("-")
}

globalThis.form10Into2 = function (target: number): string {
  let stack = [] as number[];
  while (target > 0) {
    stack.push(target % 2)
    console.log("11")
    target = target / 2 >> 0
  }
  return stack.reverse().join("-")
}


const map16 = {
  10: 'a',
  11: 'b',
  12: 'c',
  13: 'd',
  14: 'e',
  15: 'f',
}
globalThis.form10Into16 = function (target: number): string {
  let stack = [];
  while (target > 0) {
    stack.push(target % 16)
    target = target / 16 >> 0
  }
  return stack.reverse().map(num => num >= 10 ? map16[num] : num).join("-")
}



globalThis.form2Into10 = function (target: string) {
  let res = 0;
  let stack = target.split("")
  let len = stack.length-1;
  for (let i = 0 ;i < stack.length; i++) {
    res += parseInt(stack[i]) * 2 ** (len-i)
  }
  return res;
}


const map2Into16 = {
  "0000":0,
  "0001":1,
  "0010":2,
  "0011":3,
  "0100":4,
  "0101":5,
  "0110":6,
  "0111":7,
  "1000":8,
  "1001":9,
  "1010":'a',
  "1011":'b',
  "1100":'c',
  "1101":'d',
  "1110":'e',
  "1111":"f"
}

globalThis.form2Into16 = function (target: string) {
  let i = Math.abs((target.length % 4) - 4)
  while (i > 0) {
    target = "0" + target
    i--
  }
  let r = "", temp = ""
  for (let i = 0; i < target.length; i++) {
    const el = target[i];
    temp += el;
    if (temp.length === 4) {
      r += map2Into16[temp]
      temp = ""
    }
  }
  return r;
}




/*
  1. 10
      1. 10 -> 2
      2. 10 -> 8
      3. 10 -> 16
  2. 8
      1. 8 -> 10
      2. 8 -> 2
  3. 2
      1. 2 -> 10
      2. 2 -> 8
      3. 2 -> 16
  4. 16
      1. 16 -> 2
      2. 16 -> 10
      3. 16 -> 8


*/








const source = {name:"xxx"}
const blob = new Blob([JSON.stringify(source)], {type:"application/json"})
//{"name":"xxx"}

const reader = new FileReader()
/* 
0: 123
1: 34
2: 110
3: 97
4: 109
5: 101
6: 34
7: 58
8: 34
9: 120
10: 120
11: 120
12: 34
13: 125

0: 123
1: 34
2: 110
3: 97
4: 109
5: 101
6: 34
7: 58
8: 34
9: 120
10: 120
11: 120
12: 34
13: 125
*/
reader.onload = function(e) {
  // console.log(e.target.result);
}
reader.readAsArrayBuffer(blob)

const fileLoad = document.getElementById("fileLoad")
fileLoad.onchange = function(e) {


  // console.log(e.target.files[0]);
reader.readAsArrayBuffer(e.target.files[0])
}

const array = new ArrayBuffer(16)


const view = new DataView(array)

view.setInt8(0,97)
view.setInt8(1,98)
view.setInt8(2,99)

String.fromCharCode(view.getInt8(0))

// reader.readAsArrayBuffer(array)

// console.log(array);

