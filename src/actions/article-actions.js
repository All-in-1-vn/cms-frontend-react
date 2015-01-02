'use strict';

var Reflux = require('reflux'),
    _ = require('underscore'),
    ArticleApi = require('../api/article-api');


var actions = [
  'getArticlesAsync',
  'getArticlesAsyncProgress',
  'getArticlesAsyncSuccess',
  'getArticlesAsyncError',

  'getArticleAsync',
  'getArticleAsyncProgress',
  'getArticleAsyncSuccess',
  'getArticleAsyncError',

  'createArticleAsync',
  'createArticleAsyncProgress',
  'createArticleAsyncSuccess',
  'createArticleAsyncError',

  'updateArticleAsync',
  'updateArticleAsyncProgress',
  'updateArticleAsyncSuccess',
  'updateArticleAsyncError',

  'deleteArticleAsync',
  'deleteArticleAsyncProgress',
  'deleteArticleAsyncSuccess',
  'deleteArticleAsyncError'
];


/*
 * Article actions
 */
var ArticleActions = Reflux.createArticleActions(actions);


/**
 * Resolve data via REST api then call appropriate actions
 * @param  {object} options Pagination: k, skip, limit
 */
ArticleActions.getArticlesAsync.preEmit = function(options) {
  console.log('ArticleActions.getArticlesAsync.preEmit(options)', options);

  ArticleApi.getArticles(options)
    .done(ArticleActions.getArticlesAsyncSuccess)
    .fail(ArticleActions.getArticlesAsyncError);
};


/**
 * Resolve data via REST api then call appropriate actions
 * @param  {string} articleId   Article id
 */
ArticleActions.getArticleAsync.preEmit = function(articleId) {
  console.log('ArticleActions.getArticleAsync.preEmit(articleId)', articleId);

  ArticleApi.getArticle(articleId)
    .done(ArticleActions.getArticleAsyncSuccess)
    .fail(ArticleActions.getArticleAsyncError);
};


/**
 * Resolve data via REST api then call appropriate actions
 * @param  {object} article     Article
 * @param  {string} categoryId  Category id
 */
ArticleActions.createArticleAsync.preEmit = function(article, categoryId) {
  console.log('ArticleActions.createArticleAsync.preEmit()');

  ArticleApi.createArticle(article, categoryId)
    .done(ArticleActions.createArticleAsyncSuccess)
    .fail(ArticleActions.createArticleAsyncError);
};


/**
 * Resolve data via REST api then call appropriate actions
 * @param  {string} articleId   Article id
 * @param  {object} props       Properties to be updated
 */
ArticleActions.updateArticleAsync.preEmit = function(articleId, props) {
  console.log('ArticleActions.updateArticleAsync.preEmit(articleId, props)', articleId, props);

  ArticleApi.updateArticle(articleId, props)
    .done(ArticleActions.updateArticleAsyncSuccess)
    .fail(ArticleActions.updateArticleAsyncError);
};


/**
 * Resolve data via REST api then call appropriate actions
 * @param  {string} articleId   Article id
 */
ArticleActions.deleteArticleAsync.preEmit = function(articleId) {
  console.log('ArticleActions.deleteArticleAsync.preEmit(articleId)', articleId);

  ArticleApi.deleteArticle(articleId)
    .done(ArticleActions.deleteArticleAsyncSuccess)
    .fail(ArticleActions.deleteArticleAsyncError);
};


/**
 * Exports
 * @type {object}
 */
module.exports = ArticleActions;
