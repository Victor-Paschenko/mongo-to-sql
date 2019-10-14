class SqlTranslater {
  constructor(extractedData) {
    this.queryData = extractedData;
  }


  translate() {
    const keys = Object.keys(this.queryData);

    const results = keys.map(key => {
      const value = this.queryData[key];
      
      if(typeof value == 'object') {
        return this.translation(value, key);
      } else {
        return `${key} = ${value}`
      }
    })

    return results.join('AND');
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

module.exports = SqlTranslater;