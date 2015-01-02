var Reflux = require('reflux'),
    LeftNavActions = require('../actions/left-nav-actions');


/*
 * CampaignStore class
 */
var CampaignStore = Reflux.createStore({

  listenables: [LeftNavActions],

  init: function() {
    this.docked = false;
  },

  onClose: function() {
    console.log('LeftNavStore.onClose()');

    this.isOpen = false;
    this.trigger();
  },

  onOpen: function() {
    console.log('LeftNavStore.onOpen()');

    this.isOpen = true;
    this.trigger();
  }
});


/**
 * Export Store
 * @type {class}
 */
module.exports = CampaignStore;
