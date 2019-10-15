
/**
 * Mocks a CSS module styles object using an ES6 Proxy for unit testing.
 * We take any property access and simply return it as a string.
 * For example:
 *
 * import styles from './cssModuleMock';
 *
 * styles.myCssClassName // -> 'myCssClassName'
 * const myClass = 'variableClassNamesWorkToo';
 * styles[myClass] // -> 'variableClassNamesWorkToo'
 */
export default new Proxy({}, {
  get: (_, property) => property
});
