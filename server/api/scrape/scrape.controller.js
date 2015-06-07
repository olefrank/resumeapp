'use strict';

var _ = require('lodash');
var Scrape = require('./scrape.model');
var scrapeService = require('./scrape.service');

// get latest scrape
exports.show = function(req, res) {
    Scrape.findOne({ "$query":{}, "$orderby":{ "_id": -1 }}, function(err, scrape) {
        if (err) { return handleError(res, err); }
        if (!scrape) { return res.send(404); }
        return res.json(scrape)
    });
};

// Creates a new scrape in the DB.
exports.create = function(req, res) {
    scrapeService.getData()
        .then(function(data) {
            Scrape.create(data, function(err, scrape) {
                if(err) { return handleError(res, err); }
                return res.json(201, scrape);
            });
        });
};

function handleError(res, err) {
    return res.send(500, err);
}