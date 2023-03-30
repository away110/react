import React, { useEffect, useState } from 'react';
import service from '../../api/api'
import './Index.scss'
import RouterView from '../../router/RouterView'
import { Avatar, Space      } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ThunderboltOutlined,
    
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme,Breadcrumb,Dropdown, message } from 'antd';
import { Navigate, Outlet,useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import {useDispatch, useSelector} from 'react-redux'
interface Props { }
function Index(props: Props) {
      const Navigate =useNavigate()
      var dispatch = useDispatch()
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [adminnames, setAdminnames] = useState('');
    const {
        token: { colorBgContainer },
    } = theme.useToken();

  
    type MenuItem = Required<MenuProps>['items'][number];
    //渲染侧边导航栏
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }
  var adminname =  useSelector((state:any)=>state.userInfo.adminname)
  var keyPath = useSelector((state:any)=>state.keyPath)
  var texts = async()=>{
    var res = await service.admin.admin_detail({adminname})
    console.log(res.data.data);
    setAdminnames(res.data.data.adminnames)
  }
  useEffect(()=>{
    texts()
  },[])

    //侧边导航栏的路由跳转
    const meni=({item,key,keyPath}:any)=>{
        console.log(keyPath);
        
        dispatch({type:'SAVE_KEYPATH',payload:keyPath })
        console.log(key);
            Navigate(key,{replace:true})
    }
    const onClick: MenuProps['onClick'] = ({ key }) => {
        if(key=='2'){
            dispatch({type:'REMOVE_USERINFO'});
            Navigate('/login',{replace:true})
            message.info(`退出 ${key}`);
        }else{
            message.info(`设置 ${key}`);
        }
      };
      
      const items: MenuProps['items'] = [
        {
          label: '设置',
          key: '1',
        },
        {
          label: '退出',
          key: '2',
        },
      ];
    return (
        <div className='index'>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" >管理系统</div>
                    <Menu
                     defaultOpenKeys={keyPath}
                     selectedKeys={keyPath}
                       onClick={meni}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            getItem('首页', '/index/Indexs', <ThunderboltOutlined />),
                            getItem('轮播图管理', 'Swiper', <ThunderboltOutlined />, [
                                getItem('轮播图列表', '/index/Banner'),
                                getItem('添加轮播图', '/index/Banneradd'),
                            ]),
                            getItem('账号管理', 'Admin', <ThunderboltOutlined />, [
                                getItem('管理员列表', '/index/Admin')]),
                            getItem('产品管理', 'Pro', <ThunderboltOutlined />, [
                                getItem('产品列表', '/index/Pro'),
                                getItem('秒杀列表', '/index/Seckill'),
                                getItem('推荐列表', '/index/Command'),
                                getItem('筛选列表', '/index/Searchs'),
                            ]),
                            getItem('数据可视化', 'Echarts', <ThunderboltOutlined />, [
                                getItem('echarts使用', '/index/Echarts')]),
                            getItem('编辑器', 'Editor', <ThunderboltOutlined />, [
                                getItem('富文本编辑器', '/index/Editor')]),
                            getItem('Excel管理', 'Excel', <ThunderboltOutlined />, [
                                getItem('Excel管理列表', '/index/Excel')]),
                            getItem('地图管理', 'Map', <ThunderboltOutlined />, [
                                getItem('百度地图', '/index/Map')]),
                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header style={{ padding: 0, background: colorBgContainer, backgroundColor:'#74759b'}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <div className="headerimg">
                            <span>用户名:{adminname}</span>
                            <Dropdown menu={{ items, onClick }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                    <Avatar shape="square" size="large" icon={ <img src="https://tupian.qqw21.com/article/UploadPic/2020-11/202011242047623188.jpg" alt="" />} />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Breadcrumb style={{ margin: '10px 20px ' }}>
                        <Breadcrumbs/>
                    </Breadcrumb>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                   <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Index;