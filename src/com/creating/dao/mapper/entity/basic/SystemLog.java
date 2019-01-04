package com.creating.dao.mapper.entity.basic;

import com.creating.dao.base.BaseEntity;

import java.util.Date;

public class SystemLog extends BaseEntity{
    private Integer id;

    private String version;

    private String content;

    private Date ftime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version == null ? null : version.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Date getFtime() {
        return ftime;
    }

    public void setFtime(Date ftime) {
        this.ftime = ftime;
    }
}