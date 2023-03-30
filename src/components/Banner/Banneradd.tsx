import React from 'react';
import { Button, Form, Input } from 'antd';
import service from '../../api/api';
import {  message } from 'antd';
import {useNavigate} from 'react-router-dom'
interface Props{

}
function Banneradd(props:Props) {
    const [messageApi, contextHolder] = message.useMessage();
    const Navigate = useNavigate()
    const onFinish = async (values: any) => {
        console.log(values);
             var res =await service.banner.banner_add(values)
             console.log(res.data.code);
             if(res.data.code == 200){
                messageApi.open({
                    type: 'success',
                    content: '更新flag状态成功',
                  });
                  Navigate('/index/Banner')
             }else{
                messageApi.open({
                    type: 'error',
                    content: '添加轮播图失败',
                  });
             }    
      };
    
    return (
        <div className='banneradd'>
           
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="链接地址"
                    name="link"
                    rules={[{ required: true, message: '请填写链接地址' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="提示信息"
                    name="alt"
                    rules={[{ required: true, message: '请填写地址信息' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="图片地址"
                    name="img"
                    rules={[{ required: true, message: '请填写图片地址' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                    <Button type="primary" htmlType="submit" >
                        添加图片
                    </Button>
                </Form.Item>
            </Form>
            {contextHolder}
        </div>
    );
}

export default Banneradd;