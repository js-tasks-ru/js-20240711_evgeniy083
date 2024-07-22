/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const properties = path.split('.');
  return (obj) => {
    let value = obj;
  
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
  
      if (!value || typeof value !== 'object' || !value.hasOwnProperty(property)) {
        return undefined; 
      }
      value = value[property];
    }
    return value;
  };
}
