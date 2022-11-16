var user_settings = {

  people:1,
  warnings:true,
  problems:true

};

var user_values = {

  power :{ og:110,  avg:null, warn:null, prob:null },
  water :{ og:4000, avg:null, warn:null, prob:null },
  gas   :{ og:500,  avg:null, warn:null, prob:null },
  carbon:{ og:100,  avg:null, warn:null, prob:null },

  warn:0.75,
  prob:1.10,

  calc:function() {

    user_values.power.avg   = user_values.power.og * user_settings.people;
    user_values.power.warn  = Math.round((user_values.power.avg * user_settings.people) * user_values.warn);
    user_values.power.prob  = Math.round((user_values.power.avg * user_settings.people) * user_values.prob);

    user_values.water.avg   = user_values.water.og * user_settings.people;
    user_values.water.warn  = Math.round((user_values.water.avg * user_settings.people) * user_values.warn);
    user_values.water.prob  = Math.round((user_values.water.avg * user_settings.people) * user_values.prob);

    user_values.gas.avg   = user_values.gas.og * user_settings.people;
    user_values.gas.warn    = Math.round((user_values.gas.avg * user_settings.people) * user_values.warn);
    user_values.gas.prob    = Math.round((user_values.gas.avg * user_settings.people) * user_values.prob);

    user_values.carbon.avg   = user_values.carbon.og * user_settings.people;
    user_values.carbon.warn = Math.round((user_values.carbon.avg * user_settings.people) * user_values.warn);
    user_values.carbon.prob = Math.round((user_values.carbon.avg * user_settings.people) * user_values.prob);

  }

};

var user_data = {

  power: [],
  water: [],
  gas:   [],
  carbon:[]

};
