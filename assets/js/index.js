 var connected_flag=0    
    var mqtt;
    var reconnectTimeout = 2000;
    // var host="broker.hivemq.com";
    var host="222.165.186.100";
    var port=8000;
    // var port=1880;

    var uname    = "inoc";
    var pword    = "noc_123";

    var soil_t=0;
    var soil_m=0;
    var soil_l =456;
    var soil_h=0;
    var temp2=0;
    var mois2=0;
    var hum2=0;
    var lux2=0;
    var mois = 0;
    var temp = 0;
    var hum = 0;
    var lux = 0;
    var amois = 0;
    var atemp = 0;
    var ahum = 0;
    var alux = 0;
    var us_location=[79.90245608082853,6.738995286668619];
    var err_distance=0.0001; // 0.001==100m
//     document.mainForm.onclick = function(){
//     us_location=document.mainForm.city.value;
//     document.getElementById("lc_id").innerHTML=us_location;
// }
        

    function onConnectionLost(){
    console.log("connection lost");
    document.getElementById("status").innerHTML = "Connection Lost";
    document.getElementById("messages").innerHTML ="Connection Lost";
    connected_flag=0;
    }
    function onFailure(message) {
        console.log("Failed");
        document.getElementById("messages").innerHTML = "Connection Failed- Retrying";
        setTimeout(MQTTconnect, reconnectTimeout);
        }
    function onMessageArrived(r_message){
        var value_er=0;
        out_msg="Message received "+r_message.payloadString;
        out_msg=out_msg+"Message received Topic "+r_message.destinationName;
        console.log("Message received ",r_message.payloadString);
        // temp
        if(topic=="slt_agro21/data/id_0001" && IsJsonString(r_message.payloadString))
        {
            soil_l=obj.lux*1.2+8;
        }
        // temp
        document.getElementById("messages").innerHTML =out_msg;
        var topic=r_message.destinationName;
        if(topic=="slt_agro21/data/id_0001" && IsJsonString(r_message.payloadString))
        {
        const obj = JSON.parse(r_message.payloadString);
        console.log(`coming coordinate: ${obj.location}`);
        var st_location = obj.location;
        var ar_location = st_location.split(",");
        ar_location = ar_location.map((i) => Number(i));
        valformap(obj,ar_location);
        console.log(`get coordinate: ${ar_location}`);
        if (0<=obj.hum && 0<=obj.lux && 0<=obj.temp){value_er=1;}
        if (value_er==1 && err_distance >Math.abs((us_location[0]-ar_location[0])) && err_distance >Math.abs((us_location[1]-ar_location[1])))
        {  
        console.log("ok");   
        mois=obj.mois;
        temp=obj.temp;
        hum=obj.hum;
        lux=obj.lux;


        document.getElementById("mois").innerHTML =mois ;
        document.getElementById("temp").innerHTML =temp ;
        document.getElementById("hum").innerHTML =hum ;
        document.getElementById("lux").innerHTML =lux;
        

        if (mois!=mois2) {
            Circles.create({
                    id:           'task-mois',
                    radius:       75,
                    value:        mois,
                    tstart:       mois2,
                    maxValue:     100,
                    width:        7,
                    text:         function(value){return value + '';},
                    colors:       ['#eee', '#6fd67a'],
                    duration:     400,
                    wrpClass:     'circles-wrp',
                    textClass:    'circles-text',
                    styleWrapper: true,
                    styleText:    true
                })
                mois2=mois;
                }
        if (temp!=temp2) {
            Circles.create({
                    id:           'task-temp',
                    radius:       75,
                    value:        temp,
                    tstart:       temp2,
                    maxValue:     60,
                    width:        7,
                    text:         function(value){return value + '';},
                    colors:       ['#eee', '#6fd67a'],
                    duration:     400,
                    wrpClass:     'circles-wrp',
                    textClass:    'circles-text',
                    styleWrapper: true,
                    styleText:    true
                })
                temp2=temp;
                }
        if (hum!=hum2) {
             Circles.create({
                    id:           'task-hum',
                    radius:       75,
                    value:        hum,
                    tstart:       hum2,
                    maxValue:     100,
                    width:        7,
                    text:         function(value){return value + '';},
                    colors:       ['#eee', '#6fd67a'],
                    duration:     400,
                    wrpClass:     'circles-wrp',
                    textClass:    'circles-text',
                    styleWrapper: true,
                    styleText:    true
                })
                hum2=hum;
                }
        if (lux!=lux2) {
            Circles.create({
                    id:           'task-lux',
                    radius:       75,
                    value:        lux,
                    tstart:       lux2,
                    maxValue:     1500,
                    width:        7,
                    text:         function(value){return value + '';},
                    colors:       ['#eee', '#6fd67a'],
                    duration:     400,
                    wrpClass:     'circles-wrp',
                    textClass:    'circles-text',
                    styleWrapper: true,
                    styleText:    true
                })
                lux2=lux;
                }
            }
        value_er=0;
        }

        if(topic=="slt_agro21/adata/id_0001" && IsJsonString(r_message.payloadString))
        {
        const obj = JSON.parse(r_message.payloadString);
        var st_location = obj.location;
        var ar_location = st_location.split(",");
        ar_location = ar_location.map((i) => Number(i));
        console.log(ar_location);
        if (0<=obj.hum && 0<=obj.lux && 0<=obj.temp){value_er=1;}
        if (value_er==1 && err_distance>Math.abs((us_location[0]-ar_location[0])) && err_distance>Math.abs((us_location[1]-ar_location[1])))
        {
            amois=obj.amois;
            atemp=obj.atemp;
            ahum=obj.ahum;
            alux=obj.alux;
            document.getElementById("amois").innerHTML =amois;
            document.getElementById("atemp").innerHTML =atemp;
            document.getElementById("ahum").innerHTML =ahum;
            document.getElementById("alux").innerHTML =alux;
        }
        value_er=0;
        }

        if(topic=="slt_agro21/data/id_0002" && IsJsonString(r_message.payloadString))
        {
        const obj = JSON.parse(r_message.payloadString);

        if(obj.ST<60){temp =obj.ST;}
        if(obj.SM<100){mois =obj.SM;}
        // if(obj.B<30){lux=obj.B*5+500;}
        if(soil_l>0){lux=soil_l;}
        if(obj.B<30){hum=obj.B+66;}
        console.log(soil_m+" "+soil_t);
        document.getElementById("mois").innerHTML =mois ;
        document.getElementById("temp").innerHTML =temp ;
        document.getElementById("hum").innerHTML =hum ;
        document.getElementById("lux").innerHTML =lux;

        document.getElementById("amois").innerHTML =mois;
        document.getElementById("atemp").innerHTML =temp;
        document.getElementById("ahum").innerHTML =hum;
        document.getElementById("alux").innerHTML =lux;

        all_values[0][0] = mois;
        all_values[0][1] = temp;
        all_values[0][2] = hum;
        all_values[0][3] = lux;
        

        if (mois!=mois2) {
            Circles.create({
                    id:           'task-mois',
                    radius:       75,
                    value:        mois,
                    tstart:       mois2,
                    maxValue:     100,
                    width:        7,
                    text:         function(value){return value + '';},
                    colors:       ['#eee', '#6fd67a'],
                    duration:     400,
                    wrpClass:     'circles-wrp',
                    textClass:    'circles-text',
                    styleWrapper: true,
                    styleText:    true
                })
                mois2=mois;
                }
        if (temp!=temp2) {
            Circles.create({
                    id:           'task-temp',
                    radius:       75,
                    value:        temp,
                    tstart:       temp2,
                    maxValue:     60,
                    width:        7,
                    text:         function(value){return value + '';},
                    colors:       ['#eee', '#6fd67a'],
                    duration:     400,
                    wrpClass:     'circles-wrp',
                    textClass:    'circles-text',
                    styleWrapper: true,
                    styleText:    true
                })
                temp2=temp;
                }
        if (hum!=hum2) {
             Circles.create({
                    id:           'task-hum',
                    radius:       75,
                    value:        hum,
                    tstart:       hum2,
                    maxValue:     100,
                    width:        7,
                    text:         function(value){return value + '';},
                    colors:       ['#eee', '#6fd67a'],
                    duration:     400,
                    wrpClass:     'circles-wrp',
                    textClass:    'circles-text',
                    styleWrapper: true,
                    styleText:    true
                })
                hum2=hum;
                }
        if (lux!=lux2) {
            Circles.create({
                    id:           'task-lux',
                    radius:       75,
                    value:        lux,
                    tstart:       lux2,
                    maxValue:     1500,
                    width:        7,
                    text:         function(value){return value + '';},
                    colors:       ['#eee', '#6fd67a'],
                    duration:     400,
                    wrpClass:     'circles-wrp',
                    textClass:    'circles-text',
                    styleWrapper: true,
                    styleText:    true
                })
                lux2=lux;
                }
        }
        }

    function onConnected(recon,url){
    console.log(" in onConnected " +reconn);
    }
    function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
    document.getElementById("messages").innerHTML ="Connected to "+host +"on port "+port;
    connected_flag=1
    document.getElementById("status").innerHTML = "Connected";
    console.log("on Connect "+connected_flag);
    mqtt.subscribe("slt_agro21/data/id_0001");
    mqtt.subscribe("slt_agro21/adata/id_0001");
    mqtt.subscribe("slt_agro21/data/id_0002");
    
      }

    function MQTTconnect() {
    console.log("connecting to "+ host +" "+ port);
    var x=Math.floor(Math.random() * 10000); 
    var cname="controlform-"+x;
    mqtt = new Paho.MQTT.Client(host,port,cname);
    // document.write("connecting to "+ host);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
        userName: 'inoc',
        password: 'noc_123'
      
     };



    
        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
        // mqtt.onConnected = onConnected;

    mqtt.connect(options);
    return false;
    }

