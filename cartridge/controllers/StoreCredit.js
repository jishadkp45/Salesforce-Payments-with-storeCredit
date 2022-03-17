'use strict';
var server = require('server');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var StoreCreditModel = require('*/cartridge/models/storeCredit');
server.get('Show', userLoggedIn.validateLoggedIn, function (req, res, next) {
    var storeCreditModel = new StoreCreditModel();
    res.render('/account/storecredit/storeCreditDetails', {
        storeCredit: storeCreditModel
    });
    next();
});
module.exports = server.exports();
