var React = require('react'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux'),
    mui = require('material-ui'),
    _ = require('underscore'),
    // mixin
    StyleMixin = require('../../../mixin/style'),
    LeftNavMixin = require('../../../mixin/left-nav'),
    NavigationMixin = require('../../../mixin/navigation'),
    // actions
    ArticleActions = require('../../../actions/article-actions'),
    // stores
    ArticleStore = require('../../../stores/article-store'),
    // components
    Breadcrumb = require('../../shared/breadcrumb/breadcrumb');


/*
 * ArticleList component
 */
var ArticleList = React.createClass({

  mixins: [ReactRouter.State, Reflux.ListenerMixin, LeftNavMixin, StyleMixin, NavigationMixin],

  /*
   * Get initial state
   */
  getInitialState: function() {
    return _.extend({
      breadcrumb: {
        dataSource: [
          {
            text: 'Articles',
            routeName: routeConstants.ARTICLE_LIST
          },
          {
            text: 'Edit'
          }
        ]
      }
    }, ArticleStore.data);
  },

  /*
   * On ArticleStore changed
   */
  _onArticleStoreChanged: function() {
    this.setState(ArticleStore.data);
  },

  /*
   * Delete article
   */
  deleteArticle: function() {
    ArticleActions.deleteArticle(this.getParams().articleId);
  },

  /*
   * Update article
   */
  updateArticle: function() {
    ArticleActions.updateArticleAsync(this.getParams().articleId, this.state.article);
  },

  /*
   * When component is mounted
   */
  componentDidMount: function() {
    this.listenTo(ArticleStore, this._onArticleStoreChanged);
    ArticleActions.getArticleAsync(this.getParams().articleId);
  },

  /*
   * Render DELETE button
   */
  renderDeleteButton: function() {
    if(this.state.isDeleting) {
      return (
        <mui.FlatButton label="DELETING..." />
      );
    }
    return (
      <mui.FlatButton label="DELETE" onClick={this.deleteArticle} />
    );
  },

  /*
   * Render UPDATE button
   */
  renderUpdateButton: function() {
    if(this.state.isUpdating) {
      return (
        <mui.RaisedButton primary={true} label="UPDATING..." />
      );
    }
    return (
      <mui.RaisedButton primary={true} label="UPDATE" onClick={this.updateArticle} />
    );
  },

  /*
   * Render component
   */
  render: function() {
    return (
      <div>
        <Breadcrumb height={64} dataSource={this.state.breadcrumb.dataSource} />
        <mui.Paper style={this.getEditCardStyle()}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <div>
            {this.renderDeleteButton()}
            {this.renderUpdateButton()}
          </div>
        </mui.Paper>
      </div>
    );
  }
});


/**
 * Export ArticleList component
 * @type {object}
 */
module.exports = ArticleList;
