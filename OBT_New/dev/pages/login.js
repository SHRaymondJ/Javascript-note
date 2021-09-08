import '../css/common.css'
import '../css/bgstretcher.css'
import '../css/jquery.mloading.css'
import '../login/css/loginPage_BCD.css'
import '../login/css/loginPage_BCDTest.css'
import '../js/jquery.min.js'
import '../js/jquery-migrate-1.2.1.js'
import '../js/jquery.mloading.js'
import '../js/bgstretcher.js'
import '../js/jquery.session.js'
import '../js/jquery-ui.min.js'
import '../js/tools.js'
import '../login/js/loginPageTest.js'
import '../js/link.js'
import BCDBG from '../login/images/BCDbg1.jpg'

const test = (ape = '123') => {
    alert(ape)
}
test()

console.log($(window).height());
$('body').bgStretcher({
    images: [BCDBG],
    slideShowSpeed: 2000,
    transitionEffect: 'fade',
    anchoring: 'left center',
    anchoringImg: 'left center'
});

//语言设置
// 缓存语言类型，1.9
var langHistory = $.session.get('obtLanguage')
$.session.clear()
if (langHistory == "CN" || langHistory == 'EN') {
    $.session.set('obtLanguage', langHistory)
} else {
    $.session.set('obtLanguage', '')
}
if (!$.session.get('obtLanguage')) {
    var lang = navigator.language || navigator.userLanguage;//常规浏览器语言和IE浏览器
    lang = lang.substr(0, 2);//截取lang前2位字符
    if (lang == 'zh') {
        $.session.set('obtLanguage', 'CN')
        $(".lanChange").text('English');
        $(".lanChange").text('English');
        $(".right-bottom").html('\
		    	公告信息<br>\
		    	关于交通运输部令2016年第56号《航班正常管理规定》第十七条"承运人应当制定并公布运输总条件"请登录 <a href="http://xxgk.mot.gov.cn/jigou/fgs/201607/t20160721_2973469.html" target="_blank">交通部网站</a> 查阅,或登陆国内各大航空公司官网。<br><br><br>\
		    	<a style="color:#fff" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402003828" target="_blank">沪公网安备 31010402003828号    沪ICP备17045138号</a>\
		    	')
    } else {
        $.session.set('obtLanguage', 'EN')
        $(".lanChange").text('中文');
        $(".lanChange").text('中文');
        $(".right-bottom").html('\
		    	Notice<br>\
		    	Please log into the official website of the Ministry of Transport for the People’s Republic of China for more information on the Regulations on the Normal Management of Flights, Order No.56 of the Ministry of Transport of 2016. The order states that "the carrier shall formulate and promulgate the general conditions of transport". Visit <a href="http://xxgk.mot.gov.cn/jigou/fgs/201607/t20160721_2973469.html" target="_blank">here</a> or the official website of major domestic airlines for full details.<br><br><br>\
		    	<a style="color:#fff" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402003828" target="_blank">沪公网安备 31010402003828号    沪ICP备17045138号</a>\
		    	')
    }
} else if ($.session.get('obtLanguage') == "CN") {
    $(".lanChange").text('English');
    $(".right-bottom").html('\
	    	公告信息<br>\
	    	关于交通运输部令2016年第56号《航班正常管理规定》第十七条"承运人应当制定并公布运输总条件"请登录 <a href="http://xxgk.mot.gov.cn/jigou/fgs/201607/t20160721_2973469.html" target="_blank">交通部网站</a> 查阅,或登陆国内各大航空公司官网。<br><br><br>\
	    	<a style="color:#fff" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402003828" target="_blank">沪公网安备 31010402003828号    沪ICP备17045138号</a>\
	    	')
} else if ($.session.get('obtLanguage') == "EN") {
    $(".lanChange").text('中文');
    $(".right-bottom").html('\
	    	Notice<br>\
	    	Please log into the official website of the Ministry of Transport for the People’s Republic of China for more information on the Regulations on the Normal Management of Flights, Order No.56 of the Ministry of Transport of 2016. The order states that "the carrier shall formulate and promulgate the general conditions of transport". Visit <a href="http://xxgk.mot.gov.cn/jigou/fgs/201607/t20160721_2973469.html" target="_blank">here</a> or the official website of major domestic airlines for full details.<br><br><br>\
	    	<a style="color:#fff" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402003828" target="_blank">沪公网安备 31010402003828号    沪ICP备17045138号</a>\
	    	')
}
//语言转换
$(".lanChange").unbind('click').click(function () {
    switch ($.session.get('obtLanguage')) {
        case 'CN':
            $.session.set('obtLanguage', 'EN');
            location.reload();
            break;
        case 'EN':
            $.session.set('obtLanguage', 'CN');
            location.reload();
            break;
    }
})
$(function () {
    if (window.location.href.indexOf("nike") == -1) {
        var state = Math.random().toString(36).substr(2);
        $(".sigleSignIcon").unbind("click").click(function () {
            window.location.href = 'https://nike-qa.oktapreview.com/oauth2/ausa0mcornpZLi0C40h7/v1/authorize?response_type=code&client_id=nike.wdc.obt&scope=openid%20profile%20email%20address%20phone&state=' + state + '&redirect_uri=https://online.bcdtravel.cn';
        })
    } else {
        $(".sigleSignIcon").remove();
    }
})