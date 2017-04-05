define(['app'], function(app) {
    app.controller('blockGroupController', ['$scope', '$http', '$sce', '$uibModal', function($scope, $http, $sce, $uibModal) {

        $scope.getImg = function(index, images) {
            if (images.length >= index && images[index]) {
                return $sce.trustAsHtml('<img src="' + images[index] + '" height="30px">');
            }
            return '无图片';
        }

        $scope.addItem = function(edit) {
            edit.push({
                sort: 0,
                title: '',
                description: '',
                link: 'http://'
            });
        }

        $scope.deleteItem = function(arr, index) {
            arr.splice(index, 1);
        }

        $scope.items = [];
        getBlockGroups();

        function getBlockGroups() {
            $http.get('../api/admin/blockGroups').then(function(res) {
                if (res.data.code === 0) {
                    if (angular.isArray(res.data.data)) {
                       $scope.items = res.data.data.filter(function(item) {
                            return item;
                       }).map(function(item) {
                            item.list = angular.isArray(item.list) ? item.list : [];
                            item.list2 = angular.copy(item.list);
                            item.list2.shift();
                            return item;
                       });
                    } else {
                        $scope.items = [];
                    }
                }
            });
        }

        $scope.update = function(item, $index) {
            $scope.edit = angular.copy(item);
            $scope.edit.isNew = false;
            $scope.edit.updateIndex = $index;
            $scope.edit.list = angular.isArray($scope.edit.list) ? $scope.edit.list: [];
            //过滤掉没图片的
            $scope.edit.list = $scope.edit.list.filter(function(item) {
                return item && item.image;
            });
            $scope.edit.images = $scope.edit.list.map(function(i) {
                return i.image;
            });
            $uibModal.open({
                size: 'lg',
                scope: $scope,
                templateUrl: './views/block-group/edit.html'
            });
        }

        $scope.add = function() {
            $scope.edit = {
                list: [],
                isNew: true,
                images: []
            }
            $uibModal.open({
                size: 'lg',
                scope: $scope,
                templateUrl: './views/block-group/edit.html'
            });            
        }

        $scope.delete = function(index) {
            var items = angular.copy($scope.items);
            items.splice(index, 1);
            $http.post('../api/admin/blockGroups', {blockGroup: angular.toJson(items)}).then(function(res) {
                if (res.data.code === 0) {
                    getBlockGroups();
                } else {
                    alert('操作失败！');
                }
            });            
        }

        $scope.save = function(scope) {
            var items = angular.copy($scope.items);
            var isNew = $scope.edit.isNew;
            $scope.edit.list = $scope.edit.list.map(function(img, index) {
                img.image = $scope.edit.images.length >= index ? $scope.edit.images[index] : null;
                return img;
            });
            var edit = angular.copy($scope.edit);
            delete edit.images;
            delete edit.isNew;
            if (!isNew) {
                items[$scope.edit['updateIndex']] = edit;
                delete edit.updateIndex;
            } else {
                items.push(edit);
            }
            items = items.map(function(item) {
                delete item.list2;
                return item;
            });
            $http.post('../api/admin/blockGroups', {blockGroup: angular.toJson(items)}).then(function(res) {
                if (res.data.code === 0) {
                    scope.$close();
                    getBlockGroups();
                } else {
                    alert('操作失败！');
                }
            });
        }
    }]);
});