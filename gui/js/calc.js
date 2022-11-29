function closeCalc(){

    var calc = document.getElementById("calc_wapper");
    calc.className = "calc_close";

    setTimeout(function(){ calc.style.display = "none"; }, 550);

}

function openCalc(){

    var calc = document.getElementById("calc_wapper");

    calc.style.display = "block";
    calc.className = "calc_open";

}

function calcPrice(){

    var watt = document.getElementById("calc_input_watt").value
    var time = document.getElementById("calc_input_time").value

    var price = 0.32;
    var result = Math.round((((watt * time) / 1000) * price) * 365);

    document.getElementById("calc_result_value").innerHTML = result + "€";

}