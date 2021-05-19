import React, { useEffect, useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import dictionary from './dictionary'
import { submitLoginForm } from './components/loginSubmit'
import { useHistory } from 'react-router'

type InputEvent = FormEvent<HTMLInputElement>

const Login = () => {
    interface Dictionary {
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
    const [language, setLanguage] = useState<'CN' | 'EN'>('CN')
    const [text, setText] = useState<Dictionary>(dictionary['CN'])
    const [companyName, setCompanyName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [rememberUserName, setRememberUserName] = useState(true)
    const history = useHistory()

    const initFormTable = () => {
        const usersData = localStorage.loginPageStorage
        console.log(usersData)
        if (usersData) {
            const { rememberUserName, companyName, userName, password } =
                JSON.parse(usersData)
            setRememberUserName(rememberUserName)
            if (rememberUserName) {
                setCompanyName(companyName)
                setUserName(userName)
                setPassword(password)
            }
        } else {
            setCompanyName('')
            setUserName('')
            setPassword('')
        }
    }

    const saveFormTable = () => {
        console.log(rememberUserName, companyName, userName, password)
        if (rememberUserName) {
            localStorage.setItem(
                'loginPageStorage',
                JSON.stringify({
                    rememberUserName,
                    companyName,
                    userName,
                    password,
                })
            )
        } else {
            localStorage.removeItem('loginPageStorage')
        }
    }
    useEffect(() => {
        initFormTable()
    }, [])

    useEffect(() => {
        const dic: Dictionary = dictionary[language]
        setText(dic)
    }, [language])

    const switchLanguage = (e: Event) => {
        e.preventDefault()
        if (language === 'CN') {
            setLanguage('EN')
        } else {
            setLanguage('CN')
        }
    }
    const handleCompanyChange = (e: InputEvent) => {
        setCompanyName(e.currentTarget.value)
    }
    const handleUserNameChange = (e: InputEvent) => {
        setUserName(e.currentTarget.value)
    }
    const handlePasswordChange = (e: InputEvent) => {
        setPassword(e.currentTarget.value)
    }
    const toggleRememberUserName = () => {
        setRememberUserName(!rememberUserName)
    }

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const newProfile = await submitLoginForm({
            companyName,
            userName,
            password,
            language,
        })
        if (newProfile) {
            saveFormTable()
            history.push('/')
        }
    }

    const {
        languageTxt,
        companyNameTxt,
        userNameTxt,
        passwordTxt,
        loginTxt,
        saveUsernameTxt,
        forgotPasswordTxt,
        noticeTitleTxt,
        noticeBodyTxt,
        noticeBodyLinkName,
        noticeBodyTxt2,
        backupTxt,
    } = text
    return (
        <section>
            <div className="login-container">
                <div className="logo-line">
                    <div className="logo-box">
                        <img src="" alt="" />
                    </div>
                    <button
                        className="switch-lan"
                        onClick={(e) => switchLanguage(e)}
                    >
                        {languageTxt}
                    </button>
                </div>
                <form onSubmit={(e) => handleLoginSubmit(e)}>
                    <div className="form-li">
                        <label htmlFor="companyName">{companyNameTxt}</label>
                        <input
                            type="text"
                            name="companyName"
                            id="companyName"
                            onChange={handleCompanyChange}
                            value={companyName}
                        />
                    </div>
                    <div className="form-li">
                        <label htmlFor="userName">{userNameTxt}</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            onChange={handleUserNameChange}
                            value={userName}
                        />
                    </div>
                    <div className="form-li">
                        <label htmlFor="password">{passwordTxt}</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                    </div>
                    <button type="submit">{loginTxt}</button>
                    <div className="other-operations">
                        <div className="remember-box">
                            <input
                                type="checkbox"
                                name="remember-username"
                                id="remember-username"
                                onChange={toggleRememberUserName}
                                defaultChecked={rememberUserName}
                            />
                            <label htmlFor="remember-username">
                                {saveUsernameTxt}
                            </label>
                        </div>
                        <Link to="/ResetPassword">{forgotPasswordTxt}</Link>
                    </div>
                </form>
                <article className="notice">
                    <h6>{noticeTitleTxt}</h6>
                    {noticeBodyTxt}
                    <a
                        href="http://xxgk.mot.gov.cn/jigou/fgs/201607/t20160721_2973469.html"
                        target="_blank"
                    >
                        {noticeBodyLinkName}
                    </a>
                    {noticeBodyTxt2}
                </article>
                <a
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402003828"
                    target="_blank"
                >
                    {backupTxt}
                </a>
            </div>
        </section>
    )
}

export default Login
