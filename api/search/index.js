(function (){
  'use strict';

  var qs = require('querystring');
  var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

  app.get("/search*", function (req, res, next) {
    var str = req.url.split('?')[1];
    var query = qs.parse(str).q;
    var url = endpoints.elasticsearchUrl + "?q=" + query;
    helpers.simpleHttpRequest(url, res, next);
  });

  module.exports = app;
}());
