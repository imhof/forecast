var Client = require('request-json').JsonClient;
var QueryString = require('querystring');

var ForecastIO = module.exports = function(options) {
  this.options = options || {};
  this.client  = new Client('https://api.forecast.io/forecast/' + this.options.key + '/');
};

ForecastIO.prototype.query = function(apiParams, queryParams, callback) {
  if(!this.options.key) return callback('No API key specified - Get one from https://developer.forecast.io');

  // add known config options to the URL query parameters if not specified explicitly
  if (queryParams.units === undefined) {
    queryParams.units = this.options.units;
  }

  if (queryParams.lang === undefined) {
    queryParams.lang = this.options.language;
  }

  this.client.get(apiParams.join(',') + '?' + QueryString.stringify(queryParams), callback);
};

ForecastIO.prototype.get = function(apiParams, queryParams, callback) {
  this.query(apiParams, queryParams, function(err, res, body) {
    if(err || !body || !body.currently) return callback(err);
    return callback(null, body);
  });
};
