const OPERATORS_EQUIVALENT = require('../constants').OPERATORS_EQUIVALENT;

class Operator {
  constructor(varName, operator, value) {
    this.operator = operator;
    this.value = value;
    this.fieldName = varName;
  }

  get sql() {
    return `${this.fieldName} ${OPERATORS_EQUIVALENT[this.operator]} ${this.value}`;
  }
}

module.exports = Operator;