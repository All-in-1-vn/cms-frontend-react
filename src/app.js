var React = require('react'),
		ReactRouter = require('react-router'),
    Reflux = require('reflux'),
    // mixin
    LeftNavMixin = require('./mixin/left-nav'),
    // components
    LeftNav = require('./components/shared/left-nav/left-nav');


/*
 * App class
 */
var App = React.createClass({

  mixins: [Reflux.ListenerMixin, LeftNavMixin],

  render: function() {
    return (
      <div>
        <LeftNav />
        <ReactRouter.RouteHandler />
      </div>
    )
  }
});



