Utils = {
    /**
     * 拼接url参数
     * @param url
     * @param param
     * @returns {string}
     */
    createURL: function (url, param) {
        var urlLink = '';
        $.each(param, function (item, key) {
            if (!Ext.isEmpty(key)) {
                var link = '&' + item + "=" + key;
                urlLink += link;
            }
        });
        urlLink = url + "?" + urlLink.substr(1);
        return urlLink.replace(' ', '');
    }
};


/**
 * -------------------------------------------FormatUtils-Start--------------------------------------------------------------------
 */
function dateMonthFormat(value) {
    if (!Ext.isEmpty(value)) {
        return Ext.Date.format(new Date(value), 'Y-m');
    }
    else {
        return null;
    }
}

/**
 *日期格式化
 */
function dateFormat(value) {
    if (null != value) {
        return Ext.Date.format(new Date(value), 'Ym');
    } else {
        return null;
    }
}

/**
 *日期格式化
 */
function getDateFormatYMD(value) {
    if (null != value) {
        return Ext.Date.format(new Date(value), 'Y-m-d');
    } else {
        return null;
    }
}

/**
 *日期格式化
 */
function getStartDateFormatYMD(value) {
    if (null != value) {
        return (Ext.Date.format(new Date(value), 'Y-m-d') + ' 00:00:00');
    } else {
        return null;
    }
}

/**
 *日期格式化
 */
function getEndDateFormatYMD(value) {
    if (null != value) {
        return (Ext.Date.format(new Date(value), 'Y-m-d') + ' 23:59:59');
    } else {
        return null;
    }
}

/**
 *日期格式化
 */
function getEndToday() {
    return (Ext.Date.format(new Date(), 'Y-m-d') + ' 23:59:59');
}

function dateMinus(sDate) {
    var sdate = new Date(sDate.substring(0, 10).replace(/-/g, "/"));
    var now = new Date();
    var days = sdate.getTime() - now.getTime();
    var day = Math.floor(days / (1000 * 60 * 60 * 24));
    return (day + 1);
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function getNow() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + h + seperator2 + m + seperator2 + s;
    return currentdate;
}

function getLastQuarter(p) {
    var myDate = new Date();
    var today = myDate.toLocaleDateString();//获取当前日期
    var strYear = myDate.getFullYear();
    var strMonth = myDate.getMonth() + 1;
    var strQuarter = Math.floor((strMonth % 3 == 0 ? (strMonth / 3) : (strMonth / 3 + 1)));
    strYear = ((strQuarter == 1) ? (strYear - 1) : (strYear));
    strQuarter = ((strQuarter == 1) ? (4) : (strQuarter - 1));
    if (p == 1) {
        return strYear;
    } else if (p == 2) {
        return strQuarter;
    }
    return strYear + "-" + strQuarter;
}

/**
 * -------------------------------------------FormatUtils-End--------------------------------------------------------------------
 */


/**
 * -------------------------------------------FunctionsUtils-Start--------------------------------------------------------------------
 */
function ArrayUnique(array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
            if (array[i] === array[j]) j = ++i;
        r.push(array[i]);
    }
    return r;
}

function getUpMonth(t) {
    var year = t.substring(0, 4);            //获取当前日期的年
    var month = t.substring(5, 7);              //获取当前日期的月
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var m = year2.toString();
    var n = month2.toString();
    var t2 = m + '-' + n;
    return t2;
}

function getUpMonthAll(t) {
    var year = t.substring(0, 4);            //获取当前日期的年
    var month = t.substring(5, 7);              //获取当前日期的月
    var day = t.substring(8, 10);              //获取当前日期的日
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var m = year2.toString();
    var n = month2.toString();
    var t2 = m + '-' + n + '-' + day;
    return t2;
}

function getAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
            else {
                var monthDiff = nowMonth - birthMonth;//月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        }
        else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge;//返回周岁年龄
}

/**
 * 判断是否为数字，是反正原来的值，否返回''
 * @param v
 * @returns {*}
 */
function checkNum(v) {
    if (isNaN(v)) {
        return '';
    }
    return v;
}

function isArray(object) {
    return object && typeof object === 'object' && Array == object.constructor;
}

function arrRepeat(arr) {
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]]) {
            return true;
        }
        // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
        hash[arr[i]] = true;
    }
    return false;
}


