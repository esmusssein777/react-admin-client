import React from "react";
import './login.less';
import logo from '../../assets/images/logo.png';
import {Form, Icon, Input, Button, message} from 'antd';
import {reqLogin} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {Redirect} from "react-router-dom";

/*
  登陆的路由组件
 */
class Login extends React.Component{
    handleSubmit = (event) => {
        //得到form对象，得到表单传来的值
        event.preventDefault();
        //对所有需要验证对表单进行验证
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {username, password} = values;
                console.log('提交ajax登陆请求', values);
                const response = await reqLogin(username, password);
                console.log('请求登陆成功了', response.data);
                const result = response.data;
                if (result.status === 0) {
                    message.success('登陆成功');
                    //保存当前到user到内存中
                    memoryUtils.user = result.data;
                    storageUtils.saveUser(result.data);//保存到local
                    //跳转到管理页面
                    this.props.history.replace('/');//不可以回退
                    // this.props.history.push('/');//可以回退

                } else {
                    message.error(result.msg);
                }
            } else {
                console.log('验证失败');
            }
        });
    };

    render() {
        //判断用户是否已经登陆
        const user = memoryUtils.user;
        if (user && user._id) {
            return <Redirect to="/"/>
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        { required: true, message: '用户名不能为空!' },
                                        { min: 4, message: '用户名至少4位!' },
                                        { max: 12, message: '用户名最多12位!' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是数字英文下划线组成!' }
                                ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: '密码不能为空!' },
                                        { min: 4, message: '密码至少4位!' },
                                        { max: 12, message: '密码最多12位!' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是数字英文下划线组成!' }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

/*
  包装Form组件，生成新的组件:Form(login)
  新组件会向Form组件传递一个强大的对象属性：form
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin

/* 使用Promise的then()来获取
    reqLogin(username, password).then(response => {
        console.log('成功了', response.data)
    }).catch(error => {
        console.log('失败了',error)
    })
 */