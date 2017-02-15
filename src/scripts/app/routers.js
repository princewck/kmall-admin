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
        });
    }

    appRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$requireProvider'];


});