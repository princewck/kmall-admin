define(['app'], function(app) {
    app.controller('productController', ['$scope', '$http', '$timeout', '$sce', '$uibModal', function($scope, $http, $timeout, $sce, $uibModal) {
        loadProducts();
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
                $http.post('../api/admin/product/' + row.id + '/delete').then(function(res) {
                    if (res.data.code === 0) {
                        loadProducts();
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

        $scope.submit = function(uibScope) {
            var isNew = $scope.edit.isNew;//编辑还是新建
            var postData = {
                name: $scope.edit.name,
                description: $scope.edit.description,
                sort: $scope.edit.sort,
                status: $scope.edit._status.status,
                image: $scope.edit._images ? angular.toJson($scope.edit._images) : '[]'
            }
            var url = isNew ? '../api/admin/product': ('../api/admin/product/' + $scope.edit.id);
            $http.post(url, postData).then(function(res) {
                if (res.data.code === 0) {
                    loadProducts();
                    uibScope.$close();
                } else {
                    window.alert('操作失败！');
                }
            });
        }

        $scope.uploaderProgress = 0;

        function doEdit(isNew, obj) {
            if (isNew) {
                $scope.edit = {
                                name: '',
                                sort: 0,
                                description:'',
                                status: true,
                                _status: {status: true}
                            };
            } else {
                $scope.edit = angular.copy(obj);
                $scope.edit.id = obj.id;
                $scope.edit._status = {status: obj.status};
            }
            $scope.edit.isNew = isNew;
            $uibModal.open({
                templateUrl:'./views/products/edit.html',
                title:'编辑分类',
                scope: $scope
            });
        }

        function loadBrands() {
            var brands = [{id: 0, name: '未指定'}];
            $http.get('../api/admin/brands').success(function(res) {
                if (res.code === 0) {
                    brands = res.data;
                    Array.prototype.push.apply(brands, res.data);                    
                }
                $scope.brands = brands;
            });
        }

        function loadCategories() {
            var categories = [{id: 0, name: '未指定'}];
            $http.get('../api/admin/categories').success(function(res) {
                if (res.code === 0) {
                    categories = res.data;
                    Array.prototype.push.apply(categories, res.data);                    
                }
                $scope.categories = categories;
            });
        }        

        function loadProducts() {
            $scope.loading = true;
            $http.get('../api/admin/products').then(function(res) {
                if (res.data.code === 0) {
                    $timeout(function() {
                        $scope.loading = false;
                        var products = res.data.data;
                        products.forEach(function(b) {
                            try {
                                b._images = angular.fromJson(b.image) || [];
                            } catch(e) {
                                console.warn(e);
                                b._images = [];
                            }
                        });
                        $scope.products = products;
                    }, 0);
                } else {
                    $scope.products = [];
                }
            });
        }

    }]);
});