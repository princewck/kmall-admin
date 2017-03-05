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
            "angular-ui-bootstrap"  :   "http://cdn.bootcss.com/angular-ui-bootstrap/2.2.0/ui-bootstrap-tpls.min",
            "angular-require"       :   BOWER_DIR + "/angular-require/angular-require.min",
            "angular-smart-table"   :   BOWER_DIR + "/angular-smart-table/dist/smart-table.min",
            "app"                   :   "./scripts/app",
            "routers"               :   "./scripts/app/routers",
            "intercepters"          :   "./scripts/app/intercepter",

            'uploader'              :   "./vendor/fileUploader/src/module.plupload",

            'img'                   :   "directives/img"
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
            "admin-lte": {
                deps: [
                    "bootstrap",
                ]
            },
            "app": {
                deps: ["css!styles/common.css", "css!styles/base.css"]
            },
            "routers": {
                deps: ["app"]
            },
            'uploader': {
                deps: [
                    './vendor/fileUploader/src/plupload/base64',
                    './vendor/fileUploader/src/plupload/crypto',
                    './vendor/fileUploader/src/plupload/hmac',
                    './vendor/fileUploader/src/plupload/plupload.full.min',
                    './vendor/fileUploader/src/plupload/sha1',
                    './vendor/fileUploader/src/plupload/uuid'
                ]
            }
        }
    });

    require.onError = function(err){
        console.log("require error:",err,arguments);
    };

    requirejs(["angular"], function(angular) {
        requirejs(["angular-require", "angular-cookies", "angular-ui-bootstrap", "angular-smart-table", "uploader"], function() {
            requirejs(["ui-router", "admin-lte", "routers", "intercepters", "app"], function() {
                angular.bootstrap(document, ["kApp"]);
            });
        });
    });
})();