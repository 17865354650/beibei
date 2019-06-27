
// 将cookie里的用户名编辑到页面上 '您好，' + userObj.uname
var userfo = $.cookie('unifo')
if(userfo){
    var userObj = JSON.parse(userfo)
    $('.t_n_wrapper .dl').html("<a href='##'>您好，" + userObj.uname +"</a>|")
    $('.t_n_wrapper .zc').html('<a href="##" class="tuichu">退出</a>|')
}
$('.tuichu').click(function(){
    $.removeCookie('unifo',{path : '/'})  //清除cookie a标签回复成原来的样子
    $('.t_n_wrapper .dl').html('<a href="login.html">登录</a>|')
    $('.t_n_wrapper .zc').html('<a href="register.html">注册</a>|')
})
// 鼠标滑过显示下划线
$(".t_n_wrapper").find("a").hover(function(){
    $(this).css('text-decoration','underline')
},function(){
    $(this).css('text-decoration','none')
})

// 鼠标滑过显示下拉
$(".xl").hover(function(){
    $(this).addClass('xl_active')
    $(".t_n_xl").css('display','block')
},function(){
    $(this).removeClass('xl_active')
    $(".t_n_xl").css('display','none')
})
// 鼠标滑过显示微信
$(".gz").hover(function(){
    $(this).addClass('gz_active')
    $(".t_n_gz").css('display','block')
},function(){
    $(".t_n_gz").css('display','none');
    $(this).removeClass('gz_active')
})

// 分类
$('.fenlei ul').on('mouseenter','li',function(){
    $(this).addClass('activeLi').siblings().removeClass('activeLi')

})

// 功能一鼠标滑过显示分类
$('#main_nav .s_txt').hover(function(){
    $('#main_nav .fenlei').css('display','block')
},function(){
    $('#main_nav .fenlei').css('display','none')
})

$('.fenlei').hover(function(){
    $(this).css('display','block')
},function(){
    $(this).css('display','none')
})

