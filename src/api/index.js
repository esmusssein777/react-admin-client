/*
  包含所有请求函数的模块
 */
import ajax from "./ajax";

const BASE = '';
//登陆
// export function reqLogin(username, password) {
//     return ajax('/login', {username: 'admin', password:'admin'}, 'POST').then()
// }
export const reqLogin = (username, password) => (
    ajax(BASE + '/login', {username: 'admin', password:'admin'}, 'POST')
)

//添加用户
export const reqAddUser = (user) => (
    ajax(BASE + '/manage/user/add', user, 'POST')
)

