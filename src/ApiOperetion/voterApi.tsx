import axios from 'axios'

const voterApi = axios.create({
    baseURL: 'http://localhost:2809/'
}
)

export const readVoterApi = () => {
    return voterApi.get('')
}

//post voter information
export const createVoter = (data) => {
    return voterApi.post('/post/info', data)
}

//post voter address
// export const createVoterAddress = (data) => {
//     return voterApi.post('/post/address', data)
// }


//search voter
export const  searchVoter = (data) => {
    return voterApi.get(`/searchVoter?${data}`)
}


//find voter
export const findVoter = (data) => {
    return voterApi.get(`/voterinfo/${data}`)
}

//update voterdata
export const updateVoter = (driving_licence, data) => {
    return voterApi.put(`/update/${driving_licence}`, data)
}

//update  voter address
export const updateAddress= (id,data)=>{
    return voterApi.put(`/update/${id}/address`,data)   
}
