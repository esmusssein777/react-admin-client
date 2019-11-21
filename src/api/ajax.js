/*
  发送异步请求对函数模块
  封装 axios 库
  函数返回值是 promise 对象
 */
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
    if (type === 'GET') {
        return axios.get(url, {
            params:data
        });
    } else {
        return axios.post(url, data);
    }
}