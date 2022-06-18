

### header

```http
Content-Type: application/wasm 


application/wasm; charset=utf-8 
```


(module
  (memory (import "js" "mem") 1)
  (func (export "foo") (param $ptr i32) (param $len i32) (result i32)
    (local $end i32)
    (local $sum i32)
    (local.set $end (i32.add (local.get $ptr) (i32.mul (local.get $len) (i32.const 4))))
    
    (block $break (loop $top
      (br_if $break (i32.eq (local.get $ptr) (local.get $end)))
      (local.set $sum (i32.add (local.get $sum)
                               (i32.load (local.get $ptr))))
        (local.set $ptr (i32.add (local.get $ptr) (i32.const 4)))
        (br $top)
    ))
    (local.get $sum)
  )
)

  (loop $t
        i32.lt_s (local.get $j) (i32.const 0) 
        (if
          (then (
            i32.load $j
            local.get $el
            i32.lt_s 
              ;; (i32.load $j) (local.get $el)
              (if (result i32)
                (then (
                    (i32.store
                      (i32.add (local.get $j) (i32.const 1))
                      (i32.load $j)
                    )
                    (i32.sub (local.get $j)  (i32.const 1))
                ))
              )
          ))
        (else (br $t))
        )
      )

      (i32.store
          (i32.add (local.get $j) (i32.const 1))
          (local.get $el)
      )