
angular.module("app").controller('login',function ($http,$scope,$state) {
    $scope.login=function(){  //按钮点击函数
        $http({  //angularJS中的$http服务
            method:'post', //转送方式
            url:'/carrots-admin-ajax/a/login',//  发送地址
            headers:{"Content-type": "application/x-www-form-urlencoded;charset=UTF-8"},
            params: {
                name: $scope.userName,
                pwd: $scope.passWord
            }

        }).then(function(rest){
            console.table(rest.data.data);
            console.log(rest.data.code);
            if (rest.data.code===0){  //这里是个判断，当输入正确的用户名和密码时，后天返回的code为0，则执行以下操作
                $state.go('start');
            }else {
                    $scope.msg =rest.data.message; //利用ng-bind将后台返回的信息显示在HTML中
            }
        })
    }
});





