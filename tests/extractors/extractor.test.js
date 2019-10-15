const assert = require('assert');
const Extractor = require('../../src/extractors/extractor');
const mocks = require('../mocks');

describe('Extractor', () => {

  describe('Initialization', () => {
    it('should throw exception if query is incorrect', () => {
      assert.throws(() => new Extractor(''), Error);
      assert.throws(() => new Extractor('db.find({})'), Error);
      assert.throws(() => new Extractor([]), Error);
      assert.throws(() => new Extractor(1), Error);
    });
  });


  describe('Parse', () => {
    
    it('should return an object with function name, it query and params(as object)', () => {
      let expectedResult = { 
        find: { 
          functionQuery: "find({name: 'julio'})",
          params: [ { name: 'julio' } ] 
        }
      };

      assert.deepStrictEqual(new Extractor(mocks.SIMPLE_QUERY).parse(), expectedResult);

      expectedResult = { 
        find: { 
          functionQuery: 'find({_id: 23113},{name: 1, age: 1})',
          params: [ {"_id": 23113}, {age: 1, name: 1} ] 
        }
      };

      assert.deepStrictEqual(new Extractor(mocks.SIMPLE_QUERY_WITH_SELECT).parse(), expectedResult);

      expectedResult = { 
        find: { 
          functionQuery: "find({_id: {$in: [1,2,3]}, $or: [ {age: {$gte: 18, $lte: 99}}, {name: { $in : ['duck', 'scrudge']}} ]}, {name: 1, age: 1})",
          params: [ {
            "$or": [
              { age: { $gte: 18, $lte: 99 }},
              { name: { $in: ["duck", "scrudge"]}}
            ], 
            _id: { $in: [1,2,3] }
          }, { age: 1, name: 1 } ]
        }
      };

      assert.deepStrictEqual(new Extractor(mocks.SIMPLE_QUERY_WITH_SELECT_AND_OPERATOR_$OR).parse(), expectedResult);
    });
  });

});