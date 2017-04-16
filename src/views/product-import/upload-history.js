define(['app'], function(app) {
    app.controller('uploadHistoryController', ['$scope', '$http', function($scope, $http) {
        $scope.history = [];
        loadHistory();

        $scope.reload = loadHistory;
        function loadHistory() {
            $http.get('../api/admin/xls/upload/history').then(function(res) {
                if (res.data.code === 0) {
                    $scope.history = res.data.data;
                } else {
                    $scope.history = [];
                    alert('获取数据失败');
                }
            });
        }
    }]);
});