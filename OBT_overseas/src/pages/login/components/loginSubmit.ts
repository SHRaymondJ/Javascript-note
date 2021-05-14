import { fetchCompany } from "../../../services/loginAPI"

interface LoginFormType {
    companyName: string
}

export const submitLoginForm = async ({ companyName }: LoginFormType):Promise<void|object> => {
    const company = await fetchCompany(companyName)
    if(company) {
        console.log(company) 
    }
}
