import React, { useEffect, useRef, useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import dictionary from './dictionary'
import { submitLoginForm } from './components/loginSubmit'

const Login = () => {
    interface Dictionary {
        language: string
        companyName: string
        userName: string
        password: string
        login: string
        saveUsername: string
        forgotPassword: string
        noticeTitle: string
        noticeBody: string
        backup: string
    }
    const [lan, setLan] = useState<'cn' | 'en'>('cn')
    const [text, setText] = useState<Dictionary>(dictionary['cn'])
    const [company, setCompany] = useState('')
    const companyRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        const dic: Dictionary = dictionary[lan]
        setText(dic)
    }, [lan])

    const switchLanguage = (e: Event) => {
        e.preventDefault()
        if (lan === 'cn') {
            setLan('en')
        } else {
            setLan('cn')
        }
    }
    const handleCompanyChange = () => {
        if(companyRef.current) {
            setCompany(companyRef.current.value)
        }
    }
    const handleLoginSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(company)
        submitLoginForm({ companyName: company })
    }

    const {
        language,
        companyName,
        userName,
        password,
        login,
        saveUsername,
        forgotPassword,
        noticeTitle,
        noticeBody,
        backup,
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
                        onClick={() => switchLanguage}
                    >
                        {language}
                    </button>
                </div>
                <form onSubmit={(e)=>handleLoginSubmit(e)}>
                    <div className="form-li">
                        <label htmlFor="companyName">{companyName}</label>
                        <input
                            type="text"
                            name="companyName"
                            id="companyName"
                            ref={companyRef}
                            onChange={handleCompanyChange}
                        />
                    </div>
                    <div className="form-li">
                        <label htmlFor="userName">{userName}</label>
                        <input type="text" name="userName" id="userName" />
                    </div>
                    <div className="form-li">
                        <label htmlFor="password">{password}</label>
                        <input type="text" name="password" id="password" />
                    </div>
                    <button type="submit">{login}</button>
                    <div className="other-operations">
                        <div className="remember-box">
                            <input
                                type="checkbox"
                                name="remember-username"
                                id="remember-username"
                            />
                            <label htmlFor="remember-username">
                                {saveUsername}
                            </label>
                        </div>
                        <Link to="/ResetPassword">{forgotPassword}</Link>
                    </div>
                </form>
                <article className="notice">
                    <h6>{noticeTitle}</h6>
                    {noticeBody}
                </article>
                <a
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402003828"
                    target="_blank"
                >
                    {backup}
                </a>
            </div>
        </section>
    )
}

export default Login
