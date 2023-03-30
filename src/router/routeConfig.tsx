import {lazy} from 'react'
import {Navigate} from 'react-router-dom'
import AuthComponent from './AuthComponent'
var Index = lazy(()=>import('../views/Index'))
var Login = lazy(()=>import('../views/Login'))
var NotFound = lazy(()=>import('../views/NotFound'))
var NotFoundthree = lazy(()=>import('../views/NotFound/Notfoundthree'))


var Banner = lazy(()=>import('../components/Banner/Banner'))
var Banneradd = lazy(()=>import('../components/Banner/Banneradd'))
var Admin = lazy(()=>import('../components/Admin/Admin'))
var Indexs = lazy(()=>import('../components/Indexs/Indexs'))
var Command = lazy(()=>import('../components/Pro/Command/Command'))
var Searchs = lazy(()=>import('../components/Pro/Search/Searchs'))
var Seckill = lazy(()=>import('../components/Pro/Seckill/Seckill'))
var Pro = lazy(()=>import('../components/Pro/Pro'))
var Echarts = lazy(()=>import('../components/Echarts/Echarts'))
var Editor = lazy(()=>import('../components/Editor/Editor'))
var Excel = lazy(()=>import('../components/Excel/Excel'))
var Map = lazy(()=>import('../components/Map/Map'))
var Statistic = lazy(()=>import('../components/Statistic/Statistic'))

//配置路由表
export default [
    {
        path: '/index',
        element: <Index />,
         //创建子路由
          children:[
          {
          path:"Banner",
          element:  <AuthComponent perm='1-1'><Banner/></AuthComponent> 
           },
          {
          path:"Banneradd",
          element:<AuthComponent perm='1-2'><Banneradd/></AuthComponent> 
           },
          {
          path:"Indexs",
          element:<Indexs/>
           },
          {
          path:"Command",
          element:<AuthComponent perm='3-3'><Command/></AuthComponent> 
          
           },
          {
          path:"Searchs",
          element:<AuthComponent perm='3-4'><Searchs/></AuthComponent> 
           },
          {
          path:"Seckill",
          element:<AuthComponent perm='3-2'><Seckill/></AuthComponent>
           },
          {
          path:"Pro",
          element:<AuthComponent perm='3-1'><Pro/></AuthComponent>
           },
          {
          path:"Admin",
          element:<AuthComponent perm='2-1'><Admin/></AuthComponent>
           },
          {
          path:"Echarts",
          element:<AuthComponent perm='4-1'><Echarts/></AuthComponent>
           },
          {
          path:"Editor",
          element:<AuthComponent perm='5-1'><Editor/></AuthComponent>
           },
          {
          path:"Excel",
          element:<AuthComponent perm='6-1'><Excel/></AuthComponent>
           },
          {
          path:"Map",
          element:<AuthComponent perm='7-1'><Map/></AuthComponent>
           },
          {
          path:"Statistic",
          element:<Statistic/>
           },
          ]
      },
      {
        path: '/',
        element: <Navigate to="/index/Indexs" />,
      },
    {
        path:'/login',
        element: <Login />,
    },
    {
        path:'/NotFoundthree',
        element: <NotFoundthree />,
    },
    {
        path:'*',
        element: <NotFound />,
    }
]