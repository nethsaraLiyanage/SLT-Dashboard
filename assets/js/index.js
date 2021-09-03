 var connected_flag=0    
    var mqtt;
    var reconnectTimeout = 2000;
    var host="broker.hivemq.com";
    // var host="124.43.130.94";
    var port=8000;
    // var port=1883;

    var uname    = "inoc";
    var pword    = "noc_123";

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
    var us_location=[80.41251167765263, 6.989156875109475];
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
        out_msg="Message received "+r_message.payloadString+"<br>";
        out_msg=out_msg+"Message received Topic "+r_message.destinationName;
        //console.log("Message received ",r_message.payloadString);
        console.log(out_msg);
        document.getElementById("messages").innerHTML =out_msg;
        var topic=r_message.destinationName;
        if(topic=="slt_agro21/data/id_0001")
        {
        const obj = JSON.parse(r_message.payloadString);
        console.log(obj.location);
        console.log(us_location);

        if (0.001>Math.abs((us_location[0]-obj.location[0])) && 0.001>Math.abs((us_location[1]-obj.location[1])))
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
        }}

        if(topic=="slt_agro21/adata/id_0001")
        {
        const obj = JSON.parse(r_message.payloadString);
        if (0.001>Math.abs((us_location[0]-obj.location[0])) && 0.001>Math.abs((us_location[1]-obj.location[1])))
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

        }

        if(topic=="slt_agro21/ntime/id_0001")
        {
        const obj = JSON.parse(r_message.payloadString);
        document.getElementById("ntime").innerHTML =obj.ntime;
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
    mqtt.subscribe("slt_agro21/ntime/id_0001");
    
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
        onFailure: onFailure
        // useSSL: true,
        // userName: uname,
        // password: pword
      
     };
    
        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
        // mqtt.onConnected = onConnected;

    mqtt.connect(options);
    return false;
    }

    function send_message(msg,topic){
        if (connected_flag==0){
        out_msg="<b>Not Connected so can't send</b>"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
        }
        var value=msg.value;
        console.log("value= "+value);
        console.log("topic= "+topic);
        message = new Paho.MQTT.Message(value);
        message.destinationName = topic;

        mqtt.send(message);
        return false;
    }

