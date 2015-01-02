var Reflux = require('reflux'),
    _ = require('underscore'),
    // actions
    ArticleActions = require('../actions/article-actions');

/*
 * ArticleListStore class
 */
var ArticleListStore = Reflux.createStore({

  listenables: [ArticleActions],

  init: function() {
    this.data = {
      isLoading: false,
      isLoadingMore: false,
      skip: 0,
      limit: 4,
      count: 0,
      data: []
    };
  },


  /*
   * Listen to getArticlesAsyncProgress action
   */
  onGetArticlesAsyncProgress: function(options) {
    if (options.skip) {
      _.extend(this.data, {
        isLoadingMore: true
      });
    } else {
      _.extend(this.data, {
        isLoading: true
      });
    }
    this.trigger();
  },


  /*
   * Listen to getArticlesAsyncSuccess action
   */
  onGetArticlesAsyncSuccess: function(articleData) {
    if (articleData.skip) {
      _.extend(this.data, _.pick(articleData, ['skip', 'limit', 'count']));
      _.extend(this.data, {
        data: _.union(this.data.data, articleData.data),
        isLoadingMore: false
      });
    } else {
      _.extend(this.data, articleData);
      _.extend(this.data, {
        isLoading: false
      });
    }
    this.trigger();
  }

});


/**
 * Exports Store
 * @type {object}
 */
module.exports = ArticleListStore;
