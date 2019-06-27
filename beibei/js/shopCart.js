
window.onload = function(){
// 获取localStorage里的值
var str = localStorage.getItem('prolist')
    if (str != null) {
        var strCon = '';
        var arr = JSON.parse(str);
        arr.forEach((ele)=> {
            strCon += `
                    <tr data-id="${ele.id}">
                        <td><input type="checkbox" class="ll"></td>
                        <td>
                            <img src="images/${ele.img}" alt="">
                        </td>
                        <td>
                            <p>${ele.title}</p>
                        </td>
                        <td>
                            <h3>${ele.price_num}.00</h3>
                            <h4>${ele.old_price}</h4>
                        </td>
                        <td class="Num">
                            <div>
                                <button data-number="-1">-</button>
                                <input type="text" value="${ele.Val}" class="num">
                                <button data-number="1">+</button>
                            </div>
                        </td>
                        <td><h5>${ele.price_num * ele.Val}.00</h5></td>
                        <td class="del"><span>删除</span></td>
                    </tr>
        `    
        })
        $('.c_count3 tbody').html(strCon)
    }

// 结算函数
function jiesuan(){
    var count = 0 ; //数量
    var money = 0 ; //金额
    // 遍历所有的被选中的复选框的数量和金额累加
    $('.ll:checked').each(function(){
        count += Number($(this).parent().parent().find(':text').val())
        money += Number($(this).parent().parent().find('h5').html())
    })
    $('.txt span').html(count);
    $('.txt h6').html(money);
}


// 全选功能
// 获取当前复选框的选择状态给到其他复选框
$('.zongji input,thead input').click(function(){
    $('.ll').prop('checked',$(this).prop('checked'));
    jiesuan()
})

// 复选框选中的结算
$('tbody').on('click','.ll',function(){
    jiesuan()
})

// 加减功能
$('tbody').on('click','button',function(){
    // 获取当前操作的商品id
    var pid = $(this).parent().parent().parent().data('id');
    // 取出操作的value值
    var Val = $(this).parent().parent().parent().find('.num').val();
    //取出点击的是 1 还是 -1
    var num2 = $(this).data('number')
    // 如果count和num是1和-1 直接return后面不执行
    if( num2 == -1 && Val == 1 ){
        return ;
    }
    // 遍历数组
    arr.forEach((ele)=>{
        if(ele.id == pid){
            // console.log(ele.Val)
            ele.Val= Number(ele.Val) + Number(num2);
            // 将数组重新存到localstorage中
            localStorage.setItem('prolist',JSON.stringify(arr));
            // 页面同步改变
            $(this).parent().parent().parent().find('.num').val(ele.Val);
            // 页面同步改变金额
            $(this).parent().parent().find('h5').html(ele.price_num * ele.Val)
            // 结算同步改变
            jiesuan();
            return
        }
    })
    // location.reload();
})

// 删除功能
$('tbody').on('click','.del',function(){
    $(this).parent().remove();//html页面数据删除了，
    // 删除localstorage里的数据
    // 首先获取id
    var pid = $(this).parent().data("id");
    arr.forEach((ele,index)=>{
        //ele代表数组项，index代表下标
        if(ele.id == pid){
            // 删除id相等的下标
            arr.splice(index,1);
            // 再将数组加到localstroage
            localStorage.setItem('prolist',JSON.stringify(arr));
            jiesuan()
            return
        }
    })
})


}
