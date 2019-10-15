const Extractor = require('./src/extractors/extractor');
const FindTranslator = require('./src/translators/find');

const extractor = new Extractor(process.env.QUERY);
const sqlTranslator = new FindTranslator(extractor.entities.find, extractor.tableName);

console.log(sqlTranslator.translate());