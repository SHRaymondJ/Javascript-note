import AxiosPost from './AxiosPost'

const profileURL = '/SystemService.svc/ProfilePost'

interface fetchProfileType {
    (key: string): Promise<void | object>
}

export const fetchProfile: fetchProfileType = async (key) => {
    const profile = await AxiosPost({
        URL: profileURL,
        JSONOBJ: { key },
        BASE: localStorage.BASE,
    })
    return profile
}
