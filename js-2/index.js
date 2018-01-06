var playerNum = document.getElementById("playerNum"),
    num = document.getElementById("num"),
    adding = document.getElementById("adding"),
    less = document.getElementById("less"),
    setBtn = document.getElementById("setBtn"),
    footerBtn = document.getElementById("footerBtn");
    shop = document.getElementById("shop");
function changeColor() {
  var percentage = (playerNum.value - 4) / (18 - 4) * 100 + "%";
    num.style.backgroundImage="url(img/bm.png)";
    num.style.backgroundRepeat="no-repeat";
    num.style.backgroundSize = percentage + "100%";

}
num.oninput=function() {
    playerNum.value= num.value;
    changeColor()
};
playerNum.oninput=function() {
    num.value= playerNum.value;
    changeColor()
};
playerNum.onchange=function(){
    if (playerNum.value<4||playerNum.value>18) {
        alert("请输入正确的玩家数量（4-18）人");
        playerNum.value=4;
        num.value=playerNum.value
    }
};
adding.onclick=function () {
    playerNum.value = parseInt(playerNum.value) + 1;
    num.value =playerNum.value;
    if(playerNum.value>18){
        alert("请输入正确的玩家数量（4-18）人");
        playerNum.value=18;
        num.value=playerNum.value
    }
    changeColor()
};

less.onclick=function () {
    playerNum.value = parseInt(playerNum.value) - 1;
    num.value =playerNum.value;
    if(playerNum.value<4){
        alert("请输入正确的玩家数量（4-18）人");
        playerNum.value=4;
        num.value=playerNum.value
    }
    changeColor()
};

setBtn.onclick= function (){
    var i=0;
    var list="";
    var x=num.value;
    var arr=["平民1人","平民1人","平民1人","平民1人","平民1人","平民1人","平民1人","平民1人","平民1人","平民1人","平民1人","平民1人","平民1人"];
    var killer=["杀手1人","杀手1人","杀手1人","杀手1人","杀手1人"];
    if (x>3&&x<6){
        arr.length=x-1;
        killer.length=1;
        var add=arr.concat(killer);
        var arr2 = [];
        for (var i=x; i>0;) {
            var rnd = Math.floor(Math.random()*i);
            arr2.push(add[rnd]);
            add[rnd] = add[--i];
        }
    }

    if (x>5&&x<9){
        arr.length=x-2;
        killer.length=2;
        var add=arr.concat(killer);
        var arr2 = [];
        for (var i=x; i>0;) {
            var rnd = Math.floor(Math.random()*i);
            arr2.push(add[rnd]);
            add[rnd] = add[--i];
        }
    }
    if (x>8&&x<12){
        arr.length=x-3;
        killer.length=3;
        var add=arr.concat(killer);
        var arr2 = [];
        for (var i=x; i>0;) {
            var rnd = Math.floor(Math.random()*i);
            arr2.push(add[rnd]);
            add[rnd] = add[--i];
        }
    }
    if (x>11&&x<16){
        arr.length=x-4;
        killer.length=4;
        var add=arr.concat(killer);
        var arr2 = [];
        for (var i=x; i>0;) {
            var rnd = Math.floor(Math.random()*i);
            arr2.push(add[rnd]);
            add[rnd] = add[--i];
        }
    }
    if (x>15&&x<19){
        arr.length=x-5;
        killer.length=5;
        var add=arr.concat(killer);
        var arr2 = [];
        for (var i=x; i>0;) {
            var rnd = Math.floor(Math.random()*i);
            arr2.push(add[rnd]);
            add[rnd] = add[--i];
        }
    }

    for (m=0;m<arr2.length;m++) {
        if(arr2[m]=='杀手1人') {
            list+="<li><i></i>"+arr2[m]+"</li>";
        }else {
            list+="<li><span class='span'></span>"+arr2[m]+"</li>";
        }
    }
    // list="<ul>"+list+"</ul>";
    shop.innerHTML=list;

};

footerBtn.onclick = function() {
    li=document.getElementsByTagName('li');//记一下这个用法
    var cars = new Array(li.length);
    if (cars.length===0){
        alert("玩家还未匹配")
    }
    if (cars.length != playerNum.value&&cars.length!=0){
        alert("玩家设置未更新")
    }
    if (cars.length==playerNum.value){
            window.location.href = "js-2-3.html";
    }
};


