var backBtn = document.getElementById("backBtn"),
    closeBtn = document.getElementById("closeBtn"),
    container = document.getElementById("container"),
    submit = document.getElementById("submit");


//给玩家设置生死状态
var player = sessionStorage.getItem("player").split(",");
var playerState = {};
for (var i = 0; i < player.length; i++) {
    playerState[i] = {
        identity: player[i],
        num: i + 1,
        state: "live",
        date: sessionStorage.day,
        how: ""
    };
}

//给页面添加内容和样式
function killContent() {
    document.getElementById("title").textContent = "杀手杀人";
    document.getElementById("titleText").textContent = "杀手请睁眼，杀手请选择要杀的对象";
    document.getElementById("titleTips").textContent = "点击下方玩家头像，对被杀的玩家进行标记";
}

function voteContent() {
    document.getElementById("title").textContent = "投票";
    document.getElementById("titleText").textContent = "发言讨论，大家请投票";
    document.getElementById("titleTips").textContent = "点击得票数最多的人的头像";
}

container.innerHTML = sessionStorage.getItem("container");

if (sessionStorage.getItem("page") == "kill") {
    killContent();
} else {
    voteContent();
}

//给死亡玩家设置样式
if (sessionStorage.playerState) {
    var playerState = JSON.parse(sessionStorage.getItem("playerState"));
    for (var i = 0; i < container.getElementsByClassName("wrap").length; i++) {
        if (playerState[i].state == "dead") {
            container.getElementsByClassName("wrap")[i].className = "wrap wrap-unClickable";
        }
    }
}


//给头部按钮添加点击事件
closeBtn.addEventListener("click", function () {
    if (confirm("结束本轮游戏吗？")) {
        window.location.href = "version-selection.html";
        sessionStorage.clear();
    }
}, false);

//建立玩家必杀点击效果
var num,
    identity;
container.addEventListener("click", function (e) {
    console.log(e.currentTarget);
    var a = e.currentTarget.getElementsByClassName("wrap");
    console.log(a);

    for (var i = 0; i < a.length; i++) {
        a[i].classList.remove("wrap-knife");
    }
    if (e.target && e.target.parentNode.nodeName.toLowerCase() == "div" && !e.target.parentNode.classList.contains("wrap-unClickable")) {
        e.target.parentNode.classList.add("wrap-knife");
        num = parseInt(e.target.parentNode.lastElementChild.textContent) ;
        console.log(num);
        identity = e.target.parentNode.firstElementChild.textContent;
        console.log(identity);
    }
});


submit.addEventListener("click", function () {
    var killResult = "";
    var killNum = 0,
        civilianNum = 0,
        array = [],
        gameResult = "";
    if (sessionStorage.getItem("page") == "kill") {

        if (identity === "杀手") {
            alert("自己人，别动手");
        } else {
            if (num) {
                playerState[num - 1].state = "dead";
                playerState[num - 1].how = sessionStorage.getItem("page");
                playerState[num - 1].date = sessionStorage.getItem("day");
                killResult = num + "号被杀手杀死，真实身份是" + playerState[num - 1].identity;
                for (var n = 0; n < container.getElementsByClassName("wrap").length; n++) {
                    array[n] = playerState[n];
                }
                killNum = array.filter(function (item, index, array) {
                    for (var i = 0; i < array.length; i++) {
                        if (item.state == "live" && item.identity == "杀手") {
                            return item;
                        }
                    }
                });
                civilianNum = array.filter(function (item, index, array) {
                    for (var i = 0; i < array.length; i++) {
                        if (item.state == "live" && item.identity == "平民") {
                            return item;
                        }
                    }
                });

                if (killNum.length === 0) {
                    gameResult = "平民胜利";
                    window.location.href = "gameover.html";
                    sessionStorage.setItem("gameResult", gameResult);
                } else if (killNum.length == civilianNum.length) {
                    gameResult = "杀手胜利";
                    window.location.href = "gameover.html";
                    sessionStorage.setItem("gameResult", gameResult);
                } else {
                    window.location.href = "judge-script.html";
                }

                sessionStorage.setItem("array", JSON.stringify(array));
            } else {
                killResult = "杀手没有杀人";
                window.location.href = "judge-script.html";
            }
            sessionStorage.setItem("playerState", JSON.stringify(playerState));
            var killState = "unClickable";
            sessionStorage.setItem("killState", killState);
            sessionStorage.setItem("killResult", JSON.stringify(killResult));
        }
    } else {
        var voteResult = "";
        if (!num) {
            alert("请投票");
        } else {
            playerState[num - 1].state = "dead";
            playerState[num - 1].how = sessionStorage.getItem("page");
            playerState[num - 1].date = sessionStorage.getItem("day");
            for (var m = 0; m < container.getElementsByClassName("wrap").length; m++) {
                array[m] = playerState[m];
            }
            killNum = array.filter(function (item, index, array) {
                for (var i = 0; i < array.length; i++) {
                    if (item.state == "live" && item.identity == "杀手") {
                        return item;
                    }
                }
            });
            civilianNum = array.filter(function (item, index, array) {
                for (var i = 0; i < array.length; i++) {
                    if (item.state == "live" && item.identity == "平民") {
                        return item;
                    }
                }
            });

            if (killNum.length === 0) {
                gameResult = "玩家胜利";
                window.location.href = "gameover.html";
                sessionStorage.setItem("gameResult", gameResult);
            } else if (killNum.length == civilianNum.length) {
                gameResult = "杀手胜利";
                window.location.href = "gameover.html";
                sessionStorage.setItem("gameResult", gameResult);
            } else {
                sessionStorage.setItem("day", parseInt(sessionStorage.day) + 1);



                window.location.href = "judge-script.html";
            }
            voteResult = num + "号被投票投死，真实身份是" + playerState[num - 1].identity;
            sessionStorage.setItem("playerState", JSON.stringify(playerState));
            sessionStorage.setItem("voteResult", JSON.stringify(voteResult));
            sessionStorage.setItem("killState", "clickable");
            sessionStorage.setItem("array", JSON.stringify(array));
            sessionStorage.removeItem("killResult");
        }
    }

}, false);
