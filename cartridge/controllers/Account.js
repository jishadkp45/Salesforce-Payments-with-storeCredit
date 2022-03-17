 /* eslint-env es6*/
/* global customer */
'use strict';

var server = require('server');
server.extend(module.superModule);

var StringUtils = require('dw/util/StringUtils');
var Calendar = require('dw/util/Calendar');
const SignupStoreCredit = 10;
const pipe = '|';

/**
 * Account-SubmitRegistration : The Account-SubmitRegistration endpoint is the endpoint that gets hit when a shopper submits their registration for a new account
 * @name Base/Account-SubmitRegistration
 * @function
 * @memberof Account
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.append('SubmitRegistration', function (req, res, next) {
    var Transaction = require('dw/system/Transaction');
    var Resource = require('dw/web/Resource');
    this.on('route:BeforeComplete', function () {
        var viewData = res.getViewData();
        if (viewData.success === true) {
            Transaction.wrap(function () {
                var currentDate = StringUtils.formatCalendar(new Calendar(), 'dd-mm-yyy');
                customer.profile.custom.training_storeCreditBalance = SignupStoreCredit;
                var newCreditHistory = [currentDate, SignupStoreCredit, Resource.msg('label.storeCreditHistory.signup.Note', 'storeCredit', null)];
                newCreditHistory = newCreditHistory.join(pipe);
                customer.profile.custom.training_storeCreditHistory = new Array(newCreditHistory);
            });
        }
    });
    next();
});
module.exports = server.exports();
