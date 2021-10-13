



process.nextTick(() => {
  console.log("nextTick");
  process.nextTick(() => {
    console.log("nextTick 2");
  })
})


Promise.resolve().then(() => {
  console.log("then ");
  process.nextTick(() => {
    console.log("nextTick 3");
  })
})
.then(() => {
  console.log("then");
}).finally(() => {
  console.log("fin");
})
.then(() => {
  console.log("then2");
})
.finally(() => {
  console.log("fin2");
})