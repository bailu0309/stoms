<%@ page language="java" contentType="text/html;charset=utf-8" %>
<!DOCTYPE html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>护理质控平台</title>
    <!-- ace styles -->
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        body {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            background: #F6F6F6;
        }

        ul, li {
            list-style: none;
        }

        .header {
            margin-left: auto;
            margin-right: auto;
            width: 1000px;
            height: 60px;
            padding-top: 40px;
        }

        .logo {
            height: 57px;
            font-size: 26px;
            font-family: "微软雅黑";
            line-height: 57px;
            font-weight: 600;
            color: #000;
            background-image: url(images/nqc.png);
            background-repeat: no-repeat;
            background-position-y: 10px;
            background-position-x: 40px;
            padding-left: 120px;
            display: inline-block;
        }

        .versionType {
            height: 20px;
            display: inline-block;
            margin-left: 20px;
        }

        .main {
            margin-top: 20px;
            height: 340px;
            width: 100%;
            background-color: #3978a5;
        }

        .mainContent {
            margin-left: auto;
            margin-right: auto;
            width: 1320px;
            background: url(images/login/bgl01.png) no-repeat left center;
            overflow: hidden;
        }

        .login {
            margin-right: 10%;
            background-color: rgba(25, 83, 125, .8);
            float: right;
            height: 340px;
            width: 230px;
            padding: 0 25px 0 15px;
            color: #fff;
        }

        .loginTop {
            line-height: 40px;
            font-size: 16px;
            border-bottom: #e0e0e0 solid 1px;
            margin-top: 30px;
            font-weight: 700;
        }

        .loginContent {
            margin: 25px 0 35px 0;
        }

        .loginfield {
            line-height: 50px;
        }

        .loginfield span {
            width: 60px;
            float: left;
            text-align: right;
            padding-right: 5px
        }

        .loginput {
            height: 20px;
            width: 150px;
            margin-top: 10px;
            padding: 6px 0 5px 5px;
            border: #d7d7d7 solid 1px;
            border-radius: 3px;
        }

        .btnfl {
            background-color: #90BEDE;
            color: white;
            border-radius: 5px;
            line-height: 35px;
            width: 150px;
            text-align: center;
            font-weight: bold;
            float: left;
        }

        .btnfl:hover {
            background: linear-gradient(#00b1f7 0px, #0091f4 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);
        }

        .btnfr {
            background-color: #ffffff;
            color: #777777;
            border-radius: 5px;
            line-height: 35px;
            width: 65px;
            display: inline-block;
            text-align: center;
            font-weight: bold;
            float: right;
        }

        .btnfr:hover {
            background: linear-gradient(#f4f4f4 0px, #e8e8e8 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);
        }

        .footer {
            margin-right: auto;
            margin-left: auto;
            text-align: center;
            color: #666;
            font-size: 16px;
            margin-top: 80px;
        }

        .footer a {
            color: #666;
        }

        .footer a:hover {
            color: #6600CC;
            font-weight: 600;
        }

        @media (max-width: 1300px) {
            .mainContent {
                width: 1010px;
            }

            .header {
                padding-top: 20px;
            }

            .login {
                margin-right: 5%;
            }
        }

        .imgbjo {
            height: 30px;
            margin-top: 10px;
            margin-right: 20px;
            float: right;
        }
    </style>
    <link rel="Shortcut Icon" href="images/nqc.png"/>
    <script type="text/javascript" src="build/MD5.js"></script>
    <script src="jquery/jquery-1.11.3.js"></script>
    <script src="jquery/jquer-msgbox.js"></script>
    <script language="JavaScript" type="text/JavaScript">

        function fullscreen(gourl) {
            var nWidth = screen.availWidth - 8;
            var nHeight = screen.availHeight - 60;
            if (!+[1,]) {
                nHeight += 30;
            }
            var strAttr = "height=" + nHeight.toString() + ",width=" + nWidth.toString() + ",border=0,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no";
            var strRandom = (parseInt(Math.random() * 1000)).toString();
            var objWin = window.open(gourl, "xzwsj" + strRandom, strAttr);
            if (objWin == null)
                window.location = gourl;
            else {
                window.opener = null;
                window.open("", "_self");
                window.close();
            }
        }

        function changeImg() {
            var imgSrc = $("#imgObj");
            var src = imgSrc.attr("src");
            imgSrc.attr("src", chgUrl(src));
        }

        //为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳
        function chgUrl(url) {
            var timestamp = (new Date()).valueOf();
            url = url.substring(0, 23);
            if ((url.indexOf("&") >= 0)) {
                url = url + "×tamp=" + timestamp;
            } else {
                url = url + "?timestamp=" + timestamp;
            }
            return url;
        }
    </script>
</head>
<body class="login-layout">
<div class="header">
    <div class="logo">
        护理质控平台
    </div>
    <div class="versionType">
        <p>V1.1.5</p>

        <div id=""></div>
    </div>
</div>
<div class="main">
    <div class="mainContent">
        <div id="logindiv" class="login">
            <div id="login-box" class="login-box visible widget-box">
                <div class="loginTop">用户登录</div>
                <ul class="loginContent">
                    <li class="loginfield">
                        <span style='font-size:14px;font-family:"Microsoft YaHei"'>用户名:</span>
                        <input type="text" id="userName" name="userName" class="loginput" value="" placeholder=""
                               onkeypress="if(event.keyCode==13){ document.getElementById('pwd').focus();return false;}"
                               class="loginput"/>
                    </li>
                    <li class="loginfield">
                        <span style='font-size:14px;font-family:"Microsoft YaHei"'>密&nbsp;&nbsp;码:</span>
                        <input id="pwd" name="pwd" type="password" class="loginput" value="" placeholder=""
                               onkeypress="if(event.keyCode==13 && logincount > 1){document.getElementById('yzm').focus();return false;} else if(event.keyCode==13){doloin();return false;}"/>
                    </li>
                    <li class="loginfield" id="yzmdiv" style="display: none">
                        <span style='font-size:14px;font-family:"Microsoft YaHei"'>验证码:</span>
                        <input type="text" id="yzm" name="yzm" style="width: 50px" class="loginput"
                               onkeypress="if(event.keyCode==13){ doloin();return false;}" value="" placeholder=""/>

                        <div class="imgbjo"><img id="imgObj" onclick="changeImg()" alt="验证码"
                                                 src="CodeController/code.sdo"/></div>
                    </li>
                </ul>
                <a class="btnfr" href="#" onClick="tcloin();">重 置 </a>
                <a class="btnfl" href="#" onClick="doloin();">登 录 </a>
            </div>
        </div>
    </div>
</div>
<div class="footer">
    <p>为显示最佳效果，请下载<a style="color: blue" href="GoogleChrome.zip">谷歌浏览器</a> &nbsp; &nbsp; 技术支持&nbsp;<a>北京数宇通科技信息有限公司</a>
        &nbsp;电话：010-64724050
        </br></br>
    </p>
</div>

<script type="text/javascript">
    <% String name=(String) session.getAttribute("name"); %>
    <% Integer logincount=(Integer) session.getAttribute("logincount"); %>
    var name = '<%= name %>';
    var logincount = '<%= logincount %>';
    if (logincount > 1) {
        document.getElementById('logindiv').style.height = "340px";
        document.getElementById('yzmdiv').style.display = "";
    }
    if (name && name != 'null') {
        document.getElementById('userName').value = name;
        document.getElementById('pwd').focus();
    } else {
        document.getElementById('userName').value = '';
        document.getElementById('pwd').value = '';
    }

    //重置
    function tcloin() {
        document.getElementById("userName").value = '';
        document.getElementById("pwd").value = '';
        document.getElementById("yzm").value = '';
    }

    function doloin() {
        if (document.getElementById("userName").value == "") {
            $.MsgBox.Alert("错误提示", "用户名不能为空！");
            return;
        }
        if (document.getElementById("pwd").value == "") {
            $.MsgBox.Alert("错误提示", "密码不能为空！");
            return;
        }
        if (document.getElementById("yzm").value == "" && logincount > 1) {
            $.MsgBox.Alert("错误提示", "验证码不能为空！");
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'basic/LoginController/login.sdo',
            data: {
                userName: document.getElementById("userName").value,
                pwd: md5(document.getElementById("pwd").value),
                yzm: document.getElementById("yzm").value
            },
            success: function (data, textStatus, jqXHR) {
                var respText = JSON.parse(data);
                if (respText.result == 'success') {
                    var ua = navigator.userAgent;
                    var s = "MSIE";
                    var i = ua.indexOf(s);
                    //获取IE版本号
                    var ver = parseFloat(ua.substr(i + s.length));
                    var browser = getBrowserInfo();
                    var verinfo = (browser + "").replace(/[^0-9.]/ig, "");
                    if (ver >= 11 || i == -1) {
                        window.location.href = 'main.jsp';
                    } else {
                        fullscreen('main.jsp');
                    }
                } else if (respText.result == 'success2') {
                    fullscreen('main2.jsp');
                } else if (respText.result == 'fail') {
                    $.MsgBox.Alert("错误提示", respText.info);
                    setTimeout(function () {
                        window.location.href = 'login.jsp';
                    }, 1000);
                } else {
                    $.MsgBox.Alert("错误提示", "连接数据库服务器超时");
                }
            }
        });
    }

    function getBrowserInfo() {
        var agent = navigator.userAgent.toLowerCase();

        var regStr_ie = /msie [\d.]+;/gi;
        var regStr_ff = /firefox\/[\d.]+/gi
        var regStr_chrome = /chrome\/[\d.]+/gi;
        var regStr_saf = /safari\/[\d.]+/gi;
        //IE
        if (agent.indexOf("msie") > 0) {
            return agent.match(regStr_ie);
        }
        if (agent.indexOf("firefox") > 0) {
            return agent.match(regStr_ff);
        }
        if (agent.indexOf("chrome") > 0) {
            return agent.match(regStr_chrome);
        }
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            return agent.match(regStr_saf);
        }
    }
</script>

</body>
</html>