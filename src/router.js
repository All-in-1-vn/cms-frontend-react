var React = require('react'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux'),
    App = require('./app'),
    routeData = require('./route-data');


/*
 * Render routes
 */
var renderRoutes = function() {
  return routeData.map(function(route, index) {
    return (
      <ReactRouter.Route key={index} name={route.name} path={route.path} handler={route.handler} />
    );
  })
};


/*
 * Route component
 */
var routeComponent = (
  <ReactRouter.Route handler={App}>
    {renderRoutes()}
  </ReactRouter.Route>
);


/*
 * Run the app with routes
 */
window.router = ReactRouter.run(routeComponent, function(Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});