<?php
    header("content-type:text/html;charset=utf8");
    include("public.php");
    $uname = $_REQUEST['uname'];
    $upwd = $_REQUEST['upwd'];

    $sql = "select * from beibei where uname='$uname'";
    $res = mysqli_query($connect,$sql);
    $arr = mysqli_fetch_assoc($res);
    if($arr){
        //用户名存在，判断密码
        if($arr['upwd'] == $upwd){
            echo json_encode(array(
                'state' => '1',
                'info' => '登录成功'
            ));
        }else{
            //密码输入有误
            echo json_encode(array(
                'state' => '0',
                'info' => '密码输入错误，请重新输入'
            ));
        }
    }else{
        //用户名不存在
        echo json_encode(array(
            'state' => '0',
            'info' => '用户名不存在，请重新输入'
        ));
    }
?>