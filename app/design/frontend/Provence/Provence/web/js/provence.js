 require(['jquery', 'bodyScrollLock', 'swiper', 'fancybox'], function($, bodyScrollLock, Swiper, fancybox) {

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

        $(document).on('blur', '#product_addtocart_form .qty, .minicart-items .item-qty, #shopping-cart-table .input-text.qty, .wishlist .input-text.qty', function () {
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
            });

            jQuery('.footer.links h5').on('click', function () {
                jQuery(this).toggleClass('active').parents('.footer.links').find('.item').slideToggle();
            });
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


     $('.open-album').on('click', function(e) {
         e.preventDefault();
         $('#gallery_location').find('a').first().trigger('click');
     });



});

 function initMap() {
     var center = {lat: 50.5198, lng: 30.453};
     var styles =
         [
             {
                 "featureType": "administrative.land_parcel",
                 "elementType": "labels",
                 "stylers": [
                     {
                         "visibility": "off"
                     }
                 ]
             },
             {
                 "featureType": "poi",
                 "elementType": "labels.text",
                 "stylers": [
                     {
                         "visibility": "off"
                     }
                 ]
             },
             {
                 "featureType": "road.local",
                 "elementType": "labels",
                 "stylers": [
                     {
                         "visibility": "off"
                     }
                 ]
             }
         ];

     if (document.getElementById('map')) {
         var map = new google.maps.Map(document.getElementById('map'), {
             zoom: 18,
             center: center,
             styles: styles
         });
     }

     var mapFooter = new google.maps.Map(document.getElementById('mapFooter'), {
         zoom: 18,
         center: center,
         styles: styles
     });

     var icon = {
         path: 'M16.734,0C9.375,0,3.408,5.966,3.408,13.325c0,11.076,13.326,20.143,13.326,20.143S30.06,23.734,30.06,13.324 C30.06,5.965,24.093,0,16.734,0z M16.734,19.676c-3.51,0-6.354-2.844-6.354-6.352c0-3.508,2.844-6.352,6.354-6.352 c3.508-0.001,6.352,2.845,6.352,6.353C23.085,16.833,20.242,19.676,16.734,19.676z',
         fillColor: '#00a8f0',
         fillOpacity: 1,
         size: new google.maps.Size(33.468, 33.468),
         origin: new google.maps.Point(0, 0),
         anchor: new google.maps.Point(16.734,33.468),
         strokeWeight: 1,
         strokeColor: '#ffffff',
         scale: 1
     };

     if (document.getElementById('map')) {
         var marker = new google.maps.Marker({
             position: center,
             icon: icon,
             map: map,
             title: 'Салон штор «Прованс»'
         });
     }

     var markerFooter = new google.maps.Marker({
         position: center,
         icon: icon,
         map: mapFooter,
         title: 'Салон штор «Прованс»'
     });

     var contentString =
         '<h4 class="mapHeading">Салон штор «Прованс»</h4>'+
         '<div class="mapContent">'+
         '<p>Киев, ул. Автозаводская, д. 99/4</p>' +
         '<p><small>С понедельника по пятницу с 10:00 до 19:00, в субботу с 10:00 до 17:00</small></p>'+
         '</div>';

     var infowindow = new google.maps.InfoWindow({
         content: contentString
     });

     if (document.getElementById('map')) {
         marker.addListener('click', function() {
             infowindow.open(map, marker);
         });
     }

     markerFooter.addListener('click', function() {
         infowindow.open(mapFooter, markerFooter);
     });
 }

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