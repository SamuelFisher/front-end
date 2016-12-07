(function (){
  'use strict';

  var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

  app.get("/search*", function (req, res, next) {
    res.json([
      {
        id: 1,
        imageUrl: '',
        price: 10,
        name: 'Sock'
      }
    ]);
  });

  module.exports = app;
}());
