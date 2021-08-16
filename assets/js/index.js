 var connected_flag=0    
    var mqtt;
    var reconnectTimeout = 2000;
    var host="broker.hivemq.com";
    var port=8000;

    var temp2=0;
    var mois2=0;
    var hum2=0;
    var lux2=0;
    var mois = 0;
    var temp = 0;
    var hum = 0;
    var lux = 0;
    var us_location="lc_001";
    document.mainForm.onclick = function(){
    us_location=document.mainForm.city.value;
    document.getElementById("atemp").innerHTML=us_location;
}
        


    

    
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

        if (us_location in obj)
        {
        var a = "mois=obj."+us_location+".mois";
        var b = "temp=obj."+us_location+".temp";
        var c = "hum=obj."+us_location+".hum";
        var d = "lux=obj."+us_location+".lux";
        eval(a);
        eval(b);
        eval(c);
        eval(d);
        }



        if (mois!=mois2) {
            Circles.create({
                    id:           'task-mois',
                    radius:       75,
                    value:        mois,
                    tstart:       mois2,
                    maxValue:     100,
                    width:        7,
                    text:         function(value){return value + '%';},
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
                    text:         function(value){return value + ' c';},
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
                    text:         function(value){return value + '%';},
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

        if(topic=="slt_agro21/adata/id_0001")
        {
        const obj = JSON.parse(r_message.payloadString);
        document.getElementById("amois").innerHTML =obj.amois;
        document.getElementById("atemp").innerHTML =obj.atemp;
        document.getElementById("ahum").innerHTML =obj.ahum;
        document.getElementById("alux").innerHTML =obj.alux;
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
    //document.write("connecting to "+ host);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
      
     };
    
        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
        //mqtt.onConnected = onConnected;

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