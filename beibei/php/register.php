<?php
    header("content-type:text/html;charset=utf8");
    include("public.php");
    $uname = $_REQUEST['uname'];
    $upwd = $_REQUEST['upwd'];

    $sql = "select * from beibei where uname='$uname'";
    $res = mysqli_query($connect,$sql);
    $arr = mysqli_fetch_assoc($res);
    if($arr){
        // 用户名重复注册失败
        echo json_encode(array(
            'state' => '0',
            'info' => '用户名重复,注册失败'
        ));
    }else{
        //注册成功
        $insert = "insert into beibei (uname,upwd) values ('$uname','$upwd')";
        $res1 = mysqli_query($connect,$insert);
        echo json_encode(array(
            'state' => '1',
            'info' => '注册成功'
        ));
    }
?>