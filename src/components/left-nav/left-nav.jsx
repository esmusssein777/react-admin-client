import React from "react";
import './left-nav.less';
import logo from '../../assets/images/logo.png';
import {Link} from "react-router-dom";
import { Menu, Icon, Button } from 'antd';
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;

export default class LeftNav extends React.Component{
    //根据数组返回菜单结构
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                );
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                );
            }
        })
    }

    render() {
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>react后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                >
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        );
    }
}