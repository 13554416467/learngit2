app.controller('article', function ($http, $scope, $state, $stateParams) {
    //下拉框
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
    console.log($scope.typeNum);
    console.log($stateParams.type);
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
    var b;
    console.log(typeof (b));
    // 分页搜索
    console.log($scope.typeNum);
    $scope.search = function () {

        $state.go("start.articleList", {
            size: $scope.pageSize,
            page: $scope.currentPage,
            type: $scope.typeNum,
            status: $scope.stateNum,
            startAt: $scope.startDat.valueOf(),
            endAt: $scope.endDat.valueOf()
        }, {
            reload: true
        })
    };

    //清除按钮
    $scope.clear = function () {
        $scope.startDat = "";
        $scope.endDat = "";
        $scope.typeNum = -1;
        $scope.stateNum = 0;
        $scope.currentPage = 1;
        $scope.search();
    };



    //运用自执行函数判断status
    $scope.btn_onLine = (function () {
        if (this.x.status === 1) {
            return '上线'
        } else {
            return '草稿'
        }
    });



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
//类型type
app.filter('type', function () {
    return function (a) {
        if (a === 0) {
            return '首页banner'
        }
        if (a === 1) {
            return '找职位banner'
        }
        if (a === 2) {
            return '找精英banner'
        }
        if (a === 3) {
            return '行业大图'
        }
    }
});
//状态status
app.filter('status', function () {
    return function (b) {
        if (b === 1) {
            return '草稿'
        }
        if (b === 2) {
            return '上线'
        }
    }
});


