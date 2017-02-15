define(['app'], function(app) {
    app.controller('indexController', [ '$scope', "$http", function($scope, $http) {
        $scope.title = "首页";
        $http.get("../api/admin/index/banners")
            .then(function(data) {
                var res = data.data.data;
                var imgStr = res.value.replace(/\\\"/g, "\"");
                $scope.images = angular.fromJson(imgStr);
            });
    }]);
});