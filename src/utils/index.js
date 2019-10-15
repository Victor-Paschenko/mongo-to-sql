const OPEN_BRACE = '{';
const CLOSE_BRACE = '}';

// This metgod is considering that any object in the string will start with '{' and ends '}'
// Algorithm is simple, when we meet '{' we are adding +1 to array(stack) if getting '}' decrease this amount by 1 element 
// If after closing brace there is no elements in the array we are considering Object finished and just contain it into an array
module.exports.extractObjectsFromString = (text) => {
  let objectStart = null;
  const parantheneses = [];
  const extractedObjects = [];

  text.split('').forEach((letter, index) => {
    if(letter === OPEN_BRACE){
      if(!parantheneses.length) {
        objectStart = index;
      }

      parantheneses.push(OPEN_BRACE)
    }

    if(letter === CLOSE_BRACE) {
      parantheneses.pop();

      if(!parantheneses.length) {
        extractedObjects.push(text.substring(objectStart, index + 1));
        objectStart = null;
      }
    }
  });

  return extractedObjects;
}