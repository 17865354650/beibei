
// 商品倒计时
// 字符串补零
function mendZero(num){
    return num = num < 10 ? '0' + num : num;
}

setInterval(function(){
    var d = new Date();
    var futureDate = new Date("2019-10-1 00:00:00");
    var ms = futureDate.getTime() - d.getTime();
    var days = parseInt(ms / (1000 * 60 * 60 * 24));
    var hours = parseInt((ms % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
    var minutes = parseInt(((ms % (1000 * 60 * 60 *24)) % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((((ms % (1000 * 60 * 60 *24)) % (1000 * 60 * 60)) % (1000 * 60)) / 1000);
    $('.day').html(days);
    $('.hours').html(mendZero(hours));
    $('.minutes').html(mendZero(minutes));
    $('.seconds').html(mendZero(seconds));

})

// 鼠标滑过显示微信
$('.Btn2 a').hover(function(){
    $('.Btn2 .a2').css('display','block')
},function(){
    $('.Btn2 .a2').css('display','none')
})
$('.Btn2 .a2').hover(function(){
    $(this).css('display','block')
},function(){
    $(this).css('display','none')
})


//接收主页传过来的id
var str = location.href;
// console.log(str)   http://localhost/beibei/page.html?pid=2
str = str.split('?')[1];
pid = str.split('=')[1];  //拿到id

$.ajax({
    type : 'get',
    url : 'data.json?_id' + new Date().getTime(),
    data : {},
    dataType : 'json',
    success : function(data){
        for(var key in data){
           var productArr = data[key];
           for(var aa in productArr){
            //    找到id相同的遍历到详情页
                var str3 = '';//首页后的
                var priceStr = ''; 
                var oldStr = '';
                var discoutStr = '';
                var jieshengStr = '';
                var glassStr = '';
                var gundongStr = '';
                var firstLiStr = '';
                var btnStr = '';
                if(productArr[aa].id == pid){
                    str3 += `${productArr[aa].title}`;
                    priceStr +=`${productArr[aa].price_info.price_num}`;
                    oldStr += `${productArr[aa].price_info.old_price}`;
                    discoutStr +=`${productArr[aa].price_info.discount}`;
                    jieshengStr += `${productArr[aa].price_info.old_price.slice(1) - productArr[aa].price_info.price_num}.00`;
                    btnStr +=` <span class="a1" pid="${productArr[aa].id}" pimg="${productArr[aa].img}" ptitle="${productArr[aa].title}" pold_price="${productArr[aa].price_info.old_price}" pprice_num="${productArr[aa].price_info.price_num}">加入购物车</span>`;
                    glassStr += `
                            <img src="images/${productArr[aa].img}" alt="">
                            <div class="filter"></div>
                            <aside class="glass">
                                <img src="images/${productArr[aa].img}" alt="">
                            </aside>
                    `
                    // li的第一张图片
                    firstLiStr += `<img src="images/${productArr[aa].img}" alt="">`
                    // li的剩余的图片遍历
                    var ImgBox = productArr[aa].imgBox//图片集合
                    for(var bb in ImgBox){
                        for(var i = 0 ; i < ImgBox[bb].length;i++ ){
                            gundongStr += `<li><img src="${ImgBox[bb][i]}" alt=""></li>`
                        }
                    }
                    break;//注意要写break; 
                }
           }
        //将字符串拼接到详情页上
           $('.nav2 span').html(str3)
           $('.title2 article h4').html(str3)
           $('.price2 p').html(priceStr);//价格
           $('.old_price2').html(oldStr)//原价
           $('.discount2 h4').html(discoutStr)//折扣
           $('.jiesheng h6').html(jieshengStr) //节省
           $('.left2 .show').html(glassStr) //放大镜
           $('.imgBox2 .active2').html(firstLiStr); //第一个li里的图片
           $('.imgBox2').html( $('.imgBox2').html() + gundongStr) //剩余的里的图片
           $('.Btn2 div').html(btnStr)
        }
    }
})

// 放大镜
function ChangeImg(){
    this.ImgBox = $('.imgBox2');
    this.aLi = $('.imgBox2 li');
    this.btnL = $('.toBox .btnL');
    this.btnR = $('.toBox .btnR');
    this.show = $('.left2 .show');
    this.count = 0;
    this.init();

}

ChangeImg.prototype = {
    init : function(){
        // this.ImgBox.css({//86一个li占据的位置
        //     width : (86 * this.aLi.length) + 'px'
        // })
        this.bindEvent();
    },
    toImg : function(){
        this.ImgBox.animate({
            left : (-this.count * 86) + 'px'
        })
    },
    // 下一张
    nextImg : function(){
        // 因为这边li是新添加的就不能用原来获取的那个，重新获取
        if(this.count >= $('.imgBox2 li').length - 4){
            this.count = $('.imgBox2 li').length - 4
        }else{
            this.count++
        }
        this.toImg()
    },
    // 下一张
    preImg : function(){
        if(this.count <= 0){
            this.count = 0
        }else{
            this.count--
        }
        this.toImg()
    },
    filterMove : function(e){
        e = e || window.event
        // 获取鼠标 注意这边要获取鼠标距离当前文档的X Y
        var l = e.pageX - this.show.position().left - $('.filter').width() / 2;
        var t = e.pageY - this.show.position().top - $('.filter').height() / 2 ;
        l = l < 0 ? 0 : (l > 228 ? 228 : l);
        t = t < 0 ? 0 : (t > 228 ? 228 : t);
        $('.filter').css('left', l + 'px');
        $('.filter').css('top',t + 'px');
        this.bigImgMove(l,t)
    },
    // 放大镜里大图的移动
    bigImgMove : function(l,t){
        $('.glass img').css({
            // 1.74是大图和小图的比例
            left : (- 1.74 * l) + 'px',
            top : (- 1.74 * t) + 'px'
        })
    },
    bindEvent : function(){
        var _this = this;
        this.btnR.click(function(){
            _this.nextImg();
        })
        this.btnL.click(function(){
            _this.preImg();
        })
        this.ImgBox.on('click','li',function(){
            $(this).addClass('active2').siblings().removeClass('active2')
            // 获取鼠标滑过的图片的src 给到显示区和放大区
            var smallSrc = $(this).find('img').attr('src')
            $('.show>img').attr('src',smallSrc);
            $('.glass>img').attr('src',smallSrc);
        })
        this.show.mousemove(function(e){
            _this.filterMove(e)
        })
        this.show.hover(function(){
            $('.filter').css('display','block')
            $('.glass').css('display','block');
        },function(){
            $('.filter').css('display','none')
            $('.glass').css('display','none');
        })
    }
}
new ChangeImg();

// 累加累减
$('.Num .add').click(function(){
    var num = $(this).prev().val()
    num++;
    $(this).prev().val(num);
})
$('.Num .reduce').click(function(){
    var num = $(this).next().val();
    if(num > 1){
        num--
        $(this).next().val(num)
    }
})


// 单击加入购物车，获取当前商品的id和input里的value值
$('.Btn2 div').on('click','.a1',function(){
    var arr =[]; //定义一个数组,存放商品
    var Obj = {} //存放商品的val 和 id
    var pid = $(this).attr('pid');
    var pimg = $(this).attr('pimg');
    var ptitle = $(this).attr('ptitle');
    var pold_price = $(this).attr('pold_price');
    var pprice_num = $(this).attr('pprice_num');
    var Val = $('.Num .num').val();
    var flag = true;
    Obj = {
        "id" : pid,
        "img" : pimg,
        "title" :ptitle,
        'old_price' : pold_price,
        'price_num' : pprice_num,
        'Val' : Val
    }
    // 先取出localSrtorage里的值
    var str = localStorage.getItem('prolist')
    if(str != null){ //说明storage里面有值
        arr = JSON.parse(str);
        arr.forEach((pro)=>{
            if(pro.id == Obj.id){
                pro.Val = Number(pro.Val) + Number(Obj.Val);
                JSON.stringify(pro.Val)
                flag = false;
                return
            }
        })
    }
    if(flag){
        arr.push(Obj);
    }
    // console.log(Obj)
    //将数组存到localStrage里面
    localStorage.setItem('prolist',JSON.stringify(arr))
})

var num = 1;
$('.Btn2 div').click(function(){
    // console.log(1)
     // 运动
    var goods = $("<div class='goods'> <img src='images/shoes5.jpg' </div>")
    $('body').append(goods);
    goods.css({
        left : $('.Btn2').offset().left + 50,
        top : $('.Btn2').offset().top
    }).animate({
        top : $('.Btn2').offset().top - 40,
    },1000).animate({
        left : $('.a_show1').offset().left,
        top : $('.a_show1').offset().top
    },500,function(){
        $('.aside_show p').html(num++);
        goods.remove();
    })
})
