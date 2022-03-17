/* globals customer*/
/* globals session*/
'use strict';
/**
* @constructor
*/
function getStoreCreditBalance() {
    var Money = require('dw/value/Money');
    var creditBalance = customer.profile.custom.training_storeCreditBalance > 0 ? customer.profile.custom.training_storeCreditBalance : 0;
    var formattedStoreCreditBalance = new Money(creditBalance, session.getCurrency().getCurrencyCode()).toFormattedString();
    return formattedStoreCreditBalance;
}

module.exports = {
    getStoreCreditBalance: getStoreCreditBalance
};
