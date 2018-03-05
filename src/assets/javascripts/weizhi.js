import Vue from 'Vue';

//判断浏览器是否支持地理位置接口

let  weizhi ={
  init () {
    if(navigator.geolocation) {
        // 支持
        console.log("支持地理位置接口");
  
        this.agree_obtain_location()
        return false;
        var geolocation = new BMap.Geolocation();
        // console.log(geolocation)
            geolocation.getCurrentPosition(function(r){
              // alert(this.getStatus(),'dsf')
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                  var map = new BMap.Map("app"); 
                  console.log(map)
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    console.log('您的位置：'+r.point.lng+','+r.point.lat);
                }
                else {
                    alert('failed'+this.getStatus());
                }        
            },{enableHighAccuracy: true})
    } else {
        // 不支持
        console.log("不支持地理位置接口");
    }
  },
  //获取用户的地理位置。使用它需要得到用户的授权
  agree_obtain_location(){
    var option = {
        enableHighAccuracy : true,
        timeout : Infinity,
        maximumAge : 0
    };
  
    // navigator.geolocation.getCurrentPosition(geoSuccess,geoError,option);
    // navigator.geolocation.getCurrentPosition( (position)=> {
    //     var lat = position.coords.latitude;
    //     var lon = position.coords.longitude;
    //       var point = new BMap.Point(lon, lat);  // 创建坐标点
    //       // 根据坐标得到地址描述
    //     var myGeo = new BMap.Geocoder();
    //     alert('dfsa')
    //     myGeo.getLocation(point, function (result) {
    //         var city = result.addressComponents.city;
    //           $('body').html(city);
    //     });
    //   },
    //   () =>{
    //     console.log('fdsa')
    //   }
    // );
  
  }
} 





//同意授权

function geoSuccess(event) {
  // alert(event.coords.latitude)
  console.log(event.coords.latitude + ', ' + event.coords.longitude);

}


//拒绝授权

function geoError(event) {
  // alert('event')
  console.log("Error code " + event.code + ". " + event.message);
}


export default weizhi;


