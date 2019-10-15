const assert = require('assert');
const Extractor = require('../../src/extractors/extractor');
const Find = require('../../src/translators/find');
const stubs = require('../stubs');

describe('Find', () => {
  describe('Translate', () => {
    
    it('should return a string of sql request from extracted params', () => {
      let extractor = new Extractor(stubs.SIMPLE_QUERY);
      let translator = new Find(extractor.entities.find, extractor.tableName);
      assert.strictEqual(translator.translate(), "SELECT * FROM user WHERE name = 'julio';");

      
      extractor = new Extractor(stubs.SIMPLE_QUERY_WITHOUT_PARAMS);
      translator = new Find(extractor.entities.find, extractor.tableName);
      assert.strictEqual(translator.translate(), "SELECT * FROM user;");


      extractor = new Extractor(stubs.SIMPLE_QUERY_WITH_SELECT);
      translator = new Find(extractor.entities.find, extractor.tableName);
      assert.strictEqual(translator.translate(), "SELECT name, age FROM user WHERE _id = 23113;");
      

      extractor = new Extractor(stubs.SIMPLE_QUERY_WITH_SELECT_AND_OPERATOR);
      translator = new Find(extractor.entities.find, extractor.tableName);
      assert.strictEqual(translator.translate(), "SELECT name, _id FROM user WHERE age >= 21;");


      extractor = new Extractor(stubs.SIMPLE_QUERY_WITH_SELECT_AND_OPERATOR_$OR);
      translator = new Find(extractor.entities.find, extractor.tableName);
      assert.strictEqual(translator.translate(), "SELECT name, age FROM user WHERE _id IN (1, 2, 3) AND (age >= 18 AND age <= 99 OR name IN ('duck', 'scrudge'));");
    });
  });

});