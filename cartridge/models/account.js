'use strict';
var base = module.superModule;
/**
* Account class that represents the current customer's profile dashboard
* @param {Object} currentCustomer - Current customer
* @param {Object} addressModel - The current customer's preferred address
* @param {Object} orderModel - The current customer's order history
* @constructor
*/
function account(currentCustomer, addressModel, orderModel) {
    base.call(this, currentCustomer, addressModel, orderModel);
    var storeCreditUtils = require('*/cartridge/scripts/storecredit/utils/storeCreditUtils.js');
    this.storeCreditBalance = storeCreditUtils.getStoreCreditBalance();
}

module.exports = account;
