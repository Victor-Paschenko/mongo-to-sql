const Operator = require('./operator');
const OPERATORS_EQUIVALENT = require('../constants').OPERATORS_EQUIVALENT;

class InOperator extends Operator {
  get sql() {
    return `${this.fieldName} ${OPERATORS_EQUIVALENT[this.operator]} (${this.value.map(val => this.wrapValue(val)).join(', ')})`;
  }
}

module.exports = InOperator;