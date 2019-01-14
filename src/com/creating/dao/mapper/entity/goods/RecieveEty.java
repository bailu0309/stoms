package com.creating.dao.mapper.entity.goods;

import com.creating.dao.base.BaseEntity;

import java.util.Date;

public class RecieveEty extends BaseEntity{
    private Integer id;

    private String name;

    private String recid;

    private String recname;

    private Date rectime;

    private String outnumber;

    private String auditid;

    private String auditname;

    private String outid;

    private String outname;

    private String purpose;

    private String outtype;

    private String outin;

    private String remark;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
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

    public Date getRectime() {
        return rectime;
    }

    public void setRectime(Date rectime) {
        this.rectime = rectime;
    }

    public String getOutnumber() {
        return outnumber;
    }

    public void setOutnumber(String outnumber) {
        this.outnumber = outnumber == null ? null : outnumber.trim();
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

    public String getOutid() {
        return outid;
    }

    public void setOutid(String outid) {
        this.outid = outid == null ? null : outid.trim();
    }

    public String getOutname() {
        return outname;
    }

    public void setOutname(String outname) {
        this.outname = outname == null ? null : outname.trim();
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

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}