define(['app'], function(app) {
    app.controller('categoryController', ['$scope', '$http', '$timeout', '$sce', '$uibModal', '$stateParams', function($scope, $http, $timeout, $sce, $uibModal, $stateParams) {
        loadCategories();

        $scope.getStatusText = function(status) {
            if (status) return $sce.trustAsHtml('<span class="text-success">可用</span>');
            return $sce.trustAsHtml('<span class="text-danger">禁用</span>');
        }

        $scope.create = function() {
            doEdit(true);
        }

        $scope.modify = function(row) {
            doEdit(false, row);
        }

        $scope.delete = function(row) {
            if (!row.id) return alert('操作失败，未知id');
            var verify = window.confirm('确定删除吗？');
            verify && (
                $http.post('../api/admin/category/' + row.id + '/del').then(function(res) {
                    if (res.data.code === 0) {
                        loadCategories();
                    } else {
                        alert('删除失败！');
                    }
                })
            );
        }

        $scope.Enums = {
            status: [
                        {status: true, name: '可用'},
                        {status: false, name: '禁用'}
                    ]            
        };

        $scope.uploaderProgress = 0;

        $scope.submit = function(uibScope) {
            var isNew = $scope.edit.isNew;//编辑还是新建
            var postData = {
                name: $scope.edit.name,
                description: $scope.edit.description,
                sort: $scope.edit.sort,
                status: $scope.edit._status.status,
                keywords: $scope.edit.keywords,
                xpk_name: $scope.edit.xpk_name
            }
            $scope.edit.images && $scope.edit.images.length ? postData.image = $scope.edit.images[0] : '';
            if ($stateParams.groupId) {
                postData.groupId = $stateParams.groupId;
            }
            var url = isNew ? '../api/admin/category': ('../api/admin/category/' + $scope.edit.id);
            $http.post(url, postData).then(function(res) {
                if (res.data.code === 0) {
                    loadCategories();
                    uibScope.$close();
                } else {
                    window.alert('操作失败！');
                }
            });
        }

        $scope.updateXpk = function(name, cid) {
            if (!name) return alert('选品库名字不能为空');
            //根据名字更新选品库
            var url = `../api/admin/xpk/${name}/${cid}/update`;
            $http.post(url).then(function(res) {
                if (res.data.code == 0) {
                    loadCategories();
                    alert('更新成功！');
                } else {
                    console.log(res.data);
                    alert('操作失败, 详情:' + res.data.message);
                }
            });
            
        }

        $scope.editCategoruGroup = function(row) {
            $scope.row = angular.copy(row);
            $uibModal.open({
                templateUrl:'./views/categories/edit_category_group.html',
                title:'编辑上级分类',
                scope: $scope
            });            
        }

        $scope.setCategoryGroups = function(scope) {
            var params = {
                categoryGroupIds: $scope.row.categoryGroups.map(function(c) {
                    return c.id;
                })
            };
            $http.post('../api/admin/category/'+ $scope.row.id + '/categorygroups', 
                params, 
                {headers: {
                    'Content-Type': 'application/json'
                }}).then(function(res) {
                    if (res.data.code === 0) {
                        loadCategories();
                        scope.$close(null);
                    } else {
                        alert('操作失败:' + res.data.message || res.data.error.message || '');
                    }
                });            
        }

        function doEdit(isNew, obj) {
            if (isNew) {
                $scope.edit = {
                                name: '',
                                sort: 0,
                                description:'',
                                status: true,
                                xpk_name:'',
                                _status: {status: true}
                            };
            } else {
                $scope.edit = angular.copy(obj);
                $scope.edit.id = obj.id;
                $scope.edit._status = {status: obj.status};
            }
            $scope.edit.images = $scope.edit.image ? [$scope.edit.image] : [];
            $scope.edit.isNew = isNew;
            $uibModal.open({
                templateUrl:'./views/categories/edit.html',
                title:'编辑分类',
                scope: $scope
            });
        }

        $scope.default = {};
        function loadCategoryGroups() {
            $http.get('../api/admin/categoryGroups').then(function(res) {
                if (res.data.code === 0) {
                    $scope.default.categoryGroups = res.data.data;
                } else {
                    $scope.default.categoryGroups = [];
                }
            });
        }
        loadCategoryGroups();

        function loadCategories() {
            $scope.loading = true;
            $http.get('../api/admin/categories').then(function(res) {
                if (res.data.code === 0) {
                    $timeout(function() {
                        $scope.loading = false;
                        var categoires = res.data.data;
                        categoires.forEach(function(c) {
                            c.categoryGroupNames = c.categoryGroups.map(function(g) {
                                return g.name;
                            }).join(' && ');
                        });
                        $scope.categories = categoires.filter(function(category) {
                            if ($stateParams.groupId) {
                                return !!category.categoryGroups.some(function(g) {return g.id == $stateParams.groupId});
                            } else {
                                return true;
                            }
                        });                        
                    }, 0);
                } else {
                    $scope.categories = [];
                }
            });
        }

    }]);
});