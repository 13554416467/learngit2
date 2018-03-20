app.controller('newCtrl', function ($scope,$http, Upload, $timeout,$state,$stateParams) {
    if ($stateParams.id){
        $scope.pageTitle = '编辑Article';
        $http({
            method: 'get',
            url:'/carrots-admin-ajax/a/article/' + $stateParams.id
        }).then(function (res) {
            console.log(res.data);
            $scope.paramsTitle = res.data.data.article.title;
            $scope.typeNum = res.data.data.article.type;
            $scope.industry = res.data.data.article.industry;
            $scope.content = res.data.data.article.content;
            $scope.paramsUrl = res.data.data.article.url;
            $scope.imgView = res.data.data.article.img;
            $scope.status = res.data.data.article.status;
            $scope.createAt = res.data.data.article.createAt;
        })
    }else {
        $scope.pageTitle = '新增Article';
    }

//页面主体
    $scope.typeA = [
        {id: "", name: "请选择"},
        {id: 0, name: "首页banner"},
        {id: 1, name: "找职位banner"},
        {id: 2, name: "找精英banner"},
        {id: 3, name: "行业大图"}
    ];
    $scope.typeNum = "";
    $scope.industry  = "";
    $scope.typeC = [
        {id: "", name: "请选择"},
        {id: 0, name: "移动互联网"},
        {id: 1, name: "电子商务"},
        {id: 2, name: "企业服务"},
        {id: 3, name: "O2O"},
        {id: 4, name: "教育"},
        {id: 5, name: "金融"},
        {id: 6, name: "游戏"}
    ];
    //开始操作
    // 上传图片
    $scope.uploadFiles = function (file) {
        $scope.f = file;
        $scope.upSent = function () {
            file.upload = Upload.upload({
                url: '/carrots-admin-ajax/a/u/img/task',
                data: {file: file}
            });
            file.upload.then(function (response) {
                console.log(response);
                console.log(response.data.data.url);
                $scope.imgView = response.data.data.url;
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    };
    //删除
    $scope.imgDelete = function () {
        $scope.f = '';
        $scope.imgView = ''
    };

    //新增上线




    $scope.pubArticle = function () {
        if ($stateParams.id){
            $http({
                method:"put",
                url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                data: {
                    title: $scope.paramsTitle,
                    status: 2,
                    img: $scope.imgView,
                    content: $scope.content,
                    url: $scope.paramsUrl,
                    industry: $scope.industry,
                    createAt: $scope.createAt,
                    type: $scope.typeNum
                },
                transformRequest:function(data) {
                    return $.param(data);   //序列化
                },
                headers:{'content-type': 'application/x-www-form-urlencoded'}
            }).then(function (res) {
                console.log(res);
                $state.go("start.articleList", {
                    reload: true
                });
            })
        }else {
            $http({
                method:'POST',
                url:'/carrots-admin-ajax/a/u/article',
                data:{
                    title: $scope.paramsTitle,
                    // createAt:$scope.createAt,
                    type: $scope.typeNum,
                    status: 2,
                    img : $scope.imgView,
                    content: $scope.content,
                    url: $scope.paramsUrl,
                    industry: $scope.industry
                },
                transformRequest:function(data) {
                    return $.param(data);   //序列化
                },
                headers:{'content-type': 'application/x-www-form-urlencoded'}   //设定请求头
            }).then(function (res) {
                console.log(res);
                // bootbox.alert({
                //     title: "提示",
                //     message: "新增上线成功"
                // });
                // $state.go("start.articleList", {
                //     reload: true
                // });
            })
        }

    };
    
    //新增草稿

    $scope.saveArticle = function () {
        if ($stateParams.id){

            $http({
                method:"put",
                url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                data: {
                    title: $scope.paramsTitle,
                    status: 1,
                    img: $scope.imgView,
                    content: $scope.content,
                    url: $scope.paramsUrl,
                    industry: $scope.industry,
                    createAt: $scope.createAt,
                    type: $scope.typeNum
                },
                transformRequest:function(data) {
                    return $.param(data);   //序列化
                },
                headers:{'content-type': 'application/x-www-form-urlencoded'}
            }).then(function (res) {
                console.log(res);
                $state.go("start.articleList", {
                    reload: true
                },function () {

                });
            })
        }else {
            $http({
                method:'POST',
                url:'/carrots-admin-ajax/a/u/article',
                data:{
                    title: $scope.paramsTitle,
                    // createAt:$scope.createAt,
                    type: $scope.typeNum,
                    status: 1,
                    img : $scope.imgView,
                    content: $scope.content,
                    url: $scope.paramsUrl,
                    industry: $scope.industry
                },
                transformRequest:function(data) {  //序列化
                    return $.param(data);
                },
                headers:{'content-type': 'application/x-www-form-urlencoded'}
            }).then(function (res) {
                console.log(res);
                bootbox.alert({
                    title: "提示",
                    message: "新增草稿成功"
                });
                $state.go("start.articleList", {
                    reload: true
                },function(){});
            })
        }

    };

});
