define(['app'], function(app) {
    app.config(appRouteConfig);
    function appRouteConfig($stateProvider, $urlRouterProvider, $requireProvider) {
        $urlRouterProvider.otherwise('/admin/products/importing/daily');
        $stateProvider
        // .state('home', {
        //     url: '/',
        //     controller: 'indexController',
        //     templateUrl: 'views/index/index.html',
        //     resolve: {
        //         deps: $requireProvider.requireJS(['views/index/index'])
        //     }
        // })
        .state('systemUser', {
            url: '/admin/user',
            controller: 'systemUserController',
            templateUrl: 'views/system-user/system-user.html',
            resolve: {
                deps: $requireProvider.requireJS(['views/system-user/system-user'])
            }
        })
        //分类&商品&品牌
        .state('category_groups', {
            url: '/admin/categoryGroups',
            templateUrl: './views/category_groups/category_groups.html',
            controller:'categoryGroupController' ,
            resolve: {
                deps: $requireProvider.requireJS(['./views/category_groups/category_groups'])
            }
        })
        .state('categories', {
            url: '/admin/categories',
            templateUrl: './views/categories/categories.html',
            controller:'categoryController' ,
            resolve: {
                deps: $requireProvider.requireJS(['./views/categories/categories'])
            }
        })
        .state('categories2', {
            url: '/admin/:groupId/categories',
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
        .state('productsImporting', {
            url: '/admin/products/importing/default',
            controller: 'productImportController',
            templateUrl: './views/product-import/product-import.html',
            resolve: {
                deps: $requireProvider.requireJS(['./views/product-import/product-import'])
            }
        }) 
        .state('productsImportingDaily', {
            url: '/admin/products/importing/daily',
            controller: 'dailyProductImportController',
            templateUrl: './views/product-import/product-import.html',
            resolve: {
                deps: $requireProvider.requireJS(['./views/product-import/daily-import'])
            }
        })
        .state('productsImportingHistory', {
            url: '/admin/products/importing/history',
            controller: 'uploadHistoryController',
            templateUrl: './views/product-import/upload-history.html',
            resolve: {
                deps: $requireProvider.requireJS(['./views/product-import/upload-history'])
            }
        }) 
        .state('uploadCategoryGroup', {
            url: '/admin/product/import/uploadCategory',
            controller: 'uploadCategoryGroupController',
            templateUrl: './views/product-import/upload-category.html',
            resolve: {
                deps: $requireProvider.requireJS(['./views/product-import/upload-category'])
            }
        })                 
        .state('productsImporting.detail', {
            url: '/detail',
            controller: 'productImportDetailController',
            templateUrl: './views/product-import/product-import-detail.html',
            resolve: {
                deps: $requireProvider.requireJS(['./views/product-import/product-import'])
            }
        })
        .state('banners', {
            url: '/admin/banners',
            controller: 'bannerController',
            templateUrl: './views/banners/banners.html',
            resolve: {
                deps: $requireProvider.requireJS(['./views/banners/banners'])
            }
        })
        .state('blockGroup', {
            url: '/admin/blockGroup',
            controller: 'blockGroupController',
            templateUrl: './views/block-group/block-group.html',
            resolve: {
                deps: $requireProvider.requireJS(['./views/block-group/block-group'])
            }
        })                       
        .state('navbars', {
            url: '/admin/navbars',
            controller: 'navbarController',
            templateUrl: './views/navbars/navbars.html',
            resolve: {
                deps: $requireProvider.requireJS(['./views/navbars/navbars'])
            }
        })                       
    }

    appRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$requireProvider'];
});