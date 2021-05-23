console.log("1: Start");
let f=require("./_fibonacci");
let result=setTimeout(function(){console.log("Fibonacci of 38 is: "+f.fib(38))},0);
console.log("2: End")