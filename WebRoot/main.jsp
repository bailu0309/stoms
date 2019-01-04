<%@ page import="com.creating.constants.ConfigConstants" %>
<%@ page import="com.creating.util.Utils" %>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>
<!DOCTYPE html>
<html>
<head>
    <title>护理质控平台</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/main.css">
    <link rel="Shortcut Icon" href="images/nqc.png"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/time_style.css">
    <!-- 引入ExtJs核心Js -->
    <link rel="stylesheet" type="text/css" href="${ctx}/Ext/build/classic/theme-crisp/resources/theme-crisp-all.css">
    <script type="text/javascript" src="${ctx}/Ext/ext-bootstrap.js"></script>
    <script type="text/javascript" src="${ctx}/Ext/build/ext-all.js"></script>
    <script type="text/javascript" src="${ctx}/Ext/build/packages/ux/classic/ux.js"></script>
    <script type="text/javascript" src="${ctx}/Ext/build/classic/locale/locale-zh_CN.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/app.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/css/shouye.css">

    <script src="jquery/jquery-1.11.3.js"></script>
    <script src="jquery/jquery.rotate.min.js"></script>
    <script src="jquery/jquery.table2excel.js"></script>

    <script type="text/javascript">
        <% String name=(String) session.getAttribute("name"); %>
        <% String username=(String) session.getAttribute("username"); %>
        <% String depname=(String) session.getAttribute("depname"); %>
        <% String rid=(String) session.getAttribute("role"); %>
        <% String status=(String) session.getAttribute("status"); %>
        <% String epwd=(String) session.getAttribute("epwd"); %>
        <% String reviewLeader=ConfigConstants.ROLE_REVIEW_LEADER; %>
        <% String executor=ConfigConstants.ROLE_DEPART_EXECUTE; %>
        <% String batchtime=ConfigConstants.BATCHTIME; %>
        <% Integer userId=(Integer) session.getAttribute("userId"); %>
        <% boolean admin=Utils.isAdmin(request); %>
        var globalCtx = '${ctx}';
        var NQC = {}, Uitls = {}, DateUtils = {};
        var userName = '<%= username %>', name = '<%= name %>', depname = '<%= depname %>', roleId = '<%= rid %>',
            reviewLeader = '<%= reviewLeader %>', executor = '<%= executor %>', adminrole = <%=admin %>,
            userId = '<%= userId %>', batchtime = '<%= batchtime %>', status = '<%= status %>', epwd = '<%= epwd %>',
            statussession = 1;
        var currentDate = new Date(<%=new java.util.Date().getTime()%>);
        var DICTIONARY, DICT_COMBO, DICT_QUERY;
        var PROROLE = (roleId == '20' || roleId == '100048'),
            CITYROLE = (roleId == '100047'),
            HOSPROLE = (roleId == '100046');
    </script>
    <script type="text/javascript" src="${ctx}/build/common/Common.js?t=20181127"></script>
    <script type="text/javascript" src="${ctx}/build/common/CommonRenderer.js?t=20181127"></script>
    <script type="text/javascript" src="${ctx}/build/common/CommonUtils.js?t=20181127"></script>
    <script type="text/javascript" src="${ctx}/build/common/CommonFunction.js?t=20181127"></script>
    <script type="text/javascript" src="app.js?t=20181127"></script>

    <script type="text/javascript">
        Ext.Ajax.on('requestcomplete', checkUserSessionStatus, this);

        function checkUserSessionStatus(conn, response, options) {
            if ('getResponseHeader' in response && response.getResponseHeader("sessionstatus") == 'timeout') {
                if (statussession == 1) {
//                    alert("会话过期，请重新登陆!");
                    statussession++;
                    window.top.location.href = '${ctx}/login.jsp';
                }
            }
        }

        //处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
        function banBackSpace(e) {
            var ev = e || window.event;//获取event对象
            var obj = ev.target || ev.srcElement;//获取事件源
            var t = obj.type || obj.getAttribute('type');//获取事件源类型
            //获取作为判断条件的事件类型
            var vReadOnly = obj.readOnly;
            var vEnabled = obj.getAttribute('enabled');
            //处理null值情况
            vReadOnly = (vReadOnly == null) ? false : vReadOnly;
            vEnabled = (vEnabled == null) ? true : vEnabled;
            //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
            //并且readonly属性为true或enabled属性为false的，则退格键失效
            var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea")
                && (vReadOnly == true || vEnabled != true)) ? true : false;
            //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
            var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;
            //判断
            if (flag2) {
                return false;
            }
            if (flag1) {
                return false;
            }
        }

        //禁止后退键 作用于Firefox、Opera
        document.onkeypress = banBackSpace;
        //禁止后退键  作用于IE、Chrome
        document.onkeydown = banBackSpace;
        var LODOP; //声明为全局变量


        Ext.onReady(function () {

            NQC.systemWin = Ext.create('build.basic.SystemLogWindow', {
                title: '系统更新提示',
                html: ''
            });
            NQC.systemWin.setPosition(Ext.getBody().getWidth() - 400, Ext.getBody().getHeight() - 330);

            NQC.showSystem = function () {
                NQC.systemWin.show();
                NQC.systemWin.loadData();
            }
        });

    </script>

</head>
<body>
<script type="text/javascript" src="${ctx}/echarts4/echarts4.js"></script>
<script type="text/javascript" src="${ctx}/echarts4/theme/walden.js"></script>
<script type="text/javascript" src="${ctx}/echarts4/theme/thems4.js"></script>
<script type="text/javascript" src="${ctx}/echarts4/theme/macarons.js"></script>
<script type="text/javascript" src="${ctx}/swfupload/swfupload.js"></script>

</body>

</html>
