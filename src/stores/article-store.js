var Reflux = require('reflux'),
    _ = require('underscore'),
    // actions
    ArticleActions = require('../actions/article-actions');

/*
 * ArticleStore class
 */
var ArticleStore = Reflux.createStore({

  /*
   * Auto listen ArticleActions and call appropriate callback handlers
   */
  listenables: [ArticleActions],

  /*
   * Init data for store
   */
  init: function() {
    this.data = {
      article: {},
      isLoading: false,
      isCreating: false,
      isCreated: false,
      isUpdating: false,
      isUpdated: false,
      isDeleting: false,
      isDeleted: false
    };
  },

  /*
   * This callback will be invoked as soon as ArticleActions.getArticleAsyncProgress action is triggered
   */
  onGetArticleAsyncProgress: function(articleId) {
    console.log('ArticleStore.onGetArticleAsyncProgress(articleId)', articleId);

    _.extend(this.data, {
      isLoading: true
    });
    this.trigger();
  },

  /*
   * This callback will be invoked as soon as ArticleActions.getArticleAsyncSuccess action is triggered
   */
  onGetArticleAsyncSuccess: function(article) {
    console.log('ArticleStore.onGetArticleAsyncSuccess(article)', article);

    _.extend(this.data, {
      isLoading: false,
      article: article
    });
    this.trigger();
  },

  /*
   * This callback will be invoked as soon as ArticleActions.onCreateArticleAsyncProgress action is triggered
   */
  onCreateArticleAsyncProgress: function(article, categoryId) {
    console.log('ArticleStore.onCreateArticleAsyncProgress(article, categoryId)', article, categoryId);

    _.extend(this.data, {
      isCreating: true,
      isCreated: false
    });
    this.trigger();
  },

  /*
   * This callback will be invoked as soon as ArticleActions.onCreateArticleAsyncSuccess action is triggered
   */
  onCreateArticleAsyncSuccess: function(article) {
    console.log('ArticleStore.onCreateArticleAsyncSuccess(article)', article);

    _.extend(this.data, {
      isCreating: false,
      isCreated: true,
      article: article
    });
    this.trigger();
  },

  /*
   * This callback will be invoked as soon as ArticleActions.onUpdateArticleAsyncProgress action is triggered
   */
  onUpdateArticleAsyncProgress: function(articleId, props) {
    console.log('ArticleStore.onUpdateArticleAsyncProgress(articleId, props)', articleId, props);

    _.extend(this.data, {
      isUpdating: true,
      isUpdated: false
    });
    this.trigger();
  },

  /*
   * This callback will be invoked as soon as ArticleActions.onUpdateArticleAsyncSuccess action is triggered
   */
  onUpdateArticleAsyncSuccess: function(article) {
    console.log('ArticleStore.onUpdateArticleAsyncSuccess(article)', article);

    _.extend(this.data, {
      isUpdating: false,
      isUpdated: true,
      article: article
    });
    this.trigger();
  },

  /*
   * This callback will be invoked as soon as ArticleActions.onDeleteArticleAsyncProgress action is triggered
   */
  onDeleteArticleAsyncProgress: function(articleId) {
    console.log('ArticleStore.onDeleteArticleAsyncProgress(articleId)', articleId);

    _.extend(this.data, {
      isDeleting: true,
      isDeleted: false
    });
    this.trigger();
  },

  /*
   * This callback will be invoked as soon as ArticleActions.onDeleteArticleAsyncSuccess action is triggered
   */
  onDeleteArticleAsyncSuccess: function() {
    console.log('ArticleStore.onDeleteArticleAsyncSuccess()');

    _.extend(this.data, {
      isDeleting: false,
      isDeleted: true
    });
    this.trigger();
  }
});


/**
 * Export ArticleStore
 * @type {object}
 */
module.exports = ArticleStore;
