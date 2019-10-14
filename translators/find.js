class Find {
  constructor(extractedData, tableName) {
    this.queryData = extractedData;
    this.tableName = tableName;

    console.log(extractedData)
    this.searchParams = extractedData.params[0] || {};
    this.selectParams = extractedData.params[1] || {};
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

    return `Select ${this.selectedFields} from ${this.tableName} WHERE ${results.join('AND')};`;
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

  get selectedFields() {
    const keys = Object.keys(this.selectParams);
    const fields = [];

    if(keys.length) {
       keys.forEach(key => {
          if(this.selectParams[key]){
            fields.push(key);
          }
       })
    } else {
      fields.push('*');
    }

    return fields.join(', ');
  }
}

module.exports = Find;