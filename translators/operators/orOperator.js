const Operator = require('./operator');
const OPERATORS_EQUIVALENT = require('../constants').OPERATORS_EQUIVALENT;
const operatorHandler = require('./index');

class OrOperator extends Operator {

  get sql() {
    return `${this.fieldName} ${OPERATORS_EQUIVALENT[this.operator]} (${this.value.join(',')})`;
  }


  extractParams() {
    return this.value.map(param => {
      const keys = Object.keys(param);
    });

  }
}

module.exports = OrOperator;