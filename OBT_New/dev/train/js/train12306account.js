function Train12306account(customerID, name, account, password) {
    this.cn = {
        'add': '添加',
        'addForRefund': '添加12306账号',
        'editTitle': '12306账号：',
        'TextBeforeAdd': '请',
        'TextAfterAdd': '12306账号进行出票',
        'bookWithout12306': '请添加<a href="https://www.12306.cn/index/" style="color:#0075FF">12306账号</a>后再预订',
        'forgotHref': 'https://www.12306.cn/index/',
        'maintainTitle': '绑定个人12306账号',
        'account': '账号：',
        'password': '密码：',
        'accountPlaceholder': '输入12306用户名/邮箱/手机号',
        'passwordPlaceholder': '请输入12306密码',
        'maintainTips': '账号填写区分大小写',
        'agree': '同意',
        'agreement': '账户授权协议',
        'edit': '修改',
        'loginVerifyTitle': '登录核验',
        'loginVerifyText1': '为了保障您或被代订人的账号安全，请按以下程序进行手机双向核验：',
        'loginVerifyText2': '请使用手机号码 ',
        'loginVerifyText3': '发送短信 “',
        'loginVerifyText4': '” 至 ',
        'loginVerifyText5': '12306接到短信后将回复6位数字短信；',
        'loginVerifyText6': '请在',
        'loginVerifyText7': '分钟内将6位数字填写在下方，并点击“提交”按钮 ',
        'verificationCodePlaceholder': '请输入收到得短信验证码',
        'verificationErrorMsg': '验证码错误，请重新核验',
        'submit': '提交',
        'confirm': '确认',
        'close': '关闭',
        'cancel': '取消',
        'phoneVerifyTitle': '乘客手机核验',
        'passenger': '乘客：',
        'phoneVerifyText1': '请使用手机号码',
        'phoneVerifyText2': '发送验证码',
        'phoneVerifyText3': ' 至 ',
        'verifyStatus': '当前核验状态',
        'pendingVerification': '待核验',
        'refreshVerificationResult': '我已完成校验，刷新结果',
        'verifyFailed': '校验未完成，请尽快完成核验。',
        'tips': '提示',
        'forgotPwd': '忘记密码或没有账号',
        'forgotPwdReminder': '点击前往12306官网找回密码或注册账号',
        'agreementTitle': '火车票信息服务协议',
        'agreementText': "在使用本平台提供的火车票信息服务之前，请您（即用户）仔细阅读下述协议条款。一旦您点击确认本协议，即表示您已接受了以下所述的条款和条件，并同意受本协议约束。如果您不同意接受全部的条款和条件，那么您将无法使用本协议约定的技术服务。<br>\
        1.服务说明<br>\
        1.1.通过本平台预订火车票时，您可自由选择自行通过您自有的12306账户和密码登陆12306进行预订，也可选择将您的12306账户和密码授权给本平台进行代订。<br>\
        1.2.为了更好地给您提供火车票信息服务，一旦您选择12306购票服务，您同意将您的12306账户和密码授权给本平台，允许本平台使用您的12306账户和密码登陆，并完成火车票预订及其相关退改签等操作。<br>\
        1.3.因全国各铁路局随时会调整车次、票价、座席等信息，本平台显示的车次、票价、座席信息仅供参考，最终以实际购买的票面信息为准。由于全国各铁路局对火车票售票的不同规定与要求，本平台无法承诺支付后百分百出票成功。<br>\
        2.各方权利和义务<br>\
        2.1.本平台提供的是火车票信息服务，您接受本协议，意味着您同意本平台及合作方使用您填写的乘客信息进行代订，包括但不限于授权我们使用您的乘客信息执行查询、代购、退票、改签、注册等操作，同时您必须遵守12306的购票规定的服务条款（https://kyfw.12306.cn/otn/regist/rule)。<br>\
        2.2.如发生您的12306账户及密码信息变更，请您及时在本平台更新信息，本平台不对因此带来的查询、代购、退票、改签等操作失败问题承担责任。若您需要更新或删除相关乘车人信息时，您可在本平台提供的服务页面做更新或删除操作。<br>\
        2.3.您了解并同意，本平台会根据您的授权使用您的12306账户及密码操作代订事宜，为了后续进一步向您提供服务，也会在系统中记录您的前述相关信息。本平台尊重并保护用户个人隐私，您使用或注册中涉及个人信息的部分，本平台将严格按照法律法规要求，采取相应的安全保护措施。具体隐私保护政策您可查阅本平台《火车票信息服务协议》的《隐私政策》部分。<br>\
        2.4.本平台将根据国家法律法规变化及维护交易秩序、保护消费者权益需要，不时修改本协议。"
    };
    this.en = {
        'add': 'Add ',
        'addForRefund': 'Add 12306 account',
        'editTitle': '12306 account：',
        'TextBeforeAdd': '',
        'TextAfterAdd': '12306 account to issue tickets',
        'bookWithout12306': 'Please add <a href="https://www.12306.cn/en/index.html" style="color:#0075FF">12306 account</a> before booking',
        'forgotHref': 'https://www.12306.cn/en/index.html',
        'maintainTitle': 'Log-in China Railway 12306',
        'account': 'User Name:',
        'password': 'Password:',
        'accountPlaceholder': 'Login name/Mobile/Email',
        'passwordPlaceholder': 'Please input password',
        'maintainTips': '12306 account is case sensitive.',
        'agree': 'Agree to ',
        'agreement': 'account authorization agreement',
        'edit': 'Edit',
        'loginVerifyTitle': 'Login Verification',
        'loginVerifyText1': "In order to ensure the security of your account or the subscriber's account, please follow the following procedures for mobile phone two-way verification:",
        'loginVerifyText2': 'Please use phone number ',
        'loginVerifyText3': 'Send SMS “',
        'loginVerifyText4': '” to ',
        'loginVerifyText5': '12306 will reply to 6-digit SMS after receiving SMS;',
        'loginVerifyText6': 'Please fill in 6 digits below within ',
        'loginVerifyText7': ' minutes and click the "submit" button.',
        'verificationCodePlaceholder': 'Please input the verification code',
        'verificationErrorMsg': 'Verification code error, please check again.',
        'submit': 'Submit',
        'confirm': 'Confirm',
        'close': 'Close',
        'cancel': 'Cancel',
        'phoneVerifyTitle': 'Passenger Verification',
        'passenger': 'Passenger： ',
        'phoneVerifyText1': 'Please use mobile number ',
        'phoneVerifyText2': 'Send PIN ',
        'phoneVerifyText3': ' to ',
        'verifyStatus': 'Current verification status:',
        'pendingVerification': 'Pending verification',
        'refreshVerificationResult': 'Refresh the Result',
        'verifyFailed': 'Validate failed, please complete the verification again.',
        'tips': 'Tips',
        'forgotPwd': 'Forget password or no account',
        'forgotPwdReminder': 'Click to enter 12306 official website to retrieve password or register account.',
    };
    this.get_lan = function (m) {
        //获取文字
        var lan = $.session.get('obtLanguage');     //语言版本
        //选取语言文字
        switch (lan) {
            case 'CN':
                var t = this.cn[m];
                break;
            case 'EN':
                var t = this.en[m];
                break;
            default:
                var t = this.cn[m];
        }
        if (t == undefined) t = this.cn[m];
        if (t == undefined) t = this.en[m];

        return t;
    }
    this.getAgreement = function () {
        var agreement = '';
        ajax_queryBasicConfig({ uid: netUserId.removeQuotation() }, function (res) {
            var cName = res.CompanyNameCn,
                cShortName = res.CompanyShortName == "" ? res.CompanyNameCn : res.CompanyShortName,
                pEmail = res.ProfileEmail,
                pPhone = res.ProfilePhone;
            agreement = '本《火车票信息服务协议》（以下简称“本协议”）是' + cName + '（以下简称“' + cShortName + '”）及其服务商（以下统称“我司”或“我们”）与用户（以公务为目的差旅出行，在得到企业公司允许下，您可能为包括但不限于同事、客户、供应商、同行人等他人代购车票，您也可能经由亲友等他人代购自己的车票，用户包括' + cShortName + '账户所有人、代订人、出行人等，以下统称“您”）就平台上提供的火车票服务包括但不限于代为购票、查询、退票、改签、候补、12306账号注册及授权托管和使用等火车票服务（以下统称“本服务”）所订立的合约，本协议包括三个部分，即用户协议、免责声明、隐私政策。<br>\
            在使用本服务之前，请您仔细阅读本协议的全部内容（特别是以粗体标注的内容），您以书面签署或线上点击“确认”或“同意”或开始使用我司服务，即表示您已充分理解并同意接受本协议的全部内容以及相关已发布或将来可能发布的解释、规则、页面展示、操作流程、公告或通知，以及各项服务的服务说明及/或预订须知。如您通过其他平台经营的网站、APP（以下简称“平台”）等接受我司服务，则应仔细查阅并确认您接受该平台上的规则包括但不限于该平台的隐私政策、软件许可协议、用户服务协议、免责声明等，如平台上任何规则与本协议冲突，以本协议为准。<br>\
            如您使用我司服务向http://www.12306.cn网站及其移动端（下称“12306网”）购买火车票，则请您查阅并确认您接受12306网上公布的规章包括但不限于《中国铁路客户服务中心网站服务条款》、12306网《认证服务协议》以及12306网《隐私权政策》等并同意受规则约束。如您委托我司代为在12306网上注册及使用其他服务或处理积分、权益等，还应同意12306网公布的相应规则，比如注册铁路畅行会员应受《铁路畅行常旅客会员服务须知》约束（以下统称“规则”）。如您未充分理解或不同意接受本协议及12306全部规则，请您停止使用本服务。<br>\
             <br>\
            用户协议<br>\
            <br>\
            一、	服务描述<br>\
            1.	您使用我司提供的火车票信息服务（包括通过您手动登录已有12306账号或者由您授权自动操作）向铁路官方网站或授权代售点进行查询、购票、退票、改签、候补等操作，如您未注册12306账号或需12306网进一步认证且继续使用服务，您同意并委托和授权我司使用您的身份信息包括您已提供的姓名、身份证号、面部特征等生物识别信息及手机号为您提供12306账号代为注册和代您申请认证的便捷服务。如您注册12306账户后需使用我司服务进一步注册和使用12306网上的其他服务或处理积分、会员权益等事宜，您同意并委托和授权我司使用您提供的身份信息为您代为向铁路客运机构提出注册和申请。<br>\
            2.	火车票的查询、购票、退票、改签、候补需由铁路客运机构（定义下详）执行，在您同意并授权的前提下我司代您向铁路客运机构提出申请，具体反馈及结果由铁路客运机构做出，我司无法对出票成功率作100%承诺。如未能成功购票，票款将退回您的支付账户，到账日期一般为1-7个工作日。<br>\
            3.	使用本服务时，您可以自由选择添购平台上的其他产品或服务，包括但不限于加速抢票、礼品卡、门票、酒店等套餐服务，也可以只选择火车票信息服务，我司承诺不会强制您购买任何产品或服务。 <br>\
            4.	在您预订的火车票开售后，我司将以短信（为保障您及时获悉，也可以微信、邮件等形式）通知您是否购票成功。如您未及时阅读或未能收到短信通知可能导致无法及时知悉出票情况，我司谨在此提醒您请仍需及时浏览刷新用户订单页面查看订单状态，以免耽误行程。通常您会在订单之日或（如订单之日早于开票的情况下）开售之日或此后第一个工作日内22:00点前通知购票结果。本服务涉及人工服务，在部分情况下，购票结果可能需您等待更长时间。<br>\
            <br>\
            二、	预订提示（以铁路客运机构的规定以及服务说明和要求为准，详见12306.cn预订须知及预订页面说明）<br>\
            1.	您需提供真实、合法、有效的证件，并仅可以使用二代身份证及护照、台胞证、港澳通行证预订火车票，本服务暂不支持其他证件。<br>\
            2.	一张有效身份证件同一乘车日期同一车次限购一张车票（儿童用成人的证件号情况除外）。<br>\
            3.	铁路客运规定对同一张订单可购买的车票数量有最高限制（比如最多不超过5张）如您预订的同一趟行程中购票乘车人数超出规定数量，请拆分为多张订单预订。<br>\
            <br>\
            三、	取票提示（以铁路客运机构的规定以及服务说明和要求（详见12306.cn页面说明）为准）<br>\
            1.	使用二代身份证预订的客户，可持预订时所使用的乘车人有效二代身份证到车站售票窗口、铁路客票代售点或车站自动售票机上办理取票手续，部分高铁站可持二代居民身份证直接检票进站，以各铁路站点实际情况为准。<br>\
            2.	如预订时使用的乘车人二代身份证无法识别，或乘车人使用护照预订等情况，请持预订时留下的有效证件原件及我司给您发送的火车票订单号至火车站售票点，由售票员核实后办理换票手续。<br>\
            3.	若您在预订成功后、换票前，不慎遗失有效身份证件，须由您本人到乘车站铁路公安制证口办理临时身份证明。<br>\
            4.	纸质火车票作为唯一的报销凭证，如您需要报销，请提前至火车站换取纸质车票并妥善保管，我司无法另行提供火车票票款发票。<br>\
            <br>\
            四、	退票、改签及退款提示（以铁路客运机构的规定以及服务说明和要求（详见12306.cn页面说明）为准）<br>\
            1.	在线申请退票退款须同时满足以下条件：<br>\
            ①服务时间：6:00—23:00；②距离发车时间30分钟外；③未取纸质票。<br>\
            2.	根据铁路客运规定，开车前15天不收取退票费。开车前48小时以上，手续费5%；开车前24-48小时之间，手续费10%；开车前24小时内，手续费20%。<br>\
            最终退票手续费以铁路客运机构实际收取为准。<br>\
            3.	支持在线改签（热门线路除外），一张车票只能改签一次，且须同时满足以下条件：<br>\
            ①服务时间：6:00—23:00；②距离发车时间30分钟外；③未取纸质票。<br>\
            在铁路客运机构有运输能力的前提下，开车前48小时（不含）以上，可改签预售期内的其他列车；开车前48小时以内，可改签至票面日期当日24:00之间的列车；不办理票面日期次日及以后的改签。开车前48小时-15天期间内，改签至距开车15天以上的其他列车，又在距开车15天前退票的，仍核收5%的退票费。铁路客运机构规定，对于改签后新车票价格低于原车票价格的，退还差额，并对差额部分收取改签手续费：新票距发车时间15天以上的，差额不收改签费；48小时-15天（含）的，收取差额5%的改签费；24-48小时（含）的，收取10%；不足24小时（含）的，收取20%。<br>\
            4.	如发生网络技术故障等情形，造成我司临时性暂停在线退票、改签服务，您可以在发车前携带纸质车票及购票时使用的有效身份证件至火车站的退票窗口办理。<br>\
            5.	主要的退款分类及退款方式：<br>\
            (1)	产品预订失败退款：车票款将在确认失败后当日退款至客户原支付渠道，其他产品也将退回至客户原支付渠道。<br>\
            (2)	产品差价退款：如果订单内铁路客运机构收取的车票的实际票价低于您所支付的票价，将确认实际票价后将差额退款至原支付渠道。<br>\
            (3)	产品退票退款：电子票客户退票后，铁路客运机构将扣除退票手续费，将差额部分退款到我司，我司在收到铁路客运机构的退票款后，确认您的退票信息，将退票款退回原支付渠道（收到铁路客运机构退款确认大约需要1-15个工作日左右）。<br>\
            (4)	退款方式：以上产品退款一律按客户订单支付时的原支付渠道退回。如使用支付宝/财付通/微信/礼品卡等余额进行支付的，退款实时到帐。如果使用的是银行卡支付的，根据银行的不同，预计1-7个工作日到帐，退款到账日期以银行为准，如超7个工作日未到帐，请至您的银行卡发卡行客服查询。<br>\
            (5)	其他附加服务退款：由我司提供的套餐等服务类产品，出行前支持无理由退款，出行后不支持退款。<br>\
            <br>\
            五、	候补提示（以铁路客运机构的规定以及服务说明和要求（详见12306.cn页面说明）为准）<br>\
            1.	如您已注册12306账号，可自愿申请试点列车的候补购票服务。申请该项服务前，您需进行人证一致性核验。<br>\
            2.	您仅可保有一个待兑现的候补订单，每个候补订单可添加的乘车人会有最高数量限制（比如最多不超过3个）。<br>\
            3.	候补订单提交成功后，同一时间您仅允许存在1个待支付的候补订单。<br>\
            4.	用户提交候补订单时需预付票款，预付款按照该候补订单中最高票价计算（卧铺按下铺票价计算）。兑现成功，预付款大于实际票款的，自动退还差价。<br>\
            5.	在提交候补订单时，需要您确认候补截止兑现时间。过期未兑现或兑现失败的候补订单将自动全额退款。用户也可提前主动终止待兑现的候补订单，退单后将全额退款。<br>\
            6.	兑现时，按照候补订单生单顺序，兑现符合条件的候补需求。<br>\
            7.	兑现成功的车票将视为已购车票，退票、改签按既有规则办理。<br>\
             <br>\
            免责申明<br>\
            1.	您完全同意及认可，本服务将铁路客运营、服务、代售等政府部门、机构、企业包括但不限于国家铁路局、中国铁路总公司、12306.cn铁路客户服务中心、火车票代售点（统称“铁路客运机构”）等服务信息汇集供用户查阅，同时为用户代为与铁路客运机构预订相关服务并提供相关增值服务。对于用户预订的铁路客票及客运服务发生任何瑕疵等问题，我们不承担责任。<br>\
            2.	您同意并遵守铁路客运机构时不时发布和更新规定和要求（统称“铁路客运规定”），本服务协议以及各产品预订须知内容应依据铁路客运规定解释并（如有冲突）以铁路客运规定为准，并应视为依铁路客运规定的更新而变更。因铁路客运机构会随时调整车次、票价、坐席等信息，或者网络传输误差，故我司显示产品信息（包括但不限于车次、票价、坐席）可能不是最新或者存在误差，供您做一般参考，最终以实际购买的产品为准。本协议于铁路客运机构现有相关规定、政策的基础上进行制定，您知晓并同意您有义务知悉铁路客运机构公布的相关规定、政策，如后续因铁路部门相关规定、政策变动导致本协议相关条款与实际不符的，您与我司双方均同意以实际的规定、政策为准，同时如发生前述情形，您同意就给您造成的损失不予追究我司责任。<br>\
            3.	因不可抗力或铁路客运机构的原因导致您未能如订单内容接受服务，包括但不限于铁路客运机构随时调整车次、因自然灾害等不可抗力因素导致的火车停运等问题，我司不承担责任。<br>\
            4.	因不可抗力，包括但不限于黑客入侵、计算机病毒等原因造成用户资料泄露、丢失、被盗用、被篡改的，我司不承担任何责任。<br>\
            5.	如因您未能遵守规定以及铁路客运机构的服务说明和要求，包括但不限于提供错误的订单信息（姓名、证件号码、日期、车次、座位类型等）或者因您自身原因导致无法取票、车票丢失、车票损毁等情况所导致的损失，您需自行承担后果。<br>\
            6.	我司将按承诺时限向客户订单支付的原渠道发起退款，退款到帐时间由支付渠道和银行决定，我司无法控制。<br>\
            7.	您接受本协议和使用本服务，意味着您同意遵守铁路客运规定以及本协议、预订须知及平台的全部规定，授权我司使用您提供的您以及他人的个人信息、行程信息及生物识别信息等及12306账号（统称“身份信息”）进行相关操作，包括但不限于向铁路客运机构及其服务商提供您及他人的身份信息以及为您或他人向铁路客运机构查询、购票、退票、改签、注册账户等操作指令，您知晓您所提供的身份信息将被提供给铁路客运机构以及第三方服务商，同时您需知情并同意铁路客运规定和铁路客运机构的服务说明和要求包括但不限于12306购票规定的服务条款、隐私权政策（http://www.12306.cn），同意铁路客运机构及其服务商采集、使用、保存和处理您的身份信息，您承诺所提供的身份信息均经过该公民知悉用途的前提下对其个人信息使用、保存、处理的明示授权。我司对铁路客运机构及其服务商的行为及服务不承担责任。<br>\
            8.	如果您提供自有的12306账号用于购票，表示您同意将您的12306账号和密码授权给我司托管，并保证您的账户具备本服务所需授权，您同意并委托我司为您或他人查询、购票、退票、改签等操作，我司也将严格保护您的个人信息。如发生账号及密码信息的遗失或变更，请及时按照铁路客运机构规则处理，我司不对因此带来的查询、购票、退票、改签等操作失败问题以及相关损失承担责任。<br>\
            9.	您完全理解并同意，鉴于我们非人工检索方式、根据您键入的关键字或点击特定的产品或服务关键字自动生成的网页链接或相关的产品信息描述，例如价格、库存等，上述非人工检索方式，因缓存时间间隔或检索方式非完全智能等原因，有可能造成信息更新不及时或产品服务信息聚合、抽取不精准等瑕疵，您完全理解并豁免上述产品或服务瑕疵给您造成的不便，我们不承担任何责任。<br>\
            10.	为方便您的使用，我们可能会对产品的可信赖程度而进行的评级、推荐或风险提示仅供您参考，我们不担保该等评级、推荐或风险提示的准确性和完整性，对推荐的网站的内容及服务亦不承担任何责任。<br>\
            11.	您完全理解并同意，预订、改签、候补等火车票服务时，您在预订产品或服务后应当及时付款；您在预订产品或服务后未全额支付前，您尚未完成购买上述产品或服务。因上述产品或服务的价格、舱位、数量或库存等实时更新或变化而造成您的额外费用、损失或无库存等，由您自行承担，我们不承担任何责任。您完全理解并同意，您在支付过程中，因网络中断、银行反馈信息错误等非我们的原因造成的付款失败，由您自行承担，我们不承担任何责任。<br>\
            12.	请您及时保存或备份您的文字、图片等其他信息，您完全理解并同意，由于我们储存设备有限、设备故障、设备更新或设备受到攻击等设备原因或人为原因，您使用网路服务储存的信息或数据等全部或部分发生删除、毁损、灭失或无法恢复的风险，均由您自行承担，我们不承担任何责任。<br>\
            13.	我们不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不做担保。<br>\
            14.	我们不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由我们实际控制的任何网页上的内容，我们不承担任何责任。<br>\
            15.	因铁路畅行会员相关规则由12306网解释，您使用我们的服务向12306网提交申请，我们对操作结果不做承诺。<br>\
             <br>\
            隐私政策<br>\
            一、	隐私政策的确认和接受<br>\
            尊重用户个人隐私是我司的一项基本政策。我司通过铁路官方网站或授权代售点为您提供火车票预订及增值服务。您在使用我们的产品与/或服务前仔细阅读并确认您已经充分理解本隐私政策所写明的内容，并与我们达成协议并接受所有的服务条款。<br>\
            我们十分注重保护用户的个人信息及隐私安全，我们理解您通过网络向我们提供信息是建立在对我们信任的基础上，我们重视这种信任，也深知隐私对您的重要性，并尽最大努力全力保护您的隐私。<br>\
            <br>\
            二、	信息的收集<br>\
            为了更好地为您提供服务，我们将遵循“合理、相关、必要”原则，且以您同意为前提收集信息，不会收集法律法规禁止收集的信息。考虑到火车票服务的重要性，用户同意，我们将会收集您在本服务中输入的或者以其他方式提供给我们的所有信息：<br>\
            1.	个人信息<br>\
            (1)	本服务通过铁路官方网站或授权代售点为您及他人提供火车票预订及增值服务，需要您提供并使用您及他人的相关个人信息（包括但不局限于姓名、性别、年龄、出生日期、证件号码、电子邮件地址、电话号码、通讯地址、职业、生物识别信息等）；或由您自行登录已有12306账号进行查询、购票、退票、改签等操作。如您未注册12306账号且继续使用服务，您同意并委托我司使用您已提供的姓名、身份证号、手机号、生物识别信息等个人信息为您及他人提供12306账号代为注册及进一步认证的便捷服务。<br>\
            (2)	在您预订火车票时，需提供乘客姓名、性别、出生日期、证件号、手机号、联系人姓名、邮箱、12306账号及密码信息。<br>\
            (3)	在您购买产品时需要使用邮寄（发票、车票等）服务时、需提供收货人的姓名、手机号、固定电话、配送地址信息，以便于您的订单能够送达。<br>\
            (4)	如果您需要开具纸质或电子发票，您还需提供包括发票抬头、邮箱在内的开票信息以及收件人、手机号、配送地址信息。<br>\
            (5)	在您购买产品进行支付结算时，需提供银行卡卡号、有效期、银行预留手机号、持卡人姓名、持卡人身份证件、卡验证码信息。<br>\
            (6)	当您联系我们的客服以获得我们的客户服务时，您还需要提供您的会员资料和订单信息来验证身份。<br>\
            (7)	我们也可能了解您的旅行计划、风格和喜好，包括膳食要求、出行/入离时间、座位选择、票务选择、保险选择以及我们提供其他服务所需要您提供的个人信息。<br>\
            (8)	在您后续更新个人信息时，需符合及时、详尽、准确的要求。<br>\
            (9)	您可以通过本服务为其他人预订，您需要提交该旅客的个人信息，向我们提供该旅客的个人信息之前，您确保已经取得其本人的明示同意，并确保其已知晓并接受本隐私政策。<br>\
            2.	设备信息<br>\
            本服务会收集设备相关信息，例如您的硬件型号、操作系统版本、软件版本等。这些信息能帮助我们优化产品和服务的用户使用体验。<br>\
            3.	位置信息<br>\
            (1)	当您开启设备定位功能并使用我们相关产品或服务时，我们可能会使用GPS、WiFi或其他技术方式收集和处理有关您实际所在位置的信息。<br>\
            (2)	您或其他用户提供的包含您所处地理位置的实时信息。<br>\
            (3)	如您不想被访问，可以选择关闭设备或产品/服务中的相关功能，但可能会因此影响我们向您提供相关服务（如用车/酒店服务等）。<br>\
            4.	日志信息<br>\
            指您使用我们产品和服务时，系统可能通过cookies或其他方式自动收集某些信息并存储在服务器日志中。此类信息可能包括：<br>\
            (1)	对我们产品和服务的详细使用情况，例如您使用的搜索词语、访问的页面地址、以及您在使用本服务时浏览或要求提供的其他信息和内容详情；用户习惯统计数据，例如在使用我们产品的设置项信息、部分功能的使用的次数等，该类数据都是匿名的，我们无法根据上传数据定位到具体用户。<br>\
            (2)	设备或软件信息，例如您的移动设备、网页浏览器或用于接入我们产品或服务的其他程序所提供的配置信息、移动设备所用的版本和设备识别码等。<br>\
            (3)	设备事件信息，例如崩溃、系统活动等信息。<br>\
            (4)	IP地址。<br>\
            5.	经您同意后收集的其他信息。<br>\
            6.	我们会从关联公司、业务合作伙伴来源获得您的相关信息。<br>\
            例如当您通过我们关联公司、业务合作伙伴网站及其移动应用软件等预订时，您向其提供的预订信息可能会转交给我们，以便我们处理您的订单，确保您顺利预订。又如，我们允许您使用其它应用的账号关联我们的账号进行登录，在您同意的情况下（您授权给该社交平台），您的相关个人信息会通过应用分享给我们。我们将依据与关联公司、业务合作伙伴的约定，对这些个人信息来源的合法性进行确认。<br>\
            <br>\
            三、	信息使用<br>\
            1.	我们和/或服务商通常出于以下目的收集、使用您的个人信息：<br>\
            (1)	向您提供服务：我们使用您的个人数据处理、操作、优化并管理您及他人的相关的产品或服务。另外，我们也会通过关联公司、业务合作伙伴和第三方为您提供相关的产品和服务。<br>\
            (2)	账号管理：您可以通过平台创建账号，我们将使用您所提供的信息来与平台合作管理您的账号，并为您提供一系列的实用功能，您可以使用您的账号进行多种操作，如管理订单、调整个人设置、添加常用旅客信息、查看历史订单信息、订单评价、支付管理等。<br>\
            (3)	答复您的问询和请求以便在您需要的时候提供帮助。<br>\
            (4)	营销活动：我们也会使用您的信息进行正当合法的营销活动，如向您发送旅行相关的产品或者服务的最新消息、向您提供您可能感兴趣的个性化推荐及其他推广活动信息。<br>\
            (5)	与您联系：回复及处理您所提出的疑问或要求、发送与订单相关的信息（如订单提交成功提示、未完成订单的提醒您继续等）、我们也可能会向您发送问卷调查或邀请您对我们的服务提供反馈等。<br>\
            (6)	市场调研：我们有时会邀请您参与市场调查，以衡量您对我们的产品、服务和网站的兴趣。<br>\
            (7)	提升服务的安全性和可靠性：我们可能会检测和预防欺诈行为、不法活动，将您的个人数据用于风险评估和安全目的。<br>\
            (8)	数据分析：我们可能将您的订单数据用于分析，从而形成用户画像，以便让我们能够了解您所在的位置、偏好和人口统计信息，或与其他来源（包括第三方）的数据相匹配，从而开发我们的产品、服务或营销计划，改进我们的服务。<br>\
            (9)	控制信用风险：为了确保交易安全，我们及关联公司、业务合作伙伴可能对用户信息进行数据分析，并对上述分析结果进行商业利用。<br>\
            (10)	日常运营：包括但不限于订单管理、客户验证、技术支持、网络维护、故障排除、内部行政事务及内部政策和程序、生成内部报告等。<br>\
            (11)	电话监测：您接听和拨打我们的客服电话可能会被录音，我们可能会使用通话录音来监控我们的客服服务质量，检查您所提供的信息的准确性以防止欺诈，或为了我们内部人员培训的目的。录音在被保留一段时间后会自动删除，除非由于合规要求或合法利益需要为场景的保留。<br>\
            (12)	履行义务：处理相关政策下发生的保险索赔和付款，处理支付给合作伙伴的佣金或对服务合作伙伴造成的损失提起索赔或收回付款等。<br>\
            (13)	法律目的：我们可能需要使用您的信息来处理和解决法律纠纷，或遵循对我们具有约束力的任何法律法规或监管机构颁发的文件规定，以配合国家部门或监管机构调查和遵从法律法规的目的。<br>\
            (14)	此外，我们可能会出于其他目的收集、使用和披露您的个人信息，并通过修订本声明的形式告知您。<br>\
            2.	您在享受本服务的同时，授权并同意接受我们向您的电子邮件、手机、通信地址等发送商业信息，包括不限于最新的我们的产品信息、促销信息等。若您选择不接受提供的各类信息服务，您可以通过通知我司指定客户经理的方式设置拒绝该类信息服务。<br>\
            3.	您充分知晓，以下情形中我们及服务商使用个人信息无需征得您的授权同意：<br>\
            (1)	与国家安全、国防安全有关的；<br>\
            (2)	与公共安全、公共卫生、重大公共利益有关的<br>\
            (3)	与犯罪侦查、起诉、审判和判决执行等有关的；<br>\
            (4)	出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；<br>\
            (5)	所收集的个人信息是个人信息主体自行向社会公众公开的；<br>\
            (6)	从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道；<br>\
            (7)	根据您的要求签订合同所必需的；<br>\
            (8)	用于维护所提供的产品与/或服务的安全稳定运行所必需的，例如发现、处置产品与/或服务的故障；<br>\
            (9)	为合法的新闻报道所必需的；<br>\
            (10)	学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；和<br>\
            (11)	法律法规规定的其他情形。<br>\
            4.	用户体验改进：<br>\
            (1)	指导我们对产品功能优先级和优化方向的判断；帮助我们分析异常情况，提升对不同网络环境的适应能力和产品体验；程序出现意外错误或者崩溃时的错误日志，协助我们定位程序错误或崩溃原因，改善产品质量及提供更优质的服务等。改善向您提供的服务和信息。<br>\
            (2)	在我司提供产品和服务时，用于身份验证、客户服务、安全防范、存档和备份等用途，确保我们向您提供的产品和服务的安全性。<br>\
            (3)	帮助我们设计新产品和服务，改善我们现有产品和服务，提升用户体验。例如我们在提供某些产品或服务中，可能会请用户参与“用户体验改进计划”，加入用户体验改进计划的用户，我们会根据需要对产品和服务的各项功能使用情况进行统计，这样可以通过分析统计数据提高产品和服务质量，并且推出对用户有帮助的创新产品和服务。如您不想参与该计划，可以选择关闭相关产品/服务中的相关功能。<br>\
            (4)	使我们更加了解您如何接入和使用我们的产品和服务，从而针对性地回应您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示，或对您和其他用户作出其他方面的回应。<br>\
            (5)	评估我们产品和服务中的广告和其他促销及推广活动的效果，并加以改善。<br>\
            (6)	软件认证或管理软件升级。<br>\
            (7)	您了解并同意，我们会根据您的委托及授权为您开通12306会员或使用您的12306会员账户及密码，同时为您或他人执行查询、购票、退票、改签等火车票服务相关操作，为了后续进一步向您提供优质服务，也会在系统中记录前述相关信息。对于您的隐私信息及相关交易信息，我们会严格保护不予公开，除铁路客运机构、服务商等合作伙伴外不向任何第三方提供，不会用于无关火车票服务的用途。同时您必须遵守铁路客运规定和铁路客运机构的服务说明和要求包括但不限于12306购票规定的服务条款（http://www.12306.cn）。<br>\
            (8)	让您参与有关我们产品和服务的调查。<br>\
            (9)	经您同意的其他用途。<br>\
            (10)	为了让您有更好的体验、改善我们的产品和服务或为了您同意的其他用途，在符合相关法律法规的前提下，我们可能将通过某一产品或服务所收集的信息，以汇集信息或者个性化的方式，用于我们的其他产品和服务。例如，在您使用我们的火车票这一项服务时所收集的信息，可能在另一服务中用于向您提供特定内容，或向您展示与您相关的、非普遍推送的信息（推送机票推荐信息等）。如果我们在相关服务中提供了相应选项，您也可以授权我们将该服务所提供和储存的信息用于我们的其他服务。<br>\
            <br>\
            四、	信息共享、转让和公开披露<br>\
            1.	我们可能会向合作伙伴等第三方共享您的订单信息、账户信息、设备信息以及位置信息，以保障为您提供的产品和服务顺利完成。但我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴包括以下类型（包含中国境内和中国境外实体）：<br>\
            (1)	服务商：为火车票服务提供信息服务的第三方服务商。这些服务商为您预订的服务提供执行，他们有可能在本隐私政策的授权范围内收集和使用您的个人信息。<br>\
            (2)	金融机构和第三方支付机构：当您需要预订订单、申请退款、购买保险等操作时，我们会与金融机构或第三方支付机构共享特定的订单信息，当我们认为用于欺诈检测和预防目的实属必要时，我们将进一步和相关金融机构共享其他必要信息，如IP地址等。<br>\
            (3)	业务合作伙伴：我们可能与合作伙伴一起为您提供产品或者服务，包括快递业务、通讯服务、客户服务、市场推广、广告投放等。<br>\
            (4)	关联公司：我们可能会与我们的关联公司共享您的个人信息，使我们能够向您提供与旅行相关的或者其他产品及服务的信息，他们会采取不低于本隐私政策同等严格的保护措施。<br>\
            (5)	对于我们与之共享个人信息的公司、组织我们会与其签署严格的保密协定，要求他们按照本隐私政策以及我们其他相关的保密和安全措施来处理个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途，如要改变个人信息的处理目的，将再次征求您的授权同意。<br>\
            2.	信息转让<br>\
            我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：<br>\
            (1)	事先获得您的明确同意或授权；<br>\
            (2)	根据适用的法律法规、法律程序的要求、强制性的行政或司法要求；<br>\
            (3)	在涉及合并、收购、资产转让或类似的交易时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本隐私政策的约束，否则,我们将要求该公司、组织重新向您征求授权同意。<br>\
            3.	公开披露<br>\
            我们仅会在以下情形，公开披露您的个人信息：<br>\
            (1)	根据您的需求，在您明确同意的披露方式下披露您所指定的个人信息<br>\
            (2)	根据法律、法规的要求、强制性的行政执法或司法要求所必须提供您个人信息的情况下，我们可能会依据所要求的个人信息类型和披露方式公开披露您的个人信息。在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件，如传票或调查函。<br>\
            <br>\
            五、	信息保存及跨境传输<br>\
            1.	您的个人信息我们将保存至您账号注销之日后的三个月，除非需要延长保留期或受到法律或者有权机关的允许或协助有权机关进行查询。<br>\
            2.	如我们停止运营我们产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，对所持有的个人信息进行删除或匿名化处理。<br>\
            3.	我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内，以下情形除外：<br>\
            (1)	法律法规有明确规定；<br>\
            (2)	获得您的明确授权；和<br>\
            (3)	您通过互联网进行跨境交易等个人主动行为。<br>\
            <br>\
            六、	个人敏感信息提示<br>\
            某些特殊的个人信息可能被认为是个人敏感信息，例如您的身份证、种族、宗教、个人健康和医疗信息等，这些个人敏感信息将受到严格保护。本隐私政策在此提醒您，您在使用我们为您提供的产品及服务中所上传或发布的内容和信息可能会披露泄露您的个人敏感信息。因此，您需要在使用我们为您提供的产品或服务前谨慎考虑。您同意这些个人敏感信息将按照本隐私政策阐明的目的和方式来进行处理。因此，您需要在使用我们为您提供的产品或服务前谨慎考虑。您同意这些个人敏感信息将按照本隐私政策阐明的目的和方式来进行处理。<br>\
            <br>\
            七、	信息安全保护<br>\
            1.	我们仅在本政策所述目的所必需的期间和法律法规要求的时限内保留您的个人信息。<br>\
            2.	我们将对收集的信息采取严格的管理及保密措施，我们将使用相应的技术，防止您的个人资料丢失、被盗用或遭篡改。<br>\
            3.	我们将使用安全技术和程序监测、记录网络运行状态、网络安全事件，并采取必要的技术措施保障网络安全，以防信息的丢失、不当使用、未经授权阅览或披露。例如，在某些服务中，我们将利用加密技术来保护您提供的个人信息。但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的产品和服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。请妥善保管您的账号及密码信息，切勿将密码告知他人，如果您发现自己的个人信息泄露，特别是您的账号和密码发生泄露，请您立即与我们的客服联系，以便我们采取相应的措施。如您的'+ cShortName + '或12306账户或密码泄露，请立即按照' + cShortName + '或12306.cn的规则处理。请您及时保存或备份您的文字、图片等其他信息。您需理解并接受，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。<br>\
            <br>\
            八、	信息安全事件处置<br>\
            如果不幸发生个人信息安全事件，我们将按照法律法规的要求向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。事件相关情况我们将以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。<br>\
            <br>\
            九、	未成年人信息保护<br>\
            我们非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人，在使用本服务前，应事先取得您家长或法定监护人的书面同意。<br>\
            <br>\
            十、	用户个人信息管理<br>\
            如您希望终止使用本服务并删除您的个人信息或撤回您的授权，请联系我们：邮箱 '+ pEmail + '，电话：' + pPhone + ' 。<br>\
            如您希望继续使用本服务预订但不再将个人信息用于体验升级服务并享受产品体验升级相关的功能，亦可联系我们删除相关信息和撤回该部分授权，但请知晓这将影响您使用本服务中相关功能的体验，并可能导致您可能无法享用本服务功能外的服务及功能。当您希望再次享有产品体验升级相关功能及服务时，您可能需要操作包括但不限于手动重新输入所需要的个人信息、重新提供历史交易信息、提供生物识别信息的验证、重新阅读和接受本服务和隐私政策、铁路客运机构的规定、以及服务商的隐私条款以便重新提供您的相关个人信息并作出授权。<br>\
            <br>\
            十一、	从中国大陆地区以外访问我们的服务<br>\
            如果您从中国大陆以外地区访问我们的服务，请您注意，您的信息可能被传送至、存储于中国大陆，并且在中国大陆进行处理。中国大陆的数据保护法和其他法律可能与您所在国家/地区的法律不同，但请相信我们将采取措施保护您的信息。选择使用我们的服务的同时，您了解并同意您的信息可能被传送至我们的网站，并如本隐私政策所诉的与我们共享信息的第三方。<br>\
            <br>\
            十二、	隐私政策的适用范围<br>\
            我们所提供的火车票服务适用本隐私政策，除非特定服务将适用特定的隐私政策并征得您的知情同意，该等特定服务（如有）的隐私政策将构成本隐私政策的一部分。如任何特定服务的隐私政策与本隐私政策有不一致之处，则适用特定服务的隐私政策。<br>\
            请您注意，本隐私政策不适用于以下情况：通过我们的服务而接入的第三方供应商（包括任何第三方网站）收集的信息；通过在我们服务中进行广告服务的其他公司和机构所收集的信息。<br>\
            <br>\
            十三、	本隐私政策如何更新<br>\
            我们的隐私政策可能变更。未经您明确同意，我们不会限制您按照本隐私政策所应享有的权利。对于重大变更，我们会提供更为显著的通知（包括我们会通过公示的方式进行通知甚至向您提供弹窗提示）。请您经常回访本隐私政策，以阅读最新版本。<br>\
            本政策所指的重大变更包括但不限于：<br>\
            1、我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；<br>\
            2、我们在控制权等方面发生重大变化。如并购重组等引起的所有者变更等<br>\
            3、个人信息共享、转让或公开披露的主要对象发生变化；<br>\
            4、您参与个人信息处理方面的权利及其行使方式发生重大变化；<br>\
            5、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；和<br>\
            6、个人信息安全影响评估报告表明存在高风险时。<br>\
            <br>\
            十四、	如何联系我们<br>\
            如您对此服务有任何问题，您可致电客服专线，我们将积极为您处理。<br>\
            <br>\
            十五、	争议解决<br>\
            如因本服务相关事宜的履行发生争议，您同意按照中华人民共和国颁布的相关法律法规解决争议，并同意接受上海市徐汇区人民法院的管辖。<br>\
            <br>\
            十六、	协议更新<br>\
            您同意并授权我司有权随时对本协议内容进行单方面的变更，并以在我司及关联公司网站、APP、微信等第三方渠道公告的方式提前予以公布，无需另行单独通知您；若您在本协议内容公告变更生效后继续使用我司服务的，表示您已充分阅读、理解并接受变更修改后的协议内容，也将遵循变更修改后的协议内容使用相关服务；若您不同意变更修改后的协议内容，您应在变更生效前停止使用我们提供的火车票信息服务及其他相关服务。<br>\
            <br>\
            本协议未尽事宜，以我司后续公布的相关规则为准，按照我司公布的相关规则亦未对所涉事项进行规定的，以铁路客运机构公布的规定、政策为准。<br>\
            '
        })
        return agreement;
    }
    //初始化12306账号
    this.insertAccount = function (root) {
        this.__initDom(root);
    }
    //维护账号密码显示控制
    this.__togglePasswordType = function () {
        if ($('.train--maintain12306--password').attr('type') == 'password') {
            $('.train--maintain12306--password').attr('type', 'text');
            $('.train--maintain12306--password-show').addClass('show');
        } else {
            $('.train--maintain12306--password').attr('type', 'password');
            $('.train--maintain12306--password-show').removeClass('show');
        }
    }

    //获取证件信息
    this.getPassengerInfo = function (id, obtLanguage) {
        var that = this;
        var passengerInOrderJson = {
            key: id.removeQuotation(),
            Language: obtLanguage
        }
        ajax_getPassengersInOrder(passengerInOrderJson, function (res) {
            that.__setAccount(res[0].ChinaRailwayAccountName, res[0].ChinaRailwayAccountPwd)
        })
    }
    //设置账号信息
    this.__setAccount = function (ChinaRailwayAccountName, ChinaRailwayAccountPwd) {
        this.account = ChinaRailwayAccountName;
        this.password = ChinaRailwayAccountPwd;
        this.encryptAccount = this.__encryptAccount();
    }
    //初始化全屏弹窗
    this.__initPopWindowBox = function () {
        $('.train--maintain12306-box').remove();
        var dom = '<div class="train--maintain12306-box">\
                        <header>\
                        <img src="../train/images/icon_cha.png" alt="" name="train--maintain12306-box">\
                        </header>\
                    </div>\
                    <div id="agreementText">\
                        <header>\
                            <img src="../train/images/icon_cha.png" alt="" class="agreementText--closeBtn">\
                            <h6 class="agreementText--title">'+ this.get_lan('agreementTitle') + '</h6>\
                        </header>\
                        <div class="agreementText--textBox"><p>'+ this.getAgreement() + '</p></div>\
                    </div>'
        if ($('.train--maintain12306-box').length == 0) {
            $('body').prepend(dom);
            $(".train--maintain12306-box header img").bind('click', function () {
                $('.' + $(this).attr('name')).hide();
                $('#cover12306').hide();
            })
            $('.train--maintain12306-box').attr('data-id', this.customerID);
        }
        $('.agreementText--closeBtn').bind('click', function () {
            $('#agreementText').hide();
        })
    }
    //初始化全屏弹窗-维护账号
    this.__initMaintainPopWindow = function () {
        var that = this;
        var dom = '<section>\
                        <h6 class="">'+ this.get_lan('maintainTitle') + '</h6>\
                        <div class="train--maintain12306--inputbox">\
                            <span class="train--maintain12306--inputText">'+ this.get_lan('account') + '</span>\
                            <input type="text" class="train--maintain12306--account" id="train--maintain12306--account" placeholder="'+ this.get_lan('accountPlaceholder') + '" autocomplete="off" value="">\
                        </div>\
                        <div class="train--maintain12306--inputbox tipsBox">\
                            <div class="train--maintain12306--tipsImg"></div>\
                            <span class="train--maintain12306--tips pageColor">'+ this.get_lan('maintainTips') + '</span>\
                        </div>\
                        <div class="train--maintain12306--inputbox">\
                            <span class="train--maintain12306--inputText">'+ this.get_lan('password') + '</span>\
                            <input type="password" class="train--maintain12306--password" id="train--maintain12306--password" placeholder="'+ this.get_lan('passwordPlaceholder') + '" autocomplete="new-password" value="">\
                            <div class="train--maintain12306--password-show" style="display:none"></div>\
                        </div>\
                        <p class="train--maintain12306--agreePolicy">\
                            <input type="checkbox" name="agree12306account" id="agree12306account">\
                            <label for="agree12306account">'+ this.get_lan('agree') + '</label>\
                            <span class="agreementText--openBtn">'+ this.get_lan('agreement') + '</span>\
                        </p>\
                        <div class="train--maintain12306--btnBox">\
                            <div id="train--maintain12306--btn" class="train--maintain12306--btn">'+ this.get_lan('confirm') + '</div>\
                            <div class="train--maintain12306--forgotBox">\
                                <a class="train--maintain12306--forgot" href="'+ this.get_lan('forgotHref') + '" target="_blank">' + this.get_lan('forgotPwd') + '</a>\
                                <div class="train--maintain12306--reminder">\
                                    <img src="/train/images/icon_help.png"/>\
                                    <div class="train--maintain12306--forgotPwdReminder">'+ this.get_lan('forgotPwdReminder') + '</div>\
                                </div>\
                            </div>\
                        </div>\
                    </section>'
        $('.train--maintain12306-box').append(dom);
        this.checkKeyCode('train--maintain12306--account');
        this.checkKeyCode('train--maintain12306--password');
        $('.train--maintain12306--password-show').bind('click', function () {
            that.__togglePasswordType();
        })
        $('.agreementText--openBtn').bind('click', function () {
            $('#agreementText').show();
        })
        if ($.session.get('obtLanguage') === 'CN') {
            $('.train--maintain12306--forgotPwdReminder').css('top', '-40px')
        }
    }
    //打开维护账号
    this.__openMaintainWindow = function () {
        this.__initPopWindowBox();
        this.__initMaintainPopWindow();
        var accountVal = '', passwordVal = '', isAgree = false, agreeBtnActive = '';
        if (this.__hasAccount()) {
            accountVal = this.account;
            passwordVal = this.password;
            isAgree = true;
            agreeBtnActive = 'active btnBackColor';
        }
        $(this.__addHead('#agree12306account')).prop('checked', isAgree)
        $(this.__addHead('.train--maintain12306--account')).val(accountVal);
        $(this.__addHead('.train--maintain12306--password')).val(passwordVal);
        $(this.__addHead('#train--maintain12306--btn')).addClass(agreeBtnActive);
        this.__canClickMaintainBtn();
        $(this.__addHead('')).show();
        $('#cover12306').show();
    }
    //初始化全页面容器
    this.__initDom = function (root) {
        var title = '<span class="editTitle"></span>', accountSpan = '', beforeEdit = '', afterEdit = '', editText = '';
        var that = this;
        // $('.train--maintain12306-box').attr('data-id',this.customerID);
        var isOrderPage = window.location.href.indexOf('order') > -1
        if (this.__hasAccount()) {
            title = isOrderPage ? '<span class="editTitle">' + this.get_lan('editTitle') + '</span>' : ''
            beforeEdit = this.encryptAccount;
            editText = this.get_lan('edit');
        } else {
            beforeEdit = isOrderPage ? '<img src="/train/images/icon_intadd_blue.png" class="add12306Icon"/>' : this.get_lan('TextBeforeAdd');
            afterEdit = isOrderPage ? '' : this.get_lan('TextAfterAdd');
            editText = isOrderPage ? this.get_lan('addForRefund') : this.get_lan('add');
        }
        accountSpan = title + '<span data-id="' + this.customerID + '" data-account="' + this.account + '" class="beforeEdit">' + beforeEdit + '</span><span class="open12306accPopWindow" data-id="' + this.customerID + '">' + editText + '</span><span class="afterEdit">' + afterEdit + '</span>';

        $(".passengerLi[customerid='" + this.customerID + "'] " + root).append('<div class="customer12306account">' + accountSpan + '</div>');
        var editBtn = '.open12306accPopWindow[data-id="' + this.customerID + '"]';
        //修改账号和操作键样式
        if (['修改', 'Edit'].indexOf(editText) >= 0) {
            $(editBtn).css('margin-left', '10px');
        } else {
            $(editBtn).css('margin-left', '0px');
        }

        $(editBtn).bind('click', function () {
            console.log('123');
            that.__openMaintainWindow();
            $(('.train--maintain12306-box input')).on('input propertychange', function () {
                that.__canClickMaintainBtn()
            })
            $(('#agree12306account')).on('change propertychange', function () {
                that.__canClickMaintainBtn()
            })
        })
    }
    //添加选择器头部，用于多乘客dom操作
    this.__addHead = function (domStr) {
        console.log('.train--maintain12306-box[data-id="' + this.customerID + '"]' + ' ' + domStr)
        return '.train--maintain12306-box[data-id="' + this.customerID + '"]' + ' ' + domStr;
    }
    //页面账号显示加密
    this.__encryptAccount = function () {
        if (typeof (this.account) != 'string') {
            return this.account;
        }
        const length = this.account.length;
        console.log('length=' + length);
        var start = 0, end = 0;

        if (length > 7) {
            start = 3;
            end = 4;
        } else if (length <= 7 && length > 2) {
            [start, end] = [1, 1]
        } else {
            return this.account;
        }
        return this.account.replace(this.account.slice(start, length - end), function (sMatch) {
            console.log(sMatch);
            return sMatch.replace(/./g, "*")
        })
    }
    //判断实例是否有账号
    this.__hasAccount = function () {
        var bool = this.account && this.password ? true : false;
        return bool;
    }


    //判断维护账号内的提交按钮是否可以点击
    this.__canClickMaintainBtn = function () {
        var that = this;
        var accountInputVal = $(this.__addHead('.train--maintain12306--account')).val();
        var passwordInputVal = $(this.__addHead('.train--maintain12306--password')).val();
        var agreePolicy = $(this.__addHead('#agree12306account')).prop('checked');
        if (agreePolicy && accountInputVal && passwordInputVal) {
            $(this.__addHead('.train--maintain12306--btn')).addClass('active btnBackColor');
            $(this.__addHead('.train--maintain12306--btn')).unbind('click').bind('click', function () {
                if ($(this).hasClass('active')) {
                    that.__setAccount(accountInputVal, passwordInputVal);
                    that.__update12306account();
                }
            })
        } else {
            $(this.__addHead('.train--maintain12306--btn')).removeClass('active btnBackColor');
        }
    }
    //更新数据库内12306账号
    this.__update12306account = function () {
        var that = this;
        console.log(that);
        var account = {
            request: {
                basicInfo: ',,',
                customerId: this.customerID,
                docInfo: '',
                emailInfo: '',
                id: netUserId.removeQuotation(),
                language: obtLanguage,
                memberShipInfo: '',
                phoneInfo: '',
                railwayAccountName: this.account,
                railwayAccountPwd: this.password,
            }
        }
        ajax_updateCustomerInfo(account, function (res) {
            console.log(res);
            var isOrderPage = window.location.href.indexOf('order') > -1
            if (isOrderPage) {
                $('.editTitle').text(that.get_lan('editTitle'))
                $('.customer12306account span[data-id="' + that.customerID + '"]').eq(1).css('margin-left','10px')
            }
            $('.customer12306account span[data-id="' + that.customerID + '"]').addClass('hasAccount').attr('data-account', that.account);
            $('.customer12306account span[data-id="' + that.customerID + '"]').eq(0).text(that.encryptAccount);
            $('.customer12306account span[data-id="' + that.customerID + '"]').eq(1).text(that.get_lan('edit'));
            $('.customer12306account .afterEdit').text('');

            $(that.__addHead('')).hide();
            $('#cover12306').hide();
        })
    }

    this.checkKeyCode = function (elementID) {
        document.getElementById(elementID).onkeydown = function (event) {
            var that = this
            check(event, that)
        }
        // 按键监听事件
        var CnList = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Delete', 'Insert', 'Space', 'Backspace', 'KeyA',
            'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ', 'KeyK', 'KeyL', 'KeyM', 'KeyN', 'KeyO',
            'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT', 'KeyU', 'KeyV', 'KeyW', 'KeyX', 'KeyY', 'KeyZ'
        ]
        var numList = []
        for (var i = 0; i < 10; i++) {
            numList.push("Digit" + i)
            numList.push("Numpad" + i)
        }
        function check(e, dom) {
            //获取键盘输入的keyCode 
            console.log(e.keyCode)
            var keycode = (Number)(e.keyCode);
            // 中文输入法下keyCode为229
            if (e.keyCode == 229) {
                if (CnList.indexOf(e.code) > -1 || numList.indexOf(e.code) > -1) {
                    e.returnValue = true;
                } else {
                    var str = $(dom).val()
                    $(dom).val(str.substring(0, str.length - 1))
                    setTimeout(function () {
                        $(dom).val(str.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''))
                    }, 10);
                }
            } else if (keycode >= 65 && keycode <= 90) {
                //键盘上方数字键        
                //小数字键盘      
                e.returnValue = true;
            } else if (keycode == 8 || keycode == 13 || keycode == 35 || keycode == 36 || keycode == 46 || keycode == 32 ||
                keycode == 37 || keycode == 38 || keycode == 39 || keycode == 40 || keycode == 189 || keycode == 50 || keycode == 190) {
                //8 Backspace 13 Enter  35 end 36 home 46 Delete
                //32 空格 37,38,39,40 ←↑→↓ 189 _(-)
                //50 @ 190 .
                e.returnValue = true;
            } else if ((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105)) {
                //非中文，0-9
                e.returnValue = true;
            } else {
                e.returnValue = false;
            }
        }
    }
    this.__alertError = function (message) {
        var passengerTips = '<p>' + this.get_lan('passenger') + '<b>' + this.name + '</b></p>';
        tools.Dialog.alert(this.get_lan('tips'), passengerTips + message, this.get_lan('confirm'));

    }
    // ===================== 检查12306账号流程 =========================
    //检查12306账号是否可用
    this.check12306account = function (index, callback, check12306json) {
        if (this.__hasAccount()) {
            this.callback = callback;
            this.check12306json = check12306json || {
                Language: obtLanguage,
                captchaCode: '',
                customerID: $('.passengerLi').eq(index).attr('passengerid') || $('.passengerLi').eq(index).attr('customerid'),
                docmentNo: $('.documentsSelect option:selected').eq(index).attr('doctext'),
                docmentType: $('.documentsSelect option:selected').eq(index).attr('value'),
                key: netUserId.removeQuotation()
            }
            this.__fullCheck12306progress();
        } else {
            var editBtn = '.open12306accPopWindow[data-id="' + this.customerID + '"]';
            $(editBtn).click();
            // this.__alertError(this.get_lan('bookWithout12306'));

            // this.callback(2);
            $('body').mLoading("hide");
        }
    }

    //完整的12306核验流程
    this.__fullCheck12306progress = function () {
        var that = this;
        ajax_checkFor12306(this.check12306json, function (res) {
            if (res.code == 200) {
                that.mobileNo = res.mobileNo;   //验证的电话
                console.log(that.mobileNo);
                if (res.needLoginCheck == 'true') {
                    //登录核验
                    that.__openLoginVerification();
                } else {
                    that.__checkstatus(res);
                }
            } else {
                var errorMsg = res.errorMsg;
                that.__alertError(errorMsg);
                // that.callback(2);
                $('body').mLoading("hide");
            }
        })
    }

    //打开登录核验
    this.__openLoginVerification = function () {
        this.__initPopWindowBox();
        this.__initLoginVerification();
        $(this.__addHead('')).show();
        $('#cover12306').show();
        // this.callback(2);
        $('body').mLoading("hide");
    }

    //判断12306核验接口内状态是否为200
    this.__checkstatus = function (res) {
        var that = this;
        if (res.checkStatus == 200) {
            if (res.phoneStatus != 200) {
                //手机核验
                this.__VerificationPop(res);
                // this.callback(2);
                $('body').mLoading("hide");
            } else {
                //继续预订下去
                this.callback();
            }
        } else {
            // this.callback(2);
            $('body').mLoading("hide");
            errorMsg = res.checkMsg
            this.__alertError(errorMsg);
        }
    }

    //初始化全屏弹窗-登录核验
    this.__initLoginVerification = function () {
        var that = this;
        var dom = '<section class="train--verificationCode--container">\
                            <div class="train--verificationCode--textbox">\
                                <p>'+ this.get_lan('loginVerifyText1') + '</p>\
                                <p>'+ this.get_lan('loginVerifyText2') + '<b>' + that.mobileNo + '</b></p>\
                                <p>'+ this.get_lan('loginVerifyText3') + '<strong>666</strong>' + this.get_lan('loginVerifyText4') + '<b>12306</b>；</p>\
                                <p>'+ this.get_lan('loginVerifyText5') + '<br>\
                                '+ this.get_lan('loginVerifyText6') + '<b>10</b>' + this.get_lan('loginVerifyText7') + '</p>\
                            </div>\
                            <div class="train--verificationCode--box">\
                                <input type="text" placeholder="'+ this.get_lan('verificationCodePlaceholder') + '" class="train--verificationCode--input">\
                            </div>\
                            <div class="train--verificationCode--container">\
                                <p class="train--verificationCode--errorMsg">'+ this.get_lan('verificationErrorMsg') + '</p>\
                            </div>\
                            <div id="train--verificationCode--submit" class="train--verificationCode--submit">'+ this.get_lan('submit') + '</div>\
                        </section>';
        $('.train--maintain12306-box').addClass('train--verificationCode').find('header').append('<h5>' + this.get_lan('loginVerifyTitle') + '</h5>')
        $('.train--maintain12306-box').append(dom);
        $('.train--maintain12306--account::before').val(this.get_lan('account'));
        $('.train--maintain12306--inputbox::before').val(this.get_lan('password'));
        $(('.train--verificationCode--input')).bind('input propertychange', function () {
            that.__canClickVerificationBtn()
        })
    }

    //判断登录核验内的提交按钮是否可以点击
    this.__canClickVerificationBtn = function () {
        var that = this;
        var verificationCode = $(this.__addHead('.train--verificationCode--input')).val();
        console.log(this.__addHead('.train--verificationCode--input'));
        if (verificationCode) {
            $(this.__addHead('#train--verificationCode--submit')).addClass('active btnBackColor');
            $(this.__addHead('#train--verificationCode--submit.active')).unbind('click').bind('click', function () {
                //调接口传验证码
                that.check12306json.captchaCode = verificationCode;
                $('body').mLoading("show");
                ajax_checkFor12306(that.check12306json, function (res) {
                    $('body').mLoading("hide");
                    $('#cover12306').hide();
                    if (res.needLoginCheck == 'true') {
                        //清空验证码
                        $('.train--verificationCode--input').val();
                        $(that.__addHead('#train--verificationCode--submit')).removeClass('active btnBackColor');
                        $('.train--verificationCode--errorMsg').show();
                    } else {
                        $('.train--maintain12306-box').hide();
                        that.__checkstatus(res);
                    }
                })
            })
        } else {
            $(this.__addHead('#train--verificationCode--submit')).removeClass('active btnBackColor');
        }
    }

    //手机核验
    this.__VerificationPop = function (res) {
        var that = this;
        // status=succeed或者unknown; mobileStatus=succeed或者unknown时，表示验证通过
        // var userInfos=verificationMode.passengerInfos
        var hideClose = "hide"
        //sms://[号码]?body=[内容] //安卓
        //sms://[号码]&body=[内容] //IOS
        var btnGroup = '<div class="credentBtnGroup"><div class="btn cancelBtn">' + that.get_lan('cancel') + '</div><div class="btn credentBtn">' + that.get_lan('refreshVerificationResult') + '</div></div>'
        $('body').append('\
			<div id="coverCredent">\
				<div class="credentGroupPop">\
					<div class="closeCredent '+ hideClose + '"></div>\
					<div class="credentTitle">'+ that.get_lan('phoneVerifyTitle') + '</div>\
					<div class="credentList">\
					</div>'
            + btnGroup +
            '</div>\
			</div>\
		')
        var numColor = ProfileInfo.onlineStyle == "APPLE" ? "#3083FB" : "#7086D8"
        $('.credentList').append('\
			<div class="credentLi">\
				<div style="margin-top:20px;font-size:16px;color:#333;line-height:22px;">'+ that.get_lan('passenger') + '<span style="font-weight: 600;">' + this.name + '</span></div>\
				<div style="margin-top:8px;font-size:16px;color:#333;line-height:22px;">'
            + that.get_lan('phoneVerifyText1') +
            '<span style="font-size:16px;font-weight:600"> ' + res.mobileNo + ' </span>\
				</br>\
				'+ that.get_lan('phoneVerifyText2') + '\
					<span style="font-size:16px;color:'+ numColor + ';font-weight:600">' + res.captcha + ' </span>\
					'+ that.get_lan('phoneVerifyText3') + '\
					<span style="font-size:16px;color:'+ numColor + ';font-weight:600"> 12306 </span>\
				</div>\
            </div>\
            <div class="credentLi">\
                <h6>'+ that.get_lan('verifyStatus') + '</h6>\
                <span class="credent--verifyStatus">'+ that.get_lan('pendingVerification') + '</span>\
            </div>\
			')
        var h = $('.credentGroupPop').height();
        $('.credentGroupPop').css('margin-top', "calc(50vh - " + h / 2 + "px)")
        // 关闭按钮
        $(".closeCredent,.cancelBtn").click(function () {
            $('body').mLoading("hide");
            $("#coverCredent").remove()
        })
        //刷新状态按钮
        $(".credentBtn").click(function () {
            $('body').mLoading("show");
            var jsonStr = {
                param: {
                    accountNo: that.account,
                    queryType: 1,
                    passType: 1,
                    passengerName: that.name,
                    certType: that.check12306json.docmentType,
                    certNo: that.check12306json.docmentNo
                }
            }
            ajax_getTravelerVerifyResult(jsonStr, function (verifyResult) {
                $('body').mLoading("hide");
                $('.credent--verifyStatus').css('color', numColor);
                if (verifyResult.phoneStatus == 1) {
                    that.check12306json.captchaCode = '';
                    $("#coverCredent").remove()
                    $('body').mLoading('show');
                    that.__fullCheck12306progress();
                } else {
                    $('.credent--verifyStatus').text(that.get_lan('verifyFailed'));
                }
            })
        })
    }

    this.customerID = customerID;
    this.account = account || null;
    this.password = password || null;
    this.encryptAccount = this.__encryptAccount();
    this.name = name;
    this.mobileNo = '';
    this.check12306json = {};
    this.__initPopWindowBox();
    this.__initMaintainPopWindow();
    this.callback = function () { };
}