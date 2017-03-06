define(['app'], function(app) {
    app.config(appRouteConfig);
    function appRouteConfig($stateProvider, $urlRouterProvider, $requireProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url: '/',
            controller: 'indexController',
            templateUrl: 'views/index/index.html',
            resolve: {
                deps: $requireProvider.requireJS(['views/index/index'])
            }
        }).state('systemUser', {
            url: '/admin/user',
            controller: 'systemUserController',
            templateUrl: 'views/system-user/system-user.html',
            resolve: {
                deps: $requireProvider.requireJS(['views/system-user/system-user'])
            }
        })
        //分类&商品&品牌
        .state('categories', {
            url: '/admin/categories',
            templateUrl: './views/categories/categories.html',
            controller:'categoryController' ,
            resolve: {
                deps: $requireProvider.requireJS(['./views/categories/categories'])
            }
        })
        .state('brands', {
            url: '/admin/brands',
            templateUrl: './views/brands/brands.html',
            controller:'brandController' ,
            resolve: {
                deps: $requireProvider.requireJS(['./views/brands/brands'])
            }
        })
        .state('products', {
            url: '/admin/products',
            controller: 'productController',
            templateUrl: './views/products/products.html',
            resolve: {
                deps: $requireProvider.requireJS(['./views/products/products'])
            }
        })
    }

    appRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$requireProvider'];

});