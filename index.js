const Extractor = require('./extractors/extractor');
const FindTranslator = require('./translators/find');


const extractor = new Extractor(process.env.QUERY);
console.log(JSON.stringify(extractor.entities, null, 2));

const sqlTranslator = new FindTranslator(extractor.entities.find, extractor.tableName);
console.log(sqlTranslator.translate());