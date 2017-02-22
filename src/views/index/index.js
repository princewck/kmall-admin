define(['app'], function(app) {
    app.controller('indexController', [ '$scope', "$http", function($scope, $http) {
        $scope.title = "首页";
    }]);
});