import service from "../utils/request";

//1. 获取商品的列表
export function pro_list(payload = {}){
    return service.get('/pro/list', { params: payload } )
}
//2. 获取商品的列表
export function pro_updateFlag(payload = {}){
    return service.post('/pro/updateFlag', payload )
}
//3. 获取秒杀/或推荐的列表
export function pro_showdata(payload = {}){
    return service.post('/pro/showdata', payload )
}
//4. 筛选商品
export function pro_searchPro(payload = {}){
    return service.post('/pro/searchPro', payload )
}
//5.  获取商品的分类
export function pro_getCategory(payload = {}){
    return service.get('/pro/getCategory', { params: payload } )
}