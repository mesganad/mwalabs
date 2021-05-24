module.exports.getSummation = function (req, res) {
  let num1 = req.params.firstNumber;
  let num2 = -1;
  if (req.query && req.query.secondNumber) {
    num2 = req.query.secondNumber;
  }
  let sum = +num1 + +num2;
  console.log("JSON request received");
  console.log("The sum of the input is :" + sum );
  res.status(200).json({"Sum": sum });
};
