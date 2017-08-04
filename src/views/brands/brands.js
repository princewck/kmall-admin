define(['app'], function(app) {
    app.controller('brandController', ['$scope', '$http', '$timeout', '$sce', '$uibModal', function($scope, $http, $timeout, $sce, $uibModal) {
        
        loadBrands();
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
                $http.post('../api/admin/brand/' + row.id + '/delete').then(function(res) {
                    if (res.data.code === 0) {
                        loadBrands();
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

        $scope.editCategories = function(row) {
            $scope.row = angular.copy(row);
            $uibModal.open({
                templateUrl:'./views/brands/edit_categories.html',
                title:'编辑分类',
                scope: $scope                
            });
        }

        $scope.setCategories = function(scope) {
            var params = {
                categories: $scope.row.categories.map(function(c) {
                    return c.id;
                })
            };
            $http.post('../api/admin/brand/'+ $scope.row.id + '/categories', 
                params, 
                {headers: {
                    'Content-Type': 'application/json'
                }}).then(function(res) {
                    if (res.data.code === 0) {
                        loadBrands();
                        scope.$close(null);
                    } else {
                        alert('操作失败:' + res.data.message || res.data.error.message || '');
                    }
                });
        }

        $scope.submit = function(uibScope) {
            var isNew = $scope.edit.isNew;//编辑还是新建
            var images = {};
            if ($scope.edit.banners) images.banners = $scope.edit.banners;
            if ($scope.edit.logos)  images.logos = $scope.edit.logos;
            if ($scope.edit.smallBanners) images.smallBanners = $scope.edit.smallBanners;
            var postData = {
                name: $scope.edit.name,
                description: $scope.edit.description,
                sort: $scope.edit.sort,
                status: $scope.edit._status.status,
                image: angular.toJson(images)
            }
            var url = isNew ? '../api/admin/brand': ('../api/admin/brand/' + $scope.edit.id);
            $http.post(url, postData).then(function(res) {
                if (res.data.code === 0) {
                    loadBrands();
                    uibScope.$close();
                } else {
                    window.alert('操作失败！');
                }
            });
        }

        $scope.uploaderProgress1 = 0;
        $scope.uploaderProgress2 = 0;
        $scope.uploaderProgress3 = 0;

        function doEdit(isNew, obj) {
            if (isNew) {
                $scope.edit = {
                                name: '',
                                sort: 0,
                                description:'',
                                status: true,
                                _status: {status: true},
                                logos:[],
                                banners: [],
                                smallBanners: []
                            };
            } else {
                $scope.edit = angular.copy(obj);
                $scope.edit.id = obj.id;
                $scope.edit._status = {status: obj.status};
            }
            $scope.edit.isNew = isNew;
            $uibModal.open({
                templateUrl:'./views/brands/edit.html',
                title:'编辑品牌',
                scope: $scope
            });
        }

        function loadBrands() {
            $scope.loading = true;
            $http.get('../api/admin/brands').then(function(res) {
                if (res.data.code === 0) {
                    $timeout(function() {
                        $scope.loading = false;
                        var brands = res.data.data;
                        brands.forEach(function(b) {
                            try {
                                var images = angular.fromJson(b.image);
                                if (images) {
                                    angular.extend(b, {
                                        logos:[],
                                        banners:[],
                                        smallBanners:[]
                                    });                                    
                                    if (images.logos instanceof Array) {
                                        b.logos = images.logos;
                                    }
                                    if (images.banners instanceof Array) {
                                        b.banners = images.banners;
                                    }
                                    if (images.smallBanners instanceof Array) {
                                        b.smallBanners = images.smallBanners;
                                    }
                                } else {
                                    angular.extend(b, {
                                        logos:[],
                                        banners:[],
                                        smallBanners:[]
                                    });                                     
                                }
                                b.categoryNames = b.categories.map(function(c) {
                                    return c.name;
                                }).join(' && ');
                            } catch(e) {
                                console.warn(e);
                                b._images = [];
                            }
                        });
                        $scope.brands = brands;
                    }, 0);
                } else {
                    $scope.brands = [];
                }
            });
        }

        $scope.default = {};

        function loadCategories() {
            $http.get('./api/admin/categories').then(function(res) {
                if (res.data.code === 0) {
                    $scope.default.categories = res.data.data;
                } else {
                    $scope.default.categories = [];
                }
            });
        }
        loadCategories();

    }]);
});