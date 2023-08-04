int pinLED = 13;
String arr[3] = {"", "", ""};
int arrSize = 3;

void setup() {
  Serial.begin(115200);
  pinMode(pinLED, OUTPUT);
}

void loop() {
  while(!Serial.available()){}

  for(int i = 0; i<arrSize; i++){
    arr[i] = Serial.readStringUntil(':');
    Serial.println(arr[i]);
  }
  if(arr[0] == "max")digitalWrite(pinLED, HIGH);
  else digitalWrite(pinLED, LOW);
}
