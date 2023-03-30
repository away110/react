import React,{Suspense} from 'react';
import { useRoutes } from 'react-router-dom'
import routes from './routeConfig'

function RouterView() {
    return (
        <Suspense fallback={<div ><img src="https://img.zcool.cn/community/0158d05aa1ed29a801206d96a17bd4.gif" alt="" /></div>}>
            { 
                useRoutes(routes) 
            }
        </Suspense>
    );
}

export default RouterView;