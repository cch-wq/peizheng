import axios from "axios";
import { ElMessage } from "element-plus";

const http = axios.create({
    baseURL:'https://v3pz.itndedu.com/v3pz',
    timeout:10000
})


//添加拦截器
//添加请求拦截器
http.interceptors.request.use(function (config){
    //在发送请求前做什么
    const token =localStorage.getItem('pz_token')
    //添加不需要的token的白名单
    const whiteUrl=['/get/code','/user/authentication','/login']
    if(token && !whiteUrl.includes(config.url)){
        config.headers['x-token'] =token
    }
    return config
},function(error){
    return Promise.reject(error)
})

//添加响应拦截器
http.interceptors.response.use(function (response){
    //对接口异常的数据，给用户提示
    if(response.data.code ===-1){
        ElMessage.warning(response.data.message)
    }
    return response
},function(error){
    return Promise.reject(error)
})

export default http