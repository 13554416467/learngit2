var box = document.getElementsByClassName("box");//获取九宫格中的小格子DOM
console.log(box);//作用是在Chrome调试控制台console中可以看到输出内容
function change() {
    function random_color() {
        function r() {
            return Math.floor(Math.random() * 256)
        }
        return "rgb(" + r() + "," + r() + "," + r() + ")";
    }//随机的一种颜色
    var color1 = random_color();
    var color2 = random_color();
    var color3 = random_color();//设三个随机颜色

    var cars = new Array(box.length);//新建一个数组
    for (var i = 0; i < box.length; i++) {
        cars[i] = i;
    }
    function get_three_num(n) {
        var result = [];
        for (var i = 0; i < n; i++) {
            var random_num = Math.floor(Math.random() * cars.length);//从cars数组中取一个随机数
            result.push(cars[random_num]);//给result数组添加一个随机元素
            cars.splice(random_num, 1);//在x数组里删除随机选中的元素
        }
        return result;
    }//可指定元素数量的随机数组
    var b_box = get_three_num(3);// 赋值b_box一个指定数目、随机元素的数组

    var one = b_box[0];
    var two = b_box[1];
    var three =b_box[2];//给三个变量赋值随机数组中的元素

    function task() {
        box[one].style.backgroundColor = color1;
        box[two].style.backgroundColor = color2;
        box[three].style.backgroundColor = color3;//更改三个随机box的样式
    }
    return task();
}//随机选择三格变随机颜色

var time;

function start_color() {
    clearInterval(time);//执行前先清除setInterval
    time = setInterval(function () {
        for (var i = 0, max = box.length; i < max; i++) {
            box[i].style.background = "orange";
        }//每个box类变成原色
        return change();
    }, 1000);//每隔一秒显示一次
}

function stop_color() {
    clearInterval(time);//清除setInterval
    for (var i = 0, max = box.length; i < max; i++) {
        box[i].style.background = "orange";
    }//每个box类变成原色
}
