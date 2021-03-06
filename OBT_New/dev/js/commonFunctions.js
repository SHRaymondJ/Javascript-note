//
function PopUpWindow(textObj) {
    this.window = 'popUpWindow--mask';
    this.title = textObj.title;
    this.body = textObj.body;
    this.btnText = textObj.btnText;
    this.closePopWindow = function (e) {
        if (!e) {
            e = this;
        }
        $('#' + e.window).remove();
    }
    this.popUp = function (root, success, close) {
        var that = this;
        var close = close || this.closePopWindow;
        var html = "<div class='popUpWindow--mask' id='" + this.window + "'>\
                        <section class='popUpWindow--box'>\
                            <img src='../css/images/icon_cha.svg' class='popUpWindow--close'>\
                            <header>\
                                <h1 class='popUpWindow--title'>"+ this.title + "</h1>\
                            </header>\
                            <div class='popUpWindow--body'>"+ this.body + "</div>\
                            <div class='popUpWindow--btn'>" + this.btnText + "</div>\
                        </section>\
                    </div>";
        $(root).append(html);
        $('.popUpWindow--close').bind('click', function () {
            close(that);
        });
        $('.popUpWindow--btn').bind('click', function () {
            that.closePopWindow();
            success();
        });
    }
}

function currentTime() {
    var c = new Date();
    return c;
}
function flightTime(flightTimeStr) {
    var flightTimeObj = {
        yy: parseInt(flightTimeStr.slice(0, 4)),
        mm: parseInt(flightTimeStr.slice(4, 6)) - 1,
        dd: parseInt(flightTimeStr.slice(6, 8)),
        hh: parseInt(flightTimeStr.slice(8, 10)),
        min: parseInt(flightTimeStr.slice(10, 12))
    }
    var f = new Date();
    f.setFullYear(flightTimeObj.yy);
    f.setMonth(flightTimeObj.mm);
    f.setDate(flightTimeObj.dd);
    f.setHours(flightTimeObj.hh);
    f.setMinutes(flightTimeObj.min);
    return f;
}

//
function stopBubble(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();  //w3c
    } else {
        window.event.cancelBubble = true; //IE
    }
}

// ??????????????????
// 1. css?????????pop-container-xx, pop-container-animation
// 2. ???????????????????????????&:after{ solid-triangle }   // ?????????????????????
// 3. ????????????????????????????????????class: hidden ??? negative
// 4. ???????????????????????????????????????????????????
// 5. ????????????????????????????????????????????????hidden?????????
/*
    if (!target.is('.ticketFlightDetail *')) {
        $('.flight_detail_pop:not(".hidden")').usePopWindowEffect(300)
    }
*/

var animationTimeout = ''
// toggle
// ?????????????????????
$.fn.usePopWindowEffect = function (animationTime, switchDom) {
    var pop = $(this)
    if (pop.hasClass('hidden') && pop.hasClass('negative')) {
        pop.openPopWindow(switchDom)
    } else if (pop.hasClass('hidden') || pop.hasClass('negative')) {
        return
    } else {
        pop.closePopWindow(animationTime, switchDom)
    }
}
// ????????????????????????mouseenter
$.fn.openPopWindow = function (switchDom) {
    var pop = $(this)
    if (pop.hasClass('hidden') && pop.hasClass('negative')) {
        pop.removeClass('hide')
        setTimeout(function () {
            pop.removeClass('negative').removeClass('hidden')
        }, 10)
        if (switchDom) {
            $(switchDom).addClass('active')
        }
    }
}
// ????????????????????????mouseleave
$.fn.closePopWindow = function (animationTime, switchDom) {
    var pop = $(this)
    if (!pop.hasClass('hidden') && !pop.hasClass('negative')) {
        pop.addClass('hidden')
        if (switchDom) {
            switchDom.removeClass('active')
        }
        this._animationTimeout = setTimeout(function () {
            pop.addClass('negative')
            pop.addClass('hide')
        }, animationTime)
    }
}


/**
 * ??????????????????
 * @param {??????} maxWidth 
 * @param {??????} maxHeight 
 * @param {????????????} objImg 
 */
function AutoResizeImage(maxWidth, maxHeight, objImg) {
    var img = new Image();
    img.src = objImg.src;

    var w = img.width;
    var h = img.height;

    var originalRatio = w / h
    var displayRatio = maxWidth / maxHeight
    if (displayRatio >= originalRatio) {
        w = maxWidth
        h = w / originalRatio

    } else {
        h = maxHeight
        w = originalRatio * h
    }
    objImg.height = h;
    objImg.width = w;
}

/**
 * ???????????????
 * @param {????????????} msg 
 */
var toolTimeout
function showToolTip(msg) {
    var className = 'toolTip'
    $('.' + className).remove()
    clearTimeout(toolTimeout)
    $('body').prepend('<div class="' + className + '">' + msg + '</div>')
    toolTimeout = setTimeout(function () {
        $('.' + className).css('opacity', 0)
        setTimeout(function () {
            $('.' + className).remove()
        }, 1000)
    }, 2000)
}

/**
 * obt???confirm?????????
 * @param {????????????} msg 
 * @param {??????????????????} confirm 
 * @param {??????????????????} cancel 
 * @returns {??????????????????}
 */
function eTravelConfirm(msg, confirm, cancel) {
    confirm = confirm || 'Confirm'
    confirm = cancel || 'Cancel'
    $('body').prepend(
        "<div class='popUpWindow--mask'>\
            <section class='popUpWindow--confirmBox'>\
                <div class='popUpWindow--msg'>"+ msg + "</div>\
                <div class='popUpWindow--btn_box'>\
                    <div class='popUpWindow--cancel'>" + cancel + "</div>\
                    <div class='popUpWindow--confirm mainBackColor'>" + confirm + "</div>\
                </div>\
            </section>\
        </div>")

    $('.popUpWindow--cancel').unbind('click').click(function () {
        $('.popUpWindow--mask').remove()
    })
    function confirmAction(action) {
        $('.popUpWindow--confirm').unbind('click').click(function () {
            $('.popUpWindow--mask').remove()
            action()
        })
    }
    return confirmAction
}

export function include(url) {
    const type = url.indexOf('.js') > -1 ? 'js' : 'css'
    url = './' + url
    if (type === 'js') {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        document.getElementsByTagName('body')[0].appendChild(script)
    } else {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

}