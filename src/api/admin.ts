import service from "../utils/request";

//1.管理系统登录
export function admin_login( payload = {} ){
    return service.post( '/admin/login', payload )
}
//2.管理员列表
export function admin_list( payload = {} ){
    return service.get( '/admin/list', { params:payload } )
}
//3.添加管理员
export function admin_add( payload = {} ){
    return service.post( '/admin/add', payload  )
}
//4.添加管理员
export function admin_delete( payload = {} ){
    return service.post( '/admin/delete', payload  )
}
//4.编辑管理员
export function admin_update( payload = {} ){
    return service.post( '/admin/update', payload  )
}
//4.获取管理员信息
export function admin_detail( payload = {} ){
    return service.get( '/admin/detail',{ params:payload }  )
}

