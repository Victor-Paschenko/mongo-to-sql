const OPERATORS = require('./constants').OPERATORS;
const OPERATORS_EQUIVALENT = require('./constants').OPERATORS_EQUIVALENT;
const operatorHandler = require('./operators');

class Find {
  constructor(extractedData, tableName) {
    this.queryData = extractedData;
    this.tableName = tableName;

    this.searchParams = extractedData.params[0] || {}; //Find query params
    this.selectParams = extractedData.params[1] || {}; //Find selected fields
  }

  translate() {
    const selectScript = `SELECT ${this.selectedFields} FROM ${this.tableName}`;

    const keys = Object.keys(this.searchParams);
    const results = keys.map(key => 
      this.translation(this.searchParams[key], key));

// If there is no any parameters we should select required fields or just all 
    if(!results.length) {
      return `${selectScript};`;
    }

    return `${selectScript} WHERE ${results.join(' AND ')};`;
  }

  // operatorHandler is responsible for returning correct operator translation from mongo to sql
  // but in order to leave operatorHandler simple in order to apply it in other places there is an pre-processing
  // of all query parameters
  translation(queryObject, varName) {
    if(typeof queryObject !== 'object') {
      return operatorHandler(varName, queryObject, varName).sql;
    }

    if(queryObject instanceof Array) {
      const results = queryObject.map(query => {
        const keys = Object.keys(query);
        return keys.map(key => this.translation(query[key], key));
      });

      return operatorHandler(varName, results, varName).sql;
    }

    const keys = Object.keys(queryObject);
    return keys.map(key => 
      operatorHandler(key, queryObject[key], varName).sql
    ).join(' AND ');
  }

  get selectedFields() {
    const keys = Object.keys(this.selectParams);
    const fields = [];

    if(keys.length) {
       keys.forEach(key => {
          if(this.selectParams[key]){
            fields.push(key);
          }
       });
    } else {
      fields.push('*');
    }

    return fields.join(', ');
  }
}

module.exports = Find;