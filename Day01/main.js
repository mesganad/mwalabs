let child_process=require("child_process");
console.log("1: Start");
let process=child_process.spawn("node",["_fibonacci.js"],{stdio:"inherit"});
console.log("2: End");

