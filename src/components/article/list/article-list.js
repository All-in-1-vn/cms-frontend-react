var React = require('react'),
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
    ArticleListStore = require('../../../stores/article-list-store'),
    // components
    Breadcrumb = require('../../shared/breadcrumb/breadcrumb');


/*
 * ArticleList component
 */
var ArticleList = React.createClass({

  mixins: [Reflux.ListenerMixin, LeftNavMixin, StyleMixin, NavigationMixin],

  /*
   * Get initial state
   */
  getInitialState: function() {
    return _.extend({
      breadcrumb: {
        dataSource: [
          {
            text: 'Articles'
          }
        ]
      }
    }, ArticleListStore.data);
  },

  /*
   * On ArticleListStore changed
   */
  _onArticleListStoreChanged: function() {
    this.setState(ArticleListStore.data);
  },

  /*
   * Load more articles
   */
  loadMore: function() {
    var options = _.pick(this.state, ['skip', 'limit']);
    options.skip += options.limit;
    ArticleActions.getArticlesAsync(options);
  },

  /*
   * When component is mounted
   */
  componentDidMount: function() {
    this.listenTo(ArticleListStore, this._onArticleListStoreChanged);
    this._onArticleListStoreChanged();
    ArticleActions.getArticlesAsync();
  },

  /*
   * Render article list
   */
  renderArticleList: function() {
    var self = this;
    if(this.state.isLoading) {
      return (
        <div>Loading...</div>
      );
    }
    return this.state.data.map(function(article, index) {
      return (
        <mui.Paper key={index} onClick={self.goToArticleEditor.bind(null, article.id)}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </mui.Paper>
      );
    })
  },

  /*
   * Render MORE button
   */
  renderMoreButton: function() {
    if(this.state.skip + this.state.limit >= this.state.count) {
      return;
    }
    if(this.state.isLoadingMore) {
      return (
        <div>Loading more articles...</div>
      );
    }
    return (
      <mui.FlatButton label="MORE" onClick={this.loadMore}/>
    );
  },

  /*
   * Render component
   */
  render: function() {
    return (
      <div>
        <Breadcrumb height={64} dataSource={this.state.breadcrumb.dataSource} />
        <mui.FloatingActionButton style={styles.fab} icon="content-add" onClick={this.goToArticleBuilder} />
        <div style={this.getCardStyle()}>
          {this.renderArticleList()}
        </div>
        <div style={this.getMoreButtonStyle()}>
          {this.renderMoreButton()}
        </div>
      </div>
    );
  }
});


/**
 * Export ArticleList component
 * @type {object}
 */
module.exports = ArticleList;