// 功能二 遍历、
$.ajax({
    type : 'get',
    url : 'fenlei.json?_id' + new Date().getTime(),
    data : {},
    dataType : 'json',
    success : function(data){
        var str = '';//导航条  data[key].name
        var strArr = '';
        for(var key in data){
            // console.log(data[key].name)  
            str +=  `<li data-name=${key}>${data[key].name}</li>`
            // console.log(data.lei1.list)
        }
        var arr = data.lei1.list
        for(var aa in arr){
            // console.log(arr[aa])
            strArr += `
            <div>
                <img src="images/fenlei/${arr[aa].img}" alt="">
                <p>${arr[aa].title}</p>
            </div>
            `
        }
        $('.fenlei ul').html(str)
        // 给第一个li添加类
        $('.fenlei ul li').eq(0).addClass('activeLi')

        $('.f_show').html(strArr)
        // 选项卡功能
        $('.fenlei ul').on('mouseenter','li',function(){
            // 鼠标滑过拿到lei1，lei2... 上面的data-name
            var lei = $(this).attr('data-name')
            var pro = data[lei].list; //滑过下的数组
            var strP = '';
            for(var key in pro){
                strP +=`
                <div>
                    <img src="images/fenlei/${pro[key].img}" alt="">
                    <p>${pro[key].title}</p>
                </div>
                `
            }
            $('.f_show').html(strP)
        })

    }
})
// 轮播图
function BannerShow(){
    this.imgBox = $('.imgBox');
    this.pre = $('#banner span').eq(0);
    this.next = $('#banner span').eq(1);
    this.distance = $('.imgBox img').eq(0).width(); //一张图片的宽度
    this.oRadiusBox = $(".radiusBox");
    this.count = 0;
    this.show = $('#banner')
    this.init();

}
BannerShow.prototype = {
    init : function(){
        // 先把第一张图片复制到最后一张
        $('.imgBox img').eq(0).clone().appendTo(this.imgBox);
        this.imgBox.css('width',this.distance * $('.imgBox img').length);
        this.img = $('.imgBox img');//克隆后的全部图片
        this.addLi();
        this.auotoPlay();
        this.eventBind();//把事件绑定放在最后

    },
    // 运动
    imgMove : function(){
        this.imgBox.stop().animate({left: -this.distance * this.count},500)
    },

    // 下一张
    nextImg : function(){
        if(this.count >= this.img.length - 1){
            this.imgBox.css('left',0)
            this.count = 1;
        }else{
            this.count++;
        }
        this.imgMove();
        this.changeStyle();
    },
    // 上一张
    preImg : function(){
        if(this.count <= 0){
            this.imgBox.css('left',-this.distance * (this.img.length - 1))
            this.count = this.img.length - 2
        }else{
            this.count--;
        }
        this.imgMove();
        this.changeStyle();
    },
    // 自动播放
    auotoPlay : function(){
        var _this = this;
        this.timer = setInterval(function(){
            _this.nextImg()
        },3000)
    },
    //添加圆点
    addLi : function(){
        for(var i = 0 ; i < $('.imgBox img').length - 1; i++){
            var createLi = $('<li>');
            this.oRadiusBox.append(createLi);
        }
        $('.radiusBox li').eq(0).addClass('radiusActive')
    },
    //点击上一张，下一张，白点跟随改变，
    changeStyle : function(){
        $('.radiusBox li').eq(this.count > $('.imgBox img').length -2 ? 0 : this.count).addClass('radiusActive').siblings().removeClass('radiusActive');
    },
    // 改变小白点的样式
    radiusChange : function(index){
        $('.radiusBox li').eq(index).addClass('radiusActive').siblings().removeClass('radiusActive');
    },
    // 事件绑定
    eventBind : function(){
        var _this = this
        this.next.click(function(){
                this.nextImg();
        }.bind(this)) //此处用bind更改this指向，所以不用_this
        this.pre.click(function(){
            _this.preImg();
        })
        this.show.hover(function(){
            clearInterval(_this.timer)
        },function(){
            _this.auotoPlay()
        })
        // 鼠标滑过改变白点的样式，图片也跟随移动
        $('.radiusBox li').mouseenter(function(){
            var index = $(this).index()
            _this.radiusChange(index) //改变白点
            _this.count = index
            _this.imgMove()
        })
    }
}
new BannerShow();

// 吸顶效果
$(window).scroll(function(){
    var sTop = $(document).scrollTop();
    if(sTop >= 157){
        $('.bot_xi').css({
            'position':'fixed',
            'top' : 0,
            display : 'block'
        })
    }else{
        $('.bot_xi').css({
            'position':'static',
            display : 'none'
        })
    }
   
})


// 侧边栏返滑过变色和返回顶部
//1、改变第三个div的背景和内容
$('.a_show3').hover(function(){
    $(this).html('客服在线')
    $(this).css({
        'background' : '#f34660',
        'color' : '#fff',
    })
    $('.aside_weixin').css('display','block')
},function(){
    $(this).html(' <a href="##"><i class="iconfont icon-unie737"></i></a>');
    $(this).css('background','#fff')
    $('.aside_weixin').css('display','none')
})
// 2、改变第四个div的背景和内容
$('.a_show4').hover(function(){
    $(this).html('返回顶部')
    $(this).css({
        'background' : '#f34660',
        'color' : '#fff',
    })
},function(){
    $(this).html(' <a href="##"><i class="iconfont icon-shangla1"></i></a>');
    $(this).css('background','#fff')
})

///3、点击返回顶部
$('.a_show4').click(function(){
    var sTop = $(document).scrollTop();
    var timer1 = setInterval(function(){
        sTop -= 30;
        document.documentElement.scrollTop = document.body.scrollTop = sTop;
        if(sTop <= 0){
            clearInterval(timer1)
        }
    },10)
   
})

