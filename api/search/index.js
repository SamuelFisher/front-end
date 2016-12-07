(function (){
  'use strict';

  var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

  app.get("/search*", function (req, res, next) {
    res.json([]);
  });

  module.exports = app;
}());
