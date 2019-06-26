 require(['jquery', 'bodyScrollLock', 'swiper'], function($, bodyScrollLock, Swiper) {
    function isMobile() {
        try {
            document.createEvent('TouchEvent');
            return true;
        }
        catch(e) {
            return false;
        }
    }

    $(document).ready(function() {
        if(isMobile()) {
            document.body.classList.add('touch--screen');
        }
        else {
            document.body.classList.add('touch--screen-not');
        }

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
        });

        $('.main--menu-dropdown-mobile').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $this = $(this);
            $('.main--menu-dropdown-mobile').not($this).filter('.active').removeClass('active').next('.main--menu-submenu').slideUp();
            $this.toggleClass('active').next('.main--menu-submenu').slideToggle();
        });

        if($(window).width() > 767) {
            window.addEventListener("scroll", function() {
                var st = window.pageYOffset || document.documentElement.scrollTop;
                document.body.classList.toggle('sticky--header', (st > 120));
            }, false);
        }
        else {
            var navTimeout;
            jQuery(document).on('click', '.nav-toggle', function() {

                clearTimeout(navTimeout);
                navTimeout = setTimeout(function(){
                    if($('html').hasClass('nav-open')) {
                        bodyScrollLock.disableBodyScroll(document.querySelector('.sections.nav-sections'));
                    }
                    else {
                        bodyScrollLock.clearAllBodyScrollLocks();
                    }
                }, 300);
            })
        }

        $(document).on('click', '.toolbar-products .sorter--action', function () {
            var $this = $(this);
            var url = updateUrlParameter('product_list_order', 'price');
            url = updateUrlParameter('product_list_dir', $this.data('sort') , url);
            $('.sorting--a').first().attr('href', url).trigger('click');
        });

        $(document).on('click', '.sorter--remove', function () {
            var url = updateUrlParameter('product_list_order', 'position');
            url = updateUrlParameter('product_list_dir', 'asc' , url);
            $('.sorting--a').first().attr('href', url).trigger('click');
        });

        jQuery(document).on('click', '.filters--toggler', function () {
           jQuery('body').toggleClass('filters--opened');
        });

        jQuery(document).on('click', '.filters--overlay', function () {
            jQuery('body').removeClass('filters--opened');
        });

        jQuery(document).on('click', '[data-scroll]', function () {
            jQuery('html, body').stop().animate({
                    scrollTop: jQuery(jQuery(this).data('scroll')).offset().top - 100
                }, 1000, 'swing');
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

        $('.inputfile').each(function()
        {
            var $input = $( this ),
                $label = $input.next('label'),
                labelVal = $label.html();

            $input.on( 'change', function(e)
            {
                var fileName = '';

                if(this.files && this.files.length > 1)
                    fileName = ( this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                else if(e.target.value)
                    fileName = e.target.value.split( '\\' ).pop();

                if(fileName)
                    $label.find('span').html(fileName);
                else
                    $label.html(labelVal);
            });

            // Firefox bug fix
            $input
                .on('focus', function(){ $input.addClass('has-focus'); })
                .on('focus', function(){ $input.addClass('has-focus'); })
                .on('blur', function(){ $input.removeClass('has-focus'); });
        });
    });

//     Related products swiper
     var relatedProductsSwiper = new Swiper ('.related-products-swiper', {
         slidesPerView: 4,
         spaceBetween: 20,
         pagination: {
             el: '.related-products-swiper-pagination',
             clickable: true
         },
         breakpoints: {
             // when window width is <= 320px
             767: {
                 slidesPerView: 1,
                 spaceBetween: 20
             }
         },
         navigation: {
             nextEl: '.related-products-swiper-next',
             prevEl: '.related-products-swiper-prev'
         }
     });


});

function updateUrlParameter(key, value, uri) {
    if (!uri) uri = window.location.href;
    var i = uri.indexOf('#');
    var hash = i === -1 ? ''  : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);

    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";

    if (!value) {
        uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
        if (uri.slice(-1) === '?') {
            uri = uri.slice(0, -1);
        }
        if (uri.indexOf('?') === -1) uri = uri.replace(/&/, '?');
    } else if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        uri = uri + separator + key + "=" + value;
    }
    return uri + hash;
}