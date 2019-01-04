package com.creating.dao.mapper.entity.basic;


public class NationEty {
    private String fid;// 编码
    private String fdesc;// 编码名称
    private String fqun;// 拼音码
    private String ftype;// 类型
    private String fst;// 状态


    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
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
