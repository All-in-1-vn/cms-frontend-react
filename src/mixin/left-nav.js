var LeftNavActions = require('../actions/left-nav-actions');


/**
 * Export Mixin object
 * @type {Object}
 */
module.exports = {
  componentWillMount: function() {
    LeftNavActions.close();
  }
};
