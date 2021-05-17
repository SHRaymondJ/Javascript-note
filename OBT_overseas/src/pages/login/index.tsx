import React, { useEffect, useRef, useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import dictionary from './dictionary'
import { submitLoginForm } from './components/loginSubmit'
import { profileSelector, setProfile } from './container'
import { useDispatch, useSelector } from 'react-redux'

const actionDispatch = (dispatch: Function) => ({
    setProfile: (profile: any) => dispatch(setProfile(profile)),
})

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
        backupTxt: string
    }
    const [language, setLanguage] = useState<'CN' | 'EN'>('CN')
    const [text, setText] = useState<Dictionary>(dictionary['CN'])
    const [companyName, setCompanyName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const companyRef = useRef<HTMLInputElement>(null)
    const userNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { profile } = useSelector(profileSelector)
    const { setProfile } = actionDispatch(useDispatch())

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
    const handleCompanyChange = () => {
        if (companyRef.current) {
            setCompanyName(companyRef.current.value)
        }
    }
    const handleUserNameChange = () => {
        if (userNameRef.current) {
            setUserName(userNameRef.current.value)
        }
    }
    const handlePasswordChange = () => {
        if (passwordRef.current) {
            setPassword(passwordRef.current.value)
        }
    }

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(companyName)
        const newProfile = await submitLoginForm({
            companyName,
            userName,
            password,
            language,
        })
        if (newProfile) {
            setProfile(newProfile)
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
        backupTxt,
    } = text
    const {AirCards} = profile
    return (
        <section>
            <div className="login-container">
                <div className="logo-line">
                    <div className="logo-box">
                        <img src="" alt="" />
                    </div>
                    <button
                        className="switch-lan"
                        onClick={() => switchLanguage}
                    >
                        {languageTxt + AirCards}
                    </button>
                </div>
                <form onSubmit={(e) => handleLoginSubmit(e)}>
                    <div className="form-li">
                        <label htmlFor="companyName">{companyNameTxt}</label>
                        <input
                            type="text"
                            name="companyName"
                            id="companyName"
                            ref={companyRef}
                            onChange={handleCompanyChange}
                        />
                    </div>
                    <div className="form-li">
                        <label htmlFor="userName">{userNameTxt}</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            ref={userNameRef}
                            onChange={handleUserNameChange}
                        />
                    </div>
                    <div className="form-li">
                        <label htmlFor="password">{passwordTxt}</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            ref={passwordRef}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit">{loginTxt}</button>
                    <div className="other-operations">
                        <div className="remember-box">
                            <input
                                type="checkbox"
                                name="remember-username"
                                id="remember-username"
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
