var netUserId = $.session.get('netLoginId');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
var TAnumber = $.session.get('TAnumber');
var TAnumberIndex = $.session.get('TAnumberIndex');
console.log(ProfileInfo)

var TAminDate=0,TAmaxDate=365
	if(TAnumber!=undefined && TAnumber!="" && $.session.get('goOnBooktravelInfo')!=undefined && $.session.get('goOnBooktravelInfo')!=""){
		var goOnBooktravelInfo=JSON.parse($.session.get('goOnBooktravelInfo'));
		// TAminDate=goOnBooktravelInfo.starTime.split(" ")[0]
		TAminDate=Dateformat(goOnBooktravelInfo.starTime.split(" ")[0],0)
		TAmaxDate=goOnBooktravelInfo.endTime.split(" ")[0]
	}
//货币单位
var curreny= ProfileInfo.OfficeCurrency? ProfileInfo.OfficeCurrency : "￥"

$(function(){
    showContent();//内容展示
    searchBody();//搜索部分
    myOrderTableInfo();
})
//语言转换
function get_lan(m)
{
    //获取文字
    var lan = $.session.get('obtLanguage');     //语言版本
    //选取语言文字
    switch(lan){
        case 'CN':
            var t = cn[m];
            break;
        case 'EN':
            var t = en[m];
            break;
        default:
            var t = cn[m];
    }
    //如果所选语言的json中没有此内容就选取其他语言显示
    if(t==undefined) t = cn[m];
    if(t==undefined) t = en[m];
    return t;
}
//中英文对象
var cn = {
    'searchBody': {
		'airDom': '国内机票',
		'airIntl': '国际机票',
		'hotel': '酒店',
		'train': '火车',
		'car': '租车',
		'visa': '签证',
		'oneWay': '单程',
		'roundTrip': '往返',
		"Multiple": "多段",
		'from': '出发城市',
		'to': '到达城市',
		'departure': '出发城市',
		'arrival': '到达城市',
		'departureDate': '出发日期',
		'returnDate': '回程日期',
		'departureTime': '出发时间',
		'returnTime': '回程时间',
		'cabin': '舱位类型',
		'search': '搜索',
		'cabins': {
			// 'cabin1': '不限',
			'cabin1': '全部',
			'cabin2': '经济舱',
			'cabin3': '公务舱',
			'cabin4': '头等舱',
			'cabin5': '公务舱/头等舱',
			'cabin6': "超级经济舱",
		},
		'switch': '换',
		'trainNo': '车次查询',
		'trainNoText': '请输入查询车次',
		'hotelCity': '入住城市',
		'hotelCityInput': '请输入入住城市',
		'hotelCheckInDate': '入住日期',
		'hotelCheckOutDate': '离店日期',
		'hotelPrice': '金额',
		'all': '全部',
		'hotelAddress': '位置',
		'hotelRank': '酒店星级',
		'hotelKeyWords': '关键字',
		'hotelKeyInput': '(选填)酒店名/地标/商圈/地铁线',
		'keyWordRemind': '请先选择城市',
		'isDirect': '仅查询直飞',
		'codeShare': '代码共享航班',
		'addAirIntl': "添加航程",
		'multipleRemind': "请先填写完",
		'domHotel': "国内",
		'intlHotel': "国际",
		'allDay': "全天",
		'addTransit': "指定转机",
		'transit': "转机城市",
		'transitRemind': "转机城市(选填)",
		'carFrom': "取车地点",
		'carTO': "还车地点",
		'carFromDate': "取车日期",
		'carToDate': "还车日期",
		'carCompany': "租车公司",
	},
    'keyWordBody':{
        'hotel':'推荐酒店',
        'brand':'品牌',
        'district':'行政区',
        'commercial':'商圈',
        'extCommercial':'附属商圈',
    },
    'searchRemind':'请正确填写！',
    'tableRemind':'您暂无有效订单!',
    'tableRemind2':'您暂无待审核订单!',
    'table':{
        'myOrders':'我的订单',
        'pendingApproval':'待审核订单',
        'more':'更多订单',
        'type':'类型',
        'orderNumber':'订单号',
        'traveler':'旅客',
        'roundTime':'行程时间',
        'shift':'班次',
        'price':'价格',
        'route':'行程',
        'status':'订单状态',
        "approval":"提交审核",
        "applyDate":"申请时间",
        "operation":"操作",
        "agree":"同意",
        "deny":"拒绝",
    },
    'expiration':'证件过期提醒',
    'footer':{
        'industryNews':'业界动态',
        'companyNews':'公司新闻',
    },
    'accountRemind':'账号过期，请重新登陆',
    'contactType':"技术支持，请联系 BCD helpdesk：021-61327099 &nbsp;9:00-18:00(工作日)",
}
var en = {
    'searchBody': {
		'airDom': 'Air Domestic',
		'airIntl': 'Air International',
		'hotel': 'Hotel',
		'train': 'Rail',
		'car': 'Car',
		'visa': 'Visa',
		'oneWay': 'One-way',
		'roundTrip': 'Round-trip',
		"Multiple": "Multiple",
		'from': 'From',
		'to': 'To',
		'departure': 'Departure',
		'arrival': 'Arrival',
		'departureDate': 'Departure',
		'returnDate': 'Return',
		'departureTime': 'Dep Time',
		'returnTime': 'Return Time',
		'cabin': 'Class',
		'search': 'Search',
		'cabins': {
			'cabin1': 'All Classes',
			'cabin2': 'Economy',
			'cabin3': 'Business',
			'cabin4': 'First',
			'cabin5': 'Business/First',
			'cabin6': "Economy Extra",
		},
		'switch': 'Switch',
		'trainNo': 'Train no.',
		'trainNoText': 'e.g K8410',
		'hotelCity': 'Destination',
		'hotelCityInput': 'Please enter the city for checking in.',
		'hotelCheckInDate': 'Check-in',
		'hotelCheckOutDate': 'Check-out',
		'hotelPrice': 'Price',
		'all': 'All',
		'hotelAddress': 'Location',
		'hotelRank': 'Rank',
		'hotelKeyWords': 'Key Words',
		'hotelKeyInput': 'Hotel Name/Landmark/Business Circle/Metro Line',
		'keyWordRemind': 'Please choose the city first.',
		'isDirect': 'Direct Flight',
		'codeShare': 'Codeshare',
		'addAirIntl': "Add Segment",
		'multipleRemind': "Please fill out first.",
		'domHotel': "Domestic",
		'intlHotel': "International/Regional",
		'allDay': "All Day",
		'addTransit': "Add Transit",
		'transit': "Transit",
		'transitRemind': "Transit(Optional)",
		'carFrom': "Pick-up",
		'carTO': "Drop-off",
		'carFromDate': "Pick-up Date",
		'carToDate': "Drop-off Date",
		// 'carCompany': "Car Company",
		'carCompany': "Car Rental Company",
	},
    'keyWordBody':{
        'hotel':'Recommended Hotel',
        'brand':'Brand',
        'district':'District',
        'commercial':'Business Area',
        'extCommercial':'Land Mark',
    },
    'searchRemind':'Please fill in correctly!',
    'tableRemind':'You have no valid orders !',
    'tableRemind2':'You have no pending approvals !',
    'table':{
        'myOrders':'My Orders',
        'pendingApproval':'Pending Approval',
        'more':'More',
        'type':'Type',
        'orderNumber':'Order Number',
        'traveler':'Traveler',
        'roundTime':'Travel Time',
        'shift':'',
        'price':'Price',
        'route':'Route',
        'status':'Status',
        "approval":"Submit Audit",
        "applyDate":"Apply Date",
        "operation":"Approval",
        "agree":"Approve",
        "deny":"Reject",
    },
    'expiration':'Expiration',
    'footer':{
        'industryNews':'Industry News',
        'companyNews':'Company News',
    },
    'accountRemind':'Account expired, please re login.',
    'contactType':"For technical support, please contact BCD helpdesk：021-61327099 &nbsp;9:00-18:00(working day)",
}
//内容展示
function showContent(){
    //<img src="../index/images/bgImg.jpg" class="bgImg">
    $("#main").html('\
        <article>\
            <div style="position: relative;height: 340px;">\
                <img class="bannerImg" src="" style="width:100%;height:340px;">\
                <div class="bgShadow"></div>\
                <div class="bgBody">\
                    <div class="autoCenter">\
                      <div class="searchBody"></div>\
                    </div>\
                </div>\
            </div>\
            <div class="orderTittle flexRow autoCenter">\
                <div class="myOrderTab orderTittleActive" style="margin: 0 56px 0 13px;">'+get_lan('table').myOrders+'</div>\
                <span style="position: absolute;right: 45px;" class="moreOrderText">\
                    '+get_lan('table').more+'\
                </span>\
                <img src="../index/images/rightArrow.png" class="rightArrow" linkState="myOrders"/>\
            </div>\
            <div class="autoCenter autoScrollY" id="tableBody">\
            </div>\
        </article>\
        <footer>\
            <div class="copyright">\
            </div>\
        </footer>\
    ')
	// if(TAorderNo!=undefined){
	if(TAnumber!=undefined && TAnumber!='' && TAnumberIndex!=undefined && TAnumberIndex!=''){
		console.log('隐藏')
		$('.menu .autoCenter').addClass('hide')
		// $('.orderTittle').addClass('hide')
		// $('.autoScrollY').addClass('hide')
		$('footer').addClass('hide')
		$('.menu').css("height",'40px')
		$('.moreOrderText').hide()
		$('.rightArrow').hide()
		
	}
	
    $(".rightArrow").unbind("click").click(function(){
        if($(this).attr("linkState")=="myOrders"){
            window.location.href = '../../orders/orders.html';
        }
    })
}
// 搜索界面
function searchBody(){
    var showCarRent = ProfileInfo.isCarRental ? "" : "hide";
    //租车
	var enStyle=obtLanguage=="CN"?"":"height:0;line-height:17px";
    $('.searchBody').html(
    '\
    <ul class="tabBar flexRow">\
        <li class="tab Car specificFontColor ' + showCarRent + '">' + get_lan('searchBody').car +
    '</li>\
    </ul>\
    <div class="searchPage carBody">\
      <div class="cityStyle flexRow" style="margin-top:20px;">\
          <div class="cityTittle">' +
    get_lan('searchBody').carFrom +
    '</div>\
          <input autocomplete="off" type="text" id="carDeparture" placeholder="' + get_lan('searchBody')
    .carFrom + '">\
      </div>\
      <div class="cityStyle flexRow">\
          <div class="cityTittle">' +
    get_lan('searchBody').carTO +
    '</div>\
          <input autocomplete="off" type="text" id="carArrival" placeholder="' + get_lan('searchBody').carTO +
    '">\
      </div>\
      <div class="cityStyle flexRow">\
          <div class="cityTittle">' + get_lan(
        'searchBody').carFromDate +
    '</div>\
          <input autocomplete="off" type="text" id="carFromDate" readonly>\
          <select id="carFromHour">\
          </select>\
          <select id="carFromMin">\
            <option value="00">00</option>\
            <option value="30">30</option>\
          </select>\
      </div>\
      <div class="cityStyle flexRow">\
          <div class="cityTittle">' +
    get_lan('searchBody').carToDate +
    '</div>\
          <input autocomplete="off" type="text" id="carToDate" readonly>\
          <select id="carToHour">\
          </select>\
          <select id="carToMin">\
            <option value="00">00</option>\
            <option value="30">30</option>\
          </select>\
      </div>\
      <div class="cityStyle flexRow carLine">\
          <div class="cityTittle" style="'+enStyle+'">' +
    get_lan('searchBody').carCompany +
    '</div>\
          <select id="carCompany"></select>\
      </div>\
      <div class="searchCarBtn btnBackColor">' +
    get_lan('searchBody').search +
    '</div>\
    </div>\
    <div class="searchPage visaBody">\
    </div>\
    ')
    for (var i = 0; i < 24; i++) {
		$("#carFromHour,#carToHour").append('\
            <option value="' + i + '">' + i + '</option>\
            ')
	}
    //<option berthType="">'+get_lan('searchBody').cabins.cabin1+'</option>\
    $(".selectTimeStyle").remove();
    if(obtLanguage=="EN"){
        $(".intlTabBar").css("margin-left","100px");
    }
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/ProfilePost",
            jsonStr:'{"key":'+netUserId+'}'
        },
        success : function(data) {
            var res = JSON.parse(data);
            console.log(res);
            $(".airDom ").hide();
            $(".airIntl ").hide();
            $(".Hotel ").hide();
            $(".Train ").hide();
            $('.searchPage').hide();
            $(".carBody ").show();
            if(!res.isCarRental){
                $(".searchBody").hide();
            }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
	GetImageInfo()
	//获取图片
	function GetImageInfo(){
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/GetCompanyImageInfosWType",
					jsonStr: '{"key":' + netUserId + ',"appType":"WEB"}',
				},
				success: function(data) {
					var res=JSON.parse(data)
					console.log(res);
					if(res.code==200){
						var trainImg=''
						res.CompanyImageList.map(function(item){
							if(item.type==14){
								trainImg=item.path
							}
						})
						if(trainImg==""|| trainImg==null){
							$('.bannerImg').attr('src','../search/images/bgImgTrain.jpg')
						}else{
							$('.bannerImg').attr('src',trainImg)
						}
					}else{
						$('.bannerImg').attr('src','../search/images/bgImgTrain.jpg')
						// alert(res.errMsg)
					}
				},
				error: function() {
					// alert('fail');
				}
			});
	}
    chooseCar(); //租车
}
//租车
function chooseCar() {
	$("#carFromDate").val(GetDateStr(0));
	$("#carToDate").val(GetDateStr(1));
	dateChoose("carFromDate", "carToDate");
	$("#carDeparture").kuCity();
	$("#carArrival").kuCity();
	$("#carFromHour").val(10);
	$("#carToHour").val(10);
    /*租车公司*/
    //隐藏租车公司权限
	if(ProfileInfo.HideCarRentalCompany){
		$('.carLine').remove()
	}
	// 更换接口  GetInformationsPost 换成 GetNewInformationsPost多一个参数id
    if(!ProfileInfo.HideCarRentalCompany){//隐藏租车权限
        $.ajax({
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/SystemService.svc/GetCarRentalCompanyPost",
                jsonStr: '{"id":'+netUserId+',"culture":"' + obtLanguage + '"}'
            },
            success: function(data) {
                var res = JSON.parse(data);
                //   console.log(res);
                // res.CarInformationList.map(function(item) {
                res.map(function(item) {
                    $("#carCompany").append('\
                        <option value="' + item.Code + '">' + item.Name +
                        '</option>\
                        ')
                })
            },
            error: function() {
                // alert('fail');
            }
        });
    }
	$(".searchCarBtn").unbind("click").click(function() {
		if ($('#carDeparture').attr("code") && $('#carArrival').attr("code")) {
			var carCompany=ProfileInfo.HideCarRentalCompany?"":$('#carCompany').val()
			var isCitycar=false;
			if($('#carDeparture').attr('vendervode')!=""){
				carCompany=$('#carDeparture').attr('vendervode')
				isCitycar=true
			}
			if($('#carArrival').attr('vendervode')!=""){
				carCompany=$('#carArrival').attr('vendervode')
				isCitycar=true
			}
			
			var searchCarInfo = {
				'departureCityText': $('#carDeparture').val(),
				'arrivalCityText': $('#carArrival').val(),
				'departureCity': $('#carDeparture').attr("code"),
				'arrivalCity': $('#carArrival').attr("code"),
				'date': $('#carFromDate').val() + ' ' + $("#carFromHour").val() + ':' + $("#carFromMin").val(),
				'returndate': $('#carToDate').val() + ' ' + $("#carToHour").val() + ':' + $("#carToMin").val(),
				'carCompany': carCompany,
				'pickupAdd':$('#carDeparture').attr("locationcode"),
				'returnAdd':$('#carArrival').attr("locationcode"),
				'isCitycar':isCitycar,
			}
			$.session.set('searchCarInfo', JSON.stringify(searchCarInfo));
			window.location.href = '../../car/carList.html';
		} else {
			alert(get_lan('searchRemind'))
		}
	})
}
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

