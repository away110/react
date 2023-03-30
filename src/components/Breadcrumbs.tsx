import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import {  useSelector } from 'react-redux'
import { getText } from '../utils/tools';
interface Props{

}
function Breadcrumbs(props:Props) {
    var keyPath = useSelector((state:any)=>state.keyPath);
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="">
                    <HomeOutlined /> 首页
                </Breadcrumb.Item>
                {
                    keyPath.map((item:any,index:any)=>{
                        return (
                            <Breadcrumb.Item key={index}>
                                <span> { getText(item) } </span>
                            </Breadcrumb.Item>
                        )
                    })
                }
                
            </Breadcrumb>
        </div>
    );
}

export default Breadcrumbs;