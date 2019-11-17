require(['jquery', 'colorpicker'], function($, wheelColorPicker) {
    function isMobile() {
        try {
            document.createEvent('TouchEvent');
            return true;
        }
        catch(e) {
            return false;
        }
    }

    $(function() {
        consSize();

        if(isMobile()) {
            document.body.classList.add('touch--screen');
        }
        else {
            document.body.classList.add('touch--screen-not');
        }

        var $hiddenImg = $('.construct-images img'),
            len = $hiddenImg.length,
            imgCounter = 0;

        $hiddenImg.one("load", function() {
            imgCounter++;
            if(imgCounter === len) {
                $('.construct-wrapper').removeClass('loading');
            }
        }).each(function() {
            if(this.complete) {
                $(this).load();
            }
        });

        function setRoomParams() {
            var fabrics = '', wall, sofa, lampshade, blanket, curtains, curtainsB;

            if($.cookieStorage.isEmpty('roomconst')) {
                $.cookieStorage.set('roomconst', {'wall': 'ffffff', 'sofa': 'ffffff', 'lampshade': 'ffffff', 'blanket': 'ffffff', 'curtains': 'ffffff', 'curtainsbottom': 'ffffff'});
            }
            var currentCookie = $.cookieStorage.get('roomconst');
            if(currentCookie['fabrics']) {
                fabrics = currentCookie['fabrics'];
            }
            wall = currentCookie['wall'];
            sofa = currentCookie['sofa'];
            lampshade = currentCookie['lampshade'];
            blanket = currentCookie['blanket'];
            curtains = currentCookie['curtains'];
            curtainsB = currentCookie['curtainsbottom'];

            if(location.search) {
                if(getParameterByName('fabrics')) {
                    fabrics = getParameterByName('fabrics');
                    $.cookieStorage.set('roomconst.fabrics', fabrics);
                }
                if(getParameterByName('wall')) {
                    wall = getParameterByName('wall');
                    $.cookieStorage.set('roomconst.wall', wall);
                }
                if(getParameterByName('sofa')) {
                    sofa = getParameterByName('sofa');
                    $.cookieStorage.set('roomconst.sofa', sofa);
                }
                if(getParameterByName('lampshade')) {
                    lampshade = getParameterByName('lampshade');
                    $.cookieStorage.set('roomconst.lampshade', lampshade);
                }
                if(getParameterByName('blanket')) {
                    blanket = getParameterByName('blanket');
                    $.cookieStorage.set('roomconst.blanket', blanket);
                }
                if(getParameterByName('curtains')) {
                    curtains = getParameterByName('curtains');
                    $.cookieStorage.set('roomconst.curtains', curtains);
                }
                if(getParameterByName('curtainsbottom')) {
                    curtainsB = getParameterByName('curtainsbottom');
                    $.cookieStorage.set('roomconst.curtainsbottom', curtainsB);
                }
            }

            if(fabrics !== '') {
                fSelect.set(fabrics);
            }
            else if(curtains !== 'ffffff' || curtainsB !== 'ffffff') {
                $('#color-picker-curtains1').wheelColorPicker('value', '#' + curtains).next('.constructor--color-picker-input-mobile').val('#' + curtains).trigger('change');
                $('#color-picker-curtains2').wheelColorPicker('value', '#' + curtainsB).next('.constructor--color-picker-input-mobile').val('#' + curtainsB).trigger('change');
            }

            $('#color-picker-wall').wheelColorPicker('value', '#' + wall).next('.constructor--color-picker-input-mobile').val('#' + wall).trigger('change');
            $('#color-picker-sofa').wheelColorPicker('value', '#' + sofa).next('.constructor--color-picker-input-mobile').val('#' + sofa).trigger('change');
            $('#color-picker-lamp').wheelColorPicker('value', '#' + lampshade).next('.constructor--color-picker-input-mobile').val('#' + lampshade).trigger('change');
            $('#color-picker-blanket').wheelColorPicker('value', '#' + blanket).next('.constructor--color-picker-input-mobile').val('#' + blanket).trigger('change');
        }

        if(isMobile()) {
            $('.construct--control').on('click', function () {
                $(this).next('.constructor--color-picker-input-mobile').trigger('focus');
            });
        }
        else {
            $('.construct--control').on('click', function () {
                $(this).next('.constructor--color-picker-input').trigger('focus');
            });
        }

        $('.constructor--color-picker-input').wheelColorPicker().on('sliderup', function () {
            var $this = $(this);
            var target = $this.siblings('.construct--control').data('obj');
            $('.construct-scene').find('.' + target).css('background-color', $this.wheelColorPicker('getValue', 'css'));
            $this.next('.constructor--color-picker-input-mobile').val($this.wheelColorPicker('getValue', 'css'));

            if($this.parent().hasClass('c--colour')) {
                var $c = $('.curtains');
                $c.css({
                    'background-image': 'url('  + $c.data('bg') + ')',
                    'background-size': '100% 100%',
                    'background-repeat': 'no-repeat'
                });

                if($this.parent().hasClass('control--colour1')) {
                    $c.addClass('curtains--colour');
                }

                if (history.pushState) {
                    var newurl = updateUrlParameter(target, $this.wheelColorPicker('getValue', 'hex'));
                    newurl = updateUrlParameter('fabrics', '', newurl);
                    window.history.pushState({path:newurl},'',newurl);
                    $.cookieStorage.set('roomconst.' + target, $this.wheelColorPicker('getValue', 'hex'));
                    $.cookieStorage.set('roomconst.fabrics', '');
                }
            }
            else {
                if (history.pushState) {
                    var newurl = updateUrlParameter(target, $this.wheelColorPicker('getValue', 'hex'));
                    window.history.pushState({path:newurl},'',newurl);
                    $.cookieStorage.set('roomconst.' + target, $this.wheelColorPicker('getValue', 'hex'));
                }
            }
        });

        $('.constructor--color-picker-input-mobile').on('change', function () {
            var $this = $(this);
            var target = $this.siblings('.construct--control').data('obj');
            $('.construct-scene').find('.' + target).css('background-color', $this.val());
            $this.prev('.constructor--color-picker-input').wheelColorPicker('value', $this.val());

            if($this.parent().hasClass('c--colour')) {
                var $c = $('.curtains');
                $c.css({
                    'background-image': 'url('  + $c.data('bg') + ')',
                    'background-size': '100% 100%',
                    'background-repeat': 'no-repeat'
                });

                if($this.parent().hasClass('control--colour1')) {
                    $c.addClass('curtains--colour');
                }

                if (history.pushState) {
                    var newurl = updateUrlParameter(target, $this.wheelColorPicker('getValue', 'hex'));
                    newurl = updateUrlParameter('fabrics', '', newurl);
                    window.history.pushState({path:newurl},'',newurl);
                    $.cookieStorage.set('roomconst.' + target, $this.wheelColorPicker('getValue', 'hex'));
                    $.cookieStorage.set('roomconst.fabrics', '');
                }
            }
            else {
                if (history.pushState) {
                    var newurl = updateUrlParameter(target, $this.val().replace('#', ''));
                    window.history.pushState({path:newurl},'',newurl);
                    $.cookieStorage.set('roomconst.' + target, $this.val().replace('#', ''));
                }
            }
        });

        $('.c--colour-reset').on('click', function () {
            $('#color-picker-curtains1, #color-picker-curtains2').wheelColorPicker('value', '#ffffff').next('.constructor--color-picker-input-mobile').val('#ffffff').trigger('change');
            $('.curtains').removeClass('curtains--colour');
            if (history.pushState) {
                var newurl = updateUrlParameter('curtains', 'ffffff');
                newurl = updateUrlParameter('curtainsbottom', 'ffffff', newurl);
                window.history.pushState({path:newurl},'',newurl);
                $.cookieStorage.set('roomconst.curtains', 'ffffff');
                $.cookieStorage.set('roomconst.curtainsbotto', 'ffffff');
            }
        });

        var fSelect = new SlimSelect({
            select: '#fabrics-select',
            deselectLabel: '<span class="deselect"></span>'
        });

        $('#fabrics-select').on('change', function () {
            var $selected = $(this).find(':selected');
            var dataimg = $selected.data('img');
            var datascale = $selected.data('scale');
            var $blocks = $('.construct-scene').find('.curtains, .pillow-bottom, .pillow-top, .pillow-small');
            $blocks.removeClass('curtains--colour').each(function () {
                var $this = $(this);
                $this.css({
                    'background-color': 'transparent',
                    'background-image': 'url('  + $this.data('bg') + '), url(' + dataimg + ')',
                    'background-size': '100% 100%, auto ' + 10 * datascale / $this.data('size') + '%',
                    'background-repeat': 'no-repeat, repeat'
                })
            });

            $('#color-picker-curtains1, #color-picker-curtains2').wheelColorPicker('value', '#ffffff').next('.constructor--color-picker-input-mobile').val('#ffffff');

            if (history.pushState) {
                var newurl = updateUrlParameter('fabrics', $selected.val());
                newurl = updateUrlParameter('curtains', '', newurl);
                newurl = updateUrlParameter('curtainsbottom', '', newurl);
                window.history.pushState({path:newurl},'',newurl);
                $.cookieStorage.set('roomconst.fabrics', $selected.val());
            }
        });

        setRoomParams();

    });

    $(window).resize(function() {
        consSize();
    });

    function consSize() {
        var wW = $(window).width();
        var wH = $(window).height();
        var $cW = $('.construct-wrapper');
        var $cS = $('.construct-scene');
        var $cSW = $('.construct-scene-wrapper');
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
});