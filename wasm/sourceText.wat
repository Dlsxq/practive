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