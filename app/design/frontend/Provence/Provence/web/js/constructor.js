function isMobile() {
    try {
        document.createEvent('TouchEvent');
        return true;
    }
    catch(e) {
        return false;
    }
}

jQuery(function() {
    consSize();

    if(isMobile()) {
        document.body.classList.add('touch--screen');
    }
    else {
        document.body.classList.add('touch--screen-not');
    }

    var $hiddenImg = jQuery('.construct-images img'),
        len = $hiddenImg.length,
        imgCounter = 0;

    $hiddenImg.one("load", function() {
        imgCounter++;
        if(imgCounter === len) {
            jQuery('.construct-wrapper').removeClass('loading');
        }
    }).each(function() {
        if(this.complete) {
            jQuery(this).load();
        }
    });

    function setRoomParams() {
        var fabrics = '', wall, sofa, lampshade, blanket;

        if(jQuery.cookieStorage.isEmpty('roomconst')) {
            jQuery.cookieStorage.set('roomconst', {'wall': 'ffffff', 'sofa': 'ffffff', 'lampshade': 'ffffff', 'blanket': 'ffffff'});
        }
        var currentCookie = jQuery.cookieStorage.get('roomconst');
        if(currentCookie['fabrics']) {
            fabrics = currentCookie['fabrics'];
        }
        wall = currentCookie['wall'];
        sofa = currentCookie['sofa'];
        lampshade = currentCookie['lampshade'];
        blanket = currentCookie['blanket'];

        if(location.search) {
            if(getParameterByName('fabrics')) {
                fabrics = getParameterByName('fabrics');
                jQuery.cookieStorage.set('roomconst.fabrics', fabrics);
            }
            if(getParameterByName('wall')) {
                wall = getParameterByName('wall');
                jQuery.cookieStorage.set('roomconst.wall', wall);
            }
            if(getParameterByName('sofa')) {
                sofa = getParameterByName('sofa');
                jQuery.cookieStorage.set('roomconst.sofa', sofa);
            }
            if(getParameterByName('lampshade')) {
                lampshade = getParameterByName('lampshade');
                jQuery.cookieStorage.set('roomconst.lampshade', lampshade);
            }
            if(getParameterByName('blanket')) {
                blanket = getParameterByName('blanket');
                jQuery.cookieStorage.set('roomconst.blanket', blanket);
            }
        }

        if(fabrics !== '') {
            fSelect.set(fabrics);
        }

        jQuery('#color-picker-wall').wheelColorPicker('value', '#' + wall).next('.constructor--color-picker-input-mobile').val('#' + wall).trigger('change');
        jQuery('#color-picker-sofa').wheelColorPicker('value', '#' + sofa).next('.constructor--color-picker-input-mobile').val('#' + sofa).trigger('change');
        jQuery('#color-picker-lamp').wheelColorPicker('value', '#' + lampshade).next('.constructor--color-picker-input-mobile').val('#' + lampshade).trigger('change');
        jQuery('#color-picker-blanket').wheelColorPicker('value', '#' + blanket).next('.constructor--color-picker-input-mobile').val('#' + blanket).trigger('change');
    }

    if(isMobile()) {
        jQuery('.construct--control').on('click', function () {
            jQuery(this).next('.constructor--color-picker-input-mobile').trigger('focus');
        });
    }
    else {
        jQuery('.construct--control').on('click', function () {
            jQuery(this).next('.constructor--color-picker-input').trigger('focus');
        });
    }

    jQuery('.constructor--color-picker-input').wheelColorPicker().on('sliderup', function () {
        var $this = jQuery(this);
        var target = $this.siblings('.construct--control').data('obj');
        jQuery('.construct-scene').find('.' + target).css('background-color', $this.wheelColorPicker('getValue', 'css'));
        $this.next('.constructor--color-picker-input-mobile').val($this.wheelColorPicker('getValue', 'css'));

        if (history.pushState) {
            var newurl = updateUrlParameter(target, $this.wheelColorPicker('getValue', 'hex'));
            window.history.pushState({path:newurl},'',newurl);
            jQuery.cookieStorage.set('roomconst.' + target, $this.wheelColorPicker('getValue', 'hex'));
        }
    });

    jQuery('.constructor--color-picker-input-mobile').on('change', function () {
        var $this = jQuery(this);
        var target = $this.siblings('.construct--control').data('obj');
        jQuery('.construct-scene').find('.' + target).css('background-color', $this.val());
        $this.prev('.constructor--color-picker-input').wheelColorPicker('value', $this.val());

        if (history.pushState) {
            var newurl = updateUrlParameter(target, $this.val().replace('#', ''));
            window.history.pushState({path:newurl},'',newurl);
            jQuery.cookieStorage.set('roomconst.' + target, $this.val().replace('#', ''));
        }
    });

    var fSelect = new SlimSelect({
        select: '#fabrics-select',
        deselectLabel: '<span class="deselect"></span>'
    });

    jQuery('#fabrics-select').on('change', function () {
        var $selected = jQuery(this).find(':selected');
        var dataimg = $selected.data('img');
        var datascale = $selected.data('scale');
        var $blocks = jQuery('.construct-scene').find('.curtains, .pillow-bottom, .pillow-top, .pillow-small');
        $blocks.each(function () {
            var $this = jQuery(this);
            $this.css({
                'background-image': 'url('  + $this.data('bg') + '), url(' + dataimg + ')',
                'background-size': '100% 100%, auto ' + 10 * datascale / $this.data('size') + '%',
                'background-repeat': 'no-repeat, repeat'
            })
        });

        if (history.pushState) {
            var newurl = updateUrlParameter('fabrics', $selected.val());
            window.history.pushState({path:newurl},'',newurl);
            jQuery.cookieStorage.set('roomconst.fabrics', $selected.val());
        }
    });

    setRoomParams();

});

jQuery(window).resize(function() {
    consSize();
});

function consSize() {
    var wW = jQuery(window).width();
    var wH = jQuery(window).height();
    var $cW = jQuery('.construct-wrapper');
    var $cS = jQuery('.construct-scene');
    var $cSW = jQuery('.construct-scene-wrapper');
    var prop;

    if(wW < 992) {
        var menu = (wW - 90) / 4 > 72 ? 72 : (wW - 90) / 4;

        if(wW < 768) {
            prop = (wW - 30) / 1250;
            menu = menu + 50 + wW;
        }
        else {
            prop = (wW - 40) / 1250;
            menu = menu + 40 + wW;
        }
        $cS.css('transform', 'scale(' + prop + ')');
        $cW.css('max-height', menu);
    }
    else {
        if(wW - 280 >= wH && wH < 1350) {
            prop = (wH - 100) / 1250;
            $cS.css('transform', 'scale(' + prop + ')');
            $cW.css('max-height', wH - 100);
        }
        else if(wW - 280 < wH && wH < 1350) {
            prop = (wW - 320) / 1250;
            $cS.css('transform', 'scale(' + prop + ')');
            $cW.css('max-height', wW - 320);
        }
    }
    $cSW.css({
        'width': 1250 * prop,
        'height': 1250 * prop
    })
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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}