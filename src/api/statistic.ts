import service from "../utils/request";


//1. 商品总数量
export function statistic_product(payload = {}){
    return service.get('/statistic/product', { params: payload } )
}
//2. 用户总数量
export function statistic_user(payload = {}){
    return service.get('/statistic/user', { params: payload } )
}