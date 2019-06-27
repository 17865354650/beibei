
// 注册功能：获取输入框里的值，传到后台php进行验证
function Register(){
    this.Btn = $('.zc_btn a');
    this.init();
}
Register.prototype = {
    init : function(){
        this.bindEvent();
    },
    getData : function(){
        var uValue = $('.user .uname').val();
        var pValue = $('.pass .upwd').val()
        $.ajax({
            type : 'get',
            url : 'http://localhost/beibei/php/register.php?_id' + new Date().getTime(),//路径必须写全
            data : {
                uname : uValue,
                upwd : pValue
            },
            dataType : 'json',
            success : function(data){
                if(data.state == "0"){
                    alert(data.info)
                }else{
                    alert(data.info)
                    location.href = "login.html"
                }
            }
        })
    },
    bindEvent : function(){
        var _this = this
        this.Btn.click(function(){
            _this.getData()
        })
    }
}
new Register()

