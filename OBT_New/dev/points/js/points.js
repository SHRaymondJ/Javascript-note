var ajaxUrl = 'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/PostSend';
var companyUrl = tools.queryString().companyUrl;
var language = tools.queryString().language||'CN';
var id = tools.queryString().id;
var customerId = tools.queryString().customerId;
if($.session.get('netLoginId')){
	id=$.session.get('netLoginId');
}
if($.session.get('obtLanguage')){
	language = $.session.get('obtLanguage');
}
if($.session.get('obtCompany')){
	companyUrl = $.session.get('obtCompany');
}
//中英文对象
var cn = {
	"header":{
		"currentPoints":"当前积分:",
		"ranking":"排行:",
		"details":"收支明细",
		"earn":"赚更多积分",
	},
	"exchangeTittle":"超值兑换",
	"exchangeBody":{
		"left":"剩余 ",
		"exchange":"兑换",
	},
	'earnPopBody':{
		'tittle':"赚更多积分",
		'online':"· 线上操作",
		'advance':"· 提前预订",
		'reservation':"· 预订协议资源",
		'close':"关闭",
	},
	'exchangePopBody':{
		'tittle':"确认兑换",
		'sure':"立即兑换",
		'quantity':'兑换数量:',
		'required':"消耗积分:",
		'my':'我的积分:',
		'notice':'兑换说明:',
		'noticeText':"商品数量有限，兑完为止",
		'successText':"兑换成功",
	},
	'exchangeRemind':'兑换数量为0',
}
var en = {
	"header":{
		"currentPoints":"Current points:",
		"ranking":"Ranking:",
		"details":"Income and expenditure details",
		"earn":"Earn more points",
	},
	"exchangeTittle":"Super value exchange",
	"exchangeBody":{
		"left":"Left ",
		"exchange":"Exchange",
	},
	'earnPopBody':{
		'tittle':"Earn more points",
		'online':"· Online operation",
		'advance':"· Advance booking",
		'reservation':"· Reservation agreement resources",
		'close':"Close",
	},
	'exchangePopBody':{
		'tittle':"Exchange confirmation",
		'sure':"Exchange Now",
		'quantity':'Quantity:',
		'required':"Points required:",
		'my':'My points:',
		'notice':'Notice:',
		'noticeText':"The quantity of goods is limited until they are sold out.",
		'successText':"Exchange successful",
	},
	'exchangeRemind':'The exchange quantity is 0',
}