// 遍历商品
$.ajax({
    type : 'get',
    url : 'data.json?_id' + new Date().getTime(),
    data : {},
    dataType : 'json',
    success : function(data){
        var productStr = "";
        for(var key in data){
            // 拿过来是对象，先遍历取数据，
            // data[key]为数组
            var productArr = data[key]
            for(var i = 0 ; i < productArr.length;i++){
                productStr += `
                <a href="page.html?pid=${productArr[i].id}" target="_blank" class="tiaozhuan">
                    <div class="c_l_product">
                        <img src="images/${productArr[i].img}" alt="">
                        <p>${productArr[i].title}</p>
                        <div class="price_info">
                            <h6>￥</h6>
                            <h2>${productArr[i].price_info.price_num}</h2>
                            <h3>.00</h3>
                            <h4>${productArr[i].price_info.old_price}</h4>
                            <h5>${productArr[i].price_info.discount}</h5>
                        </div>
                    </div>
                </a>
                `
                //  console.log(productArr[i].price_info.price_num)
            }
        }
        $('.c_left').html(productStr)
    }
})

// 选项卡儿童服装
$('.c_right li').mouseenter(function(){
    $(this).addClass('child_active').siblings().removeClass('child_active')
    var index = $(this).index();
    $('.c_right div').eq(index).addClass('c_r_active').siblings().removeClass('c_r_active')
})

// 选项卡遍历数据
$.ajax({
    type : 'get',
    url : 'child.json?_id' + new Date().getTime(), 
    data : {},
    dataType : 'json',
    success : function(data){
        // 童服
        var shortStr = '';
        var shortArr = data.childShort.list;
        for(var i = 0 ; i < shortArr.length; i++){
            shortStr += `
            <span>
                <img src="images/${shortArr[i].img}" alt="">
                <article>
                    <p>${shortArr[i].title}</p>
                    <aside>
                        <h3>￥</h3>
                        <h4>${shortArr[i].price}</h4>
                        <h5>${shortArr[i].old_price}</h5>
                    </aside>
                </article>
            </span>
            `
        }
        $('.c_r_short').html(shortStr);
        // 童鞋
        var shoesStr = '';
        var shoesArr = data.childShoes.list;
        for(var i = 0 ; i < shoesArr.length; i++){
            shoesStr += `
            <span>
                <img src="images/${shoesArr[i].img}" alt="">
                <article>
                    <p>${shoesArr[i].title}</p>
                    <aside>
                        <h3>￥</h3>
                        <h4>${shoesArr[i].price}</h4>
                        <h5>${shoesArr[i].old_price}</h5>
                    </aside>
                </article>
            </span>
            `
        }
        $('.c_r_shoes').html(shoesStr)
        // 玩具
        var toyStr = '';
        var toyArr = data.childToy.list;
        for(var i = 0 ; i < toyArr.length; i++){
            toyStr += `
            <span>
                <img src="images/${toyArr[i].img}" alt="">
                <article>
                    <p>${toyArr[i].title}</p>
                    <aside>
                        <h3>￥</h3>
                        <h4>${toyArr[i].price}</h4>
                        <h5>${toyArr[i].old_price}</h5>
                    </aside>
                </article>
            </span>
            `
        }
        $('.c_r_toy').html(toyStr)
        // 用品
        var goodsStr = '';
        var goodsArr = data.childGoods.list;
        for(var i = 0 ; i < goodsArr.length; i++){
            goodsStr += `
            <span>
                <img src="images/${goodsArr[i].img}" alt="">
                <article>
                    <p>${goodsArr[i].title}</p>
                    <aside>
                        <h3>￥</h3>
                        <h4>${goodsArr[i].price}</h4>
                        <h5>${goodsArr[i].old_price}</h5>
                    </aside>
                </article>
            </span>
            `
        }
        $('.c_r_goods').html(goodsStr)

        

    }

})