import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
function RouterBeforeEach() {
    var Navigate=useNavigate()
    var Location=useLocation()
    var token =  useSelector((state:any)=>state.userInfo.token)
    useEffect(()=>{
        if(!token){
            Navigate('/login')
        }else if(Location.pathname == '/login'){
               Navigate('/index/indexs')
        }
    },[Location.pathname])
    return (<></>);
}

export default RouterBeforeEach;