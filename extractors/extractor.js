const JSON5 = require('json5');
const extractObjectsFromString = require('../utils').extractObjectsFromString;

class Extractor {
  constructor(query) {
    this.query = query;
    const listOfCommands = query.split('.');
    this.validate(listOfCommands);
    this.tableName = listOfCommands[1];
    this.entities = this.parse();
  }

  parse() {
    const funcRegexp = /[a-z]*\(.*?\}\)/g;
    const funcNames = /[a-z]+(?=\()/g;
    const funcParams = /\{.*(?=\))/g;

    const functions = {};
    
    this.query.match(funcRegexp).forEach(functionQuery => {
      const names = functionQuery.match(funcNames);
      const paramsString = functionQuery.match(funcParams)[0].replace(/\s+/g, ' ');
      const params = extractObjectsFromString(paramsString);
      
      functions[names] = {
        functionQuery,
        params: params.map(p => JSON5.parse(p))
      }
    });

    return functions;
  }

  validate(listOfCommands) {
    if(listOfCommands.length < 3) {
      throw 'Incorrect query structure';
    }
  }
}

module.exports = Extractor;