// the timer api gives us tools that enable us to call functions in the future.

// class: Immediate.
let imm = setImmediate(() => {
  console.log("executed immediately");
}).ref();
//ref keep the process running
//unref stops the process.
// hasRef returns a boolean if timer is refed
console.log(imm.hasRef());

///////////////////////////
//Timeout
let to = setTimeout(() => {
  console.log("do som");
});
// use .close,clearTimeout,clearInterval to cancel timeout

// .refresh()

to.refresh();

//setInterval
let i = 0;
let int = setInterval(() => {
  i++;
  console.log(i);
}, 1000);
int.close();
