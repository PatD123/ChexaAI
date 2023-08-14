int pinLED = 11;
int pinBuzzer = 10;
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

  // LED Feature
  if(arr[0] == "max")analogWrite(pinLED, (255./4. * 4.));
  else if(arr[0] == "high")analogWrite(pinLED, (255./4. * 3.));
  else if(arr[0] == "medium")analogWrite(pinLED, (255./4. * 2.));
  else if(arr[0] == "low")analogWrite(pinLED, (255./4. * 1.));
  else analogWrite(pinLED, 0);

  // Buzzer/Volume Feature
  if(arr[0] == "max")analogWrite(pinBuzzer, (255./4. * 4.));
  else if(arr[0] == "high")analogWrite(pinBuzzer, (255./4. * 3.));
  else if(arr[0] == "medium")analogWrite(pinBuzzer, (255./4. * 2.));
  else if(arr[0] == "low")analogWrite(pinBuzzer, (255./4. * 1.));
  else analogWrite(pinBuzzer, 0);
}
