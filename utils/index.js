module.exports.extractObjectsFromString = (text) => {
  let objectStart = null;
  const parantheneses = [];
  const extractedObjects = [];

  text.split('').forEach((letter, index) => {
    if(letter === '{'){
      if(!parantheneses.length) {
        objectStart = index
      }

      parantheneses.push('{')
    }

    if(letter === '}') {
      parantheneses.pop();

      if(!parantheneses.length) {
        extractedObjects.push(text.substring(objectStart, index + 1));
        objectStart = null;
      }
    }
  });

  return extractedObjects;
}