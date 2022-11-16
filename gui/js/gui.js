// ---------------------------------------------------------------------------
// Alles auf die richtige Größe Skalieren

function resizeGUI() {

  var tile = document.getElementsByClassName("tile");
  var body = document.getElementById("main_wrapper");

  for (var i = 0; i < tile.length; i++) {
    if(tile[i].className.includes("tile_small")){
      tile[i].style.height = tile[i].offsetWidth + "px";
    }else{
      tile[i].style.height = ((tile[i].offsetWidth / 2) - 12) + "px";
    }
  }

}

// ---------------------------------------------------------------------------
// Alles auf die richtige Größe Skalieren

function toggleDarkMode() {

  var style = document.getElementById("stylesheet");
  var button = document.getElementById("header_darkmode_button");
  var dark = button.getAttribute("darkmode");

  if(dark == "true"){

    style.href = "style.css";
    button.setAttribute("darkmode", "false")

  }else{

    style.href = "dark.css";
    button.setAttribute("darkmode", "true")

  }

}

// ---------------------------------------------------------------------------
// Funktion zum setzen der Infotafel

function setInfo(state) {

  var color = document.getElementById("header");
  var icon  = document.getElementById("header_info_icon");
  var info  = document.getElementById("header_info_status");
  var text  = document.getElementById("header_info_text");

  switch (state) {

    case "g":

      color.className = "header_good";
      icon.className  = "header_info_icon_good";
      info.innerHTML  = "Ausgezeichnet";
      text.innerHTML  = "Alle Werte sind im grünen Bereich.";

    break;

    case "w":

      color.className = "header_warn";
      icon.className  = "header_info_icon_warn";
      info.innerHTML  = "Warnung";
      text.innerHTML  = "Bei gleichbleibendem Verbrauch werden die Nutzungswerte überschritten.";

    break;

    case "b":

      color.className = "header_bad";
      icon.className  = "header_info_icon_bad";
      info.innerHTML  = "Problem erkannt";
      text.innerHTML  = "Nutzungswerte wurden für diesen Monat überschritten.";

    break;

  }

}



// ---------------------------------------------------------------------------
// Füllt die Übersicht

function fillAll() {

  fillInfo("energie", user_data.power, user_values.power);
  fillInfo("wasser", user_data.water, user_values.water);
  fillInfo("gas", user_data.gas, user_values.gas);
  fillInfo("co2", user_data.carbon, user_values.carbon);

}

function fillInfo(elmt, plot, limits) {

  var info = document.getElementById(elmt);

  var value = info.getElementsByClassName("tile_value")[0];
  var state = info.getElementsByClassName("tile_footer")[0];

  var total = 0;
  for (var i = 0; i < plot.length; i++) { total += plot[i]; }

  value.innerHTML = total;

  if(total >= limits.warn){
    state.className = "tile_footer tile_footer_warn";
    setInfo("w");
    sendEmail(elmt, "warn", total);
  }

  if(total >= limits.prob){
    state.className = "tile_footer tile_footer_bad";
    setInfo("b");
    sendEmail(elmt, "prob", total);
  }

}


// ---------------------------------------------------------------------------
// Öffnen der Einstellungen

function settingsON() {

  var settings = document.getElementById("settings_wrapper");
  var blocker  = document.getElementById("settings_blocker");
  var menu     = document.getElementById("settings");

  settings.style.display = "inline-block";
  blocker.className = "setting_in";
  menu.className = "menu_in";


}

function settingsOFF() {

  var settings = document.getElementById("settings_wrapper");
  var blocker  = document.getElementById("settings_blocker");
  var menu     = document.getElementById("settings");

  blocker.className = "setting_out";
  menu.className = "menu_out";

  setTimeout(function(){ settings.style.display = "none"; }, 310);

}



// ---------------------------------------------------------------------------
// Ändern der Personen im Haushalt (Slider)

function changePeople() {

  var slider = document.getElementById("people_slider");
  var value = document.getElementById("people_value");

  user_settings.people = slider.value
  value.innerHTML = user_settings.people;
  changeAllWarnings();

}

function submitPeople() {

  var slider = document.getElementById("people_slider");

}



// ---------------------------------------------------------------------------
// Ändern der Checkbox

function selectBox(elmt) {
  elmt.getElementsByTagName("input")[0].click();
}



// ---------------------------------------------------------------------------
// Berechnet und ändert Warnung & Problem

function changeAllWarnings() {

  user_values.calc();

  changeWarnings("settings_value_power", user_values.power);
  changeWarnings("settings_value_water", user_values.water);
  changeWarnings("settings_value_gas",   user_values.gas  );

  fillAll();
  plotEverything();

}

function changeWarnings(elmt, value) {

  var setting = document.getElementById(elmt);
  var warnDOM = setting.getElementsByClassName("settings_value_value")[0];
  var probDOM = setting.getElementsByClassName("settings_value_value")[1];

  warnDOM.innerHTML = value.warn;
  probDOM.innerHTML = value.prob;

}
