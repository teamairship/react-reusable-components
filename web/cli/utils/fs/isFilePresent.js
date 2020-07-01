const fs = require('fs');

/**
 * Determine if a file is present.
 * See: https://stackoverflow.com/a/14392235/4262653
 *
 * @param {string} filePath
 * @returns {boolean}
 */
module.exports = function isFilePresent(filePath) {
  try {
    fs
      .readFileSync(filePath);
    return true;
  } catch (err) {
    if (err instanceof Error && err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
};
