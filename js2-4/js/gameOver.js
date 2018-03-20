var home = document.getElementById("home"),
    resultImg = document.getElementById("resultImg"),
    resultText = document.getElementById("resultText"),
    gameAgain = document.getElementById("gameAgain"),
    day = sessionStorage.day;

home.addEventListener("click", function () {
    window.location.href = "version-selection.html";
    sessionStorage.clear();
}, false);
gameAgain.addEventListener("click", function () {
    window.location.href = "version-selection.html";
    sessionStorage.clear();
}, false);

array = JSON.parse(sessionStorage.array);
killNum = array.filter(function (item, index, array) {
    for (var i = 0; i < array.length; i++) {
        if (item.identity == "杀手") {
            return item;
        }
    }
}).length;
civilianNum = array.filter(function (item, index, array) {
    for (var i = 0; i < array.length; i++) {
        if (item.identity == "平民") {
            return item;
        }
    }
}).length;

if (sessionStorage.gameResult == "玩家胜利") {
    resultImg.src = "images/civilianResult.png";
    resultText.textContent = "本轮游戏共抓出杀手" + killNum + "人，共经历了" + day + "个白天，在杀人游戏中击败了67%的玩家";
} else if (sessionStorage.gameResult == "杀手胜利") {
    resultImg.src = "images/killResult.png";
    resultText.textContent = "太棒了!你知道么？在杀人游戏中只有20%的杀手取得游戏最终的胜利哦";
}

document.getElementById("killNum").textContent = "杀手 " + killNum + "人";
document.getElementById("civilianNum").textContent = "平民 " + civilianNum + "人";

var gameProcess = document.getElementById("gameProcess");

// var num1, //每天被杀玩家的序号
//     num2; //每天被投死玩家的序号
// if (Boolean(sessionStorage.array)) {
//     for (var i = 0; i < JSON.parse(sessionStorage.array).length; i++) {
//         if (JSON.parse(sessionStorage.array)[i].state == "dead" && JSON.parse(sessionStorage.array)[i].how == "kill") {
//             num1 = JSON.parse(sessionStorage.array)[i].num;
//         }
//         if (JSON.parse(sessionStorage.array)[i].state == "dead" && JSON.parse(sessionStorage.array)[i].how == "vote") {
//             num2 = JSON.parse(sessionStorage.array)[i].num;
//         }
//     }
// }

for (var i = 1; i < day || i == day; i++) {
    var num__kill,
        num__vote,
        identity__kill,
        identity__vote;
    for (var j = 0; j < JSON.parse(sessionStorage.array).length; j++) {
        if (JSON.parse(sessionStorage.array)[j].date == i && JSON.parse(sessionStorage.array)[j].state == "dead" && JSON.parse(sessionStorage.array)[j].how == "kill") {
            num__kill = JSON.parse(sessionStorage.array)[j].num;
            identity__kill = JSON.parse(sessionStorage.array)[j].identity;
        }
        if (JSON.parse(sessionStorage.array)[j].date == i && JSON.parse(sessionStorage.array)[j].state == "dead" && JSON.parse(sessionStorage.array)[j].how == "vote") {
            num__vote = JSON.parse(sessionStorage.array)[j].num;
            identity__vote = JSON.parse(sessionStorage.array)[j].identity;
        }
    }
    var processList = document.createElement("ul");
    processList.classList.add("process-list");
    if (num__kill && num__vote) {
        processList.innerHTML = '<li class="time">第' + i + '天<span>0小时07分</span></li>' +
            '<li>晚上：' + num__kill + '号被杀手杀死，' + num__kill + '号是水民</li>' +
            '<li>白天：' + num__vote + '号被全民投票投死，' + num__vote + '号是' + identity__vote + '</li>';
        num__kill = NaN;
        num__vote = NaN;
    } else if (!num__kill && num__vote) {
        processList.innerHTML = '<li class="time">第' + i + '天<span>0小时07分</span></li>' +
            '<li>晚上：没有任何操作</li>' +
            '<li>白天：' + num__vote + '号被全民投票投死，' + num__vote + '号是' + identity__vote + '</li>';
        num__kill = NaN;
        num__vote = NaN;
    } else if (num__kill && !num__vote) {
        processList.innerHTML = '<li class="time">第' + i + '天<span>0小时07分</span></li>' +
            '<li>晚上：' + num__kill + '号被杀手杀死，' + num__kill + '号是水民</li>';
        num__kill = NaN;
        num__vote = NaN;
    }
    gameProcess.appendChild(processList);
}