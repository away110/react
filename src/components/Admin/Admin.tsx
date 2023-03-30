import React, { useState ,useEffect,} from 'react';
import { PlusOutlined } from '@ant-design/icons'
import { Space, Table, Tag,Button ,message} from 'antd';
import {   Tree, Drawer, Form, Input, Row, Select, } from 'antd';
import type { ColumnsType, } from 'antd/es/table';
import type { DataNode, TreeProps ,} from 'antd/es/tree';
import type { SizeType } from 'antd/es/config-provider/SizeContext'; 
import './Admin.scss'
import service from '../../api/api';
import {useNavigate} from 'react-router-dom'
interface Props{}
interface DataType {
    key: string;
    adminname: string;
    role: number;
    checkedKeys:string[]
    password: string;
    id: string;
  }
const { Option } = Select;
function Admin(props:Props) {
    const [size, setSize] = useState<SizeType>('large');
    const [adminlist,setAdminlist]  = useState([])
    const [checkedKey ,setCheckedKey] = useState([])
    const [admindid ,setAdmindid] = useState('')
    const [rolelist ,setRolelist] = useState('')
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const Navigate=useNavigate()
    const [form] = Form.useForm();
    const showDrawer = () => {
        setOpen(true);
      };

      //新增管理员按钮
      const onClose = () => {
        setAdmindid('')
        form.setFieldsValue({adminname:'',password:'',role:null,checkedKeys:[]})
        setCheckedKey([])
        setOpen(false);
      };

  //表单树控组件
  const treeData: DataNode[] = [
    {
      title: ' 轮播图管理',
      key: '1',
      children: [
        {
          title: '轮播图列表',
          key: '1-1',
        },
        {
          title: '添加轮播图',
          key: '1-2',
        },
      ],
    },
    {
      title: ' 账号管理',
      key: '2',
      children: [
        {
          title: '账号列表',
          key: '2-1',
        },
        
      ],
    },
    {
      title: ' 产品管理',
      key: '3',
      children: [
        {
          title: '产品列表',
          key: '3-1',
        },
        {
          title: '秒杀列表',
          key: '3-2',
        },
        {
          title: '推荐列表',
          key: '3-3',
        },
        {
          title: '筛选列表',
          key: '3-4',
        },
        
      ],
    },
    {
      title: ' 数据可视化',
      key: '4',
      children: [
        {
          title: 'echarts使用',
          key: '4-1',
        },
        
      ],
    },
    {
      title: ' 编辑器',
      key: '5',
      children: [
        {
          title: '富文本编辑器',
          key: '5-1',
        }, 
      ],
    },
    {
      title: ' excel管理',
      key: '6',
      children: [
        {
          title: 'excel导入',
          key: '6-1',
        }, 
        {
          title: 'excel导出',
          key: '6-2',
        }, 
      ],
    },
    {
      title: ' 地图管理',
      key: '7',
      children: [
        {
          title: '百度地图',
          key: '7-1',
        }, 
      ],
    },
  ];
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
//保存 权限选项
const onCheck: TreeProps['onCheck'] = (checkedKeys:any) => {
    console.log('onCheck', checkedKeys);
    console.log(checkedKey);
    setCheckedKey(checkedKeys)
    form.setFieldValue('checkedKeys',checkedKeys)
  };
  //表格头部信息
  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      key: 'name',
      render: (_, record,index) => <div>{index+1}</div>,
    },
    {
      title: '账号',
      dataIndex: 'adminname',
      key: 'age',
    },
    {
      title: '权限',
      key: 'address',
      width:400,
      render: (_, record,index) =>  <Tag color="#87d068">{record.role == 1 ? '管理员' :'超级管理员'}</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      width:400,
      render: (_, record) => (
          <Space size="middle">
              <Button onClick={() => { edits(record) }}>Edit</Button>
              <Button type="primary" danger onClick={() => { deletes(record) }}>
                  Delete
              </Button>
          </Space>
      ),
    },
  ];
  //修改管理员信息
  const edits=(record:any)=>{
    console.log(record);
   setOpen(true)
   form.setFieldsValue(record)  
   console.log(checkedKey);
   setCheckedKey(record.checkedKeys)
   setAdmindid(record.adminid)

  }
  //删除管理员
