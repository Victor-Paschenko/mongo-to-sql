const JSON5 = require('json5');
const extractObjectsFromString = require('../utils').extractObjectsFromString;

const FUNCTION_REGEXP = /[a-z]*\(.*?\}\)/g;
const FUNCTION_NAME_REGEXP = /[a-z]+(?=\()/g;
const EXTRACT_FUNCTION_PARAMS = /\{.*(?=\))/g;
const FIND_DEFAULT = {
        find: {
          params: [],
          functionQuery: 'find()'
        }
      };

class Extractor {
  constructor(query) {
    this.query = query;
    const listOfCommands = query.split('.');
    this.validate(listOfCommands);
    this.tableName = listOfCommands[1];
    this.entities = this.parse();
  }

  parse() {
    const functions = {};
    
    if(!this.query.match(FUNCTION_REGEXP)){
      return FIND_DEFAULT;
    }

    this.query.match(FUNCTION_REGEXP).forEach(functionQuery => {
      const names = functionQuery.match(FUNCTION_NAME_REGEXP);
      const paramsString = functionQuery.match(EXTRACT_FUNCTION_PARAMS)[0].replace(/\s+/g, ' ');
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
      throw new Error('Incorrect query structure');
    }
  }
}

module.exports = Extractor;