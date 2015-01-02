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
 * ArticleViewer component
 */
var ArticleViewer = React.createClass({

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
            text: 'View'
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
   * When component is mounted
   */
  componentDidMount: function() {
    this.listenTo(ArticleStore, this._onArticleStoreChanged);
    ArticleActions.getArticleAsync(this.getParams().articleId);
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
        </mui.Paper>
      </div>
    );
  }
});


/**
 * Export ArticleViewer component
 * @type {object}
 */
module.exports = ArticleViewer;
