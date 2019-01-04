package com.creating.dao.mapper.entity.basic;

public class AsyncTreeNode {
    private String id;//ID
    private String name;//菜单名称
    private String text;//菜单名称
    private Integer parantMenuID;//父节点菜单ID
    private String icon;//图标地址
    private String openIcon;//大图标地址
    private String type;//类型  jsClassFile actionPath firstMenu  [js类 html路径 一级级菜单]
    private Integer isValiDate;//是否可用
    private String menuIds;//存放查出的用户子节点ID
    private boolean leaf;//是否为子节点

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

    public Integer getParantMenuID() {
        return parantMenuID;
    }

    public void setParantMenuID(Integer parantMenuID) {
        this.parantMenuID = parantMenuID;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getOpenIcon() {
        return openIcon;
    }

    public void setOpenIcon(String openIcon) {
        this.openIcon = openIcon;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getIsValiDate() {
        return isValiDate;
    }

    public void setIsValiDate(Integer isValiDate) {
        this.isValiDate = isValiDate;
    }

    public String getMenuIds() {
        return menuIds;
    }

    public void setMenuIds(String menuIds) {
        this.menuIds = menuIds;
    }

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }


}
