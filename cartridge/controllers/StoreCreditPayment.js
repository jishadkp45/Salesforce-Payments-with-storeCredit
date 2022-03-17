'use strict';
/* global customer */

var server = require('server');
// var PaymentMgr = require('dw/order/PaymentMgr');
var BasketMgr = require('dw/order/BasketMgr');
// var HookMgr = require('dw/system/HookMgr');

/**
 * StoreCreditPayment-Begin : The StoreCreditPayment-Begin endpoint will render the checkout shipping page for both guest shopper and returning shopper
 */
server.get('Begin', server.middleware.https, function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentBasket();
    var collections = require('*/cartridge/scripts/util/collections');
    var Transaction = require('dw/system/Transaction');
    var request = req.querystring;
    var checked = request.checked;
    var paymentMethodID = 'STORE_CREDIT';
    if (checked) {
        var totalGrossPrice = currentBasket.totalGrossPrice.value;
        var storecreditBalance = customer.profile.custom.training_storeCreditBalance;
        var data = {
            totalGrossPrice: totalGrossPrice,
            storecreditBalance: storecreditBalance
        };
        if (storecreditBalance > totalGrossPrice) {
            Transaction.wrap(function () {
                var paymentInstruments = currentBasket.getPaymentInstruments('CREDIT_CARD');
                collections.forEach(paymentInstruments, function (item) {
                    currentBasket.removePaymentInstrument(item);
                });
            });
        }
        var paymentInstrument;
        if (storecreditBalance < totalGrossPrice) {
            Transaction.wrap(function () {
                paymentInstrument = currentBasket.createPaymentInstrument(
                    paymentMethodID, currentBasket.totalGrossPrice
                );
            });
        }

        res.json({
            data: data,
            status: 'success',
            paymentInstrument: paymentInstrument
        });
    } else if (!checked) {
        Transaction.wrap(function () {
            var paymentInstruments = currentBasket.getPaymentInstruments('STORE_CREDIT');
            collections.forEach(paymentInstruments, function (item) {
                currentBasket.removePaymentInstrument(item);
            });
        });
    } else {
        res.json({
            error: true,
            status: 'error'
        });
    }
    next();
});
module.exports = server.exports();
