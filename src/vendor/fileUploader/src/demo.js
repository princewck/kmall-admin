angular.module('app', ['plUploadModule']).controller('demoController', function($scope) {
    $scope.title = "plupload";

    $scope.fetchUrlFn = function(up, file) {
        return '上传成功！';
    }

    $scope.demo1 = {
        uprogress: 0,//可选，不展示进度条时不需要
        imgs: [],//可选，不展示图片不需要
        queue: [],//可选,不展示队列不需要
        manuallyStart: function() {
            //可以做一些操作，也可以为空，手动上传不能没有这个方法
            console.log('手动开始');
        }
    }

    $scope.demo2 = {
        uprogress: 0,
        imgs: [],
        queue: []
    } 

    $scope.demo3 = {
        uprogress: 0,
        imgs: [],
        queue: []
    } 

    $scope.demo4 = {
        uprogress: 0,
        imgs: [],
        queue: [],
        manuallyStart: function(){}
    }            

});
angular.bootstrap(document, ['app']);