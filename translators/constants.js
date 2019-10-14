const OPERATORS_EQUIVALENT = {
  $or: "OR",
  $and: "AND",
  $in: "IN",
  $lt: "<",
  $lte: "<=",
  $gt: ">",
  $gte: ">=",
  $ne: "<>"
}

module.exports.OPERATORS_EQUIVALENT = OPERATORS_EQUIVALENT;
module.exports.OPERATORS = Object.keys(OPERATORS_EQUIVALENT);
module.exports.COMPLEX_OPERATORS = ['$or', '$in'];