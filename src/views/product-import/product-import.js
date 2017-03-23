define(['app', 'pluploader', 'commonService'], function(app) {
    app.controller('productImportController', function($scope, $http, $cookies, $q, $state, $sce,  commonService) {

        var getMultiParams = function() {
            var token = commonService.getCookie('sessionToken');
            var params =  {
                'K-Session': token
            };
            if ($scope.params && $scope.params.category && $scope.params.category.id) params.cid = $scope.params.category.id;
            if ($scope.params && $scope.params.brand && $scope.params.brand.id) params.brand_id = $scope.params.brand.id;
            return params;
        }

        var params = getMultiParams();
        var token = commonService.getCookie('sessionToken');
        var uploader = new plupload.Uploader({
            browse_button: 'xlsxImporter',
            url : '../api/import/products/xlsx',
            multipart_params: {
                'K-Session': token
            }
        });

        uploader.bind('FilesAdded', function() {
            if (window.confirm('确定上传吗？')) {
                uploader.start();             
            };
        });

        uploader.bind('FileUploaded', function(up, file, res) {
            var response = angular.fromJson(res.response);
            if (response.code === 0) {
                alert('上传成功！');
            } else {
                alert(res.message || '操作失败');
            }
        });

        uploader.bind('PostInit',  function() {
            $scope.$watch('params', function(newVal) {
                uploader.setOption('multipart_params', getMultiParams());
            }, true);
        });

        uploader.bind('OptionChanged', function() {
            console.log('OptionChanged');
        });


        $scope.is = $state.is;
        $scope.getStatusText = function(status) {
            if (status) return $sce.trustAsHtml('<span class="text-success">可用</span>');
            return $sce.trustAsHtml('<span class="text-danger">禁用</span>');
        }        

        $q.all([getCategories(), getBrands()]).then(function(result) {
            var categories = result[0];
            $scope.params = {};
            categories.unshift({id:0, name:'-未选择-'});
            $scope.categories = categories;
            $scope.params.category = $scope.categories[0];
            var brands = result[1];
            brands.unshift({id: 0, name:'不指定品牌'});
            $scope.brands = brands;
            $scope.params.brand = brands[0];
            uploader.init();
            $scope.uploaderEnable = true;
        });

        function getCategories() {
            var defer = $q.defer();
            $http.get('../api/admin/categories').then(function(res) {
                if (res.data.code === 0) {
                    defer.resolve(res.data.data);
                } else {
                    defer.resolve([]);
                }
            }).catch(function() {
                defer.resolve([]);
            });
            return defer.promise;
        }

        function getBrands() {
            var defer = $q.defer();
            $http.get('../api/admin/brands').then(function(res) {
                if (res.data.code === 0) {
                    defer.resolve(res.data.data);
                } else {
                    defer.resolve([]);
                }
            }).catch(function() {
                defer.resolve([]);
            });
            return defer.promise;
        }
    });  
});
