

(module
  (import "js" "log" (func $log (param i32)))

  (memory $memory 2)
  (export "memory" (memory $memory))

  
  ;; (import "js" "mem" (memory 1))

  (func $max (export "foo") (param $len i32)

    (local $start i32)

    (local.set $start (i32.const 1))

    ;; local.get $start

    i32.const 0
    i32.load
    call $log
    ;; (loop $en

    ;;   local.get $start
    ;;   i32.load
    ;;   call $log
      
    ;;     (local.set $start (i32.add (local.get $start) (i32.const 1) ) )

    ;;     (br_if $en (i32.le_s (local.get $start) (local.get $len) ))
    ;; )
  )
)
