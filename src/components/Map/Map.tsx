import React, { useEffect } from 'react';
interface Props{

}
function Map(props:Props) {
    useEffect(()=>{
        var map = new BMapGL.Map("container");
        var point = new BMapGL.Point(108.9536191100424,34.26559257567172);
        map.enableScrollWheelZoom();  
        map.centerAndZoom(point, 15); 
        map.setMapType(BMAP_EARTH_MAP);  
        var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl);
        // var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
        // map.addControl(cityCtrl); 
        var navi3DCtrl = new BMapGL.NavigationControl3D(); // 添加3D控件
         map.addControl(navi3DCtrl);
        var opts = {
            offset: new BMapGL.Size(150, 5)
        }
        // 添加控件
        map.addControl(new BMapGL.ScaleControl(opts));
        // 移除控件
        map.removeControl(new BMapGL.ScaleControl(opts));
        
    },[])
    return (
            <div id="container" style={{height:600}}></div> 
    );
}

export default Map;