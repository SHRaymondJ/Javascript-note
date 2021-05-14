import { selectUrl } from '../../ajaxUrl.json'
import axiosPost from './axiosPost'

const companyUrl =
    selectUrl ||
    'http://appservice.etravel.net.cn/SystemService.svc/SelectUrlPost'

export const fetchCompany = async (company: string) => {
    const data = axiosPost(companyUrl, { CompanyMs: company })
    return data
}
