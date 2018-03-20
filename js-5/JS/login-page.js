$(document).ready(function () {

    $(".login-btn").click(function () {
        var username = $("#username").val();  //获取input框中的值
        var password = $("#password").val();  //获取input框中的值
        $.ajax({
            type: "POST",  //请求方式
            url: "/carrots-admin-ajax/a/login",  //发送请求地址
            data: {name: username, pwd: password}, //(object)向服务器发送请求时带去的数据。是key:value对形式
            dataType: "json",  //预期返回的数据类型
            complete: function (data) {
                if(data.readyState===4){
                    if (data.responseJSON.code === 0){
                        window.location.href = "http://dev.admin.carrots.ptteng.com/";
                    }else {
                        $(".msg").text(data.responseJSON.message);//将返回的值放入html中
                    }
                }
            }
        });
    });

    // $(".login-btn").click(function () {
    //     var username = $("#username").val();  //获取input框中的值
    //     var password = $("#password").val();  //获取input框中的值
    //
    //     var xhr = new XMLHttpRequest();  //创建XHR对象
    //     xhr.open('post', '/carrots-admin-ajax/a/login');  // 指定服务器网址，建立到服务器的新的请求.等待被发送
    //     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
    //     xhr.send("name=" + username + "&pwd=" + password);  //向服务器发送请求
    //
    //     xhr.onreadystatechange = function () {   // 指定通信过程中的状态改变是的回调函数
    //         //通信成功时，状态值（readyState)为4
    //         if (xhr.readyState === 4) { //确认请求已经成功
    //             if ((xhr.status >= 200 && xhr.status < 300)
    //                 || (xhr.status === 304)) {  //返回状态正常
    //                 console.log(JSON.parse(xhr.responseText).code);  //responseText服务器返回的文本
    //                 if (JSON.parse(xhr.responseText).code === 0) {
    //                     window.location.href = "http://www.baidu.com";
    //                 } else {
    //                     $(".msg").text(JSON.parse(xhr.responseText).message); //将返回的值放入html中
    //                 }
    //             } else {
    //                 console.error(xhr.statusText);  //statussText返回的状态
    //                 console.log(xhr.responseText)
    //             }
    //         }
    //     };
    // });


});





