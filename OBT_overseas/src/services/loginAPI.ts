import { selectUrl } from '../../ajaxUrl.json'
import axiosPost from './AxiosPost'

interface fetchCompanyType {
    (company: string): Promise<{ Company_Url: string; Image_Url: string }>
}

interface fetchLoginType {
    (object: {
        userName: string
        password: string
        language: string
        edition?: string
        channel?: string
    }): Promise<any>
}

const companyURL =
    selectUrl ||
    'http://appservice.etravel.net.cn/SystemService.svc/SelectUrlPost'

const loginURL = '/SystemService.svc/LoginWithChannel'

export const fetchCompany: fetchCompanyType = async (company) => {
    const data = await axiosPost({
        URL: companyURL,
        JSONOBJ: { CompanyMs: company },
    })
    return data
}

export const fetchLogin: fetchLoginType = async ({
    userName,
    password,
    language,
    edition = 'PC1.0.1',
    channel = 'ONLINE',
}): Promise<any> => {
    const JSONOBJ = {
        loginname: userName,
        password: password,
        Language: language,
        edition,
        channel,
    }
    const key = await axiosPost({
        URL: loginURL,
        JSONOBJ,
        BASE: localStorage.BASE,
    })
    return key
}
