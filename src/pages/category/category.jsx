import React from "react";
import {
    Card,
    Table,
    Button,
    Icon, message
} from "antd";
import LinkButton from "../../components/link-button/link-button";
import {reqCategorys} from "../../api";

export default class Category extends React.Component{
    state = {
        categorys:[]//一级分类列表

    }

    componentWillMount() {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: () => (//返回需要显示的页面标签
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )
            },
        ];
    }

    getCategorys = async () => {
        const result = await reqCategorys('0');
        if (result.status === 0) {
            const categorys = result.data;
            this.setState({
                categorys
            })
        } else {
            message.error("获取分类列表失败")
        }
    }

    //发送异步请求获取数据
    componentDidMount() {
        this.getCategorys()
    }

    render() {
        //读取数据
        const categorys = this.state.categorys;

        //Card左侧
        const title = "一级分类标题";
        //Card右侧
        const extra = (
            <Button type='primary'>
                <Icon type='plus'/>
                添加
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    rowKey='_id'
                    dataSource={categorys}
                    columns={this.columns} />
            </Card>
        );
    }
}