require(['jquery'], function($){
    $(document).ready(function() {
        $(document).on('blur', '#product_addtocart_form .qty, .minicart-items .item-qty, #shopping-cart-table .input-text.qty', function () {
            var $this = $(this);
            if(isNaN($this.val())) {
                $this.val(1);
            }
            else if($this.hasClass('qty--integer')) {
                $this.val((1 * $this.val()).toFixed(0));
            }
            else {
                var thisVal = (1 * $this.val()).toFixed(1);
                if(thisVal % 1 === 0) {
                    thisVal = (1 * thisVal).toFixed(0);
                }
                else {
                    thisVal = thisVal + '0';
                }
                $this.val(thisVal);
            }
        })
    });


    $('.list-of-contents .link, .return-to.link').on('click', function() {
        $('p em').removeClass('currentTerm');
        var navigateId = $(this).attr('id').split('data-')[1];
        $('html, body').animate({
            scrollTop: $('#' + navigateId).offset().top - 7
        }, 500);
        if ($('#' + navigateId + ' em').length) {
            $('#' + navigateId + ' em:last-child').addClass('currentTerm');
        } else {
            $('#' + navigateId).parent('p').find('em:last-child').addClass('currentTerm');
        }
    });

    $('.product-collapsable_wrapper h3').on('click', function () {
        console.log('toggle');
        $('.product-collapsable_wrapper h3').toggleClass('care-tips-expanded');
        $('.product-collapsable_wrapper h3 + ul').slideToggle();
    });

    if($('body').hasClass('catalog-product-view')) {
        var response = '';
        $.ajax({
            type: 'GET',
//        url: 'http://magento.local/info/help',
            url: '/info/help',
            async: true,
            success: function(data) {
                response = $(data).find('.column.main');
                $('.feature_tooltip').each(function() {
                    var $this = $(this);
                    var thisTooltip = response.find('[data-value="' + $this.data('value') + '"]');
                    if (thisTooltip.length) {
                        $this.siblings('.tooltip_wrapper').html('<i class="icon-info"></i><span class="feature_tooltip-text">' + thisTooltip.html() + '</span>');
                    }
                });
            }
        });
    }
});