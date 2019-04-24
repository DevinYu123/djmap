// map.js
let locationData = require('../../resources/gis-location')
Page({
  data: {
    markers: []
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    let that = this
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success:(res)=>{
            let latitude = res.latitude; 
            let longitude = res.longitude; 
            let marker=this.createMarker(res);
            this.setData({
                centerX:longitude,
                centerY:latitude,
                markers:this.getLocationMarkers()
            })
        }
    });
  },
  markertap(e) {
  },
  getLocationMarkers(){
    let markers=[];
    for(let item of locationData){
      let marker=this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  createMarker(point){
    let latitude = point.latitude; 
    let longitude = point.longitude; 
    let marker= {
      id:point.id || 0,
      latitude: latitude,
      longitude: longitude,
      iconPath: "/image/location.png",
      width: 80,
      height: 55,
      anchor: { x: .23, y: 1 },
      callout: {
        content: point.name || '',
        color: "#ff0000",
        fontSize: "12",
        borderRadius: "10",
        bgColor: "#ffffff",
        padding: "8",
        display: "BYCLICK",
        textAlign: "center"
      }
    };
    return marker;
  }
})