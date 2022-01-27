
var msg_obj ={"Temprature Analysis (C)":26.6,"Humidity Analysis (%)":87.1,"Soil Temprature Analysis (C)":26.2,"Soil Moisture Analysis (%)":17.151,"Soil EC Analysis (mS/cm)":0.6,"Soil PH Analysis":5.1,"Soil Nitrogen Analysis (ppm)":1,"Soil Phosphorus Analysis (ppm)":1,"Soil Potassium Analysis (ppm)":2,"Rain Fall Analysis (mm)":202,"B Analysis":7.6,"SI Analysis":0};
var length = Object.keys(msg_obj).length;
var keys = Object.keys(msg_obj);

// console.log(msg_obj[keys[9]]);

var maxVal = [60,130,60,100,10,14,100,100,100,500,100,10];

$.ajax({
  url : 'fetchdata.php', // your php file
  async: true,
  type : 'GET', // type of the HTTP request
  success : function(data){
     var obj = jQuery.parseJSON(data); 
    //  order by 'dataID' 
    //  DESC limit 5

    getData(obj);
  }
});

var timelabel = [];
var upTime = [];
var upTimeObj =[];

var getData = function(obj){
  obj.reverse();

  for (let i = 0; i < 8; i++) {
    timelabel.push(obj[i][12].substring(11, 16));
  }

  for (let i = 0; i < 8; i++) {
    var secondArr = obj[i];
    
    for(let k = 0; k < length; k++){
      var datacode=`
      data`+k+`.shift();
      data`+k+`[7]=` + secondArr[k] +`;
      draw_chart`+k+`.data.series[0]=data`+k+`;
      draw_chart`+k+`.update(); 
      `;
      eval(datacode);
    }
  } 

  for (let i = 0; i < 8; i++) {

    if(i=7){
      var latestTime = obj[i][12];
      // console.log('latestTime = ', latestTime);
      var latest = "Sensor History (Updated on "+latestTime.substring(11, 16)+")";
      document.getElementById("latestUpdateTime").innerHTML =latest;

      for(let m = 0; m<12; m++){
        upTime.push(latest);
      };
      // console.log(upTime);
      upTimeObj = Object.values(upTime);
      // console.log('uptime obj ' +upTimeObj);
    }

  }

};

// console.log('---------------time-----------------');
// console.log(timelabel);

// labels: ['`+l1+`',"`+timelabel[1]+`", "`+timelabel[2]+`", "`+timelabel[3]+`"," `+timelabel[4]+`", "`+timelabel[5]+`", "`+timelabel[6]+`", "`+timelabel[7]+`"],

for (let i = 0; i < length; i++) {

  var code = `
      var data`+i+` = [0,0,0,0,0,0,0,0]; 
      data_chart`+i+` = {
        labels: timelabel,
        series: [
          [data`+i+`[7], data`+i+`[6], data`+i+`[5], data`+i+`[4], data`+i+`[3], data`+i+`[2], data`+i+`[1], data`+i+`[0]]
        ]
      };

      option_chart`+i+` = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: maxVal[`+i+`], // SLTAgro: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      var draw_chart`+i+` = new Chartist.Line('#draw_chart`+i+`', data_chart`+i+`, option_chart`+i+`);

      
      // start animation for the Completed Tasks Chart - Line Chart
      md.startAnimationForLineChart(draw_chart`+i+`); 
      document.getElementById("chart_title`+i+`").innerHTML = keys[`+i+`];
      // document.getElementById("latestUpdate`+i+`").innerHTML = upTimeObj[`+i+`];
      `; 
  eval(code); 
};



