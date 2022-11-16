function rand(min, max) { return Math.floor(Math.random() * (max - min + 1) ) + min; }

function randomizePlot(monthly) {

  monthly = monthly * 0.4;

  var daily = monthly / 31;
  var diff  = daily * 0.1;
  var boost = daily * 1.5;

  var min = daily - diff;
  var max = daily + diff;

  var plot = [];

  for (var i = 0; i < 31; i++) {

    var value = rand(min, max);
    if(rand(0,100) <= 15){ value += boost; }

    plot.push(Math.round(value));

  }

  return plot;

}

function randomizeAll() {

  user_data.power = randomizePlot(user_values.power.avg);
  user_data.water = randomizePlot(user_values.water.avg);
  user_data.gas = randomizePlot(user_values.gas.avg);
  user_data.carbon = randomizePlot(user_values.carbon.avg);

}
