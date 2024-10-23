import axios from 'axios'

const adminApi =axios.create({
    baseURL:'http://localhost:2709/'
}
)

export const  readApi=()=>{
   return adminApi.get('')
}
