var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    mui = require('material-ui'),
    _ = require('underscore'),
    // mixin
    StyleMixin = require('../../../mixin/style'),
    LeftNavMixin = require('../../../mixin/left-nav'),
    // actions
    ArticleActions = require('../../../actions/article-actions'),
    // stores
    ArticleStore = require('../../../stores/article-store'),
    // components
    Breadcrumb = require('../../shared/breadcrumb/breadcrumb'),
    // constants
    routeConstants = require('../../../constants/route-constants');


/*
 * Article component
 */
var Article = React.createClass({

  mixins: [Reflux.ListenerMixin, LeftNavMixin, StyleMixin],

  /*
   * Get initial state
   */
  getInitialState: function() {
    return {
      breadcrumb: {
        dataSource: [
          {
            text: 'Articles',
            routeName: routeConstants.ARTICLE_LIST
          },
          {
            text: 'Create an article'
          }
        ]
      }
    };
  },

  /*
   * On ArticleStore is triggered
   */
  _onArticleStoreChanged: function() {
    this.transitionToEditList(ArticleStore.data.id);
  },

  /*
   * Cancel to create article
   */
  cancel: function() {
    
  },

  /*
   * Create article
   */
  create: function() {
    ArticleActions.createArticle(this.state.article);
  },

  /*
   * After component is mounted
   */
  componentDidMount: function() {
    this.listenTo(ArticleStore, this._onArticleStoreChanged);
  },

  /*
   * Render component
   */
  render: function() {
    return (
      <div>
        <Breadcrumb dataSource={this.state.breadcrumb.dataSource} />
      </div>
    );
  }

});


/**
 * Export Article component
 * @type {object}
 */
module.exports = Article;
