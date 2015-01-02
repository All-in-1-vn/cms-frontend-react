var routeConstants = require('../constants/route-constants');


/**
 * Export Mixin object
 * @type {Object}
 */
module.exports = {

  goToHome: function() {
    window.router.transitionTo(routeConstants.HOME);
  },

  goToArticleList: function() {
    window.router.transitionTo(routeConstants.ARTICLE_LIST);
  },

  goToArticleBuilder: function() {
    window.router.transitionTo(routeConstants.ARTICLE_NEW);
  },

  goToArticleEditor: function(articleId) {
    window.router.transitionTo(routeConstants.ARTICLE_EDIT, {
      articleId: articleId
    });
  },

  goToArticleViewer: function(articleId) {
    window.router.transitionTo(routeConstants.ARTICLE_VIEW, {
      articleId: articleId
    });
  }
};
