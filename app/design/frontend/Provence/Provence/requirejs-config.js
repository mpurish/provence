var config = {
    map: {
        '*': {
            'fancybox': 'js/vendor/jquery.fancybox.min',
            'colorpicker': 'js/vendor/jquery.wheelcolorpicker.min',
            'constructor': 'js/constructor',
            'bodyScrollLock': 'js/vendor/bodyScrollLock.min',
            'swiper': 'js/vendor/swiper.min'
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
        'swiper': {}
    }
};