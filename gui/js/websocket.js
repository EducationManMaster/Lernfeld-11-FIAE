var server = "localhost"
var port   = "1337"

var websocket;
var sendMail = false;

var mailToggle ={

  power:{ warn:true, prob:true },
  water:{ warn:true, prob:true },
  gas:  { warn:true, prob:true }

};

function initSocket() { websocket = new WebSocket("ws://" + server + ":" + port); }
function enableEmail() { sendMail = true; }

function sendEmail(elmt, type, value) {

  var subject;
  var message;
  var send = false;

  switch (type) {

    case "warn":

      switch (elmt) {

        case "energie":
          subject = "Warnung hoher Stromverbrauch!"
          message = "Ihr aktueller Stromverbrauch liegt bei " + value + " kW/h. Bei gleichbleibendem Verbrauch werden sie ihr monatliches Budget überschreiten."
          if(mailToggle.power.warn){
            mailToggle.power.warn = false;
            send = true;
          }
        break;

        case "wasser":
          subject = "Warnung hoher Wasserverbrauch!"
          message = "Ihr aktueller Wasserverbrauch liegt bei " + value + " L. Bei gleichbleibendem Verbrauch werden sie ihr monatliches Budget überschreiten."
          if(mailToggle.water.warn){
            mailToggle.water.warn = false;
            send = true;
          }
        break;

        case "gas":
          subject = "Warnung hoher Gasverbrauch!"
          message = "Ihr aktueller Gasverbrauch liegt bei " + value + " kW/h. Bei gleichbleibendem Verbrauch werden sie ihr monatliches Budget überschreiten."
        break;
        if(mailToggle.gas.warn){
          mailToggle.gas.warn = false;
          send = true;
        }

      }

    break;

    case "prob":

      switch (elmt) {

        case "energie":
          subject = "Problem mit ihrem Stromverbrauch!"
          message = "Ihr aktueller Stromverbrauch liegt bei " + value + " kW/h. Sie haben ihr monatliches Budget überschritten und sollten den Verbrauch reduzieren."
          if(mailToggle.power.prob){
            mailToggle.power.prob = false;
            send = true;
          }
        break;

        case "wasser":
          subject = "Problem mit ihrem Wasserverbrauch!"
          message = "Ihr aktueller Wasserverbrauch liegt bei " + value + " kW/h. Sie haben ihr monatliches Budget überschritten und sollten den Verbrauch reduzieren."
          if(mailToggle.water.prob){
            mailToggle.water.prob = false;
            send = true;
          }
        break;

        case "gas":
          subject = "Problem mit ihrem Gasverbrauch!"
          message = "Ihr aktueller Gasverbrauch liegt bei " + value + " kW/h. Sie haben ihr monatliches Budget überschritten und sollten den Verbrauch reduzieren."
          if(mailToggle.gas.prob){
            mailToggle.gas.prob = false;
            send = true;
          }
        break;

      }

    break;

  }

  if(sendMail){
    if(send){
      websocket.send(subject+";"+message)
    }
  }

}
