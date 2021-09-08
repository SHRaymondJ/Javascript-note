var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));

var cn = {
    "otherApplication":"新建其他申请单",
    "changeApplication":"修改其他申请单",
    "Traveler":"差旅人",
    "createOtherBody":{
        "type":"类型",
        "area":"区域",
        "city":"城市",
        "travelTime":"行程时间",
        "estimatedCost":"估计费用",
        "remark":"备注",
        "add":"添加",
        "totalCost":"预估总额:",
        "dom":"国内",
        "intl":"国际",
    },
    "passengerPop":{
      "popMail":"邮箱:",
      "popDocuments":"证件信息:",
    },
    "passengerInfo":{
      "passengerTittle":"旅客信息",
      "remarks":"账单信息",
      "changePassengerInfo":"[修改信息]",
      "choosePassenger":"选择旅客",
      "selectPassengerRemind":"查找代订旅客 可输入姓名",
      "selectPassengerSearch":"搜索",
      "commonPassengers":"常用代订旅客",
      "chooseResidents":"选择同住人",
      "ResidentsName":"同住人：",
      "selectResidentsRemind":"查找同住人 可输入姓名/邮箱",
      'delMsg':'是否删除该订单中此旅客?',
      'addNewCustomer':"[添加新旅客]",
  },
  "remarkPop":{
    "businessTripTittle":"出差信息：",
    "remarkInfoTittle":"备注信息：",
    "tripNameTittle":"员工姓名",
    "tripCompanyTittle":"公司",
    "confirm":"确认",
    "cancel":"取消",
    "companyRemindTittle":"温馨提示",
    "companyRemindText":"因为您已更换出差公司，请确认更改后的公司抬头信息是否正确。",
    "Choose":"请选择",
    "search":"请搜索",
    "remarkRemind":"请将红色备注项填写完整",
    "remarkInfoRemind":"红色标志为必填项",
  },
  "save":"保存",
  "saveRemind":"请正确填写",
}

var en = {
    "otherApplication":"Create Other Application Form",
    "changeApplication":"Change Other Application Form",
    "Traveler":"Traveler",
    "createOtherBody":{
        "type":"Type",
        "area":"Area",
        "city":"City",
        "travelTime":"Travel Time",
        "estimatedCost":"Estimated Cost",
        "remark":"Remark",
        "add":"Add",
        "totalCost":"Estimated Total Cost:",
        "dom":"Dom",
        "intl":"Rgl/Intl",
    },
    "passengerPop":{
      "popMail":"Email:",
      "popDocuments":"Document:",
    },
    "passengerInfo":{
      "passengerTittle":"Traveler Information",
      "remarks":"Billing Information",
      "changePassengerInfo":"[Modify]",
      "choosePassenger":"Select Traveler",
      "selectPassengerRemind":"Enter First Name to search traveler",
      "selectPassengerSearch":"Search",
      "commonPassengers":"Common Traveler",
      "chooseResidents":"Select Roommate",
      "ResidentsName":"Roommate：",
      "selectResidentsRemind":"Enter Name/Email to search roommates",
      'delMsg':'Do you want to remove this traveler from this order?',
      'addNewCustomer':"[Add new travelers]",
    },
    "remarkPop":{
      "businessTripTittle":"Travel Information：",
      "remarkInfoTittle":"Remarks：",
      "tripNameTittle":"Employee Name",
      "tripCompanyTittle":"Company",
      "confirm":"Confirm",
      "cancel":"Cancel",
      "companyRemindTittle":"Kindly Reminder",
      "companyRemindText":"Because you have changed the travel company, please confirm whether the company's information is correct after the change.",
      "Choose":"Please Select",
      "search":"Please Search",
      "remarkRemind":"Please complete the mandatory remark.",
      "remarkInfoRemind":"The remark in red is mandatory.",
    },
    "save":"Save",
    "saveRemind":"Please fill in correctly.",
}

function get_lan(m) {
	//获取文字
	var lan = $.session.get('obtLanguage'); //语言版本
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
	showContent(); //内容展示
});

