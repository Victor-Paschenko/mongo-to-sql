const JSON5 = require('json5');

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
    const firstParamsByComma = /{.*?}+(?=.*,?)/g;
    const lastParamsByComma = /(?<=, ){.*?}$/g; //If there more than 2 parameters there (working just for objects)

    const functions = {};
    
    this.query.match(funcRegexp).forEach(functionQuery => {
      const names = functionQuery.match(funcNames);
      const paramsString = functionQuery.match(funcParams)[0].replace(/\s+/g, ' ');      
      let params = (paramsString.match(firstParamsByComma) || []);

      if(paramsString.match(lastParamsByComma)){
        params = params.concat(paramsString.match(lastParamsByComma));
      }

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