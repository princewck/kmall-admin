define(['angular'], function(angular) {
    return angular.module('kApp', ['ngRequire','ngCookies','ui.router', 'ui.bootstrap', 'smart-table'])
        .run(['$rootScope', '$http', function($rootScope, $http) {
            $rootScope.$on('$stateChangeSuccess', function() {
                $rootScope.loginUser = localStorage.getItem('login_user') ? angular.fromJson(localStorage.getItem('login_user')) : {};
                $rootScope.logout = function() {
                    $http.post('../api/admin/logout').then(function(res) {
                        if (res.data.code === 0) {
                            window.location.href = '/login.html';
                        } else {
                            alert('操作失败');
                        }
                    }).catch(function() {
                        alert('操作失败！');
                    });
                }
            });
        }]);
});