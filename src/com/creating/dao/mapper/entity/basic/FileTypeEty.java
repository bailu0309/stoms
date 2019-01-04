package com.creating.dao.mapper.entity.basic;


public class FileTypeEty {
    private String id;// 编码
    private String name;// 编码名称
    private String pid;// 拼音码
    private String cid;//关联ID

    
    public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }
}
