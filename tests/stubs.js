module.exports.SIMPLE_QUERY_WITHOUT_PARAMS = "db.user.find({});";

module.exports.SIMPLE_QUERY = "db.user.find({name: 'julio'});";

module.exports.SIMPLE_QUERY_WITH_SELECT = "db.user.find({_id: 23113},{name: 1, age: 1});";

module.exports.SIMPLE_QUERY_WITH_SELECT_AND_OPERATOR = "db.user.find({age: {$gte: 21}},{name: 1, _id: 1});";

module.exports.SIMPLE_QUERY_WITH_SELECT_AND_OPERATOR_$IN = "db.user.find({_id: {\$in: [1,2,3]}}, {name: { \$in : ['duck', 'scrudge']}} ]}, {name: 1, age: 1});";

module.exports.SIMPLE_QUERY_WITH_SELECT_AND_OPERATOR_$OR = "db.user.find({_id: {\$in: [1,2,3]}, \$or: [ {age: {\$gte: 18, \$lte: 99}}, {name: { \$in : ['duck', 'scrudge']}} ]}, {name: 1, age: 1});";


