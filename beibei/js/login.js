
// 登录功能
function Login(){
    this.Btn = $('.zc_btn a');
    this.init();
}
Login.prototype = {
    init : function(){
        this.bindEvent();
    },
    getData :function(){
        var uValue = $('.user .uname').val();
        var pValue = $('.pass .upwd').val();
        $.ajax({
            type : 'get',
            url : 'http://localhost/beibei/php/login.php?_id' + new Date().getTime(),
            data : {
                uname : uValue,
                upwd : pValue
            },
            dataType : 'json',
            success : function(data){
                if(data.state == "0"){
                    alert(data.info)
                }else{
                    alert(data.info);
                    _json = {
                        'uname' : uValue,
                        'upwd' : pValue
                    }
                    $.cookie('unifo',JSON.stringify(_json),{expires : 10 ,path : '/'})  //将数据存储到cookie，显示用户名到首页
                    location.href = "index.html"
                }
            }
        })
    },
    bindEvent : function(){
        var _this = this
        // 判断滑块的left值。判断有没有验证滑块
        this.Btn.click(function(){
            _this.getData()
        })
    }

}
new Login();