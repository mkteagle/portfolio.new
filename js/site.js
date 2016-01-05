window.onload = function () {
    myId = document.getElementById("menu-wrapper");
    myId.className = "top"
};
window.onrefresh= function () {
    myId = document.getElementById("menu-wrapper");
    myId.className = "show"
};
var myScrollFunc = function () {
    var y = window.scrollY;
    if (y >= 44) {
        myId.className = "show"
    } else {
        myId.className = "top"
    }
};
window.addEventListener("scroll", myScrollFunc);

