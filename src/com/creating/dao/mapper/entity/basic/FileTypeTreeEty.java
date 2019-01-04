package com.creating.dao.mapper.entity.basic;


import java.util.List;

public class FileTypeTreeEty {
    private String id;// 编码
    private String fid;// 编码
    private String name;// 编码名称
    private String pid;// 拼音码
    private boolean leaf;//是否为子节点

    private List<FileTypeTreeEty> children;//子节点

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public List<FileTypeTreeEty> getChildren() {
        return children;
    }

    public void setChildren(List<FileTypeTreeEty> children) {
        this.children = children;
    }

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
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
