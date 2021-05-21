export interface Dictionary {
    languageTxt: string
    companyNameTxt: string
    userNameTxt: string
    passwordTxt: string
    loginTxt: string
    saveUsernameTxt: string
    forgotPasswordTxt: string
    noticeTitleTxt: string
    noticeBodyTxt: string
    noticeBodyLinkName: string
    noticeBodyTxt2: string
    backupTxt: string
}


const dictionary = {
    CN: {
        languageTxt: "English",
        companyNameTxt: "公司名",
        userNameTxt: "用户名",
        passwordTxt: "密码",
        loginTxt: "登录",
        saveUsernameTxt: "记住用户名",
        forgotPasswordTxt: "忘记密码",
        noticeTitleTxt: "公告信息",
        noticeBodyTxt: "关于交通运输部令2016年第56号《航班正常管理规定》第十七条\"承运人应当制定并公布运输总条件\"请登录 ",
        noticeBodyLinkName: "交通部网站",
        noticeBodyTxt2: " 查阅,或登陆国内各大航空公司官网。",
        backupTxt: "沪公网安备 31010402003828号    沪ICP备17045138号"
    },
    EN: {
        languageTxt: "中文",
        companyNameTxt: "Company",
        userNameTxt: "User Name",
        passwordTxt: "Password",
        loginTxt: "Login",
        saveUsernameTxt: "Remember user name",
        forgotPasswordTxt: "Forget password",
        noticeTitleTxt: "Notice",
        noticeBodyTxt: "Please log into the official website of the Ministry of Transport for the People’s Republic of China for more information on the Regulations on the Normal Management of Flights, Order No.56 of the Ministry of Transport of 2016. The order states that \"the carrier shall formulate and promulgate the general conditions of transport\". Visit ",
        noticeBodyLinkName: "交通部网站",
        noticeBodyTxt2: " or the official website of major domestic airlines for full details.",
        backupTxt: "沪公网安备 31010402003828号    沪ICP备17045138号"
    }
}

export default dictionary

