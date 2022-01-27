var connected_flag=0    
var mqtt;
var reconnectTimeout = 2000;
// var host="broker.hivemq.com";
var host="222.165.186.100";
var port=8000;
// var port=1880;

var uname    = "root";
var pword    = "$martAgr0#9283";

var soil_t=0;
var soil_m=0;
var soil_l =456;
var soil_h=0;
var ph = 0;
var ph2 = 0;
var sec = 0;
var sec2 = 0;
var rain = 0;
var rain2 = 0;
var sn = 0;
var sn2 = 0;
var sp = 0;
var sp2 = 0;
var sk = 0;
var sk2 = 0;
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
var us_location="lc_001";
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
    document.getElementById("messages").innerHTML =out_msg;
    var topic=r_message.destinationName;
    // String mytopic=

    for (let i = 0; i < id_location.length; i++) {


        // if (0<=obj.hum && 0<=obj.lux && 0<=obj.temp){value_er=1;}
        if(topic=="slt_agro21/data/"+id_user+"/"+id_location[i] && IsJsonString(r_message.payloadString))

        // if(topic=="slt_agro21/data/id_0002"+id_location[i] && IsJsonString(r_message.payloadString))
        {
        const obj = JSON.parse(r_message.payloadString);

        all_values[i][0] = obj.SM;
        all_values[i][1] = obj.ST;
        all_values[i][2] = obj.H;
        all_values[i][3] = obj.T;
        all_values[i][4] = obj.SPH;
        all_values[i][5] = obj.SEC;
        all_values[i][6] = obj.R;
        all_values[i][7] = obj.SN;
        all_values[i][8] = obj.SP;
        all_values[i][9] = obj.SK;
        console.log(all_values);

        all_average[i][10] = all_average[i][10] + 1 ;
        all_average[i][0] = (( (all_average[i][0]*(all_average[i][10]-1)) +all_values[i][0])/all_average[i][10]).toFixed(1);
        all_average[i][1] = (( (all_average[i][1]*(all_average[i][10]-1)) +all_values[i][1])/all_average[i][10]).toFixed(1);
        all_average[i][2] = (( (all_average[i][2]*(all_average[i][10]-1)) +all_values[i][2])/all_average[i][10]).toFixed(1);
        all_average[i][3] = (( (all_average[i][3]*(all_average[i][10]-1)) +all_values[i][3])/all_average[i][10]).toFixed(1);
        all_average[i][4] = (( (all_average[i][4]*(all_average[i][10]-1)) +all_values[i][4])/all_average[i][10]).toFixed(1);
        all_average[i][5] = (( (all_average[i][5]*(all_average[i][10]-1)) +all_values[i][5])/all_average[i][10]).toFixed(1);
        all_average[i][6] = (( (all_average[i][6]*(all_average[i][10]-1)) +all_values[i][6])/all_average[i][10]).toFixed(1);
        all_average[i][7] = (( (all_average[i][7]*(all_average[i][10]-1)) +all_values[i][7])/all_average[i][10]).toFixed(1);
        all_average[i][8] = (( (all_average[i][8]*(all_average[i][10]-1)) +all_values[i][8])/all_average[i][10]).toFixed(1);
        all_average[i][9] = (( (all_average[i][9]*(all_average[i][10]-1)) +all_values[i][9])/all_average[i][10]).toFixed(1);

        if (us_location==id_location[i])
        { 
        // console.log("selected values");   
        mois=all_values[i][0];
        temp=all_values[i][1];
        hum=all_values[i][2];
        lux=all_values[i][3];
        ph=all_values[i][4];
        sec=all_values[i][5];
        rain=all_values[i][6]*0.2;
        sn=all_values[i][7];
        sp=all_values[i][8];
        sk=all_values[i][9];



        document.getElementById("mois").innerHTML =mois ;
        document.getElementById("temp").innerHTML =temp ;
        document.getElementById("hum").innerHTML =hum ;
        document.getElementById("lux").innerHTML =lux;
        document.getElementById("ph").innerHTML =ph;
        document.getElementById("sec").innerHTML =sec;
        // document.getElementById("rain").innerHTML =rain.toFixed(2);
        document.getElementById("sn").innerHTML =sn;
        document.getElementById("sp").innerHTML =sp;
        document.getElementById("sk").innerHTML =sk;

        document.getElementById("amois").innerHTML =all_average[i][0];
        document.getElementById("atemp").innerHTML =all_average[i][1];
        document.getElementById("ahum").innerHTML =all_average[i][2];
        document.getElementById("alux").innerHTML =all_average[i][3];
        document.getElementById("aph").innerHTML =all_average[i][4];
        document.getElementById("asec").innerHTML =all_average[i][5];
        // document.getElementById("arain").innerHTML =all_average[i][6];
        document.getElementById("asn").innerHTML =all_average[i][7];
        document.getElementById("asp").innerHTML =all_average[i][8];
        document.getElementById("ask").innerHTML =all_average[i][9];


        

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
        
        if (ph!=ph2) {
            Circles.create({
                id:           'task-ph',
                radius:       75,
                value:        ph,
                tstart:       ph2,
                maxValue:     14,
                width:        7,
                text:         function(value){return value + '';},
                colors:       ['#eee', '#6fd67a'],
                duration:     400,
                wrpClass:     'circles-wrp',
                textClass:    'circles-text',
                styleWrapper: true,
                styleText:    true
            })
            ph2=ph;
        }    
        
        if (sec!=sec2) {
            Circles.create({
                id:           'task-sec',
                radius:       75,
                value:        sec,
                tstart:       sec2,
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
            sec2=sec;
        } 
        
        // if (rain!=rain2) {
        //     Circles.create({
        //         id:           'task-rain',
        //         radius:       75,
        //         value:        rain,
        //         tstart:       rain,
        //         maxValue:     100,
        //         width:        7,
        //         text:         function(value){return value + '';},
        //         colors:       ['#eee', '#6fd67a'],
        //         duration:     400,
        //         wrpClass:     'circles-wrp',
        //         textClass:    'circles-text',
        //         styleWrapper: true,
        //         styleText:    true
        //     })
        //     rain2=rain;
        // } 

        if (sn!=sn2) {
            Circles.create({
                id:           'task-sn',
                radius:       75,
                value:        sn,
                tstart:       sn,
                maxValue:     1000,
                width:        7,
                text:         function(value){return value + '';},
                colors:       ['#eee', '#6fd67a'],
                duration:     400,
                wrpClass:     'circles-wrp',
                textClass:    'circles-text',
                styleWrapper: true,
                styleText:    true
            })
            sn2=sn;
        } 
        if (sp!=sp2) {
            Circles.create({
                id:           'task-sp',
                radius:       75,
                value:        sp,
                tstart:       sp,
                maxValue:     1000,
                width:        7,
                text:         function(value){return value + '';},
                colors:       ['#eee', '#6fd67a'],
                duration:     400,
                wrpClass:     'circles-wrp',
                textClass:    'circles-text',
                styleWrapper: true,
                styleText:    true
            })
            sp2=sp;
        } 
        if (sk!=sk2) {
            Circles.create({
                id:           'task-sk',
                radius:       75,
                value:        sk,
                tstart:       sk,
                maxValue:     1000,
                width:        7,
                text:         function(value){return value + '';},
                colors:       ['#eee', '#6fd67a'],
                duration:     400,
                wrpClass:     'circles-wrp',
                textClass:    'circles-text',
                styleWrapper: true,
                styleText:    true
            })
            sk2=sk;
        }

        if (lux!=lux2) {
            Circles.create({
                    id:           'task-t',
                    radius:       75,
                    value:        lux,
                    tstart:       lux2,
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
                lux2=lux;
                }
            }
            
        value_er=0;
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
for (let i = 0; i < id_location.length; i++) {
    mqtt.subscribe("slt_agro21/data/"+id_user+"/"+id_location[i]);
    }
mqtt.subscribe("slt_agro21/data/id_0002/lc_001");


  }

function MQTTconnect() {
    AutoRefresh();
    console.log("connecting to "+ host +" "+ port);
    var x=Math.floor(Math.random() * 10000); 
    var cname="controlform-"+x;
    mqtt = new Paho.MQTT.Client(host,port,cname);
    // document.write("connecting to "+ host);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
        userName: uname,
        password: pword
    
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

function AutoRefresh() {
    setTimeout("location.reload(true);", 60000);
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
