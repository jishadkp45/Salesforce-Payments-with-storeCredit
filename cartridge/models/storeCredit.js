'use strict';
var Money = require('dw/value/Money');
var storeCreditUtils = require('*/cartridge/scripts/storecredit/utils/storeCreditUtils.js');
/* globals customer*/
/* globals session*/
/**
 * @constructor
 */
function storeCreditHistory() {
    var storeCreditData = [];
    var credithistory = customer.profile.custom.training_storeCreditHistory;
    for (var i = 0; i < credithistory.length; i++) {
        var historyData = credithistory[i].split('|');
        var newHistory = {};
        newHistory.date = historyData[0];
        newHistory.amount = new Money(historyData[1], session.getCurrency().getCurrencyCode()).toFormattedString();
        newHistory.note = historyData[2];
        storeCreditData.push(newHistory);
    }
    return storeCreditData;
}
/**
 * @constructor
 */
function storeCredit() {
    this.storeCreditBalance = storeCreditUtils.getStoreCreditBalance();
    this.storeCreditHistory = storeCreditHistory();
}
module.exports = storeCredit;
