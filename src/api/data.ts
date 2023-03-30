import service from "../utils/request";
//1.图表数据
 export function data_simpleData( payload={}){
    return service.get('/data/simpleData',{params: payload})
}
//1.k数据
 export function data_kData( payload={}){
    return service.get('/data/kData',{params: payload})
}
