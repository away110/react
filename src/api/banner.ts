import service from "../utils/request";

//1.轮播图列表
export function banner_list(payload = {}){
    return service.get('/banner/list', { params: payload } )
}
//2.删除轮播图
export function banner_delete(payload = {}){
    return service.get('/banner/delete', { params: payload } )
}
//3.添加轮播图
export function banner_add(payload = {}){
    return service.post('/banner/add', payload )
}
//4.访问状态更新
export function banner_updateFlag(payload = {}){
    return service.post('/banner/updateFlag', payload )
}
