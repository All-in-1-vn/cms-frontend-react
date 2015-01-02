var styles = require('../../../styles'),
    color = styles.color;


/**
 * Export styles
 * @type {Object}
 */
module.exports = {
  breadcrumb: {
    display: 'flex',
    backgroundColor: color.primary,
    color: color.text,
    padding: 20,
    height: 216,
    fontFamily: 'RobotoDraft, Roboto, Helvetica Neue, sans-serif',
    fontSize: 20,
    fontWeight: 'normal',
    cursor: 'pointer'
  },
  menuIcon: {
    paddingTop: 3,
    paddingLeft: 3,
    paddingRight: 20
  },
  backButton: {
    width: 16,
    height: 16,
    marginTop: 1,
    marginRight: 10
  },
  breadcrumbItem: {
    cursor: 'pointer'
  },
  breadcrumbSeparator: {
    height: 16,
    width: 16,
    marginLeft: 5,
    marginRight: 5
  }
};
