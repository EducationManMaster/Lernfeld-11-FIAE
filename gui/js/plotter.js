function plotEverything() {

  plotDaily("power");
  plotMonthly("power");

  plotDaily("water");
  plotMonthly("water");

  plotDaily("gas");
  plotMonthly("gas");

}



// ---------------------------------------------------------------------------
// Plotte die Tagesübersicht

function plotDaily(type) {

  var canvas;
  var data;
  var color;
  var unit;

  switch (type) {

    case "power":
      canvas = "canvas_day_power";
      data   = user_data.power;
      color  = "#AED581";
      unit   = " kW/h"
    break;

    case "water":
      canvas = "canvas_day_water";
      data   = user_data.water;
      color  = "#64B5F6";
      unit   = " L"
    break;

    case "gas":
      canvas = "canvas_day_gas";
      data   = user_data.gas;
      color  = "#90A4AE";
      unit   = " kW/h"
    break;

  }

  var c = document.getElementById(canvas);

  c.width  = c.offsetWidth*2
  c.height = c.offsetHeight*2

  var ctx = c.getContext("2d");

  for (var i = 1; i < 4; i++) {

    var y = Math.round((c.height / 4) * i)

    ctx.beginPath();
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 15]);
    ctx.moveTo(0, y);
    ctx.lineTo(c.width, y);
    ctx.stroke();

  }

  var l = (data.length - 7);
  if(l < 0){ l = 0; }

  var max = 0;
  for (var i = l; i < data.length; i++) { if(data[i] > max){ max = data[i]; }}


  var x  = 0;
  var mx = 0;
  var w = Math.round(c.width / 7);

  for (var i = l; i < data.length; i++) {

    var h = Math.round(((c.height * 0.8) / max) * data[i]);

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(w*x, c.height-h, w, h);
    ctx.fill();


    if(data[i] == max){ mx = x; }

    x++;

    ctx.beginPath();
    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText(8-x, ((w*x)-(w/2))-5, c.height-10);

  }

  ctx.beginPath();
  ctx.font = "30px Arial";
  ctx.fillStyle = color;
  ctx.fillText(max + unit, (w*mx)+13, 40);

}



// ---------------------------------------------------------------------------
// Plotte die Monatsübersicht

function plotMonthly(type) {

  var canvas;
  var warn;
  var prob;
  var data;
  var unit;
  var color;

  switch (type) {

    case "power":
      canvas = "canvas_month_power";
      warn   = user_values.power.warn;
      prob   = user_values.power.prob;
      data   = user_data.power;
      unit   = " kW/h"
      color  = "#AED581"
    break;

    case "water":
      canvas = "canvas_month_water";
      warn   = user_values.water.warn;
      prob   = user_values.water.prob;
      data   = user_data.water;
      unit   = " L"
      color  = "#64B5F6"
    break;

    case "gas":
      canvas = "canvas_month_gas";
      warn   = user_values.gas.warn;
      prob   = user_values.gas.prob;
      data   = user_data.gas;
      unit   = " kW/h"
      color  = "#90A4AE"
    break;

  }

  var c = document.getElementById(canvas);
  c.width  = c.offsetWidth*2;
  c.height = c.offsetHeight*2;

  var ctx = c.getContext("2d");

  for (var i = 1; i < 4; i++) {

    var y = Math.round((c.height / 4) * i)

    ctx.beginPath();
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 15]);
    ctx.moveTo(0, y);
    ctx.lineTo(c.width, y);
    ctx.stroke();

  }

  var w = (c.width  * 0.75) / data.length;
  var h = (c.height * 0.75) / 100;

  var x = 0;
  var y = 0;
  var dx = 0;
  var dy = c.height;

  var sum   = 0;
  var total = 0;

  for (var i = 0; i < data.length; i++) { total += data[i]; }
  if(total < prob){ total = prob; }

  for (var i = 0; i < data.length; i++) {

    sum += data[i];

    x = (w * i);
    y = (c.height - (h * ((100 / total) * sum)));

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.setLineDash([0,0]);
    ctx.moveTo(dx, dy);
    ctx.lineTo(x, y);
    ctx.stroke();

    dx = x;
    dy = y;

  }

  y = (c.height - (h * ((100 / total) * prob)));
  ctx.beginPath();
  ctx.strokeStyle = "#F44336";
  ctx.lineWidth = 4;
  ctx.setLineDash([0, 0]);
  ctx.moveTo(dx-75, y);
  ctx.lineTo(x+75, y);
  ctx.stroke();

  y = (c.height - (h * ((100 / total) * warn)));
  ctx.beginPath();
  ctx.strokeStyle = "#FBC02D";
  ctx.lineWidth = 4;
  ctx.setLineDash([0, 0]);
  ctx.moveTo(dx-75, y);
  ctx.lineTo(x+75, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(dx, dy, 10, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.font = "30px Arial";
  ctx.fillStyle = color;
  ctx.fillText((sum + unit), dx, dy+50);

}