function getAfterDate(day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

/**
 * 获取月最后一天的时间
 * @param year
 * @param month
 * @returns {string}
 */
function getLastMonthDay(year, month) {
    var day = new Date(year, month, 0);
    var lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期
    //给文本控件赋值。同下
    return lastdate;
}

function exception(response) {
    App.getApplication().msg('出错', '程序异常，请联系管理员！', 2000);
}

function checkChildNode(node, checked) {
    if (!node) return;
    node.set('checked', checked);////////
    node.eachChild(function (child) {
        checkChildNode(child, checked);
    });
}

function checkParentNode(node, checked) {
    if (!node) return;
    node.set('checked', checked);////
    checkParentNode(node.parentNode);
}

function openPreview(add) {
    var params = {
        fileadd: add
    }
    var url = encodeURI(globalCtx + '/PreviewController/priview.sdo?fileadd=' + add);
    POBrowser.openWindow(url, 'width=1200px;height=800px;')
}

function office2pdf(fileadd, panel) {
    var myMask = new Ext.LoadMask(panel, {msg: "系统正在转换数据，请稍候..."});
    myMask.show();
    Ext.Ajax.request({
        method: 'post',
        url: globalCtx + '/PreviewController/office2pdf.sdo',
        timeout: 120000,
        waitTitle: '请稍等片刻',
        waitMsg: '正在统计...',
        params: {
            fileadd: fileadd
        },
        scope: this,
        success: function (resp) {
            myMask.hide();
            var obj = Ext.util.JSON.decode(resp.responseText);
            if (obj.success == true) {
                window.open("pdf/web/viewer.html?" + encodeURI(obj.info));
            } else {
                Ext.Msg.alert("提示", obj.info);
            }
        },
        failure: function (response, opts) {
            myMask.hide();
            App.getApplication().msg('出错', '审核出错！', 2000);
        }
    })
}

function locationTree(tree, name) {
    tree.collapseAll();
    var vl = name;
    var vs = vl.split(".");
    var name = '';
    var temp = '';
    for (var i = 0; i < vs.length; i++) {
        name += temp + vs[i] + '/';
        temp += vs[i] + '.';
    }
    name = name.substring(0, name.length - 1);
    tree.expandPath(name, 'code');
}


function previewFile(fileadd, panel) {
    var suffix;
    var index = fileadd.lastIndexOf('.');
    if (index != -1) {
        suffix = fileadd.substr(index + 1).toLowerCase();
    }
    suffix = suffix.toLowerCase();
    if (suffix == 'jpg' || suffix == 'jpeg' || suffix == 'bmp' || suffix == 'png') {
    } else if (suffix == 'pdf') {
        window.open("pdf/web/viewer.html?" + encodeURI(fileadd));
    } else if (suffix == 'doc' || suffix == 'docx' || suffix == 'ppt' || suffix == 'pptx' || suffix == 'xlsx' || suffix == 'xls') {
        openPreview(fileadd);
    } else {
        Ext.Msg.alert("提示", "此文件无法预览，请下载后查看！");
    }
}


function downLoadFile(filename, fileadd) {
    var link = globalCtx + '/ExportController/exportCatalogTemplateEty.sdo' + '?a=1';
    if (!Ext.isEmpty(filename)) {
        link += '&filename=' + filename;
    }
    if (!Ext.isEmpty(fileadd)) {
        link += '&fileadd=' + fileadd;
    }
    window.open(link);
}

function isPc() {
    var PC;
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        PC = false;
    } else {
        PC = true;
    }
    return PC;
}

function getNumberChar(str, cha) {
    var regex = new RegExp(cha, 'g'); // 使用g表示整个字符串都要匹配
    var count = (str.replace(/[^.]/g, "").length);
    return count;
}

/**
 * -------------------------------------------FunctionsUtils-End--------------------------------------------------------
 */


/**
 * -----------------------------------身份证校验工具----------------------------------------------------------------------
 */
var vcity = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
    42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
};

function checkCard(card) {
    //是否为空
    if (card === '') {
        return false;
    }
    //校验长度，类型
    if (isCardNo(card) === false) {
        return false;
    }
    //检查省份
    if (checkProvince(card) === false) {
        return false;
    }
    //校验生日
    if (checkBirthday(card) === false) {
        return false;
    }
    //检验位的检测
    if (checkParity(card) === false) {
        return false;
    }
    return true;
};


//检查号码是否符合规范，包括长度，类型
isCardNo = function (card) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
        return false;
    }
    return true;
};

//取身份证前两位,校验省份
checkProvince = function (card) {
    var province = card.substr(0, 2);
    if (vcity[province] == undefined) {
        return false;
    }
    return true;
};

//检查生日是否正确
checkBirthday = function (card) {
    var len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == '15') {
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        var arr_data = card.match(re_fifteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date('19' + year + '/' + month + '/' + day);
        return verifyBirthday('19' + year, month, day, birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == '18') {
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        var arr_data = card.match(re_eighteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date(year + '/' + month + '/' + day);
        return verifyBirthday(year, month, day, birthday);
    }
    return false;
};

//校验日期
verifyBirthday = function (year, month, day, birthday) {
    var now = new Date();
    var now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
        //判断年份的范围（3岁到100岁之间)
        var time = now_year - year;
        if (time >= 3 && time <= 100) {
            return true;
        }
        return false;
    }
    return false;
};

//校验位的检测
checkParity = function (card) {
    //15位转18位
    card = changeFivteenToEighteen(card);
    var len = card.length;
    if (len == '18') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i, valnum;
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum == card.substr(17, 1)) {
            return true;
        }
        return false;
    }
    return false;
};

//15位转18位身份证号
changeFivteenToEighteen = function (card) {
    if (card.length == '15') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i;
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        card += arrCh[cardTemp % 11];
        return card;
    }
    return card;
};