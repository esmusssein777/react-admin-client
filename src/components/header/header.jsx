import React from "react";
import './header.less';
import memoryUtils from "../../utils/memoryUtils";
import {formateDate} from '../../utils/dateUtils';
import {withRouter} from 'react-router-dom';
import menuList from "../../config/menuConfig";
import { Modal } from 'antd';
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../link-button/link-button";

export class Header extends React.Component{
    state = {
        currentTime: formateDate(Date.now()), // 当前时间字符串
    }

    getTime = () => {
        // 每隔1s获取当前时间, 并更新状态数据currentTime
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000)
    }

    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.key===path) {
                title = item.title;
            } else if (item.children){
                const cItem = item.children.find(cItem => cItem.key===path)
                if (cItem) {
                    title = cItem.title;
                }
            }
        })
        return title;
    }

    logout = () => {
        Modal.confirm({
            content: '确认退出吗?',
            onOk: () => {
                console.log('退出成功');
                storageUtils.removeUser();
                memoryUtils.user = {};
                this.props.history.replace('/login');
            }
        });
    }

    /*
      第一次render()之后执行一次
      一般在此执行异步操作: 发ajax请求/启动定时器
    */
    componentDidMount () {
        // 获取当前的时间
        this.getTime()
    }

    /*
      当组件卸载之前
     */
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const username = memoryUtils.user.username;
        const {currentTime} = this.state;
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header)