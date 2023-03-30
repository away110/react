import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import service from '../../api/api'

interface Props {}

function Echarte(props:Props) {
    
    var [xAxis,setXAxis] = useState([])
    var [seriesData,setSeriesData] = useState([])
    var [myChart,setMyChart] = useState<{setOption:any}>({setOption:''})

    //数据渲染
    var draw = ()=>{
        myChart && myChart.setOption &&
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                data: xAxis
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'line',//'bar','line','pie'
                    // data: [5, 20, 36, 10, 10, 20]
                    data: seriesData,
                    showBackground: true,
                    itemStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                      ])
                    },
                    emphasis: {
                        itemStyle: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                          ])
                        }
                      },
                }
            ]
        });
    }

    var request_data = async ()=>{
        var res = await service.data.data_simpleData();
        var rev = await service.data.data_kData();
        console.log(rev.data);
        
        var xAxis = res.data.data.map((item:any)=>item.x);
        var seriesData = res.data.data.map((item:any)=>item.val);
        setXAxis( xAxis );
        setSeriesData( seriesData );
    }

    useEffect(()=>{
        // 绘制图表
        myChart && draw();
    },[myChart,xAxis,seriesData])

    useEffect(()=>{

        // 基于准备好的dom，初始化echarts实例
        var mc = echarts.init(document.getElementById('man') || document.body);
        setMyChart(mc);
        
        //请求数据
        request_data();

    },[])

    
    return (
        <div className='echarts'>
            <div id="man" style={{height:500,width:700}}></div>
        </div>
    );
}

export default Echarte;