var server    = "192.168.0.103"
var port      = "1337"
var emailport = "5678"

var websocket;

function initSocket() { 
  
  websocket = new WebSocket("ws://" + server + ":" + port); 
  websocket.onmessage = websocketData;

}

function websocketData(event){

  demo("energie", rand(10, 20));

}