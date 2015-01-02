var routeConstants = require('./constants/route-constants'),
    // components
    Home = require('./components/home/home'),
    ArticleList = require('./components/article/list/article-list'),
    ArticleBuilder = require('./components/article/new/article-builder'),
    ListEditor = require('./components/article/edit/article-editor');


/**
 * Export list of configured routes
 * @type {Array}
 */
module.exports = [
  {
    name: routeConstants.HOME,
    path: '/',
    handler: home
  },
  {
    name: routeConstants.ARTICLE_LIST,
    path: '/articles',
    handler: ArticleList
  },
  {
    name: routeConstants.ARTICLE_NEW,
    path: '/articles/new',
    handler: ArticleBuilder
  },
  {
    name: routeConstants.ARTICLE_VIEW,
    path: '/articles/:articleId',
    handler: ArticleViewer
  },
  {
    name: routeConstants.ARTICLE_EDIT,
    path: '/articles/:articleId/edit',
    handler: ArticleEditor
  }
];
