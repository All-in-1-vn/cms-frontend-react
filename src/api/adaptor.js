'use strict';

var $ = require('jquery'),
    _ = require('underscore');


/*
 * Resolve url
 */
var resolveUrl = function(url, params) {
  var queryStrings = [];
  _.each(params, function(value, key) {
    var param = ':' + key;
    if (url.indexOf(param) >= 0) {
      url = url.replace(param, value);
    } else {
      queryStrings.push(key + '=' + value);
    }
  });

  if (!queryStrings.length) {
    return url;
  }

  return url + '?' + queryStrings.join('&');
};


/**
 * Exports helper function
 * @type {Object}
 * @return {Object} helper function
 */
module.exports = {

  /*
   * Send AJAX request
   */
  sendRequest: function(options) {
    options = _.extend(options, {
      url: resolveUrl(options.url, options.params),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
    });  

    if (options.data) {
      options.data = JSON.stringify(options.data);
    }
    delete options.params;
    console.log('adaptor.sendRequest(options)', options);

    return $.when($.ajax(options));
  },
};
