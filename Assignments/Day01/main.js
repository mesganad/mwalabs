console.log("1: Start");
let f=require("./_fibonacci");
let fib=function(){
    console.log("Fibonacci of 38 is: "+f.fib(38));
};
let result=setTimeout(fib,0);
console.log("2: End")