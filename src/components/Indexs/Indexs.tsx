import React, { useEffect, useState } from 'react';
import { Calendar, Card, Col, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';  
import './Indexs.scss'
import service from '../../api/api';
interface Props{

}
function Indexs(props:Props) {
    const [product ,setProduct] = useState('')
    const [user ,setUser] = useState('')
    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };
      var statistic =  async ()=>{
        var res = await service.statistic.statistic_product()
        var rev = await service.statistic.statistic_user()
        console.log(res.data.data,rev.data.data);
        setProduct(res.data.data)
        setUser(rev.data.data)
      }
      useEffect(()=>{
        statistic()
      },[])
    return (
        <div className='indexs'>
            <div className="Calendar">
            <Calendar onPanelChange={onPanelChange} />
            </div>
            <div className="statistic">
                <Row gutter={16}>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="商品总数量"
                                value={product}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                                suffix="个"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="用户总数量"
                                value={user}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                // prefix={<ArrowDownOutlined />}
                                suffix="个"
                            />
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="Hello" bordered={false}>
                           欢迎来到后台管理系统
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Begin" bordered={false}>
                            开始管理你的信息吧
                        </Card>
                    </Col>
                </Row>
            </div>

        </div>
    );
}

export default Indexs;