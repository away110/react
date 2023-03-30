import axios from 'axios'
import { createBrowserHistory } from 'history'
import store from '../store'
import { useNavigate } from 'react-router-dom';
import { type } from 'os';
var history = createBrowserHistory();

//axios实例化
var service = axios.create({
    timeout: 10*1000, //设置请求超时时间
    baseURL: process.env.REACT_APP_BASE_API //设置请求基准路径
})

//设置请求拦截器
service.interceptors.request.use(
    (config)=>{
        //设置请求头参数
        config.headers['token'] = store.getState().userInfo.token;
        
        return config;
    },
    (err)=>{
        return Promise.reject(err);
    }
)
//设置响应拦截器
service.interceptors.response.use(
    (res)=>{
        if(res.data.code== '10119'){
            store.dispatch({type:'REMOVE_USERINFO'})
            history.push('/login');
            history.go(0);

        }
        return res;
    },
    (err)=>{

        if( err.response.status == 401 ){
            // '登陆过期,请重新登录!'
            //删除token
            //跳转到登录页
            store.dispatch({type:'REMOVE_USERINFO'})
            history.push('/login');
            history.go(0);

        }else if( err.response.status == 404 ){

            // '访问路径有误!'

        }else if( err.response.status == 500 ){
            // '服务器内部错误!'
        }else if( err.response.status == 503 ){
            // '服务器无法提供服务!'
        }

        return Promise.reject(err);
    }
)

export default service;