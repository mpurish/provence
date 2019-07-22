require(['jquery', 'swiper', 'instafeed'], function($, Swiper, Instafeed) {
    $(function () {
        var catalogueSwiper = new Swiper('.swiper--home-categories', {
            pagination: {
                el: '.swiper-pagination'
            },
            slidesPerView: 'auto',
            spaceBetween: 20,
            freeMode: true,
            breakpoints: {
                767: {
                    spaceBetween: 10
                }
            }
        });

        var feed = new Instafeed({
            get: 'user',
            userId: '1557371919',
            clientId: '2f8dca8911bf4bf0af0efdd9a9d8d151',
            accessToken: '1557371919.1677ed0.bc2ead7e127a4158a44aac04a24fde87',
            resolution: 'low_resolution',
            sortBy: 'most-recent',
            limit: 7,
            template: '<div class="swiper-slide"><a href="{{link}}" target="_blank"><span class="ig--img"><img src="{{image}}" /></span><span class="ig--location">{{location}}</span><span class="ig--caption">{{caption}}</span></a></div>',
            filter: function(image) {
                return image.tags.indexOf('салоншторпрованскиев') >= 0;
            },
            success: function(response) {
                response.data.forEach(function(i) {
                    var cleanCaption = i.caption.text.split('#')[0];
                    i.caption.text = cleanCaption
                });
            },
            after: function () {
                var igSwiper = new Swiper('.swiper--home-ig', {
                    spaceBetween: 15,
                    speed: 600,
                    slidesPerView: 'auto',
                    initialSlide: 3,
                    loop: true,
                    pagination: {
                        el: '.swiper--home-ig-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper--home-ig-next',
                        prevEl: '.swiper--home-ig-prev'
                    }
                });
            }
        });

        feed.run();


    })
});