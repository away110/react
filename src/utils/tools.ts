import mapdata from './constants'


//根据key换 中文字符串
export function getText(key:string){
    return mapdata[key]
}