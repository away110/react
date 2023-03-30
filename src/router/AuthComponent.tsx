import React, { Suspense,lazy } from 'react';
import { useSelector } from 'react-redux';
var NotFoundthree = lazy(()=>import('../views/NotFound/Notfoundthree'))
interface Props{
   perm:string
   children:any
}
function AuthComponent(props:Props) {
    var checkedkeys =  useSelector((state:any)=>state.userInfo.checkedkeys)
    var res =  checkedkeys.length == 0 || checkedkeys.includes(props.perm)
    return (
       
            <Suspense fallback={<div ><img src="https://img.zcool.cn/community/0158d05aa1ed29a801206d96a17bd4.gif" alt="" /></div>}>
            {
                res ? props.children : <NotFoundthree/>
            }
            </Suspense>
    );
}

export default AuthComponent;