import React, { useEffect, useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import dictionary, { Dictionary } from './dictionary'
import { submitLoginForm } from './components/loginSubmit'
import { useHistory } from 'react-router'
import BCDLOGO from '../../assets/logoImgBCD.png'
import './index.scss'
import Loading from '../../components/Loading'
import { commonSelector } from '../../commonSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { actionDispatch } from '../../commonActions'

type InputEvent = FormEvent<HTMLInputElement>

const Login = () => {
    const [loading, setLoading] = useState(false)
    const { language } = useSelector(commonSelector)
    const { switchLanguage } = actionDispatch(useDispatch())
    const [text, setText] = useState<Dictionary>(dictionary[language])
    const [companyName, setCompanyName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [rememberUserName, setRememberUserName] = useState(true)
    const history = useHistory()

    const initFormTable = () => {
        const usersData = localStorage.loginPageStorage
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

    const onLanguageClick = (e: Event) => {
        e.preventDefault()
        switchLanguage()
    }
    const handleInputChange = (setState: Function, e: InputEvent) => {
        setState(e.currentTarget.value)
    }

    const toggleRememberUserName = () => {
        setRememberUserName(!rememberUserName)
    }

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const newProfile = await submitLoginForm({
            companyName,
            userName,
            password,
            language,
        })
        if (newProfile) {
            saveFormTable()
            history.push('/')
        } else {
            alert('user name or password is incorrect')
        }
        setLoading(false)
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
            {loading && <Loading></Loading>}
            <div className="background-img"></div>
            <div className="login-container">
                <div className="logo-line">
                    <div className="logo-box">
                        <img src={BCDLOGO} alt="BCD" />
                    </div>
                    <button
                        className="switch-lan"
                        onClick={(e) => onLanguageClick(e)}
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
                            onChange={(e) =>
                                handleInputChange(setCompanyName, e)
                            }
                            value={companyName}
                        />
                    </div>
                    <div className="form-li">
                        <label htmlFor="userName">{userNameTxt}</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            onChange={(e) => handleInputChange(setUserName, e)}
                            value={userName}
                        />
                    </div>
                    <div className="form-li">
                        <label htmlFor="password">{passwordTxt}</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => handleInputChange(setPassword, e)}
                            value={password}
                        />
                    </div>
                    <button type="submit" className="login-submit">
                        {loginTxt}
                    </button>
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
                    <article className="notice">
                        <h5>{noticeTitleTxt}</h5>
                        {noticeBodyTxt}
                        <a
                            href="http://xxgk.mot.gov.cn/jigou/fgs/201607/t20160721_2973469.html"
                            target="_blank"
                            className="notice-website"
                        >
                            {noticeBodyLinkName}
                        </a>
                        {noticeBodyTxt2}
                    </article>
                    <a
                        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402003828"
                        target="_blank"
                        className="record"
                    >
                        {backupTxt}
                    </a>
                </form>
            </div>
        </section>
    )
}

export default Login
