<?php

// 数据库与php建立连接，操作mysql

    //更改php文件的字符编码
    header('content-type:text/html;charset=utf-8');

    //服务器地址
    $db_hostName = 'localhost'; //127.0.0.1
    //数据库登录账户
    $db_userName = 'root';
    //密码
    $db_pwd = 'root';
    //数据名称
    $db_name = 'h5-1906';

    //数据库的链接
    /*
    new mysqli(参数1，参数2，参数3，参数4)
            参数1：服务器连接地址
            参数2：账号
            参数3：密码
            参数4：数据库名称
    */
    $connect = new mysqli( $db_hostName, $db_userName, $db_pwd, $db_name);

    //判断是否连接成功
    if($connect -> connect_error){
        die("数据库连接失败".$connect -> connect_error);
        //die也是输出，类似于echo ，只是他多一个执行后，后面不在加载（跳出）

    };

    //设置数据库的字符编码
    $connect -> query('set names utf8');




?>