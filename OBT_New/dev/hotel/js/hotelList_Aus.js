var netUserId = $.session.get('netLoginId');
var id = netUserId.split('"')[1]
var obtLanguage = $.session.get('obtLanguage');
var isReturn = tools.queryString().isReturn;
var searchHotelInfo = JSON.parse($.session.get('searchHotelInfo'));
console.log(searchHotelInfo);
var TAorderNo = $.session.get('TAorderNo');
var queryKey = searchHotelInfo.queryKey;
var defaultQueryKey = queryKey;
var queryKeyList = queryKey.split(",");
var hotelAddress_longitude = queryKeyList[13];
var hotelAddress_latitude = queryKeyList[14];
queryKeyList[12] = "2500";
var NotNeedGaranteeQueryKey = queryKeyList.join(",") + ',1';
var detailWindow = ''
var closeClock = ''
var HotelSearchLevel = []

// 有TA单时，时间进行限制
var TAnumber = $.session.get('TAnumber');
var TAminDate = 0, TAmaxDate = 365
if (TAnumber != undefined && TAnumber != "" && $.session.get('goOnBooktravelInfo') != undefined && $.session.get('goOnBooktravelInfo') != "") {
    var goOnBooktravelInfo = JSON.parse($.session.get('goOnBooktravelInfo'));
    TAminDate = goOnBooktravelInfo.starTime.split(" ")[0]
    TAmaxDate = goOnBooktravelInfo.endTime.split(" ")[0]
    var minTime = new Date().getTime()
    var minTime2
    if (TAminDate == 0) {
        minTime2 = new Date().getTime()
    } else {
        minTime2 = new Date(TAminDate.replace(/-/g, "/")).getTime()
    }
    TAminDate = minTime < minTime2 ? TAminDate : new Date()
}

