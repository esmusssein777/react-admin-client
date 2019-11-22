/*
  发送异步请求对函数模块
  封装 axios 库
  函数返回值是 promise 对象
 */
import axios from 'axios'
import {message} from "antd";

export default function ajax(url, data={}, type='GET') {
    return new Promise((resolve, reject) => {
        let promise;
        if (type === 'GET') {
            promise =  axios.get(url, {
                params:data
            });
        } else {
            promise =  axios.post(url, data);
        }
        //统一抛出异常
        promise.then(response => {
            resolve(response);
        }).catch(error => {
            message.error('请求出错了' + error.message);
        })
    })

}