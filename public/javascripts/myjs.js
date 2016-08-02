let show;
$("#submit").click(() => {
    let expressNumber = $('#expressNumber').val();
    $.get("getExpressNumber", {
        EN: expressNumber
    }, (data) => {
        //adds=JSON.parse(data);
        show = showOnMap(data);
        show.next();

    });
});
var myGeo = new BMap.Geocoder();
//var adds = ["【厦门关务组】", "【厦门集美集散中心】", "【北京通州集散中心】", "【天津东丽集散中心】", "【天津北辰集散中心】", "【天津市西青区富兴路营业点】"];
var linePoint = [];
//折线
function polyLine(){
  var polyline = new BMap.Polyline(linePoint, {
      strokeColor: "blue",
      strokeWeight: 2,
      strokeOpacity: 0.5
  }); //创建折线
  map.addOverlay(polyline); //增加折线
}

function drawline() {
    //弧线
    console.log("折线");
    var curve = new BMapLib.CurveLine(linePoint, {
        strokeColor: "blue",
        strokeWeight: 3,
        strokeOpacity: 0.5
    }); //创建弧线对象
    map.addOverlay(curve); //添加到地图中
    //curve.enableEditing(); //开启编辑功能
}
var map = new BMap.Map("container"); // 创建地图实例
map.centerAndZoom(new BMap.Point(105.269945, 35.86713), 7);
map.enableScrollWheelZoom(true);
map.setMapStyle({
    styleJson: [{
        "featureType": "all",
        "elementType": "all",
        "stylers": {
            "lightness": 10,
            "saturation": -100
        }
    }]
});
map.addEventListener("tilesloaded", function() {
    console.log("百度地图加载完毕");
});



function* showOnMap(adds) {
    if (adds) {
        for (let i = 0; i < adds.length; i++) {
            let v = adds[i];
            console.log(v);
            yield myGeo.getPoint(v, function(point) {
                if (point) {
                    var address = new BMap.Point(point.lng, point.lat);
                    push(address);
                    if (linePoint.length == adds.length) {
                        //polyLine()
                        drawline();
                    }

                }

            });

        };


    }
}

function push(v) {
    console.log(v);
    linePoint.push(v);
    show.next();
}
