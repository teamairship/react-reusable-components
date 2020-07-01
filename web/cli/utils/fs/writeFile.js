'use strict';

const fs = require('fs');

/**
 * Write to a file.
 * @param {string} path - the absolute path
 * @param {string} content
 */
module.exports = function writeFile(path, content) {
  try {
    fs.writeFileSync(path, content);
  } catch (err) {
    console.log("");
    console.error(err);
    return;
  }
};