function send_message(){
        if (connected_flag==0){
        out_msg="<b>Not Connected so can't send</b>"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
        }
        // console.log("message= "+msg);
        var jdoc = {
            "location":"80.41251167765263,6.989156875109475",
            "s_water":p_water,
            "s_npk":p_temp,
            "s_light":p_lux,
            "s_extra":p_ex1 
        };
        var msg = JSON.stringify(jdoc);
        message = new Paho.MQTT.Message(msg);
        message.destinationName = 'slt_agro21/data_in/id_0001';

        mqtt.send(message);
        return false;
    }

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}




// Values for Charts

var cmois =[['5','6','7','8','9','10','11','12'],[95,80,75,20,60,31,92,56]];  //8 values
var ctemp =[['1','2','3','4','5','6','7','8','9','10','11','12'],[21,12,31,25,29,30,27,25,17,15,9,23]]; //12 value
var clux =[['5','6','7','8','9','10','11','12'],[200,310,410,650,210,50,500,1200]]; //8 values


function update_charts(){
var d = new Date();
var n = d.getSeconds();

    for (let i = 0; i < cmois[1].length; i++) {
        if(i < cmois[1].length-1){
         cmois[1][i]=cmois[1][i+1];   
         cmois[0][i]=cmois[0][i+1]; 
        }
        if (i==cmois[1].length-1) {
         cmois[1][i]=mois;   
         cmois[0][i]=n;  
        }
    }
    for (let i = 0; i < ctemp[1].length; i++) {
        if(i < ctemp[1].length-1){
         ctemp[1][i]=ctemp[1][i+1];   
         ctemp[0][i]=ctemp[0][i+1]; 
        }
        if (i==ctemp[1].length-1) {
         ctemp[1][i]=temp;   
         ctemp[0][i]=n;  
        }
    }
    for (let i = 0; i < clux[1].length; i++) {
        if(i < clux[1].length-1){
         clux[1][i]=clux[1][i+1]; 
         clux[0][i]=clux[0][i+1];   
        }
        if (i==clux[1].length-1) {
         clux[1][i]=lux;   
         clux[0][i]=n; 
        }
    }
md.initDashboardPageCharts();
}


var update_time =0;
setInterval(function(){ 
    update_time=update_time+1;
    if(update_time==6){
        update_time=0;
        update_charts();
        }
    document.getElementById("update_t1").innerHTML = update_time +' minutes';
    document.getElementById("update_t2").innerHTML = update_time +' minutes';
    document.getElementById("update_t3").innerHTML = update_time +' minutes'; 
  
}, 60000);



function valformap(obj,ar_location){
    console.log("ok val");
    for (let i = 0; i < all_location.length; i++) {
    if(0.00001>Math.abs((all_location[i][0]-ar_location[0])) && 0.00001>Math.abs((all_location[i][1]-ar_location[1])))
         {
           all_values[i][0] = obj.mois;
           all_values[i][1] = obj.temp;
           all_values[i][2] = obj.hum;
           all_values[i][3] = obj.lux;
         }
    }
}


