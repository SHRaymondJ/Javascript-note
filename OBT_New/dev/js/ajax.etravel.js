function __ajax_post_function(url, obj, success_callback, error_callback, async) {
    if (typeof (async) != 'boolean') {
        async = true;
    }
    $.ajax(
        {
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            async: async,
            data: {
                url: $.session.get('obtCompany') + url,
                jsonStr: JSON.stringify(obj)
            },
            success: function (data) {
                if (data != "") {
                    var res = JSON.parse(data);
                    console.log(res)
                    success_callback(res);
                } else {
                    throw new Error('data from ' + url + ' is empty');
                }
            },
            error: function (data) {
                error_callback(data);
            }
        }
    );
}
var error_msg = function(data){
    console.log(data);
}
// profile
//作用：获取profile
//jsonObj：{key: }
function ajax_getProfile(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/ProfilePost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback, false);
}

// 国内机票
//airTicketList.js
//作用
//jsonObj: {}
function ajax_domesticSegmentsSearchWCodes(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/GetDomesticSegmentsNew"
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：
//jsonObj: {id:}
function ajax_interAirLine(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/InterAirLinePost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：
//jsonObj：{id: ,searchType: ,segmentIndex: }
function ajax_getAirQuery(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/GetAirQueryConditions";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：
//jsonObj：{request: {orgCity: ,id: ,dstCity: ,Flight: ,departureTime: ,roundType: ,isLanguage: ,minFare: ,maxFare: ,orgCabinCode: }}
function ajax_queryCabins(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/QueryCabinsNew";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：判断是否是最低价
//jsonObj：{airlineCode: ,id: }
function ajax_isLowestAirline(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/IsLowestAirline";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：
//jsonObj：{paramKey: , id: ,Language: }
function ajax_cheapestSegment(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/CheapestSegmentPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：
//jsonObj：{flightNumber: , id: ,departureDate: ,airlineCode: ,Language: }
function ajax_getStopInfo(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/GetStopInfoPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}


//oneWayRelPage.js
//作用：查询该城市有没有接机服务
//jsonObj：{id: , Language: ,queryKey: ,airlineCode: ,Language: }
function ajax_getCityHasCar(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/GetCityHasCarPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：
//jsonObj：{id: , Language: ,orgAirInfo: ,queryKey: }
function ajax_getUseCarPrice(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/GetUseCarPricePost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：获取保险信息
//jsonObj：{id: , Language: }
function ajax_getInsuranceType(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/GetInsuranceTypePost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：检查是否重复下单
//jsonObj：{id: , segmentKey: ,Language: }
function ajax_checkRepeatOrder(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/OrderService.svc/CheckRepeatOrderBookStrictPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//作用：检查审批单
function ajax_checkTripCompareTA(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/OrderService.svc/CheckTripCompareTA";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：检查乘客信息是否合格
//jsonObj：{id: , segmentKey: }
function ajax_checkCustomer(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/CheckCustomersPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//作用：不含保险的代订国内机票
//jsonObj：{id: , documentNumbers: ,segmentKey: ,otherKey: ,frequentCards: ,remarkKey: ,resource: ,orgTicketInfo: ,isDirectTicket: ,carTaxiInfo: ,Language: ,}
function ajax_bookTicket(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/OrderService.svc/BookNewCorrectWTicketPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//作用：含保险的代订国内机票
//jsonObj：{id: , documentNumbers: ,segmentKey: ,otherKey: ,frequentCards: ,remarkKey: ,resource: ,orgTicketInfo: ,isDirectTicket: ,carTaxiInfo: ,Language: ,insuranceKey: }
function ajax_bookTicket_Insurance(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/OrderService.svc/BookNewCorrectForInsuranceWTicketPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//作用：含保险的自己预订国内机票
//jsonObj：{id: , documentNumbers: ,segmentKey: ,otherKey: ,frequentCards: ,remarkKey: ,resource: ,orgTicketInfo: ,isDirectTicket: ,carTaxiInfo: ,Language: ,insuranceKey: }
function ajax_bookTicketSelf_Insurance(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/OrderService.svc/BookNewForInsuranceTemporaryWTicketPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//作用：不含保险的自己预订国内机票
//jsonObj：{id: , documentNumbers: ,segmentKey: ,otherKey: ,frequentCards: ,remarkKey: ,resource: ,orgTicketInfo: ,isDirectTicket: ,carTaxiInfo: ,Language: ,insuranceKey: }
function ajax_bookTicketSelf(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/OrderService.svc/BookNewTemporaryWTicketPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//作用：继续预定用，把票订到订单下
//jsonObj：{id: , bcn: ,Language: ,itemID: ,queryKey: ,reginType: ,dstCode: }
function ajax_setBookingOrder(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/BookInOneOrderNew";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//orderPage.js
//作用：通过八位员工号获取简单的profile权限
//jsonObj: {id:loginId, customerId: 要查询的员工的8位工号}
function ajax_getSimpleProfile(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/GetSimpleProfile";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}


//airRemarkPage.js
//作用：新增有审核单的乘客
//jsonObj: {queryKey: , remarks: ,id: ,Language}
function ajax_addCustomerWithTravelRequest(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/AddTravelRequestCustomerPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//作用：新增无审核单的乘客
//jsonObj: {key: , customerId: ,companyId: ,remarks: ,isCopy}
function ajax_addCustomerWithoutTravelRequest(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/AddOrderCustomerNewPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//oneWayFinalPage.js
//作用：普通加人
// jsonObj: {request:{
//     key:netUserId.split('\"')[1],
//     companyId:CompanyID,
//     customerId:CustomerID,
//     remarks:remarks.substring(0,remarks.length-1),
//     isCopy:isCopy,
//     language:obtLanguage,
//     orgOrderNo:''
//   }}
function ajax_addCustomerNormal(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/AddOrderCustomer";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//作用：预订界面获取乘客证件信息接口
//jsonObj: {key: , Language: }
function ajax_getPassengersInOrder(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/CurrentPassengersInOrderPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//作用：open票查询
//jsonObj: {string id, string customerIds, string orgCity, string dstCity, string roundType, string airline, string Language }
function ajax_queryOpenTicketExist(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/QueryOpenTicketExistNew";
    __ajax_post_function(url, jsonObj, success_callback, error_callback, false);
}

//order pages
//作用：匹配审批单关联的订单
//jsonObj: {key: , TANo: ,Language: }
//return: 匹配的单号
function ajax_compareOrderForTA(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/IsComparedOrderForTA";
    var matchedList = {};
    __ajax_post_function(url, jsonObj, function (res) { matchedList = res; }, error_callback, false);
    return matchedList;
}
//trainticket page
//作用：火车更新个人信息
//jsonObj: {request:{}}
function ajax_updateCustomerInfo(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/CustomerInfoUpdateOrAddNewPost";
    __ajax_post_function(url, jsonObj, success_callback, error_callback, false);
}
//trainticket page
//作用：火车12306账号验证
//jsonObj: {key, customerID, docmentType, docmentNo, captchaCode, Language}
function ajax_checkFor12306(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/TrainCheckFor12306";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}
//trainticket page
//作用：查看人员基础配置
//jsonObj: {uid}
function ajax_queryBasicConfig(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/QueryBasicConfigInfo";
    __ajax_post_function(url, jsonObj, success_callback, error_callback,false);
}
//trainticket page
//作用：常旅手机号核验接口
// jsonObj: {
//     accountNo,  //12306登录账号
//     queryType,  //查询类型 0.本地查询 1.实时查询
//     passType,   //乘客类型 1.成人 2.儿童 3.学生 4.残军
//     passengerName,//乘客姓名
//     certType,   //证件类型  1.身份证 2.护照 3.港澳通行证 5.其他 6.台胞证/回乡证
//     certNo      //证件号码
// }
function ajax_getTravelerVerifyResult(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/QueryService.svc/getTravelerVerifyResult";
    __ajax_post_function(url, jsonObj, success_callback, error_callback);
}

//预订界面获取乘客证件信息
//jsonObj: {key:, regionType:, dstCode:, Language:} 
//reginType ：订单行程类型，国际传“I”国内“D”
//dstCode: 目的地三字码
//两个参数都传会对乘客证件信息进行排序，如果无需排序，传“”即可
function ajax_getPassengersInOrder(jsonObj, success_callback, error_callback) {
    var error_callback = error_callback || error_msg;
    var url = "/SystemService.svc/CurrentPassengersInOrderNew";
    __ajax_post_function(url, jsonObj, success_callback, error_callback, false);
}
//pending
