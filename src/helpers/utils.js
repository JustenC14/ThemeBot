const methods = {};

methods.formatTime = (time) => {
  return (time < 10 ? '0' : '') + time;
};

module.exports = methods;
