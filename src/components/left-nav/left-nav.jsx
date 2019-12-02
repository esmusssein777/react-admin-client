import React from "react";
import './left-nav.less';
import logo from '../../assets/images/logo.png';
import {Link, withRouter} from "react-router-dom";
import { Menu, Icon, Button } from 'antd';
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;

export class LeftNav extends React.Component{
    //根据数组返回菜单结构
    getMenuNodes = (menuList) => {
        //得到当前的路径
        const path = this.props.location.pathname;
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
                //保证点击子菜单刷新还在原来路径
                const cItem = item.children.find(cItem => cItem.key===path);
                if (cItem) {
                    this.openKey = item.key;
                }
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

    /*
      第一次render之前准备数据
     */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        //得到当前的路径
        const path = this.props.location.pathname;
        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>react后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        );
    }
}

/*
  withRouter高阶组件
  包装非路由组件，新的组件向非路由组件传递三个属性：history/location/
  等于将非路由组件变为了路由组件 selectedKeys={[path]}获得当前路径
 */
export default withRouter(LeftNav)