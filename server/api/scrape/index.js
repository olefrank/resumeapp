'use strict';

var express = require('express');
var controller = require('./scrape.controller');

var router = express.Router();

//  todo: cleanup
//router.get('/', controller.index);
router.get('/', controller.show);
//router.get('/:id', controller.show);
router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;