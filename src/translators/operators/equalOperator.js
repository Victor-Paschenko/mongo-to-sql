const Operator = require('./operator');

class EqualOperator extends Operator{
  get sql() {
    return `${this.fieldName} = ${this.wrapValue(this.value)}`;
  }
}

module.exports = EqualOperator;