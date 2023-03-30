
import React, { useEffect, useState } from 'react';
import { Table ,Switch,Button ,message,Select,Form,Space,Input,FloatButton  } from 'antd';
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
    issale: number;
    isseckill: number;
    proid:string
  }
function Searchs(props:Props) {
    const [prolists ,setProlists] =useState([])
    const [getCategorylists ,setGetCategorylists] =useState([])
    const [values ,setValues] =useState('')
    const [selects ,setSelects] =useState('')
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
            title: '是否售卖',
            render: (_, record,index) => <Switch checked={record.issale==1} onChange={(checked)=>{FlagonChanges(checked,record.proid,'issale')}} />,
          },
        {
            title: '是否秒杀',
            render: (_, record,index) => <Switch checked={record.isseckill==1} onChange={(checked)=>{FlagonChanges(checked,record.proid,'isseckill')}} />,
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
              var res = await service.pro.pro_list()
              console.log(res.data.data);
              setProlists(res.data.data)
            }else{
              messageApi.open({
                type: 'error',
                content: '删除轮播图失败',
              });
            }
      };
      var prolist = async ()=>{
          var res = await service.pro.pro_list({count:1,limitNum:200})
          console.log(res.data.data);
          setProlists(res.data.data)
      }
      var getCategorylist = async ()=>{
        var reb =await service.pro.pro_getCategory()
        console.log(reb);
        setGetCategorylists(reb.data.data)
      }
      useEffect(()=>{
        prolist()
        getCategorylist()
      },[])
      const InputonChange=(e:any)=>{
     console.log(e.target.value);
     setValues(e.target.value)
    }
    const onGenderChange=(value:any,index:any)=>{
    console.log(value,index);
    setSelects(value)
    }
   const onButtonClick= async ()=>{
        var clsss = await service.pro.pro_searchPro({category:selects,search:values})
        if(values !='' || selects !=''){
         if(clsss.data.code ==  200){
            messageApi.open({
              type: 'success',
              content: '已查询',
            });
          }else{
            messageApi.open({
              type: 'error',
              content: `查询不到`,
            });
          }
        }else{
          messageApi.open({
            type: 'error',
            content: `请输入内容`,
          });
        }
        setProlists(clsss.data.data)
        
    }
   const onButtonClicks= async ()=>{
    var res = await service.pro.pro_list({count:1,limitNum:200})
    setValues('')
    setSelects('')
    console.log(res.data.data);
    setProlists(res.data.data)
        
    }
    return (
        <div className='searchs'>
              {contextHolder}
              <div className="top3">
                <div className="from">
                <Form
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 50 }}
                    style={{ maxWidth: 700 }}
                >
                    <Form.Item >
                        <Select  placeholder='显卡'   onChange={onGenderChange}  allowClear>
                          {
                            getCategorylists.map((item,index)=>{
                              return(
                                <Select.Option value={item} key={index}   >{item}</Select.Option>
                              )
                            })
                          }
                           
                        </Select>
                    </Form.Item>
                    <Form.Item >
                <Input.Group compact>
                  <Input style={{ width: 'calc(100% - 100px)' }} onChange={(e) => { InputonChange(e) }} />
                  <Button type="primary" onClick={() => { onButtonClick() }} >查询</Button>
                </Input.Group>
                    </Form.Item>
                </Form>
                </div>
         
          <Button type="primary" onClick={()=>{onButtonClicks()}}>显示全部商品</Button>
              </div>
              <div style={{ height: '180vh', padding: 10 }}>
             <Table columns={columns} dataSource={prolists} onChange={onChange} />;
             <FloatButton.BackTop />
             </div>
        </div>
    );
}

export default Searchs;