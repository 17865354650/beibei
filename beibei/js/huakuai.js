
// 拖拽滑块完成验证
function Drag(){
    this.oSpan = $('.huakuai span');
    this.timer = null;
    this.init();
}

Drag.prototype = {
    init : function(){

        this.bindEvent();
    },
    handelDown : function(e){
        e = e || window.event;
        this.x = e.offsetX //获取鼠标距离当前点击元素左边的距离
    },
    handelMove : function(e){
        e = e || window.event;
        var l = e.clientX - this.x - $('form').offset().left;
        // 判断边界 l大小是滑动区的距离减去span的宽
        l = l < 0 ? 0 : (l > 288 ? 288 : l);
        this.oSpan.css( 'left',l + 'px');
        $('.hk_cont').css('width',l + 'px');
        if(l >= 288){
            $('.huakuai p').html('通过验证');
            $('.huakuai p').css('color','#fff');
            $('.huakuai span').html("<i class='iconfont icon-smile'></i>")
        }
        
    },
    handelUp :function(){
        
        // 当验证不成功没滑到最边上，开启定时器划回去
        if($('.hk_cont').width() < 288){
            // this.timer = setInterval(()=>{
            //     $('.hk_cont').css({
            //         width : $('.hk_cont').width() - 1 + 'px'
            //     })
            //     this.oSpan.css({
            //         left : this.oSpan.position().left - 1 + 'px'
            //     })
            //     // console.log(this.oSpan.position().left)
            //     // console.log($('.hk_cont').width())
           
            //     if(this.oSpan.position().left <= 0 || $('.hk_cont').width() <= 0){
            //         this.oSpan.css({
            //             left : 0
            //         })
            //         clearInterval(this.timer)
            //     }
            // },3)
            this.oSpan.animate({left : '0'},1000)
            $('.hk_cont').animate({width : '0'},1000)
        }
        $(document).off('mousemove')
    },
    bindEvent : function(){
        var _this = this
        this.oSpan.mousedown(function(){
            _this.handelDown()
            $(document).on('mousemove',function(){//这边用on做事件绑定，因为上面要做事件解绑
                _this.handelMove()
            })
            $(document).mouseup(function(){
                _this.handelUp()
            })
            return false;
        })
    }
}
new Drag();
