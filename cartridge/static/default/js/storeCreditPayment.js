/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/app_trainingmerchant/cartridge/client/default/js/storeCreditPayment.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/app_trainingmerchant/cartridge/client/default/js/storeCreditPayment.js":
/*!*******************************************************************************************!*\
  !*** ./cartridges/app_trainingmerchant/cartridge/client/default/js/storeCreditPayment.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @param {Object} data - data includes price Credit balance information\n */\nfunction displayMessage(data) {\n    $('.credit-amount').removeClass('d-none');\n    var price = data.data.totalGrossPrice;\n    var storecreditBalance = data.data.storecreditBalance;\n    if (storecreditBalance > price) {\n        $('.credit-card-content').hide();\n        $('.credit-card-content').removeClass('active');\n        $('.update-to-store-credit').val('STORE_CREDIT');\n        $('.payment-information').data('payment-method-id', 'STORE_CREDIT');\n        $('.store-credit-balance').text('-' + price);\n        $('.grand-total-sum').text('$0.00');\n    } else {\n        $('.credit-card-content').show();\n        $('.credit-card-content').addClass('active');\n    }\n}\n\n/**\n * @param {Object} data -\n */\nfunction apiCall() {\n    var checked = $('.store-credit-payment').attr('checked');\n    $.ajax({\n        url: 'StoreCreditPayment-Begin',\n        type: 'GET',\n        dataType: 'json',\n        data: { checked: checked },\n        success: function (data) {\n            displayMessage(data);\n        },\n        error: function (err) {\n            displayMessage(err);\n        }\n    });\n}\n\n$('.store-credit-payment').click(function () {\n    // $('.payment-information').data('payment-method-id', 'STORE_CREDIT');\n    $('.store-credit-payment').toggleClass('checked');\n    if ($('.store-credit-payment').hasClass('checked')) {\n        $('.store-credit-payment').attr('checked', true);\n        apiCall();\n    } else {\n        $('.store-credit-payment').attr('checked', false);\n        apiCall();\n        location.reload(true);\n    }\n});\n// apiCall();\n\n\n//# sourceURL=webpack:///./cartridges/app_trainingmerchant/cartridge/client/default/js/storeCreditPayment.js?");

/***/ })

/******/ });