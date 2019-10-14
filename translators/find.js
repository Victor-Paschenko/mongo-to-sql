class Find {
  constructor(extractedData, tableName) {
    this.queryData = extractedData;
    this.tableName = tableName;

    this.searchParams = extractedData.params[0];
    this.selectParams = entities.params[1];
  }


  translate() {
    const keys = Object.keys(this.searchParams);

    const results = keys.map(key => {
      const value = this.searchParams[key];
      
      if(typeof value == 'object') {
        return this.translation(value, key);
      } else {
        return `${key} = ${value}`
      }
    })

    return `Select from ${this.tableName} WHERE ${results.join('AND')}`;
  }


  translation(queryObject, varName) {
    const keys = Object.keys(queryObject);

    const results = keys.map(key => { 
      let result = '';
      const value = queryObject[key];

      if (OPERATORS.includes(key)) {
         result = `${key} ${OPERATORS_EQUIVALENT[key]} ${value}`;
      }
    })

    return results.join(' AND ');
  }
}

module.exports = Find;