// 缓存酒店列表
var cacheHotelList = []
//页数,默认是2
var pageIndex = 2;
// 是否有下一页,GUID
var SabreShopKey = '';
var LocalShopKey = '';
// 是否正在加载下一页
var getNextPage = false;
// 缓存列表信息
var resAll = ''
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
		'locationPlaceholder': '选择或填写位置',
        'hotelKeyInput': '(选填)酒店名/地标/商圈/地铁线',
        "star": "星级",
        "allStar": "不限",
        "star12": "二星级及以下/经济",
        "star3": "三星级/舒适",
        "star4": "四星级/高档",
        "star5": "五星级/奢华",
        "price": "价格",
        "other": "其他",
        "filter": "筛选",
        "reset": "重置",
        "search": "查询",
        "otherOption": "其他选项",
        "submit": "确定"
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
        // "protocol2":"客户优选",
        "protocol2": "公司优选",
        "allMapBtn": "查看地图",
        "noTax": "不含税",
    },
    "hotelBudgetReminder": {
        "remind": "差旅政策：您做选择的城市酒店预算为",
    },
    "siftBody": {
        "sort": "排序：",
        "recommend": "推荐",
        "scoreAsc": "评分由低-高",
        "scoreDesc": "评分由高-低",
        "starAsc": "星级1星-5星",
        "starDesc": "星级5星-1星",
        "distanceAsc": "距离由近-远",
        "distanceDesc": "距离由远-近",
        "priceAsc": "价格由低-高",
        "priceDesc": "价格由高-低",
        "filter": "筛选：",
        "breakfast": "含早餐",
        "freeCancel": "限时取消",
        "noGuarantee": "免担保",
        "protocol": "协议酒店",
        "companyBill": "公司支付"
    },
    "hotelsNumber": {
        "hotelsNumber1": "根据您的需求，共有",
        "hotelsNumber2": "家酒店供您选择：",
    },
    'searchRemind': '请正确填写！',
    'points': " 分",
    "noMore": "当前搜索结果已加载完毕",
    "loading": "正在加载...",
    'noRoom': '不可销售',
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
		'locationPlaceholder': 'Select or input location',
        'hotelKeyInput': 'Hotel Name/Landmark/Business Circle/Metro Line',
        "star": "Star",
        "allStar": "ALL",
        "star12": "1-star&2-star/economy",
        "star3": "3-star/comfortable",
        "star4": "4-star/upscale",
        "star5": "5-star/deluxe",
        "price": "Price",
        "other": "Other",
        "filter": "Filter",
        "reset": "Reset to Original Search",
        "search": "Search",
        "otherOption": "Other option",
        "submit": "Submit"
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
        "lowest": "From",
        "search": "View Details",
        "protocol": "Corporate",
        "protocol2": "Most preferred",
        "allMapBtn": "Show on map",
        "noTax": "Tax Exclusive",
    },
    "hotelBudgetReminder": {
        "remind": "The city cap is approx ",
    },
    "siftBody": {
        "sort": "Sort:",
        "recommend": "Recommend",
        "score": "Score",
        "star": "Star",
        "distance": "Distance",
        "priceAsc": "Price from low to high",
        "priceDesc": "Price from high to low",
        "scoreAsc": "Score low to high",
        "scoreDesc": "Score high to low",
        "starAsc": "Star 1 to 5",
        "starDesc": "Star 5 to 1",
        "distanceAsc": "Distance nearly to far",
        "distanceDesc": "Distance far to nearly",
        "filter": "Filter：",
        "breakfast": "Breakfast",
        "freeCancel": "Cancellable",
        "noGuarantee": "Without Guarantee",
        "protocol": "Corporate",
        "companyBill": "Company Bill"

    },
    "hotelsNumber": {
        "hotelsNumber1": "According to your needs, there are",
        "hotelsNumber2": "hotels: ",
    },
    'searchRemind': 'Please fill in correctly!',
    'points': " Points",
    "noMore": "No more searching result.",
    "loading": "Loading...",
    'noRoom': 'Not available',
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
function filterHotelsByOthers(hotels) {
    var filterResult = []
    if ($('#filter_other_companyBill').is(':checked')) {
        filterResult = hotels;  //因为跑接口的时候是1，在后台已经筛选好了
    } else if ($('#filter_other_protocol').is(':checked')) {
        //以下都需要在前台筛选
        hotels.map(function (item) {
            if (item.IsAgreement || item.IsTMCAgreement) {
                filterResult.push(item);
            }
        })
    } else if ($('#filter_other_breakfast').is(':checked')) {
        if ($('#filter_other_cancelable').is(':checked')) {
            hotels.map(function (item) {
                if (item.Breakfast > 0 && item.CancelRuleType > 0) {
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
        if ($('#filter_other_cancelable').is(':checked')) {
            hotels.map(function (item) {
                if (item.CancelRuleType > 0) {
                    filterResult.push(item);
                }
            })
        } else {
            filterResult = hotels;  //都没选择
        }
    }
    return filterResult
}
function ajaxQueryHotel(fuxun) {
    tools.searchLoadingShow()
    $('.sortTab').removeClass('active')
    var jsonOBJ = {
        request: {
            QueryKey: queryKey,
            Uid: id,
            Language: obtLanguage,
            OnlyFuXun: fuxun
        }
    }
    $.ajax({
        type: 'post',
        url: $.session.get('ajaxUrl'),
        dataType: 'json',
        data: {
            url: $.session.get('obtCompany') + "/QueryService.svc/QueryHotelNewPost",
            jsonStr: JSON.stringify(jsonOBJ)
        },
        success: function (data) {
            tools.searchLoadingHide()
            try {
                var res = JSON.parse(data);
                console.log(res);
                resAll = res
                $.session.set('hotelListResAll', JSON.stringify(resAll))
                isShowCompanyPay(res);
                cacheHotelList = res.hotels
                var filterResult = filterHotelsByOthers(cacheHotelList)
                hotelListInfo(filterResult);
                hotelSort(filterResult);
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
                        nextHotelList(fuxun);
                    }
                }
                pageIndex = 2;
                clickHotelLi();
            } catch (error) {
                console.log(error)
            }
        },
        error: function () {
            // alert('fail');
        }
    });
}
function filterHotels(min, max) {
    var filterCondition = {}
    $('.filter_wrapper input[type="checkbox"]').map(function (index) {
        var dom = $('.filter_wrapper input[type="checkbox"]').eq(index)
        if ($(dom).prop('checked') === true) {
            // 只传非不限的值
            var name = $(dom).attr('name')
            if (!filterCondition[name]) {
                filterCondition[name] = []
            }
            filterCondition[name].push($(dom).attr('value'))
        }
    })
    var filterOthers, filterPrice, filterStar

    // 星级
    if (filterCondition.filter_star) {
        filterStar = filterCondition.filter_star
        if (filterStar.indexOf('1-2') > -1) {
            filterStar.shift()
            filterStar.unshift('1', '2')
        }
    }
    var star = '0-1-2-3-4-5'
    if (filterStar) {
        star = '0-' + filterStar.join('-')
        queryKeyList[6] = star
    }
    // 价格
    if (min && max) {
        // 非预设价格
        filterPrice = [min, max]
        queryKeyList[7] = min
        queryKeyList[8] = max
    } else if (filterCondition.filter_price) {
        if (filterCondition.filter_price[0] != 0) {
            // 预设价格
            filterPrice = filterCondition.filter_price[0].split(',').map(function (item) { return parseInt(item) })
            // 设置了价格区间
            queryKeyList[7] = filterPrice[0]
            queryKeyList[8] = filterPrice[1]
        } else if (filterCondition.filter_price[0] == 0) {
            // 不限
            queryKeyList[7] = 0
            queryKeyList[8] = 5000
        }
    }
    // 其他
    var onlyFuxun = 0
    if (filterCondition.filter_other) {
        filterOthers = filterCondition.filter_other
        if (filterOthers.indexOf('companyBill') > -1) {
            onlyFuxun = 1
        }
    }

    queryKey = queryKeyList.join(',')
    ajaxQueryHotel(onlyFuxun)
}
//是否显示公司支付
function isShowCompanyPay(res) {
    if (!res.IsShowCompanyPay) {
        $('.companyBill').hide();
    } else {
        $('.companyBill').show();
    }
}
function stopBubble(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();  //w3c
    } else {
        window.event.cancelBubble = true; //IE
    }
}
function toggleItem(dom) {
    if ($(dom).hasClass('hide')) {
        $(dom).removeClass('hide')
    } else {
        $(dom).addClass('hide')
    }
}
function hideItem(dom) {
    if (!$(dom).hasClass('hide')) {
        $(dom).addClass('hide')
    }
}
$(document).on('mousedown', function (e) {
    var target = $(e.target)
    if (!target.is('.search_price *')) {
        $('.searchPriceBody').closePopWindow(300, $('.search_price'))
    }
    if (!target.is('.search_level *')) {
        $('.searchStarBody').closePopWindow(300, $('.search_level'))
    }
    if (!target.is('.hamb_menu *')) {
        $('.hamb_menu_wrapper:not(".hidden")').usePopWindowEffect(300)
    }
    if (!target.hasClass('hotel_addr') && !target.hasClass('search_hotelAddress_option')) {
        $('.search_hotelAddress_options').addClass('hide')
    }
    // if (!target.is('.filter_price_range *')) {   // 展开价格筛选确定
    //     $('.filter_price_range-box').removeClass('active')
    // }
})
function useMapboxEffect() {
    $("#hotel_addr").on('input propertychange', function () {
        $("#hotel_addr").removeAttr("key");
    })
    function initMapbox() {
        if (obtLanguage != "CN" && ($('#hotelCity').attr('code') || $('#hotelIntlCity').attr('code'))) {
            var centerLat = $('#hotel_addr').attr('latitude') || $.session.get('centerLat')
            var centerLng = $('#hotel_addr').attr('longitude') || $.session.get('centerLng')
            if (!centerLat || !centerLng) {
                return false;
            }
            if ($('.mapboxgl-ctrl-geocoder').length == 0) {
                $('#mapboxMap').show();
                var mapbox = new Mapbox();
                var defaultMarker = $('#hotel_addr').attr('latitude') && $('#hotel_addr').attr('longitude') ? true : false;
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
    }
    return initMapbox
}
function getHotelStarFromQueryKey(query) {
    //默认选择星级
    var starArray = []
    var queryList = query.split(',')
    var choosedStars = queryList[6]
    if (choosedStars == "0-1-2-3-4-5") {
        starArray.push('0')
    } else {
        if (choosedStars.indexOf('1-2') > -1) {//二星级以及一下
            starArray.push('1-2')
        }
        if (choosedStars.indexOf('3') > -1) {//三星级
            starArray.push('3')
        }
        if (choosedStars.indexOf('4') > -1) {//四星级
            starArray.push('4')

        }
        if (choosedStars.indexOf('5') > -1) {//五星级
            starArray.push('5')
        }
    }
    return starArray
}
function initCompanyAddress(res) {
    var initMapBox = useMapboxEffect()
    if (res.companyInfos.length === 0) {
        $("#hotel_addr").on('focus', function () {
            initMapBox()
        });
    } else {
        var addressNumber = 0
        res.companyInfos.map(function (item, index) {
            if (item.CompanyAddress !== "") {
                $(".search_hotelAddress_options").append('<li class="search_hotelAddress_option" value="' + item.CompanyAddress + '" key="' + item.Key + '">' + item.CompanyName + '</li>')
                // 有地址添加下拉菜单
                $(".search_hotelAddress_options li").click(function (e) {
                    $("#hotel_addr").val($(this).attr("key"));
                    $("#hotel_addr").attr("key", $(this).attr("key"));
                    $('.search_hotelAddress_options').addClass('hide')
                    stopBubble(e)
                })
                addressNumber++
            }
        })
        if (addressNumber === 0 && obtLanguage !== 'CN') {
            // 英文无地址打开mapbox
            $("#hotel_addr").on('mousedown', function () {
                initMapBox()
            });
        } else if (addressNumber > 0) {
            $("#hotel_addr").on('mousedown', function (e) {
                $('.search_hotelAddress_options').removeClass('hide')
            });

            // 英文添加mapbox选项
            if (obtLanguage !== 'CN') {
                $(".search_hotelAddress_options").append('<li class="search_hotelAddress_option" operate="map">' + get_lan('searchBody').otherOption + '</li>')
                $(".search_hotelAddress_options li[operate='map']").click(function () {
                    console.log('clicked map li')
                    initMapBox()
                })
            }
        }
    }
}
function handleSearchButtonClick() {
    $('.search_price_title').mousedown(function (e) {
        $(this).siblings().usePopWindowEffect(300, $('.search_price'))
        $('.searchStarBody').closePopWindow(300, $('.search_level'))
    })
    $('.search_level_title').mousedown(function (e) {
        $(this).siblings().usePopWindowEffect(300, $('.search_level'))
        $('.searchPriceBody').closePopWindow(300, $('.search_price'))
    })
}
function handleSortHamburClick() {
    $('.hamb_menu_btn').mousedown(function (e) {
        $('.hamb_menu_wrapper').usePopWindowEffect(300)
    })
}
function handleFilterPriceInput() {
    $('.filterMinPrice, .filterMaxPrice').on('change propertychange', function () {
        var min = $('.filterMinPrice').val()
        var max = $('.filterMaxPrice').val()
    })
    $('.filter_price_form').on('submit', function (e) {
        e.preventDefault()
        var min = $('.filterMinPrice').val()
        var max = $('.filterMaxPrice').val()
        var hasDefaultPrice = matchFilterPrice(min, max)
        if (!hasDefaultPrice) {
            addFilterTag(min + '-' + max, 'checkbox', 'filter_price_specific', 'filter_price')
        }
        filterHotels(min, max)
    })
    // $('.filterMinPrice, .filterMaxPrice').on('mousedown', function () {  // 展开价格筛选确定
    //     $('.filter_price_range-box').addClass('active')
    // })
}
// 双向绑定筛选按钮
function addFilterTag(text, from, dataID, dataType) {
    if(text === '0-0'){
        return
    }
    $('.hotelsNumber').append('\
        <div class="hotels_filter_tag" data-id="' + dataID + '" data-type="' + dataType + '">\
            <span class="hotels_filter_tag_text">' + text + '</span>\
            <div class="close" data-id="' + dataID + '" data-type="' + dataType + '" onclick="removeFilterTag(this, \'tag\')"></div>\
        </div>')
    var isChecked = $('#' + dataID).is(':checked')
    if (!isChecked && from != 'checkbox' && $('#' + dataID).length > 0) {
        $('#' + dataID).prop('checked', true)
        handleFilterChange($('#' + dataID), true)
    }
}

function removeFilterTag(e, from, dataID, dataType) {
    dataID = dataID || $(e).attr('data-id')
    dataType = dataType || $(e).attr('data-type')
    if (dataType === 'filter_price') {
        $('.hotels_filter_tag[data-type="filter_price"]').remove()
        if ($('#' + dataID).length <= 0) {
            $('#filter_price_0').click()

        }
    }
    if (from === 'checkbox') {
        $('.hotels_filter_tag[data-id="' + dataID + '"]').remove()
    } else if ($('#' + dataID).length > 0) {
        $('#' + dataID).prop('checked', false)
        handleFilterChange($('#' + dataID), false)

    }
    // 设置不限
    var filterName = $('#' + dataID).attr('name')
    var hasCheckedOption = false, canSetNoLimit = true
    $('input[name="' + filterName + '"]').map(function (index) {
        // 遍历其他选项，如果都没选中，则选中不限
        hasCheckedOption = $('input[name="' + filterName + '"]').eq(index).prop('checked')
        if (hasCheckedOption) {
            canSetNoLimit = false
        }
    })


    if (from !== 'checkbox') {
        if (canSetNoLimit) {
            $('input[name="' + filterName + '"][value="0"]').prop('checked', true).change() // 触发筛选方法
        } else {
            filterHotels()
        }
    } else if (canSetNoLimit) {
        if (filterName === 'filter_price' && ($('.filterMinPrice').val() != '0' || $('.filterMinPrice').val() != '5000')) {
            // 筛选价格，如果输入框有金额，且不是0-5000， 则不设置all
            return
        }
        if (filterName === 'filter_price') {
            setFilterPriceText(0, 5000)
        }
        $('input[name="' + filterName + '"][value="0"]').prop('checked', true)
    }

}

function setFilterPriceText(filterMinPrice, filterMaxPrice) {
    $('.filterMinPrice').val(filterMinPrice)
    $('.filterMaxPrice').val(filterMaxPrice)
}
function matchFilterPrice(min, max) {
    var expectValue = '0'
    if (min != '0' || max != '5000') {
        expectValue = min + ',' + max
    }
    var expectDom = $('input[name="filter_price"][value="' + expectValue + '"]')
    if ($(expectDom).length > 0) {
        handleFilterChange($(expectDom), true)
        return true
    } else {
        $('input[name="filter_price"]').map(function (index) {
            handleFilterChange($('input[name="filter_price"]').eq(index), false)
        })
        return false
    }
}
function initFilterPrice(query) {
    var queryList = query.split(',')
    var min = queryList[7]
    var max = queryList[8]
    var isMatchedDefault = matchFilterPrice(min, max)
    if (!isMatchedDefault) {
        addFilterTag(min + '-' + max, 'checkbox', 'filter_price_specific', 'filter_price')
        setFilterPriceText(min, max)
    }
}
function handleFilterChange(dom, newCheck) {
    $(dom).prop('checked', newCheck)
    var dataID = $(dom).attr('id')
    var dataType = $(dom).attr('name')
    var isChecked = $(dom).is(':checked')
    var text = $(dom).attr('text')
    var value = $(dom).attr('value')
    var filterGroup = $('.filter_wrapper input[name="' + dataType + '"]')

    function clearFilterGroup(dom) {
        if ($(dom).attr('id') != dataID) {
            handleFilterChange(dom, false)
        }
    }
    if (isChecked && $('.hotels_filter_tag[data-id="' + dataID + '"]').length > 0) {
        //选过的取消
        return false
    }
    if (!isChecked) {
        removeFilterTag(dom, 'checkbox', dataID, dataType)
        return true
    }
    if (['filter_other_breakfast', 'filter_other_cancelable'].indexOf(dataID) > 0) {
        // 早餐和限时取消可以同时选中
        filterGroup.map(function (index) {
            if (['filter_other_breakfast', 'filter_other_cancelable'].indexOf(filterGroup.eq(index).attr('id')) < 0) {
                clearFilterGroup(filterGroup.eq(index))
            }
        })
    } else if (dataType !== 'filter_star' || (dataType === 'filter_star' && dataID === 'filter_star_0')) {
        // 单选，星级不限 选择
        filterGroup.map(function (index) {
            clearFilterGroup(filterGroup.eq(index))
        })
    } else if (dataType === 'filter_star' && dataID !== 'filter_star_0') {
        // 多选，去除星级不限的勾选
        handleFilterChange($('#filter_star_0'), false)
    }
    if (dataType === 'filter_price') {
        var min, max
        if (value === '0') {
            min = 0
            max = 5000
        } else {
            min = value.split(',')[0]
            max = value.split(',')[1]
        }
        setFilterPriceText(min, max)
    }
    if (value != 0) {
        addFilterTag(text, 'checkbox', dataID, dataType)
    }
    return true
}
/* 
    @params initSearchStar 

*/
function initFilterStars(isReset, query) {
    var stars = getHotelStarFromQueryKey(query)
    $('.hotelStarBtn').removeClass('starChoose')
    var text = ''
    stars.map(function (star) {
        if (star === '0') {
            $('.hotelStarBtn').eq(0).addClass('starChoose')
            text = get_lan('searchBody').allStar
            handleFilterChange($('input[name="filter_star"][value="' + star + '"]'), true)
        } else {
            $('.hotelStarBtn[star="' + star + '"]').addClass('starChoose')
            switch (star) {
                case '1-2': text = get_lan('searchBody').star12; break;
                case '3': text = get_lan('searchBody').star3; break;
                case '4': text = get_lan('searchBody').star4; break;
                case '5': text = get_lan('searchBody').star5; break;
            }
            handleFilterChange($('input[name="filter_star"][value="' + star + '"]'), true)

        }
        HotelSearchLevel.push(text)
    })
    if (!isReset) {
        $('.search_level_text').text(HotelSearchLevel.join(', '))
    }
}

function initFilterOthers() {
    handleFilterChange($('#filter_other_all'), true)
}
function initFilterItems(isReset) {
    var query = isReset ? defaultQueryKey : queryKey
    initFilterStars(isReset, query)
    initFilterPrice(query)
    initFilterOthers()
    if (isReset) {
        queryKey = defaultQueryKey
        ajaxQueryHotel(0)
    }
}

function useFilterEffect() {
    $('.filter_wrapper input[type="checkbox"]').change(function () {
        var canFilterHotels = handleFilterChange(this, $(this).prop('checked'))
        try {
            if (canFilterHotels) {
                filterHotels()
            }
        } catch (error) {
            console.log(error)
        }
    })
    initFilterItems(false)
    handleFilterPriceInput()
}

$(function () {
    showContent();//内容展示
    hotelList();//酒店列表
})
//内容展示
function showContent() {
    $("#main").html('\
        <div id="cover"></div>\
        <div class="autoCenter">\
            <div class="mapBody hide">\
                <div id="mapTittle"><span class="mapTittleText">x</span></div>\
                <div id="map"></div>\
            </div>\
            <div class="progressBar"></div>\
            <div class="searchBody"></div>\
            <div class="eTravel_reminder_box"></div>\
            <section class="container">\
                <aside class="filter_side">\
                    <div class="allMapBtn">\
                        <img src="../../images/Aus/hotel/pic_showonmap.png"/>\
                        <span class="allMapText">'+ get_lan('hotelList').allMapBtn + '</span>\
                    </div>\
                    <section class="filter_wrapper">\
                        <div class="filter_box">\
                            <div class="filter_reset">\
                                <h3 class="filter_title">'+ get_lan('searchBody').filter + '</h3>\
                                <button class="filter_reset_btn" onclick="initFilterItems(true)">'+ get_lan('searchBody').reset + '</button>\
                            </div>\
                            <div class="filter_option-box">\
                                <h3 class="filter_sub_title">'+ get_lan('searchBody').star + '</h3>\
                                <ul>\
                                    <li>\
                                        <input type="checkbox" name="filter_star" value="0" id="filter_star_0" text="'+ get_lan('searchBody').allStar + '">\
                                        <label for="filter_star_0">'+ get_lan('searchBody').allStar + '</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_star" value="1-2" id="filter_star_12" text="'+ get_lan('searchBody').star12 + '">\
                                        <label for="filter_star_12">'+ get_lan('searchBody').star12 + '</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_star" value="3" id="filter_star_3" text="'+ get_lan('searchBody').star3 + '">\
                                        <label for="filter_star_3">'+ get_lan('searchBody').star3 + '</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_star" value="4" id="filter_star_4" text="'+ get_lan('searchBody').star4 + '">\
                                        <label for="filter_star_4">'+ get_lan('searchBody').star4 + '</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_star" value="5" id="filter_star_5" text="'+ get_lan('searchBody').star5 + '">\
                                        <label for="filter_star_5">'+ get_lan('searchBody').star5 + '</label>\
                                    </li>\
                                </ul>\
                            </div>\
                            <div class="filter_option-box">\
                                <h3 class="filter_sub_title">'+ get_lan('searchBody').price + '</h3>\
                                <ul>\
                                    <li>\
                                        <input type="checkbox" name="filter_price" value="0" id="filter_price_0" text="'+ get_lan('searchBody').allStar + '">\
                                        <label for="filter_price_0">'+ get_lan('searchBody').allStar + '</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_price" value="0,150" id="filter_price_150" text="0-150">\
                                        <label for="filter_price_150">0-150</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_price" value="151,300" id="filter_price_300" text="151-300">\
                                        <label for="filter_price_300">151-300</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_price" value="301,450" id="filter_price_450" text="301-450">\
                                        <label for="filter_price_450">301-450</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_price" value="451,600" id="filter_price_600" text="451-600">\
                                        <label for="filter_price_600">451-600</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_price" value="601,1000" id="filter_price_1000" text="601-1000">\
                                        <label for="filter_price_1000">601-1000</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_price" value="1001,5000" id="filter_price_5000" text="1001-5000">\
                                        <label for="filter_price_5000">1001-5000</label>\
                                    </li>\
                                </ul>\
                                <form class="filter_price_form">\
                                    <div class="filter_price_range">\
                                        <div class="filter_price_inputs">\
                                            <input type="number" value="0" class="filterMinPrice" autocomplete="off">\
                                            <div class="hyphen">-</div>\
                                            <input type="number" value="700" class="filterMaxPrice" autocomplete="off">\
                                        </div>\
                                        <input type="submit" class="filter_price_submit" value=""/>\
                                    </div>\
                                </form>\
                            </div>\
                            <div class="filter_option-box">\
                                <h3 class="filter_sub_title">'+ get_lan('searchBody').other + '</h3>\
                                <ul>\
                                    <li>\
                                        <input type="checkbox" name="filter_other" value="0" id="filter_other_all" text="'+ get_lan('searchBody').allStar + '">\
                                        <label for="filter_other_all">'+ get_lan('searchBody').allStar + '</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_other" value="breakfast" id="filter_other_breakfast" text="'+ get_lan('siftBody').breakfast + '">\
                                        <label for="filter_other_breakfast">'+ get_lan('siftBody').breakfast + '</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_other" value="cancelable" id="filter_other_cancelable" text="'+ get_lan('siftBody').freeCancel + '">\
                                        <label for="filter_other_cancelable">'+ get_lan('siftBody').freeCancel + '</label>\
                                    </li>\
                                    <li>\
                                        <input type="checkbox" name="filter_other" value="protocol" id="filter_other_protocol" text="'+ get_lan('siftBody').protocol + '">\
                                        <label for="filter_other_protocol">'+ get_lan('siftBody').protocol + '</label>\
                                    </li>\
                                    <li class=""companyBill>\
                                        <input type="checkbox" name="filter_other" value="companyBill" id="filter_other_companyBill" text="'+ get_lan('siftBody').companyBill + '">\
                                        <label for="filter_other_companyBill">'+ get_lan('siftBody').companyBill + '</label>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
                    </section>\
                    <div class="filter_switch"></div>\
                </aside>\
                <section class="hotel_main">\
                    <div class="hotelsNumber"></div>\
                    <a class="banner_middle" target="_blank" href=""><img class="banner" src="../staticFile/query.png"/></a>\
                    <div class="infoBody">\
                        <div class="siftBody"></div>\
                    </div>\
                    <div class="hotelList"></div>\
                    <div class="listEnd"><span class="loadingSpan"></span><span class="textSpan">'+ get_lan('loading') + '</span></div>\
                </section>\
            </section>\
        </div>\
    ')
    if (TAorderNo != undefined) {
        console.log('隐藏')
        $('.menu .autoCenter').addClass('hide')
        $('.orderTittle').addClass('hide')
        $('.autoScrollY').addClass('hide')
        $('footer').addClass('hide')
        $('.menu').css("height", '40px')
    }
    $(".progressBar").html('\
        <div class="progressLine active"></div><span class="activeProgress">'+ get_lan('progressBar').search + '</span>\
        <div class="progressLine progressBackColor"></div>'+ get_lan('progressBar').book + '\
        <div class="progressLine progressBackColor"></div>'+ get_lan('progressBar').complete + '\
    ')
    $(".eTravel_reminder_box").html(get_lan('hotelBudgetReminder').remind + ' <strong class="policyPrice eTravel_reminder_box_strong"></strong> <span class="unit"></span>')
    var policyPriceJSON = {
        cityCode: searchHotelInfo.hotelCode,
        id: id,
        checkIn: queryKeyList[4],
        checkOut: queryKeyList[5]
    }
    $.ajax({
        type: 'post',
        url: $.session.get('ajaxUrl'),
        dataType: 'json',
        data: {
            url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
            jsonStr: JSON.stringify(policyPriceJSON)
        },
        success: function (data) {
            var res = JSON.parse(data);
            console.log(res);
            if (parseInt(res.maxFare) != 0) {
                $(".policyPrice").text(parseInt(res.maxFare) - 1);
                $(".unit").text(res.Unit);
            } else {
                $(".policyPrice").text(parseInt(res.maxFare));
                $('.eTravel_reminder_box').addClass('hide')
            }
            // $(".searchMaxPrice").val(res.maxFare);
        },
        error: function () {
            // alert('fail');
        }
    });
    // 12.24 hotelPriceBtn  删除币种
    $(".searchBody").html('\
        <div class="search_wrapper">\
            <div class="search_inputItems">\
                <div class="search_destination search_input-box">\
                    <h6 class="search_title">'+ get_lan('searchBody').hotelCity + '</h6>\
                    <input class="search_input" type="text" id="hotelCity" autocomplete="off" placeholder="'+ get_lan('searchBody').hotelCityInput + '">\
                </div>\
                <div class="search_checkIn search_input-box">\
                    <h6 class="search_title">'+ get_lan('searchBody').hotelCheckInDate + '</h6>\
                    <input class="search_input" type="text" id="hotelDepartureDate" readonly="readonly">\
                </div>\
                <div class="search_checkOut search_input-box">\
                    <h6 class="search_title">'+ get_lan('searchBody').hotelCheckOutDate + '</h6>\
                    <input class="search_input" type="text" id="hotelReturnDate" readonly="readonly">\
                </div>\
                <div class="search_hotelAddress search_input-box">\
                    <h6 class="search_title">'+ get_lan('searchBody').hotelAddress + '</h6>\
                    <div class="hotelAddressBody">\
                        <input type="text" id="hotel_addr" class="hotel_addr" autocomplete="new" placeholder="'+get_lan('searchBody').locationPlaceholder+'" />\
                        <ul class="search_hotelAddress_options hide"></ul>\
                    </div>\
                </div>\
                <div class="search_keyWords search_input-box">\
                    <h6 class="search_title">'+ get_lan('searchBody').hotelKeyWords + '</h6>\
                    <div class="search_keyword_box">\
                        <input class="search_input" type="text" id="keyWordInput" autocomplete="off" placeholder="'+get_lan('searchBody').hotelKeyInput+'" />\
                        <div class="keyWordBody"></div>\
                    </div>\
                </div>\
            </div>\
            <div class="search_buttonItems">\
                <div class="search_items">\
                    <div class="search_filter-box search_price">\
                        <div class="search_price_title search_filter-box_title">\
                            <img src="../../images/Aus/hotel/icon_price.png" alt="price"/>\
                            <span class="search_price_text">'+ queryKeyList[7] + '-' + queryKeyList[8] + ProfileInfo.OfficeCurrency + '</span>\
                        </div>\
                        <div class="search_filter-box_pop searchPriceBody hidden negative">\
                            <div class="search_filter-box_pop_item hotelPriceBtn" minPrice="0" maxPrice="5000">'+ get_lan('searchBody').allStar + '</div>\
                            <div class="search_filter-box_pop_item hotelPriceBtn" id="price1" minPrice="0" maxPrice="150">0-150'+ ProfileInfo.OfficeCurrency + '</div>\
                            <div class="search_filter-box_pop_item hotelPriceBtn" id="price2" minPrice="151" maxPrice="300">151-300'+ ProfileInfo.OfficeCurrency + '</div>\
                            <div class="search_filter-box_pop_item hotelPriceBtn" id="price3" minPrice="301" maxPrice="450">301-450'+ ProfileInfo.OfficeCurrency + '</div>\
                            <div class="search_filter-box_pop_item hotelPriceBtn" id="price4" minPrice="451" maxPrice="600">451-600'+ ProfileInfo.OfficeCurrency + '</div>\
                            <div class="search_filter-box_pop_item hotelPriceBtn" id="price5" minPrice="601" maxPrice="1000">601-1000'+ ProfileInfo.OfficeCurrency + '</div>\
                            <div class="search_filter-box_pop_item hotelPriceBtn" id="price6" minPrice="1001" maxPrice="5000">1001-5000'+ ProfileInfo.OfficeCurrency + '</div>\
                            <div class="hotel_price_range">\
                                <input type="number" value="0" class="searchMinPrice">\
                                <div class="hyphen">-</div>\
                                <input type="number" value="700" class="searchMaxPrice">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="search_filter-box search_level">\
                        <div class="search_level_title search_filter-box_title">\
                            <img src="../../images/Aus/hotel/icon_star.png" alt="level"/>\
                            <span class="search_level_text">All</span>\
                        </div>\
                        <div class="search_filter-box_pop searchStarBody hidden negative">\
                            <div class="search_filter-box_pop_item hotelStarBtn starChoose all" star="1-2-3-4-5">'+ get_lan('searchBody').allStar + '</div>\
                            <div class="search_filter-box_pop_item hotelStarBtn two" star="1-2"><span class="level">2</span><span class="star"></span></div>\
                            <div class="search_filter-box_pop_item hotelStarBtn" star="3"><span class="level">3</span><span class="star"></span></div>\
                            <div class="search_filter-box_pop_item hotelStarBtn" star="4"><span class="level">4</span><span class="star"></span></div>\
                            <div class="search_filter-box_pop_item hotelStarBtn" star="5"><span class="level">5</span><span class="star"></span></div>\
                        </div>\
                    </div>\
                </div>\
                <div class="searchHotelBtn search_btn" state="domHotel">'+ get_lan('searchBody').search + '</div>\
            </div>\
        </div>\
    ')
    $(".searchMinPrice").val(queryKeyList[7]);
    $(".searchMaxPrice").val(queryKeyList[8]);
    if (hotelAddress_latitude != "" && hotelAddress_longitude != "") {
        $('#hotel_addr').attr('longitude', hotelAddress_longitude).attr('latitude', hotelAddress_latitude);
    }

    handleSearchButtonClick()
    // if (searchHotelInfo.hotelState == "intlHotel") {
    //     $("#hotelCity").removeAttr("id").attr("id", "hotelIntlCity");
    //     $("#hotelIntlCity").val(searchHotelInfo.hotelCityText);
    //     $("#hotelIntlCity").attr("code", searchHotelInfo.hotelCode);
    //     $("#hotelIntlCity").kuCity();
    //     $(".searchHotelBtn").attr("state", "intlHotel");
    //     // 12.25修改  删除币种
    //     $('#price1').text("0-150")
    //     $('#price2').text("150-300")
    //     $('#price3').text("300-450")
    //     $('#price4').text("450-600")
    //     $('#price5').text("600-1000")
    //     $('#price6').text("1000-5000")

    // }
    //关键字
    $("#keyWordInput").attr("key", queryKeyList[2]);
    $("#keyWordInput").val(searchHotelInfo.hotelKeyWordText);

    $("#keyWordInput").unbind("click").click(function () {

        var hotelCityCode = $('#hotelCity').attr("code");

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
                          <div class="relationTittle keywordTitle--hotel">\
                            <div>' + get_lan('keyWordBody').hotel + '</div>\
                          </div>\
                          <div class="relationContent flexWrap">' + hotelStr + '</div>\
                        </div>\
                        <div class="relationBody ' + showBrand + '">\
                          <div class="relationTittle keywordTitle--brand">\
                            <div>' + get_lan('keyWordBody').brand + '</div>\
                          </div>\
                          <div class="relationContent flexWrap">' + keyWordsNormalObj.brandStr + '</div>\
                        </div>\
                        <div class="relationBody ' + showDistrict + '">\
                          <div class="relationTittle keywordTitle--district">\
                            <div>' + get_lan('keyWordBody').district + '</div>\
                          </div>\
                          <div class="relationContent flexWrap">' + keyWordsNormalObj.districtStr + '</div>\
                        </div>\
                        <div class="relationBody ' + showCommercial + '">\
                          <div class="relationTittle keywordTitle--commercial">\
                            <div>' + get_lan('keyWordBody').commercial + '</div>\
                          </div>\
                          <div class="relationContent flexWrap">' + keyWordsNormalObj.commercialStr + '</div>\
                        </div>\
                        <div class="relationBody ' + showExtCommercial + '">\
                          <div class="relationTittle keywordTitle--extCommercial">\
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
    $("#keyWordInput").on('focus', function () {
        var hotelCityCode = $('#hotelCity').attr("code");
		if (hotelCityCode) {
			$(".keyWordBody").show();
		}
    })
        .on('blur', function () {
            $(".keyWordBody").hide();
        })
    //选择城市
    $("#hotelCity").val(searchHotelInfo.hotelCityText);
    $("#hotelCity").attr("code", searchHotelInfo.hotelCode);
    $("#hotelCity").attr("cn", searchHotelInfo.cn);
    $("#hotelCity").attr("en", searchHotelInfo.en);
    $("#hotelCity").kuCity();
    //酒店地址
    $("#hotel_addr").val(searchHotelInfo.hotelAddressText);
    $("#hotel_addr").attr("key", queryKeyList[3]);
    $.ajax({
        type: 'post',
        url: $.session.get('ajaxUrl'),
        dataType: 'json',
        data: {
            url: $.session.get('obtCompany') + "/QueryService.svc/GetCustomerCompanyAddressPost",
            jsonStr: '{"cityCode":"' + (searchHotelInfo.hotelCode) + '","id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
        },
        success: function (data) {
            var res = JSON.parse(data);
            console.log(res);
            initCompanyAddress(res)
        },
        error: function () {
            // alert('fail'); 
        }
    });
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
        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $("#hotelDepartureDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
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
                maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                hideIfNoPrevNext: true,
                showOtherMonths: true,
                selectOtherMonths: true,
            });
            $("#hotelReturnDate").val(getNextDay($("#hotelDepartureDate").val()));
        }
    });
    function getNextDay(d) {
        d = new Date(d);
        d = +d + 1000 * 60 * 60 * 24;
        d = new Date(d);
        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        //格式化
        return d.getFullYear() + "-" + month + "-" + day;
    }
    //选择星级
    $(".hotelStarBtn").unbind("click").click(function () {
        if ($(this).attr("star") == "1-2-3-4-5") {
            $(".hotelStarBtn").removeClass("starChoose");
            $(this).addClass("starChoose");
            HotelSearchLevel.length = 0
            $('.search_level_text').text(get_lan('searchBody').allStar)

        } else {
            if ($(this).hasClass("starChoose")) {
                $(this).removeClass("starChoose");
                var noSingleOption = true
                $('.hotelStarBtn').map(function (index) {
                    if ($('.hotelStarBtn').eq(index).hasClass('starChoose')) {
                        noSingleOption = false
                    }
                })
                if (noSingleOption) {
                    $(".hotelStarBtn").eq(0).addClass("starChoose");
                }
            } else {
                $(this).addClass("starChoose");
                $(".hotelStarBtn").eq(0).removeClass("starChoose");
            }
            if ($(".starChoose").length == 0) {
                $(".hotelStarBtn").eq(0).addClass("starChoose");
                HotelSearchLevel.length = 0
            } else {
                HotelSearchLevel.length = 0
                $('.searchStarBody .starChoose').map(function (index) {
                    var star = $('.searchStarBody .starChoose').eq(index).attr('star')
                    if (star == "1-2-3-4-5") {
                        HotelSearchLevel.push(get_lan('searchBody').allStar)
                    }
                    if (star === '1-2') {//二星级以及一下
                        HotelSearchLevel.push(get_lan('searchBody').star12)
                    }
                    if (star === '3') {//三星级
                        HotelSearchLevel.push(get_lan('searchBody').star3)
                    }
                    if (star === '4') {//四星级
                        HotelSearchLevel.push(get_lan('searchBody').star4)
                    }
                    if (star === '5') {//五星级
                        HotelSearchLevel.push(get_lan('searchBody').star5)
                    }
                })
                $('.search_level_text').text(HotelSearchLevel.join(', '))
            }
        }
    })
    //选择价格
    $(".hotelPriceBtn").unbind("click").click(function () {
        $('.hotelPriceBtn').removeClass('starChoose')
        $(this).addClass('starChoose')

        $(".searchMinPrice").val($(this).attr("minPrice"))
        $(".searchMaxPrice").val($(this).attr("maxPrice"))
        setPriceTitle()
    })
    function setPriceTitle() {
        var min = $('.searchMinPrice').val()
        var max = $('.searchMaxPrice').val()
        $('.search_price_text').text(min + '-' + max + ProfileInfo.OfficeCurrency)
    }
    var minIndex, maxIndex
    $(".searchMinPrice").unbind("change").change(function () {
        getinputPrice()
        setPriceTitle()
    })
    $(".searchMaxPrice").unbind("change").change(function () {
        getinputPrice()
        setPriceTitle()
    })

    function getinputPrice() {
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
    //搜索酒店
    function datedifference(sDate1, sDate2) {
        var dateSpan,
            tempDate,
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
    $(".searchHotelBtn").unbind("click").click(function () {
        var that = this;
        var hotelCityCode = $('#hotelCity').attr("code");
        var hotelCityText = $('#hotelCity').val();
        var hotelState = "domHotel";

        if (hotelCityCode) {
            var cityList = '"' + hotelCityCode + '"';
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
            function searchHotel() {
                var hotelAreaTypeID = $("#keyWordInput").attr("hoteltype") && $("#keyWordInput").attr("hoteltype") != 5 ? $("#keyWordInput").attr("relationId") + '-' + $("#keyWordInput").attr("hoteltype") : '';
                var hotelname = !$("#keyWordInput").attr("hoteltype") || $("#keyWordInput").attr("hoteltype") == 5 ? $("#keyWordInput").val().split(",").join(' ') : '';
                var hotel_longitude = $('#hotel_addr').attr('longitude') ? $('#hotel_addr').attr('longitude') : "";
                var hotel_latitude = $('#hotel_addr').attr('latitude') ? $('#hotel_addr').attr('latitude') : "";
                var hotel_lonLat = hotel_longitude + ',' + hotel_latitude;

                if ($("#hotel_addr").val() != "" && hotel_longitude == "" && hotel_latitude == "") {
                    if ($("#hotel_addr").attr("key")) {
                        var address = $("#hotelCity").val() + $("#hotel_addr").attr("key").split(",").join(' ');
                    } else {
                        var address = $("#hotelCity").val() + $("#hotel_addr").val().split(",").join(' ');
                    }
                } else {
                    var address = "";
                }

                var stars = '0-';
                console.log(stars);
                for (var i = 0; i < $('.searchStarBody .starChoose').length; i++) {
                    stars += $('.searchStarBody .starChoose').eq(i).attr("star");
                    stars += '-';
                }
                stars = stars.substring(0, stars.length - 1);
                var queryKey = hotelCityCode + ',' + hotelAreaTypeID + ',' + hotelname + ',' + address + ',' + $("#hotelDepartureDate").val() + ',' + $("#hotelReturnDate").val() + ',' + stars + ',' + $(".searchMinPrice").val() + ',' + $(".searchMaxPrice").val() + ",1,1,1,2000," + hotel_lonLat;
                var searchHotelInfo = {
                    'queryKey': queryKey,
                    'hotelCode': hotelCityCode,
                    'hotelCityText': hotelCityText,
                    'hotelState': hotelState,
                    'hotelAddressText': $("#hotel_addr").val(),
                    'hotelKeyWordText': $("#keyWordInput").val(),
                    'cn': $("#hotelCity").attr('cn'),
                    'en': $("#hotelCity").attr('en')
                }
                var newRecentInfo = searchHotelInfo
                newRecentInfo.departureDate = $("#hotelDepartureDate").val()
                newRecentInfo.returnDate = $("#hotelReturnDate").val()
                newRecentInfo.cn = $("#hotelCity").attr('cn')
                newRecentInfo.en = $("#hotelCity").attr('en')
                if (localStorage.getItem('recentSearch')) {
                    var recentHotelSearch = JSON.parse(localStorage.getItem('recentSearch'))
                    if (JSON.parse(localStorage.getItem('recentSearch')).hotel) {
                        recentHotelSearch.hotel = recentHotelSearch.hotel.filter(function (element) {
                            if (element.hotelCode !== newRecentInfo.hotelCode || element.departureDate !== newRecentInfo.departureDate || element.returnDate !== newRecentInfo.returnDate) {
                                return true
                            } else {
                                return false
                            }
                        })
                        recentHotelSearch.hotel.unshift(newRecentInfo)
                        if (recentHotelSearch.hotel.length > 5) {
                            recentHotelSearch.hotel.pop()
                        }
                    } else {
                        recentHotelSearch['hotel'] = newRecentInfo
                    }
                } else {
                    var recentHotelSearch = { hotel: [newRecentInfo] }
                }
                localStorage.setItem('recentSearch', JSON.stringify(recentHotelSearch))
                $.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
                location.reload();
            }

        } else {
            alert(get_lan('searchRemind'))
        }
    })
    //排序模块
    $(".siftBody").html('\
        <h3>'+ get_lan('siftBody').sort + '</h3>\
        <div class="siftBody_wrapper">\
            <div class="priceSort-asc sortTab">'+ get_lan('siftBody').priceAsc + '</div>\
            <div class="priceSort-desc sortTab">'+ get_lan('siftBody').priceDesc + '</div>\
            <div class="starSort-asc sortTab">'+ get_lan('siftBody').starAsc + '</div>\
            <div class="starSort-desc sortTab">'+ get_lan('siftBody').starDesc + '</div>\
        </div>\
        <nav class="hamb_menu">\
            <img class="hamb_menu_btn" src="../../../images/Aus/common/icon_nav_menu.png"/>\
            <div class="hamb_menu_wrapper hidden negative">\
                <div class="scoreSort-asc sortTab">'+ get_lan('siftBody').scoreAsc + '</div>\
                <div class="scoreSort-desc sortTab">'+ get_lan('siftBody').scoreDesc + '</div>\
            </div>\
        </nav>\
    ')
    handleSortHamburClick()

    $(".hotelsNumber").html('\
        <div>\
            <span>' + get_lan('hotelsNumber').hotelsNumber1 + '</span>\
            <span class="hotelsNumberText"></span>\
            <span>' + get_lan('hotelsNumber').hotelsNumber2 + '</span>\
        </div>')
    // if (searchHotelInfo.hotelState == "intlHotel") {
    //     $(".scoreSort").addClass("hide");
    //     $(".filterText").addClass("hide");
    //     $(".tabBtn").addClass("hide");
    //     // $(".protocolBtn").addClass("hide");
    // }
    GetCompanyImageInfos()
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
                $('.banner_middle').remove()
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
                    $('.banner_middle').remove()
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
    // $('body').mLoading("show");
    tools.searchLoadingShow()
    ajaxQueryHotel(0)
    useFilterEffect()
}

function useSortEffect(arr, item, sortMethod) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            var jHalf = '', iHalf = ''
            if(item === 'StarLevel') {
                // 半星
                jHalf = '.' + arr[j].ExtStarLevel
                iHalf = '.' + arr[i].ExtStarLevel
            }
            if ((sortMethod === 'desc' && parseFloat(arr[i][item] + iHalf) < parseFloat(arr[j][item] + jHalf)) ||
                (sortMethod === 'asc' && parseFloat(arr[i][item] + iHalf) > parseFloat(arr[j][item] + jHalf))) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function hotelSort(res) {
    if (res[0]) {
        if (res[0].HotelDistance == null || res[0].HotelDistance == '') {
            $(".distanceSort").hide();
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
    var priceSortAsc = function (arr) { return useSortEffect(arr, 'Price', 'asc') }
    //价格降序
    var priceSortDes = function (arr) { return useSortEffect(arr, 'Price', 'desc') }

    //星级升序
    var starSortAsc = function (arr) { return useSortEffect(arr, 'StarLevel', 'asc') }
    //星级降序
    var starSortDes = function (arr) { return useSortEffect(arr, 'StarLevel', 'desc') }

    //评分降序
    var scoreSortAsc = function (arr) { return useSortEffect(arr, 'HotelRating', 'asc') }
    //评分降序
    var scoreSortDes = function (arr) { return useSortEffect(arr, 'HotelRating', 'desc') }

    function handleSortClick(dom, segmentList) {
        $(".sortTab ").removeClass('active');
        $(dom).addClass('active')
        hotelListInfo(segmentList);
    }
    $(".priceSort-asc").unbind("click").click(function () {
        handleSortClick($(this), priceSortAsc(priceSortAscList))
    })
    $('.priceSort-desc').unbind('click').click(function () {
        handleSortClick($(this), priceSortDes(priceSortDesList))
    })
    $(".starSort-asc").unbind("click").click(function () {
        handleSortClick($(this), starSortAsc(starSortAscList))
    })
    $('.starSort-desc').unbind('click').click(function () {
        handleSortClick($(this), starSortDes(starSortDesList))
    })
    $(".scoreSort-asc").unbind("click").click(function () {
        handleSortClick($(this), scoreSortAsc(scoreSortAscList))
    })
    $('.scoreSort-desc').unbind('click').click(function () {
        handleSortClick($(this), scoreSortDes(scoreSortDesList))
    })
    $(".distanceSort").unbind("click").click(function () {
        // 新版没有
        $(".sortTab ").css("color", '#000');
        $(".sortTabIcon").css("background-position", "0px 0px");
        $(this).css("color", '#1e66ae');
        if (!$(this).attr("sortType") || $(this).attr("sortType") == "asc") {
            hotelListInfo(res.reverse());
            $(this).attr("sortType", "desc");
            $(".distanceSortIcon").css("background-position", "-36px 0px");
        }
        else if ($(this).attr("sortType") == "desc") {
            hotelListInfo(res.reverse());
            $(this).attr("sortType", "asc");
            $(".distanceSortIcon").css("background-position", "-18px 0px");
        }
    })
}
function hotelListInfo(res) {
    if (res.length > 0) {
        $(".allMap,.allMapBtn").unbind("click").click(function () {
            $(".mapBody").removeClass("hide");
            $("#cover").css("display", "block");
            if (obtLanguage === 'CN') {
                var map = new BMap.Map("map");    // 创建Map实例
                $(".mapTittleText,#cover").unbind("click").click(function () {
                    $(".mapBody").addClass("hide");
                    $("#cover").css("display", "none");
                })
                var data_info = [];
                res.map(function (item) {
                    data_info.push([item.Longitude, item.Laitude, item.HotelName, item.HotelAddress, item.HotelPhone, item.imageUrl])
                })

                // 百度地图API功能
                var poi = new BMap.Point(data_info[0][0], data_info[0][1]);
                map.centerAndZoom(poi, 16);
                map.enableScrollWheelZoom();
                var pointList = [];
                var datainfoLength = data_info.length > 10 ? 10 : data_info.length;
                for (var i = 0; i < datainfoLength; i++) {
                    pointList.push(new BMap.Point(data_info[i][0], data_info[i][1]));
                }
                console.log(pointList);

                setTimeout(function () {
                    var convertor = new BMap.Convertor();
                    convertor.translate(pointList, 3, 5, translateCallback)
                }, 50);
                //坐标转换完之后的回调函数
                translateCallback = function (data) {
                    console.log(data)
                    if (data.status === 0) {
                        for (var i = 0; i < 10; i++) {
                            var marker = new BMap.Marker(data.points[i]);  // 创建标注
                            var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                                '<img src="' + data_info[i][5] + '" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                                '地址：' + data_info[i][3] + '<br/>电话：' + data_info[i][4] + '<br/>' +
                                '</div>';
                            addClickHandler(data_info[i][2], content, marker);
                            map.addOverlay(marker);               // 将标注添加到地图中
                        }
                        map.setCenter(data.points[0]);
                    }
                }
                function addClickHandler(hotelName, content, marker) {
                    //创建检索信息窗口对象
                    var searchInfoWindow = null;
                    searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                        title: hotelName,      //标题
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
                }
            } else {
                var mapbox = new Mapbox();
                try {
                    var container = 'map'
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
                    $(".mapTittleText,#cover").unbind("click").click(function () {
                        $(".mapBody").addClass("hide");
                        $("#cover").css("display", "none");
                        $('#' + container).html('')
                    })
                } catch (err) {

                }
            }
        })
    }

    /*酒店列表*/
    $(".hotelList").html("");
    $(".hotelsNumberText").text(res.length);
    var onlineStyle = JSON.parse($.session.get('ProfileInfo')).onlineStyle;
    var showHotelTax = resAll.HotelListTipExcludingTax ? "" : "hide"
    res.map(function (item, index) {
        var showHandimgOrange = "hide"
        var showHandImg = "hide"
        var companyCorporate = false
        if (resAll.GDSHotelDifferPreferenceAndAgreement == true) {
            if (item.IsAgreement == true) {
                showHandimgOrange = ""
                showHandImg = "hide"
                //橙色,客户优选
            }
            if (item.IsCommonAgreement == true) {
                showHandimgOrange = "hide"
                showHandImg = ""
                companyCorporate = true
                // 绿色,普通协议酒店
            }
            if (item.IsCommonAgreement == true && ProfileInfo.DomesticGDSHotelOnlyShowPreference && !resAll.IsInter) {
                showHandImg = "hide"
                companyCorporate = false
                // 新参数,去掉 国内 普通协议酒店
            }
            if (item.IsAgreement == false && item.IsCommonAgreement == false) {
                showHandimgOrange = "hide"
                showHandImg = "hide"
                companyCorporate = false
                // 都不显示
            }
        } else {
            showHandimgOrange = "hide"
            showHandImg = item.IsAgreement || item.IsTMCAgreement ? "" : "hide";
            if (showHandImg == "") {
                companyCorporate = true
            }
        }


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
        var showHotelLiScore = item.HotelRating == 0 ? "hide" : "";
        // 12.05 新增判断
        var noimgUrl = onlineStyle == "BCD" ? "../../hotel/images/BCDnoPicture.png" : "../../hotel/images/noPicture.png";
        var imageUrl = item.imageUrl == null || item.imageUrl == "" ? noimgUrl : item.imageUrl;

        // 12.24 hotelLiPrice 删除币种
        if (item.IsFXHotel) {
            var companyPayshow = ""
            var companyPay = obtLanguage == "CN" ? "公司支付" : "Company bill"
        } else {
            var companyPayshow = "hide"
        }
        var priceDomStr =
            obtLanguage == 'CN'
                ? '<p><b class="hotelLiPrice_price">' + item.Price + '</b>' + item.Currency + '  ' + get_lan('hotelList').lowest + '</p>'
                : '<p>' + get_lan('hotelList').lowest + ' ' + item.Currency + ' <b class="hotelLiPrice_price">' + item.Price + '</b></p>'
        var detailPart = '<div class="hotelLi_aside center"><div class="hotelDetailNoRoom">' + get_lan('noRoom') + '</div></div>'
        if (!item.NoRoom) {
            detailPart =
                '<div class="hotelLi_aside">\
                    <div class="hotelLiPrice">\
                        '+ priceDomStr + '\
                        <p class="hotelLiPrice_tax ' + showHotelTax + '">' + get_lan('hotelList').noTax + '</p>\
                    </div>\
                    <div class="searchHotelDetailBtn" hotelId="'+ item.ID + '" hotelType="' + item.HotelType + '" \
                        cityCode="' + item.CityCode + '" LocationType="' + item.LocationType + '" companyCorporate="' + companyCorporate + '">' + get_lan('hotelList').search + '</div>\
                </div>'
        }
        $(".hotelList").append('\
            <div class="hotelLi">\
                <div class="hotelLi_main">\
                    <section class="hotelLiImg">\
                        <img src="'+ imageUrl + '" alt="' + item.HotelName + '"></img>\
                    </section>\
                    <section class="hotelLi_details">\
                        <div class="hotelLiName" hotelId="'+ item.ID + '" hotelType="' + item.HotelType + '" noRoom="' + item.NoRoom + '"\
                            cityCode="' + item.CityCode + '" LocationType="' + item.LocationType + '" companyCorporate="' + companyCorporate + '">\
                            <span class="hotelLiName_title">' + item.HotelName + '</span>\
                            <span class="list_points hide"></span>\
                        </div>\
                        <div class="hotelLiStar">\
                            <div class="hotelLiStarHalf"></div>\
                        </div>\
                        <div class="hotelLi_protocals">\
                            <div class="companyPay ' + companyPayshow + ' companyPay-companyPay" >' + companyPay + '</div>\
                            <div class="companyPay ' + showHandimgOrange + ' companyPay-mostPreferred">' + get_lan('hotelList').protocol2 + '</div>\
                            <div class="companyPay ' + showHandImg + ' companyPay-corporate">' + get_lan('hotelList').protocol + '</div>\
                        </div>\
                        <div class="hotelLiInfo">\
                            <div class="hotelLiDistance '+ showDistance + '">' + get_lan('hotelList').distance1 + ' ' + item.HotelDistance + get_lan('hotelList').distance2 + '</div>\
                            <div class="hotelLiAddress">\
                                ' + item.HotelAddress + '\
                            </div>\
                            <div class="hotelLiTelephone">'+ item.HotelPhone + '</div>\
                        </div>\
                        <div class="eTravel_grade">\
                            <span class="eTravel_Score '+ showHotelLiScore + '">' + item.HotelRating + '</span>\
                            <span class="eTravel_Grade">'+ grade + '</span>\
                        </div>\
                    </section>\
                </div>\
                ' + detailPart + '\
            </div>\
        ')
        /*积分*/
        var PointValue = '';
        if (ProfileInfo.PointInfo && ProfileInfo.PointInfo.PointRuleList) {
            ProfileInfo.PointInfo.PointRuleList.map(function (item) {
                if (searchHotelInfo.hotelState == "intlHotel") {
                    if (item.PointTypeId == 3 && (item.RegionType == "ALL" || item.RegionType == "I") && (item.PointServiceType == 0 || item.PointServiceType == 2)) {
                        PointValue = item.PointValue;
                    }
                } else {
                    if (item.PointTypeId == 3 && (item.RegionType == "ALL" || item.RegionType == "D") && (item.PointServiceType == 0 || item.PointServiceType == 2)) {
                        PointValue = item.PointValue;
                    }
                }
            })
            if (PointValue != '' && (showHandImg != "hide" || showHandimgOrange != "hide")) {
                if (!ProfileInfo.PointHoney) {
                    $(".list_points").eq(index).removeClass("hide");
                    $(".list_points").eq(index).text("+" + PointValue + get_lan("points"));
                }
            }
        }
        /*end*/
        var oneStarWidth = 14
        var hotelLiStarWidth = (parseInt(item.StarLevel) * oneStarWidth) + 'px'
        $('.hotelLiStar').eq(index).css('width', hotelLiStarWidth)
        if (hotelLiStarWidth === '0px') {
            $(".hotelLiStar").eq(index).addClass('hide')
        }
        // 是否存在半星  item.ExtStarLevel=5
        if (!(item.ExtStarLevel > 0)) {
            $('.hotelLiStarHalf').eq(index).css('display', 'none')
        }
    })
    $(".mapIcon").unbind("click").click(function () {
        // 百度地图API功能
        $(".mapBody").removeClass("hide");
        var map = new BMap.Map("map");    // 创建Map实例
        $("#cover").css("display", "block");
        var Longitude = parseFloat($(this).attr("Longitude"));
        var Laitude = parseFloat($(this).attr("Laitude"));
        var hotelName = $(this).attr("name");
        var hotelAddress = $(this).attr("address");
        var hotelPhone = $(this).attr("telePhone");
        var imgSrc = $(this).attr("imgSrc");
        $(".mapTittleText,#cover").unbind("click").click(function () {
            $(".mapBody").addClass("hide");
            $("#cover").css("display", "none");
        })
        // 百度地图API功能
        var poi = new BMap.Point(Longitude, Laitude);
        map.centerAndZoom(poi, 16);
        map.enableScrollWheelZoom();
        setTimeout(function () {
            var convertor = new BMap.Convertor();
            var pointArr = [];
            pointArr.push(poi);
            convertor.translate(pointArr, 3, 5, translateCallback)
        }, 50);
        //坐标转换完之后的回调函数
        translateCallback = function (data) {
            if (data.status === 0) {
                var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="' + imgSrc + '" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    '地址：' + hotelAddress + '<br/>电话：' + hotelPhone + '<br/>' +
                    '</div>';

                //创建检索信息窗口对象
                var searchInfoWindow = null;
                searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                    title: hotelName,      //标题
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
                var marker = new BMap.Marker(data.points[0]); //创建marker对象
                marker.addEventListener("click", function (e) {
                    searchInfoWindow.open(marker);
                })
                map.addOverlay(marker); //在地图中添加mark
                map.setCenter(data.points[0]);
            }
        }
    })
    clickHotelLi();
}
function clickHotelLi() {
    $(".searchHotelDetailBtn,.hotelLiName,.mapboxViewDetailBtn").unbind("click").click(function () {
        if($(this).attr('noRoom') === 'true') {
            return
        }
        var detailQueryKey = queryKeyList[4] + ',' + queryKeyList[5] + ',' + $(this).attr("hotelId") + ',' + $(this).attr("citycode") + ',' + $(this).attr("hotelType");
        var hotelDetailInfo = {
            'queryKey': detailQueryKey,
            'LocationType': $(this).attr("LocationType"),
            'companyCorporate': $(this).attr("companyCorporate")
        }
        $.cookie('hotelDetailInfo', JSON.stringify(hotelDetailInfo));
        clearInterval(closeClock)
        if (detailWindow) { detailWindow.close() };
        detailWindow = window.open('../../hotel/hotelDetail.html', '');

        closeClock = setInterval(function () {
            if ($.cookie('closeParentTab')) {
                window.close()
            }
        }, 200)
    })
}
window.onbeforeunload = function (e) {
    //查看详情打开新页面
    if (detailWindow && !$.cookie('closeParentTab')) {
        detailWindow.close()
    } else {
        $.removeCookie('closeParentTab')   // 如果预订成功，就不销毁
    }
}

// 2020.1.10新增 瀑布流
function checkScrollSlide() {
    // 获取最后一个模块的位置
    var index = $('.hotelLi').length;
    if (index == 0) {
        return false
    }
    // 加不加上最后一个元素的高度 offsetHeight
    var lastBoxH = $('.hotelLi')[index - 1].offsetTop
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var totalH = scrollTop + document.documentElement.clientHeight;
    return (lastBoxH <= totalH) ? true : false;
}
window.onscroll = function () {
    if (checkScrollSlide() && ((SabreShopKey != '' && SabreShopKey != null) || (LocalShopKey != '' && LocalShopKey != null))) {
        if (!getNextPage) {
            getNextPage = true;
            var onlyFunXun = 0;
            if ($('#filter_other_companyBill').is(':checked')) {
                onlyFunXun = 1;
            }
            nextHotelList(onlyFunXun);
        }
    }
}
window.onscroll = function () {
    //清除弹窗
    $('.searchStarBody').closePopWindow(300, $('.search_filter-box'))
    $('.searchPriceBody').closePopWindow(300, $('.search_filter-box'))
    $('.hamb_menu_wrapper').closePopWindow(300)
    // 筛选固定

    var filterOffsetTop = $('.allMapBtn').offset().top + $('.allMapBtn').height()
    if (document.documentElement.scrollTop >= filterOffsetTop && $('.hotelList').height() > $('.filter_wrapper').height()) {
        $('.filter_wrapper').addClass('fixed').css('height', window.innerHeight + 'px')
        if (document.documentElement.scrollLeft >= 25) {
            $('.filter_switch').addClass('show')
            $('.filter_switch').unbind('click').on('click', function () {
                $('.filter_wrapper').toggleClass('close')
                $('.filter_switch').toggleClass('close')
                $('.filter_box').toggleClass('hide')
            })
        } else {
            $('.filter_switch').removeClass('show close')
            $('.filter_wrapper').removeClass('close')
            $('.filter_box').removeClass('hide')
        }
    } else {
        $('.filter_wrapper').removeClass('fixed').css('height', '')
        $('.filter_switch').removeClass('show close')
        $('.filter_wrapper').removeClass('close')
        $('.filter_box').removeClass('hide')
    }
}
window.onresize = function () {
    if ($('.filter_wrapper').hasClass('fixed')) {
        $('.filter_wrapper').css('height', window.innerHeight + 'px')
    }
}


// 翻页
function nextHotelList(onlyFuXun) {
    // tools.searchLoadingShow()

    var jsonDate = {
        request: {
            QueryKey: queryKey,
            Uid: netUserId.split('\"')[1],
            ShopKey: SabreShopKey,
            Index: pageIndex,
            LocalKey: LocalShopKey || "",
            Language: obtLanguage,
            OnlyFuXun: onlyFuXun
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
        success: function (data) {
            getNextPage = false;
            // tools.searchLoadingHide()
            var res = JSON.parse(data);
            console.log(res);
            // resAll=res //不需要再次缓存

            SabreShopKey = res.SabreShopKey;
            LocalShopKey = res.LocalShopKey;
            if ((SabreShopKey == '' || SabreShopKey == null) && (LocalShopKey == '' || LocalShopKey == null)) {
                $('.loadingSpan').hide()
                $('.listEnd .textSpan').text(get_lan('noMore'))
            } else {
                $('.loadingSpan').show()
                $('.listEnd .textSpan').text(get_lan('loading'))
                pageIndex++
            }

            res.hotels.map(function (item) {
                cacheHotelList.push(item);
            })

            var breakfast = $('#filter_other_breakfast').is(':checked')
            var freeCancel = $('#filter_other_cancelable').is(':checked')
            var noGuarantee = $('#filter_other_noGurantee').is(':checked')
            var protocol = $('#filter_other_protocol').is(':checked')
            // 含早
            if (breakfast) {
                res.hotels = res.hotels.filter(function (item) {
                    if (item.Breakfast > 0) {
                        return item;
                    }
                })
            }
            //免费取消
            if (freeCancel) {
                res.hotels = res.hotels.filter(function (item) {
                    if (item.CancelRuleType > 0) {
                        return item;
                    }
                })
            }
            // 免担保
            if (noGuarantee) {
                res.hotels = res.hotels.filter(function (item) {
                    if (item.NotNeedGarantee) {
                        return item;
                    }
                })
            }
            //协议酒店
            if (protocol) {
                res.hotels = res.hotels.filter(function (item) {
                    if (item.IsAgreement || item.IsTMCAgreement) {
                        return item;
                    }
                })
            }
            //排序
            if (res.hotels.length == 0) {
                $('.loadingSpan').hide()
                $('.listEnd .textSpan').text(get_lan('noMore'))
                return false;
            }
            if (breakfast || freeCancel || noGuarantee || protocol) {
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

        },
        error: function () {
            getNextPage = false;
        }
    });
}
