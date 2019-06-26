require([
    'jquery'
], function ($) {
    'use strict';
    jQuery(document).ready(function(){
        jQuery(document).ajaxStop(function () {
            var $priceField = jQuery('.admin__control-text[name="product[price]"]');
            var pPrice = $priceField.val();
            var cRate = jQuery('.admin__control-text[name="provence[currencyrate]"]').val();
            var priceUAH = Math.round(pPrice * cRate * 100) / 100;
            $priceField.parent().addClass('price--converted');
            jQuery('<style>.price--converted:after{content: "' + priceUAH + ' UAH"; position: absolute; left: 100%; color: orangered; line-height: 33px; margin-left: 10px; white-space: nowrap; }</style>').appendTo('head');
        });
    });
});