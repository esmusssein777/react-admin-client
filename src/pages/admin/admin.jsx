import React from "react";
import memoryUtils from "../../utils/memoryUtils";
import {Redirect, Route, Switch} from "react-router-dom";
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import Home from '../home/home';
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Pie from "../charts/Pie";
import Line from "../charts/line";
import Order from "../order/order";

const { Footer, Sider, Content } = Layout;

export default class Admin extends React.Component{
    render() {
        const user = memoryUtils.user;
        //如果内存中没有user
        if (!user || !user._id) {
            //自动跳转到登陆页面
            return  <Redirect to="/login"/>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/category" component={Category}/>
                            <Route path="/product" component={Product}/>
                            <Route path="/role" component={Role}/>
                            <Route path="/user" component={User}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/order" component={Order}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center', color: '#cccccc'}}>React admin project create by lee</Footer>
                </Layout>
            </Layout>
        );
    }
}