const deletes= async (record:any)=>{
    var del = await service.admin.admin_delete({adminid:record.adminid})
    if(del.data.code==200){
        messageApi.open({
            type: 'success',
            content: '删除成功',
          });
          var res =await service.admin.admin_list()
       console.log(res.data.data);
       setAdminlist(res.data.data)
       }else{
        messageApi.open({
            type: 'error',
            content: '删除失败',
          });
       }

}
  const onGenderChange = (value: string,index:any) => {
      setRolelist(index.value)
      console.log(index.value);
    switch (value) {
      case '1':
        form.setFieldsValue({ note: '管理员' });
        break;
      case '2':
        form.setFieldsValue({ note: '超级管理员' });
        break;
      default:
    }
  };
  //列表请求
  var adminlists= async ()=>{
   var res =await service.admin.admin_list()
   console.log(res.data.data);
   setAdminlist(res.data.data)
  }
  useEffect(()=>{
    adminlists()
  },[])
  //添加管理员||修改管理员信息
  const onFinish = async  (values: any) => {
   if(admindid){
    var rev =await service.admin.admin_update({adminname:values.adminname,password:values.password,role:values.role,checkedKeys:checkedKey})
    console.log(rev);
    if(rev.data.code==200){
     messageApi.open({
         type: 'success',
         content: '编辑成功',
       });
       var res =await service.admin.admin_list()
    console.log(res.data.data);
    setAdminlist(res.data.data)
    setOpen(false);
    }else{
     messageApi.open({
         type: 'error',
         content: '编辑失败',
       });
    }
   }else{
       var rev =await service.admin.admin_add({adminname:values.adminname,password:values.password,role:values.role,checkedKeys:checkedKey})
       console.log(rev);
       if(rev.data.code==200){
        messageApi.open({
            type: 'success',
            content: '添加成功',
          });
          var res =await service.admin.admin_list()
       console.log(res.data.data);
       setAdminlist(res.data.data)
       setOpen(false);
       }else{
        messageApi.open({
            type: 'error',
            content: '添加失败',
          });
       }
   }
    
    
  }; 
  //角色选择
    return (
        
        <div className='admin'>
             {contextHolder}
            <div className="top2">
            <Button type="primary" onClick={showDrawer} size={size}>
            添加管理员<PlusOutlined />
           </Button>
            </div>
            {/* 列表渲染 */}
            <Table columns={columns} dataSource={adminlist}  />;
            {/* 抽屉 */}
            <Drawer
                title={admindid ?'编辑管理员':'新增管理员'}
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>返回</Button>
                    </Space>
                }
            >
                <Form
                    form={form}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                   
                >
                    <Form.Item
                        label="账号"
                        name="adminname"
                        rules={[{ required: true, message: '请输入你的账号!' }]}
                    >
                        <Input  disabled={ admindid !=''}/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入你的密码!' }]}
                    >
                        <Input.Password disabled={ admindid !=''} />
                    </Form.Item>
                    <Form.Item name="role" label="角色" rules={[{ required: true ,message: '选择!'  }]}>
                        <Select
                            placeholder="选择你的角色"
                            onChange={onGenderChange}
                            allowClear
                        >
                            <Option value={1}>管理员</Option>
                            <Option value={2}>超级管理员</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="checkedKeys" label="权限" >
                    <Tree
                        checkable
                        onCheck={onCheck}
                        treeData={treeData}
                        checkedKeys={checkedKey}
                    />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        {admindid ?'编辑管理员':'新增管理员'}
                        </Button>
                    </Form.Item>
                </Form>
             </Drawer>
        </div>
    );
}

export default Admin;