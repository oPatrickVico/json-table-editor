/**
 * Takes a list of objects and return all properties that show up at least once
 * @param {Array} objList
 * @returns {Array}
 */
export function getAllKeys(objList) {
  let result = [];

  for (const obj of objList) {
    // get the keys list of current obj
    const keys = Object.keys(obj);

    // Make array of unregistered keys
    const notInResult = keys.filter((key) => !result.includes(key));

    // add not-repeated keys to result array
    result.push(...notInResult);
  }

  return result;
}

/**
 *
 */
export function columnfy(objList) {
  const properties = getAllKeys(objList);
  const vectors = {};

  for (const property of properties) {
    vectors[property] = [];
    for (const obj of objList) {
      vectors[property].push(obj[property] || '');
    }
  }

  return vectors;
}

/**
 *
 */
export function swapPropertyName(obj, oldProperty, newProperty) {
  const newObj = { ...obj };
  newObj[newProperty] = newObj[oldProperty];
  delete newObj[oldProperty];
  return newObj;
}

/**
 *
 */
export function range(length, start = 0, step = 1) {
  return Object.keys(Array(length).fill(null));
}
