#include <WiFi.h>
#include <ArduinoWebsockets.h>

#define RX 15

const char* ssid      = "wifi";
const char* password  = "password";
const char* websocket = "ipaddress";
int         port      = 1337; 

using namespace websockets;
WebsocketsClient client;

void setup() {

  Serial.begin(115200);
  delay(10);
  Serial.println("\n\n");
  
  Serial.print("Connecting to " + String(ssid));
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.print("\nConnected >> ");
  Serial.println(WiFi.localIP());

  bool connected = client.connect(websocket, port, "/");

  if(connected){ 
    
    Serial.println("Websocket Connected!"); 
    
  }else{ 
    
    Serial.println("Websocket Error!"); 
    delay(3000);
    ESP.restart();
    
  }

  pinMode(RX, INPUT);
  digitalWrite(RX, LOW);

}

void loop() {

  if(client.available()) {

    client.poll();

    if(digitalRead(RX)){

      for(int i = 0; i < 5; i++){

        client.send("update");
        delay(500);

      }

    }

  }else{

    ESP.restart();

  }
  delay(1000);

}