/*交换城市*/
function cityConversion(startCityId,arrivalCityId){
    var startCityText = $('#'+startCityId+'').val();
    var arrivalText = $('#'+arrivalCityId+'').val();
    var startCityCode = $('#'+startCityId+'').attr('code');
    var arrivalCode = $('#'+arrivalCityId+'').attr('code');
    if($('#'+startCityId+'').attr('code')&&$('#'+arrivalCityId+'').attr('code')){
        $('#'+startCityId+'').val(arrivalText);
        $('#'+startCityId+'').attr('code',arrivalCode);
        $('#'+arrivalCityId+'').val(startCityText);
        $('#'+arrivalCityId+'').attr('code',startCityCode);
    }else if(!$('#'+startCityId+'').attr('code')&&$('#'+arrivalCityId+'').attr('code')){
        $('#'+startCityId+'').val(arrivalText);
        $('#'+startCityId+'').attr('code',arrivalCode);
        $('#'+arrivalCityId+'').val('');
        $('#'+arrivalCityId+'').removeAttr('code');
    }else if($('#'+startCityId+'').attr('code')&&!$('#'+arrivalCityId+'').attr('code')){
        $('#'+arrivalCityId+'').val(startCityText);
        $('#'+arrivalCityId+'').attr('code',startCityCode);
        $('#'+startCityId+'').val('');
        $('#'+startCityId+'').removeAttr('code');
    }
}
//日期选择插件
function dateChoose(departure,returnDate){
    var departureValue = new Date($("#"+departure).val().replace(/-/g, "/"));
    $("#"+returnDate).datepicker('destroy');
    $("#"+returnDate).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        minDate: departureValue,  // 当前日期之后的 0 天，就是当天
		maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $( "#"+departure).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
        maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect:function(){
            $(".domDateTittle,.intlDateTittle,.trainDateTittle,#"+returnDate).css('color','#000');
            if(returnDate!="domReturnDate"){
                $("#"+returnDate).css('border','1px solid #000');
            }
            var departureValue = new Date($("#"+departure).val().replace(/-/g, "/"));
            $("#"+returnDate).datepicker('destroy');
            $("#"+returnDate).datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                minDate: departureValue,  // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
                hideIfNoPrevNext: true,
                showOtherMonths: true,
                selectOtherMonths: true,
            });
            $("#"+returnDate).val(getNextDay($("#"+departure).val()));
            if(departure=="hotelDepartureDate"){
                if($(".searchHotelBtn").attr("state")=="domHotel"){
                    var hotelCityCode = $('#hotelCity').attr("code");
                }else if($(".searchHotelBtn").attr("state")=="intlHotel"){
                    var hotelCityCode = $('#hotelIntlCity').attr("code");
                }
                if(hotelCityCode){
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
                            jsonStr:'{"cityCode":"'+hotelCityCode+'","id":'+netUserId+',"checkIn":"'+$("#hotelDepartureDate").val()+'","checkOut":"'+$("#hotelReturnDate").val()+'"}'
                        },
                        success : function(data) {
                            var res = JSON.parse(data);
                            console.log(res);
                            $('body').mLoading("hide");
                            $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
                            $("#hotelPrice").attr("minPrice",res.minFare);
                            $("#hotelPrice").attr("maxPrice",res.maxFare);
                        },
                        error : function() {
                          // alert('fail'); 
                        } 
                      }
                    );
                }
            }
        }
    });
}
function getNextDay(d){
        d = new Date(d);
        d.setTime(d.getTime() + 1000*60*60*24);
        var month = (d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
        var day = d.getDate()<10?'0'+d.getDate():d.getDate();
        //格式化
        return d.getFullYear()+"-"+month+"-"+day;
    }
//日期
function GetDateStr(AddDayCount) {
    var dd = new Date(); 
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?'0'+(dd.getMonth()+1):(dd.getMonth()+1);
    var d = dd.getDate()<10?'0'+dd.getDate():dd.getDate();
    return y+"-"+m+"-"+d;
}
//我的订单
function myOrderTableInfo(){
    $("#tableBody").html('\
        <div id="orderTable">\
          <div class="tr flexRow">\
            <div style="width: 130px;padding-left:20px;">'+get_lan('table').orderNumber+'</div>\
            <div style="width: 160px;padding-left: 10px;">'+get_lan('table').traveler+'</div>\
            <div style="width: 40px;"></div>\
            <div style="width: 175px;">'+get_lan('table').roundTime+'</div>\
            <div style="width: 90px;"></div>\
            <div style="width: 380px;">'+get_lan('table').route+'</div>\
            <div style="width: 100px;">'+get_lan('table').price+'</div>\
            <div style="width: 100px;">'+get_lan('table').status+'</div>\
          </div>\
        </div>\
    ')
    $('#tableBody').mLoading("show");
    $.ajax( 
      {
        type:'post', 
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/OrderService.svc/MyTripListPost",
            jsonStr:'{"id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
        },
        success : function(data) {
            if(data != ''){
                var res = JSON.parse(data)
                console.log(res);
                var noTravelData = [];
                res.map(function(item){
                    if(!item.isHistory ){
                        noTravelData.push(item);
                    }
                })
                if(noTravelData.length == 0){
                    $('#tableBody').mLoading("hide");
                    $("#tableBody").html('\
                          <div class="ordersRemind">'+get_lan('tableRemind')+'</div>\
                    ')
                }else{
					var showLine=true
                    noTravelData.map(function(item,index){
                        console.log(item.OrderItems[0].ItemName.length)
						// 2020.1.10 只显示TAorderNo
						if(TAnumber!=undefined  && TAnumberIndex!=undefined && TAnumberIndex!=''){
							if(TAorderNo!=item.OrderNo){
								// return false
								showLine=false
							}else{
								showLine=true
							}
						}
                        var tableCell = item.OrderItems.length>1||item.OrderItems[0].ItemName.length>40?"table-cell":"cellLine";
                        var ShowApproval = item.ShowApproval?"hide":"hide";
                        $("#orderTable").append('\
                            <div class="flexRow" style="border-bottom:1px solid #d8d8d8;">\
                               <div class="ellipsis" style="width: 130px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left:20px;"><span class="orderNoClick specificFontColor '+tableCell+'" style="text-decoration:underline;cursor:pointer;">'+item.OrderNo+'</span></div>\
                               <div class="ellipsis" style="width: 160px;border-right:1px solid #d8d8d8;box-sizing:border-box;padding-left: 10px;"><span class="'+tableCell+'">'+item.OrderCustomer+'</span></div>\
                               <table class="orderDetailsTable" border="0">\
                                 <tr>\
                                   <th style="width:30px;"></th>\
                                   <th style="width:200px;"></th>\
                                   <th style="width:75px;"></th>\
                                   <th style="width:380px;"></th>\
                                   <th style="width:100px;"></th>\
                                   <th style="width:100px;"></th>\
                                 </tr>\
                               </table>\
                               <div style="width: 100px;" class="hide">\
                                 <div class="submit '+tableCell+' '+ShowApproval+'" orderNumber="'+item.OrderNo+'">'+get_lan('table').approval+'</div>\
                               </div>\
                            </div>\
                        ')
                      item.OrderItems.map(function(aitem){
                          var liIcon;
                          switch(aitem.ItemType)
                          {
                            case '1':
                            liIcon="planeIcon"
                            break;
                            case '2':
                            liIcon="hotelIcon"
                            break;
                            case '3':
                            liIcon="trainIcon"
                            break;
                            case '4':
                            liIcon="carIcon"
                            break;
                          }
                          var stateColor = "#1E66AE";
                          if(ProfileInfo.onlineStyle=="APPLE"){
                            if(aitem.itemState == "已完成" || aitem.itemState == "Completed"||aitem.itemState == "已改签" || aitem.itemState == "Changed"||aitem.itemState == "已确认" || aitem.itemState == "Confirmed"||aitem.itemState == "已退票" || aitem.itemState == "Refunded"){
                                stateColor = "#222";
                            }else{
                                stateColor = "#222";
                            }
                          }else{
                            if(aitem.itemState == "已完成" || aitem.itemState == "Completed"){
                              stateColor = "#1E66AE";
                            }
                            else if(aitem.itemState == "已改签" || aitem.itemState == "Changed"){
                              stateColor = "#1E66AE";
                            }
                            else if(aitem.itemState == "退票中" || aitem.itemState == "Refunding"){
                              stateColor = "#D0021B";
                            }
                            else if(aitem.itemState == "已确认" || aitem.itemState == "Confirmed"){
                              stateColor = "#1E66AE";
                            }
                            else if(aitem.itemState == "未出票" || aitem.itemState == "Reserved"){
                              stateColor = "#F58C06";
                            }
                            else if(aitem.itemState == "已退票" || aitem.itemState == "Refunded"){
                              stateColor = "#1E66AE";
                            }
                            else if(aitem.itemState == "出票中" || aitem.itemState == "In process"){
                              stateColor = "#7ED321";
                            }
                            else if(aitem.itemState == "处理中" || aitem.itemState == "On request"){
                              stateColor = "#7ED321";
                            }
                          }
                          
                          $(".orderDetailsTable").eq(index).append('\
                              <tr class="myOrdersTr">\
                                <td><div class="'+liIcon+'"></div></td>\
                                <td style="padding-left:10px;">'+aitem.ItemDate+'</td>\
                                <td>'+aitem.flightAndTrainNo+'</td>\
                                <td title="'+aitem.ItemName+'">'+aitem.ItemName+'</td>\
                                <td>'+aitem.ItemFare+'</td>\
                                <td style="color:'+stateColor+'">'+aitem.itemState+'</td>\
                              </tr>\
                          ')
                      })
					  if(!showLine){
					  	$('#orderTable .flexRow').eq(index+1).hide()
					  }
                    })
                    altRows(".myOrdersTr");
                    $(".submit").unbind("click").click(function(){
                        var searchOrderInfo = {
                            'orderNo':$(this).attr("orderNumber"),
                            'approval':true,
                        }
                        $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                        window.location.href='../../orders/orderDetails.html';
                    })
                    $('#tableBody').mLoading("hide");
                    // altRows('orderTable');//表格
                    $(".orderNoClick").unbind("click").click(function(){
                        var searchOrderInfo = {
                            'orderNo':$(this).text(),
                        }
                        $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                        window.location.href='../../orders/orderDetails.html';
                    })
                    if(ProfileInfo.NoQueryOrder){
                        $(".orderNoClick").unbind("click");
                        $(".orderNoClick").css("color","#000");
                        $(".orderNoClick").css("text-decoration","none");
                    }
                }
            }else{
                // alert(get_lan('accountRemind'));
                // window.location.href='../../login/loginPage.html';
            }
        },
        error : function() { 
          // alert('fail');
        } 
      } 
    );
}
//表格颜色
function altRows(tr){
    for(i = 0; i < $(tr).length; i++){          
        if(i % 2 == 0){
          $(tr).eq(i).addClass("evenrowcolor");
        }else{
          $(tr).eq(i).addClass("oddrowcolor");
        }      
    }
}
function Dateformat(dateTime,AddDayCount) {
						var dd = new Date(dateTime);
						if(dd.getTime()<new Date().getTime()){
							dd=new Date()
						}
						dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
						// dd.setDate(dd.getDate()); 
						var y = dd.getFullYear();
						var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
						var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
						return y + "-" + m + "-" + d;
					}
// 默认地点
function setCity(){
	var cityObj=JSON.parse($.session.get('goOnBooktravelInfo'))
	console.log(cityObj)
	// 是国内
	if(cityObj.type){
		$('#trainDepartureCity').attr('code',cityObj.ArriveCityCode)
		$('#trainDepartureCity').val($.session.get('obtLanguage')=="CN"?cityObj.ArriveCityCN:cityObj.ArriveCityEN)
		$('#trainArrivalCity').attr('code',cityObj.leaveCityCode)
		$('#trainArrivalCity').val($.session.get('obtLanguage')=="CN"?cityObj.leaveCityCN:cityObj.leaveCityEN)
		setTimeout(function(){
			$('#trainDepartureDate').val(Dateformat(cityObj.starTime,0))
			$('#trainReturnDate').val(Dateformat(cityObj.starTime,1))
		},100)
	}
}