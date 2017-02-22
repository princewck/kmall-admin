define(['app'], function(app) {
    app.factory('myHttpInterceptor', ['$q','$cookies', '$rootScope',  function($q, $cookies, $uibModal, $rootScope) {
        return {
          'request': function(config) {
                  // TODO: 过滤所有url,如果是需要加小尾巴的加上小尾巴
              //     if (config.url.indexOf('.html') > 0 && HashStaticFile) {
              //         config.url = HashStaticFile(config.url);
              //     }
              if (config.url.indexOf('api/') >= 0) {
                  var token = $cookies.get("sessionToken");
                  if (token) {
                      token = token.replace('/^"$/','');
                  } else {
                      token = '';
               }
               config.headers["K-Session"] = token;
               config.cache = false;

              //     // do something on success
              }
                return config;
          },

         'requestError': function(rejection) {
            if (canRecover(rejection)) {
              return responseOrNewPromise
            }
            return $q.reject(rejection);
          },
          'response': function(response) {
            return response;
          },
          // optional method
         'responseError': function(response) {
            console.log(response);
            if (response.status == 401) {
                alert('未登录，请重新登录！');
                localStorage.setItem('login_user', '{}');
                window.location.href = '/login.html';
            }
            return response;
          }
        };
    }]);

    app.config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.transformRequest.unshift( function(obj, headersGetter){
          var content_type = headersGetter('content-type') || '';
          if (content_type.indexOf('application/json') >= 0) {
              return obj;
          }
          if (typeof obj === "string") {
              return obj;
          }
          var str = [];
          for(var p in obj){
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
      });

      $httpProvider.interceptors.push('myHttpInterceptor');
    }]);
});