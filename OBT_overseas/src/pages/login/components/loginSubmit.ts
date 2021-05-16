import { fetchCompany } from '../../../services/loginAPI'
import { setBaseURL } from './setBaseURL'

interface LoginFormType {
  ({}: { companyName: string }): Promise<object>
}

export const submitLoginForm: LoginFormType = async ({ companyName }) => {
  const company = await fetchCompany(companyName)
  if (company?.Company_Url) {
    setBaseURL(company.Company_Url)
  }
  return {}
}
