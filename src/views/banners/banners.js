define(['app'], function(app) {
    app.controller('bannerController', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
        $scope.banners = [];

        getBanners();

        $scope.delete = function(banner) {
            var banners = $scope.banners.filter(function(b) {
                return b.id != banner.id;
            });
            setBanners(banners);
        }

        $scope.booleanEnum = [
            {
                text: '显示',
                status: true
            },
            {
                text: '不显示',
                status: false
            }            
        ];

        function getStatus(status) {
            var _status = $scope.booleanEnum[1];
            $scope.booleanEnum.forEach(function (s) {
                if (s.status === status) {
                    _status = s;
                }
            });
            return _status;
        }

        $scope.update = function(_banner) {
            var banner = angular.copy(_banner);
            banner.images = banner.image ? [banner.image]: [];
            banner.m_link = banner.m_link || '';
            banner.pc = getStatus(banner.pc);
            banner.mobile = getStatus(banner.mobile);
            $scope.edit = banner;
            $uibModal.open({
                templateUrl: './views/banners/edit.html',
                scope: $scope
            });
        }

        $scope.save = function(scope) {
            $scope.$close = scope.$close;
            var check = function(banner) {
                    var banner2 = angular.copy(banner);
                    banner2.image = banner2.images.length ? banner2.images[0] : null;
                    banner2.pc = banner2.pc.status;
                    banner2.mobile = banner2.mobile.status;
                    delete banner2.images;
                    return banner2;                
            }
            var exist = false;
            var banners = $scope.banners.map(function(_banner) {
                var b = angular.copy(_banner);
                b.pc = getStatus(b.pc);
                b.mobile = getStatus(b.mobile);
                b.images = b.image ? [b.image] : [];
                if (b.id === $scope.edit.id) {
                    exist = true;
                    return check($scope.edit);
                };
                return check(b);
            });
            if (!exist) {
                banners.push(check($scope.edit));
            }
            setBanners(banners);
        }

        $scope.create = function() {
            var ids = $scope.banners.map(function(banner) {
                return banner.id;
            });
            var id = 1;
            if (ids.length) {
                var maxId = Math.max.apply(Math, ids);
                id = maxId + 1;
            }
            var banner = {
                id: id,
                image: null,
                images: [],
                title: '',
                subTitle: '',
                link: '',
                m_lnik: '',
                bg: '#ffffff',
                pc: $scope.booleanEnum[1],
                mobile: $scope.booleanEnum[1]
            };
            $scope.edit = banner;
            $uibModal.open({
                templateUrl: './views/banners/edit.html',
                scope: $scope
            });            
        }

        function getBanners() {
            $http.get('../api/admin/banners').then(function(res) {
                if (res.data.code === 0) {
                    $scope.banners = angular.isArray(res.data.data) ? res.data.data : [];
                }
            }).catch(function(err) {
                console.error(err);
            });
        }

        function setBanners(banners) {
            var banners = angular.toJson(banners);
            $http.post('../api/admin/banners', {banners: banners}).then(function(res) {
                if (res.data.code === 0) {
                    getBanners();
                    $scope.$close();
                } else {
                    alert('操作失败！');
                }
            });
        }

    }]);
});