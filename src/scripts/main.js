(function() {
    var BOWER_DIR = "./bower_components";
    require.config({
        baseUrl: "./",
        paths: {
            "angular"               :   BOWER_DIR + "/angular/angular.min",
            "ui-router"             :   BOWER_DIR + "/angular-ui-router/release/angular-ui-router.min",
            "angular-cookies"       :   BOWER_DIR + "/angular-cookies/angular-cookies.min",
            "jquery"                :   BOWER_DIR + "/jquery/dist/jquery.min",
            "admin-lte"             :   BOWER_DIR + "/AdminLTE/dist/js/app.min",
            "bootstrap"             :   BOWER_DIR + "/bootstrap/dist/js/bootstrap.min",
            "angular-ui-bootstrap"  :   "//cdn.bootcss.com/angular-ui-bootstrap/2.5.0/ui-bootstrap.min",
            "angular-require"       :   BOWER_DIR + "/angular-require/angular-require.min",
            "app"                   :   "./scripts/app",
            "routers"               :   "./scripts/app/routers",
            "intercepters"          :   "./scripts/app/intercepter"
        },
        map: {
          "*" : {
              "css": "http://apps.bdimg.com/libs/require-css/0.1.8/css.min.js"
          }
        },
        waitSeconds: 0,
        shim: {
            "angular": {
                deps: ["jquery"],
                exports: "angular"
            },
            "bootstrap": {
                deps: [
                    "css!https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css",
                    "css!https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"
                ]
            },
            "angular-ui-bootstrap": {
                deps: [
                    "//cdn.bootcss.com/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js"
                ]
            },
            "admin-lte": {
                deps: [
                    "bootstrap",
                ]
            },
            "routers": {
                deps: ["app"]
            }
        }
    });

    require.onError = function(err){
        console.log("require error:",err,arguments);
    };

    requirejs(["angular"], function(angular) {
        requirejs(["angular-require", "angular-cookies", "angular-ui-bootstrap"], function() {
            requirejs(["ui-router", "admin-lte", "routers", "intercepters", "app"], function() {
                angular.bootstrap(document, ["kApp"]);
            });
        });
    });
})();