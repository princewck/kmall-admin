define(['app'], function(app) {
    app.controller('uploadCategoryGroupController', function($scope, $http, $uibModal) {
        loadUploadCategories();
        loadCategoryGroups();

        $scope.new = function() {
            $scope.edit = {
                name: '',
                group: {id: 0},
                isNew: true
            };
            $uibModal.open({
                templateUrl: './views/product-import/upload-category-edit.html',
                scope: $scope
            });
        }

        $scope.update = function(row) {
            $scope.edit = angular.copy(row);
            $scope.edit.isNew = false;
            $uibModal.open({
                templateUrl: './views/product-import/upload-category-edit.html',
                scope: $scope
            });
        }

        $scope.save = function(scope) {
            var url = $scope.edit.isNew ? '../api/admin/uploadGroup': '../api/admin/uploadGroup/'+ $scope.edit.id;
            var params =  {name: $scope.edit.name, groupId: $scope.edit.group.id};
            $http.post(url, params).then(function(res) {
                if (res.data.code === 0) {
                    scope.$close();
                    loadUploadCategories();
                } else {
                    alert('操作失败');
                }
            });
        };

        $scope.delete = function(id) {
            var confirm = window.confirm('确定删除吗?');
            if (confirm) {
                $http.post('../api/admin/uploadGroup/'+ id +'/delete').then(function(res) {
                    if (res.data.code === 0) {
                        loadUploadCategories();
                    } else {
                        alert('操作失败');
                    }
                });                
            }
        }

        function loadUploadCategories() {
            $scope.loading = true;
            $http.get('../api/admin/uploadGroups').then(function(res) {
                if (res.data.code === 0) {
                    $scope.uploadCategories = res.data.data;
                    $scope.loading = false;
                }
                 else {
                    $scope.loading = false;
                    $scope.uploadCategories = [];  
                }
            });
        }

        function loadCategoryGroups() {
            $http.get('../api/admin/categoryGroups').then(function(res) {
                if (res.data.code === 0) {
                    $scope.categoryGroups = res.data.data;
                } else {
                    $scope.categoryGroups = [];
                    console.log(res);
                }
            });
        }
    });
});