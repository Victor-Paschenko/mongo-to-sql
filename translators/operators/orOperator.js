const Operator = require('./operator');
const OPERATORS_EQUIVALENT = require('../constants').OPERATORS_EQUIVALENT;

class OrOperator extends Operator {

  get sql() {
    const joiner = ` ${OPERATORS_EQUIVALENT[this.operator]} `
    return `(${this.value.join(joiner)})`;
  }
}

module.exports = OrOperator;