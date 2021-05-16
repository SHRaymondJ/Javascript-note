import { selectUrl } from '../../ajaxUrl.json'
import axiosPost from './AxiosPost'

const URL =
  selectUrl ||
  'http://appservice.etravel.net.cn/SystemService.svc/SelectUrlPost'

interface fetchCompanyData {
  Company_Url: string
  Image_Url: string
}

export const fetchCompany = async (
  company: string
): Promise<fetchCompanyData> => {
  const data = await axiosPost({ URL, JSONOBJ: { CompanyMs: company } })
  return data
}
