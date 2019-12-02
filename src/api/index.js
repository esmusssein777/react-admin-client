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

//获取一级/二级分类列表
export const reqCategorys = (parentId) => (
    ajax(BASE + 'manage/category/list', {parentId})
)

//添加分类
export const addCategory = (categoryName, parentId) => (
    ajax(BASE + 'manage/category/add', {categoryName,parentId}, 'POST')
)

//更新分类
export const updateCategory = (categoryName, parentId) => (
    ajax(BASE + 'manage/category/update', {categoryName,parentId}, 'POST')
)
