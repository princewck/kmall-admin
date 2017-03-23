(function() {
    $('#signin-btn').click(function() {
        var username = $('#login-form input[name="username"]').val();
        var password = $('#login-form input[name="password"]').val();
        console.log(username, password);
        $.ajax({
            type: 'post',
            url: '../api/login',
            data: {
                username: username,
                password: password
            },
            success: function(data) {
                if (data.code == 0) {
                    Cookies.set('sessionToken', data.data.token);
                    localStorage.setItem('login_user', JSON.stringify(data.data));
                    window.location.href = '/#/'
                } else {
                    alert('登录失败！');
                }
            }
        });
    });
}());