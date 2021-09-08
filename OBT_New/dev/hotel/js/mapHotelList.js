var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var isReturn = tools.queryString().isReturn;
var searchHotelInfo = JSON.parse($.session.get('searchHotelInfo'));
console.log(searchHotelInfo);
var queryKey = searchHotelInfo.queryKey;
var queryKeyList = queryKey.split(",");
queryKeyList[12] = "2500";
var NotNeedGaranteeQueryKey = queryKeyList.join(",") + ',1';
var uidWithoutQuote = netUserId.split('"')[1]
var hotelAddress_longitude = 0;
var hotelAddress_latitude = 0;
var cacheHotelList = []

// 下一页
var SabreShopKey = ''
var LocalShopKey = ''
var getNextPage = false;
var pageIndex = 2

//防抖函数
function debounce(func, delay) {
    var delay = delay || 200;
    var timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(this, arguments);
        }, delay);
    };
}
//中英文对象
var cn = {
    "progressBar": {
        "search": "查询",
        "book": "预订",
        "complete": "完成",
    },
    "searchBody": {
        "condition": "条件",
        "hotelCity": "入住城市",
        "hotelCityInput": "请输入入住城市",
        'hotelCheckInDate': '入住日期',
        'hotelCheckOutDate': '离店日期',
        "hotelAddress": "酒店地址",
        'hotelKeyWords': '关键字',
        'keyWordPlaceholder': '至少3个字符',
        'hotelKeyInput': '(选填)酒店名/地标/商圈/地铁线',
        "star": "星级",
        "allStar": "不限",
        "star12": "二星级及以下/经济",
        "star3": "三星级/舒适",
        "star4": "四星级/高档",
        "star5": "五星级/奢华",
        "price": "价格",
        "search": "查询",
    },
    'keyWordBody': {
        'hotel': '推荐酒店',
        'brand': '品牌',
        'district': '行政区',
        'commercial': '商圈',
        'extCommercial': '附属商圈',
        'keywordHotel': '热门',
        'keywordBrand': '品牌',
        'keywordDistrict': '行政区',
        'keywordCommercial': '商圈',
        'keywordExtCommercial': '附属商圈',
    },
    "hotelList": {
        "distance1": "距离目的地",
        "distance2": "公里",
        "address": "酒店地址： ",
        "telephone": "电话：  ",
        "comment": "条评论",
        "fantastic": "极赞",
        "wonderful": "超棒",
        "great": "很好",
        "good": "不错",
        "lowest": "起",
        "search": "查看详情",
        "protocol": "协议酒店",
        "allMapBtn": "查看地图",
    },
    "hotelChooseBody": {
        "remind": "差旅政策：您做选择的城市酒店预算为：",
    },
    "siftBody": {
        "sort": "排序：",
        "recommend": "推荐",
        "score": "评分",
        "star": "星级",
        "distance": "距离",
        "price": "价格",
        "filter": "筛选：",
        "breakfast": "含早餐",
        "freeCancel": "免费取消",
        "noGuarantee": "免担保",
        "protocol": "协议酒店",
        "companyBill": "公司支付"
    },
    "hotelsNumber": {
        "hotelsNumber1": "根据您的需求，共有",
        "hotelsNumber1BCD": "根据您的需求，共有",
        "hotelsNumber2": "家酒店供您选择",
    },
    'searchRemind': '请正确填写！',
    "shuttleRemind": "APPLE在该酒店提供班车服务。",
    'averagePerNight': '平均每日价'
}
var en = {
    "progressBar": {
        "search": "Search",
        "book": "Book",
        "complete": "Complete",
    },
    "searchBody": {
        "condition": "Condition",
        "hotelCity": "Destination",
        "hotelCityInput": "Please enter the city for checking in.",
        'hotelCheckInDate': 'Check-in',
        'hotelCheckOutDate': 'Check-out',
        "hotelAddress": "Hotel Address",
        'hotelKeyWords': 'Keywords',
        "keyWordPlaceholder": "at least 3 characters",
        'hotelKeyInput': 'Hotel Name/Landmark/Business Circle/Metro Line',
        "star": "Star",
        "allStar": "No Limit",
        "star12": "1-star&2-star/economy",
        "star3": "3-star/comfortable",
        "star4": "4-star/upscale",
        "star5": "5-star/deluxe",
        "price": "Price",
        "search": "Search",
    },
    'keyWordBody': {
        'hotel': 'Recommended Hotel',
        'brand': 'Brand',
        'district': 'District',
        'commercial': 'Commercial',
        'extCommercial': 'ExtCommercial',
        'keywordHotel': 'Top',
        'keywordBrand': 'Brand',
        'keywordDistrict': 'District',
        'keywordCommercial': 'Business Area',
        'keywordExtCommercial': 'Land Mark',
    },
    "hotelList": {
        "distance1": "Distance to destination",
        "distance2": "Km",
        "address": "Hotel Address： ",
        "telephone": "Telephone： ",
        "comment": "Comment",
        "fantastic": "Fantastic",
        "wonderful": "Wonderful",
        "great": "Great",
        "good": "Good",
        "lowest": "Up",
        "search": "View Details",
        "protocol": "Corporate",
        "allMapBtn": "View Map",
    },
    "hotelChooseBody": {
        "remind": "The city cap is approx ",
    },
    "siftBody": {
        "sort": "Sort:",
        "recommend": "Recommend",
        "score": "Score",
        "star": "Star",
        "distance": "Distance",
        "price": "Price",
        "filter": "Filter：",
        "breakfast": "Breakfast",
        "freeCancel": "Free Cancellation",
        "noGuarantee": "No Guarantee",
        "protocol": "Corporate",
        "companyBill": "Company Bill"
    },
    "hotelsNumber": {
        "hotelsNumber1": "",
        "hotelsNumber1BCD": "According to your needs, there are",
        "hotelsNumber2": "hotels",
    },
    'searchRemind': 'Please fill in correctly!',
    "shuttleRemind": "APPLE provides shuttle service support in this hotel.",
    'averagePerNight': 'average per night'
}
function get_lan(m) {
    //获取文字
    var lan = $.session.get('obtLanguage');     //语言版本
    //选取语言文字
    switch (lan) {
        case 'CN':
            var t = cn[m];
            break;
        case 'EN':
            var t = en[m];
            break;
        default:
            var t = cn[m];
    }
    if (t == undefined) t = cn[m];
    if (t == undefined) t = en[m];

    return t;
}
$(function () {
    showContent();//内容展示
    hotelList();//酒店列表
})
function getNextDay(d) {
    d = new Date(d);
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    //格式化
    return d.getFullYear() + "-" + month + "-" + day;
}
function datedifference(sDate1, sDate2) {
    var dateSpan,
        iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
};
/*时间内提示*/
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
function setHotelInfo(queryKey, hotelCityCode, hotelCityText, hotelState) {
    var searchHotelInfo = {
        'queryKey': queryKey,
        'hotelCode': hotelCityCode,
        'hotelCityText': hotelCityText,
        'hotelState': hotelState,
        'appleType': $("#keyWordInput").attr("appleType"),
        'appleKey': $("#keyWordInput").attr("key"),
        'appleValue': $("#keyWordInput").val(),
    }
    $.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
}
//筛选条件class
function FilterModel(filterClass) {
    this.domSelector = filterClass.domSelector; //带.,#等css selector name的string
    this.brothers = filterClass.brothers;   //数组，可以共存的selector组成的数组
    this.api = 'QueryHotelNewPost'; //点击事件，当该条件从非选中状态变为选中状态时，跑的api
    this.fuxun = filterClass.fuxun; //跑API时，OnlyFuXun的值
    this.pullFn = filterClass.pullFn;   //列表下拉事件
    this.handlerClick = function () {
        var that = this;
        $(this.domSelector).unbind('click').click(function () {
            var clickBtn = $(this);
            //记录选中状态的兄弟条件，在清空后还原
            var selectedBrothers = [];
            that.brothers.map(function (brother) {
                if ($(brother).attr('state') == 'click') {
                    selectedBrothers.push(brother);
                }
            })
            if (clickBtn.attr('state') == 'none') {
                selectedBrothers.push(clickBtn);
            }
            //初始化所有样式为默认状态
            $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color", "#000");
            $(".sortTabIcon").css("background-position", "0px 0px");
            setInactiveStyleForFilterBtn('.tabBtn');
            //遍历选中兄弟恢复选中状态，包括当前按钮
            selectedBrothers.map(function (selectedBrother) {
                setActiveStyleForFilterBtn(selectedBrother);
            })
            that.__ajaxQueryHotel();
        })
    }
    this.__ajaxQueryHotel = function () {
        var that = this;
        tools.searchLoadingShow()
        var fuxun = this.__getFuXun();
        $.ajax({
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/QueryService.svc/" + this.api,
                jsonStr: '{"request":{"QueryKey":"' + queryKey + '","Uid":' + netUserId + ',"Language":"' + obtLanguage + '","OnlyFuXun":"' + fuxun + '"}}'
            },
            success: function (data) {
                tools.searchLoadingHide()
                var res = JSON.parse(data);
                console.log(res);
                isShowCompanyPay(res);
                cacheHotelList = res.hotels
                filterHotel = that.__filterHotels(res.hotels);
                hotelListInfo(filterHotel);
                hotelSort(filterHotel);
                // 翻页相关
                SabreShopKey = res.SabreShopKey;
                LocalShopKey = res.LocalShopKey;
                if ((SabreShopKey == '' || SabreShopKey == null) && (LocalShopKey == '' || LocalShopKey == null)) {
                    $('.loadingSpan').hide()
                    $('.listEnd .textSpan').text(get_lan('noMore'))
                } else {
                    $('.loadingSpan').show()
                    $('.listEnd .textSpan').text(get_lan('loading'))
                    if ($('.listEnd')[0].offsetTop < window.innerHeight) {
                        nextHotelList(that.fuxun);
                    }
                }
                pageIndex = 2;
                clickHotelLi();
            },
            error: function () {
                // alert('fail');
            }
        });
    }
    this.__filterHotels = function (hotels) {
        //筛选酒店的逻辑
        var filterResult = [];
        if ($('.companyBillBtn').attr('state') == 'click') {
            filterResult = hotels;  //因为跑接口的时候是1，在后台已经筛选好了
        } else if ($('.protocolBtn').attr('state') == 'click') {
            //以下都需要在前台筛选
            hotels.map(function (item) {
                if (item.IsAgreement || item.IsTMCAgreement) {
                    filterResult.push(item);
                }
            })
        } else if ($('.breakfastBtn').attr('state') == 'click') {
            if ($('.freeCancelBtn').attr('state') == 'click') {
                hotels.map(function (item) {
                    if (item.Breakfast > 0 && item.CancelRuleType > 0) {
                        filterResult.push(item);
                    }
                })
            } else if ($('.noGuaranteeBtn').attr('state') == 'click') {
                hotels.map(function (item) {
                    if (item.Breakfast > 0 && item.NotNeedGarantee) {
                        filterResult.push(item);
                    }
                })
            } else {
                hotels.map(function (item) {
                    if (item.Breakfast > 0) {
                        filterResult.push(item);
                    }
                })
            }
        } else {
            if ($('.freeCancelBtn').attr('state') == 'click') {
                hotels.map(function (item) {
                    if (item.CancelRuleType > 0) {
                        filterResult.push(item);
                    }
                })
            } else if ($('.noGuaranteeBtn').attr('state') == 'click') {
                hotels.map(function (item) {
                    if (item.NotNeedGarantee) {
                        filterResult.push(item);
                    }
                })
            } else {
                filterResult = hotels;  //都没选择
            }
        }
        return filterResult;
    }
    this.__getFuXun = function () {
        if ($(this.domSelector).attr('state') != 'click') {
            //如果取消的话，传0
            var fuxun = 0;
        } else {
            var fuxun = this.fuxun;
        }
        return fuxun;
    }
}
//是否显示公司支付
function isShowCompanyPay(res) {
    if (!res.IsShowCompanyPay) {
        $('.companyBillBtn').hide();
    } else {
        $('.companyBillBtn').show();
    }
}
function setInactiveStyleForFilterBtn(btn) {
    $(btn).css("background-color", "#fff");
    $(btn).css("color", "#000");
    $(btn).attr("state", "none");
}
function setActiveStyleForFilterBtn(btn) {
    $(btn).css("background-color", "#4c81dd");
    $(btn).css("color", "#fff");
    $(btn).attr("state", "click");
}
// 区分BCD和APPLE
var content = {
    searchMap: '',
    banner: '',
    searchBtnInCondition: '',
    keyWordsPlaceholder: '',
    searchStarBody: '',
    searchPriceBody: '',
    hotelAddress: '',
    siftCompanyBill: '',
    siftProtocal: '',
    hotelNumber: ''
}
var functions = {
    init: function () { },
    selectDepartureDate: function () { },
    getBanner: function () { },
    hotelListFn: function () { },
    hotelFilterFn: function () { }
}
if (ProfileInfo.onlineStyle === 'BCD') {
    hotelAddress_longitude = queryKeyList[13];
    hotelAddress_latitude = queryKeyList[14];
    // BCD属性
    content.searchMap = '<div class="mapBody hide">\
                            <div id="mapTittle"><span class="mapTittleText">x</span></div>\
                            <div id="map"></div>\
                        </div>'

    content.banner = '<div class="picBody"><img class="picGroupImg" src="../staticFile/query.png"/><a class="picHref" target="_blank" href=""></a></div>'

    content.searchStarBody =
        '<div class="searchStarBody flexRow" style="height:50px;line-height:50px;font-size:14px;">\
            <div style="width:85px;background-color:#d8d8d8;text-align:center;">\
            '+ get_lan('searchBody').star + '\
            </div>\
            <div class="hotelStarBtn starChoose" star="1-2-3-4-5">'+ get_lan('searchBody').allStar + '</div>\
            <div class="hotelStarBtn" star="1-2">'+ get_lan('searchBody').star12 + '</div>\
            <div class="hotelStarBtn" star="3">'+ get_lan('searchBody').star3 + '</div>\
            <div class="hotelStarBtn" star="4">'+ get_lan('searchBody').star4 + '</div>\
            <div class="hotelStarBtn" star="5">'+ get_lan('searchBody').star5 + '</div>\
        </div>'

    content.searchPriceBody =
        '<div class="searchPriceBody flexRow" style="height:50px;line-height:50px;font-size:14px;">\
            <div style="width:85px;background-color:#d8d8d8;text-align:center;">\
            '+ get_lan('searchBody').price + '\
            </div>\
            <div class="hotelPriceBtn" minPrice="0" maxPrice="5000">'+ get_lan('searchBody').allStar + '</div>\
            <div class="hotelPriceBtn" id="price1" minPrice="0" maxPrice="150">0-150</div>\
            <div class="hotelPriceBtn" id="price2" minPrice="150" maxPrice="300">150-300</div>\
            <div class="hotelPriceBtn" id="price3" minPrice="300" maxPrice="450">300-450</div>\
            <div class="hotelPriceBtn" id="price4" minPrice="450" maxPrice="600">450-600</div>\
            <div class="hotelPriceBtn" id="price5" minPrice="600" maxPrice="1000">600-1000</div>\
            <div class="hotelPriceBtn" id="price6" minPrice="1000" maxPrice="5000">1000-5000</div>\
            <input type="text" value="0" class="searchMinPrice">\
            <div style="height:23px;width:30px;border-bottom:2px solid #979797"></div>\
            <input type="text" value="700" class="searchMaxPrice">\
            <div class="searchHotelBtn btnBackColor" state="domHotel">'+ get_lan('searchBody').search + '</div>\
        </div>'

    content.hotelAddress =
        '<div class="flexRow" style="width:240px;">\
            <span style="margin:0 10px 0 10px;">'+ get_lan('searchBody').hotelAddress + '</span>\
            <div class="hotelAddressBody">\
            <input type="text" id="hotelAddress" autocomplete="off">\
            <select id="hotelAddressSelect"></select>\
            </div>\
        </div>'

    content.siftCompanyBill = '<div class="tabBtn companyBillBtn" state="none">' + get_lan('siftBody').companyBill + '</div>'
    content.siftProtocal = '<div class="tabBtn protocolBtn" state="none">' + get_lan('siftBody').protocol + '</div>'
    content.hotelNumber = get_lan('hotelsNumber').hotelsNumber1BCD + '<span style="font-size:26px;margin:0 8px 0 8px" class="hotelsNumberText"></span>' + get_lan('hotelsNumber').hotelsNumber2

    // 筛选、搜索、排序初始化
    functions.init = function () {
        //显示筛选
        $('.infoBody').removeClass('hide')
        //默认选择星级
        var choosedStars = queryKey.split(',')[6]
        if (choosedStars == "0-1-2-3-4-5") {
            $('.hotelStarBtn').removeClass('starChoose')
            $('.hotelStarBtn').eq(0).addClass('starChoose')
        } else {
            $('.hotelStarBtn').removeClass('starChoose')
            if (choosedStars.indexOf('1-2') > -1) {//二星级以及一下
                $('.hotelStarBtn').eq(1).addClass('starChoose')
            }
            if (choosedStars.indexOf('3') > -1) {//三星级
                $('.hotelStarBtn').eq(2).addClass('starChoose')
            }
            if (choosedStars.indexOf('4') > -1) {//四星级
                $('.hotelStarBtn').eq(3).addClass('starChoose')
            }
            if (choosedStars.indexOf('5') > -1) {//五星级
                $('.hotelStarBtn').eq(4).addClass('starChoose')

            }
        }
        //选择星级
        $(".hotelStarBtn").unbind("click").click(function () {
            if ($(this).attr("star") == "1-2-3-4-5") {
                $(".hotelStarBtn").removeClass("starChoose");
                $(this).addClass("starChoose");
            } else {
                $(".hotelStarBtn").eq(0).removeClass("starChoose");
                if ($(this).hasClass("starChoose")) {
                    $(this).removeClass("starChoose");
                } else {
                    $(this).addClass("starChoose");
                }
                if ($(".starChoose").length == 0) {
                    $(".hotelStarBtn").eq(0).addClass("starChoose");
                }
            }
        })
        if (searchHotelInfo.hotelState == "intlHotel") {
            $("#hotelCity").removeAttr("id").attr("id", "hotelIntlCity");
            $("#hotelIntlCity").val(searchHotelInfo.hotelCityText);
            $("#hotelIntlCity").attr("code", searchHotelInfo.hotelCode);
            $("#hotelIntlCity").kuCity();
            $(".searchHotelBtn").attr("state", "intlHotel");
            // 12.25修改  删除币种
            $('#price1').text("0-150")
            $('#price2').text("150-300")
            $('#price3').text("300-450")
            $('#price4').text("450-600")
            $('#price5').text("600-1000")
            $('#price6').text("1000-5000")
        }
        //关键字
        $("#keyWordInput").attr("key", queryKeyList[2]);
        $("#keyWordInput").val(searchHotelInfo.hotelKeyWordText);

        $("#keyWordInput").unbind("click").click(function () {
            if ($(".searchHotelBtn").attr("state") == "domHotel") {
                var hotelCityCode = $('#hotelCity').attr("code");
            } else if ($(".searchHotelBtn").attr("state") == "intlHotel") {
                var hotelCityCode = $('#hotelIntlCity').attr("code");
            }
            if (!hotelCityCode) {
                $(".keyWordBody").html('');
                alert(get_lan('searchBody').keyWordRemind);
            } else {
                $("#keyWordInput").on('input propertychange', function () {
                    debounceSearchHotel();
                })
                var debounceSearchHotel = debounce(searchHotel, 500);
                function searchHotel() {
                    $(".keyWordBody").html("");
                    $.ajax({
                        type: 'post',
                        url: $.session.get('ajaxUrl'),
                        dataType: 'json',
                        data: {
                            url: $.session.get('obtCompany') + "/QueryService.svc/SearchHotelRelatedInfoPost",
                            jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + obtLanguage +
                                '","queryKey":"' + $("#keyWordInput").val() + '"}'
                        },
                        success: function (data) {
                            var res = JSON.parse(data);
                            console.log(res);
                            $(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
                            res.RelatedInfos.map(function (item) {
                                var keyWordType = '', keyWordTypeText = '';
                                switch (parseInt(item.Type)) {
                                    case 1:
                                        keyWordType = 'keywordTitle--district';
                                        keyWordTypeText = get_lan('keyWordBody').keywordDistrict;
                                        break;
                                    case 2:
                                        keyWordType = 'keywordTitle--commercial';
                                        keyWordTypeText = get_lan('keyWordBody').keywordCommercial;
                                        break;
                                    case 3:
                                        keyWordType = 'keywordTitle--extCommercial';
                                        keyWordTypeText = get_lan('keyWordBody').keywordExtCommercial;
                                        break;
                                    case 4:
                                        keyWordType = 'keywordTitle--brand';
                                        keyWordTypeText = get_lan('keyWordBody').keywordBrand;
                                        break;
                                    case 5:
                                        keyWordType = 'keywordTitle--hotel';
                                        keyWordTypeText = get_lan('keyWordBody').keywordHotel;
                                        break;
                                    default:
                                        keyWordType = '';
                                        keyWordTypeText = '';
                                        break;
                                }
                                var contentDom = "<span class='content'>" + item.Content.replace($('#keyWordInput').val(), "<b>" + $('#keyWordInput').val() + "</b>") + "</span>";
                                var keyWordTypeHTML = '<span class="keyWordBodyLi--type">' + keyWordTypeText + '</span>';
                                $(".keyWordBodyList").append('\
                                    <li class="keyWordBodyLi ' + keyWordType + '" type="' +
                                    item.Type + '" relationId="' + item.ID + '" key="' + item.Key + '">' + contentDom + keyWordTypeHTML +
                                    '</li>\
                                    ')
                            })
                            $(".keyWordBodyLi").on('mousedown', function () {
                                $("#keyWordInput").val($(this).find('.content').text());
                                $("#keyWordInput").attr("relationId", $(this).attr("relationId"));
                                $("#keyWordInput").attr("hoteltype", $(this).attr("type"));
                                $("#keyWordInput").attr("key", $(this).attr("key"));
                                $(".keyWordBody").hide();
                            })
                        },
                        error: function () {
                            // alert('fail');
                        }
                    });
                }
                $('body').mLoading("show");
                $.ajax({
                    type: 'post',
                    url: $.session.get('ajaxUrl'),
                    dataType: 'json',
                    data: {
                        url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelRelatedInfoPost",
                        jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + $.session.get(
                            'obtLanguage') + '"}'
                    },
                    success: function (data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        //推荐酒店
                        var hotelLength = res.HistoryHotelList.length > 4 ? 4 : res.HistoryHotelList.length;
                        var hotelStr = '';
                        for (var i = 0; i < hotelLength; i++) {
                            if (obtLanguage == "CN") {
                                hotelStr += '<div class="relationLi" type="' + res.HistoryHotelList[i].Type +
                                    '" relationId="' + res.HistoryHotelList[i].ID + '" key="' + res.HistoryHotelList[i].NameCn + '">' + res.HistoryHotelList[
                                        i].NameCn + '</div>';
                            } else if (obtLanguage == "EN") {
                                hotelStr += '<div class="relationLi" type="' + res.HistoryHotelList[i].Type +
                                    '" relationId="' + res.HistoryHotelList[i].ID + '" key="' + res.HistoryHotelList[i].NameCn + '">' + res.HistoryHotelList[
                                        i].NameEn + '</div>';
                            }
                        }

                        var brandLength = res.BrandList.length > 10 ? 10 : res.BrandList.length;
                        var districtLength = res.DistrictList.length > 10 ? 10 : res.DistrictList.length;
                        var commercialLength = res.CommercialList.length > 10 ? 10 : res.CommercialList.length;
                        var extCommercialLength = res.ExtCommercialList.length > 10 ? 10 : res.ExtCommercialList.length;

                        function moreBtn(cls) {
                            return '<div class="moreBtn ' + cls + '">More</div>'
                        }
                        var brandMore = res.BrandList.length > 10 ? moreBtn('brand') : '';
                        var districtMore = res.DistrictList.length > 10 ? moreBtn('district') : '';
                        var commercialMore = res.CommercialList.length > 10 ? moreBtn('commercial') : '';
                        var extCommercialMore = res.ExtCommercialList.length > 10 ? moreBtn('extCommercial') : '';

                        var keyWordsIndexNormal = {
                            brandLength: brandLength,
                            districtLength: districtLength,
                            commercialLength: commercialLength,
                            extCommercialLength: extCommercialLength
                        }
                        var keyWordsIndexPopWindow = {
                            brandLength: res.BrandList.length,
                            districtLength: res.DistrictList.length,
                            commercialLength: res.CommercialList.length,
                            extCommercialLength: res.ExtCommercialList.length
                        }
                        function getKeyWordsDom(lengthObj) {
                            //品牌
                            var brandStr = '';
                            for (var i = 0; i < lengthObj.brandLength; i++) {
                                if (obtLanguage == "CN") {
                                    brandStr += '<div class="relationLi" type="' + res.BrandList[i].Type + '" relationId="' + res.BrandList[i].ID +
                                        '" key="' + res.BrandList[i].NameCn + '">' + res.BrandList[i].NameCn + '</div>';
                                } else if (obtLanguage == "EN") {
                                    brandStr += '<div class="relationLi" type="' + res.BrandList[i].Type + '" relationId="' + res.BrandList[i].ID +
                                        '" key="' + res.BrandList[i].NameCn + '">' + res.BrandList[i].NameEn + '</div>';
                                }
                            }
                            //行政区
                            var districtStr = '';
                            for (var i = 0; i < lengthObj.districtLength; i++) {
                                if (obtLanguage == "CN") {
                                    districtStr += '<div class="relationLi" type="' + res.DistrictList[i].Type + '" relationId="' + res.DistrictList[
                                        i].ID + '" key="' + res.DistrictList[i].NameCn + '">' + res.DistrictList[i].NameCn + '</div>';
                                } else if (obtLanguage == "EN") {
                                    districtStr += '<div class="relationLi" type="' + res.DistrictList[i].Type + '" relationId="' + res.DistrictList[
                                        i].ID + '" key="' + res.DistrictList[i].NameCn + '">' + res.DistrictList[i].NameEn + '</div>';
                                }
                            }
                            //商圈
                            var commercialStr = '';
                            for (var i = 0; i < lengthObj.commercialLength; i++) {
                                if (obtLanguage == "CN") {
                                    commercialStr += '<div class="relationLi" type="' + res.CommercialList[i].Type + '" relationId="' + res.CommercialList[
                                        i].ID + '" key="' + res.CommercialList[i].NameCn + '">' + res.CommercialList[i].NameCn + '</div>';
                                } else if (obtLanguage == "EN") {
                                    commercialStr += '<div class="relationLi" type="' + res.CommercialList[i].Type + '" relationId="' + res.CommercialList[
                                        i].ID + '" key="' + res.CommercialList[i].NameCn + '">' + res.CommercialList[i].NameEn + '</div>';
                                }
                            }
                            //附属商圈
                            var extCommercialStr = '';
                            for (var i = 0; i < lengthObj.extCommercialLength; i++) {
                                if (obtLanguage == "CN") {
                                    extCommercialStr += '<div class="relationLi" type="' + res.ExtCommercialList[i].Type + '" relationId="' +
                                        res.ExtCommercialList[i].ID + '" key="' + res.ExtCommercialList[i].NameCn + '">' + res.ExtCommercialList[i]
                                            .NameCn + '</div>';
                                } else if (obtLanguage == "EN") {
                                    extCommercialStr += '<div class="relationLi" type="' + res.ExtCommercialList[i].Type + '" relationId="' +
                                        res.ExtCommercialList[i].ID + '" key="' + res.ExtCommercialList[i].NameCn + '">' + res.ExtCommercialList[i]
                                            .NameEn + '</div>';
                                }
                            }
                            return {
                                brandStr: brandStr,
                                districtStr: districtStr,
                                commercialStr: commercialStr,
                                extCommercialStr: extCommercialStr
                            }
                        }
                        var keyWordsNormalObj = getKeyWordsDom(keyWordsIndexNormal);
                        var keyWordsIndexPopWindowObj = getKeyWordsDom(keyWordsIndexPopWindow);	//弹窗用的对象
                        var showHotel = hotelStr == "" ? "hide" : "";
                        var showBrand = keyWordsNormalObj.brandStr == "" ? "hide" : "";
                        var showDistrict = keyWordsNormalObj.districtStr == "" ? "hide" : "";
                        var showCommercial = keyWordsNormalObj.commercialStr == "" ? "hide" : "";
                        var showExtCommercial = keyWordsNormalObj.extCommercialStr == "" ? "hide" : "";
                        $(".keyWordBody").html('\
                            <div class="relationBody ' + showHotel + '">\
                              <div class="relationTittle flexRow keywordTitle--hotel">\
                                <div>' + get_lan('keyWordBody').hotel + '</div>\
                              </div>\
                              <div class="relationContent flexWrap">' + hotelStr + '</div>\
                            </div>\
                            <div class="relationBody ' + showBrand + '">\
                              <div class="relationTittle flexRow keywordTitle--brand">\
                                <div>' + get_lan('keyWordBody').brand + '</div>\
                              </div>\
                              <div class="relationContent flexWrap">' + keyWordsNormalObj.brandStr + '</div>\
                            </div>\
                            <div class="relationBody ' + showDistrict + '">\
                              <div class="relationTittle flexRow keywordTitle--district">\
                                <div>' + get_lan('keyWordBody').district + '</div>\
                              </div>\
                              <div class="relationContent flexWrap">' + keyWordsNormalObj.districtStr + '</div>\
                            </div>\
                            <div class="relationBody ' + showCommercial + '">\
                              <div class="relationTittle flexRow keywordTitle--commercial">\
                                <div>' + get_lan('keyWordBody').commercial + '</div>\
                              </div>\
                              <div class="relationContent flexWrap">' + keyWordsNormalObj.commercialStr + '</div>\
                            </div>\
                            <div class="relationBody ' + showExtCommercial + '">\
                              <div class="relationTittle flexRow keywordTitle--extCommercial">\
                                <div>' + get_lan('keyWordBody').extCommercial + '</div>\
                              </div>\
                              <div class="relationContent flexWrap">' + keyWordsNormalObj.extCommercialStr + '</div>\
                            </div>\
                        ')
                        $(".relationLi").on('mousedown', function () {
                            $("#keyWordInput").val($(this).text());
                            $("#keyWordInput").attr("relationId", $(this).attr("relationId"));
                            $("#keyWordInput").attr("hoteltype", $(this).attr("type"));
                            $("#keyWordInput").attr("key", $(this).attr("key"));
                            $(".keyWordBody").hide();
                        })
                    },
                    error: function () {
                        // alert('fail'); 
                    }
                });
            }
        })

        //酒店地址
        if (hotelAddress_latitude != "" && hotelAddress_longitude != "") {
            $('#hotelAddress').attr('longitude', hotelAddress_longitude).attr('latitude', hotelAddress_latitude);
        }
        $("#hotelAddress").val(searchHotelInfo.hotelAddressText);
        $("#hotelAddress").attr("key", queryKeyList[3]);
        $("#hotelAddress").on('input propertychange', function () {
            $("#hotelAddress").removeAttr("key");
        })
        $("#hotelAddress").on('focus', function () {
            if (obtLanguage != "CN" && ($('#hotelCity').attr('code') || $('#hotelIntlCity').attr('code'))) {
                var centerLat = $('#hotelAddress').attr('latitude') || $.session.get('centerLat')
                var centerLng = $('#hotelAddress').attr('longitude') || $.session.get('centerLng')
                if (!centerLat || !centerLng) {
                    return false;
                }
                if ($('.mapboxgl-ctrl-geocoder').length == 0) {
                    $('#mapboxMap').show();
                    var mapbox = new Mapbox();
                    var defaultMarker = $('#hotelAddress').attr('latitude') && $('#hotelAddress').attr('longitude') ? true : false;
                    var options = {
                        centerLng: centerLng,
                        centerLat: centerLat,
                        defaultMarker: defaultMarker,
                        hideSearchBar: false,
                        container: ''
                    }
                    try {
                        mapbox.initMapBox(options)
                    } catch (err) {
                        mapbox.__mapboxClose();
                        // $('body').prepend('<div class="mapbox_tips">Cannot open the map, please update your browser to open the map.</div>')
                        $('.mapbox_tips').show();
                        setTimeout(function () {
                            $('.mapbox_tips').hide();
                        }, 3000);
                    }
                }
            }
        });
        // 公司名字
        var getCustomerCompanyJson = {
            cityCode: searchHotelInfo.hotelCode,
            id: uidWithoutQuote,
            Language: obtLanguage
        }
        // 地址下拉
        $.ajax({
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/QueryService.svc/GetCustomerCompanyAddressPost",
                jsonStr: JSON.stringify(getCustomerCompanyJson)
            },
            success: function (data) {
                var res = JSON.parse(data);
                console.log(res);
                if (res.companyInfos.length == 0) {
                    $("#hotelAddressSelect").addClass("hide");
                } else {
                    $("#hotelAddressSelect").removeClass("hide");
                    if ($.session.get('obtLanguage') == "CN") {
                        $("#hotelAddressSelect").html('<option value="">请选择公司</option>');
                    } else if ($.session.get('obtLanguage') == "EN") {
                        $("#hotelAddressSelect").html('<option value="">Please select</option>');
                    }
                    res.companyInfos.map(function (item) {
                        if (item.CompanyAddress != "") {
                            $("#hotelAddressSelect").append('\
                                  <option value="'+ item.CompanyAddress + '" key="' + item.Key + '">' + item.CompanyName + '</option>\
                                  ')
                        }
                    })
                    /*酒店位置*/
                    $("#hotelAddressSelect").change(function () {
                        $("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
                        $("#hotelAddress").attr("key", $('#hotelAddressSelect option:selected').attr("key"));
                    })
                }
            },
            error: function () {
                // alert('fail'); 
            }
        });

        //选择价格
        $(".searchMinPrice").val(queryKeyList[7]);
        $(".searchMaxPrice").val(queryKeyList[8]);
        $(".hotelPriceBtn").unbind("click").click(function () {
            $('.hotelPriceBtn').removeClass('starChoose')
            $(this).addClass('starChoose')
            $(".searchMinPrice").val($(this).attr("minPrice"));
            $(".searchMaxPrice").val($(this).attr("maxPrice"));
        })
        var minIndex, maxIndex
        $(".searchMinPrice").unbind("change").change(function () {
            getInputPrice()
        })
        $(".searchMaxPrice").unbind("change").change(function () {
            getInputPrice()
        })

        function getInputPrice() {
            var inputMin = $(".searchMinPrice").val()
            var inputMax = $(".searchMaxPrice").val()
            $(".hotelPriceBtn").map(function (index) {
                var max = $(this).attr("maxPrice")
                var min = $(this).attr("minPrice")
                if (max == inputMax) {
                    maxIndex = index
                }
                if (min == inputMin) {
                    minIndex = index
                }
            })
            $('.hotelPriceBtn').removeClass('starChoose')
            if (maxIndex == minIndex) {
                $($('.hotelPriceBtn')[maxIndex]).addClass('starChoose')
            }
        }
        $.ajax({
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/QueryService.svc/QueryDateLimit",
                jsonStr: '{"id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
            },
            success: function (data) {
                var res = JSON.parse(data);
                console.log(res);
                res.map(function (item) {
                    if (item.LimitType == 3) {
                        $(".searchHotelBtn").attr("CanSearch", item.CanSearch);
                        $(".searchHotelBtn").attr("StartLimit", item.StartLimit);
                        $(".searchHotelBtn").attr("Message", item.Message);
                    }
                })
            },
            error: function () {
                // alert('fail');
            }
        });
    }
    // 选择日期为后一天
    functions.selectDepartureDate = function () { $("#hotelReturnDate").val(getNextDay($("#hotelDepartureDate").val())); }

    // 广告接口
    functions.getBanner = function () { GetCompanyImageInfos() }

    functions.hotelListFn = function (res) {
        isShowCompanyPay(res);
        // hotelFilter(res);
        var breakfast = new FilterModel({ domSelector: '.breakfastBtn', brothers: ['.freeCancelBtn', '.noGuaranteeBtn'], fuxun: 0, pullFn: function () { } });
        var freeCancel = new FilterModel({ domSelector: '.freeCancelBtn', brothers: ['.breakfastBtn'], fuxun: 0, pullFn: function () { } });
        var noGuarantee = new FilterModel({ domSelector: '.noGuaranteeBtn', brothers: ['.breakfastBtn'], fuxun: 0, pullFn: function () { } });
        var protocol = new FilterModel({ domSelector: '.protocolBtn', brothers: [], fuxun: 0, pullFn: function () { } });
        var companyBill = new FilterModel({ domSelector: '.companyBillBtn', brothers: [], fuxun: 1, pullFn: function () { } });
        breakfast.handlerClick();
        freeCancel.handlerClick();
        noGuarantee.handlerClick();
        protocol.handlerClick();
        companyBill.handlerClick();
    }
} else {
    // 苹果属性
    content.keyWordsPlaceholder = get_lan('searchBody').keyWordPlaceholder

    content.searchBtnInCondition = '<div class="searchHotelBtn" state="domHotel">' + get_lan('searchBody').search + '</div>'
    content.siftProtocal = '<div class="protocolBtn">' + get_lan('siftBody').protocol + '</div>'

    content.hotelNumber = get_lan('hotelsNumber').hotelsNumber1 + '<span style="font-size:26px;margin:0 8px 0 8px" class="hotelsNumberText"></span>' + get_lan('hotelsNumber').hotelsNumber2

    functions.init = function () {
        $("#keyWordInput").unbind("click").click(function () {
            if ($(".searchHotelBtn").attr("state") == "domHotel") {
                var hotelCityCode = $('#hotelCity').attr("code");
            } else if ($(".searchHotelBtn").attr("state") == "intlHotel") {
                var hotelCityCode = $('#hotelIntlCity').attr("code");
            }
            if (!hotelCityCode) {
                $(".keyWordBody").html('');
                alert(get_lan('searchBody').keyWordRemind);
            } else {
                var queryHotelCondition = {
                    cityCode: hotelCityCode,
                    id: uidWithoutQuote,
                    language: obtLanguage
                }
                $.ajax({
                    type: 'post',
                    url: $.session.get('ajaxUrl'),
                    dataType: 'json',
                    data: {
                        url: $.session.get('obtCompany') + "/QueryService.svc/GetQueryHotelConditionPost",
                        jsonStr: JSON.stringify(queryHotelCondition)
                    },
                    success: function (data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        $(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
                        res.infoList.map(function (item) {
                            if (item.Address != "") {
                                $(".keyWordBodyList").append('\
                                    <li class="keyWordBodyLi" type="'+ item.Type + '" name="' + item.Name + '" address="' + item.Key + '">\
                                      <div class="keyWordBodyLiName">'+ item.Name + '</div>\
                                      <div class="keyWordBodyLiAddress">'+ item.Address + '</div>\
                                    </li>\
                                    ')
                            }
                        })
                        altRows(".keyWordBodyLi");
                        $(".keyWordBody").addClass("autoScrollY");
                        $("#keyWordInput").off('input propertychange');
                        $("#keyWordInput").on('input propertychange', function () {
                            $("#keyWordInput").removeAttr("appleType");
                            $("#keyWordInput").removeAttr('key');
                            $(".keyWordBodyList").html("");
                            console.log($("#keyWordInput").val());
                            res.infoList.map(function (item) {
                                if (item.Name.toUpperCase().indexOf($("#keyWordInput").val().toUpperCase()) != -1 || item.Address.toUpperCase().indexOf($("#keyWordInput").val().toUpperCase()) != -1) {
                                    // if(item.Name.indexOf($("#keyWordInput").val()) != -1||item.Address.indexOf($("#keyWordInput").val()) != -1){
                                    if (item.Address != "") {
                                        $(".keyWordBodyList").append('\
                                            <li class="keyWordBodyLi" type="'+ item.Type + '" name="' + item.Name + '" address="' + item.Key + '">\
                                              <div class="keyWordBodyLiName">'+ item.Name + '</div>\
                                              <div class="keyWordBodyLiAddress">'+ item.Address + '</div>\
                                            </li>\
                                            ')
                                    }
                                }
                            })
                            altRows(".keyWordBodyLi");
                            clickKeyWordBodyLi();
                        })
                        function altRows(tr) {
                            for (i = 0; i < $(tr).length; i++) {
                                if (i % 2 == 0) {
                                    $(tr).eq(i).addClass("evenrowcolor");
                                } else {
                                    $(tr).eq(i).addClass("oddrowcolor");
                                }
                            }
                        }
                        clickKeyWordBodyLi();
                        function clickKeyWordBodyLi() {
                            $(".keyWordBodyLi").on('mousedown', function () {
                                $("#keyWordInput").val($(this).attr("name"));
                                if ($(this).attr("type") == "1") {
                                    $("#keyWordInput").attr("appleType", "hotel");
                                    $("#keyWordInput").attr('key', $(this).attr("name"));
                                } else if ($(this).attr("type") == "2") {
                                    $("#keyWordInput").attr("appleType", "company");
                                    $("#keyWordInput").attr('key', $(this).attr("address"));
                                }
                                $(".keyWordBody").hide();
                            })
                        }
                    },
                    error: function () {
                        // alert('fail');
                    }
                });
            }
        })
    }
    functions.hotelFilterFn = function (NotNeedGaranteeData, allData, breakfastAndNotNeedGarantee, breakfastData, breakfastAndFreeCancel, NotNeedGaranteeData) {
        //顶部免担保
        $(".tabBtn").eq(2).unbind("click").click(function () {
            // $(".recommendList").css("color","#F58A00");
            $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color", "#000");
            $(".sortTabIcon").css("background-position", "0px 0px");
            $(".protocolBtn").css("background-color", "#fff");
            $(".protocolBtn").css("color", "#000");
            $(".protocolBtn").attr("state", "none");
            if ($(".tabBtn").eq(0).attr("state") == "none") {
                $(".tabBtn").css("background-color", "#f2f2f2");
                $(".tabBtn").css("color", "#000");
                $(".tabBtn").eq(1).attr("state", "none");
                if ($(this).attr("state") == "none") {
                    $(this).css("background-color", "#1e66ae");
                    $(this).css("color", "#fff");
                    $(this).attr("state", "click");
                    hotelListInfo(NotNeedGaranteeData);
                    hotelSort(NotNeedGaranteeData);
                    clickHotelLi();
                } else if ($(this).attr("state") == "click") {
                    $(this).css("background-color", "#f2f2f2");
                    $(this).css("color", "#000");
                    $(this).attr("state", "none");
                    hotelListInfo(allData.hotels);
                    hotelSort(allData.hotels);
                    clickHotelLi();
                }
            } else if ($(".tabBtn").eq(0).attr("state") == "click") {
                $(".tabBtn").eq(1).css("background-color", "#f2f2f2");
                $(".tabBtn").eq(1).css("color", "#000");
                $(".tabBtn").eq(1).attr("state", "none");
                if ($(this).attr("state") == "none") {
                    $(this).css("background-color", "#1e66ae");
                    $(this).css("color", "#fff");
                    $(this).attr("state", "click");
                    hotelListInfo(breakfastAndNotNeedGarantee);
                    hotelSort(breakfastAndNotNeedGarantee);
                    clickHotelLi();
                } else if ($(this).attr("state") == "click") {
                    $(this).css("background-color", "#f2f2f2");
                    $(this).css("color", "#000");
                    $(this).attr("state", "none");
                    hotelListInfo(breakfastData);
                    hotelSort(breakfastData);
                    clickHotelLi();
                }
            }
        })
        //顶部含早
        $(".tabBtn").eq(0).unbind("click").click(function () {
            // $(".recommendList").css("color","#F58A00");
            $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color", "#000");
            $(".sortTabIcon").css("background-position", "0px 0px");
            $(".protocolBtn").css("background-color", "#fff");
            $(".protocolBtn").css("color", "#000");
            $(".protocolBtn").attr("state", "none");
            if ($(".tabBtn").eq(1).attr("state") == "none" && $(".tabBtn").eq(2).attr("state") == "none") {
                if ($(this).attr("state") == "none") {
                    $(this).css("background-color", "#1e66ae");
                    $(this).css("color", "#fff");
                    $(this).attr("state", "click");
                    hotelListInfo(breakfastData);
                    hotelSort(breakfastData);
                    clickHotelLi();
                } else if ($(this).attr("state") == "click") {
                    $(this).css("background-color", "#f2f2f2");
                    $(this).css("color", "#000");
                    $(this).attr("state", "none");
                    hotelListInfo(allData.hotels);
                    hotelSort(allData.hotels);
                    clickHotelLi();
                }
            } else if ($(".tabBtn").eq(1).attr("state") == "click" && $(".tabBtn").eq(2).attr("state") == "none") {
                if ($(this).attr("state") == "none") {
                    $(this).css("background-color", "#1e66ae");
                    $(this).css("color", "#fff");
                    $(this).attr("state", "click");
                    hotelListInfo(breakfastAndFreeCancel);
                    hotelSort(breakfastAndFreeCancel);
                    clickHotelLi();
                } else if ($(this).attr("state") == "click") {
                    $(this).css("background-color", "#f2f2f2");
                    $(this).css("color", "#000");
                    $(this).attr("state", "none");
                    hotelListInfo(freeCancelData);
                    hotelSort(freeCancelData);
                    clickHotelLi();
                }
            } else if ($(".tabBtn").eq(1).attr("state") == "none" && $(".tabBtn").eq(2).attr("state") == "click") {
                if ($(this).attr("state") == "none") {
                    $(this).css("background-color", "#1e66ae");
                    $(this).css("color", "#fff");
                    $(this).attr("state", "click");
                    hotelListInfo(breakfastAndNotNeedGarantee);
                    hotelSort(breakfastAndNotNeedGarantee);
                    clickHotelLi();
                } else if ($(this).attr("state") == "click") {
                    $(this).css("background-color", "#f2f2f2");
                    $(this).css("color", "#000");
                    $(this).attr("state", "none");
                    hotelListInfo(NotNeedGaranteeData);
                    hotelSort(NotNeedGaranteeData);
                    clickHotelLi();
                }
            }
        })
        //顶部免费取消
        $(".tabBtn").eq(1).unbind("click").click(function () {
            // $(".recommendList").css("color","#F58A00");
            $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color", "#000");
            $(".sortTabIcon").css("background-position", "0px 0px");
            $(".protocolBtn").css("background-color", "#fff");
            $(".protocolBtn").css("color", "#000");
            $(".protocolBtn").attr("state", "none");
            if ($(".tabBtn").eq(0).attr("state") == "none") {
                $(".tabBtn").css("background-color", "#f2f2f2");
                $(".tabBtn").css("color", "#000");
                $(".tabBtn").eq(2).attr("state", "none");
                if ($(this).attr("state") == "none") {
                    $(this).css("background-color", "#1e66ae");
                    $(this).css("color", "#fff");
                    $(this).attr("state", "click");
                    hotelListInfo(freeCancelData);
                    hotelSort(freeCancelData);
                    clickHotelLi();
                } else if ($(this).attr("state") == "click") {
                    $(this).css("background-color", "#f2f2f2");
                    $(this).css("color", "#000");
                    $(this).attr("state", "none");
                    hotelListInfo(allData.hotels);
                    hotelSort(allData.hotels);
                    clickHotelLi();
                }
            } else if ($(".tabBtn").eq(0).attr("state") == "click") {
                $(".tabBtn").eq(2).css("background-color", "#f2f2f2");
                $(".tabBtn").eq(2).css("color", "#000");
                $(".tabBtn").eq(2).attr("state", "none");
                if ($(this).attr("state") == "none") {
                    $(this).css("background-color", "#1e66ae");
                    $(this).css("color", "#fff");
                    $(this).attr("state", "click");
                    hotelListInfo(breakfastAndFreeCancel);
                    hotelSort(breakfastAndFreeCancel);
                    clickHotelLi();
                } else if ($(this).attr("state") == "click") {
                    $(this).css("background-color", "#f2f2f2");
                    $(this).css("color", "#000");
                    $(this).attr("state", "none");
                    hotelListInfo(breakfastData);
                    hotelSort(breakfastData);
                    clickHotelLi();
                }
            }
        })
        //是否协议价
        $(".protocolBtn").unbind("click").click(function () {
            // $(".recommendList").css("color","#F58A00");
            $(".priceSort,.starSort,.scoreSort,.distanceSort").css("color", "#000");
            $(".sortTabIcon").css("background-position", "0px 0px");
            console.log(protocolData);
            $(".tabBtn").css("background-color", "#fff");
            $(".tabBtn").css("color", "#000");
            $(".tabBtn").attr("state", "none");
            if (!$(this).attr("state") || $(this).attr("state") == "none") {
                $(this).css("background-color", "#4c81dd");
                $(this).css("color", "#fff");
                $(this).attr("state", "click");
                hotelListInfo(protocolData);
                hotelSort(protocolData);
                clickHotelLi();
            } else if ($(this).attr("state") == "click") {
                $(this).css("background-color", "#fff");
                $(this).css("color", "#000");
                $(this).attr("state", "none");
                hotelListInfo(allData.hotels);
                hotelSort(allData.hotels);
                clickHotelLi();
            }
        })
    }
}
//内容展示
function showContent() {
    $("#main").html('\
        <div id="cover"></div>\
        <div class="autoCenter">'
        + content.searchMap +
        '<div class="progressBar flexRow"></div>\
            <div class="searchBody"></div>'
        + content.banner +
        '<div class="infoBody hide">\
              <div class="hotelChooseBody flexRow"></div>\
              <div class="siftBody flexRow"></div>\
            </div>\
            <div class="hotelsNumber flexRow"></div>\
            <div class="hotelListBody flexRow">\
              <div id="hotelListMap"></div>\
              <div class="hotelList autoScrollY"></div>\
            </div>\
        </div>\
    ')
    if(ProfileInfo.onlineStyle == 'APAC'){
        $(".progressBar").html('\
            <div class="progressLine active"></div><span class="activeProgress">'+ get_lan('progressBar').search + '</span>\
            <div class="progressLine progressBackColor"></div>'+ get_lan('progressBar').book + '\
            <div class="progressLine progressBackColor"></div>'+ get_lan('progressBar').complete + '\
        ')
    }else{
        $(".progressBar").html('\
            <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">'+ get_lan('progressBar').search + '</span>\
            <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+ get_lan('progressBar').book + '\
            <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+ get_lan('progressBar').complete + '\
            ')
    }
    $(".hotelChooseBody").html('\
        '+ get_lan('hotelChooseBody').remind + ProfileInfo.OfficeCurrency + '<span class="policyPrice"></span>\
        ')
    var hotelPolicyPrice = {
        cityCode: searchHotelInfo.hotelCode,
        id: uidWithoutQuote,
        checkIn: queryKeyList[4],
        checkOut: queryKeyList[5]
    }
    $.ajax({
        type: 'post',
        url: $.session.get('ajaxUrl'),
        dataType: 'json',
        data: {
            url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
            jsonStr: JSON.stringify(hotelPolicyPrice)
        },
        success: function (data) {
            var res = JSON.parse(data);
            console.log(res);
            if (parseInt(res.maxFare) != 0) {
                $(".policyPrice").text(parseInt(res.maxFare) - 1);
            } else {
                $(".policyPrice").text(parseInt(res.maxFare));
            }
            $(".searchMaxPrice").val(res.maxFare);
        },
        error: function () {
            // alert('fail');
        }
    });
    // <div class="flexRow" style="width:300px;">\
    //   <span style="margin:0 15px 0 15px;">'+get_lan('searchBody').hotelKeyWords+'</span>\
    //   <input type="text" id="keyWordInput" placeholder="'+get_lan('searchBody').hotelKeyInput+'" readonly>\
    // </div>\
    //查询模块
    $(".searchBody").html('\
        <div class="searchConditionBody flexRow" style="height:50px;line-height:50px;font-size:14px;">\
          <div class="flexRow" style="width:230px;">\
            <span style="margin:0 10px 0 10px;">'+ get_lan('searchBody').hotelCity + '</span>\
            <input type="text" id="hotelCity" autocomplete="off" placeholder="'+ get_lan('searchBody').hotelCityInput + '">\
          </div>\
          <div class="flexRow" style="width:220px;">\
            <span style="margin:0 10px 0 10px;">'+ get_lan('searchBody').hotelCheckInDate + '</span>\
            <input type="text" id="hotelDepartureDate" readonly="readonly">\
          </div>\
          <div class="flexRow" style="width:220px;">\
            <span style="margin:0 10px 0 10px;">'+ get_lan('searchBody').hotelCheckOutDate + '</span>\
            <input type="text" id="hotelReturnDate" readonly="readonly">\
          </div>'
        + content.hotelAddress +
        '<div class="flexRow" style="width:300px;">\
            <span style="margin:0 10px 0 10px;">'+ get_lan('searchBody').hotelKeyWords + '</span>\
            <input type="text" id="keyWordInput" placeholder="'+ content.keyWordsPlaceholder + '">\
          </div>\
          <div class="keyWordBody"></div>'
        + content.searchBtnInCondition +
        '</div>' + content.searchStarBody + content.searchPriceBody
    )
    if (searchHotelInfo.hotelState == "intlHotel") {
        $("#hotelCity").removeAttr("id").attr("id", "hotelIntlCity");
        $("#hotelIntlCity").val(searchHotelInfo.hotelCityText);
        $("#hotelIntlCity").attr("code", searchHotelInfo.hotelCode);
        $("#hotelIntlCity").kuCity();
        $(".searchHotelBtn").attr("state", "intlHotel");
    }

    functions.init()

    //选择城市
    $("#hotelCity").val(searchHotelInfo.hotelCityText);
    $("#hotelCity").attr("code", searchHotelInfo.hotelCode);
    $("#hotelCity").kuCity();

    $("#keyWordInput").on('focus', function () {
        $(".keyWordBody").show();
    }).on('blur', function () {
        $(".keyWordBody").hide();
    })

    $("#keyWordInput").val(searchHotelInfo.appleValue);
    if (searchHotelInfo.appleKey) {
        $("#keyWordInput").attr("key", searchHotelInfo.appleKey);
    }
    if (searchHotelInfo.appleType) {
        $("#keyWordInput").attr("appleType", searchHotelInfo.appleType);
    }
    //选择日期
    $("#hotelDepartureDate").val(queryKeyList[4]);
    $("#hotelReturnDate").val(queryKeyList[5]);
    var departureValue = new Date($("#hotelDepartureDate").val().replace(/-/g, "/"));
    $("#hotelReturnDate").datepicker('destroy');
    $("#hotelReturnDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: departureValue,  // 当前日期之后的 0 天，就是当天
        maxDate: 365,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $("#hotelDepartureDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: 0,  // 当前日期之后的 0 天，就是当天
        maxDate: 365,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function () {
            var departureValue = new Date($("#hotelDepartureDate").val().replace(/-/g, "/"));
            $("#hotelReturnDate").datepicker('destroy');
            $("#hotelReturnDate").datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                minDate: departureValue,  // 当前日期之后的 0 天，就是当天
                maxDate: 365,  // 当前日期之后的 0 天，就是当天
                hideIfNoPrevNext: true,
                showOtherMonths: true,
                selectOtherMonths: true,
            });
            functions.selectDepartureDate()
        }
    });

    //搜索酒店
    $(".searchHotelBtn").unbind("click").click(function () {
        var that = this
        if ($(this).attr("state") == "domHotel") {
            var hotelCityCode = $('#hotelCity').attr("code");
            var hotelCityText = $('#hotelCity').val();
            var hotelState = "domHotel";
        } else if ($(this).attr("state") == "intlHotel") {
            var hotelCityCode = $('#hotelIntlCity').attr("code");
            var hotelCityText = $('#hotelIntlCity').val();
            var hotelState = "intlHotel";
        }
        cityList = '"' + hotelCityCode + '"';
        if (ProfileInfo.onlineStyle === 'BCD') {
            tools.appleRemindPop(cityList, 2, netUserId, function () {
                if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
                    if (datedifference(getNowFormatDate(), $('#hotelDepartureDate').val()) < parseInt($(that).attr("startlimit"))) {
                        if ($(that).attr("CanSearch") != "true") {
                            if ($(that).attr("Message").indexOf("\\n") != -1) {
                                alert($(that).attr("Message").split("\\n").join('\n'));
                            } else {
                                alert($(that).attr("Message"));
                            }
                            return false;
                        } else {
                            if ($(that).attr("Message").indexOf("\\n") != -1) {
                                var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
                            } else {
                                var mymessage = confirm($(that).attr("Message"));
                            }
                            if (mymessage == true) {
                                if ($(that).attr("CanSearch") != "true") {
                                    return false;
                                } else {
                                    searchHotel()
                                }
                            } else {
                                return false;
                            }
                        }
                    } else {
                        searchHotel()
                    }
                } else {
                    searchHotel()
                }
            });
        } else {
            tools.appleRemindPop(cityList, 2, netUserId, function () { searchAppleHotel(hotelCityCode, hotelCityText, hotelState) });
        }
        function searchHotel() {
            var hotelAreaTypeID = $("#keyWordInput").attr("hoteltype") && $("#keyWordInput").attr("hoteltype") != 5 ? $("#keyWordInput").attr("relationId") + '-' + $("#keyWordInput").attr("hoteltype") : '';
            var hotelname = !$("#keyWordInput").attr("hoteltype") || $("#keyWordInput").attr("hoteltype") == 5 ? $("#keyWordInput").val().split(",").join(' ') : '';
            var hotel_longitude = $('#hotelAddress').attr('longitude') ? $('#hotelAddress').attr('longitude') : "";
            var hotel_latitude = $('#hotelAddress').attr('latitude') ? $('#hotelAddress').attr('latitude') : "";
            var hotel_lonLat = hotel_longitude + ',' + hotel_latitude;
            if ($(that).attr("state") == "domHotel") {
                if ($("#hotelAddress").val() != "" && hotel_longitude == "" && hotel_latitude == "") {
                    if ($("#hotelAddress").attr("key")) {
                        var address = $("#hotelCity").val() + $("#hotelAddress").attr("key").split(",").join(' ');
                    } else {
                        var address = $("#hotelCity").val() + $("#hotelAddress").val().split(",").join(' ');
                    }
                } else {
                    var address = "";
                }
            } else if ($(that).attr("state") == "intlHotel") {
                if ($("#hotelAddress").val() != "" && hotel_longitude == "" && hotel_latitude == "") {
                    if ($("#hotelAddress").attr("key")) {
                        var address = $("#hotelIntlCity").val() + $("#hotelAddress").attr("key").split(",").join(' ');
                    } else {
                        var address = $("#hotelIntlCity").val() + $("#hotelAddress").val().split(",").join(' ');
                    }
                } else {
                    var address = "";
                }
            }
            var stars = '0-';
            console.log(stars);
            for (var i = 0; i < $('.searchStarBody .starChoose').length; i++) {
                stars += $('.searchStarBody .starChoose').eq(i).attr("star");
                stars += '-';
            }
            stars = stars.substring(0, stars.length - 1);
            var queryKey = hotelCityCode + ',' + hotelAreaTypeID + ',' + hotelname + ',' + address + ',' + $("#hotelDepartureDate").val() + ',' + $("#hotelReturnDate").val() + ',' + stars + ',' + $(".searchMinPrice").val() + ',' + $(".searchMaxPrice").val() + ",1,1,1,2000," + hotel_lonLat;
            setHotelInfo(queryKey, hotelCityCode, hotelCityText, hotelState)
            location.reload();
        }
        function searchAppleHotel(hotelCityCode, hotelCityText, hotelState) {
            if (hotelCityCode) {
                var hotelAreaTypeID = '';
                if (!$("#keyWordInput").attr("appleType") || $("#keyWordInput").attr("appleType") == "company") {
                    if (!$("#keyWordInput").attr("appleType") && $("#keyWordInput").val() != "") {
                        var hotelname = $("#keyWordInput").val();
                    } else {
                        var hotelname = "";
                    }
                } else if ($("#keyWordInput").attr("appleType") == "hotel") {
                    var hotelname = $("#keyWordInput").attr("key");
                }
                var stars = '0-1-2-3-4-5';
                if (!$("#keyWordInput").attr("appleType") || $("#keyWordInput").attr("appleType") == "hotel") {
                    var address = "";
                } else if ($("#keyWordInput").attr("appleType") == "company") {
                    var address = $("#keyWordInput").attr("key").split(",").join(" ");
                }
                if ($("#keyWordInput").val() == "") {
                    hotelname = "";
                    address = "";
                }
                $('body').mLoading("show");
                var hotelPolicyPrice = {
                    cityCode: hotelCityCode,
                    id: uidWithoutQuote,
                    checkIn: $("#hotelDepartureDate").val(),
                    checkOut: $("#hotelReturnDate").val()
                }
                $.ajax({
                    type: 'post',
                    url: $.session.get('ajaxUrl'),
                    dataType: 'json',
                    data: {
                        url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
                        jsonStr: JSON.stringify(hotelPolicyPrice)
                    },
                    success: function (data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        if (res.HasManual) {
                            maxFare = res.manualMaxFare;
                        } else {
                            maxFare = res.maxFare;
                        }
                        // $('body').mLoading("hide");
                        // $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
                        // $("#hotelPrice").attr("minPrice",res.minFare);
                        // $("#hotelPrice").attr("maxPrice",res.maxFare);
                        var queryKey = hotelCityCode + ',' + hotelAreaTypeID + ',' + hotelname + ',' + address + ',' + $("#hotelDepartureDate").val() + ',' + $("#hotelReturnDate").val() + ',' + stars + ',' + res.minFare + ',' + maxFare + ',1,1,1,2000,,';
                        setHotelInfo(queryKey, hotelCityCode, hotelCityText, hotelState)
                        location.reload();
                    },
                    error: function () {
                        // alert('fail');
                    }
                });

            } else {
                alert(get_lan('searchRemind'))
            }
        }
    })
    //排序模块
    $(".siftBody").html('\
        <div style="min-width:50px;margin-left:20px;color:#1e66ae;">'+ get_lan('siftBody').sort + '</div>\
        <div class="priceSort flexRow sortTab" style="min-width:50px;margin-left:30px;;cursor:pointer">'+ get_lan('siftBody').price + '<div class="priceSortIcon sortTabIcon"></div></div>\
        <div class="starSort flexRow sortTab hide" style="min-width:50px;margin-left:30px;;cursor:pointer">'+ get_lan('siftBody').star + '<div class="starSortIcon sortTabIcon"></div></div>\
        <div class="scoreSort flexRow sortTab" style="min-width:50px;margin-left:30px;;cursor:pointer">'+ get_lan('siftBody').score + '<div class="scoreSortIcon sortTabIcon"></div></div>\
        <div class="distanceSort flexRow sortTab" style="min-width:50px;margin-left:30px;;cursor:pointer">'+ get_lan('siftBody').distance + '<div class="distanceSortIcon sortTabIcon"></div></div>\
        <div class="filterText" style="min-width:50px;margin-left:150px;color:#1e66ae;">'+ get_lan('siftBody').filter + '</div>\
        <div class="tabBtn breakfastBtn" state="none">'+ get_lan('siftBody').breakfast + '</div>\
        <div class="tabBtn freeCancelBtn" state="none">'+ get_lan('siftBody').freeCancel + '</div>\
        <div class="tabBtn noGuaranteeBtn" state="none">'+ get_lan('siftBody').noGuarantee + '</div>'
        + content.siftProtocal
        + content.siftCompanyBill
    )
    //<div class="recommendList" style="min-width:50px;margin-left:30px;color:#F58A00;cursor:pointer">'+get_lan('siftBody').recommend+'</div>\
    $(".hotelsNumber").html(content.hotelNumber)
    if (searchHotelInfo.hotelState == "intlHotel") {
        $(".scoreSort").addClass("hide");
        $(".filterText").addClass("hide");
        $(".tabBtn").addClass("hide");
        if (ProfileInfo.onlineStyle === 'APPLE') {
            $(".protocolBtn").addClass("hide");
        }
    }
    functions.getBanner()
}
// 广告图片接口
function GetCompanyImageInfos() {
    $.ajax({
        type: 'post',
        url: $.session.get('ajaxUrl'),
        dataType: 'json',
        data: {
            url: $.session.get('obtCompany') + "/SystemService.svc/GetCompanyImageInfosWType",
            jsonStr: '{"key":' + netUserId + ',"appType":"WEB"}',
        },
        success: function (data) {
            if (data == "" || data.indexOf("404") > -1) {
                $('.picBody').remove()
                return false
            }
            var res = JSON.parse(data);
            console.log(res);
            if (res.code == 200) {
                res.CompanyImageList.map(function (item) {
                    if (item.type == 2) {
                        $('.picGroupImg').attr("src", item.path)
                        if (item.hyperLink == "") {
                            $(".picHref").remove()
                        } else {
                            $(".picHref").attr("href", item.hyperLink)
                        }
                    }
                })

            } else {
                $('.picGroupImg').attr("src", "../staticFile/query.png")
                $(".picHref").remove()
                if (ProfileInfo.onlineStyle == "APPLE") {
                    $('.picBody').remove()
                }
                // 应该不需要提示
                // alert(res.errMsg)
            }
        },
        error: function () {
            // alert('fail');
        }
    });
};
//日期
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    // var m = dd.getMonth()+1;//获取当前月份的日期
    // var d = dd.getDate();
    var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
    var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;
}
//酒店列表
function hotelList() {
    $('body').mLoading("show");
    $.ajax({
        type: 'post',
        url: $.session.get('ajaxUrl'),
        dataType: 'json',
        data: {
            url: $.session.get('obtCompany') + "/QueryService.svc/QueryHotelPost",
            jsonStr: '{"queryKey":"' + queryKey + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
        },
        success: function (data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            // 翻页相关
            SabreShopKey = res.SabreShopKey;
            LocalShopKey = res.LocalShopKey;

            pageIndex = 2
            // if(queryKeyList[0]=="HKG"){
            // 	// 11月14修改
            // 	// $(".HKremindPop").html('\
            // 	// <div style="border:1px solid #9b9b9b">\
            // 	//     <div class="HKremindPopTittle">\
            // 	//       VP approval required for stays in Hong Kong\
            // 	//       <div class="closePopIcon">x</div>\
            // 	//     </div>\
            // 	//     <div class="HKremindPopBody">\
            // 	//       <span style="line-height:25px;font-style: italic;">Due to increasing risks,only essential travel is permitted to Hong Kong.Please request approval from your VP if your trip is essential.</span><br>\
            // 	//       <p style="line-height:30px;font-weight:600;margin-top:22px">Hotels</p>\
            // 	//       <span style="line-height:25px;">Contact Apple Travel to book your Hong Kong hotel once you have received VP approval.</span><br><br>\
            // 	//     </div>\
            // 	//     </div>\
            // 	// ')

            // 	// 12.2
            // 	$(".HKremindPop").html('\
            // 	    <div class="HKremindPopTittle" style="border-bottom:1px solid #e6e6e6">\
            // 	      Staying in Hong Kong?\
            // 	      <div class="closePopIcon">x</div>\
            // 	    </div>\
            // 	    <div class="HKremindPopBody">\
            // 	      <span style="line-height:60px;font-weight:600;">Hotels</span><br>\
            // 	      <span style="line-height:25px;">For safety and security reasons,Global Security recommends that travelers stay only at the following hotels in Hong Kong:</span><br><br>\
            // 	      <li style="line-height:25px;margin-left:50px;list-style: disc;">Grand Hyatt Hong Kong</li>\
            // 	      <li style="line-height:25px;margin-left:50px;list-style: disc;">Shangri-La Kowloon</li>\
            // 	      <li style="line-height:25px;margin-left:50px;list-style: disc;">L\'Hotel Island South</li>\
            // 	      <li style="line-height:25px;margin-left:50px;list-style: disc;">Marriott Hong Kong Ocean Park Hotel</li>\
            // 	      <li style="line-height:25px;margin-left:50px;list-style: disc;">Ovolo Southside</span>\
            // 	      <li style="line-height:25px;margin-left:50px;list-style: disc;">Hongkong Skycity Marriott Hotel</li>\
            // 	      <span style="line-height:60px;font-weight:600;">Ground Transport</span><br>\
            // 	      <span style="line-height:25px;">Secure ground transportation is also available within Hong Kong.Contact <span style="color:blue">Apple Travel</span> directly to make these arrangements.</span><br>\
            // 	    </div>\
            // 	')
            // 	// 原版
            // 	// $(".HKremindPop").html('\
            // 	//     <div class="HKremindPopTittle">\
            // 	//       Staying in Hong Kong?\
            // 	//       <div class="closePopIcon">x</div>\
            // 	//     </div>\
            // 	//     <div class="HKremindPopBody">\
            // 	//       <span style="line-height:60px;font-weight:600;">Hotels</span><br>\
            // 	//       <span style="line-height:25px;">For safety and security reasons,Global Security recommends that travelers stay only at the following hotels in Hong Kong:</span><br><br>\
            // 	//       <span style="line-height:25px;margin-left:50px;">· Grand Hyatt Hong Kong</span><br>\
            // 	//       <li style="line-height:25px;margin-left:50px;">· Grand Hyatt Hong Kong</li><br>\
            // 	//       <span style="line-height:25px;margin-left:50px;">· Shangri-La Kowloon</span><br>\
            // 	//       <span style="line-height:25px;margin-left:50px;">· L\'Hotel Island South</span><br>\
            // 	//       <span style="line-height:25px;margin-left:50px;">· Marriott Hong Kong Ocean Park Hotel</span><br>\
            // 	//       <span style="line-height:25px;margin-left:50px;">· Ovolo Southside</span><br>\
            // 	//       <span style="line-height:25px;margin-left:50px;">· Hongkong Skycity Marriott Hotel</span><br>\
            // 	//       <span style="line-height:60px;font-weight:600;">Ground Transport</span><br>\
            // 	//       <span style="line-height:25px;">Secure ground transportation is also available within Hong Kong.Contact <span style="color:blue">Apple Travel</span> directly to make these arrangements.</span><br>\
            // 	//     </div>\
            // 	// ')

            //     openRemindPop();
            //     $(".closePopIcon").unbind("click").click(function(){
            //         closeRemindPop();
            //     })
            // }

            cacheHotelList = res.hotels

            hotelListInfo(res.hotels);
            functions.hotelListFn(res)
            // hotelFilter(res);
            //排序
            hotelSort(res.hotels);
        },
        error: function () {
            // alert('fail');
        }
    });
}
//酒店筛选
function hotelFilter(allData) {
    var breakfastData = [];
    var freeCancelData = [];
    var protocolData = [];
    var breakfastAndFreeCancel = [];
    allData.hotels.map(function (item) {
        if (item.Breakfast > 0) {
            breakfastData.push(item);
        }
        if (item.CancelRuleType > 0) {
            freeCancelData.push(item);
        }
        if (item.IsAgreement || item.IsTMCAgreement) {
            protocolData.push(item);
        }
    })
    breakfastData.map(function (item) {
        if (item.CancelRuleType > 0) {
            breakfastAndFreeCancel.push(item);
        }
    })
    $.ajax({
        type: 'post',
        url: $.session.get('ajaxUrl'),
        dataType: 'json',
        data: {
            url: $.session.get('obtCompany') + "/QueryService.svc/QueryHotelPost",
            jsonStr: '{"queryKey":"' + NotNeedGaranteeQueryKey + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
        },
        success: function (data) {
            var res = JSON.parse(data);
            console.log(res);
            tools.Loading.hide();
            var NotNeedGaranteeData = [];
            res.hotels.map(function (item) {
                if (item.NotNeedGarantee) {
                    NotNeedGaranteeData.push(item);
                }
            })
            var breakfastAndNotNeedGarantee = [];
            NotNeedGaranteeData.map(function (item) {
                if (item.Breakfast > 0) {
                    breakfastAndNotNeedGarantee.push(item);
                }
            })
            // console.log(breakfastAndNotNeedGarantee);
            functions.hotelFilterFn(NotNeedGaranteeData, allData, breakfastAndNotNeedGarantee, breakfastData, breakfastAndFreeCancel, NotNeedGaranteeData)
        },
        error: function () {
            // alert('fail');
        }
    });
}
function hotelSort(res) {
    if (res[0]) {
        if (res[0].HotelDistance == null || res[0].HotelDistance == '') {
            $(".distanceSort").hide();
        } else {
            $("#hotelAddress").val(queryKeyList[3]);
        }
    }
    //排序数组
    var priceSortAscList = [];
    var priceSortDesList = [];
    var starSortAscList = [];
    var starSortDesList = [];
    var scoreSortAscList = [];
    var scoreSortDesList = [];
    res.map(function (item) {
        priceSortAscList.push(item);
        priceSortDesList.push(item);
        starSortAscList.push(item);
        starSortDesList.push(item);
        scoreSortAscList.push(item);
        scoreSortDesList.push(item);
    })
    //排序
    //价格升序
    var priceSortAsc = function (arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (parseInt(arr[i].Price) > parseInt(arr[j].Price)) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
    //价格降序
    var priceSortDes = function (arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (parseInt(arr[i].Price) < parseInt(arr[j].Price)) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
    //星级升序
    var starSortAsc = function (arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (parseInt(arr[i].StarLevel) > parseInt(arr[j].StarLevel)) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
    //星级降序
    var starSortDes = function (arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (parseInt(arr[i].StarLevel) < parseInt(arr[j].StarLevel)) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
    //评分降序
    var scoreSortAsc = function (arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (parseFloat(arr[i].HotelRating) > parseFloat(arr[j].HotelRating)) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
    //评分降序
    var scoreSortDes = function (arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (parseFloat(arr[i].HotelRating) < parseFloat(arr[j].HotelRating)) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
    // $(".recommendList").unbind("click").click(function(){
    //     $(this).css("color","#F58A00");
    //     $(".priceSort,.starSort,.scoreSort").css("color","#000");
    //     $(".sortTabIcon").css("background-position","0px 0px");
    //     hotelListInfo(res);
    //     clickHotelLi();
    // })
    $(".priceSort").unbind("click").click(function () {
        // $(".recommendList").css("color","#000");
        $(".sortTab ").css("color", '#000');
        $(".sortTabIcon").css("background-position", "0px 0px");
        $(this).css("color", '#1e66ae');
        if (!$(this).attr("sortType") || $(this).attr("sortType") == "acs") {
            hotelListInfo(priceSortAsc(priceSortAscList));
            $(this).attr("sortType", "desc");
            $(".priceSortIcon").css("background-position", "-18px 0px");
        }
        else if ($(this).attr("sortType") == "desc") {
            hotelListInfo(priceSortDes(priceSortDesList));
            $(this).attr("sortType", "acs");
            $(".priceSortIcon").css("background-position", "-36px 0px");
        }
    })
    $(".starSort").unbind("click").click(function () {
        // $(".recommendList").css("color","#000");
        $(".sortTab ").css("color", '#000');
        $(".sortTabIcon").css("background-position", "0px 0px");
        $(this).css("color", '#1e66ae');
        if (!$(this).attr("sortType") || $(this).attr("sortType") == "acs") {
            hotelListInfo(starSortAsc(starSortAscList));
            $(this).attr("sortType", "desc");
            $(".starSortIcon").css("background-position", "-18px 0px");
        }
        else if ($(this).attr("sortType") == "desc") {
            hotelListInfo(starSortDes(starSortDesList));
            $(this).attr("sortType", "acs");
            $(".starSortIcon").css("background-position", "-36px 0px");
        }
    })
    $(".scoreSort").unbind("click").click(function () {
        // $(".recommendList").css("color","#000");
        $(".sortTab ").css("color", '#000');
        $(".sortTabIcon").css("background-position", "0px 0px");
        $(this).css("color", '#1e66ae');
        if (!$(this).attr("sortType") || $(this).attr("sortType") == "acs") {
            hotelListInfo(scoreSortAsc(scoreSortAscList));
            $(this).attr("sortType", "desc");
            $(".scoreSortIcon").css("background-position", "-18px 0px");
        }
        else if ($(this).attr("sortType") == "desc") {
            hotelListInfo(scoreSortDes(scoreSortDesList));
            $(this).attr("sortType", "acs");
            $(".scoreSortIcon").css("background-position", "-36px 0px");
        }
    })
    $(".distanceSort").unbind("click").click(function () {
        // $(".recommendList").css("color","#000");
        $(".sortTab ").css("color", '#000');
        $(".sortTabIcon").css("background-position", "0px 0px");
        $(this).css("color", '#1e66ae');
        if (!$(this).attr("sortType") || $(this).attr("sortType") == "acs") {
            hotelListInfo(res.reverse());
            $(this).attr("sortType", "desc");
            $(".distanceSortIcon").css("background-position", "-36px 0px");
        }
        else if ($(this).attr("sortType") == "desc") {
            hotelListInfo(res.reverse());
            $(this).attr("sortType", "acs");
            $(".distanceSortIcon").css("background-position", "-18px 0px");
        }
    })
}
function bd_encrypt(gg_lat, gg_lon) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = gg_lon, y = gg_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    return [(z * Math.sin(theta) + 0.006), (z * Math.cos(theta) + 0.0065)];
}
function hotelListInfo(res) {
    var container = 'hotelListMap'
    if (ProfileInfo.onlineStyle === 'BCD' && obtLanguage !== 'CN') {
        $('#' + container).html('');  // 删除地图
    }
    if (res.length > 0) {
        if (ProfileInfo.onlineStyle === 'BCD' && obtLanguage !== 'CN') {
            var mapbox = new Mapbox();
            try {
                var options = {
                    centerLng: parseFloat(res[0].Longitude),
                    centerLat: parseFloat(res[0].Laitude),
                    defaultMarker: false,
                    hideSearchBar: true,
                    container: container,
                    addPoint: res,
                }
                mapbox.initMapBox(options);
                $('.marker').click(function () {
                    setTimeout(function () {
                        clickHotelLi()
                    }, 100)
                })
            } catch (err) {

            }
        } else {
            if (new BMap.Map()) {
                var map = new BMap.Map("hotelListMap");    // 创建Map实例
                var data_info = [];
                res.map(function (item) {
                    if (item.Longitude != "" && item.Longitude != null) {
                        data_info.push([item.Longitude, item.Laitude, item.HotelName, item.HotelAddress, item.HotelPhone, item.imageUrl, item.ID, item.CityCode, item.HotelType, item.LocationType])
                    }
                })
                // console.log(data_info);
                if (data_info.length != 0) {
                    // 百度地图API功能
                    var poi = new BMap.Point(data_info[0][0], data_info[0][1]);
                    map.centerAndZoom(poi, 11);
                    map.enableScrollWheelZoom();
                    var pointList = [];
                    for (var i = 0; i < data_info.length; i++) {
                        if (data_info[i][9] == 2) {
                            pointList.push(bd_encrypt(data_info[i][0], data_info[i][1]));
                        } else {
                            pointList.push([data_info[i][0], data_info[i][1]]);
                        }
                    }
                    // console.log(data_info);
                    // console.log(pointList);
                    for (var i = 0; i < data_info.length; i++) {
                        var marker = new BMap.Marker(new BMap.Point(pointList[i][0], pointList[i][1]));  // 创建标注
                        var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                            '<img src="' + data_info[i][5] + '" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                            '地址：' + data_info[i][3] + '<br/>电话：' + data_info[i][4] + '<br/>' +
                            '</div>\
                              </script>\
                              ';
                        addClickHandler(data_info[i][2], content, marker, data_info[i][6], data_info[i][7], data_info[i][8], data_info[i][9]);
                        map.addOverlay(marker);               // 将标注添加到地图中
                    }
                    // for(var i=0;i<data_info.length;i++){
                    //     var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
                    //     var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    //             '<img src="'+data_info[i][5]+'" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    //             '地址：'+data_info[i][3]+'<br/>电话：'+data_info[i][4]+'<br/>' +
                    //           '</div>\
                    //           </script>\
                    //           ';
                    //     addClickHandler(data_info[i][2],content,marker,data_info[i][6],data_info[i][7],data_info[i][8]);
                    //     map.addOverlay(marker);               // 将标注添加到地图中
                    // }
                }
            }

            // var pointList = [];
            // var datainfoLength = data_info.length>10?10:data_info.length;
            // for(var i=0;i<datainfoLength;i++){
            //     pointList.push(new BMap.Point(data_info[i][0],data_info[i][1]));
            // }
            // console.log(pointList);
            // setTimeout(function(){
            //     var convertor = new BMap.Convertor();
            //     convertor.translate(pointList, 3, 5, translateCallback);

            // }, 50);
            //坐标转换完之后的回调函数
            // translateCallback = function (data){
            //     console.log(data)
            //   if(data.status === 0) {
            //     for(var i=0;i<data.points.length;i++){
            //             var marker = new BMap.Marker(data.points[i]);  // 创建标注
            //             var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
            //                     '<img src="'+data_info[i][5]+'" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
            //                     '地址：'+data_info[i][3]+'<br/>电话：'+data_info[i][4]+'<br/>' +
            //                   '</div>';
            //             addClickHandler(data_info[i][2],content,marker);
            //             map.addOverlay(marker);               // 将标注添加到地图中
            //         }
            //     map.setCenter(data.points[0]);
            //   }
            // }
            function addClickHandler(hotelName, content, marker, hotelId, cityCode, hotelType, LocationType) {
                // console.log(content);
                //创建检索信息窗口对象
                var searchInfoWindow = null;
                searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                    title: '<a href="../../hotel/hotelDetail.html">' + hotelName + '</a>',      //标题
                    width: 290,             //宽度
                    height: 105,              //高度
                    panel: "panel",         //检索结果面板
                    enableAutoPan: true,     //自动平移
                    searchTypes: [
                        BMAPLIB_TAB_SEARCH,   //周边检索
                        BMAPLIB_TAB_TO_HERE,  //到这里去
                        BMAPLIB_TAB_FROM_HERE //从这里出发
                    ]
                });
                marker.addEventListener("click", function (e) {
                    searchInfoWindow.open(marker);
                });
                searchInfoWindow.addEventListener("open", function (e) {
                    var detailQueryKey = queryKeyList[4] + ',' + queryKeyList[5] + ',' + hotelId + ',' + cityCode + ',' + hotelType;
                    var hotelDetailInfo = {
                        'queryKey': detailQueryKey,
                        'LocationType': LocationType,
                    }
                    $.cookie('hotelDetailInfo', JSON.stringify(hotelDetailInfo));
                });
            }
        }
    }

    /*酒店列表*/
    $(".hotelList").html("");
    $(".hotelsNumberText").text(res.length);
    if (res.length == 1 && obtLanguage == "EN") {
        $(".hotelsNumber").html('\
            1 hotel\
        ')
    }
    res.map(function (item, index) {
        var showHandImg = item.IsAgreement || item.IsTMCAgreement ? "" : "hide";
        var grade = parseFloat(item.HotelRating) >= 4.5 ? get_lan('hotelList').nice : "";
        if (parseFloat(item.HotelRating) >= 4.9) {
            var grade = get_lan('hotelList').fantastic
        } else if (parseFloat(item.HotelRating) >= 4.6 && parseFloat(item.HotelRating) < 4.9) {
            var grade = get_lan('hotelList').wonderful
        } else if (parseFloat(item.HotelRating) >= 4.4 && parseFloat(item.HotelRating) < 4.6) {
            var grade = get_lan('hotelList').great
        } else if (parseFloat(item.HotelRating) >= 4.2 && parseFloat(item.HotelRating) < 4.4) {
            var grade = get_lan('hotelList').good
        } else {
            var grade = '';
        }

        var showDistance = item.HotelDistance != null ? "" : "hide";
        var showHotelLiScore = item.HotelRating == 0 ? "hide" : "hide";
        var onlineStyle = JSON.parse($.session.get('ProfileInfo')).onlineStyle;
        var noimgUrl = onlineStyle == "BCD" ? "../../hotel/images/BCDnoPicture.png" : "../../hotel/images/noPicture.png";
        var imageUrl = item.imageUrl == null || item.imageUrl == "" ? noimgUrl : item.imageUrl;
        /*班车*/
        var showBus = item.HasShuttleBus ? "" : "hide";
        var showGreen = item.IsGreenHotel ? "" : "hide";
        var showFapiao = item.IsCentralFapiao ? "" : "hide";
        /*end*/
        /*经纬度*/
        var Longitude = item.LocationType == 2 ? bd_encrypt(item.Longitude, item.Laitude)[0] : item.Longitude;
        var Laitude = item.LocationType == 2 ? bd_encrypt(item.Longitude, item.Laitude)[1] : item.Laitude;
        if (ProfileInfo.onlineStyle === 'APPLE') {
            var applePreferred = '<span style="color:#000;font-size:13px;margin-left:20px;" class="' + showHandImg + ' flexRow">Apple Preferred\
            <div class="greenBox">\
                <img class="greenIcon '+ showGreen + '" index="' + index + '" src="./images/green.png" style="width:16px;height:16px;margin:0px 5px 0 5px;">\
                <div class="greenRemind hide">\
                    <div class="greenRemindText">Identified by Apple for performing well on environmental metrics, such as carbon emissions, waste treatment, and third-party certifications.</div>\
                </div>\
            </div>\
            <div class="shuttleBox">\
                <img class="shuttleIcon '+ showBus + '" index="' + index + '" src="./images/shuttlebus.png" style="width:16px;height:16px;margin:0px 5px 0 5px;">\
                <div class="shuttleRemind hide">\
                    <div class="shuttleRemindText">'+ get_lan("shuttleRemind") + '</div>\
                </div>\
            </div>\
            <div class="faPiaoIcon '+ showFapiao + '" index="' + index + '" style="width:50px;height:16px;margin:0px 5px 0 5px;color:#3083FB;font-size:12px;">FAPIAO\
                <div class="faPiaoRemind hide">\
                    <div class="faPiaoRemindText">CENTRAL FAPIAO – this hotel sends the fapiao to Apple. You should not collect the fapiao when checking out.</div>\
                </div>\
            </div></span></span>'
        } else {
            var applePreferred = ''
        }
        $(".hotelList").append('\
            <div class="hotelLi">\
              <div class="hotelLiName" title="'+ item.HotelName + '" hotelId="' + item.ID + '" hotelType="' + item.HotelType + '" cityCode="' + item.CityCode + '" LocationType="' + item.LocationType + '">' + item.HotelName + '</div>\
              '
            + applePreferred +
            '<div class="hotelLiLine"></div>\
              <div class="hotelLiImg" style="background-image:url('+ imageUrl + ');"></div>\
              <div class="hotelLiScore '+ showHotelLiScore + '">' + item.HotelRating + '</div>\
              <div class="hotelLiGrade hide">'+ grade + '</div>\
              <div class="hotelLiInfo">\
                <div class="hotelLiDistance '+ showDistance + '">' + get_lan('hotelList').distance1 + item.HotelDistance + get_lan('hotelList').distance2 + '</div>\
              </div>\
              <div class="hotelTelPhone flexRow"><div class="phoneIcon"></div>'+ item.HotelPhone + '</div>\
              <div class="hotelLiAddress flexRow"><div class="mapIcon" LocationType="'+ item.LocationType + '" hotelId="' + item.ID + '" cityCode="' + item.CityCode + '" hotelType="' + item.HotelType + '" imgSrc="' + item.imageUrl + '" name="' + item.HotelName + '" address="' + item.HotelAddress + '" telePhone="' + item.HotelPhone + '" Longitude="' + Longitude + '" Laitude="' + Laitude + '"></div><div class="hotelAddressText" title="' + item.HotelAddress + '">' + item.HotelAddress + '</div></div>\
              <div class="hotelLiPrice"><span style="font-size:26px;">'+ item.Price + '<span style="font-size:12px;margin-right:5px;margin-left:5px;">' + item.Currency + '</span></span>' + get_lan('hotelList').lowest + '</div>\
              <span class="hotelLiAverageSpan">'+ get_lan('averagePerNight') + '</span>\
              <div class="searchHotelDetailBtn" hotelId="'+ item.ID + '" hotelType="' + item.HotelType + '" cityCode="' + item.CityCode + '" LocationType="' + item.LocationType + '">' + get_lan('hotelList').search + '</div>\
              \
            </div>\
            ')
        // <div class="protocolBody '+showHandImg+'">\
        //   <div class="protocolText">'+get_lan('hotelList').protocol+'</div>\
        //   <div class="triangleTopRight"></div>\
        // </div>\
        //<div class="hotelLiComment">'+item.ReviewInfo.Count+get_lan('hotelList').comment+'</div>
    })
    /*班车*/
    $(".shuttleIcon").mouseenter(function (e) {
        var index = $(this).attr("index");
        $(".shuttleRemind").eq(index).removeClass("hide");
    })
    $('.shuttleIcon').mouseleave(function () {
        $(".shuttleRemind").addClass("hide");
    })
    /*绿色酒店*/
    $(".greenIcon").hover(function (e) {
        var index = $(this).attr("index");
        $(".greenRemind").eq(index).removeClass("hide");
        e.stopPropagation();//阻止冒泡
    }, function () {
        $(".greenRemind").addClass("hide");
    })
    /*发票*/
    $(".faPiaoIcon").hover(function (e) {
        var index = $(this).attr("index");
        $(".faPiaoRemind").eq(index).removeClass("hide");
        e.stopPropagation();//阻止冒泡
    }, function () {
        $(".faPiaoRemind").addClass("hide");
    })
    /*end*/
    // 绑定翻页
    $('.hotelList').append('<div class="listEnd"><span class="loadingSpan"></span><span class="textSpan">正在加载...</span></div>')
    if ((SabreShopKey == '' || SabreShopKey == null) && (LocalShopKey == '' || LocalShopKey == null)) {
        if (obtLanguage == "EN") {
            $('.loadingSpan').hide()
            $('.listEnd .textSpan').text("No more hotels")
        } else {
            $('.loadingSpan').hide()
            $('.listEnd .textSpan').text("没有更多酒店了")
        }
    } else {
        if (obtLanguage == "EN") {
            $('.loadingSpan').show()
            $('.listEnd .textSpan').text("Loading...")
        } else {
            $('.loadingSpan').show()
            $('.listEnd .textSpan').text("正在加载...")
        }
    }
    $(".hotelList").scroll(function () {
        if (checkScrollSlide() && ((SabreShopKey != '' && SabreShopKey != null) || (LocalShopKey != '' && LocalShopKey != null))) {
            if (!getNextPage) {
                getNextPage = true
                nextHotelList()
            }
        }
    })
    $(".mapIcon").unbind("click").click(function () {
        // var map = new BMap.Map("hotelListMap");    // 创建Map实例
        if ($(this).attr("laitude") != "" && $(this).attr("laitude") != null) {
            var Longitude = parseFloat($(this).attr("Longitude"));
            var Laitude = parseFloat($(this).attr("Laitude"));
            var hotelName = $(this).attr("name");
            var hotelAddress = $(this).attr("address");
            var hotelPhone = $(this).attr("telePhone");
            var imgSrc = $(this).attr("imgSrc");
            var allOverlay = map.getOverlays();
            for (var i = 0; i < allOverlay.length - 1; i++) {
                if (allOverlay[i].point.lat == Laitude && allOverlay[i].point.lng == Longitude) {
                    var detailQueryKey = queryKeyList[4] + ',' + queryKeyList[5] + ',' + $(this).attr("hotelId") + ',' + $(this).attr("cityCode") + ',' + $(this).attr("hotelType");
                    var hotelDetailInfo = {
                        'queryKey': detailQueryKey,
                        'LocationType': $(this).attr("LocationType"),
                    }
                    $.cookie('hotelDetailInfo', JSON.stringify(hotelDetailInfo));
                    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                        '<img src="' + imgSrc + '" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                        '地址：' + hotelAddress + '<br/>电话：' + hotelPhone + '<br/>' +
                        '</div>';
                    //创建检索信息窗口对象
                    var searchInfoWindow1 = null;
                    searchInfoWindow1 = new BMapLib.SearchInfoWindow(map, content, {
                        title: '<a href="../../hotel/hotelDetail.html">' + hotelName + '</a>',      //标题
                        width: 290,             //宽度
                        height: 105,              //高度
                        panel: "panel",         //检索结果面板
                        enableAutoPan: true,     //自动平移
                        searchTypes: [
                            BMAPLIB_TAB_SEARCH,   //周边检索
                            BMAPLIB_TAB_TO_HERE,  //到这里去
                            BMAPLIB_TAB_FROM_HERE //从这里出发
                        ]
                    });
                    searchInfoWindow1.open(new BMap.Point(Longitude, Laitude));
                    return false;
                }
            }
        }

        // 百度地图API功能
        // $(".mapBody").removeClass("hide");
        // var map = new BMap.Map("map");    // 创建Map实例
        // $("#cover").css("display","block");
        // var Longitude=parseFloat($(this).attr("Longitude"));
        // var Laitude=parseFloat($(this).attr("Laitude"));
        // var hotelName = $(this).attr("name");
        // var hotelAddress = $(this).attr("address");
        // var hotelPhone = $(this).attr("telePhone");
        // var imgSrc = $(this).attr("imgSrc");
        // $(".mapTittleText,#cover").unbind("click").click(function(){
        //     $(".mapBody").addClass("hide");
        //     $("#cover").css("display","none");
        // })
        // // 百度地图API功能
        // var poi = new BMap.Point(Longitude,Laitude);
        // map.centerAndZoom(poi, 16);
        // map.enableScrollWheelZoom();
        // setTimeout(function(){
        //     var convertor = new BMap.Convertor();
        //     var pointArr = [];
        //     pointArr.push(poi);
        //     convertor.translate(pointArr, 3, 5, translateCallback)
        // }, 50);
        // //坐标转换完之后的回调函数
        // translateCallback = function (data){
        //   if(data.status === 0) {
        //     var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
        //                     '<img src="'+imgSrc+'" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
        //                     '地址：'+hotelAddress+'<br/>电话：'+hotelPhone+'<br/>' +
        //                   '</div>';

        //     //创建检索信息窗口对象
        //     var searchInfoWindow = null;
        //     searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
        //             title  : hotelName,      //标题
        //             width  : 290,             //宽度
        //             height : 105,              //高度
        //             panel  : "panel",         //检索结果面板
        //             enableAutoPan : true,     //自动平移
        //             searchTypes   :[
        //                 BMAPLIB_TAB_SEARCH,   //周边检索
        //                 BMAPLIB_TAB_TO_HERE,  //到这里去
        //                 BMAPLIB_TAB_FROM_HERE //从这里出发
        //             ]
        //         });
        //     var marker = new BMap.Marker(data.points[0]); //创建marker对象
        //     marker.addEventListener("click", function(e){
        //             searchInfoWindow.open(marker);
        //     })
        //     map.addOverlay(marker); //在地图中添加marke
        //     map.setCenter(data.points[0]);
        //   }
        // }
    })
    clickHotelLi();
}
function clickHotelLi() {
    $(".searchHotelDetailBtn,.hotelLiName,.mapboxViewDetailBtn").unbind("click").click(function () {
        var detailQueryKey = queryKeyList[4] + ',' + queryKeyList[5] + ',' + $(this).attr("hotelId") + ',' + $(this).attr("citycode") + ',' + $(this).attr("hotelType");
        var hotelDetailInfo = {
            'queryKey': detailQueryKey,
            'LocationType': $(this).attr("LocationType"),
        }
        $.cookie('hotelDetailInfo', JSON.stringify(hotelDetailInfo));
        window.location.href = '../../hotel/hotelDetail.html';
    })
}
//打开弹窗
function openRemindPop() {
    $("#cover").show();
    $(".HKremindPop").css("display", "block");
}
function closeRemindPop() {
    $("#cover").hide();
    $(".HKremindPop").css("display", "none");
}


// 翻页相关
// 2020.1.13新增 瀑布流
$(".hotelList").scroll(function () {
    // console.log(1)
    // console.log(checkScrollSlide())
    if (checkScrollSlide() && SabreShopKey != '' && SabreShopKey != null) {
        if (!getNextPage) {
            getNextPage = true
            nextHotelList()
        }
    }
})
function checkScrollSlide() {
    // list的offsetTop
    var ListTop = $('.hotelList').offset().top
    // 获取最后一个模块的位置
    var index = $('.hotelLi').length;
    console.log($('.hotelLi')[index - 1].offsetTop)
    // 加不加上最后一个元素的高度 offsetHeight
    var lastBoxH = $('.hotelLi')[index - 1].offsetTop - ListTop
    console.log(lastBoxH)
    // var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var scrollTop = $('.hotelList').scrollTop()
    // 滚动条高度
    var clientHeight = $('.hotelList').height()
    var totalH = scrollTop + clientHeight;
    return (lastBoxH <= totalH) ? true : false;
}
function nextHotelList() {
    var jsonDate = {
        request: {
            QueryKey: queryKey,
            Uid: uidWithoutQuote,
            ShopKey: SabreShopKey,
            Index: pageIndex,
            LocalKey: LocalShopKey || "",
            Language: obtLanguage,
        }
    }
    $.ajax({
        type: 'post',
        url: $.session.get('ajaxUrl'),
        dataType: 'json',
        data: {
            url: $.session.get('obtCompany') + "/QueryService.svc/GetNextPageHotelNew",
            jsonStr: JSON.stringify(jsonDate)
        },
        // Hotels GetNextPageHotelPost(string queryKey, string id, string shopKey, string index, string Language);
        success: function (data) {
            $('.listEnd').remove()
            getNextPage = false;
            var res = JSON.parse(data);
            SabreShopKey = res.SabreShopKey;
            LocalShopKey = res.LocalShopKey;
            console.log(res)
            addHotel(res.hotels)

            if (ProfileInfo.onlineStyle === 'BCD') {
                res.hotels.map(function (item) {
                    cacheHotelList.push(item);
                })

                var breakfast = $('.breakfastBtn').attr('state')
                var freeCancel = $('.freeCancelBtn').attr('state')
                var noGuarantee = $('.noGuaranteeBtn').attr('state')
                var protocol = $('.protocolBtn').attr('state')
                // 含早
                if (breakfast == 'click') {
                    res.hotels = res.hotels.filter(function (item) {
                        if (item.Breakfast > 0) {
                            return item;
                        }
                    })
                }
                //免费取消
                if (freeCancel == 'click') {
                    res.hotels = res.hotels.filter(function (item) {
                        if (item.CancelRuleType > 0) {
                            return item;
                        }
                    })
                }
                // 免担保
                if (noGuarantee == 'click') {
                    res.hotels = res.hotels.filter(function (item) {
                        if (item.NotNeedGarantee) {
                            return item;
                        }
                    })
                }
                //协议酒店
                if (protocol == 'click') {
                    res.hotels = res.hotels.filter(function (item) {
                        if (item.IsAgreement || item.IsTMCAgreement) {
                            return item;
                        }
                    })
                }
                // hotelListInfo(res.hotels);
                // hotelFilter(res);
                //排序
                // hotelSort(res.hotels);
                if (res.hotels.length == 0) {
                    $('.loadingSpan').hide()
                    $('.listEnd .textSpan').text(get_lan('noMore'))
                    return false;
                }
                if (breakfast == 'click' || freeCancel == 'click' || noGuarantee == 'click' || protocol == 'click') {
                    var newlist = []
                    res.hotels.map(function (item) {
                        newlist.push(item);
                    })
                    hotelListInfo(newlist);
                    hotelSort(cacheHotelList);
                } else {
                    hotelListInfo(cacheHotelList);
                    hotelSort(cacheHotelList);
                }
            }

        },
        error: function () {
            getNextPage = false;
            // alert('fail');
        }
    });
}

function addHotel(res) {

    var oldNum = $(".hotelsNumberText").text()
    $(".hotelsNumberText").text(parseInt(oldNum) + parseInt(res.length))
    res.map(function (item, index) {
        var showHandImg = item.IsAgreement || item.IsTMCAgreement ? "" : "hide";
        var grade = parseFloat(item.HotelRating) >= 4.5 ? get_lan('hotelList').nice : "";
        if (parseFloat(item.HotelRating) >= 4.9) {
            var grade = get_lan('hotelList').fantastic
        } else if (parseFloat(item.HotelRating) >= 4.6 && parseFloat(item.HotelRating) < 4.9) {
            var grade = get_lan('hotelList').wonderful
        } else if (parseFloat(item.HotelRating) >= 4.4 && parseFloat(item.HotelRating) < 4.6) {
            var grade = get_lan('hotelList').great
        } else if (parseFloat(item.HotelRating) >= 4.2 && parseFloat(item.HotelRating) < 4.4) {
            var grade = get_lan('hotelList').good
        } else {
            var grade = '';
        }

        var showDistance = item.HotelDistance != null ? "" : "hide";
        var showHotelLiScore = item.HotelRating == 0 ? "hide" : "hide";
        var onlineStyle = JSON.parse($.session.get('ProfileInfo')).onlineStyle;
        var noimgUrl = onlineStyle == "BCD" ? "../../hotel/images/BCDnoPicture.png" : "../../hotel/images/noPicture.png";
        var imageUrl = item.imageUrl == null || item.imageUrl == "" ? noimgUrl : item.imageUrl;

        /*经纬度*/
        var Longitude = item.LocationType == 2 ? bd_encrypt(item.Longitude, item.Laitude)[0] : item.Longitude;
        var Laitude = item.LocationType == 2 ? bd_encrypt(item.Longitude, item.Laitude)[1] : item.Laitude;
        if (ProfileInfo.onlineStyle === 'APPLE') {
            var applePreferred = '<span style="color:#000;font-size:13px;margin-left:20px;" class="' + showHandImg + '">Apple Preferred</span>'
        } else {
            var applePreferred = ''
        }
        $(".hotelList").append('\
		        <div class="hotelLi">\
		          <div class="hotelLiName" title="'+ item.HotelName + '" hotelId="' + item.ID + '" hotelType="' + item.HotelType + '" cityCode="' + item.CityCode + '" LocationType="' + item.LocationType + '">' + item.HotelName + '</div>'
            + applePreferred +
            '<div class="hotelLiLine"></div>\
		          <div class="hotelLiImg" style="background-image:url('+ imageUrl + ');"></div>\
		          <div class="hotelLiScore '+ showHotelLiScore + '">' + item.HotelRating + '</div>\
		          <div class="hotelLiGrade hide">'+ grade + '</div>\
		          <div class="hotelLiInfo">\
		            <div class="hotelLiDistance '+ showDistance + '">' + get_lan('hotelList').distance1 + item.HotelDistance + get_lan('hotelList').distance2 + '</div>\
		          </div>\
		          <div class="hotelTelPhone flexRow"><div class="phoneIcon"></div>'+ item.HotelPhone + '</div>\
		          <div class="hotelLiAddress flexRow"><div class="mapIcon" LocationType="'+ item.LocationType + '" hotelId="' + item.ID + '" cityCode="' + item.CityCode + '" hotelType="' + item.HotelType + '" imgSrc="' + item.imageUrl + '" name="' + item.HotelName + '" address="' + item.HotelAddress + '" telePhone="' + item.HotelPhone + '" Longitude="' + Longitude + '" Laitude="' + Laitude + '"></div><div class="hotelAddressText" title="' + item.HotelAddress + '">' + item.HotelAddress + '</div></div>\
                  <div class="hotelLiPrice"><span style="font-size:26px;">'+ item.Price + '<span style="font-size:12px;margin-right:5px;margin-left:5px;">' + item.Currency + '</span></span>' + get_lan('hotelList').lowest + '</div>\
		          <div class="searchHotelDetailBtn" hotelId="'+ item.ID + '" hotelType="' + item.HotelType + '" cityCode="' + item.CityCode + '" LocationType="' + item.LocationType + '">' + get_lan('hotelList').search + '</div>\
		          \
		        </div>\
		        ')
    })
    clickHotelLi();//绑定进入详情页方法
    $('.hotelList').append('<div class="listEnd"><span class="loadingSpan"></span><span class="textSpan">正在加载...</span></div>')
    if ((SabreShopKey == '' || SabreShopKey == null) && (LocalShopKey == '' || LocalShopKey == null)) {
        if (obtLanguage == "EN") {
            $('.loadingSpan').hide()
            $('.listEnd .textSpan').text("No more hotels")
        } else {
            $('.loadingSpan').hide()
            $('.listEnd .textSpan').text("没有更多酒店了")
        }
    } else {
        if (obtLanguage == "EN") {
            $('.loadingSpan').show()
            $('.listEnd .textSpan').text("Loading...")
        } else {
            $('.loadingSpan').show()
            $('.listEnd .textSpan').text("正在加载...")
        }
        pageIndex++
    }
}