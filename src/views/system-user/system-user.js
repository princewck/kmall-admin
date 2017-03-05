define(['app'], function(app) {
    app.controller('systemUserController', sysUserController);
    function sysUserController($scope, $http, $uibModal, $templateCache) {
        var vm = this;
        $scope.sysUsers = [];
        getUsers();


        function getUsers() {
            $scope.isLoading = true;
            $http.get('../api/admin/sysuser').then(function(res) {
                if (res.data.code === 0) {
                    $scope.sysUsers = res.data.data;
                    $scope.isLoading = false;
                } else {
                    $scope.isLoading = false;
                }
            }).catch(function() {
                $scope.isLoading = false;
            });
        }

        vm.edit = function(user, isAdd) {
            var url = isAdd ? '../api/admin/sysuser' : ('../api/admin/sysuser/' + user.id);
            $uibModal.open({
                template: $templateCache.get('system-user/edit.html'),
                controller: function($scope) {
                    $scope.user = angular.copy(user) || {};
                    $scope.submit = function() {
                        console.log($scope.user);
                        $http.post(url, $scope.user).then(function(res) {
                            if (res.data.code == 0) {
                                getUsers();
                                $scope.$close();
                            } else {
                                alert(res.data.message || '操作失败！');
                            }
                        });


                    }
                }
            });            
        }

        $scope.addSysUser = function() {
            vm.edit(null, true);
        }

        $scope.updateUser = function(user) {
            vm.edit(user);
        }
    }

});