var React = require('react'),
    // mixin
    LeftNavMixin = require('../../mixin/left-nav'),
    StyleMixin = require('../../mixin/style'),
    //components
    Breadcrumb = require('../../components/shared/breadcrumb/breadcrumb'),
    ArticleList = require('../../components/article/list/article-list');


/*
 * Home component
 */
var Home = React.createClass({

  /*
   * Reusable code
   */
  mixins: [LeftNavMixin, StyleMixin],

  /*
   * Get initial state
   */
  getInitialState: function() {
    return {
      breadcrumb: {
        dataSource: [
          {
            text: 'Home'
          }
        ]
      }
    };
  },

  /*
   * Render component
   */
  render: function() {
    return (
      <div>
        <Breadcrumb dataSource={this.state.breadcrumb.dataSource}></Breadcrumb>
        <ArticleList />
      </div>
    );
  }
});


/**
 * Export Home component
 * @type {object}
 */
module.exports = Home;
