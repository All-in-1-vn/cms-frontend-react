/**
 * Export Mixin object
 * @type {Object}
 * @this
 * @return {Object} Mixin functions
 */
module.exports = {
  componentWillMount: function() {
    this.intervals = [];
    return this.timeouts = [];
  },
  setTimeout: function() {
    console.log('SetIntervalAndTimeoutMixin.setTimeout()');
    return this.timeouts.push(setTimeout.apply(null, arguments));
  },
  setInterval: function() {
    console.log('SetIntervalAndTimeoutMixin.setInterval()');
    return this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
    return this.timeouts.map(clearTimeout);
  }
};
