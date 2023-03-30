import React,{useState,useEffect} from 'react';
import {Button,Space, Table, Tag ,Switch } from 'antd'
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { PlusOutlined,VerticalAlignBottomOutlined} from '@ant-design/icons';
import './Banner.scss'
import type { ColumnsType } from 'antd/es/table';
import service from '../../api/api';
import store from '../../store';
import {useNavigate} from 'react-router-dom'
import {  message, } from 'antd';
interface Props{}
interface DataType {
    key: string;
    alt:string;
    bannerid: string;
    flag: boolean;
    img: string;
    link: string;
}



function Banner(props:Props) {
    const [messageApi, contextHolder] = message.useMessage();
    const[ bannerlist,setBannerlist] = useState([])
    var token = store.getState().userInfo
    //更新flag状态
    const ONChang =async (checked: boolean,bannerid:any) => {
        var rev =await service.banner.banner_updateFlag({bannerid,flag:checked})
        if(rev.data.code ==200){
              var res = await service.banner.banner_list({token:token});
              if(res.data.code==200){
                messageApi.open({
                  type: 'success',
                  content: '更新flag状态成功',
                });
                setBannerlist(res.data.data)
                console.log(res.data);
            }
        }
        
    };
    //删除
    const onclickdelete= async(record:any)=>{
       var rec=await service.banner.banner_delete({bannerid:record.bannerid})
       if(rec.data.code==200){
        var res = await service.banner.banner_list({token:token});
        if(res.data.code==200){
          setBannerlist(res.data.data)
          console.log(res.data);
      }
        messageApi.open({
            type: 'success',
            content: '删除轮播图成功',
          });
     }else{
        messageApi.open({
            type: 'error',
            content: '删除轮播图失败',
          });
     }    
        
    }
      const columns: ColumnsType<DataType> = [
          {
           
          title: '序号',
          key: 'name',
          render: (_:any, record:any,index) => <span>{index+1}</span>,
        },
        {
          title: '图片',
          key: 'img',
          render: (_:any, record:any) => <img src={record.img} alt="" />,
        },
        {
          title: '链接',
          render: (_:any, record:any) => <Button type='link' href={record.link}> 链接 </Button>,
          key: 'address',
        },
        {
          title: '提示',
          key: 'tags',
          dataIndex: 'alt',
         
        },
        {
          title: '是否显示',
          key: 'tags',
          render: (_:any, record:any) =>  <Switch checked={record.flag} onChange={(checked)=>{ONChang(checked,record.bannerid)}} />,
         
        },
        {
          title: '操作  ',
          key: 'action',
          render: (_:any, record:any) => (
            <Space size="middle">
                  <Button type="primary" danger onClick={()=>{onclickdelete(record)}}>
                      Delete
                  </Button>
            </Space>
          ),
        },
      ];
      
    const [size, setSize] = useState<SizeType>('large');
  
    const Navigate = useNavigate()
   
    
    const banneradd=()=>{
        Navigate('/index/Banneradd')
      }

      var request_banner_list = async ()=>{ 
        var res = await service.banner.banner_list({token:token});
        if(res.data.code==200){
            setBannerlist(res.data.data)
            console.log(res.data);
        }
    }
    useEffect(() => {
        request_banner_list();
    },[])
    return (
        <div className='banner'>
                {contextHolder}
            <div className="top1">
         <Space wrap>
            <Button type="primary"  size={size} onClick={()=>{banneradd()}}>
            添加轮播图<PlusOutlined />
            </Button>
            <Button type="primary"  size={size}>
            导出Excel<VerticalAlignBottomOutlined />
            </Button>
        </Space>
            </div>
            <Table columns={columns} dataSource={bannerlist}   />
        </div>
    );
}

export default Banner;