package com.creating.dao.mapper.entity.basic;

import com.creating.dao.base.BaseEntity;

public class DepartEty extends BaseEntity {

    private String fid;//
    private String fjgdm;// 组织机构代码
    private String foffn;// 编码
    private String fdesc;// 描述
    private String fqun;// 查询编码
    private String ftype;// 类型 I-病区 O-门诊 T-医技
    private String fst;// 状态

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
    }

    public String getFjgdm() {
        return fjgdm;
    }

    public void setFjgdm(String fjgdm) {
        this.fjgdm = fjgdm;
    }

    public String getFoffn() {
        return foffn;
    }

    public void setFoffn(String foffn) {
        this.foffn = foffn;
    }

    public String getFdesc() {
        return fdesc;
    }

    public void setFdesc(String fdesc) {
        this.fdesc = fdesc;
    }

    public String getFqun() {
        return fqun;
    }

    public void setFqun(String fqun) {
        this.fqun = fqun;
    }


    public String getFtype() {
        return ftype;
    }

    public void setFtype(String ftype) {
        this.ftype = ftype;
    }

    public String getFst() {
        return fst;
    }

    public void setFst(String fst) {
        this.fst = fst;
    }
}
