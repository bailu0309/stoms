package com.creating.dao.mapper.entity.goods;

import java.sql.Timestamp;
import java.util.Date;

public class RecieveInfo {
    private Integer id;

    private String recid;

    private String recname;

    private String goodsname;

    private Timestamp rectime;

    private String outnum;

    private String auditid;

    private String auditname;

    private String outperson;

    private String purpose;

    private String outtype;

    private String outin;

    public String getGoodsname() {
        return goodsname;
    }

    public void setGoodsname(String goodsname) {
        this.goodsname = goodsname;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRecid() {
        return recid;
    }

    public void setRecid(String recid) {
        this.recid = recid == null ? null : recid.trim();
    }

    public String getRecname() {
        return recname;
    }

    public void setRecname(String recname) {
        this.recname = recname == null ? null : recname.trim();
    }

    public Timestamp getRectime() {
        return rectime;
    }

    public void setRectime(Timestamp rectime) {
        this.rectime = rectime;
    }

    public String getOutnum() {
        return outnum;
    }

    public void setOutnum(String outnum) {
        this.outnum = outnum == null ? null : outnum.trim();
    }

    public String getAuditid() {
        return auditid;
    }

    public void setAuditid(String auditid) {
        this.auditid = auditid == null ? null : auditid.trim();
    }

    public String getAuditname() {
        return auditname;
    }

    public void setAuditname(String auditname) {
        this.auditname = auditname == null ? null : auditname.trim();
    }

    public String getOutperson() {
        return outperson;
    }

    public void setOutperson(String outperson) {
        this.outperson = outperson == null ? null : outperson.trim();
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose == null ? null : purpose.trim();
    }

    public String getOuttype() {
        return outtype;
    }

    public void setOuttype(String outtype) {
        this.outtype = outtype == null ? null : outtype.trim();
    }

    public String getOutin() {
        return outin;
    }

    public void setOutin(String outin) {
        this.outin = outin == null ? null : outin.trim();
    }
}