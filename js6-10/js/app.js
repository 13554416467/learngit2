var app = angular.module ('app',['ui.router','ngAnimate', 'ngSanitize', 'ui.bootstrap','ngFileUpload','ng.ueditor']);
app.config(function ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise('/login');
    /* 通过$stateProvider的state()函数来进行路由定义 */
    // 登录页
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'html/login.html'
    });
    // 后台页
    $stateProvider.state('start', {
        url: '/start',
        templateUrl: 'html/start.html'
    });
    // 列表页
    $stateProvider.state('start.articleList', {
        url: '/articleList/?page&size&type&status&startAt&endAt',
        templateUrl: 'html/articleList.html',
        cache:false
    });
    //新增页
    $stateProvider.state('start.new',{
        url: '/new/?id',
        templateUrl: 'html/new.html',
        cache:false
    })

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

app.filter("toMB", function () {  //自定义过滤器size单位转换
    return function (para) {
        return (para / 1048576).toFixed(2) + "Mb";
    };
});
