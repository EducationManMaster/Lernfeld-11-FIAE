window.addEventListener("keydown", function(event){

    switch(event.keyCode) {

        case 13: tryLogin();

    }

});

function tryLogin(){

    var username = document.getElementById("login_username");
    var password = document.getElementById("login_password");

    var usernameVAL = username.value.toLocaleLowerCase();

    if(usernameVAL == "jan" || usernameVAL == "felix" || usernameVAL == "marlon" || usernameVAL == "maxi"){

        var login_screen = document.getElementById("login");
        login_screen.className = "login_hide";
        setTimeout(function(){ login_screen.style.display = "none"; }, 550);

    }else{

        document.getElementById("login_title").innerHTML = "Bitte erneut versuchen.";

    }

    username.value = "";
    password.value = "";

}