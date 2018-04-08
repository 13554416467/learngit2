app.controller('article', function ($http, $scope, $state, $stateParams,$rootScope) {
//选择框
    $rootScope.a = 1;
    $scope.arr1 = [
        {id: "", name: "全部"},
        {id: 0, name: "首页banner"},
        {id: 1, name: "找职位banner"},
        {id: 2, name: "找精英banner"},
        {id: 3, name: "行业大图"}
    ];
    $scope.arr2 = [
        {id: "", name: "全部"},
        {id: 1, name: "草稿"},
        {id: 2, name: "上线"}
    ];
    $scope.typeNum = $scope.arr1[0].id;
    $scope.stateNum = $scope.arr2[0].id;
    $scope.startDat = "";
    $scope.endDat = "";

    $http({
        method: 'get',
        url: "/carrots-admin-ajax/a/article/search",
        params: {
            size: $stateParams.size,
            page: $stateParams.page,
            type: $stateParams.type,
            status: $stateParams.status,
            startAt: $stateParams.startAt,
            endAt: $stateParams.endAt
        }
    }).then(function (res) {
        console.log(res);
        $scope.articleList = res.data.data.articleList;
        $scope.pageSize = res.data.data.size;
        $scope.currentPage = res.data.data.page;
        $scope.totalItems = res.data.data.total;
        if (typeof ($stateParams.type) != "undefined") {
            $scope.typeNum = parseInt($stateParams.type);
        }
        if (typeof ($stateParams.status) != "undefined") {
            $scope.stateNum = parseInt($stateParams.status);
        }
        if (typeof ($stateParams.startAt) != "undefined") {
            $scope.startDat = parseInt($stateParams.startAt);
        }
        if (typeof ($stateParams.endAt) != "undefined") {
            $scope.endDat = parseInt($stateParams.endAt);
        }
    });

    $scope.search = function () {
        if (typeof ($scope.endDat) == "object"){
            $scope.endDat = $scope.endDat.valueOf() + 86399999;
        }
        console.log(typeof ($scope.endDat));
        console.log($scope.endDat.valueOf());
        $state.go('start.articleList',{
            page : $scope.currentPage,
            size : $scope.pageSize,
            type : $scope.typeNum,
            status : $scope.stateNum,
            startAt : $scope.startDat.valueOf(),
            endAt : $scope.endDat.valueOf()
            },{
            reload: true
            }
        )
    };

    //清除按钮
    $scope.clear = function () {
        $scope.startDat = "";
        $scope.endDat = "";
        $scope.typeNum = "";
        $scope.stateNum = "";
        $scope.currentPage = 1;
        $scope.search();
    };

    //删除
    $scope.delete = function () {
        $scope.id = this.x.id;
        console.log($scope.id);
        bootbox.confirm({
            title: '提示',
            message: '是否确认删除',
            buttons: {
                confirm: {
                    label: '确定'
                },
                cancel: {
                    label: '取消'
                }
            },
            callback: function (result) {
                if (result) {
                    // alert('你点了确定');
                    $http({
                        method: 'delete', //转送方式
                        url: '/carrots-admin-ajax/a/u/article/' + $scope.id
                    }).then(function (res) {
                        console.log(res);
                        $state.go($state.current, {
                            page: $scope.currentPage
                        }, {
                            reload: true
                        });
                    });
                }
            }
        })
    };

    //上下线
    bootbox.setLocale("zh_CN");
    $scope.btn_onLine = (function () {   //这是一个自执行函数
        if (this.x.status === 1) {
            return "上线";
        }
        if (this.x.status === 2) {
            return "下线";
        }
    });
    //上线
    $scope.OnLine = function () {
        var id = this.x.id;
        $scope.status = this.x.status;
        console.log($scope.status);
        //上线
        if ($scope.status === 1) {
            bootbox.confirm({
                title: '操作提示',
                message: '上线后该图片将在轮播banner中展示',
                buttons: {
                    confirm: {
                        label: '确定'
                    },
                    cancel: {
                        label: '取消'
                    }
                },
                callback: function (result) {
                    if (result) {
                        // bootbox.alert({
                        //     title: "提示",
                        //     message: "上线成功"
                        // });
                        $http({
                            method: 'put', //转送方式
                            url: '/carrots-admin-ajax/a/u/article/status?id=' + id + "&status=" + 2

                        }).then(function (res) {
                            console.log(res);
                            $state.go($state.current, {}, {
                                reload: true
                            });
                            // alert("上线成功");

                        });

                    }
                }
            });
        }
        //下线
        else {
            bootbox.confirm({
                title: '操作提示',
                message: '下线后该图片将不在轮播banner中展示',
                buttons: {
                    confirm: {
                        label: '确定'
                    },
                    cancel: {
                        label: '取消'
                    }
                },
                callback: function (result) {
                    if (result) {
                        // alert('你点了确定');
                        $http({
                            method: 'put', //转送方式
                            url: '/carrots-admin-ajax/a/u/article/status?id=' + id + "&status=" + 1


                        }).then(function (res) {
                            console.log(res);
                            $state.go($state.current, {}, {
                                reload: true
                            });
                        });
                    }
                }
            })
        }

    };
    //编辑
    $scope.edit = function () {
        $state.go('start.new',{
                id : this.x.id
            },{
            reload:true
            }
        )
    };

     //跳转新增页面
    $scope.addNew = function () {
        $state.go("start.new", {
            reload: true
        });
    };

// 日历插件开始



    $scope.inlineOptions = {
        // customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };
    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    function disabled(data) {//定义周末
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === -1 || date.getDay() === 7);//用来定义那些天禁用无法选择
    }

    $scope.toggleMin = function () {//定义小于当前日期的日期
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };
    $scope.toggleMin();
    //禁用日期部分结束，以上定义无禁用

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
// 日历插件结束

});
//自定义过滤器
app.filter("status", function () {
    return function (a) {
        if (a === 1) {
            return "草稿";

        }
        if (a === 2) {
            return "上线";
        }
    }
});
app.filter("type", function () {
    return function (b) {
        if (b === 0) {
            return "首页banner"
        }
        if (b === 1) {
            return "找职位banner"
        }
        if (b === 2) {
            return "找精英banner"
        }
        if (b === 3) {
            return "行业大图"
        }
    }
});



