package com.creating.dao.mapper.entity.dictionary;

/**
 * @Author mabailu
 * @Date 2018/5/9 14:53
 * @Description 字典子项表
 */

public class DictionaryItem {

    private String fid;//    pk
    private String code;// 编码
    private String text;//    值
    private String typeid;// 类型ID
    private Integer sort;//顺序


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

    public String getTypeid() {
        return typeid;
    }

    public void setTypeid(String typeid) {
        this.typeid = typeid;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }
}
