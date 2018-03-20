
window.onload = function () {
    var btn = document.getElementById("versionButton");
    btn.addEventListener("click",openWindow, false);

    function openWindow() {
        // window.open("player-match.html");
        window.location.href = "player-match.html"; 
    }
    
};
