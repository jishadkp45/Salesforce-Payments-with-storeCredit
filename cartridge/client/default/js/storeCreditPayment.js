/**
 * @param {Object} data - data includes price Credit balance information
 */
function displayMessage(data) {
    $('.credit-amount').removeClass('d-none');
    var price = data.data.totalGrossPrice;
    var storecreditBalance = data.data.storecreditBalance;
    if (storecreditBalance > price) {
        $('.credit-card-content').hide();
        $('.credit-card-content').removeClass('active');
        $('.update-to-store-credit').val('STORE_CREDIT');
        $('.payment-information').data('payment-method-id', 'STORE_CREDIT');
        $('.store-credit-balance').text('-' + price);
        $('.grand-total-sum').text('$0.00');
    } else {
        $('.credit-card-content').show();
        $('.credit-card-content').addClass('active');
    }
}

/**
 * @param {Object} data -
 */
function apiCall() {
    var checked = $('.store-credit-payment').attr('checked');
    $.ajax({
        url: 'StoreCreditPayment-Begin',
        type: 'GET',
        dataType: 'json',
        data: { checked: checked },
        success: function (data) {
            displayMessage(data);
        },
        error: function (err) {
            displayMessage(err);
        }
    });
}

$('.store-credit-payment').click(function () {
    // $('.payment-information').data('payment-method-id', 'STORE_CREDIT');
    $('.store-credit-payment').toggleClass('checked');
    if ($('.store-credit-payment').hasClass('checked')) {
        $('.store-credit-payment').attr('checked', true);
        apiCall();
    } else {
        $('.store-credit-payment').attr('checked', false);
        apiCall();
        location.reload(true);
    }
});
// apiCall();
