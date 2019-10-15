const Operator = require('./operator');
const InOperator = require('./inOperator');
const OrOperator = require('./orOperator');
const EqualOperator = require('./equalOperator');
const OPERATORS = require('../constants').OPERATORS;

// Each operator is responsible for it own mongo db operator
// If we want add another operator to the system, here should be added new class 
module.exports = (operator, value, varName) => {
  if(!OPERATORS.includes(operator)) {
    return new EqualOperator(varName, operator, value);
  }

  switch(operator) {
    case '$in':
      return new InOperator(varName, operator, value);
    case '$or':
      return new OrOperator(varName, operator, value);
    default:
      return new Operator(varName, operator, value);
  }
};