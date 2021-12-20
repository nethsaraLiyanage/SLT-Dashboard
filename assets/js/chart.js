
var msg_obj ={"T":26.6,"H":87.1,"ST":26.2,"SM":17.151,"SEC":0.6,"SPH":5.1,"SN":1,"SP":1,"SK":2,"R":202,"B":7.6,"SI":0};
var length = Object.keys(msg_obj).length;
var keys = Object.keys(msg_obj);

// console.log(msg_obj[keys[9]]);

var maxVal = [60,130,60,100,10,14,100,100,100,500,100,10];

$.ajax({
  url : 'fetchdata.php', // your php file
  type : 'GET', // type of the HTTP request
  success : function(data){
     var obj = jQuery.parseJSON(data); 
    //  order by 'dataID' 
    //  DESC limit 5

    getData(obj);
  }
});


var getData = function(obj){

  // console.log('-----------data from db-----------------');
  // console.log(obj);

  for (let i = 0; i < 8; i++) {
    var secondArr = obj[i];

    // console.log('-----------array-----------------');
    // console.log(secondArr);
    
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
};


for (let i = 0; i < length; i++) {

  var code = `
      var data`+i+` = [0,0,0,0,0,0,0,0]; 
      data_chart`+i+` = {
        labels: ["1","2", "3", "4", "5", "6", "7", "8"],
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
      document.getElementById("chart_title`+i+`").innerHTML = keys[`+i+`] +' Analysis';

      `; 
  eval(code); 
  };




