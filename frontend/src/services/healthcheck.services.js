import { servicesAxiosInstance } from "./config"

const getServerStatus = async() => {
    return await servicesAxiosInstance.get('/api/v1/healtcheckup/')
}

export {
    getServerStatus
}