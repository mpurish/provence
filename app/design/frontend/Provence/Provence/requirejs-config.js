var config = {
    map: {
        '*': {
            'fancybox': 'js/vendor/jquery.fancybox.min'
        }
    },
    shim: {
        'fancybox': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['jquery']

        }
    }
};