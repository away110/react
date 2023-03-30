import React from 'react';
import {Form,Input,Button} from 'antd'
import service from '../../api/api'
import "./Login.scss"
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
interface Props {}

function Login(props:Props) {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
    //表单验证通过时, 执行
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        //发起登陆请求
        var res = await service.admin.admin_login( values )
        if( res.data.code == 200 ){
            console.log(res.data.data.token);
            console.log(res.data.data.checkedkeys);
            dispatch({type:'SAVE_USERINFO', payload:res.data.data})
            //保存用户信息
            Navigate('/index/Indexs')
        }
    };

    //用户名的验证器
    var adminnameValidator = (rule:any, value:any, callback:any) => {
        if(  value.length <7 ){
            callback();
        }else{
            callback(new Error('请输入正确的手机号作为登陆账号!'));
        }
    }
    //密码的验证器
    var passwordValidator = (rule:any, value:any, callback:any) => {
        if( /^\d{6}$/.test( value ) ){
            callback();
        }else{
            callback(new Error('请输入符合格式的密码!'));
        }
    }

    return (
        <div className='login'>
            <div className="title">嗨购后台管理系统</div>
            <Form
                className='form'
                style={{ minWidth: 300 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                name="adminname"
                rules={[{ validator: adminnameValidator }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                name="password"
                rules={[{ validator: passwordValidator }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        登陆
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;