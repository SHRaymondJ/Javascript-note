import { fetchCompany, fetchLogin } from '../../../services/loginAPI'
import { fetchProfile } from '../../../services/profileAPI'

interface LoginFormType {
    (object: {
        companyName: string
        userName: string
        password: string
        language: string
    }): Promise<boolean | any>
}

export const submitLoginForm: LoginFormType = async ({
    companyName,
    userName,
    password,
    language,
}) => {
    try {
        const company = await fetchCompany(companyName)
        const { Company_Url } = company
        if (Company_Url && Company_Url != '') {
            localStorage.setItem('BASE', Company_Url)
        }
        const token = await fetchLogin({ userName, password, language })
        if (token === '') {
            return false
        }
        const profile = await fetchProfile(token)
        if (!profile) {
            return false
        }
        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('token', JSON.stringify(token))
        return profile
    } catch (error) {
        console.log(error)
        return false
    }
}
