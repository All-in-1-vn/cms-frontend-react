'use strict';

var $ = require('jquery'),
    _ = require('underscore'),
    adaptor = require('./adaptor');


/**
 * Exports
 * @return {object} Functions
 */
module.exports = {

  getArticles: function(categoryId, options) {
    if (!options) {
      options = {
        skip: 0,
        limit: 5
      };
    }
    console.log('ArticleApi.getArticles(options)', options);

    return adaptor.sendRequest({
      url: '/api/articles/:articleId',
      method: 'GET',
      params: _.extend(options, {categoryId: categoryId})
    });
  },


  getArticle: function(articleId) {
    console.log('ArticleApi.getArticle(articleId)', articleId);

    return adaptor.sendRequest({
      url: '/api/articles/:articleId',
      method: 'GET',
      params: {
        articleId: articleId
      }
    });
  },


  createArticle: function(article, categoryId) {
    console.log('ArticleApi.createArticle(article, categoryId)', article, categoryId);

    return adaptor.sendRequest({
      url: '/api/articles',
      method: 'POST',
      data: _.extend({categoryId: categoryId}, article)
    });
  },


  updateArticle: function(articleId, props) {
    console.log('ArticleApi.updateArticle(articleId, props)', articleId, props);

    return adaptor.sendRequest({
      url: '/api/articles/:articleId',
      method: 'PATCH',
      params: {
        articleId: articleId
      },
      data: props
    });
  },


  deleteArticle: function(articleId) {
    console.log('ArticleApi.deleteArticle(articleId)', articleId);

    return adaptor.sendRequest({
      url: '/api/articles/:articleId',
      method: 'DELETE',
      params: {
        articleId: articleId
      }
    });
  }
};
