
```wasm



(module
  (import "js" "log" (func $log (param i32)))
  ;; (memory (import "prints" "mem") 1)
  (import "js" "mem" (memory 1))
  

  (func $max (export "foo") (param $a i32) (param $len i32) (result i32)
   
    (local $start i32)
    (local $el i32)
    (local $j i32)

    (local.set $start (i32.const 1))

    (loop $en

        (local.set $el (i32.load (i32.const 3)))

        ;; (local.set $j (i32.sub (local.get $start) (i32.const 1) ))

          ;; (call $log (local.get $j))
          (call $log (local.get $el))
          (call $log (local.get $start))
          ;; (call $log (local.get $len))

        (local.set $start (i32.add (local.get $start) (i32.const 1) ) )

        (br_if $en (i32.le_s (local.get $start) (local.get $len) ))
    )


    local.get $j
  )
)




(module

  (import "prints" "log" (func $log (param i32)))

  (func $foo (export "foo")(param $a1 i32)  (result i32)
    (local $1 i32)
    i32.const 97
    local.set $1

    local.get $a1
    local.get $1
    i32.add

    local.set $1

    (call $log (local.get $1))

    i32.const 50

  )
)



(module

(import "prints" "log" (func $log (param  i32)))

 (global $1 i32 (i32.const 90))

  (func $foo (export "foo")(result i32)
    (local $1 i32)
    i32.const 50
    global.get $1
    ;; 想加
    i32.add
    ;; 设置局部变量
    local.set $1
  

    (call $log (local.get $1) )

    ;; 返回值
    i32.const 98

  )
)



(module
  (func $sum
    (export "foo")
      (param $from i32)
      (param $to i32) 
      (result i32)

    (local $n i32)

    (loop $l
      (local.set $n (i32.add (local.get $n) (local.get $from)))
      (local.set $from (i32.add (local.get $from) (i32.const 1)))
      (br_if $l (i32.le_s (local.get $from) (local.get $to)))
    )

    (local.get $n)
  )
)



(module

  (func $main (export "foo") (result i32)
    (call $max (i32.const 20) (i32.const 80))
  )
  (func $max (param $a i32) (param $b i32) (result i32)
    (local.get $a)
    (local.get $b)
    (i32.gt_s (local.get $a) (local.get $b))
    (select)
  )
)

(module
  (func $max (export "foo") (param $a i32) (param $b i32) (result i32)
    (i32.gt_s (local.get $a) (local.get $b))
    (if (result i32)
      (then (local.get $a))
      (else (local.get $b))
    )
  )
)




    (local.set $1 (i32.const 0))

    (loop $n
      (call $log (local.get $1))
      (i32.store
        (local.get $1)
        (local.get $1)
      )
      (local.set $1 (i32.add  (local.get $1) (i32.const 1) ))
      (br_if $n (i32.le_s (local.get $1) (local.get $a)))
    )




(module
  (import "ports" "log" (func $log (param  i32)))
  (import "js" "mem" (memory 1))
  ;;(data (i32.const 0) "Hi")
  (func (export "writeHi")
  ;;(data (i32.const 0) "Hia")
  (i32.store
    (i32.const 0)
    (i32.const 97)
  )
  
  (i32.store
    (i32.const 1)
    (i32.const 98)
  )
    ;;i32.const 0  ;; pass offset 0 to log
    ;;i32.const 2  ;; pass length 2 to log
    (i32.load
      (i32.const 0)
    )
    call $log))


```






<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wasm</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <h1>Wasm</h1>
  <p>page...</p>
  <div>
    中文的
  </div>
</body>
<script>


let memory = new WebAssembly.Memory({ initial: 1 });

  function main() {
    console.log("main...");

    function consoleLogString(offset, length) {
      // var bytes = new Uint8Array(memory.buffer, offset, length);
      // var string = new TextDecoder('utf8').decode(bytes);
      // console.log(string);
    console.log(offset, length);
    }

    let importObj = { ports: {log:consoleLogString}, js: { mem: memory } };


    fetch("/module.wasm")
      .then(r => {
        return r.arrayBuffer()
      }).then(b => {
        return WebAssembly.instantiate(b, importObj);
      })
      .then(result => {
        return result.instance.exports;
      }).then(moduleExports => {
        globalThis.exports = moduleExports;
        
      })

  }


  function fetchJson() {
    fetch("/json").then(r => r.json())
      .then(r => {
        console.log(r);
      })
  }





</script>

</html>

