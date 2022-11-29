#define INPUT 2
#define TX    9

void setup() {

  Serial.begin(115200);

  pinMode(TX, OUTPUT);
  digitalWrite(TX, LOW);

  pinMode(INPUT, INPUT);
  digitalWrite(INPUT, HIGH);

}

void loop() {

  if(digitalRead(INPUT) == 0){

    digitalWrite(TX, HIGH);

    for(int i = 0; i < 32; i++){

      digitalWrite(LED_BUILTIN, HIGH);
      delay(24);
      digitalWrite(LED_BUILTIN, LOW);
      delay(random(24, 128));

    }

    digitalWrite(TX, LOW);

  }

}