function showContent() {
  $(".remarkPop").html('\
	    <div class="businessTripTittle tittleBackColor">'+get_lan('remarkPop').businessTripTittle+'</div>\
	    <div class="businessTripBody"></div>\
	    <div class="remarkInfoTittle tittleBackColor">'+get_lan('remarkPop').remarkInfoTittle+'</div>\
	    <div style="padding-bottom:10px;border-bottom:1px solid #f3f3f3;">\
          <div class="remarkInfoBody autoScrollY"></div>\
        </div>\
        <div class="colorRed" style="box-sizing:border-box;padding-left:20px;font-size:14px;height: 19px;line-height: 19px;">'+get_lan('remarkPop').remarkInfoRemind+'</div>\
	    <div class="remarkFooter flexRow">\
      </div>\
	')
  $("#main").html('\
    <div class="autoCenter">\
       <div class="tittle">'+get_lan("otherApplication")+'</div>\
       <div class="addTab flexRow">\
        <div style="width:140px;padding-left:8px;box-sizing: border-box;">'+get_lan("createOtherBody").type+'</div>\
        <div style="width:110px;" class="hide">'+get_lan("createOtherBody").area+'</div>\
        <div style="width:285px;">'+get_lan("createOtherBody").city+'</div>\
        <div style="width:285px;">'+get_lan("createOtherBody").travelTime+'</div>\
        <div style="width:160px;">'+get_lan("createOtherBody").estimatedCost+'('+ProfileInfo.OfficeCurrency+')</div>\
        <div style="width:200px;">'+get_lan("createOtherBody").remark+'</div>\
       </div>\
       <div class="createOtherBody">\
       </div>\
       <div class="addBtn">'+'+ '+get_lan("createOtherBody").add+'</div>\
       <div class="priceBody">\
        '+get_lan("createOtherBody").totalCost+'\
        <span class="totalCost" font-size:20px;color:#FF7A00></span>\
       </div>\
       <div class="tittle passengerTittle" style="margin-top:33px;">'+get_lan("Traveler")+'</div>\
       <div class="passengerBody">\
          <div class="choosePassengerBody flexRow activeFontColor">\
          </div>\
          <div class="passengerBar flexRow">\
              <div class="passengerBarLi" style="width:250px;box-sizing:border-box;padding-left:45px;">'+get_lan('Traveler')+'</div>\
              <div class="passengerBarLi" style="width:300px;">'+get_lan('passengerPop').popDocuments+'</div>\
              <div class="passengerBarLi" style="width:200px;">'+get_lan('passengerPop').popMail+'</div>\
          </div>\
          <div class="passengerList">\
          </div>\
       </div>\
       <div class="saveBtn">'+get_lan("save")+'</div>\
    </div>\
    ')
    createOtherApplication();//创建其他申请单
    if(!$.session.get('changeOtherInfo')){
      $('body').mLoading("show");
      $.ajax(
        {
          type:'post',
          url : $.session.get('ajaxUrl'),
          dataType : 'json',
          data:{
              url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengersPost",
              jsonStr:'{"goAirline":"null","backAirline":"null","newOrder":"0","key":'+netUserId+',"Language":"'+obtLanguage+'"}'
          },
          success : function(data) {
              var res = JSON.parse(data);
              console.log(res);
              $('body').mLoading("hide");
              //备注信息展示
              var employeeName = obtLanguage =="CN"?ProfileInfo.CustomerCN:ProfileInfo.CustomerEN;
              // if(!$.session.get('goOnBookOrderNo')){
                  remarkInfoPop(ProfileInfo.CompanyID,ProfileInfo.ID,employeeName,"true");
              // }
              //有代订权限
              if(res.length > 1){
                  $(".choosePassengerBody").html('\
                      <div style="min-width:110px;">'+get_lan('passengerInfo').choosePassenger+'</div>\
                      <div class="selectPassengerBody">\
                      <input type="text" class="selectPassengerInput" autocomplete="off" placeholder="'+get_lan('passengerInfo').selectPassengerRemind+'">\
                      <div class="selectPassengerSearch btnBackColor">'+get_lan('passengerInfo').selectPassengerSearch+'</div>\
                      <div class="selectPassengerArrow">▼</div>\
                      <div class="selectPassengerList autoScrollY"></div>\
                      </div>\
                      ')
                  $(".remarkFooter").html('\
                      <div class="closeRemarkBtn mainBackColor" style="margin-left:10%;">'+get_lan('remarkPop').cancel+'</div>\
                      <div class="sureRemarkBtn btnBackColor" style="margin-left:38%;">'+get_lan('remarkPop').confirm+'</div>\
                      ')
                  closeRemarkPop();
                  selectPassengers();
              }
              //无代订权限
              else{
                  $(".passengerBody").attr("state","true");
                  $(".choosePassengerBody").hide();
                  // $(".closeRemarkBtn").remove();
                  // $(".sureRemarkBtn").css("margin","0 auto");
                  $(".remarkFooter").html('\
                      <div class="sureRemarkBtn btnBackColor" style="margin:0 auto;">'+get_lan('remarkPop').confirm+'</div>\
                  ')     
              }
          },
          error : function() {
          }
        } 
      );
    }else{
      $(".tittle").text(get_lan("changeApplication"))
    }
    
    $(".saveBtn").unbind("click").click(function(){
      saveTravelRequest();
    })
}
function saveTravelRequest(){
  if(!$.session.get('changeOtherInfo')&&($(".addApplicationLi").length==0||$(".passengerLi").length==0)){
    alert(get_lan("saveRemind"));
  }else if($.session.get('changeOtherInfo')&&$(".addApplicationLi").length==0){
    alert(get_lan("saveRemind"));
  }
  else {
    var canSave = true;
    for(var i=0;i<$(".addApplicationLi").length;i++){
      if(!$(".cityDepart").eq(i).attr("code")||$(".cost").eq(i).val()==""){
        canSave = false;
      }
    }
    if(!canSave){
      alert(get_lan("saveRemind"));
    }else{
      var i = 0;
      otherDataInfo(i);
      function otherDataInfo(i,orderNumber){
        if($(".addCityBody").eq(i).children(".city").length>0){
          var OrgCity = $(".addCityBody").eq(i).children(".city").attr("code");
          var OrgCityName = $(".addCityBody").eq(i).children(".city").val();
          var DstCity = "";
          var DstCityName = "";
        }else{
          var OrgCity = $(".addCityBody").eq(i).children(".cityStart").attr("code");
          var OrgCityName = $(".addCityBody").eq(i).children(".cityStart").val();
          var DstCity = $(".addCityBody").eq(i).children(".cityEnd").attr("code");
          var DstCityName = $(".addCityBody").eq(i).children(".cityEnd").val();
        }
        if($(".addTimeBody").eq(i).children(".time").length>0){
          var StartTime = $(".addTimeBody").eq(i).children(".time").val();
          var EndTime = "";
        }else{
          var StartTime = $(".addTimeBody").eq(i).children(".timeStart").val();
          var EndTime = $(".addTimeBody").eq(i).children(".timeEnd").val();
        }
        if(!$(".addApplicationLi").eq(i).attr("rid")){
          var Operate = 'ADD';
          var rid = '';
        }else{
          var Operate = 'UPDATE';
          var rid = '"Rid":'+$(".addApplicationLi").eq(i).attr("rid")+',';
        }
        if($.session.get('changeOtherInfo')){
          var orderNo = JSON.parse($.session.get('changeOtherInfo')).orderNo;
        }else if(orderNumber){
          var orderNo = orderNumber;
        }else{
          var orderNo = "";
        }
        if($(".requestType").eq(i).find('option:selected').attr("basicType")!="H"){
          var ajaxUrl = $.session.get('obtCompany') + "/OrderService.svc/SaveTravelRequestMiscellInfoPost";
          var request = '{"request":{"BCN":"'+orderNo+'",'+rid+'"id":'+netUserId+',"ProductCodeID":'+$(".requestType").eq(i).val()+',"FlightNo":"","Cabin":"","TrainNo":"","TrainSeat":"","fullRate":"'+ $(".cost").eq(i).val() +'","Currency":"'+ProfileInfo.OfficeCurrency+'","StartTime":"'+StartTime+'","EndTime":"'+EndTime+'","OrgCity":"'+OrgCity+'","DstCity":"'+DstCity+'","OrgCityName":"'+OrgCityName+'","DstCityName":"'+DstCityName+'","Remark":"'+$(".remark").eq(i).val()+'","Language ":"' + obtLanguage + '","Operate":"'+Operate+'"}}'
        }else{
          var ajaxUrl = $.session.get('obtCompany') + "/OrderService.svc/SaveTravelRequestMiscellHPost";
          var request = '{"request":{"BCN":"'+orderNo+'",'+rid+'"id":'+netUserId+',"ProductCodeID":'+$(".requestType").eq(i).val()+',"HotelName":"","RoomType":"","LanType":"","Breakfast":"","fullRate":"'+ $(".cost").eq(i).val() +'","Currency":"'+ProfileInfo.OfficeCurrency+'","CheckIn":"'+StartTime+'","CheckOut":"'+EndTime+'","City":"'+OrgCity+'","CityName":"'+OrgCityName+'","Remark":"'+$(".remark").eq(i).val()+'","Language ":"' + obtLanguage + '","Operate":"'+Operate+'"}}'
        }
        if(i==0){
          $('body').mLoading("show");
          $.ajax(
            {
              type:'post',
              url : $.session.get('ajaxUrl'),
              dataType : 'json',
              data:{
                  url: ajaxUrl,
                  jsonStr:request
              },
              success : function(data) {
                  var res = JSON.parse(data);
                  console.log(res);
                  if(res.code=="Success"||res.code=="200"){
                    setTimeout(function(){
                      $('body').mLoading("hide");
                      console.log(res.data);
                      if($(".addApplicationLi").length==1){
                        /*订单号*/
                        if($.session.get('changeOtherInfo')){
                          var orderNo = JSON.parse($.session.get('changeOtherInfo')).orderNo;
                        }else{
                          var orderNo = res.data;
                        }
                        var searchOrderInfo = {
                          'orderNo': orderNo,
                        }
                        $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                        $.session.remove('changeOtherInfo');
                        console.log($.session.get('searchOrderInfo'));
                        window.location.href = '../../orders/orderDetails.html?state=other';
                      }else if($(".addApplicationLi").length>1){
                        for(var j=1;j<$(".addApplicationLi").length;j++){
                          otherDataInfo(j,res.data);
                        }
                      }
                    },3000)
                  }else{
                    alert(res.message);
                  }
              },
              error : function() {
              }
            } 
          );
        }else{
          SaveTravelRequest(ajaxUrl,request);
        }
      }
    }
  }
}
function SaveTravelRequest(ajaxUrl,request,type){
  $('body').mLoading("show");
  $.ajax(
    {
      type:'post',
      url : $.session.get('ajaxUrl'),
      dataType : 'json',
      data:{
          url: ajaxUrl,
          jsonStr:request
      },
      success : function(data) {
          var res = JSON.parse(data);
          console.log(res);
          if(res.code=="Success"||res.code=="200"){
            setTimeout(function(){
              $('body').mLoading("hide");
              console.log(res.data);
              /*订单号*/
              if($.session.get('changeOtherInfo')){
                var orderNo = JSON.parse($.session.get('changeOtherInfo')).orderNo;
              }else{
                var orderNo = res.data;
              }
              if(type!='del'){
                var searchOrderInfo = {
                  'orderNo': orderNo,
                }
                $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                $.session.remove('changeOtherInfo');
                console.log($.session.get('searchOrderInfo'));
                window.location.href = '../../orders/orderDetails.html?state=other';
              }
            },3000)
          }else{
            alert(res.message);
          }
      },
      error : function() {
      }
    } 
  );
}
function  createOtherApplication(){
  $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'),
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany') + "/SystemService.svc/GetTravelRequestTypeList",
            jsonStr: '{"id":'+netUserId+',"companyId":"'+ ProfileInfo.CompanyID +'","language ":"' + obtLanguage + '"}'
        },
        success : function(data) {
            var res = JSON.parse(data);
            console.log(res);
            var RequestTypeList = res;
            if($.session.get('changeOtherInfo')){
                $(".passengerTittle,.passengerBody").remove();
                console.log(JSON.parse($.session.get('changeOtherInfo')))
                $('body').mLoading("show");
                $.ajax({
                  type: 'post',
                  url: $.session.get('ajaxUrl'),
                  dataType: 'json',
                  data: {
                    url: $.session.get('obtCompany') + "/orderService.svc/GetTravelRequestDetail",
                    jsonStr: '{"orderNo":"' + JSON.parse($.session.get('changeOtherInfo')).orderNo + '","id":' + netUserId + ',"companyId":"' + ProfileInfo.companyId + '","Language":"'+obtLanguage+'"}'
                  },
                  success: function (data) {
                    var res = JSON.parse(data);
                    console.log(res);
                    $('body').mLoading("hide");
                    res.map(function(item,index){
                      if(item.miscellDetails.length>0){
                        addApplicationLi(RequestTypeList,index);
                        var OrgCityName = item.miscellDetails[0].OrgCityName;
                        var OrgCity = item.miscellDetails[0].OrgCity;
                        var DstCityName = item.miscellDetails[0].DstCityName;
                        var DstCity = item.miscellDetails[0].DstCity;
                        var DepTime = item.miscellDetails[0].DepTime.split(' ')[0];
                        var ArrTime = item.miscellDetails[0].ArrTime.split(' ')[0];
                        var rid = item.miscellDetails[0].Rid;
                      }
                      if(item.hotelDetails.length>0){
                        addApplicationLi(RequestTypeList,index);
                        var OrgCityName = item.hotelDetails[0].CityName;
                        var OrgCity = item.hotelDetails[0].City;
                        var DstCityName = '';
                        var DstCity = '';
                        var DepTime = item.hotelDetails[0].CheckIn.split(' ')[0];
                        var ArrTime = item.hotelDetails[0].CheckOut.split(' ')[0];
                        var rid = item.hotelDetails[0].Rid;
                      }
                      $(".requestType").eq(index).val(parseInt(item.ProductCode));
                      $(".requestType").eq(index).trigger("change");
                      $(".cityDepart").eq(index).attr("code",OrgCity);
                      $(".cityDepart").eq(index).val(OrgCityName);
                      if($("#cityEnd"+index).length>0){
                        $("#cityEnd"+index).attr("code",DstCity);
                        $("#cityEnd"+index).val(DstCityName);
                      }
                      $(".timeStart").eq(index).val(DepTime);
                      if($(".timeEnd").eq(index).length>0){
                        $(".timeEnd").eq(index).val(ArrTime);
                      }
                      $(".cost").eq(index).val(item.FarePaid);
                      $(".remark").eq(index).val(item.BookRemark);
                      $(".cost").eq(index).trigger("change");
                      $(".addApplicationLi").eq(index).attr("rid",rid);
                    })
                  },
                  error: function () {
                    // alert('fail');
                  }
                });
            }
            $(".addBtn").unbind("click").click(function(){
                var linumber = $(".addApplicationLi").length;
                var canAdd = true;
                for(var i=0;i<$(".cityDepart").length;i++){
                  if(!$(".cityDepart").eq(i).attr("code")||$(".cost").eq(i).val()==""){
                    canAdd = false;
                  }
                }
                // var canAdd = ($(".domMultipleDeparture").eq(linumber-1).attr("code")&&$(".cost").eq(linumber-1).val()!="")?true:false;
                if(linumber==0||canAdd){
                  addApplicationLi(res,linumber);
                }else{
                  alert(get_lan("saveRemind"));
                }
            })
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
function addApplicationLi(res,linumber){
  $(".createOtherBody").append('\
    <div class="addApplicationLi flexRow" index="'+linumber+'">\
      <select class="addInput requestType" style="width:120px;"></select>\
      <select class="addInput area hide" style="width:90px;margin-left:20px;">\
        <option value="dom">'+get_lan("createOtherBody").dom+'</option>\
        <option value="intl">'+get_lan("createOtherBody").intl+'</option>\
      </select>\
      <div class="addCityBody flexRow" style="width:285px;">\
      </div>\
      <div class="addTimeBody flexRow" style="width:285px;">\
      </div>\
      <input class="addInput cost" style="width:140px;margin-left:20px;" oninput="input_num(this)">\
      <input class="addInput remark" style="width:270px;margin-left:20px;">\
      <img class="deleteIcon" src="./images/delete.png" style="width:20px;height:20px;display:block;margin:10px 0 0 10px;cursor:pointer;">\
    </div>\
    ')
    res.travelRequestTypes.map(function(item){
      var name = obtLanguage=="CN"?item. typeNameCN:item.typeNameEN;
      $(".requestType").eq(linumber).append('\
      <option value="'+item.typeCode+'" basicType="'+item.basicType+'" showStartCity="'+item.showStartCity+'" showEndCity="'+item.showEndCity+'" showStartTime="'+item.showStartTime+'" showEndTime="'+item.showEndTime+'">'+name+'</option>\
      ')
    })
    cityChange(res.travelRequestTypes[0].showStartCity,res.travelRequestTypes[0].showEndCity,linumber,'dom');
    timeChange(res.travelRequestTypes[0].showStartTime,res.travelRequestTypes[0].showEndTime,linumber);
    $(".requestType").change(function(){
      var linumber = parseInt($(this).parent().attr("index"));
      var showStartCity = $(this).find('option:selected').attr("showStartCity")=="true"?true:false;
      var showEndCity = $(this).find('option:selected').attr("showEndCity")=="true"?true:false;
      var showStartTime = $(this).find('option:selected').attr("showStartTime")=="true"?true:false;
      var showEndTime = $(this).find('option:selected').attr("showEndTime")=="true"?true:false;
      cityChange(showStartCity,showEndCity,linumber,$(".area").eq(linumber).val());
      timeChange(showStartTime,showEndTime,linumber);
    })
    $(".area").change(function(){
      var linumber = parseInt($(this).parent().attr("index"));
      var showStartCity = $(".requestType").eq(linumber).find('option:selected').attr("showStartCity")=="true"?true:false;
      var showEndCity = $(".requestType").eq(linumber).find('option:selected').attr("showEndCity")=="true"?true:false;
      cityChange(showStartCity,showEndCity,linumber,$(".area").eq(linumber).val());
    })
    $(".cost").change(function(){
      totalCost();
    })
    // $(".addBtn").addClass("hide");
    $(".deleteIcon").unbind("click").click(function(){
      if(!$(this).parent().attr("rid")){
        $(this).parent().remove();
        totalCost();
      }else{
        var index = parseInt($(this).parent().attr("index"));
        var orderNo = JSON.parse($.session.get('changeOtherInfo')).orderNo;
        var rid = $(this).parent().attr("rid");
        if($(".requestType").eq(index).find('option:selected').attr("basicType")!="H"){
          var ajaxUrl = $.session.get('obtCompany') + "/OrderService.svc/SaveTravelRequestMiscellInfoPost";
          var request = '{"request":{"BCN":"'+orderNo+'","Rid":'+rid+',"id":'+netUserId+',"ProductCodeID":"","FlightNo":"","Cabin":"","TrainNo":"","TrainSeat":"","fullRate":"","Currency":"","StartTime":"","EndTime":"","OrgCity":"","DstCity":"","OrgCityName":"","DstCityName":"","Remark":"","Language ":"' + obtLanguage + '","Operate":"DEL"}}'
        }else{
          var ajaxUrl = $.session.get('obtCompany') + "/OrderService.svc/SaveTravelRequestMiscellHPost";
          var request = '{"request":{"BCN":"'+orderNo+'","Rid":'+rid+',"id":'+netUserId+',"ProductCodeID":"","HotelName":"","RoomType":"","LanType":"","Breakfast":"","fullRate":"","Currency":"","CheckIn":"","CheckOut":"","City":"","CityName":"","Remark":"","Language ":"' + obtLanguage + '","Operate":"DEL"}}'
        }
        SaveTravelRequest(ajaxUrl,request,'del');
        $(this).parent().remove();
        totalCost();
      }
      for(var i =0;i<$(".timeStart").length;i++){
        $(".timeStart").eq(i).attr('id',$(".timeStart").eq(i).attr("id").substring(0,$(".timeStart").eq(i).attr("id").length-1)+i);
        $(".timeEnd").eq(i).attr('id',$(".timeEnd").eq(i).attr("id").substring(0,$(".timeEnd").eq(i).attr("id").length-1)+i);
      }
    })
}
function totalCost(){
  var amount = 0;
  for(var i=0;i<$(".cost").length;i++){
    var val = $(".cost").eq(i).val()!=""?parseFloat($(".cost").eq(i).val()):0;
    amount += val;
  }
  $('.totalCost').text(amount+ProfileInfo.OfficeCurrency);
}
/*差旅人*/
function selectPassengers(){
  $(".selectPassengerArrow").unbind("click").click(function(){
      if(!$(this).attr("spread")||$(this).attr("spread")=="no"){
          $(".selectPassengerList").html('\
              <div class="selectPassengerListTittle">'+get_lan('passengerInfo').commonPassengers+'</div>\
              ')
          $('.selectPassengerList').mLoading("show");
          $.ajax(
            {
              type:'post',
              url : $.session.get('ajaxUrl'),
              dataType : 'json',
              data:{
                  url: $.session.get('obtCompany')+"/SystemService.svc/GetCommonPassengersPost",
                  jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
              },
              success : function(data) {
                  $('.selectPassengerList').mLoading("hide");
                  var res = JSON.parse(data);
                  console.log(res);
                  res.map(function(item){
                      var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
                      $(".selectPassengerList").append('\
                          <div class="selectPassengerLi ellipsis" CompanyID="'+item.CompanyID+'" searchId="'+item.ID+'" employeeName="'+item.NameCN+'">'+name+'('+hideEmail(ProfileInfo,item.Email)+')'+'</div>\
                      ')
                  })
                  clickPassengerLi();
              },
              error : function() {
              }
            } 
          );
          $(".selectPassengerList").css("display","block");
          $(this).attr("spread","yes");
      }else if($(this).attr("spread")=="yes"){
          $(".selectPassengerList").css("display","none");
          $(this).attr("spread","no");
      }
  })
  $('.selectPassengerInput').bind('keypress',function(event){
          if(event.keyCode == "13")    
          {
              $(".selectPassengerSearch").click();
          }
  });
  $(".selectPassengerSearch").unbind("click").click(function(){
      $(".selectPassengerList").css("display","block");
      $(".selectPassengerArrow").attr("spread","yes");
      var queryKeys = obtLanguage+","+$(".selectPassengerInput").val();
      $('.selectPassengerList').mLoading("show");
  
  // 有没有已选中乘客
  var haveCustomer=$('.passengerLi').length
  if(haveCustomer>0){
    var request={key:netUserId.split("\"")[1],Language:queryKeys,GoAirline:"null",BackAirline:"null",NewOrder:'1',CompanyId:$('.passengerLi').eq(i).attr('companyid'),ReginType:"",DstCode:""}
    var data={
        url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengerList",
        jsonStr:'{"request":'+JSON.stringify(request)+'}'
    }
  }else{
    var request={key:netUserId.split("\"")[1],Language:queryKeys,GoAirline:"null",BackAirline:"null",NewOrder:'1',CompanyId:"",ReginType:"",DstCode:""}
    var data={
        url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengerList",
        jsonStr:'{"request":'+JSON.stringify(request)+'}'
    }
    // var data={
   //        url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengersPost",
   //        jsonStr:'{"goAirline":"null","backAirline":"null","newOrder":"1","key":'+netUserId+',"Language":"'+queryKeys+'"}'
   //    }
  }
  console.log(data)
      $.ajax(
        {
          type:'post',
          url : $.session.get('ajaxUrl'), 
          dataType : 'json',
          data:data,
          success : function(data) {
              $('.selectPassengerList').mLoading("hide");
              var res = JSON.parse(data);
              console.log(res);
              $(".selectPassengerList").html('');
              res.map(function(item){
                  var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
                  $(".selectPassengerList").append('\
                      <div class="selectPassengerLi ellipsis" CompanyID="'+item.CompanyID+'" searchId="'+item.ID+'" employeeName="'+item.NameCN+'">'+name+'('+hideEmail(ProfileInfo,item.Email)+')'+'</div>\
                      ')
              })
              clickPassengerLi();
          },
          error : function() {
            // alert('fail');
          }
        } 
      );
  })
  function clickPassengerLi(){
      $(".selectPassengerLi").unbind("click").click(function(){
          $('body').mLoading("show");
          $(".selectPassengerList").css("display","none");
          // console.log(searchCarInfo);
          // var queryKey = $(this).attr("searchId")+',1,'+searchCarInfo.departureCityText+','+searchCarInfo.arrivalCityText+','+searchCarInfo.date.split(' ')[0]+','+searchCarInfo.returndate.split(' ')[0];
          var CompanyID = $(this).attr("CompanyID");
          // 12.17修改
          var haveCustomer=$('.passengerLi').length
          if(haveCustomer>0){
          console.log(CompanyID)
          console.log($('.passengerLi').eq(0).attr('companyid'))
          if(CompanyID!=$('.passengerLi').eq(0).attr('companyid')){
              var CNStr="当前乘机人与其他乘机人不属于同一公司账户/支付方式不同，请分别预订。"
              var ENStr="This traveler is not under the same company account/legal entity、or payment method with others. Please book separately."
              if(obtLanguage=="CN"){
                alert(CNStr)
              }else{
                alert(ENStr)
              }
              $('body').mLoading("hide");
              return false;
            }
          }
    
          var customerId = $(this).attr("searchId");
          var employeeName = $(this).attr("employeeName");
    
          // $.ajax(
          //   {
          //     type:'post',
          //     url : $.session.get('ajaxUrl'),
          //     dataType : 'json',
          //     data:{
          //         url: $.session.get('obtCompany')+"/SystemService.svc/CheckCustomerHasTravelRequestPost",
          //         jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
          //     },
          //     success : function(data) {
          //         $('body').mLoading("hide");
          //         var res = JSON.parse(data);
          //         console.log(res);
          //         if(res.Remarks.length != 0){
          //             $(".passengerBody").attr("state","true");
          //             if($(".passengerLi").length == 0){
          //                 remarkInfoPop(CompanyID,customerId,employeeName,"true");
          //             }else{
          //                 remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
          //             }
          //         }
          //     },
          //     error : function() {
          //     }
          //   } 
          // );
    $(".passengerBody").attr("state","true");
    // 有审批单权限
    // var city=$('.orderDetail').attr('departecity')+','+$('.orderDetail').attr('arrivecity')
    // if(JSON.parse($.session.get('ProfileInfo')).HasTravelRequest){
    //   city=""//租车目前不需要传othercity，而且没有做审批单
    //     tools.customerTravelRequest(netUserId,queryKey,function(){
    //         $(".requestCover").remove();
    //         if($(".passengerLi").length == 0){
    //             remarkInfoPop(CompanyID,customerId,employeeName,"true");
    //         }else{
    //             remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
    //         }
    //     },1,city)
    // }else{
      $(".passengerBody").attr("state","true");
      if($(".passengerLi").length == 0){
        remarkInfoPop(CompanyID,customerId,employeeName,"true");
      }else{
        remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
      }
    // }
    
    })
  }
}
/*备注信息弹窗*/
function remarkInfoPop(CompanyID,CustomerID,employeeName,isFirst){
  $('body').mLoading("show");
  $.ajax(
    {
      type:'post',
      url : $.session.get('ajaxUrl'), 
      dataType : 'json',
      data:{
          url: $.session.get('obtCompany')+"/SystemService.svc/CurrentPassengersInOrderPost",
          jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
      },
      success : function(data) {
          $('body').mLoading("hide");
          var res = JSON.parse(data);
          console.log(res);
          if(res.length==0){
              $(".businessTripBody").html('\
                  <div class="businessTripLi flexRow">\
                  <div class="tripLiTittle">'+get_lan('remarkPop').tripNameTittle+'</div>\
                  <div class="employeeName">'+employeeName+'</div>\
                  </div>\
                  <div class="businessTripLi flexRow">\
                  <div class="tripLiTittle">'+get_lan('remarkPop').tripCompanyTittle+'</div>\
                  <select class="chooseCompany">\
                  </select>\
                  </div>\
                  <div class="companyRemind hide">\
                    <div class="companyRemindTittle">'+get_lan('remarkPop').companyRemindTittle+'</div>\
                    <div class="companyRemindText">'+get_lan('remarkPop').companyRemindText+'</div>\
                  </div>\
              ')
              $('body').mLoading("show");
              $.ajax(
                {
                  type:'post',
                  url : $.session.get('ajaxUrl'), 
                  dataType : 'json',
                  data:{
                      url: $.session.get('obtCompany')+"/SystemService.svc/HasBGMCPost",
                      jsonStr:'{"key":'+netUserId+',"customerId":"'+CustomerID+'","Language":"'+obtLanguage+'"}'
                  },
                  success : function(data) {
                      var res = JSON.parse(data);
                      console.log(res);
                      $('body').mLoading("hide");
                      if(res.length==0){
                          $(".businessTripLi").eq(1).hide();
                      }
                      res.map(function(item){
                          if(item.CompanyId==JSON.parse($.session.get('ProfileInfo')).companyId){
                              $(".chooseCompany").append('\
                                  <option value="'+item.CompanyId+'">'+item.CompanyName+'</option>\
                              ')
                          }
                      })
                      res.map(function(item){
                          if(item.CompanyId!=JSON.parse($.session.get('ProfileInfo')).companyId){
                              $(".chooseCompany").append('\
                                  <option value="'+item.CompanyId+'">'+item.CompanyName+'</option>\
                              ')
                          }
                      })
                      $(".chooseCompany").change(function(){
                          var changeCompanyId=$('.chooseCompany option:selected').val();
                          if(changeCompanyId!=$('.chooseCompany option').eq(0).val()){
                              $(".companyRemind").removeClass("hide");
                          }else{
                              $(".companyRemind").addClass("hide");
                          }
                          getNewRemark(CustomerID,changeCompanyId,isFirst)
                      })
                      getNewRemark(CustomerID,CompanyID,isFirst)
                  },
                  error : function() {
                    // alert('fail');
                  }
                } 
              );
          }else{
              $(".businessTripBody").html('\
                  <div class="businessTripLi flexRow">\
                  <div class="tripLiTittle">'+get_lan('remarkPop').tripNameTittle+'</div>\
                  <div class="employeeName">'+employeeName+'</div>\
                  </div>\
                  ')
              getNewRemark(CustomerID,CompanyID,isFirst);
          }
      },
      error : function() {
        // alert('fail');
      }
    }
  );
  function getNewRemark(CustomerID,CompanyId,isFirst){
      $('body').mLoading("show");
      if(isFirst=="true"){
          if(ProfileInfo.onlineStyle=="APPLE"){
              $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/UpdateAppleProfile",
                        jsonStr:'{"customerId":"'+CustomerID+'","key":'+netUserId+'}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                    },
                    error : function() {
                      // alert('fail');
                    }
                  }
                );
          }
          $.ajax(
            {
              type:'post',
              url : $.session.get('ajaxUrl'), 
              dataType : 'json',
              data:{
                  url: $.session.get('obtCompany')+"/SystemService.svc/GetRemarkConfigInfoNew",
                  jsonStr:'{"request":{"customerId":'+CustomerID+',"companyID":"'+CompanyId+'","key":'+netUserId+',"tripType":"HOTEL"}}'
              },
              success : function(data) {
                  var res = JSON.parse(data);
                  console.log(res);
                  $('body').mLoading("hide");
                  remark(res,CustomerID,CompanyId,isFirst);
              },
              error : function() {
                // alert('fail');
              }
            }
          );
      }else if(isFirst=="false"){
          $.ajax(
            {
              type:'post',
              url : $.session.get('ajaxUrl'), 
              dataType : 'json',
              data:{
                  url: $.session.get('obtCompany')+"/SystemService.svc/GetOrderCustomerRemark",
                  jsonStr:'{"id":'+netUserId+',"customerId":"'+CustomerID+'","companyID":"'+CompanyId+'"}'
              },
              success : function(data) {
                  var res = JSON.parse(data);
                  console.log(res);
                  $('body').mLoading("hide");
                  remark(res,CustomerID,CompanyId,isFirst);
              },
              error : function() {
                // alert('fail');
              }
            } 
          );
      }else if(isFirst.split(',')[0]=="Residents"){
          $.ajax(
            {
              type:'post',
              url : $.session.get('ajaxUrl'),
              dataType : 'json',
              data:{
                  url: $.session.get('obtCompany')+"/SystemService.svc/GetRemarkConfigInfo",
                  jsonStr:'{"id":'+CustomerID+',"companyID":"'+CompanyId+'","key":'+netUserId+'}'
              },
              success : function(data) {
                  var res = JSON.parse(data);
                  console.log(res);
                  $('body').mLoading("hide");
                  remark(res,CustomerID,CompanyId,isFirst);
              },
              error : function() {
                // alert('fail');
              }
            } 
          );
      }
  }
  openRemarkPop();
  function remark(remarks,CustomerID,CompanyID,isFirst){
      $(".remarkInfoBody").html('');
      var redTips=false;
      remarks.map(function(item,index){
          var colorRed = item.Input.indexOf("4") != -1||item.Input==""?"":"colorRed";
          var starIcon = item.Input.indexOf("4") != -1||item.Input==""?"":"*";
          if(ProfileInfo.onlineStyle!="APPLE"){
              starIcon = "";
          }
          if(colorRed=="colorRed"){
              redTips=true;
          }
          if(!item.CanModify){
              $(".remarkInfoBody").append('\
                  <div class="remarkLi flexRow">\
                    <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                    <div class="liContent" index="'+item.Index+'"><input id="remarkInput'+item.Index+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" disabled></div>\
                  </div>\
              ')
          }else if(item.CanModify&&item.InList){
              if(!item.ListCanSearch){
                  $(".remarkInfoBody").append('\
                      <div class="remarkLi flexRow">\
                        <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                        <div class="liContent">\
                          <select class="remarkSelect" index="'+index+'" id="remarkSelect'+item.Index+'">\
                            <option>'+get_lan("remarkPop").Choose+'</option>\
                          </select>\
                          <input id="remarkInput'+item.Index+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" readonly placeholder="'+get_lan("remarkPop").Choose+'">\
                        </div>\
                      </div>\
                  ')
              }else{
                  $(".remarkInfoBody").append('\
                      <div class="remarkLi flexRow">\
                        <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                        <div class="liContent">\
                          <select class="remarkSelect" index="'+index+'" id="remarkSelect'+item.Index+'">\
                            <option>'+get_lan("remarkPop").Choose+'</option>\
                          </select>\
                          <input class="remarkLiInput" CompanyID="'+CompanyID+'" id="remarkInput'+item.Index+'" require="'+colorRed+'" value="'+item.Content+'" index="'+item.Index+'"  key="'+item.SubmitContent+'" placeholder="'+get_lan("remarkPop").search+'">\
                        </div>\
                      </div>\
                  ')
                  $("#remarkInput"+item.Index+"").searchRemark();
              }
          }else if(item.CanModify&&!item.InList){
              $(".remarkInfoBody").append('\
                  <div class="remarkLi flexRow">\
                    <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                    <div class="liContent">\
                      <select class="remarkSelect" index="'+index+'">\
                        <option>'+get_lan("remarkPop").Choose+'</option>\
                      </select>\
                      <input id="remarkInput'+item.Index+'" CompanyID="'+CompanyID+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'">\
                    </div>\
                  </div>\
              ')
          }
      })
  // // 红的提示字 是否显示
  // if(!redTips && ProfileInfo.onlineStyle!="APPLE"){
  // 	$('.colorRed').hide()
  // }
      for(var i=0;i<$(".remarkSelect").length;i++){
          var index = parseInt($(".remarkSelect").eq(i).attr("index"));
          // console.log(index);
          if(remarks[index].Items.length!=0){
              remarks[index].Items.map(function(item){
                  var itemValue = item.Value==null||item.Value==""?item.Key:item.Value;
                  $(".remarkSelect").eq(i).append('\
                      <option class="remarkOption" key="'+item.Key+'" index="'+index+'">'+itemValue+'</option>\
                      ')
              })
          }else{
              $(".remarkSelect").eq(i).hide();
          }
          
          // var inputIndex = parseInt($(".remarkSelect").eq(i).find("option:selected").attr("index"));
          // $(".remarkLiInput").eq(inputIndex).val($(".remarkSelect").eq(i).find("option:selected").text());
          $(".remarkSelect").eq(i).change(function(){
              var index = parseInt($(this).find("option:selected").attr("index"));
              $(".remarkLiInput").eq(index).val($(this).find("option:selected").text());
              $(".remarkLiInput").eq(index).attr('key',$(this).find("option:selected").attr("key"));
          })
      }
      //选择remark关联其他remark
      $(".remarkSelect").change(function(){
          // console.log($(this).find("option:selected").attr("key"));
          // console.log($(this).find("option:selected").attr("index"));
          var selectKey = $(this).find("option:selected").attr("key");
          var selectIndex = parseInt($(this).find("option:selected").attr("index"));
          remarks[selectIndex].RelatedRemarkList.map(function(rItem){
              if(rItem.ChooseMainValue==selectKey){
      var rIndex=rItem.SubRemarkIndex;
                  rItem.SubRemarkRuleList.map(function(sItem){
                      $("#remarkInput"+rItem.SubRemarkIndex+"").val("");
                      $("#remarkInput"+rItem.SubRemarkIndex+"").removeAttr("key");
                      if(sItem.SubRemarkRule==1){
                          // console.log(sItem)
                          var colorRed = sItem.SubRemarkValue.indexOf("4") != -1||sItem.SubRemarkValue==""?"":"colorRed";
                          if(colorRed==""){
                              $("#liTittle"+rItem.SubRemarkIndex+"").removeClass("colorRed");
                              $("#remarkInput"+rItem.SubRemarkIndex+"").attr("require","");
                          }else if(colorRed=="colorRed"){
                              $("#liTittle"+rItem.SubRemarkIndex+"").addClass("colorRed");
                              $("#remarkInput"+rItem.SubRemarkIndex+"").attr("require","colorRed");
                          }
                      }else if(sItem.SubRemarkRule==2){
                          // $("#remarkInput"+rItem.SubRemarkIndex+"").val("");
                          if(sItem.SubRemarkValue=="true"){
                              // $("#remarkInput"+rItem.SubRemarkIndex+"").attr("placeholder",get_lan("remarkPop").search);
                              $("#remarkInput"+rItem.SubRemarkIndex+"").removeAttr("disabled");
                              $("#remarkSelect"+rItem.SubRemarkIndex+"").show();
                              // $("#remarkInput"+rItem.SubRemarkIndex+"").searchRemark();
              // 12.13新增
              $("#remarkInput"+rItem.SubRemarkIndex+"").prev().removeAttr("disabled");
              
              var remarkObj={}
              remarks.map(function(remarkList){
                if(remarkList.Index==rIndex){
                  remarkObj=remarkList
                }
              })
              if (remarkObj.InList) {
                $("#remarkInput" + rItem.SubRemarkIndex + "").attr("placeholder", get_lan("remarkPop").search);
                $("#remarkInput" + rItem.SubRemarkIndex + "").searchRemark();
              } else {
                $("#remarkInput" + rItem.SubRemarkIndex + "").attr("placeholder", "");
              }
                          }else if(sItem.SubRemarkValue=="false"){
                              $("#remarkInput"+rItem.SubRemarkIndex+"").attr("placeholder","");
                              $("#remarkInput"+rItem.SubRemarkIndex+"").attr("disabled","disabled");
                              $("#remarkSelect"+rItem.SubRemarkIndex+"").hide();
              // 12.13新增
              $("#remarkInput"+rItem.SubRemarkIndex+"").prev().attr("disabled","disabled");
                          }
                      }
                  })
              }
          })
      })

      /*关闭remark*/
      $(".closeRemarkBtn").unbind("click").click(function(){
          closeRemarkPop();
    if($('.passengerLi').length<1){
      $.session.set('TAnumber','')
    }
    $(".selectPassengerArrow").click();
      })
      $(".sureRemarkBtn").unbind("click").click(function(){
          var remarks = '';
          var remarkCorrect = '';
          for(var i = 0;i<$(".remarkLiInput").length;i++){
              if($(".remarkLiInput").eq(i).attr("require")=="colorRed"){
                  if($(".remarkLiInput").eq(i).val()==""){
                      remarkCorrect += '1';
                  }
              }
              if(!$(".remarkLiInput").eq(i).attr("key")){
                  remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val().split(',').join('##')+','
              }
              if($(".remarkLiInput").eq(i).attr("key")){
                  remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key").split(',').join('##')+','
              }
              // if($(".remarkLiInput").eq(i).attr("index")!= 10&&!$(".remarkLiInput").eq(i).attr("key")){
              //     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val()+',';
              // }
              // if($(".remarkLiInput").eq(i).attr("index")!= 10&&$(".remarkLiInput").eq(i).attr("key")){
              //     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key")+',';
              // }
              // if($(".remarkLiInput").eq(i).attr("index")== 10){
              //     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val().split('-').join('@')+',';
              // }
          }
          if(remarkCorrect!=''){
              alert(get_lan("remarkPop").remarkRemind);
              return false;
          }
          var isCopy = false;
          $('body').mLoading("show");
          if(isFirst == "true"){
              $.ajax(
                {
                  type:'post',
                  url : $.session.get('ajaxUrl'), 
                  dataType : 'json',
                  data:{
                      url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomerPost",
                      jsonStr:'{"key":'+netUserId+',"customerId":"'+CustomerID+'","companyId":"'+CompanyID+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","isCopy":"'+isCopy+'","language":"'+obtLanguage+'"}'
                  },
                  success : function(data) {
                      var res = JSON.parse(data);
                      console.log(res);
                      $(".orderDetail").attr("CompanyID",CompanyID);
                      // console.log(queryKeys);
                      if(res == "1"){
                          closeRemarkPop();
                          passengersInOrder();
                      }else{
                          $('body').mLoading("hide");
                          alert(res);
                      }
                  },
                  error : function() {
                    // alert('fail');
                  }
                } 
              );
          }else if(isFirst == "false"){
              $.ajax(
                {
                  type:'post',
                  url : $.session.get('ajaxUrl'), 
                  dataType : 'json',
                  data:{
                      url: $.session.get('obtCompany')+"/SystemService.svc/ModifyOrderCustomerRemark",
                      jsonStr:'{"key":'+netUserId+',"customerId":"'+CustomerID+'","companyId":"'+CompanyID+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","isCopy":"'+isCopy+'"}'
                  },
                  success : function(data) {
                      $('body').mLoading("hide");
                      var res = JSON.parse(data);
                      console.log(res);
                      // console.log(queryKeys);
                      if(res == "1"){
                          closeRemarkPop();
                          passengersInOrder();
                      }else{
                          alert(res);
                      }
                  },
                  error : function() {
                    // alert('fail');
                  }
                } 
              );
          }else if(isFirst.split(',')[0] == "Residents"){
              var queryKey = isFirst.split(',')[1]+','+CustomerID;
              $.ajax(
                {
                  type:'post',
                  url : $.session.get('ajaxUrl'), 
                  dataType : 'json',
                  data:{
                      url: $.session.get('obtCompany')+"/SystemService.svc/SelectHotelLivingPost",
                      jsonStr:'{"queryKey":"'+queryKey+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
                  },
                  success : function(data) {
                      $('body').mLoading("hide");
                      var res = JSON.parse(data);
                      console.log(res);
                      // console.log(queryKeys);
                      if(res == "1"){
                          closeRemarkPop();
                          passengersInOrder();
                      }else{
                          alert(res);
                      }
                  },
                  error : function() {
                    // alert('fail');
                  }
                } 
              );
          }
      })
      if(isFirst == "true"&&$(".passengerBody").attr("state")=="true"&&ProfileInfo.IsHideRemarkInput){
          $(".sureRemarkBtn").click();
      }
  }
}
//订单内旅客
function passengersInOrder(customerState){
  $('body').mLoading("show");
  $.ajax(
    {
      type:'post',
      url : $.session.get('ajaxUrl'), 
      dataType : 'json',
      data:{
          url: $.session.get('obtCompany')+"/SystemService.svc/GetPassengersInOrder",
          jsonStr:'{"request":{"key":'+netUserId+',"Language":"'+obtLanguage+'","HotelChain":"'+$(".orderDetail").attr("HotelChain")+'"}}'
      },
      success : function(data) {
          $('body').mLoading("hide");
          var res = JSON.parse(data);
          console.log(res);
          /*国籍*/
          res.map(function(item){
              if(item.Nationality=="CN"){
                  $(".bookHotelBtn").attr('nation',"cn");
              }
          })
          /*乘客信息*/
          $(".passengerList").html('');
          res.map(function(item,index){
              if(obtLanguage === 'CN') {
                  // var passengerName = item.Documents[0].DocNameCn!=null&&item.Documents[0].DocNameCn!=""?item.Documents[0].DocNameCn:item.NameCN;
                  var passengerName = item.Documents[0].DocNameEn!=null&&item.Documents[0].DocNameEn!=""?item.Documents[0].DocNameCn:item.NameCN;

              } else {
                  var passengerName = item.Documents[0].DocNameEn!=null&&item.Documents[0].DocNameEn!=""?item.Documents[0].DocNameEn:item.NameEN;
              }
              
              // var profilePhone = ProfileInfo.HideMyPersonalInfo&&item.Phones!=""?"*******"+item.Phones.substring(item.Phones.length-4,item.Phones.length):item.Phones;
              $(".passengerList").append('\
                  <div class="passengerLi flexRow" customerId="'+item.ID+'" companyId="'+item.OrderCompanyId+'">\
                  <div class="passengerLiDiv" style="width:250px;text-align:left;padding-left:45px;box-sizing:border-box;"><span class="PassengerNameText">'+passengerName+'</span></div>\
                  <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect"></select></div>\
                  <div class="passengerLiDiv" style="width:200px;">'+hideEmail(ProfileInfo,item.Email)+'</div>\
                  <div><img src="../../css/images/delIcon.png" class="delIcon" style="margin-top:3px;cursor:pointer;position:absolute;left:5px;" customerId="'+item.ID+'"></div>\
                  </div>\
                  \
                  ')
              item.Documents.map(function(ditem){
                  $(".documentsSelect").eq(index).append('\
                      <option value="'+ditem.Rid+'" docText="'+ditem.DocumentNumber+'">'+ditem.nameDoc+':'+hideDocument(ProfileInfo,ditem.DocumentNumber,ditem.Rid)+'</option>\
                  ')
              })
              if(item.UpdatedCustomerInfo!=""&&item.UpdatedCustomerInfo!=null){
                  var UpdatedCustomerList = item.UpdatedCustomerInfo.split(',');
                  $(".PassengerNameText").text(UpdatedCustomerList[1]);
                  $(".documentsSelect").val(UpdatedCustomerList[2]);
              }
          })
          /*删除旅客*/
          $(".delIcon").unbind("click").click(function(){
              var customerId = $(this).attr("customerId");
              var delMsg=confirm(get_lan("passengerInfo").delMsg);
               if (delMsg==true){
                  $('body').mLoading("show");
                  $.ajax(
                    {
                      type:'post',
                      url : $.session.get('ajaxUrl'), 
                      dataType : 'json',
                      data:{
                          url: $.session.get('obtCompany')+"/SystemService.svc/DelPsgPost",
                          jsonStr:'{"key":'+netUserId+',"customerId":"'+customerId+'"}'
                      },
                      success : function(data) {
                          $('body').mLoading("hide");
                          var res = JSON.parse(data);
                          console.log(res);
                          if(res == "Success"){
                              passengersInOrder();
                          }
                      },
                      error : function() {
                        // alert('fail');
                      }
                    } 
                  );
               } 
          })
          if($(".choosePassengerBody").css("display")=="none"){
              $(".delIcon").remove();
          }
          $(".changePassengerInfo").unbind("click").click(function(){
              var customerId = $(this).attr("customerId");
              var index = parseInt($(this).attr("index"));
              var customerRid = $(".documentsSelect").eq(index).val();
              passengerPopChange(customerId,"false",customerRid);
              $("#cover").unbind("click").click(function(){
                  closePassengerPop();
              })
          })
          $(".changeRemarkBtn").unbind("click").click(function(){
              var index = parseInt($(this).attr("index"));
              $("#cover").unbind("click");
              var CompanyID = res[index].OrderCompanyId;
              var customerId = res[index].ID;
              var employeeName = res[index].NameCN;
              remarkInfoPop(CompanyID,customerId,employeeName,"false");
          })
          if(customerState=="newCustomer"){
              $(".changeRemarkBtn").eq($(".changeRemarkBtn").length-1).click();
          }
          /*苹果*///&&ProfileInfo.onlineStyle=="APPLE"
          if($(".passengerLi").length==1){
              $(".selectPassengerArrow,.selectPassengerSearch").unbind("click").click(function(){
                  if(obtLanguage=="CN"){
                      alert("订单内已有乘客");
                  }else{
                      alert("There is already a traveler in the order.");
                  }
              })
          }else{
              $(".selectPassengerArrow").removeAttr("spread");
              selectPassengers();
          }
      },
      error : function() {
        // alert('fail');
      }
    } 
  );
}
/*隐藏证件信息*/
function hideDocument(profile,document,rid){
  document = tools.innerHtml(document);
if(profile.HideMyPersonalInfo&&document!=""){
  if(rid==1&&document.length>10){
    var starLength = document.length-10;
    var starString = "";
    for(var i=0;i<starLength;i++){
      starString += "*";
    }
    var DocumentNumber = document.substring(0,6)+starString+document.substring(document.length-4,document.length);
  }else if(document.length>3){
    var starLength = document.length-3;
    var starString = "";
    for(var i=0;i<starLength;i++){
      starString += "*";
    }
    var DocumentNumber = document.substring(0,1)+starString+document.substring(document.length-2,document.length);
  }else{
    var DocumentNumber = document;
  }
}else{
  var DocumentNumber = document
}

return DocumentNumber;
}
/*end*/
/*隐藏邮箱*/
function hideEmail(profile,email){
	if(profile.HideMyPersonalInfo&&email!=""){
        var starLength = email.split("@")[0].length;
        var starString = "";
        for(var i=0;i<starLength-2;i++){
            starString += "*"
        }
        var profileEmail = email.substring(0,1)+starString+email.substring(starLength-1,starLength)+'@'+email.split("@")[1];
    }else{
        var profileEmail = email;
    }
    return profileEmail;
}
/*end*/
//城市变换
function cityChange(showStartCity,showEndCity,index,type){
  if(type=="dom"){
    var inputClass = "domMultipleDeparture cityDepart";
    var inputClassEnd = "domMultipleArrivel cityArrivel";
  }else if(type=="intl"){
    var inputClass = "MultipleDepartureCity cityDepart";
    var inputClassEnd = "MultipleArrivelCity cityArrivel";
  }
  if(showStartCity&&showEndCity){
    $(".addCityBody").eq(index).html('\
      <input class="addInput cityStart '+inputClass+'" id="cityStart'+index+'" style="width:120px;margin-left:20px;" autocomplete="off">\
      <span style="margin-left:10px">-</span>\
      <input class="addInput cityEnd '+inputClassEnd+'" id="cityEnd'+index+'" style="width:120px;margin-left:10px;" autocomplete="off">\
    ')
  }else{
    $(".addCityBody").eq(index).html('\
      <input class="addInput city '+inputClass+'" id="city'+index+'" style="width:265px;margin-left:20px;" autocomplete="off">\
    ')
  }
  //国内多段
	$('.domMultipleDeparture').kuCity()
	$('.domMultipleArrivel').kuCity()
  //国际多段
  $(".MultipleDepartureCity").kuCity();
	$(".MultipleArrivelCity").kuCity();
}
//日期变换
function timeChange(showStartTime,showEndTime,index){
  if(showStartTime&&showEndTime){
    $(".addTimeBody").eq(index).html('\
      <input class="addInput timeStart" id="timeStart'+index+'" style="width:120px;margin-left:20px;" readonly>\
      <span style="margin-left:10px">-</span>\
      <input class="addInput timeEnd" id="timeEnd'+index+'" style="width:120px;margin-left:10px;" readonly>\
    ')
    $("#timeStart"+index).val(GetDateStr(0));
    $("#timeEnd"+index).val(GetDateStr(1));
    dateChoose("timeStart"+index, "timeEnd"+index);
  }else{
    $(".addTimeBody").eq(index).html('\
      <input class="addInput time timeStart" id="time'+index+'" style="width:265px;margin-left:20px;" readonly>\
    ')
    $("#time"+index).val(GetDateStr(0));
    $("#time"+index).datepicker({
      dateFormat: 'yy-mm-dd',
      changeMonth: true,
      minDate: 0, // 当前日期之后的 0 天，就是当天
      maxDate: 365, // 当前日期之后的 0 天，就是当天
      hideIfNoPrevNext: true,
      showOtherMonths: true,
      selectOtherMonths: true,
      changeYear: true,
    });
  }
}
//日期
function getNextDay(d) {
	d = new Date(d);
	d.setTime(d.getTime() + 1000 * 60 * 60 * 24);
	var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
	var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
	//格式化
	return d.getFullYear() + "-" + month + "-" + day;
}
function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
	return y + "-" + m + "-" + d;
}
//日期选择插件
function dateChoose(departure, returnDate) {
	var departureValue = new Date($("#" + departure).val().replace(/-/g, "/"));
	var maxTime = 365
	$("#" + returnDate).datepicker('destroy');
	$("#" + returnDate).datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: departureValue, // 当前日期之后的 0 天，就是当天
		maxDate: maxTime, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
	});
	$("#" + departure).datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: departureValue, // 当前日期之后的 0 天，就是当天
		maxDate: maxTime, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
		onSelect: function() {
			var departureValue = new Date($("#" + departure).val().replace(/-/g, "/"));
			var maxTime = 365;
			$("#" + returnDate).datepicker('destroy');
			$("#" + returnDate).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: departureValue, // 当前日期之后的 0 天，就是当天
				maxDate: maxTime, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
			});
			$("#" + returnDate).val(getNextDay($("#" + departure).val()));
		}
	});
}

// 格式化限制数字文本框输入，只能数字或者两位小数
function input_num(obj){
  // 清除"数字"和"."以外的字符
  obj.value = obj.value.replace(/[^\d.]/g,"");
  // 验证第一个字符是数字
  obj.value = obj.value.replace(/^\./g,"");
  // 只保留第一个, 清除多余的
  obj.value = obj.value.replace(/\.{2,}/g,".");
  obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
  // 只能输入两个小数
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');

  //如果有小数点，不能为类似 1.10的金额  
  if(obj.value.indexOf(".")> 0  && obj.value.indexOf("0")>2){
      obj.value= parseFloat(obj.value); 
  }
  //如果有小数点，不能为类似 0.00的金额 
  if(obj.value.indexOf(".")> 0  && obj.value.lastIndexOf("0")>2){
      obj.value= parseFloat(obj.value); 
  } 
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
  if (obj.value.indexOf(".") <= 0 && obj.value != "") {
      obj.value = parseFloat(obj.value);
  }
}
//打开remark弹窗
function openRemarkPop(){
  $("#cover").show();
  $(".remarkPop").css("display","block");
}
function closeRemarkPop(){
  $("#cover").hide();
  $(".remarkPop").css("display","none");
}