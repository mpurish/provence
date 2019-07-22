var config = {
    map: {
        '*': {
            'fancybox': 'js/vendor/jquery.fancybox.min',
            'colorpicker': 'js/vendor/jquery.wheelcolorpicker.min',
            'constructor': 'js/constructor',
            'bodyScrollLock': 'js/vendor/bodyScrollLock.min',
            'swiper': 'js/vendor/swiper.min',
            'instafeed': 'js/vendor/instafeed.min',
            'home': 'js/home'
        }
    },
    shim: {
        'fancybox': {
            deps: ['jquery']

        },
        'colorpicker': {
            deps: ['jquery']

        },
        'constructor': {
            deps: ['jquery', 'colorpicker']

        },
        'swiper': {},
        'instafeed': {},
        'home': {
            deps: ['jquery', 'swiper', 'instafeed']

        }
    }
};