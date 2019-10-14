const Operator = require('./operator');

class EqualOperator extends Operator{

  get sql() {
    return `${this.fieldName} = ${this.value}`;
  }
}

module.exports = EqualOperator;