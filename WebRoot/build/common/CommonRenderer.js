/**
 * -------------------------------------------RendererUtils-Start--------------------------------------------------------------------
 */

function breakRenderers(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        metadata.style = 'white-space:normal;word-break:break-all;';
        // metadata.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;white-space: nowrap;white-space:normal;line-height:20px;';
        v = v.replace(new RegExp("\n", "gm"), "<br>");
    }
    return v;
}

function dateRenderers(v) {
    if (v != "" || v != "null") {
        return v.substr(0, 10);
    } else {
        return "";
    }
}

function qtipRenderers(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        metadata.tdAttr = 'data-qtip=' + v + '';
    }
    return v;
}


function qtipBoldRenderers(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        metadata.tdAttr = 'data-qtip=' + v + '';
        v = "<b>" + v + "</b>";
    }
    return v;
}

function qtipNoteRenderers(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        metadata.tdAttr = 'data-qtip=' + v + '';
        v = '<p style="color: #22608B">' + v + '</p>';
    }
    return v;
}

function qtipBreaksRenderers(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        metadata.tdAttr = 'data-qtip=' + v + '';
        v = v.replace(new RegExp(",", "gm"), "<br>");
    }
    return v;
}

function fileQtipRenderers(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        metadata.tdAttr = 'data-qtip=' + v + '';
    }
    if (record.get('depauditstate') == '2' || record.get('responseauditstate') == '2' || record.get('reviewauditstate') == '2') {
        v = '<span style="color: blue">' + v + '</span>';
    }
    return v;
}

function qtipBreakRenderers(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        var vx = v.replace(new RegExp("<br/>", "gm"), "").replace(new RegExp("\n", "gm"), "");
        metadata.tdAttr = 'data-qtip= ' + vx + '';
        v = v.replace(new RegExp("\n", "gm"), "<br>");
    }
    return v;
}


function breakRenderers(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        metadata.style = 'white-space:normal;word-break:break-all;';
        // metadata.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;white-space: nowrap;white-space:normal;line-height:20px;';
        v = v.replace(new RegExp("\n", "gm"), "<br>");
    }
    return v;
}

function bloadBreakRenderers(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        metadata.style = 'white-space:normal;word-break:break-all;';
        // metadata.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;white-space: nowrap;white-space:normal;line-height:20px;';
        v = '<b>' + v.replace(new RegExp("\n", "gm"), "<br>") + '</b>';
    }
    return v;
}


function nullZeroRender(v, metadata, record, rowIndex, columnIndex, store) {
    if (Ext.isEmpty(v)) {
        return 0;
    }
    return v;
}


function msgTypeRenderer(v, record) {
    if (v == "1") {
        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/xtxx.png title='系统消息'> 系统消息</img>";
    } else if (v == '2') {
        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/fbxx.png title='发布消息'> 发布消息</img>";
    }
}

function sysTypeRenderer(v, record) {
    if (v == "1") {
        return "任务分配";
    } else if (v == '2') {
        return "文件审核";
    } else if (v == '3') {
        return "自评";
    } else if (v == '4') {
        return "文件删除";
    } else if (v == '5') {
        return "审核未过";
    }
}

function auditStateRenderers(v, record) {
    if (v == "1") {
        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/shtg.png title='通过'> 通过</img>";
    } else if (v == '0') {
        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/unaudit.png title='未审'> 未审</img>";
    } else if (v == "2") {
        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/shfj.png title='未过'> 未过</img>";
    } else if (v == "3") {
        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/updateaudit.png title='改待审'> 改待审</img>";
    }
}


function stateRenderers(v, record) {
    if (v == "1") {
        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/shtg.png title='成功'> 发送成功</img>";
    } else if (v == '0') {
        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/unaudit.png title='未发送'> 未发送</img>";
    } else if (v == "2") {
        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/shfj.png title='发送失败'> 发送失败</img>";
    }
}

function uploadRenderers(v, record) {
    if (v == "1") {
        return "<img src=" + globalCtx + "/images/icons/yi.png title='已上报'>已上报</img>";
    } else {
        return "<img src=" + globalCtx + "/images/icons/dai.png title='未上报'>未上报</img>";
    }
}

function dictionaryRenderer(v, metadata, record, rowIndex, columnIndex, store) {
    return DICTIONARY[metadata.column.dicttype][v];
}

var regnull = new RegExp(' ', "g");

function qtipDictionaryRenderer(v, metadata, record, rowIndex, columnIndex, store) {
    if (v != "") {
        v = DICTIONARY[metadata.column.dicttype][v];
        v = v.replace(regnull, '');
        metadata.tdAttr = 'data-qtip=' + v + '';
    }
    return v;
}

/**
 * -------------------------------------------RendererUtils-End--------------------------------------------------------------------
 */
/**
 * -------------------------------------------ListenersUtils-Start------------------------------------------------------
 */
function qxListeners(thisv, newValue, oldValue, eOpts) {
    if (newValue[thisv.name] == '取消') {
        thisv.reset();
    }
}

function onSelectStoreChange(thisv, newValue, oldValue, eOpts) {
    var items = thisv.store.data.items || {};
    var flag = true;
    for (var i in items) {
        if (newValue == items[i].data.value) {
            flag = false;
            break;
        }
    }
    if (flag) {
        thisv.reset();
    }
}

/**
 * -------------------------------------------ListenersUtils-End--------------------------------------------------------
 */