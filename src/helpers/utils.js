const methods = {};

/**
 * Takes an integer and ensures that it is formated as a time properly
 * @param {number} time Integer time value
 * @returns {string}
 */
methods.formatTime = (time => ((time < 10 ? '0' : '') + time));

module.exports = methods;
