var React = require('react'),
    Reflux = require('reflux'),
    _ = require('underscore'),
    // mixin
    StyleMixin = require('../../../mixin/style'),
    // style
    styles = require('./styles'),
    // actions
    LeftNavActions = require('../../../actions/left-nav-actions'),
    // stoes
    LeftNavStore = require('../../../stores/left-nav-store'),
    // constants
    routeConstants = require('../../../constants/route-constants');


/*
 * Breadcrumb component
 */
var Breadcrumb = React.createClass({

  /*
   * Reusable functions & properties
   */
  mixins: [Reflux.ListenerMixin, StyleMixin],

  /*
   * Explicitly declare propTypes passed from parent component
   */
  propTypes: {
    backButton: React.PropTypes.object,
    dataSource: React.PropTypes.array,
    height: React.PropTypes.number,
    fontSize: React.PropTypes.number,
    showMenuIcon: React.PropTypes.bool
  },

  /*
   * Get initial state
   */
  getInitialState: function() {
    return {
      isMenuIconShown: this.props.showMenuIcon
    };
  },

  /*
   * Transition to a route
   */
  goTo: function(routeData) {
    window.router.transitionTo(routeData.routeName, routeData.routeParams || {}, routeData.routeQuery || {});
  },

  /*
   * On LeftNavStore changed
   */
  _onLeftNavStoreChanged: function() {
    this.setState({
      isMenuIconShown: this.props.showMenuIcon && (!LeftNavStore.isOpen || !LeftNavStore.docked)
    });
  },

  /*
   * Show left navigation
   */
  showLeftNav: function() {
    LeftNavActions.open();
  },

  /*
   * When component is mounted
   */
  componentDidMount: function() {
    this.listenTo(LeftNavStore, this._onLeftNavStoreChanged);
  },

  /*
   * Render menu item
   */
  renderMenuItem: function() {
    if(!this.state.isMenuIconShown) {
      return;
    }
    return (
      <div style={styles.menuIcon} onClick={this.showLeftNav}>
        <img src="/assets/images/icon-list.svg" alt="=" />
      </div>
    );
  },

  /*
   * Render back button
   */
  renderBackButton: function() {
    if(!this.props.backButton) {
      return;
    }
    return (
      <div style={styles.backButton} onClick={this.goTo.bind(null, this.props.backButton)}>
        <img style={styles.backButton} src="assets/images/docArrowBack.png" alt="<" />
      </div>
    );
  },

  /*
   * Render separator
   */
  renderBreadcrumbSeparator: function(index) {
    return (
      <div key={index * 2 + 1}>
        <img style={styles.breadcrumbSeparator} src="assets/images/docArrow.png" alt=">" />
      </div>
    );
  },

  /*
   * Render link item
   */
  renderLinkItem: function(index, item) {
    return (
      <div key={index * 2} style={styles.breadcrumbItem} onClick={this.goTo.bind(null, item)}>
        {item.text}
      </div>
    );
  },

  /*
   * Render text item
   */
  renderTextItem: function(index, text) {
    return (
      <div key={index * 2}>
        {text}
      </div>
    );
  },

  /*
   * Render items
   */
  renderItems: function() {
    var self = this;
    var components = [];
    _.each(this.props.dataSource, function(item, index, list) {
      if(item.routeName) {
        components.push(self.renderLinkItem(index, item));
      } else {
        components.push(self.renderTextItem(index, item.text))
      }
      if(index < list.length - 1) {
         components.push(self.renderBreadcrumbSeparator(index));
      }
    });
    return components;
  },

  /*
   * Render component
   */
  render: function() {
    var style = _.extend(_.clone(styles.breadcrumb), { height: this.props.height});
    return (
      <div style={style}>
        {this.renderMenuItem()}
        {this.renderBackButton()}
        {this.renderItems()}
      </div>
    );
  }
});


/**
 * Export Breadcrumb component
 * @type {object}
 */
module.exports = Breadcrumb;
