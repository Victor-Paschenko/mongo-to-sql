const Extractor = require('./extractors/extractor');
const FindTranslator = require('./translators/find');


const extractor = new Extractor(process.env.QUERY);

const sqlTranslator = new FindTranslator(extractor.entities.find, extractor.tableName);

console.log(sqlTranslator.translate());