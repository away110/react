
import React, { useEffect, useState } from 'react';
import { Table ,Switch,Button ,message} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import service from '../../../api/api';
import '../Pro.scss'
interface Props{

}
interface DataType {
    // key: React.Key;
    brand: string;
    category: string;
    proname: string;
    img1: string;
    originprice: number;
    discount: number;
    sales: number;
    isrecommend: number;
    proid:string
  }
function Command(props:Props) {
    const [prolists ,setProlists] =useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const columns: ColumnsType<DataType> = [
        {
          title: '序号',
          width:100,
          render: (_, record,index) => <div>{index+1}</div>,
        },
        {
          title: '图片',
          width:100,
          render: (_, record) => <img src={record.img1} alt="" />,
        },
        {
            title: '名称',
            width:160,
            dataIndex: 'proname',
          },
        {
            title: '品牌',
            width:100,
            dataIndex: 'brand',
          },
        {
            title: '分类',
            dataIndex: 'category',
          },
        {
          title: '原价',
          dataIndex: 'originprice',
          sorter: {
            compare: (a, b) => a.originprice - b.originprice,
            multiple: 3,
          },
        },
        {
          title: '折扣',
          dataIndex: 'discount',
          sorter: {
            compare: (a, b) => a.discount - b.discount,
            multiple: 2,
          },
        },
        {
          title: '销量',
          dataIndex: 'sales',
          sorter: {
            compare: (a, b) => a.sales - b.sales,
            multiple: 1,
          },
        },
        {
            title: '是否推荐',
            render: (_, record,index) => <Switch checked={record.isrecommend==1} onChange={(checked)=>{FlagonChanges(checked,record.proid,'isrecommend')}} />,
          },
        {
            title: '操作',
            render: (_, record) => <Button type="primary" danger>
                Delete
            </Button>,
          },
      ];
   
      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
      const FlagonChanges = async (checked: any,proid:any,type:any) => {
            var rev= await service.pro.pro_updateFlag({proid,flag:checked,type})
            if(rev.data.code==200){
              messageApi.open({
                type: 'success',
                content: '更新成功',
              });
              var res = await service.pro.pro_showdata({type:'isrecommend',flag:1})
              console.log(res.data.data);
              setProlists(res.data.data)
            }else{
              messageApi.open({
                type: 'error',
                content: '更新失败',
              });
            }
      };
      var prolist = async ()=>{
        var res = await service.pro.pro_showdata({type:'isrecommend',flag:1})
          console.log(res.data.data);
          
          setProlists(res.data.data)
      }
      useEffect(()=>{
        prolist()
      },[])
    return (
        <div className='pro'>
              {contextHolder}
             <Table columns={columns} dataSource={prolists} onChange={onChange} />;
        </div>
    );
}

export default Command;