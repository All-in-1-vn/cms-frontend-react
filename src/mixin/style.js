var _ = require('underscore');


/*
 * Palette color
 */
var color = {
  darkPrimary: '#303F9F',
  primary: '#303F9F',
  lightPrimary: '#C5CAE9',
  text: '#FFFFFF',
  icon: '#FFFFFF',
  accent: '#E91E63',
  primaryText: '#212121',
  secondaryText: '#727272',
  divider: '#B6B6B6'
};


/*
 * Style for cardList
 */
var cardListStyle = {};


/*
 * Style for card
 */
var cardStyle = {};


/*
 * Style for MORE button
 */
var moreButtonStyle = {};


/**
 * Export reusable functions & properties
 * @return {object} Functions
 */
module.exports = {
  getCardListStyle: function() {
    return cardListStyle;
  },
  getCardStyle: function() {
    return cardStyle;
  },
  getMoreButtonStyle: function() {
    return moreButtonStyle;
  },
  getDividerStyle: function() {
    return {};
  },
  getEditCardStyle: function() {
    return {};
  }
};
