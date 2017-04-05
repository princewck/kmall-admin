define([
    'app',
], function(app) {
    app.controller('navbarController', ['$scope', '$http', function($scope, $http) {
        $scope.statusList = [
            {status: true, text: '是'},
            {status: false, text: '否'},
        ];

        $scope.navbars = [];
        loadNavs();

        $scope.create = function() {
            $scope.navbars.push(new Navbar());
        }

        $scope.delete = function(index) {
            $scope.navbars.splice(index, 1);
        }

        $scope.save = function() {
            var postData = toPostData($scope.navbars);
            $http.post('../api/admin/navbars', {navbars: angular.toJson(postData)}).then(function(res) {
                if (res.data.code === 0) {
                    alert('保存成功!');
                    loadNavs();
                } else {
                    alert('保存失败！');
                }
            });
        }

        function loadNavs() {
            $http.get('../api/admin/navbars').then(function(res) {
                if (res.data.code === 0) {
                    return $scope.navbars = res.data.data.map(function(nav) {
                        nav.newTab = {status: nav.newTab};
                        return new Navbar(nav);
                    });
                } else {
                    return console.log('获取失败'), [];
                }
            });            
        }

        function Navbar(bar) {
            bar = bar || {};
            this.sort = bar.sort || 0;
            this.text = bar.text || 'nav text';
            this.url = bar.url || 'http://';
            this.newTab = bar.newTab || $scope.statusList[0];
        }
        Navbar.prototype.prepared = function() {
            var data = angular.copy(this);
            data.newTab = this.newTab.status;
            return data;
        }

        function toNavbars(bars) {
            return bars.map(function(bar) {
                return new Navbar(bar);
            });
        }

        function toPostData(bars) {
            return bars.map(function(bar) {
                return new Navbar(bar).prepared();
            });            
        }

    }]);
});