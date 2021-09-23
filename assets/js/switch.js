var p_water=0;
var p_temp=0;
var p_lux=0;
var p_ex1=0;
var water_status=0;
var temp_status=0;
var lux_status=0;
var ex1_status=0;

// mois Slider
$("#slider_mois").roundSlider({
    sliderType: "min-range",
    circleShape: "pie",
    startAngle: "315",
    lineCap: "round",
    radius: 80,
    width: 12,
    handleSize: "+8",
    editableTooltip: false,
    tooltipFormat: function (e) {
    if(water_status==1){
      p_water=e.value;
      send_message();
      }
    return e.value+" %" +`<div><small class="tipfont">Water</small></div>` ;
    
    // return "<div>Http post</div> <div>test c</div>";
    },

    // min: -50,
    max: 100,
    
    svgMode: true,
      pathColor: "#eee",
      borderWidth: 0,
    
      startValue: 0,
    
    valueChange: function (e) {
        var color = e.isInvertedRange ? "#FF5722" : "#8BC34A";
      
      $("#slider_mois").roundSlider({ "rangeColor": color, "tooltipColor": color });
    }
});

var sliderObj = $("#slider_mois").data("roundSlider");
sliderObj.setValue(10);


// lux Slider
$("#slider_lux").roundSlider({
    sliderType: "min-range",
    circleShape: "pie",
    startAngle: "315",
    lineCap: "round",
    radius: 80,
    width: 12,
    handleSize: "+8",
    editableTooltip: false,
    tooltipFormat: function (e) {
    if(lux_status==1){
        p_lux=e.value;
        send_message();
        }
    return e.value+" %" +`<div><small class="tipfont">Light</small></div>` ;
    
    // return "<div>Http post</div> <div>test c</div>";
    },

    // min: -50,
    max: 100,
    
    svgMode: true,
      pathColor: "#eee",
      borderWidth: 0,
    
      startValue: 0,
    
    valueChange: function (e) {
        var color = e.isInvertedRange ? "#FF5722" : "#8BC34A";
      
      $("#slider_lux").roundSlider({ "rangeColor": color, "tooltipColor": color });
    }
});

var sliderObj = $("#slider_lux").data("roundSlider");
sliderObj.setValue(10);

// temp Slider
$("#slider_temp").roundSlider({
    sliderType: "min-range",
    circleShape: "pie",
    startAngle: "315",
    lineCap: "round",
    radius: 80,
    width: 12,
    handleSize: "+8",
    editableTooltip: false,
    tooltipFormat: function (e) {
    if(temp_status==1){
        p_temp=e.value;
        send_message();
      }
    return e.value+" %" +`<div><small class="tipfont">Temprature</small></div>` ;
    
    // return "<div>Http post</div> <div>test c</div>";
    },

    // min: -50,
    max: 100,
    
    svgMode: true,
      pathColor: "#eee",
      borderWidth: 0,
    
      startValue: 0,
    
    valueChange: function (e) {
        var color = e.isInvertedRange ? "#FF5722" : "#8BC34A";
      
      $("#slider_temp").roundSlider({ "rangeColor": color, "tooltipColor": color });
    }
});

var sliderObj = $("#slider_temp").data("roundSlider");
sliderObj.setValue(10);

// hum Slider
$("#slider_ex1").roundSlider({
    sliderType: "min-range",
    circleShape: "pie",
    startAngle: "315",
    lineCap: "round",
    radius: 80,
    width: 12,
    handleSize: "+8",
    editableTooltip: false,
    tooltipFormat: function (e) {
    if(ex1_status==1){
      p_ex1=e.value;
      send_message();
    }
    return e.value+" %" +`<div><small class="tipfont">Extra</small></div>` ;
    // return "<div>Http post</div> <div>test c</div>";
    },

    // min: -50,
    max: 100,
    
    svgMode: true,
	  pathColor: "#eee",
	  borderWidth: 0,
    
	  startValue: 0,
    
    valueChange: function (e) {
    	var color = e.isInvertedRange ? "#FF5722" : "#8BC34A";
      
      $("#slider_ex1").roundSlider({ "rangeColor": color, "tooltipColor": color });
    }
});

var sliderex1 = $("#slider_ex1").data("roundSlider");
sliderex1.setValue(10);

// get on/off values
$('#s_water').on('click',function(){
          if(this.checked){
              console.log("w_on");
              var water = $("#slider_mois").data("roundSlider");
              p_water = water._prechange;
              water_status=1;
              send_message();
           }else{
              console.log("w_off");
              p_water=0;
              water_status=0;
              send_message();
           }
      });
$('#s_temp').on('click',function(){
          if(this.checked){
              console.log("t_on");
              var temp = $("#slider_temp").data("roundSlider");
              p_temp = temp._prechange;
              temp_status=1;
              send_message();
           }else{
              console.log("t_off");
              p_temp=0;
              temp_status=0;
              send_message();
           }
      });
$('#s_lux').on('click',function(){
          if(this.checked){
              console.log("l_on");
              var lux = $("#slider_lux").data("roundSlider");
              p_lux = lux._prechange;
              lux_status=1;
              send_message();
           }else{
              console.log("l_off");
              p_lux=0;
              lux_status=0;
              send_message();
           }
      });
$('#s_ex1').on('click',function(){
          if(this.checked){
              console.log("e_on");
              var ex1 = $("#slider_ex1").data("roundSlider");
              p_ex1 = ex1._prechange;
              ex1_status=1;
              send_message();
           }else{
              console.log("e_off");
              p_ex1=0;
              ex1_status=0;
              send_message();
           }
      });