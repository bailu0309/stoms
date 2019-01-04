package com.creating.dao.mapper.entity.basic;

import java.util.List;

/**
 * @Author mabailu
 * @Date 2018/2/26 15:01
 * @Description
 */
public class TreeNodeEty {
    private String id;//ID
    private String node;//ID
    private String name;//菜单名称
    private String text;//菜单名称
    private boolean leaf;//是否为子节点
    private String codeid;//
    private String depid;//
    private String personid;//

    public String getDepid() {
        return depid;
    }

    public void setDepid(String depid) {
        this.depid = depid;
    }

    public String getPersonid() {
        return personid;
    }

    public void setPersonid(String personid) {
        this.personid = personid;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    private List<TreeNodeEty> children;//子节点

    public String getNode() {
        return node;
    }

    public void setNode(String node) {
        this.node = node;
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

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public String getCodeid() {
        return codeid;
    }

    public void setCodeid(String codeid) {
        this.codeid = codeid;
    }

    public List<TreeNodeEty> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNodeEty> children) {
        this.children = children;
    }
}
