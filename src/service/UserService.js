import axios from './customize-axios'
const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}
const postCreateUser = (name, job) => {
    return axios.post('/api/users',{name,job})
}
const putUpdateUser = (name, job) => {
   return axios.put('/api/users/2',{name, job})
}
const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}
const LoginAPI =(email, password) => {
    return axios.post("/api/login",{email,password})
}
export {fetchAllUser, postCreateUser, putUpdateUser, deleteUser,LoginAPI};