function get_lan(m) {
	//获取文字
	var lan = language; //语言版本
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

$(function(){
    showContent();//内容展示
 })

function showContent(){
    $("#main").html('\
    <div class="autoCenter">\
      <div class="header">\
        <img src="./images/pointsIcon.png" class="pointsIcon">\
        <div class="currentPoints">'+get_lan("header").currentPoints+'<span class="headerText currentPointsText"></span></div>\
        <div class="ranking">'+get_lan("header").ranking+'<span class="headerText rankingText"></span></div>\
        <div class="details">'+get_lan("header").details+' ></div>\
        <div class="earn">'+get_lan("header").earn+'</div>\
	  </div>\
	  <div class="exchangeTittle">'+get_lan("exchangeTittle")+'</div>\
	  <div class="exchangeBody">\
	  </div>\
    </div>\
	')
	$('body').mLoading("show");
	$.ajax(
		{
		  type:'post',
		  url : ajaxUrl, 
		  dataType : 'json',
		  data:{
			  url: companyUrl+"/SystemService.svc/ProfilePost",
			  jsonStr:'{"key":'+id+'}'
		  },
		  success : function(data) {
			  var res = JSON.parse(data);
			  console.log(res);
			  if(res.ChainCode!="Pfizer China"){
				  $(".pointsIcon").remove();
			  }
			  $('body').mLoading("hide");
			  getPointInfo(res.ID);
		  },
		  error : function() {
			// alert('fail');
		  }
		}
	  );
	// getPointInfo(customerId);
}
function getPointInfo(customerId){
	$('body').mLoading("show");
	$(".exchangeBody").html('');
	$.ajax(
		{
		  type:'post',
		  url : ajaxUrl,
		  dataType : 'json',
		  data:{
			  url: companyUrl+"/QueryService.svc/QueryCustomerPointInfo",
			  jsonStr:'{"id":'+id+',"customerId":'+customerId+',"language":"'+language+'"}'
		  },
		  success : function(data) {
			  $('body').mLoading("hide");
				var res = JSON.parse(data);
				console.log(res);
				$(".currentPointsText").text(res.TotalPoint);
				$(".rankingText").text(parseInt(res.RankNo));
				res.PointGiftList.map(function(item){
					var tittle = language=="CN"?item.GiftNameCn:item.GiftNameEn;
					$(".exchangeBody").append('\
						<div class="exchangeLi">\
							<div class="liImgBody">\
							<img src="'+item.GiftImage+'" class="liImg">\
							</div>\
							<div class="liTittle">'+tittle+'</div>\
							<div class="liPoints flexRow">\
							<img src="./images/liPointsIcon.png" class="liPointsIcon">'+item.PointValue+'\
							</div>\
							<div class="liLeft">\
								'+get_lan("exchangeBody").left+'\
								<span class="leftText" style="color:#FF7A00;">'+item.Number+'</span>\
							</div>\
							<div class="exchangeBtn" points="'+item.PointValue+'" giftId="'+parseInt(item.GiftId)+'" left="'+item.Number+'">'+get_lan("exchangeBody").exchange+'</div>\
						</div>\
					')
				})
				showExchangeBtn();
				/*赚更多积分*/
				$(".earn").unbind("click").click(function(){
					$('body').append('\
						<div class="popCover">\
							<div class="popBody">\
								<div class="popTittle">'+get_lan("earnPopBody").tittle+'</div>\
								<div class="earnPopTittle">\
									'+get_lan("earnPopBody").online+'\
									<div class="earnPointsBody flexRow">\
										<div class="earnPointsImg">\
										  <img src="./images/liPointsIcon.png" class="earnImg">\
										</div>\
										<div class="earnPointsText"></div>\
									</div>\
								</div>\
									<div class="earnLiBody"></div>\
								<div class="earnPopTittle">\
									'+get_lan("earnPopBody").advance+'\
									<div class="earnPointsBody flexRow">\
										<div class="earnPointsImg">\
										  <img src="./images/liPointsIcon.png" class="earnImg">\
										</div>\
										<div class="earnPointsText"></div>\
									</div>\
								</div>\
									<div class="earnLiBody"></div>\
								<div class="earnPopTittle">\
									'+get_lan("earnPopBody").reservation+'\
									<div class="earnPointsBody flexRow">\
										<div class="earnPointsImg">\
										  <img src="./images/liPointsIcon.png" class="earnImg">\
										</div>\
										<div class="earnPointsText"></div>\
									</div>\
								</div>\
									<div class="earnLiBody"></div>\
								<div class="popBtn earnPopBtn">'+get_lan("earnPopBody").close+'</div>\
							</div>\
						</div>\
					')
					var ruleList1 = [];
					var ruleList2 = [];
					var ruleList3 = [];
					res.PointRuleList.map(function(item){
						var RuleDes = language=="CN"?item.RuleDesCn:item.RuleDesEn;
						if(item.PointTypeId==4||item.PointTypeId==5){
							$(".earnLiBody").eq(0).append(RuleDes+'<br>');
							$(".earnPointsText").eq(0).text('+'+item.PointValue);
							ruleList1.push(item);
						}
						if(item.PointTypeId==1||item.PointTypeId==6){
							$(".earnLiBody").eq(1).append(RuleDes+'<br>');
							$(".earnPointsText").eq(1).text('+'+item.PointValue);
							ruleList2.push(item);
						}
						if(item.PointTypeId==2||item.PointTypeId==3){
							$(".earnLiBody").eq(2).append(RuleDes+'<br>');
							$(".earnPointsText").eq(2).text('+'+item.PointValue);
							ruleList3.push(item);
						}
					})
					if(ruleList1.length==0){
						$(".earnPopTittle").eq(0).addClass("hide");
					}
					if(ruleList2.length==0){
						$(".earnPopTittle").eq(1).addClass("hide");
					}
					if(ruleList3.length==0){
						$(".earnPopTittle").eq(2).addClass("hide");
					}
					$(".earnPopBtn").unbind("click").click(function(){
						$(".popCover").remove();
					})
				})
				/*end*/
				/*收支明细*/
				$(".details").unbind("click").click(function(){
					$('body').append('\
						<div class="popCover">\
							<div class="popBody">\
								<div class="popTittle">\
									'+get_lan("header").details+'\
								</div>\
								<div class="detailsList autoScrollY"></div>\
								<div class="popBtn detailsPopBtn">'+get_lan("earnPopBody").close+'</div>\
							</div>\
						</div>\
					')
					var PointDetailList = [];
					res.PointDetail.GetPointList.map(function(item){
						if(item.DesCn!=null){
							var Des = language == 'CN'?item.DesCn:item.DesEn;
							PointDetailList.push({'Des':Des,'Value':item.Value,'CreateTime':item.CreateTime,'type':1})
							// $(".detailsList").append(`
							// <div class="detailsLi">
							// 	<div class="detailsLiTittle">
							// 	${Des}
							// 	<span class="detailsLiPoints" style="color:#FF7A00;">+${item.Value}</span>
							// 	</div>
							// 	<div class="detailsLiBody">${item.CreateTime}</div>
							// </div>
							// `)
						}
					})
					res.PointDetail.UsePointList.map(function(item){
						if(item.DesCn!=null){
							var Des = language == 'CN'?item.DesCn:item.DesEn;
							PointDetailList.push({'Des':Des,'Value':item.Value,'CreateTime':item.CreateTime,'type':2})
							// $(".detailsList").append(`
							// <div class="detailsLi">
							// 	<div class="detailsLiTittle">
							// 	${Des}
							// 	<span class="detailsLiPoints" style="color:#56C5A3;">-${item.Value}</span>
							// 	</div>
							// 	<div class="detailsLiBody">${item.CreateTime}</div>
							// </div>
							// `)
						}
					})
					//时间升序排列
					var timeSortDes=function(arr){
						for(var i=0;i<arr.length-1;i++){  
							for(var j=i+1;j<arr.length;j++){  
								if(new Date(Date.parse(arr[i].CreateTime.split('-').join('/')))<new Date(Date.parse(arr[j].CreateTime.split('-').join('/')))){
									var temp=arr[i];
									arr[i]=arr[j];
									arr[j]=temp;  
								}  
							}  
						}
						return arr;
					}
					console.log(timeSortDes(PointDetailList));
					PointDetailList.map(function(item){
						var pointsColor = item.type==1?"#FF7A00;":"#56C5A3;";
						var pointsType = item.type==1?"+":"-";
						$(".detailsList").append('\
							<div class="detailsLi">\
								<div class="detailsLiTittle">\
								<span class="detailsLiText">'+item.Des+'</span>\
								<span class="detailsLiPoints" style="color:'+pointsColor+'">'+pointsType+item.Value+'</span>\
								</div>\
								<div class="detailsLiBody">'+item.CreateTime+'</div>\
							</div>\
							')
					})
					$(".detailsPopBtn").unbind('click').click(function(){
						$(".popCover").remove();
					})
				})
				/*end*/
				/*兑换奖品*/
				$(".exchangeBtn").unbind("click").click(function(){
					$('body').append('\
						<div class="popCover">\
							<div class="popBody exchangePop" left="'+$(this).attr("left")+'">\
								<div class="popTittle">'+get_lan("exchangePopBody").tittle+'<img class="closeIcon" src="./images/close.png"></div>\
								<div class="exchangePopLi flexRow">\
								  <div class="exchangePopTittle quantityTittle">'+get_lan("exchangePopBody").quantity+'</div>\
								  <div class="numberBody flexRow">\
									<div class="numberSubtract">-</div>\
									<div class="numberText">1</div>\
									<div class="numberAdd">+</div>\
								  </div>\
								</div>\
								<div class="exchangePopLi flexRow">\
								  <div class="exchangePopTittle">'+get_lan("exchangePopBody").required+'</div>\
								  <div class="exchangePopText popRequirePoints" style="color:#FF7A00;">'+$(this).attr("points")+'</div>\
								</div>\
								<div class="exchangePopLi flexRow">\
								  <div class="exchangePopTittle">'+get_lan("exchangePopBody").my+'</div>\
								  <div class="exchangePopText popTotalPoints" style="color:#333;">'+res.TotalPoint+'</div>\
								</div>\
								<div class="exchangePopLi flexRow hide">\
								  <div class="exchangePopTittle">'+get_lan("exchangePopBody").notice+'</div>\
								  <div class="exchangePopText" style="color:#666;">'+get_lan("exchangePopBody").noticeText+'</div>\
								</div>\
								<div class="popBtn exchangePopBtn" giftId="'+$(this).attr("giftId")+'" points="'+$(this).attr("points")+'">'+get_lan("exchangePopBody").sure+'</div>\
							</div>\
						</div>\
					')
					$(".closeIcon").unbind("click").click(function(){
						$(".popCover").remove();
					})
					var giftNumber = parseInt($('.numberText').text())>0?parseInt($('.numberText').text()):1;
					if((giftNumber*parseFloat($(".exchangePopBtn").attr("points"))>parseFloat($(".popTotalPoints").text()))||parseInt($(".popBody").attr("left"))==0){
						$('.numberText').text(0);
						$('.popRequirePoints').text(0);
						$(".numberAdd").css("color","#999");
					}
					$(".numberSubtract").unbind("click").click(function(){
						var numberText = parseInt($('.numberText').text());
						if(numberText>0){
							// numberText = numberText-1;
							$('.numberText').text(numberText-=1);
							$(".numberAdd").css("color","#666");
							var giftNumber = parseInt($('.numberText').text());
							var points = parseFloat($(".exchangePopBtn").attr("points"));
							var requirePoints = giftNumber *points;
							$('.popRequirePoints').text(requirePoints);
						}
					})
					$(".numberAdd").unbind("click").click(function(){
						var numberText = parseInt($('.numberText').text());
						var i = numberText>0?numberText:1;
						// console.log(((i+1)*parseFloat($(".exchangePopBtn").attr("points"))<=parseFloat($(".popTotalPoints").text())));
						// console.log(numberText<parseInt($(".popBody").attr("left")));
						if(((i+1)*parseFloat($(".exchangePopBtn").attr("points"))<=parseFloat($(".popTotalPoints").text()))&&numberText<parseInt($(".popBody").attr("left"))){
							// numberText = numberText-1;
							$('.numberText').text(numberText+=1);
							var giftNumber = parseInt($('.numberText').text());
							var points = parseFloat($(".exchangePopBtn").attr("points"));
							var requirePoints = giftNumber *points;
							$('.popRequirePoints').text(requirePoints);
						}else{
							$(".numberAdd").css("color","#999");
						}
					})
					$(".exchangePopBtn").unbind('click').click(function(){
						if(parseInt($('.numberText').text())!=0){
							var giftId =$(this).attr("giftId");
							var quantity = parseInt($('.numberText').text());
							var pointValue = parseFloat($(this).attr("points"));
							$(".popCover").remove();
							$('body').mLoading("show");
							$.ajax(
								{
								  type:'post',
								  url : ajaxUrl, 
								  dataType : 'json',
								  data:{
									  url: companyUrl+"/QueryService.svc/PointConvertToGiftPost",
									  jsonStr:'{"request":{"id":'+id+',"giftId":"'+ giftId +'","quantity":"'+quantity+'","pointValue":"'+pointValue+'","language":"' + language + '"}}'
								  },
								  success : function(data) {
									  var res = JSON.parse(data);
									  console.log(res);
									  $('body').mLoading("hide");
									  if(res.code==200){
										$('body').append('\
										<div class="popCover">\
											<div class="popBody exchangePop">\
												<img src="./images/successIcon.png" class="successIcon">\
												<div class="successText">'+get_lan("exchangePopBody").successText+'</div>\
												<div class="popBtn">'+get_lan("earnPopBody").close+'</div>\
											</div>\
										</div>\
										')
										$(".popBtn").unbind('click').click(function(){
											$(".popCover").remove();
											getPointInfo(customerId);
										})
									  }else{
										alert(res.message);
										$(".popCover").remove();
									  }
								  },
								  error : function() {
									// alert('fail');
								  }
								}
							);
						}else{
							alert(get_lan("exchangeRemind"));
							$(".popCover").remove();
						}
					})
				})
				/*end*/
		  },
		  error : function() {
			// alert('fail');
		  }
		}
	);
}
function showExchangeBtn(){
	var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if(browserWidth>640)
	{
		$(".exchangeLi").hover(function(){
			if(parseInt($(this).find(".leftText").text())!=0){
				$(this).find(".exchangeBtn").css('display','block')
			}
		},function(){
			$(this).find(".exchangeBtn").css('display','none')
		})
	}
}