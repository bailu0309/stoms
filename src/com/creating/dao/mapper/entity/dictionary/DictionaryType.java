package com.creating.dao.mapper.entity.dictionary;

/**
 * @Author mabailu
 * @Date 2018/5/9 14:52
 * @Description 字典类型表
 */
public class DictionaryType {

    private String fid;//      pk
    private String code;//   编码
    private String text;//      值
    private String status;//    状态    1启用  0禁用
    private String leaf;//    状态    1启用  0禁用

    public String getLeaf() {
        return leaf;
    }

    public void setLeaf(String leaf) {
        this.leaf = leaf;
    }

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
