'use strict';
/* global customer */
// var collections = require('*/cartridge/scripts/util/collections');
// var PaymentInstrument = require('dw/order/PaymentInstrument');
// var PaymentMgr = require('dw/order/PaymentMgr');
// var PaymentStatusCodes = require('dw/order/PaymentStatusCodes');
var Resource = require('dw/web/Resource');
// var Transaction = require('dw/system/Transaction');
// var PaymentInstrument = require('dw/order/PaymentInstrument');
var Money = require('dw/value/Money');
var collections = require('*/cartridge/scripts/util/collections');
var Transaction = require('dw/system/Transaction');
// const customer = require('../../../../../../../../storefront-reference-architecture-master/cartridges/app_storefront_base/cartridge/client/default/js/checkout/customer');

// function createToken() {
//     return Math.random().toString(36).substr(2);
// }

/**
 * Verifies that entered credit card information is a valid card. If the information is valid a
 * credit card payment instrument is created
 * @param {dw.order.Basket} basket Current users's basket
 * @param {string} paymentMethodID - paymentmethodID
 * @param {Object} req the request object
 * @return {Object} returns an error object
 */
function Handle(basket, paymentMethodID, req) {
    var currentBasket = basket;
    var cardErrors = {};
    var serverErrors = [];
    var creditCardStatus;

    var storeCreditBalance = customer.profile.custom.training_storeCreditBalance;
    var formattedStoreCreditBalance = new Money(storeCreditBalance, basket.currencyCode);


    Transaction.wrap(function () {
        if (currentBasket.totalGrossPrice.value > storeCreditBalance) {
            currentBasket.createPaymentInstrument(
                paymentMethodID, formattedStoreCreditBalance
            );
        } else {
            var paymentInstruments = currentBasket.getPaymentInstruments(
                paymentMethodID
            );

            collections.forEach(paymentInstruments, function (item) {
                currentBasket.removePaymentInstrument(item);
            });

            var paymentInstrument = currentBasket.createPaymentInstrument(
                paymentMethodID, currentBasket.totalGrossPrice
            );
            paymentInstrument.setCreditCardType('STORE_CREDIT');
        }
    });
    creditCardStatus = true;
    return { fieldErrors: cardErrors, serverErrors: serverErrors, error: false, creditCardStatus: creditCardStatus };
}

/**
 * Authorizes a payment using a credit card. Customizations may use other processors and custom
 *      logic to authorize credit card payment.
 * @param {number} orderNumber - The current order's number
 * @param {dw.order.PaymentInstrument} paymentInstrument -  The payment instrument to authorize
 * @param {dw.order.PaymentProcessor} paymentProcessor -  The payment processor of the current
 *      payment method
 * @return {Object} returns an error object
 */
function Authorize(orderNumber, paymentInstrument, paymentProcessor) {
    var serverErrors = [];
    var fieldErrors = {};
    var error = false;

    try {
        var totalPrice = paymentInstrument.paymentTransaction.amount.value;
        var storeCreditBalance = customer.profile.custom.training_storeCreditBalance;
        if (storeCreditBalance > totalPrice) {
            Transaction.wrap(function () {
                paymentInstrument.paymentTransaction.setTransactionID(orderNumber);
                paymentInstrument.paymentTransaction.setPaymentProcessor(paymentProcessor);
                customer.profile.custom.training_storeCreditBalance -= totalPrice;
            });
        } else {
            Transaction.wrap(function () {
                paymentInstrument.paymentTransaction.setTransactionID(orderNumber);
                paymentInstrument.paymentTransaction.setPaymentProcessor(paymentProcessor);
                customer.profile.custom.training_storeCreditBalance -= storeCreditBalance;
            });
        }
    } catch (e) {
        error = true;
        serverErrors.push(
            Resource.msg('error.technical', 'checkout', null)
        );
    }

    return { fieldErrors: fieldErrors, serverErrors: serverErrors, error: error };
}

exports.Authorize = Authorize;
exports.Handle = Handle;
