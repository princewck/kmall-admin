define('commonService', ['app'], function(app) {
    app.service('commonService', function($cookies) {
        function getCookie(name) {
            var token = $cookies.get("sessionToken");
            if (token) {
                return token.replace('/^"$/','');
            } else {
                return null;
            }
        }

        var Overlay = function() {
            this.id = new Date().valueOf();
            console.log(this.id);
            var lay = document.createElement('div');
            lay.id = this.id;
            lay.className = 'overlay loading';
            lay.innerHTML = '<span><i class="icofont icofont-spinner-alt-2 spin"></i> 加载中...</span>';
            document.getElementById('main-container').appendChild(lay);
        }
        Overlay.prototype.fade = function() {
            var el = document.getElementById(this.id);
            el.parentNode.removeChild(el);
        }

        function showOverlay() {
            return new Overlay();
        }


        
        return  {
            getCookie: getCookie,
            showOverlay: showOverlay
        }
    });
});