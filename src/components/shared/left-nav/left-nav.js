var React = require('react'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux'),
    mui = require('material-ui'),
    // stores
    LeftNavStore = require('../../../stores/left-nav-store'),
    // actions
    LeftNavActions = require('../../../actions/left-nav-actions'),
    // styles
    styles = require('./styles'),
    // constants
    routeConstants = require('../../../constants/route-constants');
  

/*
 * LeftNav component
 */  
var LeftNav = React.createClass({

  mixins: [ReactRouter.Navigation, Reflux.ListenerMixin],

  /*
   * On BackIcon clicked
   */
  _onBackIconClicked: function() {
    LeftNavActions.close();
  },

  /*
   * Get initial state
   */
  getInitialState: function() {
    return {
      selectedIndex: 0
    };
  },

  /*
   * handle when LeftNavStore is triggered
   */
  onLeftNavStoreChanged: function() {
    if(this.refs.LeftNav.state.open !== LeftNavStore.isOpen) {
      this.refs.LeftNav.toggle();
    }
    this.setState({
      docked: LeftNavStore.docked
    });
  },

  /*
   * On component mounted
   */
  componentDidMount: function() {
    this.listenTo(LeftNavStore, this.onLeftNavStoreChanged);
  },

  /*
   * When menu item is selected
   */
  onMenuItemSelected: function(ev, selectedIndex, menuItem){
    this.setState({selectedIndex: selectedIndex});
    if(menuItem.route) {
      router.transitionTo(menuItem.route);
    }
  },

  /*
   * Render header
   */
  renderHeader: function() {
    return (
      <div style={styles.header}>
        <img style={styles.logo} src="/assets/images/AR-Logo-Horizontal.png" />
      </div>
    );
  },

  /*
   * Render
   */
  render: function() {
    var menuItems = [
      {
        data: (
          <div style={styles.backItem} onClick={this._onBackIconClicked}>
            <mui.Icon icon="hardware-keyboard-backspace" />
          </div>
        )
      },
      { 
        route: routeConstants.HOME,
        data: (
          <span style={styles.leftNavItem}>
            <img style={styles.leftNavIcon} src='assets/images/icon-profile.svg' />
            <span style={styles.leftNavText}>Hung1</span>
          </span>
        )
      },
      { 
        route: routeConstants.ARTICLES_LIST,
        data: (
          <span style={styles.leftNavItem}>
            <img style={styles.leftNavIcon} src='assets/images/icon-list.svg' />
            <span style={styles.leftNavText}>Articles</span>
          </span>
        )
      }
    ];

    return (
      <mui.LeftNav 
        ref="LeftNav"
        docked={this.state.docked}
        header={this.renderHeader()}
        menuItems={menuItems} 
        selectedIndex={this.state.selectedIndex}
        onChange={this.onMenuItemSelected} />
    );  
  }
});


/**
 * Export component
 * @type {object}
 */
module.exports = LeftNav;